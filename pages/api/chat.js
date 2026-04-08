import { GoogleGenerativeAI } from "@google/generative-ai";
import { LRUCache } from "lru-cache";

import experienceData from "../../Static/experience.json";
import projects from "../../Static/myproject.json";
import services from "../../Static/services.json";
import socialLinks from "../../Static/SocialLinks.json";

const rateLimit = new LRUCache({ max: 500, ttl: 1000 * 60 });
const cooldownMap = new Map();
const blockedIPs = new Map();
const globalRate = new LRUCache({ max: 1000, ttl: 1000 * 60 });

function getClientIP(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function checkRateLimit(ip) {
  const user = rateLimit.get(ip) || { count: 0 };
  user.count += 1;
  rateLimit.set(ip, user);
  return user.count <= 10;
}

function checkCooldown(ip) {
  const now = Date.now();
  const last = cooldownMap.get(ip) || 0;
  if (now - last < 1500) return false;
  cooldownMap.set(ip, now);
  return true;
}

function checkExtraSecurity(ip, message) {
  if (blockedIPs.has(ip))
    return { allowed: false, reason: "Temporarily blocked" };
  const user = globalRate.get(ip) || { count: 0 };
  user.count += 1;
  globalRate.set(ip, user);
  if (user.count > 20) {
    blockedIPs.set(ip, Date.now() + 1000 * 60 * 5);
    return { allowed: false, reason: "Too many requests, temporarily blocked" };
  }
  const suspicious = /(<script|http|www|\.com|free money|click here)/i;
  if (suspicious.test(message))
    return { allowed: false, reason: "Suspicious content detected" };
  return { allowed: true };
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, expire] of blockedIPs.entries()) {
    if (expire < now) blockedIPs.delete(ip);
  }
}, 1000 * 60);

function validateMessage(message) {
  if (!message || typeof message !== "string") return "Message required";
  const trimmed = message.trim();
  if (trimmed.length < 2) return "Message too short";
  if (trimmed.length > 500) return "Message too long";
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  const ip = getClientIP(req);
  const { message, mode, recaptchaToken } = req.body;

  if (!checkRateLimit(ip))
    return res.status(429).json({ error: "Too many requests. Slow down." });
  if (!checkCooldown(ip))
    return res.status(429).json({ error: "You're sending requests too fast." });

  const validationError = validateMessage(message);
  if (validationError) return res.status(400).json({ error: validationError });

  const extraSecurity = checkExtraSecurity(ip, message);
  if (!extraSecurity.allowed)
    return res
      .status(429)
      .json({ error: "captcha_required", reason: extraSecurity.reason });

  if (recaptchaToken) {
    try {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}&remoteip=${ip}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaData = await recaptchaRes.json();
      if (!recaptchaData.success)
        return res.status(403).json({ error: "Invalid captcha" });
    } catch (e) {
      return res.status(500).json({ error: "Captcha verification failed" });
    }
  }

  const lowerMsg = message.toLowerCase();
  const isExperience = /(experience|job|work|career|role)/i.test(lowerMsg);
  const isEducation = /(education|degree|school|college|study)/i.test(lowerMsg);
  const isReference = /(reference|recommendation|contact)/i.test(lowerMsg);
  const isProject = /(project|portfolio|app|application|website)/i.test(
    lowerMsg
  );
  const isService = /(service|skill|offer|what.*can|what.*do|expertise)/i.test(
    lowerMsg
  );
  const isSocial =
    /(social|link|github|linkedin|facebook|twitter|instagram)/i.test(lowerMsg);
  const isGreeting =
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(
      lowerMsg
    );

  const generateFallback = () => {
    if (isGreeting)
      return "Hello! I'm Dave's portfolio assistant. Ask me about experiences, projects, services, education, or social links.";
    if (isService)
      return services
        .map((s) => `• **${s.title}**\n  ${s.description}`)
        .join("\n\n");
    if (isExperience)
      return experienceData.experiences
        .map(
          (e) =>
            `• **${e.role}** — ${e.company} (${e.years})\n  ${e.description}`
        )
        .join("\n\n");
    if (isEducation)
      return experienceData.education
        .map((e) => `• **${e.degree}** — ${e.school} (${e.years})`)
        .join("\n\n");
    if (isReference)
      return experienceData.references
        .map(
          (r) =>
            `• **${r.name}** — ${r.position}\n  Email: ${r.email}\n  Phone: ${r.phone}`
        )
        .join("\n\n");
    if (isProject)
      return projects
        .filter((p) => p.title && p.description)
        .map(
          (p) =>
            `• **${p.title}**\n  ${p.description}${
              p.link ? `\n  Link: ${p.link}` : ""
            }`
        )
        .join("\n\n");
    if (isSocial)
      return socialLinks.map((l) => `• **${l.website}**: ${l.link}`).join("\n");
    return "Ask me about Dave's experience, projects, services, education, or social links.";
  };

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: mode === "pro" ? "gemini-1.5-pro" : "gemini-1.5-flash",
    });

    let prompt;
    if (isGreeting)
      prompt = `Reply warmly to: "${message}" as Dave's portfolio assistant.`;
    else if (
      isExperience ||
      isEducation ||
      isReference ||
      isProject ||
      isService ||
      isSocial
    ) {
      prompt = `
Answer using ONLY this data:

EXPERIENCES: ${JSON.stringify(experienceData.experiences)}
EDUCATION: ${JSON.stringify(experienceData.education)}
REFERENCES: ${JSON.stringify(experienceData.references)}
PROJECTS: ${JSON.stringify(projects)}
SERVICES: ${JSON.stringify(services)}
SOCIAL LINKS: ${JSON.stringify(socialLinks)}

User: "${message}"

Rules:
- Bullet points only
- No extra text
- Be concise
`;
    } else prompt = `Guide user to ask about Dave's portfolio.`;

    const result = await model.generateContent(() => prompt);
    return res.status(200).json({ reply: result.response.text() });
  } catch (apiError) {
    console.warn("AI failed, using fallback:", apiError.message);
    return res
      .status(200)
      .json({ reply: generateFallback(), note: "Fallback used" });
  }
}

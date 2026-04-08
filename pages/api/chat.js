import { GoogleGenerativeAI } from "@google/generative-ai";
import LRU from "lru-cache";

import experienceData from "../../Static/experience.json";
import projects from "../../Static/myproject.json";
import services from "../../Static/services.json";
import socialLinks from "../../Static/SocialLinks.json";

const rateLimit = new LRU({
  max: 500,
  ttl: 1000 * 60,
});

function checkRateLimit(ip) {
  const user = rateLimit.get(ip) || { count: 0 };

  user.count += 1;
  rateLimit.set(ip, user);

  if (user.count > 10) return false;

  return true;
}

const cooldownMap = new Map();

function checkCooldown(ip) {
  const now = Date.now();
  const last = cooldownMap.get(ip) || 0;

  if (now - last < 1500) return false; // 1.5s cooldown

  cooldownMap.set(ip, now);
  return true;
}

function isInvalidMessage(message) {
  if (!message) return "Message is required";
  if (typeof message !== "string") return "Invalid message type";

  const trimmed = message.trim();

  if (trimmed.length < 2) return "Message too short";
  if (trimmed.length > 500) return "Message too long";

  const suspiciousPatterns = /(http|www|\.com|free money|click here)/i;
  if (suspiciousPatterns.test(trimmed)) return "Suspicious content detected";

  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  if (!checkCooldown(ip)) {
    return res.status(429).json({
      error: "You're sending requests too fast.",
    });
  }

  try {
    const { message, mode } = req.body;

    const validationError = isInvalidMessage(message);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const lowerMsg = message.toLowerCase().trim();

    const isExperience =
      /(experience|job|work|career|background|role|position)/i.test(lowerMsg);

    const isEducation = /(education|degree|school|college|study)/i.test(
      lowerMsg
    );

    const isReference = /(reference|recommendation|contact)/i.test(lowerMsg);

    const isProject = /(project|portfolio|app|application|website)/i.test(
      lowerMsg
    );

    const isService =
      /(service|skill|offer|what.*can|what.*do|expertise)/i.test(lowerMsg);

    const isSocial =
      /(social|link|github|linkedin|facebook|twitter|instagram)/i.test(
        lowerMsg
      );

    const isGreeting =
      /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(
        lowerMsg
      );

    const generateFallbackResponse = () => {
      if (isGreeting) {
        return "Hello! I'm Dave's portfolio assistant. Ask me about experiences, projects, services, education, or social links.";
      }

      if (isService) {
        return services
          .map((s) => `• **${s.title}**\n  ${s.description}`)
          .join("\n\n");
      }

      if (isExperience) {
        return experienceData.experiences
          .map(
            (e) =>
              `• **${e.role}** — ${e.company} (${e.years})\n  ${e.description}`
          )
          .join("\n\n");
      }

      if (isEducation) {
        return experienceData.education
          .map((e) => `• **${e.degree}** — ${e.school} (${e.years})`)
          .join("\n\n");
      }

      if (isReference) {
        return experienceData.references
          .map(
            (r) =>
              `• **${r.name}** — ${r.position}\n  Email: ${r.email}\n  Phone: ${r.phone}`
          )
          .join("\n\n");
      }

      if (isProject) {
        return projects
          .filter((p) => p.title && p.description)
          .map(
            (p) =>
              `• **${p.title}**\n  ${p.description}${
                p.link ? `\n  Link: ${p.link}` : ""
              }`
          )
          .join("\n\n");
      }

      if (isSocial) {
        return socialLinks
          .map((l) => `• **${l.website}**: ${l.link}`)
          .join("\n");
      }

      return "Ask me about Dave's experience, projects, services, education, or social links.";
    };

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({
        model: mode === "pro" ? "gemini-1.5-pro" : "gemini-1.5-flash",
      });

      let prompt;

      if (isGreeting) {
        prompt = `Reply warmly to: "${message}" as Dave's portfolio assistant.`;
      } else if (
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
      } else {
        prompt = `Guide user to ask about Dave's portfolio.`;
      }

      const result = await model.generateContent(prompt);

      return res.status(200).json({
        reply: result.response.text(),
      });
    } catch (apiError) {
      console.warn("AI failed, using fallback:", apiError.message);

      return res.status(200).json({
        reply: generateFallbackResponse(),
        note: "Fallback response used",
      });
    }
  } catch (err) {
    console.error("Unexpected error:", err);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

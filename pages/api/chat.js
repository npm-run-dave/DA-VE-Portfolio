import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Import JSON data (fixed paths)
import experiences from "../../Static/experience.json";
import projects from "../../Static/myproject.json";
import socialLinks from "../../Static/SocialLinks.json";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, mode } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // ✅ Keywords that map to portfolio queries
    const portfolioKeywords = [
      "education",
      "study",
      "school",
      "experience",
      "job",
      "work",
      "projects",
      "project",
      "portfolio",
      "services",
      "skills",
      "social",
      "github",
      "linkedin",
      "facebook",
      "references",
    ];

    // ✅ Greetings
    const greetings = ["hi", "hello", "hey", "good morning", "good evening"];

    const lowerMsg = message.toLowerCase();
    const isGreeting = greetings.some((g) => lowerMsg.includes(g));
    const isPortfolioRelated = portfolioKeywords.some((k) =>
      lowerMsg.includes(k)
    );

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: mode === "pro" ? "gemini-1.5-pro" : "gemini-1.5-flash",
    });

    let prompt;

    if (isGreeting) {
      // ✅ Always allow greetings
      prompt = `The user said "${message}". 
Reply warmly as Dave's portfolio assistant and invite them to ask about his projects, experiences, or social links.`;
    } else if (isPortfolioRelated) {
      // ✅ Always answer strictly from JSON portfolio data
      const portfolioData = {
        experiences,
        projects,
        socialLinks,
      };

      prompt = `
You are Dave's Portfolio Assistant. 
Answer the user's question STRICTLY using the portfolio data below:

${JSON.stringify(portfolioData, null, 2)}

The user asked: "${message}"

Rules:
- Always respond directly with the relevant data.
- Be concise and professional.
- If asked about projects, list them from the portfolio.
- Do not say "I can't answer"; always provide the relevant info.
      `;
    } else {
      // ✅ Polite redirect for unrelated stuff
      prompt = `
The user asked: "${message}".

This is NOT related to Dave's portfolio. 
Reply politely and guide them back, e.g.:
"I'm here to help you learn about Dave's portfolio. Could you ask about his experiences, projects, or social links?"
      `;
    }

    const result = await model.generateContent(prompt);

    res.status(200).json({ reply: result.response.text() });
  } catch (err) {
    console.error("Gemini API error:", err);

    if (err.status === 429) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please wait and try again.",
      });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import experienceData from "../../Static/experience.json";
import projects from "../../Static/myproject.json";
import services from "../../Static/services.json";
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

    const lowerMsg = message.toLowerCase().trim();

    const isExperience = /(experience|job|work|career|background|role|position)/i.test(lowerMsg);
    const isEducation = /(education|degree|school|college|study)/i.test(lowerMsg);
    const isReference = /(reference|recommendation|contact)/i.test(lowerMsg);
    const isProject = /(project|portfolio|app|application|website)/i.test(lowerMsg);
    const isService = /(service|skill|offer|what.*can|what.*do|expertise)/i.test(lowerMsg);
    const isSocial = /(social|link|github|linkedin|facebook|twitter|instagram)/i.test(lowerMsg);
    const isGreeting = /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(lowerMsg);

    const generateFallbackResponse = () => {
      if (isGreeting) {
        return "Hello! I'm Dave's portfolio assistant. I can tell you about his experiences, projects, services, education, or social links. What would you like to know?";
      }

      if (isService) {
        const serviceEmojis = ["🎨", "💻", "🎯", "⚡", "📱", "🔧"];
        return services.map((service, index) => 
          `• ${serviceEmojis[index % serviceEmojis.length]} **${service.title}**\n  ${service.description}`
        ).join('\n\n');
      }

      if (isExperience) {
        return experienceData.experiences.map(exp => 
          `• **${exp.role}** — ${exp.company} (${exp.years})\n  ${exp.description}`
        ).join('\n\n');
      }
      
      if (isEducation) {
        return experienceData.education.map(edu => 
          `• **${edu.degree}** — ${edu.school} (${edu.years})`
        ).join('\n\n');
      }
      
      if (isReference) {
        return experienceData.references.map(ref => 
          `• **${ref.name}** — ${ref.position}\n  Email: ${ref.email}\n  Phone: ${ref.phone}`
        ).join('\n\n');
      }
      
      if (isProject) {
        const validProjects = projects.filter(p => p.title && p.description);
        return validProjects.map(proj => 
          `• **${proj.title}**\n  ${proj.description}${proj.link ? `\n  Link: ${proj.link}` : ''}`
        ).join('\n\n');
      }
      
      if (isSocial) {
        return socialLinks.map(link => 
          `• **${link.website}**: ${link.link}`
        ).join('\n');
      }

      return "I'm here to help you learn about Dave's portfolio. You can ask about:\n• His work experiences\n• His education background\n• His projects\n• Services he offers\n• Social media links\n• Professional references\n\nWhat would you like to know?";
    };

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: mode === "pro" ? "gemini-1.5-pro" : "gemini-1.5-flash",
      });

      let prompt;

      if (isGreeting) {
        prompt = `The user said "${message}". Reply warmly as Dave's portfolio assistant and briefly invite them to ask about specific portfolio items.`;
      } else if (isExperience || isEducation || isReference || isProject || isService || isSocial) {
        prompt = `
You are Dave's Portfolio Assistant. Answer the user's question using ONLY the data below:

EXPERIENCES: ${JSON.stringify(experienceData.experiences)}
EDUCATION: ${JSON.stringify(experienceData.education)}
REFERENCES: ${JSON.stringify(experienceData.references)}
PROJECTS: ${JSON.stringify(projects.filter(p => p.title && p.description))}
SERVICES: ${JSON.stringify(services)}
SOCIAL LINKS: ${JSON.stringify(socialLinks)}

User question: "${message}"

RULES:
- Respond ONLY with the requested information
- Use bullet points for lists
- No follow-up questions
- No conversational fluff
- Be direct and concise`;
      } else {
        prompt = `The user asked: "${message}". This is not portfolio-related. Politely guide them to ask about Dave's portfolio.`;
      }

      const result = await model.generateContent(prompt);
      res.status(200).json({ reply: result.response.text() });
      
    } catch (apiError) {
      console.warn("API failed, using fallback:", apiError.message);
      const fallbackResponse = generateFallbackResponse();
      res.status(200).json({ 
        reply: fallbackResponse,
        note: "Using local data response"
      });
    }

  } catch (err) {
    console.error("Unexpected error:", err);
    
    const finalFallback = `I'm Dave's portfolio assistant. Due to technical limitations, I can provide information from my local database:

Services Dave offers:
${services.map(service => `• ${service.title}: ${service.description}`).join('\n')}

Feel free to ask about experiences, projects, education, or social links!`;

    res.status(200).json({ reply: finalFallback });
  }
}
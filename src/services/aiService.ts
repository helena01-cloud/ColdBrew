import { GoogleGenAI } from "@google/genai";
import { GenerationRequest } from "../types";
import { storageService } from "./storageService";

export const aiService = {
  generateOutreach: async (request: GenerationRequest): Promise<string> => {
    const { type, limit, data } = request;
    
    // Prioritize user-provided key, fallback to env (if available)
    const userApiKey = storageService.getApiKey();
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("API_KEY_MISSING");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const limitInstruction = limit === 'unlimited' 
      ? "Keep it concise but thorough." 
      : `STRICTLY keep the message under ${limit} characters. This is a hard limit.`;

    let prompt = "";

    if (type === 'recruiter') {
      const d = data as any;
      prompt = `
        You are a helpful career assistant. Write a personalized LinkedIn outreach message to a Recruiter or Hiring Manager.
        
        Context:
        - Target Role: ${d.role}
        - Why the user is a good fit: ${d.whyFit}
        - The Ask: ${d.ask}
        
        Guidelines:
        - Tone: Warm, professional, confident, and intentional.
        - Avoid generic phrasing like "I hope this finds you well".
        - Sound like a real person, not a bot.
        - ${limitInstruction}
        - Focus on the value the user brings and the specific ask.
      `;
    } else {
      const d = data as any;
      prompt = `
        You are a helpful career assistant. Write a personalized LinkedIn outreach message for a Coffee Chat / Networking request.
        
        Context:
        - Reason for reaching out: ${d.whyReachOut}
        - Topic to chat about: ${d.chatTopic}
        - The Ask: ${d.ask}
        
        Guidelines:
        - Tone: Warm, curious, respectful of their time, and professional.
        - Avoid generic phrasing.
        - Sound like a real person, not a bot.
        - ${limitInstruction}
        - Focus on genuine interest in their journey or expertise.
      `;
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          temperature: 0.8, // Slightly higher for variation on retry
        }
      });

      return response.text || "Failed to generate message. Please try again.";
    } catch (error) {
      console.error("AI Generation Error:", error);
      return "I'm having trouble brewing your message right now. Please try again in a moment.";
    }
  }
};

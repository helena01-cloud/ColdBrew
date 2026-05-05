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
      const firstName = d.contactName ? d.contactName.trim().split(' ')[0] : 'there';
      prompt = `
        You are a helpful career assistant. Write a personalized LinkedIn outreach message to a Recruiter or Hiring Manager.
        
        Recipient Details:
        - Name: ${d.contactName || 'Hiring Manager'}
        - Role: ${d.contactRole || 'Recruiter'}
        - Company: ${d.company || 'the company'}

        Context:
        - Target Role: ${d.role}
        - Why the user is a good fit: ${d.whyFit}
        - The Ask: ${d.ask}
        
        Guidelines:
        - Start with a personalized greeting using ONLY their first name: "Hi ${firstName}" or similar. Do not include the last name in the greeting.
        - Tone: Warm, professional, confident, and intentional.
        - Avoid generic phrasing like "I hope this finds you well".
        - Sound like a real person, not a bot.
        - ${limitInstruction}
        - Focus on the value the user brings and the specific ask.
      `;
    } else {
      const d = data as any;
      const firstName = d.contactName ? d.contactName.trim().split(' ')[0] : 'there';
      prompt = `
        You are a helpful career assistant. Write a personalized LinkedIn outreach message for a Coffee Chat / Networking request.
        
        Recipient Details:
        - Name: ${d.contactName || 'Professional'}
        - Role: ${d.contactRole || 'Professional'}
        - Company: ${d.company || 'the company'}

        Context:
        - Reason for reaching out: ${d.whyReachOut}
        - Topic to chat about: ${d.chatTopic}
        - The Ask: ${d.ask}
        
        Guidelines:
        - Start with a personalized greeting using ONLY their first name: "Hi ${firstName}" or similar. Do not include the last name in the greeting.
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

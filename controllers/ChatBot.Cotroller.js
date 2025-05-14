import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey:process.env.API_KEY
});

export const chatBot = async (req, res) => {
  const { prompt } = req.body;
    const firstAidInstruction = `
        You are a helpful assistant who ONLY answers questions related to FIRST AID, also respond to greetings and tell the user your roles and MEDICAL EMERGENCIES.
        If the question is not about first aid amd medicine, kindly respond:
        "I'm here to assist with first aid questions only. Please ask me something related to emergency medical care or basic first aid treatment."
         Here is the user's question:`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: firstAidInstruction + prompt }] }], 
    });
   
    const responseText = response.candidates[0]?.content?.parts[0]?.text;

    res.status(200).json({
      message: "Responded",
      data: responseText,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({
      message: "Error",
      error: error.message || error, 
    });
  }
};
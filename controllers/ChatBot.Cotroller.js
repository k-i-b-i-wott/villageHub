import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey:process.env.API_KEY
});

export const chatBot = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }], 
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
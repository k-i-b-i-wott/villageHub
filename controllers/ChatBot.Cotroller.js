
import { GoogleGenAI } from "@google/genai";
import { config } from 'dotenv';

config();

const geminiAi = new GoogleGenAI({
  apiKey: process.env.API_KEY  
})




export const chatBot = async(req, res) => {
  const userMessage= req.body;
  try {
    const response = await geminiAi.models.generateContent
    res.status(200).json({
      message: response.choices[0].message.content,
    });  
  } catch (error) {
    console.error(error);
    res.status(500).json({
       message: 'Internal Server Error',
       error,      
      });
  }
}

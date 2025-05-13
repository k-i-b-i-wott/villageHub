import {PrismaClient} from '@prisma/client'

const client = new PrismaClient()


export const chatBot = async (req, res) => {
  const userMessage= req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  
  const botResponse = `You said: "${userMessage}". I'm just a simple bot for now.`;

  try {
    
    await client.chatMessages.create({
      data: {
        userMessage,
        botResponse,
      },
    });

    res.json({ response: botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

import { Handler } from "@netlify/functions";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are RockyTalky, a friendly chatbot that answers questions about Rocky Munoz. You speak in a warm, conversational tone.

About Rocky:
- Rocky is a software developer who loves building awesome tools that enrich people's lives
- His main tech stack includes React, Node.js, Python, MySQL, and Zsh scripting
- He values work-life balance and spends time with his wife and kids when not working
- He's a big fan of The Legend of Zelda games (loves exploring every inch of Hyrule)
- He's bilingual (Spanish/English) - his greeting toggles between "¡Hola!" and "Hello!"
- Contact email: almostheresy@gmail.com
- LinkedIn: linkedin.com/in/rocky-munoz/
- GitHub: github.com/rmunoz33
- Codewars: codewars.com/users/rmunoz33

When answering:
- Be friendly and conversational
- If asked about topics unrelated to Rocky, politely redirect to what you know about him
- If you don't know something specific about Rocky, say so honestly
- Keep responses concise but helpful`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "OpenAI API key not configured" }),
    };
  }

  try {
    const { message, history = [] }: RequestBody = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Build messages array with system prompt and history
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
    });

    const reply = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get response from AI" }),
    };
  }
};

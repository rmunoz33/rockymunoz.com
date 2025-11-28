import { Handler } from "@netlify/functions";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a friendly chatbot that ONLY answers questions about Rocky Muñoz. You speak in a warm, conversational tone.

About Rocky:

**Current Role:**
- Lead Software Engineer at DataRM LLC (since Sept 2023)
- 7+ years of full-stack software engineering experience
- Led development on AVA, DataRM's AI-powered virtual assistant web app, from concept to MVP
- Provides technical leadership, mentorship, and conducts code reviews
- Tech stack: Next.js 14, FastAPI, Tailwind CSS, DaisyUI, Zustand, PostgreSQL, Azure

**Previous Experience:**
- Front-End Developer at QRails (earned wage access mobile app)
- Software Consultant at Turnberry Solutions
- Software Engineer at Boecore (DoD industry, Secret-Level Security Clearance, worked with Lockheed Martin)
- Internal Developer at Pushpay (automated data migrations, built internal tools)
- Technical Support at Church Community Builder

**Technical Skills:**
- Languages: JavaScript, TypeScript, Python, C#, SQL, Bash (expert); HTML/CSS (proficient); PHP (familiar)
- Frontend: React.js, React Native, Next.js, Tailwind CSS
- Backend: Node.js, Express.js, FastAPI, .NET
- Other: LangChain, Docker, Cypress, Playwright, MongoDB, PostgreSQL, Azure DevOps

**Education:**
- Full Stack Web + Mobile Development, Nucamp (2019-2020, Graduate with Honors)
- Master of Arts in Christian Thought, Bethel Seminary (2013-2016, Magna Cum Laude)

**Personal:**
- Based in Colorado Springs, CO
- Values work-life balance; spends time with his wife and kids
- Big fan of The Legend of Zelda games
- Knows a little Spanish (not fluent)
- Passionate about building technology that enriches human connection
- Avid AI user; has used GitHub Copilot, Cursor, and Claude Code (current preference)

**Side Project:**
- Building an AI dungeon master web app with his middle school son
- A passion project combining their love of D&D-style RPGs
- Tech: Next.js 15, TypeScript, Express, MongoDB, GraphQL, Redis
- GitHub repos: dnd-homebrew-frontend, dnd-homebrew-database

**Cultural Initiatives:**
- Conducted coding bootcamps for colleagues at Pushpay
- Participated on Race & Culture Committee at Pushpay
- Started company-funded audiobook program at Boecore

**Contact:**
- Email: almostheresy@gmail.com
- Phone: 719-659-7418
- LinkedIn: linkedin.com/in/rocky-munoz
- GitHub: github.com/rmunoz33

IMPORTANT RULES:
- ONLY answer questions about Rocky. Do NOT answer unrelated questions like recipes, general knowledge, math, coding help, etc.
- If asked about anything not related to Rocky, politely decline and redirect: "I'm here to tell you about Rocky! Is there something about his work, skills, or interests you'd like to know?"
- Keep responses concise (2-3 sentences when possible)
- Use simple markdown formatting (bold, italics, bullet lists) when helpful
- If you don't know something specific about Rocky, say so honestly`;

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
    const { message, history = [] }: RequestBody = JSON.parse(
      event.body || "{}"
    );

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
      model: "gpt-4.1-nano",
      messages,
      max_tokens: 500,
    });

    const reply =
      response.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

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

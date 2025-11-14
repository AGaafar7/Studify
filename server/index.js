import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", // OpenRouter endpoint
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "https://your-site.com", // optional
    "X-Title": "Studify",                     // optional
  },
});

app.post("/api/message", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini", // fast, cheap, free-tier friendly
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: text },
      ],
    });

    const aiResponse = completion.choices[0]?.message?.content || "No response";

    res.json({ response: aiResponse });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI error", details: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/message", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  const mockResponse = `AI Response to: "${text}"`;
  res.json({ response: mockResponse });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

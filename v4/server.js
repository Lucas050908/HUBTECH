require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialiser OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Chat-endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("Chat-server fejl:", error);
    res.status(500).json({ reply: "Noget gik galt på serveren." });
  }
});

// Start server
app.listen(3001, () => {
  console.log("⚡ Chat-server kører på http://localhost:3000");
});
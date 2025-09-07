const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");


process.on("uncaughtException", err => console.error("Uncaught Exception:", err));
process.on("unhandledRejection", err => console.error("Unhandled Rejection:", err));

console.log("server.js loaded");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));


const API_KEY = "AIzaSyA5o7Git-GavoXH6JgFTuwyINTHHigmm00";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";


app.post("/chat", async (req, res) => {
  try {
    const { message, lang } = req.body;
    const payload = {
      contents: [{ parts: [{ text: message }] }],
      systemInstruction: {
        parts: [{
          text: `You are Cattl-ist, an AI assistant for Indian farmers. Answer in ${lang}.`
        }]
      }
    };

    const response = await fetch(`${BASE_URL}gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/image", async (req, res) => {
  try {
    const { base64, mimeType, lang } = req.body;
    const payload = {
      contents: [{
        parts: [
          { text: `Identify the cattle breed in this image and describe in ${lang}.` },
          { inlineData: { mimeType, data: base64 } }
        ]
      }]
    };

    const response = await fetch(`${BASE_URL}gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Image error:", err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = 5000;
console.log("About to start server...");

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
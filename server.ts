import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Consultation Form
  app.post("/api/consultation", async (req, res) => {
    const { name, phone, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Имя и телефон обязательны" });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycby-Jfhz2-p1KJEjOc2-6A0yhKljBi91n1YNDqVAI8xwkGG1owS07oN_NnlGGZQbtfvt3Q/exec";

    if (!webhookUrl) {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL is not set. Form data will only be logged.");
      console.log("Form submission:", { name, phone, message });
      return res.json({ success: true, message: "Данные получены (Webhook не настроен)" });
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone: `'${phone}`, // Prepend single quote to treat as text in Google Sheets
          message,
          timestamp: new Date().toLocaleString("ru-RU"), // More readable date format
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send to Google Sheets: ${response.statusText}`);
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error sending to Google Sheets:", error);
      res.status(500).json({ error: "Ошибка при отправке данных" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

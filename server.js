const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = 3000;

/* -------------------- HTTP SERVER -------------------- */
const server = http.createServer((req, res) => {
  // Map URL to file
  let filePath = "." + (req.url === "/" ? "/index.html" : req.url);

  // Get file extension
  const ext = path.extname(filePath);

  // Content type mapping
  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg"
  };

  const contentType = contentTypes[ext] || "text/plain";

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("404 - Not Found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

/* -------------------- WEBSOCKET SERVER -------------------- */
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("🔗 Client connected");

  ws.on("message", (message) => {
    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

/* -------------------- START SERVER -------------------- */
server.listen(PORT, () => {
  console.log(`🚀 UnknownCrypt running on http://localhost:${PORT}`);
});

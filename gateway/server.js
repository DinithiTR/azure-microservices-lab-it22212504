const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// === CORS FIX (required for browser) ===
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// =======================================

app.get('/', (req, res) => {
  res.send(`<h1 style="color: #0078d4; text-align: center; margin-top: 50px;">✅ SLIIT Azure Microservices Gateway is Running!</h1>`);
});

app.get('/health', (req, res) => {
  res.json({ status: "healthy", message: "Gateway is ready" });
});

app.get('/api/info', (req, res) => {
  res.json({
    service: "Gateway",
    student: "it22212504",
    message: "Hello from Azure Microservices Lab!",
    timestamp: new Date().toISOString(),
    region: "eastasia"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Gateway running on http://localhost:${PORT}`);
});

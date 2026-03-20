const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1 style="color: #0078d4; text-align: center; margin-top: 50px;">
      SLIIT Azure Microservices Gateway is Running!
    </h1>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Gateway is ready' });
});

app.get('/api/info', (req, res) => {
  res.json({
    service: 'Gateway',
    student: 'it22212504',
    message: 'Hello from Azure Microservices Lab!',
    timestamp: new Date().toISOString(),
    region: 'eastasia'
  });
});

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});

# SLIIT Azure Microservices Lab - Full Sample Application Setup Guide
**Module:** Current Trends in Software Engineering (SE4010) - 2026 Semester 1

This is **ONE single file** that contains **everything** you need to create the full sample application on your own.  
You will get:
- Complete Node.js Gateway microservice (with Dockerfile)
- Complete modern React frontend (using Vite + React)
- .gitignore for both parts
- Professional README.md
- Step-by-step copy-paste instructions

After following this file, you will have a GitHub repo ready for **Task 3** and **Task 5** of the lab.

---

## Step 0: Create the Project Folder (Run once)

Open Terminal and run:

```bash
mkdir ~/azure-microservices-lab
cd ~/azure-microservices-lab
Part 1: Gateway Service (Node.js + Docker)
1.1 Create the gateway folder and files
Bashmkdir gateway
cd gateway
Create package.json
Bashcat > package.json << 'EOP'
{
  "name": "gateway",
  "version": "1.0.0",
  "description": "Azure Microservices Gateway - SLIIT Lab",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
EOP
Create server.js (full microservice with 3 endpoints)
Bashcat > server.js << 'EOP'
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1 style="color: #0078d4; text-align: center; margin-top: 50px;">
      ✅ SLIIT Azure Microservices Gateway is Running!
    </h1>
  `);
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
EOP
Create Dockerfile
Bashcat > Dockerfile << 'EOP'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
EOP
Create .gitignore for gateway
Bashcat > .gitignore << 'EOP'
node_modules/
npm-debug.log
EOP

Part 2: React Frontend (Modern Vite + React)
Go back to root:
Bashcd ~/azure-microservices-lab
2.1 Create the React app using Vite (fastest way)
Bashmkdir frontend
cd frontend
npx create-vite@latest . --template react
Answer "yes" if it asks to overwrite.
2.2 Install dependencies + replace key files
Bashnpm install
Replace src/App.jsx (beautiful UI that calls your gateway)
Bashcat > src/App.jsx << 'EOP'
import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://YOUR-GATEWAY-URL.azurecontainerapps.io';

  const fetchGateway = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/info`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      alert("❌ Cannot connect to Gateway. Make sure the Container App is running!");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header>
        <h1>🎓 SLIIT Azure Microservices Lab</h1>
        <p>it22212504 - React Frontend + Gateway</p>
      </header>

      <main>
        <div className="card">
          <h2>Gateway Status Checker</h2>
          <button onClick={fetchGateway} disabled={loading}>
            {loading ? 'Fetching...' : '🚀 Call Gateway API'}
          </button>

          {data && (
            <pre style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </main>

      <footer>
        <p>Frontend deployed with Azure Static Web Apps • Backend with Azure Container Apps</p>
      </footer>
    </div>
  );
}

export default App;
EOP
Replace src/App.css (nice styling)
Bashcat > src/App.css << 'EOP'
.App {
  text-align: center;
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

header h1 {
  color: #0078d4;
  font-size: 2.5rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin: 30px 0;
}

button {
  background: #0078d4;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #005a9e;
}

pre {
  text-align: left;
  font-size: 0.95rem;
}
EOP
Create .env.example
Bashcat > .env.example << 'EOP'
VITE_API_URL=https://your-gateway-fqdn.azurecontainerapps.io
EOP
Create .gitignore for frontend (replace the default one)
Bashcat > .gitignore << 'EOP'
node_modules
dist
.env
.DS_Store
EOP

Part 3: Root Files
Go back to root folder:
Bashcd ~/azure-microservices-lab
Create main .gitignore
Bashcat > .gitignore << 'EOP'
# Root
node_modules/
dist/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
EOP
Create professional README.md
Bashcat > README.md << 'EOP'
# Azure Microservices Lab - SLIIT 2026

## Architecture
- **Gateway**: Node.js Express microservice (Dockerized) → Azure Container Apps
- **Frontend**: React (Vite) → Azure Static Web Apps
- **Registry**: Azure Container Registry

## How to run locally
1. Gateway: `cd gateway && npm start`
2. Frontend: `cd frontend && npm run dev`

## Endpoints
- Gateway: `/health` and `/api/info`

EOP
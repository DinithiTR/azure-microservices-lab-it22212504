# Azure Microservices Lab - SLIIT 2026

Sample application for the SLIIT Azure Microservices lab using a Dockerized Node.js gateway and a React frontend.

## Architecture

- Gateway: Node.js + Express, intended for Azure Container Apps
- Frontend: React + Vite, intended for Azure Static Web Apps
- Registry: Azure Container Registry

## Project Structure

```text
.
|- gateway/
|  |- Dockerfile
|  |- package.json
|  `- server.js
`- frontend/
   |- package.json
   |- index.html
   `- src/
```

## Run Locally

### Gateway

```bash
cd gateway
npm install
npm start
```

The gateway runs on `http://localhost:3000`.

Available endpoints:

- `GET /`
- `GET /health`
- `GET /api/info`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Update `VITE_API_URL` in `.env` to point to your deployed or local gateway.

## Deployment Targets

- Gateway -> Azure Container Apps
- Frontend -> Azure Static Web Apps

import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl =
    import.meta.env.VITE_API_URL || 'https://YOUR-GATEWAY-URL.azurecontainerapps.io';

  const fetchGateway = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/info`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      window.alert('Cannot connect to Gateway. Make sure the Container App is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">SE4010 - Current Trends in Software Engineering</p>
        <h1>SLIIT Azure Microservices Lab</h1>
        <p className="subtitle">it22212504 - React Frontend + Gateway</p>
      </header>

      <main className="main-content">
        <section className="card">
          <h2>Gateway Status Checker</h2>
          <p>Call the deployed gateway service and inspect the current response payload.</p>

          <button onClick={fetchGateway} disabled={loading}>
            {loading ? 'Fetching...' : 'Call Gateway API'}
          </button>

          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </section>
      </main>

      <footer className="footer">
        <p>Frontend deployed with Azure Static Web Apps. Backend deployed with Azure Container Apps.</p>
      </footer>
    </div>
  );
}

export default App;

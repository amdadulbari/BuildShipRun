import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = "http://localhost:8080";

type Greeting = {
  id: number;
  name: string;
};

function App() {
  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [newGreeting, setNewGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchGreetings = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/greetings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGreetings(data);
    } catch (error) {
      console.error("Error fetching greetings:", error);
      setError("Failed to fetch greetings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGreetings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGreeting.trim()) return;

    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/greetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newGreeting }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGreetings([...greetings, data]);
      setNewGreeting("");
      setSuccess("Greeting added successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error adding greeting:", error);
      setError("Failed to add greeting. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/greetings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setGreetings(greetings.filter(greeting => greeting.id !== id));
      setSuccess("Greeting deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error deleting greeting:", error);
      setError("Failed to delete greeting. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-section">
          <h1>Docker Learning App</h1>
          <p className="subtitle">A Full-Stack Learning Project for Beginners</p>
          <p className="description">
            A practice project for newbies who want to learn Docker. 
            Master containerization while building a full-stack application.
          </p>
        </div>

        <div className="tech-stack">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <span>React</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">☕</span>
            <span>Java</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🐬</span>
            <span>MySQL</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🐳</span>
            <span>Docker</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🔄</span>
            <span>Nginx</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="card">
          <h2>Add New Greeting</h2>
          <form onSubmit={handleSubmit} className="greeting-form">
            <input
              type="text"
              value={newGreeting}
              onChange={(e) => setNewGreeting(e.target.value)}
              placeholder="Enter a greeting message"
              className="greeting-input"
            />
            <button type="submit" className="greeting-button">
              Add Greeting
            </button>
          </form>
        </div>

        <div className="card">
          <h2>Greetings List</h2>
          {loading ? (
            <div className="loading">Loading greetings...</div>
          ) : greetings.length === 0 ? (
            <div className="empty-state">
              No greetings yet. Add your first greeting above!
            </div>
          ) : (
            <div className="greetings-list">
              {greetings.map((greeting) => (
                <div key={greeting.id} className="greeting-item">
                  <div className="greeting-content">
                    <span className="greeting-id">#{greeting.id}</span>
                    <span className="greeting-text">{greeting.name}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(greeting.id)}
                    className="delete-button"
                    title="Delete greeting"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card learning-points">
          <h2>What You'll Learn</h2>
          <div className="points-list">
            <div className="point">
              <span className="point-icon">🐳</span>
              <div className="point-content">
                <h3>Docker Fundamentals</h3>
                <p>Learn containerization, Docker images, and multi-stage builds</p>
              </div>
            </div>
            <div className="point">
              <span className="point-icon">🔄</span>
              <div className="point-content">
                <h3>Container Orchestration</h3>
                <p>Master Docker Compose for multi-container applications</p>
              </div>
            </div>
            <div className="point">
              <span className="point-icon">🌐</span>
              <div className="point-content">
                <h3>Networking & Services</h3>
                <p>Understand container networking and service communication</p>
              </div>
            </div>
            <div className="point">
              <span className="point-icon">📦</span>
              <div className="point-content">
                <h3>Full-Stack Containerization</h3>
                <p>Containerize frontend, backend, and database services</p>
              </div>
            </div>
          </div>
        </div>

        <div className="architecture-info">
          <h3>How it works</h3>
          <div className="architecture-steps">
            <div className="step">
              <span className="step-number">1</span>
              <p>Browser loads the React application from Nginx web server</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <p>React renders the UI and makes API requests directly from the browser to Spring Boot backend</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <p>Spring Boot processes requests and interacts with MySQL database</p>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <p>All components run in Docker containers for easy deployment</p>
            </div>
          </div>
        </div>

        {/* Creator info section - hidden
        <div className="creator-info">
          <p>Created by</p>
          <h4>Md. Amdadul Bari</h4>
          <p className="creator-title">DevOps Engineer & Kubestronaut</p>
        </div>
        */}
      </header>
    </div>
  );
}

export default App;

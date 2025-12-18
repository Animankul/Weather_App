import { useState } from "react";

const TOP_CITIES = ["Pune", "Mumbai", "Delhi", "Bangalore", "Chennai"];

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const sendQuery = async (customQuery) => {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: finalQuery }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = getStyles(darkMode);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>🌦️ Weather Assistant</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={styles.modeButton}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <p style={styles.subtitle}>
          Ask weather questions in natural language
        </p>

        {/* Input */}
        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="e.g. What's the weather in Pune today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendQuery()}
            style={styles.input}
          />
          <button
            onClick={() => sendQuery()}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>

        {/* Top Cities */}
        <div style={styles.citySection}>
          <p style={styles.cityLabel}>Quick cities</p>
          <div style={styles.cityRow}>
            {TOP_CITIES.map((city) => (
              <button
                key={city}
                style={styles.cityButton}
                onClick={() => sendQuery(`Weather in ${city} today`)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Answer */}
        {answer && (
          <div style={styles.answerBox}>
            <strong>Answer</strong>
            <p style={styles.answerText}>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const getStyles = (dark) => ({
  page: {
    minHeight: "100vh",
    backgroundColor: dark ? "#0f172a" : "#f5f7fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, Arial, sans-serif",
    transition: "0.3s",
  },
  card: {
    backgroundColor: dark ? "#020617" : "#ffffff",
    color: dark ? "#e5e7eb" : "#111827",
    padding: "32px",
    width: "460px",
    borderRadius: "14px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
  },
  modeButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    color: "inherit",
  },
  subtitle: {
    marginTop: "6px",
    marginBottom: "20px",
    fontSize: "14px",
    color: dark ? "#9ca3af" : "#6b7280",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: dark ? "1px solid #334155" : "1px solid #d1d5db",
    backgroundColor: dark ? "#020617" : "#ffffff",
    color: dark ? "#e5e7eb" : "#111827",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  citySection: {
    marginTop: "20px",
  },
  cityLabel: {
    fontSize: "13px",
    marginBottom: "8px",
    color: dark ? "#9ca3af" : "#6b7280",
  },
  cityRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  cityButton: {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: dark ? "#1e293b" : "#eef2ff",
    color: dark ? "#e5e7eb" : "#3730a3",
    fontSize: "13px",
    cursor: "pointer",
  },
  answerBox: {
    marginTop: "24px",
    padding: "16px",
    borderRadius: "10px",
    backgroundColor: dark ? "#020617" : "#eef2ff",
    border: dark ? "1px solid #334155" : "none",
  },
  answerText: {
    marginTop: "8px",
    fontSize: "14px",
    lineHeight: "1.6",
  },
});

export default App;

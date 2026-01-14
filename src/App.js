import { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCaption = async () => {
    if (!text) return alert("Enter something");

    setLoading(true);
    setCaption("");

    try {
      const res = await fetch("/api/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setCaption(data.caption);
    } catch (err) {
      alert("AI error");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI Caption Generator</h1>

        <textarea
          style={styles.textarea}
          placeholder="Describe your video or photo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button style={styles.button} onClick={generateCaption}>
          {loading ? "Generating..." : "Generate Caption"}
        </button>

        {caption && <p style={styles.caption}>{caption}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontFamily: "sans-serif",
  },
  card: {
    maxWidth: 500,
    width: "100%",
    background: "#121212",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 0 30px rgba(0,0,0,0.6)",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    border: "none",
    padding: 12,
    fontSize: 16,
    outline: "none",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#6c63ff",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
  caption: {
    marginTop: 20,
    color: "#ddd",
    lineHeight: 1.5,
  },
};

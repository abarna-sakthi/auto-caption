import { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [caption, setCaption] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateCaption = async () => {
    if (!topic) return;

    setLoading(true);
    setCaption("");
    setCopied(false);

    try {
      const res = await fetch("http://localhost:5000/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      setCaption(data.caption);
    } catch {
      setCaption("❌ Error generating caption");
    } finally {
      setLoading(false);
    }
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="app dark-bg">
      <div className="card slide-up">
        <h1 className="title glow-text">AI Caption Generator</h1>

        {/* INPUT */}
        <input
          className="input"
          type="text"
          placeholder="Describe your post..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        {/* LOADING */}
        {loading && <p className="loading">Generating...</p>}

        {/* RESULT */}
        {caption && (
          <div className="caption-card">
            <p className="caption-text">{caption}</p>

            <button className="copy-btn glow" onClick={copyCaption}>
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>
        )}
      </div>

      {/* GENERATE BUTTON */}
      <button className="fab pulse" onClick={generateCaption}>
        ✨ Generate
      </button>
    </div>
  );
}

export default App;

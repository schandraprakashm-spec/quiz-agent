import { useLocation } from "react-router-dom";

function Result({ data: propData }) {
  const location = useLocation();

  // ✔ supports both props and router navigation state
  const data = propData || location.state;

  // ✔ if still no data
  if (!data) {
    return (
      <div style={{ padding: 50 }}>
        <h3>No result data found</h3>
        <p>Please go back and complete the quiz again.</p>
      </div>
    );
  }

  const results = data.results || [];

  return (
    <div
      style={{
        padding: 50,
        minHeight: "100vh",
        backgroundColor: "#ffe6ee",
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 30px)",
        fontFamily: "Arial",
        color: "#222"
      }}
    >
      <h2>Result</h2>

      <h3>Score: {data.score}%</h3>

      <h3>
        {data.score >= 95
          ? "🎉 Good Job"
          : "📚 Please Revise the Topic Again"}
      </h3>

      <p>
        Correct: {data.correct} / {data.total}
      </p>

      <h4>Details:</h4>

      {results.length === 0 ? (
        <p>No details available</p>
      ) : (
        results.map((r, i) => (
          <div
            key={i}
            style={{
              marginBottom: 15,
              padding: 15,
              borderRadius: 8,
              border: "1px solid #cc6699",
              backgroundColor: r.is_correct ? "#d4f7d4" : "#ffd6e0"
            }}
          >
            <p><b>Q:</b> {r.question}</p>

            <p>
              <b>Your Answer:</b>{" "}
              <span style={{ color: r.is_correct ? "green" : "red" }}>
                {r.selected_answer}
              </span>
            </p>

            {!r.is_correct && (
              <p>
                <b>Correct Answer:</b>{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  {r.correct_answer}
                </span>
              </p>
            )}

            <p>{r.is_correct ? "✅ Correct" : "❌ Wrong"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Result;
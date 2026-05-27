import { useLocation } from "react-router-dom";

function Result({
  data: propData,
  setQuizResult,
  setShowSubjects
}) {

  const location = useLocation();

  const data = propData || location.state;

  const goHome = () => {
    setQuizResult(null);
    setShowSubjects(true);
  };

  if (!data) {
    return (
      <div style={{ padding: 50 }}>
        <h3>No result data found</h3>

        <p>Please go back and complete the quiz again.</p>

        <button
          onClick={goHome}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            backgroundColor: "#d36b8d",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontSize: 16
          }}
        >
          Home
        </button>
      </div>
    );
  }

  const wrongAnswers = data.results || [];

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
      <h2>Quiz Result</h2>

      {/* ✅ FINAL FIX: NO CALCULATION */}
      <h3>Score: {data.score}</h3>

      <h3>Percentage: {data.percentage}%</h3>

      <h3>
        {data.percentage >= 95
          ? "🎉 Good Job"
          : "📚 Please Revise the Topic Again"}
      </h3>

      <p style={{ fontSize: 18, fontWeight: "bold" }}>
        Correct Answers: {data.correct} / {data.total}
      </p>

      {data.wrong !== undefined && (
        <p style={{ fontSize: 16 }}>
          Wrong Answers: {data.wrong}
        </p>
      )}

      <hr />

      <h3>Wrong Answers Review</h3>

      {wrongAnswers.length === 0 ? (
        <div
          style={{
            padding: 20,
            backgroundColor: "#e8ffe8",
            border: "1px solid green",
            borderRadius: 8
          }}
        >
          <h3>🎉 Excellent!</h3>
          <p>All answers were correct.</p>
        </div>
      ) : (
        wrongAnswers.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: 20,
              padding: 15,
              borderRadius: 8,
              border: "1px solid #cc6699",
              backgroundColor: "#ffd6e0"
            }}
          >
            <p><b>Question {index + 1}:</b></p>
            <p>{item.question}</p>

            <p>
              <b>Your Answer:</b>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {item.selected_answer}
              </span>
            </p>

            <p>
              <b>Correct Answer:</b>{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                {item.correct_answer}
              </span>
            </p>
          </div>
        ))
      )}

      <button
        onClick={goHome}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          backgroundColor: "#d36b8d",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        Home
      </button>
    </div>
  );
}

export default Result;
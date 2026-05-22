import { useEffect, useState } from "react";

import API from "./api/api";

function Quiz({ setQuizResult }) {

  const [questions, setQuestions] =
    useState([]);

  const [answers, setAnswers] =
    useState({});

  useEffect(() => {

    const fetchQuiz = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await API.get(
          "/quiz",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setQuestions(
          res.data.questions
        );

      } catch (err) {

        console.log(err);

        alert("Failed to load quiz");
      }
    };

    fetchQuiz();

  }, []);

  const handleOptionChange = (
    questionId,
    selectedOption
  ) => {

    setAnswers({

      ...answers,

      [questionId]:
        selectedOption
    });
  };

  const submitQuiz = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const formattedAnswers =
        Object.entries(answers).map(
          (
            [
              question_id,
              selected_answer
            ]
          ) => {

            return {

              question_id:
                Number(question_id),

              selected_answer:
                selected_answer
            };
          }
        );

      const res = await API.post(
        "/submit",
        {
          answers:
            formattedAnswers
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      // transform backend response to the shape expected by Result.js
      const transformed = {
        score: Math.round(res.data.percentage),
        correct: res.data.score,
        total: res.data.total_questions,
        results: (res.data.wrong_answers || []).map((w) => ({
          question: w.question,
          selected_answer: w.your_answer,
          correct_answer: w.correct_answer,
          is_correct: false
        }))
      };

      setQuizResult(transformed);

    } catch (err) {

      console.log(err);

      alert(
        "Failed to submit quiz"
      );
    }
  };

  return (

    <div
      style={{

        padding: "20px",

        minHeight: "100vh",

        backgroundColor: "#f3c6d3",

        backgroundImage:
          "repeating-linear-gradient(to right, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 28px)",

        backgroundAttachment: "fixed",

        fontFamily: "Arial",

        color: "black"

      }}
    >

      <h1>
        Quiz Questions
      </h1>

      {
        questions.map((q, index) => (

          <div
            key={q.id}
            style={{

              backgroundColor:
              index % 2 === 0
                ? "#f7b5c8"
                : "#ffd9e6",
              color: "black",

              padding: 20,

              marginBottom: 20,

              border:
                "1px solid #d9d9d9"

            }}
          >

            <h3>
              {q.question}
            </h3>

            {
              q.options.map(
                (
                  option,
                  optionIndex
                ) => (

                  <label
                    key={optionIndex}
                    style={{

                      display: "flex",

                      alignItems: "center",

                      marginBottom: 12,

                      cursor: "pointer",

                      fontSize: 18

                    }}
                  >

                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}

                      onChange={() =>
                        handleOptionChange(
                          q.id,
                          option
                        )
                      }

                      style={{

                        width: 22,

                        height: 22,

                        accentColor: "#b0004f",

                        cursor: "pointer"

                      }}
                    />

                    <span
                      style={{
                        marginLeft: 12
                      }}
                    >
                      {option}
                    </span>

                  </label>
                )
              )
            }

          </div>
        ))
      }

      <button
        onClick={submitQuiz}
        style={{

          padding:
            "10px 20px",

          backgroundColor:
            "#d36b8d",

          color: "white",

          border: "none",

          cursor: "pointer",

          fontSize: 16

        }}
      >

        Submit Quiz

      </button>

    </div>
  );
}

export default Quiz;
import { useState } from "react";

function Subjects({
  setShowSubjects,
  setSelectedSubject,
  setSelectedUnit
}) {

  const [subject, setSubject] =
    useState("");

  const [unit, setUnit] =
    useState("");

  const subjects = [
    "History",
    "Geography",
    "Indian Society",
    "Current Affairs",
    "Mental Ability"
  ];

  const units = [
    "Unit1",
    "Unit2",
    "Unit3",
    "Unit4",
    "Unit5"
  ];

  const startQuiz = () => {

    if (!subject) {
      alert("Please select a Subject");
      return;
    }

    if (!unit) {
      alert("Please select a Unit");
      return;
    }

    setSelectedSubject(subject);

    setSelectedUnit(unit);

    setShowSubjects(false);
  };

  return (
    <div
      style={{
        padding: 50,
        minHeight: "100vh",
        backgroundColor: "#ffe6ee",
        fontFamily: "Arial"
      }}
    >
      <h1>
        Select Subject & Unit
      </h1>

      <h3>Subject</h3>

      <select
        value={subject}
        onChange={(e) =>
          setSubject(e.target.value)
        }
        style={{
          padding: 10,
          width: 500,
          fontSize: 16
        }}
      >
        <option value="">
          Select Subject
        </option>

        {subjects.map((s, index) => (
          <option
            key={index}
            value={s}
          >
            {s}
          </option>
        ))}
      </select>

      <br />
      <br />

      <h3>Unit</h3>

      <select
        value={unit}
        onChange={(e) =>
          setUnit(e.target.value)
        }
        style={{
          padding: 10,
          width: 300,
          fontSize: 16
        }}
      >
        <option value="">
          Select Unit
        </option>

        {units.map((u, index) => (
          <option
            key={index}
            value={u}
          >
            {u}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button
        onClick={startQuiz}
        style={{
          padding: "12px 24px",
          backgroundColor: "#c2185b",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Subjects;
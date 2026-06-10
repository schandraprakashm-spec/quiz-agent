function Dashboard({
  setShowDashboard,
  setShowSubjects,
  setSelectedSubject,
  setSelectedUnit
}) {

  const dashboardData = {

    History: [85, 72, 65, 48, 90],

    Geography: [88, 81, 74, 69, 92],

    "Indian Society": [55, 62, 58, 73, 60],

    "Current Affairs": [91, 84, 79, 66, 82],

    "Mental Ability": [87, 89, 92, 76, 71]

  };

  const subjectAverages = {

    History: 72,

    Geography: 85,

    "Indian Society": 52,

    "Current Affairs": 69,

    "Mental Ability": 88

  };

  const overallPerformance = {

    overallAvg: 68,

    totalTests: 48,

    bestScore: 92,

    averageScore: 68,

    lastTestScore: 74

  };

  const revisionPriority = [

    "Indian Society - Unit3 (48%)",

    "Indian Society - Unit5 (54%)",

    "History - Unit4 (58%)",

    "Current Affairs - Unit5 (59%)",

    "History - Unit2 (61%)"

  ];

  const getColor = (score) => {

    if (score >= 80) return "#16a34a";

    if (score >= 60) return "#f59e0b";

    return "#dc2626";

  };

  const openSubjects = () => {

    setShowDashboard(false);

    setShowSubjects(true);

  };

  const startUnitQuiz = (
    subject,
    unit
  ) => {

    setSelectedSubject(subject);

    setSelectedUnit(unit);

    setShowSubjects(false);

    setShowDashboard(false);

  };

  return (

    <div
      style={{
        padding: 30,
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          border: "2px solid #4caf50",
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
          textAlign: "center",
          backgroundColor: "#ffffff"
        }}
      >
        <h1
          style={{
            color: "#ff0000",
            fontSize: "42px",
            fontWeight: "bold",
            margin: 0
          }}
        >
          YOU ARE NOT EXAM READY
        </h1>
      </div>

      <div
        style={{
          marginBottom: 30,
          fontSize: 20,
          textAlign: "center"
        }}
      >
        If cumulative average score is below 75%, you are not exam ready.
      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "flex-start"
        }}
      >

        {/* LEFT SIDE */}

        <div style={{ flex: 3 }}>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 120px",
              fontWeight: "bold",
              marginBottom: 15,
              fontSize: 22
            }}
          >
            <div>Subject</div>
            <div>Units Performance</div>
            <div>Subject Avg</div>
          </div>

          {Object.entries(dashboardData).map(
            ([subject, units]) => (

              <div
                key={subject}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr 120px",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: 15,
                  marginBottom: 15,
                  borderRadius: 10
                }}
              >

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: "bold"
                  }}
                >
                  {subject}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap"
                  }}
                >
                  {units.map(
                    (score, index) => (

                      <div
                        key={index}
                        onClick={() =>
                          startUnitQuiz(
                            subject,
                            `Unit${index + 1}`
                          )
                        }
                        style={{
                          backgroundColor: getColor(score),
                          color: "white",
                          width: 90,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 5,
                          fontWeight: "bold",
                          cursor: "pointer"
                        }}
                      >
                        Unit{index + 1}
                      </div>

                    )
                  )}
                </div>

                <div
                  style={{
                    textAlign: "center",
                    fontSize: 40,
                    fontWeight: "bold",
                    color: getColor(
                      subjectAverages[subject]
                    )
                  }}
                >
                  {subjectAverages[subject]}%
                </div>

              </div>

            )
          )}

          <div
            style={{
              marginTop: 20,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              display: "flex",
              gap: 40
            }}
          >
            <div>🟩 ≥80% Good</div>

            <div>🟧 ≥60% Average</div>

            <div>🟥 &lt;60% Bad</div>
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div style={{ flex: 1 }}>

          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              marginBottom: 20
            }}
          >

            <h2 style={{ textAlign: "center" }}>
              Overall Performance
            </h2>

            <hr />

            <p
              style={{
                textAlign: "center"
              }}
            >
              Overall Avg Score
            </p>

            <h1
              style={{
                textAlign: "center",
                color: "red"
              }}
            >
              {overallPerformance.overallAvg}%
            </h1>

            <p>
              Total Tests Taken : {overallPerformance.totalTests}
            </p>

            <p>
              Best Score : {overallPerformance.bestScore}%
            </p>

            <p>
              Average Score : {overallPerformance.averageScore}%
            </p>

            <p>
              Last Test Score : {overallPerformance.lastTestScore}%
            </p>

          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10
            }}
          >

            <h2 style={{ textAlign: "center" }}>
              Revision Priority
            </h2>

            <hr />

            {revisionPriority.map(
              (item, index) => (

                <p
                  key={index}
                  style={{
                    color: "red"
                  }}
                >
                  {index + 1}. {item}
                </p>

              )
            )}

          </div>

          <button
            onClick={openSubjects}
            style={{
              width: "100%",
              marginTop: 20,
              padding: "15px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            Start Assessment
          </button>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;
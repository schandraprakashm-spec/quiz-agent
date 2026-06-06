function Dashboard({
  setShowDashboard,
  setShowSubjects
}) {

  const dashboardData = {

    History: [85, 72, 65, 48, 90],

    Geography: [88, 81, 74, 69, 92],

    "Indian Society": [55, 62, 58, 73, 60],

    "Current Affairs": [91, 84, 79, 66, 82],

    "Mental Ability": [87, 89, 92, 76, 71]

  };

  const getColor = (score) => {

    if (score >= 80) {
      return "#16a34a";
    }

    if (score >= 60) {
      return "#f59e0b";
    }

    return "#dc2626";
  };

  const openSubjects = () => {

    setShowDashboard(false);

    setShowSubjects(true);

  };

  return (

    <div
      style={{
        padding: 50,
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial"
      }}
    >

      <h1>Dashboard</h1>

      <div
        style={{
          border: "2px solid #4caf50",
          borderRadius: 15,
          padding: 20,
          marginBottom: 40,
          textAlign: "center",
          backgroundColor: "#ffffff"
        }}
      >
        <h1
          style={{
            color: "#ff0000",
            fontSize: "42px",
            fontWeight: "bold",
            margin: 0,
            textShadow: "2px 2px 4px rgba(0,0,0,0.25)"
          }}
        >
          YOU ARE NOT EXAM READY
        </h1>
      </div>

      {Object.entries(dashboardData).map(
        ([subject, units]) => (

          <div
            key={subject}
            style={{
              marginBottom: 30
            }}
          >

            <h3
              style={{
                marginBottom: 10
              }}
            >
              {subject}
            </h3>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap"
              }}
            >

              {units.map(
                (score, index) => (

                  <div
                    key={index}
                    style={{
                      backgroundColor:
                        getColor(score),

                      color: "white",

                      width: 100,

                      height: 45,

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      borderRadius: 6,

                      fontWeight: "bold",

                      boxShadow:
                        "0 2px 4px rgba(0,0,0,0.2)"
                    }}
                  >
                    Unit{index + 1}
                  </div>

                )
              )}

            </div>

          </div>

        )
      )}

      <button
        onClick={openSubjects}
        style={{
          marginTop: 30,
          padding: "12px 24px",
          backgroundColor: "#c2185b",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        Start Assessment
      </button>

    </div>

  );
}

export default Dashboard;
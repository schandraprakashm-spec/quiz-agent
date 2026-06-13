function StudyMaterial({
  setShowStudyMaterial,
  setShowDashboard
}) {

  const goBack = () => {

    setShowStudyMaterial(false);

    setShowDashboard(true);

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

      <h1>Study Material</h1>

      <br />

      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          marginBottom: 20
        }}
      >

        <h2>History</h2>

        <button>
          Open Material
        </button>

      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          marginBottom: 20
        }}
      >

        <h2>Geography</h2>

        <button>
          Open Material
        </button>

      </div>

      <button
        onClick={goBack}
        style={{
          padding: "12px 25px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Back To Dashboard
      </button>

    </div>

  );
}

export default StudyMaterial;
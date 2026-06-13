function LanguageSelection({
  setShowLanguage,
  setShowDashboard,
  setSelectedLanguage
}) {

  const chooseLanguage_Medium = (language) => {

    setSelectedLanguage(language);

    setShowLanguage(false);

    setShowDashboard(true);

  };

  return (

    <div
      style={{
        padding: 50,
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial",
        textAlign: "center"
      }}
    >

      <h1>Select Medium</h1>

      <br />

      <button
        onClick={() =>
          chooseLanguage_Medium("Telugu")
        }
        style={{
          padding: "20px 40px",
          fontSize: 22,
          marginRight: 20,
          backgroundColor: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: 10,
          cursor: "pointer"
        }}
      >
        Telugu Medium
      </button>

      <button
        onClick={() =>
          chooseLanguage_Medium("English")
        }
        style={{
          padding: "20px 40px",
          fontSize: 22,
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 10,
          cursor: "pointer"
        }}
      >
        English Medium
      </button>

    </div>

  );
}

export default LanguageSelection;
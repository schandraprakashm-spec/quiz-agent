function Dashboard({
  setShowDashboard,
  setShowSubjects
}) {
  return (
    <div style={{ padding: 50 }}>

      <h1>Dashboard</h1>

      <h2>
        🔴 YOU ARE NOT EXAM READY
      </h2>

      <button
        onClick={() => {
          setShowDashboard(false);
          setShowSubjects(true);
        }}
      >
        Start Assessment
      </button>

    </div>
  );
}

export default Dashboard;
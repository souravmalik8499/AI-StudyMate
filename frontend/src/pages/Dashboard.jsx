import { useEffect, useState } from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
};

  const [stats, setStats] = useState({
    notesUploaded: 0,
    aiQuestions: 0,
    summaries: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setStats(data.stats || {
          notesUploaded: 0,
          aiQuestions: 0,
          summaries: 0,
        });

        setRecentActivities(data.recentActivities || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          🎓 <span>AI StudyMate</span>
        </div>

        <nav className="dashboard-menu">

          <a
            href="/dashboard"
            className="active"
          >
            🏠 Dashboard
          </a>

          <a href="/upload">
            📤 Upload Note
          </a>

          <a href="/ask-ai">
            🤖 Ask AI
          </a>

          <a href="/summarize">
            📝 Summarize
          </a>

          <a href="/history">
            📚 History
          </a>

        </nav>

        <button
  type="button"
  className="logout-link logout-button"
  onClick={handleLogout}
>
  🚪 Logout
</button>
      </aside>


      {/* Main Content */}
      <main className="dashboard-content">

        {/* Header */}
        <header className="dashboard-header">

          <div>

            <p className="dashboard-small-title">
              STUDENT DASHBOARD
            </p>

            <h1>
              Welcome back,{" "}
              {user?.name || "Student"}! 👋
            </h1>

            <p>
              Continue your learning journey with
              AI StudyMate.
            </p>

          </div>

          <div className="profile-circle">
            {user?.name
              ?.charAt(0)
              .toUpperCase() || "S"}
          </div>

        </header>


        {/* Statistics */}
        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon">
              📄
            </div>

            <div>

              <h3>
                {loading
                  ? "..."
                  : stats.notesUploaded}
              </h3>

              <p>
                Notes Uploaded
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🤖
            </div>

            <div>

              <h3>
                {loading
                  ? "..."
                  : stats.aiQuestions}
              </h3>

              <p>
                AI Questions
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📝
            </div>

            <div>

              <h3>
                {loading
                  ? "..."
                  : stats.summaries}
              </h3>

              <p>
                Summaries
              </p>

            </div>

          </div>

        </section>


        {/* Quick Actions */}
        <section className="dashboard-section">

          <div className="section-title">

            <h2>
              Start Learning
            </h2>

            <p>
              Choose an activity and make your
              study time more productive.
            </p>

          </div>


          <div className="quick-action-grid">

            <a
              href="/upload"
              className="quick-card"
            >

              <div className="quick-icon">
                📤
              </div>

              <h3>
                Upload a Note
              </h3>

              <p>
                Upload your PDF study material
                and start learning with AI.
              </p>

              <span>
                Upload Note →
              </span>

            </a>


            <a
              href="/ask-ai"
              className="quick-card"
            >

              <div className="quick-icon">
                🤖
              </div>

              <h3>
                Ask AI
              </h3>

              <p>
                Ask questions about your study
                materials and get simple answers.
              </p>

              <span>
                Ask Question →
              </span>

            </a>


            <a
              href="/summarize"
              className="quick-card"
            >

              <div className="quick-icon">
                📝
              </div>

              <h3>
                Summarize Notes
              </h3>

              <p>
                Turn lengthy notes into short
                and useful summaries.
              </p>

              <span>
                Generate Summary →
              </span>

            </a>

          </div>

        </section>


        {/* Recent Activity */}
        <section className="dashboard-section">

          <div className="section-title">

            <h2>
              Recent Activity
            </h2>

            <p>
              Your latest learning activities.
            </p>

          </div>


          {recentActivities.length === 0 ? (

            <div className="empty-activity">

              <div>
                📚
              </div>

              <h3>
                No activity yet
              </h3>

              <p>
                Upload your first note and start
                exploring AI StudyMate.
              </p>

              <a
                href="/upload"
                className="primary-btn"
              >
                Upload Your First Note
              </a>

            </div>

          ) : (

            <div className="dashboard-activity-list">

              {recentActivities.map(
                (activity) => (

                  <div
                    className="dashboard-activity-card"
                    key={activity._id}
                  >

                    <div className="dashboard-activity-icon">
                      {activity.type ===
                      "question"
                        ? "🤖"
                        : "📝"}
                    </div>

                    <div className="dashboard-activity-info">

                      <h3>
                        {activity.type ===
                        "question"
                          ? "AI Question"
                          : "Note Summary"}
                      </h3>

                      <p>
                        {activity.noteTitle}
                      </p>

                      {activity.type ===
                        "question" && (
                        <span>
                          {activity.question}
                        </span>
                      )}

                    </div>

                    <div className="dashboard-activity-date">

                      {new Date(
                        activity.createdAt
                      ).toLocaleDateString()}

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;
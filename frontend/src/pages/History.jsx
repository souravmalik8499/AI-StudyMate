import { useEffect, useState } from "react";

function History() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/activities/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Failed to load history."
          );
          return;
        }

        setActivities(data.activities || []);
      } catch (error) {
        console.error("History error:", error);

        setError(
          "Unable to load your learning history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="history-page">
      <div className="history-container">

        {/* Header */}
        <div className="history-header">
          <a href="/dashboard" className="back-link">
            ← Back to Dashboard
          </a>

          <p className="dashboard-small-title">
            YOUR LEARNING
          </p>

          <h1>Learning History 📚</h1>

          <p>
            Review your previous AI questions and summaries.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="history-empty">
            <div className="history-empty-icon">
              ⏳
            </div>

            <h3>Loading your history...</h3>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="history-empty">
            <div className="history-empty-icon">
              ⚠️
            </div>

            <h3>Something went wrong</h3>

            <p>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          activities.length === 0 && (
            <div className="history-empty">

              <div className="history-empty-icon">
                📚
              </div>

              <h3>No learning activity yet</h3>

              <p>
                Ask AI questions or generate a summary
                to see your activity here.
              </p>

              <a
                href="/ask-ai"
                className="primary-btn"
              >
                Start Learning →
              </a>

            </div>
          )}

        {/* Activities */}
        {!loading &&
          !error &&
          activities.length > 0 && (
            <div className="history-list">

              {activities.map((activity) => (
                <div
                  className="history-card"
                  key={activity._id}
                >

                  {/* Icon */}
                  <div className="history-file-icon">
                    {activity.type === "question"
                      ? "🤖"
                      : "📝"}
                  </div>

                  {/* Details */}
                  <div className="history-details">

                    <h3>
                      {activity.type === "question"
                        ? "AI Question"
                        : "Note Summary"}
                    </h3>

                    <p>
                      <strong>Note:</strong>{" "}
                      {activity.noteTitle}
                    </p>

                    {activity.type ===
                      "question" && (
                      <p>
                        <strong>Question:</strong>{" "}
                        {activity.question}
                      </p>
                    )}

                    <span>
                      {new Date(
                        activity.createdAt
                      ).toLocaleString()}
                    </span>

                  </div>

                  {/* Type */}
                  <div className="history-actions">
                    <span className="activity-type">
                      {activity.type === "question"
                        ? "AI Question"
                        : "Summary"}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          )}

      </div>
    </div>
  );
}

export default History;
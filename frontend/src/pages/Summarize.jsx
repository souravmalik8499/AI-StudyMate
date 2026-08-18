import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const API_URL = import.meta.env.VITE_API_URL;

function Summarize() {
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedNoteTitle, setSelectedNoteTitle] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/api/notes/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load notes.");
          return;
        }

        setNotes(data.notes || []);
      } catch (error) {
        console.error("Notes loading error:", error);
        setError("Unable to load your notes.");
      } finally {
        setLoadingNotes(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSummarize = async (event) => {
    event.preventDefault();

    setSummary("");
    setSelectedNoteTitle("");
    setError("");

    if (!noteId) {
      setError("Please select a study note.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/ai/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            noteId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to generate summary."
        );
        return;
      }

      setSummary(data.summary || "");
      setSelectedNoteTitle(data.noteTitle || "");
    } catch (error) {
      console.error("Summary error:", error);

      setError(
        "Unable to connect to the AI service."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadSummary = () => {
    if (!summary) {
      return;
    }

    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    pdf.setFontSize(18);
    pdf.text(
      "AI StudyMate - Study Summary",
      margin,
      20
    );

    pdf.setFontSize(12);

    pdf.text(
      `Note: ${selectedNoteTitle}`,
      margin,
      32
    );

    const lines = pdf.splitTextToSize(
      summary,
      maxWidth
    );

    let yPosition = 45;

    lines.forEach((line) => {
      if (yPosition > 275) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.text(line, margin, yPosition);
      yPosition += 7;
    });

    const safeTitle = selectedNoteTitle
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();

    pdf.save(
      `${safeTitle || "study"}-summary.pdf`
    );
  };

  return (
    <div className="ask-ai-page">
      <div className="ask-ai-container">

        {/* Header */}
        <div className="ask-ai-header">

          <a
            href="/dashboard"
            className="back-link"
          >
            ← Back to Dashboard
          </a>

          <p className="dashboard-small-title">
            AI STUDY TOOLS
          </p>

          <h1>
            Summarize Notes 📝
          </h1>

          <p>
            Turn your lengthy study notes into simple,
            useful summaries for faster revision.
          </p>

        </div>

        {/* Summary Card */}
        <div className="ask-ai-card">

          <form onSubmit={handleSummarize}>

            <label htmlFor="summary-note">
              Select Study Note
            </label>

            {loadingNotes ? (
              <p className="note-loading">
                Loading your notes...
              </p>
            ) : notes.length === 0 ? (
              <div className="no-notes-message">

                <p>
                  You haven't uploaded any notes yet.
                </p>

                <a
                  href="/upload"
                  className="primary-btn"
                >
                  Upload a Note →
                </a>

              </div>
            ) : (
              <select
                id="summary-note"
                value={noteId}
                onChange={(event) =>
                  setNoteId(event.target.value)
                }
                className="note-select"
              >

                <option value="">
                  Select a note
                </option>

                {notes.map((note) => (
                  <option
                    key={note._id}
                    value={note._id}
                  >
                    {note.title}
                  </option>
                ))}

              </select>
            )}

            {error && (
              <div className="upload-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="ask-ai-button"
              disabled={
                loading ||
                notes.length === 0
              }
            >
              {loading
                ? "AI is reading your note..."
                : "Generate Summary →"}
            </button>

          </form>

        </div>

        {/* Summary Result */}
        {summary && (
          <div className="ai-answer-card">

            <div className="ai-answer-header">

              <div className="ai-answer-icon">
                📝
              </div>

              <div>

                <h2>
                  Study Summary
                </h2>

                <p>
                  Based on: {selectedNoteTitle}
                </p>

              </div>

            </div>

            <div className="ai-answer-content">
              {summary}
            </div>

            <button
              className="download-summary-button"
              onClick={downloadSummary}
            >
              📥 Download Summary PDF
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Summarize;
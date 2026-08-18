// import { useEffect, useState } from "react";

// function AskAI() {
//   const [notes, setNotes] = useState([]);
//   const [noteId, setNoteId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [selectedNoteTitle, setSelectedNoteTitle] = useState("");
//   const [loadingNotes, setLoadingNotes] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await fetch(
//           "http://localhost:5000/api/notes/my",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           setError(data.message || "Failed to load notes.");
//           return;
//         }

//         setNotes(data.notes || []);
//       } catch (error) {
//         console.error("Notes loading error:", error);

//         setError(
//           "Unable to load your notes. Please try again."
//         );
//       } finally {
//         setLoadingNotes(false);
//       }
//     };

//     fetchNotes();
//   }, []);

//   const handleAskAI = async (event) => {
//     event.preventDefault();

//     setAnswer("");
//     setError("");

//     if (!noteId) {
//       setError("Please select a study note.");
//       return;
//     }

//     if (!question.trim()) {
//       setError("Please enter a question.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         "http://localhost:5000/api/ai/ask",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             question: question.trim(),
//             noteId,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(
//           data.message || "Failed to get AI response."
//         );
//         return;
//       }

//       setAnswer(data.answer || "");
//       setSelectedNoteTitle(data.noteTitle || "");
//     } catch (error) {
//       console.error("Ask AI error:", error);

//       setError(
//         "Unable to connect to the AI service."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="ask-ai-page">
//       <div className="ask-ai-container">

//         {/* Header */}
//         <div className="ask-ai-header">
//           <a href="/dashboard" className="back-link">
//             ← Back to Dashboard
//           </a>

//           <p className="dashboard-small-title">
//             AI LEARNING ASSISTANT
//           </p>

//           <h1>Ask AI 🤖</h1>

//           <p>
//             Ask questions about your uploaded study notes
//             and understand difficult topics easily.
//           </p>
//         </div>

//         {/* Question Card */}
//         <div className="ask-ai-card">

//           <form onSubmit={handleAskAI}>

//             {/* Note Selection */}
//             <label htmlFor="note">
//               Select Study Note
//             </label>

//             {loadingNotes ? (
//               <p className="note-loading">
//                 Loading your notes...
//               </p>
//             ) : notes.length === 0 ? (
//               <div className="no-notes-message">
//                 <p>
//                   You haven't uploaded any notes yet.
//                 </p>

//                 <a
//                   href="/upload"
//                   className="primary-btn"
//                 >
//                   Upload a Note →
//                 </a>
//               </div>
//             ) : (
//               <select
//                 id="note"
//                 value={noteId}
//                 onChange={(event) =>
//                   setNoteId(event.target.value)
//                 }
//                 className="note-select"
//               >
//                 <option value="">
//                   Select a note
//                 </option>

//                 {notes.map((note) => (
//                   <option
//                     key={note._id}
//                     value={note._id}
//                   >
//                     {note.title}
//                   </option>
//                 ))}
//               </select>
//             )}

//             {/* Question */}
//             <label htmlFor="question">
//               What do you want to know?
//             </label>

//             <textarea
//               id="question"
//               rows="6"
//               placeholder="Example: What is AWS ECS according to my notes?"
//               value={question}
//               onChange={(event) =>
//                 setQuestion(event.target.value)
//               }
//             />

//             {error && (
//               <div className="upload-error">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="ask-ai-button"
//               disabled={loading || notes.length === 0}
//             >
//               {loading
//                 ? "AI is reading your note..."
//                 : "Ask AI →"}
//             </button>

//           </form>
//         </div>

//         {/* AI Answer */}
//         {answer && (
//           <div className="ai-answer-card">

//             <div className="ai-answer-header">
//               <div className="ai-answer-icon">
//                 🤖
//               </div>

//               <div>
//                 <h2>AI StudyMate</h2>

//                 <p>
//                   Based on: {selectedNoteTitle}
//                 </p>
//               </div>
//             </div>

//             <div className="ai-answer-content">
//               {answer}
//             </div>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default AskAI;


import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function AskAI() {
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
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

        setError(
          "Unable to load your notes. Please try again."
        );
      } finally {
        setLoadingNotes(false);
      }
    };

    fetchNotes();
  }, []);

  const handleAskAI = async (event) => {
    event.preventDefault();

    setAnswer("");
    setSelectedNoteTitle("");
    setError("");

    if (!noteId) {
      setError("Please select a study note.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/ai/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: question.trim(),
            noteId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to get AI response."
        );
        return;
      }

      setAnswer(data.answer || "");
      setSelectedNoteTitle(data.noteTitle || "");
    } catch (error) {
      console.error("Ask AI error:", error);

      setError(
        "Unable to connect to the AI service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-ai-page">
      <div className="ask-ai-container">

        {/* Header */}
        <div className="ask-ai-header">
          <a href="/dashboard" className="back-link">
            ← Back to Dashboard
          </a>

          <p className="dashboard-small-title">
            AI LEARNING ASSISTANT
          </p>

          <h1>Ask AI 🤖</h1>

          <p>
            Ask questions about your uploaded study notes
            and understand difficult topics easily.
          </p>
        </div>

        {/* Question Card */}
        <div className="ask-ai-card">

          <form onSubmit={handleAskAI}>

            {/* Note Selection */}
            <label htmlFor="note">
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
                id="note"
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

            {/* Question */}
            <label htmlFor="question">
              What do you want to know?
            </label>

            <textarea
              id="question"
              rows="6"
              placeholder="Example: What is AWS ECS according to my notes?"
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
            />

            {error && (
              <div className="upload-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="ask-ai-button"
              disabled={loading || notes.length === 0}
            >
              {loading
                ? "AI is reading your note..."
                : "Ask AI →"}
            </button>

          </form>
        </div>

        {/* AI Answer */}
        {answer && (
          <div className="ai-answer-card">

            <div className="ai-answer-header">
              <div className="ai-answer-icon">
                🤖
              </div>

              <div>
                <h2>AI StudyMate</h2>

                <p>
                  Based on: {selectedNoteTitle}
                </p>
              </div>
            </div>

            <div className="ai-answer-content">
              {answer}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default AskAI;
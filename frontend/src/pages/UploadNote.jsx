import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function UploadNote() {
  const [file, setFile] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setMessage("");
    setError("");

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    if (!noteTitle.trim()) {
      setError("Please enter a note title.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("note", file);
      formData.append("title", noteTitle.trim());

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/upload/note`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Upload failed.");
        return;
      }

      setMessage("Note uploaded successfully! 🎉");

      console.log("Uploaded file:", data.file);

      setFile(null);
      setNoteTitle("");

      const fileInput = document.getElementById("note-file");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);

      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">

        {/* Header */}
        <div className="upload-header">

          <a
            href="/dashboard"
            className="back-link"
          >
            ← Back to Dashboard
          </a>

          <p className="dashboard-small-title">
            STUDY MATERIAL
          </p>

          <h1>
            Upload Your Note 📄
          </h1>

          <p>
            Upload your PDF study material and use AI to
            understand it faster.
          </p>

        </div>

        {/* Upload Card */}
        <div className="upload-card">

          <form onSubmit={handleSubmit}>

            {/* File Upload */}
            <label className="upload-box">

              <div className="upload-icon">
                📄
              </div>

              <h3>
                {file
                  ? file.name
                  : "Upload your PDF"}
              </h3>

              <p>
                {file
                  ? "PDF selected successfully"
                  : "Click here to choose a PDF file"}
              </p>

              <span className="choose-file">
                Choose PDF
              </span>

              <input
                id="note-file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
              />

            </label>

            {/* Note Title */}
            <div className="input-group">

              <label htmlFor="noteTitle">
                Note Title
              </label>

              <input
                id="noteTitle"
                type="text"
                placeholder="Example: AWS Cloud Computing"
                value={noteTitle}
                onChange={(event) =>
                  setNoteTitle(event.target.value)
                }
                required
              />

            </div>

            {/* Selected File */}
            {file && (
              <div className="selected-file">

                <div>📄</div>

                <div>

                  <strong>
                    {file.name}
                  </strong>

                  <p>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>
            )}

            {/* Error */}
            {error && (
              <div className="upload-error">
                {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="upload-success">
                {message}
              </div>
            )}

            {/* Upload Button */}
            <button
              type="submit"
              className="upload-button"
              disabled={uploading}
            >
              {uploading
                ? "Uploading..."
                : "Upload Note →"}
            </button>

          </form>

        </div>

        {/* Information */}
        <div className="upload-info">

          <div>💡</div>

          <div>

            <h3>
              What happens after uploading?
            </h3>

            <p>
              Your PDF is securely uploaded to Amazon S3.
              Later, AI StudyMate will process the note so
              you can ask questions and generate summaries.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default UploadNote;
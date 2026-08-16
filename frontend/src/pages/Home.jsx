function Home() {
  return (
    <div className="app">
      {/* Header */}
      <header className="navbar">
        <div className="logo">
          🎓 <span>AI StudyMate</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="/login">Login</a>

          <a href="/signup" className="signup-btn">
            Sign Up
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="badge">
            ✨ Your AI-powered study companion
          </div>

          <h1>
            Learn Smarter.
            <br />
            <span>Grow Faster.</span>
          </h1>

          <p>
            Upload your study notes, ask questions, and get
            simple AI-powered explanations and summaries.
          </p>

          <div className="hero-buttons">
            <a href="/signup" className="primary-btn">
              Get Started →
            </a>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="ai-icon">🤖</div>

          <h3>AI Study Assistant</h3>

          <p>
            Ask questions about your study materials and
            understand difficult topics easily.
          </p>

          <div className="question-box">
            💡 Explain AWS ECS in simple words
          </div>

          <div className="answer-box">
            <strong>AI Assistant</strong>
            <br />
            ECS is an AWS service used to run and manage
            containers.
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-heading">
          <p className="small-title">LEARN WITH AI</p>

          <h2>
            Everything you need to
            <span> study smarter</span>
          </h2>

          <p>
            Simple tools designed to help students understand,
            revise and learn more effectively.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>

            <h3>Upload Notes</h3>

            <p>
              Upload your study notes and keep your learning
              materials organized.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>

            <h3>Ask AI</h3>

            <p>
              Ask questions about your notes and get
              easy-to-understand answers.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>

            <h3>Smart Summary</h3>

            <p>
              Turn lengthy study materials into short,
              useful summaries.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>

            <h3>Learning History</h3>

            <p>
              Keep track of your previous questions,
              summaries and study activities.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="about-content">
          <p className="small-title">ABOUT AI STUDYMATE</p>

          <h2>
            Your personal learning
            <span> companion</span>
          </h2>

          <p>
            AI StudyMate helps students make their learning
            process easier by combining their study materials
            with artificial intelligence.
          </p>

          <p>
            Instead of spending hours searching through
            lengthy notes, students can ask questions,
            generate summaries and focus on understanding
            what matters.
          </p>

          <a href="/signup" className="primary-btn">
            Start Learning →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <div className="logo">
            🎓 <span>AI StudyMate</span>
          </div>

          <p>
            Learn smarter. Understand faster. Build your future.
          </p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>

        <div className="copyright">
          © 2026 AI StudyMate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
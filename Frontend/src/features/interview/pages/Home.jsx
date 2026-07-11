import { useState, useRef } from "react";

import "../style/home.scss";
import { useInterview } from "../hook/useInterview";

const MAX_CHARS = 5000;

const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);

const IconUpload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 16V4" />
    <path d="M6 10l6-6 6 6" />
    <path d="M4 20h16" />
  </svg>
);

const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21l1.7-7L2 9.2l7.1-.6z" />
  </svg>
);

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) return;
    if (file.size > 5 * 1024 * 1024) return;
    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const canGenerate = jobDescription.trim().length > 0 && (resumeFile || selfDescription.trim().length > 0);

  return (
    <main className="home">
      <header className="home__header">
        <h1>
          Create Your Custom <span className="highlight">Interview Plan</span>
        </h1>
        <p>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      <div className="interview-input-group">
        <div className="panel left">
          <div className="panel-title">
            <span className="icon"><IconBriefcase /></span>
            <h2>Target Job Description</h2>
            <span className="badge required">Required</span>
          </div>
          <textarea
            name="jobDescription"
            id="jobDescription"
            maxLength={MAX_CHARS}
            placeholder={
              "Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
            }
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <span className="char-count">
            {jobDescription.length} / {MAX_CHARS} chars
          </span>
        </div>

        <div className="panel right">
          <div className="panel-title">
            <span className="icon"><IconUser /></span>
            <h2>Your Profile</h2>
          </div>

          <div className="input-group">
            <label className="field-label">
              Upload Resume <span className="badge best">Best Results</span>
            </label>
            <label
              className={`file-drop ${isDragging ? "dragging" : ""} ${resumeFile ? "has-file" : ""}`}
              htmlFor="resume"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <span className="upload-icon"><IconUpload /></span>
              {resumeFile ? (
                <>
                  <strong>{resumeFile.name}</strong>
                  <small>Click to replace</small>
                </>
              ) : (
                <>
                  <strong>Click to upload or drag &amp; drop</strong>
                  <small>PDF or DOCX (Max 5MB)</small>
                </>
              )}
            </label>
            <input
              ref={fileInputRef}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="input-group">
            <label className="field-label" htmlFor="selfDescription">
              Quick Self-Description
            </label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>

          <div className="info-note">
            <span className="icon"><IconInfo /></span>
            <p>
              Either a <strong>Resume</strong> or a{" "}
              <strong>Self Description</strong> is required to generate a
              personalized plan.
            </p>
          </div>
        </div>
      </div>

      <div className="home__footer">
        <span className="footer-note">AI-Powered Strategy Generation &bull; Approx 30s</span>
        <button className="button primary-button" disabled={!canGenerate}>
          <IconStar />
          Generate My Interview Strategy
        </button>
      </div>

      <nav className="legal-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </nav>
    </main>
  );
};

export default Home;
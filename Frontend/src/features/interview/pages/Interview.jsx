import { useState } from "react";
import "../style/interview.scss";

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

const TECHNICAL_QUESTIONS = [
  {
    q: "Explain how Redis handles persistence and when you'd choose RDB over AOF.",
    difficulty: "Medium",
  },
  {
    q: "Walk through what happens when 10,000 clients open a WebSocket connection to a single Node.js process.",
    difficulty: "Hard",
  },
  {
    q: "How would you design a message queue consumer that guarantees at-least-once delivery?",
    difficulty: "Hard",
  },
  {
    q: "What's the difference between the event loop's microtask and macrotask queues?",
    difficulty: "Medium",
  },
];

const BEHAVIORAL_QUESTIONS = [
  "Tell me about a time you had to debug a production incident under pressure.",
  "Describe a disagreement you had with a teammate about a technical decision.",
  "Give an example of a project where the requirements changed halfway through.",
  "How do you prioritize when everything feels urgent?",
];

const ROADMAP_STEPS = [
  {
    title: "Shore up core fundamentals",
    detail: "Redis data structures, caching patterns, and cache invalidation strategies.",
    status: "current",
  },
  {
    title: "Go deep on message queues",
    detail: "Compare Kafka, RabbitMQ, and SQS delivery guarantees and failure modes.",
    status: "upcoming",
  },
  {
    title: "Master the event loop",
    detail: "Practice tracing execution order across timers, promises, and I/O callbacks.",
    status: "upcoming",
  },
  {
    title: "Mock interview pass",
    detail: "Run through two full mock interviews and review the feedback.",
    status: "upcoming",
  },
];

const SKILL_GAPS = ["redis", "Message queue", "Event loop"];

const TechnicalSection = () => (
  <section className="content-section">
    <h2>Technical Questions</h2>
    <p className="section-subtitle">
      Pulled from the gaps between your resume and the job description.
    </p>
    <ul className="question-list">
      {TECHNICAL_QUESTIONS.map((item, i) => (
        <li key={i} className="question-card">
          <span className={`difficulty ${item.difficulty.toLowerCase()}`}>
            {item.difficulty}
          </span>
          <p>{item.q}</p>
        </li>
      ))}
    </ul>
  </section>
);

const BehavioralSection = () => (
  <section className="content-section">
    <h2>Behavioral Questions</h2>
    <p className="section-subtitle">
      Framed around the experience you highlighted in your profile.
    </p>
    <ul className="question-list">
      {BEHAVIORAL_QUESTIONS.map((q, i) => (
        <li key={i} className="question-card plain">
          <p>{q}</p>
        </li>
      ))}
    </ul>
  </section>
);

const RoadmapSection = () => (
  <section className="content-section">
    <h2>Road Map</h2>
    <p className="section-subtitle">
      Your suggested prep order, based on where your skill gaps are widest.
    </p>
    <ol className="roadmap-list">
      {ROADMAP_STEPS.map((step, i) => (
        <li key={i} className={`roadmap-step ${step.status}`}>
          <span className="step-index">{i + 1}</span>
          <div className="step-body">
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

const SECTIONS = {
  technical: TechnicalSection,
  behavioral: BehavioralSection,
  roadmap: RoadmapSection,
};

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const ActiveContent = SECTIONS[activeSection];

  return (
    <main className="interview">
      <aside className="interview__nav">
        <nav>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="interview__main">
        <ActiveContent />
      </section>

      <aside className="interview__gaps">
        <h3 className="gaps-title">Skill Gaps</h3>
        <div className="gaps-list">
          {SKILL_GAPS.map((skill) => (
            <span className="gap-pill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </aside>
    </main>
  );
};

export default Interview;
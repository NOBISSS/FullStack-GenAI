import { useState } from "react";
import "../style/interview.scss";

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions", icon: "code" },
  { id: "behavioral", label: "Behavioral Questions", icon: "chat" },
  { id: "roadmap", label: "Road Map", icon: "compass" },
];

const TECHNICAL_QUESTIONS = [
  {
    id: "q1",
    question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
    intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
    modelAnswer:
      "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread.",
  },
  {
    id: "q2",
    question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
    intention: "To gauge experience with real-world database performance tuning under load.",
    modelAnswer:
      "Look for use of early $match/$project stages to reduce document size, proper indexing to support pipeline stages, $limit before expensive stages, and awareness of memory limits that push toward allowDiskUse or pre-aggregated collections.",
  },
  {
    id: "q3",
    question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
    intention: "To check understanding of caching strategy and when it actually helps vs adds complexity.",
    modelAnswer:
      "The app checks the cache first, falls back to the database on a miss, then writes the result back to the cache with a TTL. Good candidates mention invalidation strategy, stampede protection, and when Redis is worth the added moving part.",
  },
  {
    id: "q4",
    question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
    intention: "To assess systems-thinking on large-scale refactors, not just theory.",
    modelAnswer:
      "Expect discussion of data ownership boundaries, distributed transactions, backwards-compatible rollout (strangler pattern), observability across services, and the operational overhead trade-off versus a well-organized modular monolith.",
  },
];

const BEHAVIORAL_QUESTIONS = [
  {
    id: "b1",
    question: "Tell me about a time you had to debug a production incident under pressure.",
    intention: "To evaluate composure and structured thinking during high-stakes moments.",
    modelAnswer:
      "Look for a clear timeline: how the issue was detected, how they triaged and communicated, the root cause, the fix, and what changed afterward to prevent a repeat.",
  },
  {
    id: "b2",
    question: "Describe a disagreement you had with a teammate about a technical decision.",
    intention: "To see how they handle conflict and whether they can disagree constructively.",
    modelAnswer:
      "Strong answers focus on the reasoning behind each position, how they reached resolution, and what they'd do differently — not just who was 'right'.",
  },
  {
    id: "b3",
    question: "Give an example of a project where the requirements changed halfway through.",
    intention: "To assess adaptability and how they manage scope changes.",
    modelAnswer:
      "Look for how they re-scoped the work, communicated the impact to stakeholders, and kept the team moving without burning out on rework.",
  },
];

const ROADMAP_DAYS = [
  {
    day: "Day 1",
    title: "Node.js Internals & Streams",
    tasks: [
      "Deep dive into the Event Loop phases and process.nextTick vs setImmediate.",
      "Practice implementing Node.js Streams for handling large data sets.",
    ],
  },
  {
    day: "Day 2",
    title: "Advanced MongoDB & Indexing",
    tasks: [
      "Study Compound Indexes, TTL Indexes, and Text Indexes.",
      "Practice writing complex Aggregation pipelines and using the .explain('executionStats') method.",
    ],
  },
  {
    day: "Day 3",
    title: "Caching & Redis Strategies",
    tasks: [
      "Read about Redis data types beyond strings (Sets, Hashes, Sorted Sets).",
      "Implement a Redis-based rate limiter or a caching layer for a sample API.",
    ],
  },
  {
    day: "Day 4",
    title: "System Design & Microservices",
    tasks: [
      "Study Microservices communication patterns (Synchronous vs Asynchronous).",
      "Learn about the API Gateway pattern and Circuit Breakers.",
    ],
  },
  {
    day: "Day 5",
    title: "Message Queues & DevOps Basics",
    tasks: [
      "Watch introductory tutorials on RabbitMQ or Kafka.",
      "Dockerize a project and write a simple GitHub Actions workflow for CI.",
    ],
  },
  {
    day: "Day 6",
    title: "Data Structures & Algorithms",
    tasks: [
      "Solve 5-10 Medium LeetCode problems focusing on Arrays, Strings, and Hash Maps.",
      "Review common sorting and searching algorithms.",
    ],
  },
  {
    day: "Day 7",
    title: "Mock Interview & Project Review",
    tasks: [
      "Conduct a mock interview focusing on explaining the Real-time Chat Application architecture.",
      "Prepare concise summaries for all work experience bullets.",
    ],
  },
];

const SKILL_GAPS = [
  { label: "Message Queues (Kafka/RabbitMQ)", severity: "high" },
  { label: "Advanced Docker & CI/CD Pipelines", severity: "medium" },
  { label: "Distributed Systems Design", severity: "medium" },
  { label: "Production-level Redis management", severity: "low" },
];

const MATCH_SCORE = 88;

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 8 5 12 9 16" />
    <polyline points="15 8 19 12 15 16" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconCompass = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const IconChevron = ({ open }) => (
  <svg
    className={`chevron ${open ? "open" : ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const NAV_ICONS = { code: IconCode, chat: IconChat, compass: IconCompass };

const QuestionAccordion = ({ items }) => {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <div className="question-list">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        return (
          <div className={`question-card ${isOpen ? "open" : ""}`} key={item.id}>
            <button
              className="question-header"
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="q-badge">Q{i + 1}</span>
              <span className="q-text">{item.question}</span>
              <IconChevron open={isOpen} />
            </button>

            {isOpen && (
              <div className="question-body">
                <span className="tag tag-intention">Intention</span>
                <p className="body-text">{item.intention}</p>

                <span className="tag tag-answer">Model Answer</span>
                <p className="body-text">{item.modelAnswer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const RoadmapSection = () => (
  <>
    <div className="content-header">
      <h1>Preparation Road Map</h1>
      <span className="count-badge">{ROADMAP_DAYS.length}-day plan</span>
    </div>
    <div className="header-rule" />
    <ol className="roadmap-timeline">
      {ROADMAP_DAYS.map((entry) => (
        <li key={entry.day} className="roadmap-day">
          <span className="day-marker" />
          <div className="day-body">
            <div className="day-heading">
              <span className="day-badge">{entry.day}</span>
              <h3>{entry.title}</h3>
            </div>
            <ul className="day-tasks">
              {entry.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </>
);

const MatchScoreRing = ({ score }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg className="match-ring" viewBox="0 0 120 120">
      <circle className="ring-track" cx="60" cy="60" r={radius} />
      <circle
        className="ring-value"
        cx="60"
        cy="60"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text x="60" y="56" className="ring-score">{score}</text>
      <text x="60" y="76" className="ring-percent">%</text>
    </svg>
  );
};

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");

  return (
    <main className="interview">
      <aside className="interview__nav">
        <span className="nav-label">Sections</span>
        <nav>
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            return (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="nav-icon"><Icon /></span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="interview__main">
        {activeSection === "technical" && (
          <>
            <div className="content-header">
              <h1>Technical Questions</h1>
              <span className="count-badge">{TECHNICAL_QUESTIONS.length} questions</span>
            </div>
            <div className="header-rule" />
            <QuestionAccordion items={TECHNICAL_QUESTIONS} />
          </>
        )}

        {activeSection === "behavioral" && (
          <>
            <div className="content-header">
              <h1>Behavioral Questions</h1>
              <span className="count-badge">{BEHAVIORAL_QUESTIONS.length} questions</span>
            </div>
            <div className="header-rule" />
            <QuestionAccordion items={BEHAVIORAL_QUESTIONS} />
          </>
        )}

        {activeSection === "roadmap" && <RoadmapSection />}
      </section>

      <aside className="interview__gaps">
        <span className="gaps-label">Match Score</span>
        <div className="match-score-block">
          <MatchScoreRing score={MATCH_SCORE} />
          <p className="match-subtitle">Strong match for this role</p>
        </div>

        <span className="gaps-label">Skill Gaps</span>
        <div className="gaps-list">
          {SKILL_GAPS.map((gap) => (
            <span className={`gap-pill ${gap.severity}`} key={gap.label}>
              {gap.label}
            </span>
          ))}
        </div>
      </aside>
    </main>
  );
};

export default Interview;
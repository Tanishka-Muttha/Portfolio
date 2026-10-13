import React, { useState, useEffect } from 'react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tm_theme') || 'light';
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openArch, setOpenArch] = useState({
    parking: false,
    senses: false,
    editor: false
  });

  const emailAddress = 'tanishkamuttha4610@gmail.com';

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('tm_theme', theme);
  }, [theme]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isResumeOpen) setIsResumeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResumeOpen]);

  // Manage body scroll when modal is active
  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isResumeOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      showToast('Email copied to clipboard: ' + emailAddress);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = emailAddress;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedEmail(true);
      showToast('Email copied to clipboard: ' + emailAddress);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const toggleArch = (key) => {
    setOpenArch((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Header & Navigation */}
      <header className="site-header" role="banner">
        <div className="container nav-container">
          <a href="#top" className="site-wordmark" aria-label="Tanishka Muttha home">
            <span>Tanishka Muttha</span>
            <span className="wordmark-tag">IT ’27</span>
          </a>

          <nav
            className={`nav-links ${mobileMenuOpen ? 'is-open' : ''}`}
            id="primary-navigation"
            aria-label="Primary"
          >
            <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </a>
            <a href="#approach" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Approach
            </a>
            <a href="#experience" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Experience
            </a>
            <a href="#skills" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Skills
            </a>
            <a href="#education" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Education
            </a>
            <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="btn-resume"
              onClick={() => setIsResumeOpen(true)}
              aria-label="View printable resume"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Resume</span>
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to warm light theme' : 'Switch to low-light dark theme'}
            >
              {theme === 'dark' ? (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="primary-navigation"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="section section-hero" id="about" aria-labelledby="hero-heading">
          <div className="container hero-layout">
            <div className="hero-meta-strip">
              <span className="meta-item">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Pune, Maharashtra, India
              </span>
              <span className="meta-divider">/</span>
              <span className="meta-item">
                B.E. IT &middot; D.Y. Patil College of Engineering, Akurdi (2023&ndash;2027)
              </span>
              <span className="meta-divider">/</span>
              <span className="meta-item">
                CGPA: <strong>9.45 / 10</strong>
              </span>
            </div>

            <h1 className="hero-title" id="hero-heading">
              Building useful software. <em>Understanding how it works.</em>
            </h1>

            <p className="hero-summary">
              I’m Tanishka, an Information Technology engineering student based in Pune. I build
              full-stack applications, work through real engineering problems, and explore how AI
              can make software more useful.
            </p>

            <div>
              <div className="status-badge" role="status">
                <span className="status-dot" aria-hidden="true"></span>
                <span>Open to software engineering opportunities</span>
              </div>
              <div className="availability-note">
                <span>[Verified status: Available for SDE internships &amp; 2027 graduate roles]</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>Explore my work</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="7" x2="17" y2="17"></line>
                  <polyline points="17 7 17 17 7 17"></polyline>
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">
                <span>Get in touch</span>
              </a>
            </div>

            <div className="bio-grid">
              <div className="bio-cell">
                <span className="bio-cell-label">Focus Areas</span>
                <span className="bio-cell-value">Full-Stack &amp; Problem Solving</span>
                <span className="bio-cell-sub">React, Node.js, Express, MongoDB, Java</span>
              </div>
              <div className="bio-cell">
                <span className="bio-cell-label">Current Exploration</span>
                <span className="bio-cell-value">Autonomous AI Systems</span>
                <span className="bio-cell-sub">CDP browser automation &amp; local LLM pipelines</span>
              </div>
              <div className="bio-cell">
                <span className="bio-cell-label">Community Role</span>
                <span className="bio-cell-value">GDGC On-Campus Lead</span>
                <span className="bio-cell-sub">100+ developer community coordination</span>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="section" id="projects" aria-labelledby="projects-heading">
          <div className="container">
            <header className="section-header">
              <span className="section-label">01 / Selected Work</span>
              <h2 className="section-title" id="projects-heading">
                Engineering Case Studies
              </h2>
              <p className="section-subtitle">
                A selection of systems I’ve designed, built, and debugged end to end. Each project
                outlines the problem, technical architecture, and actual production troubleshooting.
              </p>
            </header>

            <div className="projects-container">
              {/* Project 01 */}
              <article className="case-study" id="project-parking">
                <div className="case-header">
                  <div>
                    <span className="case-category">
                      Full-stack development &middot; Production Deployed
                    </span>
                    <h3 className="case-title">Smart Parking Booking &amp; Allocation System</h3>
                  </div>
                  <div
                    className="status-badge"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-medium)'
                    }}
                  >
                    <span>Independent Build</span>
                  </div>
                </div>

                <p className="case-lead">
                  Built a full-stack parking booking and allocation application independently,
                  implementing user authentication, parking-slot allocation, and booking
                  management through REST APIs connected to MongoDB.
                </p>

                <div className="case-tags" aria-label="Technologies used">
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Express.js</span>
                  <span className="tech-tag">MongoDB Atlas</span>
                  <span className="tech-tag">REST APIs</span>
                  <span className="tech-tag">Vercel</span>
                  <span className="tech-tag">Render</span>
                </div>

                <div className="eng-breakdown">
                  <div>
                    <h4 className="breakdown-section-title">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      Core Engineering &amp; System Integration
                    </h4>
                    <ul className="eng-points">
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Frontend and backend integration:</strong> Connected React component
                          state to Express endpoints using structured HTTP contracts, managing
                          token-based session auth and asynchronous slot booking flows.
                        </div>
                      </li>
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Parking-slot availability &amp; booking logic:</strong> Designed
                          backend reservation validation to prevent concurrent double-booking of
                          parking bays, checking slot occupancy before persisting confirmed
                          reservation records.
                        </div>
                      </li>
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Multi-platform cloud deployment:</strong> Deployed the client on
                          Vercel and the backend service on Render, with persistent storage hosted
                          on MongoDB Atlas clusters.
                        </div>
                      </li>
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Real-world debugging &amp; deployment fixes:</strong> Resolved
                          cross-origin resource sharing (CORS) header rejections between Vercel and
                          Render, managed production environment variable isolation across
                          environments, and handled Atlas network whitelist and connection timeout
                          edge cases.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => toggleArch('parking')}
                      aria-expanded={openArch.parking}
                      style={{
                        padding: '6px 12px',
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      <span>
                        {openArch.parking
                          ? 'Hide engineering details'
                          : 'View engineering details & architecture'}
                      </span>
                    </button>

                    {openArch.parking && (
                      <div className="arch-inspector" id="arch-parking">
                        <div className="arch-header">
                          <span className="arch-title">Data Pipeline &amp; Deployment Topology</span>
                          <span className="arch-status">Vercel &rarr; Render &rarr; Atlas</span>
                        </div>
                        <div className="arch-diagram-simple">
                          <div className="arch-node-row">
                            <span className="arch-node active-layer">Client (React / Vercel)</span>
                            <span className="arch-arrow">&rarr; HTTPS / JSON &rarr;</span>
                            <span className="arch-node active-layer">API Server (Express / Render)</span>
                            <span className="arch-arrow">&rarr; Mongoose ODM &rarr;</span>
                            <span className="arch-node active-layer">Database (MongoDB Atlas)</span>
                          </div>
                        </div>
                        <p className="arch-note">
                          <strong>Debugging highlight:</strong> Render’s container sleep cycle
                          causes transient initial cold-start delays. Handled client-side connection
                          states with explicit loading fallbacks and exponential backoff retry logic
                          to prevent unhandled promise rejections on the frontend.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="case-footer">
                  <a
                    href="https://github.com/TanishkaMuttha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-action"
                  >
                    <span>View Repository on GitHub</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </article>

              {/* Project 02 */}
              <article className="case-study" id="project-senses">
                <div className="case-header">
                  <div>
                    <span className="case-category">
                      Final-year project &middot; Active Research &amp; Prototyping
                    </span>
                    <h3 className="case-title">
                      SENSES: Human-Centered Conversational AI Ecosystem
                    </h3>
                  </div>
                  <div className="status-badge status-badge-ongoing" role="status">
                    <span className="status-dot" aria-hidden="true"></span>
                    <span>Ongoing System</span>
                  </div>
                </div>

                <p className="case-lead">
                  Designing a unified computer-control platform that brings together voice, text,
                  and mobile inputs into a common command pipeline for browser automation.
                </p>

                <div className="case-tags" aria-label="Technologies used">
                  <span className="tech-tag">Gemma / Ollama</span>
                  <span className="tech-tag">DOM Parsing</span>
                  <span className="tech-tag">Chrome DevTools Protocol (CDP)</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Multimodal Input</span>
                </div>

                <div className="eng-breakdown">
                  <div>
                    <h4 className="breakdown-section-title">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6.01" y2="6"></line>
                        <line x1="6" y1="18" x2="6.01" y2="18"></line>
                      </svg>
                      Technical Architecture &amp; Subsystem Decomposition
                    </h4>
                    <ul className="eng-points">
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Core Orchestrator (Gemma / Ollama):</strong> Runs locally to parse
                          multi-turn user intent, translate informal spoken/text requests into
                          structured JSON actions, and coordinate subagent lifecycles without cloud
                          API dependency.
                        </div>
                      </li>
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>DOM Subagent:</strong> Traverses the live browser accessibility
                          tree, filters non-interactive DOM noise, and generates a clean spatial
                          representation of interactable elements for accurate targeting.
                        </div>
                      </li>
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>CDP Action Engine:</strong> Dispatches low-level Chrome DevTools
                          Protocol commands directly to the browser instance to simulate
                          deterministic clicks, keyboard entries, and viewport navigation.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="verification-banner">
                    <strong>Project Status &amp; Implementation Boundary:</strong> This is my active
                    final-year engineering project. The local Ollama command parsing and CDP
                    browser interaction prototypes have been validated. Multimodal mobile input
                    synchronization and end-to-end multi-step workflow resilience are currently in
                    active development.
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => toggleArch('senses')}
                      aria-expanded={openArch.senses}
                      style={{
                        padding: '6px 12px',
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      <span>
                        {openArch.senses
                          ? 'Hide engineering details'
                          : 'View engineering details & architecture'}
                      </span>
                    </button>

                    {openArch.senses && (
                      <div className="arch-inspector" id="arch-senses">
                        <div className="arch-header">
                          <span className="arch-title">SENSES Command Pipeline</span>
                          <span className="arch-status">
                            Multimodal Ingestion &rarr; Orchestration &rarr; CDP Execution
                          </span>
                        </div>
                        <div className="arch-diagram-simple">
                          <div className="arch-node-row">
                            <span className="arch-node">Input (Voice / Text / Mobile)</span>
                            <span className="arch-arrow">&rarr; Stream &rarr;</span>
                            <span className="arch-node active-layer">Orchestrator (Gemma / Ollama)</span>
                          </div>
                          <div className="arch-node-row" style={{ marginTop: '4px' }}>
                            <span className="arch-arrow" style={{ paddingLeft: '40px' }}>
                              &darr; Structured Action Tree
                            </span>
                          </div>
                          <div className="arch-node-row">
                            <span className="arch-node active-layer">DOM Subagent (Tree Flattening)</span>
                            <span className="arch-arrow">&rarr; Coordinate Map &rarr;</span>
                            <span className="arch-node active-layer">CDP Engine (Browser Execution)</span>
                          </div>
                        </div>
                        <p className="arch-note">
                          <strong>Engineering objective:</strong> Creating computer-use agents that
                          operate on lightweight, privacy-preserving local models rather than
                          sending full desktop screen captures to high-latency external APIs.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="case-footer">
                  <a
                    href="https://github.com/TanishkaMuttha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-action"
                  >
                    <span>View Architecture Specs on GitHub</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </article>

              {/* Project 03 */}
              <article className="case-study" id="project-editor">
                <div className="case-header">
                  <div>
                    <span className="case-category">
                      Real-time systems &middot; Event-driven Architecture
                    </span>
                    <h3 className="case-title">Live Collaborative Code Editor</h3>
                  </div>
                  <div
                    className="status-badge"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-medium)'
                    }}
                  >
                    <span>System Implementation</span>
                  </div>
                </div>

                <p className="case-lead">
                  Built a collaborative code editor where multiple connected users can edit the
                  same file, with changes broadcast in real time through Socket.io events.
                </p>

                <div className="case-tags" aria-label="Technologies used">
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Socket.io</span>
                  <span className="tech-tag">WebSockets</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">Event-Driven Architecture</span>
                </div>

                <div className="eng-breakdown">
                  <div>
                    <h4 className="breakdown-section-title">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      Client-Server Communication &amp; Real-time Update Flow
                    </h4>
                    <ul className="eng-points">
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Persistent duplex connection:</strong> Clients establish a
                          low-overhead WebSocket transport connection to the Node.js server,
                          maintaining stateful peer sessions without polling.
                        </div>
                      </li>
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Room segmentation:</strong> Implemented Socket.io room
                          abstractions to isolate document sessions, ensuring edits emitted in one
                          session are broadcast strictly to active peers in that room.
                        </div>
                      </li>
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Event broadcasting model:</strong> When a user types, an edit
                          event carries text changes and cursor location deltas to the server, which
                          immediately relays them to all other connected room sockets using{' '}
                          <code>socket.to(roomId).emit()</code>.
                        </div>
                      </li>
                      <li className="eng-point">
                        <span className="eng-point-icon">&bull;</span>
                        <div>
                          <strong>Connection lifecycle handling:</strong> Handled client connect,
                          disconnect, and reconnect events gracefully, preventing memory leaks on
                          orphaned socket references and alerting remaining collaborators.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => toggleArch('editor')}
                      aria-expanded={openArch.editor}
                      style={{
                        padding: '6px 12px',
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      <span>
                        {openArch.editor
                          ? 'Hide engineering details'
                          : 'View engineering details & architecture'}
                      </span>
                    </button>

                    {openArch.editor && (
                      <div className="arch-inspector" id="arch-editor">
                        <div className="arch-header">
                          <span className="arch-title">Event-Driven Communication Protocol</span>
                          <span className="arch-status">WebSocket &middot; Socket.io Room Relay</span>
                        </div>
                        <div className="arch-diagram-simple">
                          <div className="arch-node-row">
                            <span className="arch-node active-layer">Client A (Emits: code-change)</span>
                            <span className="arch-arrow">&rarr; WebSocket &rarr;</span>
                            <span className="arch-node active-layer">Node.js Server (Validates &amp; Rooms)</span>
                          </div>
                          <div className="arch-node-row" style={{ marginTop: '4px' }}>
                            <span className="arch-arrow" style={{ paddingLeft: '40px' }}>
                              &darr; Broadcast delta to room peers
                            </span>
                          </div>
                          <div className="arch-node-row">
                            <span className="arch-node">Client B (Applies delta)</span>
                            <span className="arch-arrow">&amp;</span>
                            <span className="arch-node">Client C (Applies delta)</span>
                          </div>
                        </div>
                        <p className="arch-note">
                          <strong>Scope clarification:</strong> The current system implements
                          lightweight event-driven delta broadcasting and room synchronization for
                          live collaborative pairs; it is built for direct real-time broadcast
                          rather than heavy OT/CRDT conflict resolution trees.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="case-footer">
                  <a
                    href="https://github.com/TanishkaMuttha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-action"
                  >
                    <span>View Source Code on GitHub</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="section" id="approach" aria-labelledby="approach-heading">
          <div className="container">
            <header className="section-header">
              <span className="section-label">02 / Engineering Principles</span>
              <h2 className="section-title" id="approach-heading">
                How I Approach Engineering
              </h2>
              <p className="section-subtitle">
                Three practical standards that shape how I write code, structure systems, and solve
                problems.
              </p>
            </header>

            <div className="approach-grid">
              <article className="approach-card">
                <span className="approach-num">01 / Full-Stack Responsibility</span>
                <h3 className="approach-heading">Build end to end</h3>
                <p className="approach-body">
                  I like understanding the whole path a feature takes—from user interaction and
                  client state, through HTTP endpoints and business validation, down to database
                  transactions and cloud deployment. Knowing every layer makes the system easier to
                  design and much easier to debug.
                </p>
              </article>

              <article className="approach-card">
                <span className="approach-num">02 / Root-Cause Investigation</span>
                <h3 className="approach-heading">Debug systematically</h3>
                <p className="approach-body">
                  When something breaks in production, I don’t rely on guessing. I inspect network
                  payloads, inspect server logs, check environment configuration, and isolate
                  failure points across service boundaries. Real troubleshooting comes from
                  methodical verification.
                </p>
              </article>

              <article className="approach-card">
                <span className="approach-num">03 / Continuous Iteration</span>
                <h3 className="approach-heading">Keep learning by building</h3>
                <p className="approach-body">
                  Theoretical knowledge only turns into genuine competence when you build something
                  real with it. I test concepts by writing code, trying tools, shipping prototypes,
                  and seeing where edge cases happen in practice.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="section" id="experience" aria-labelledby="experience-heading">
          <div className="container">
            <header className="section-header">
              <span className="section-label">03 / Professional Experience</span>
              <h2 className="section-title" id="experience-heading">
                Experience
              </h2>
              <p className="section-subtitle">
                Practical industry work and cross-functional project execution.
              </p>
            </header>

            <div className="experience-list">
              <article className="experience-item">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-role">Data Science Intern</h3>
                    <div className="experience-company">Fourise Software Solutions Pvt. Ltd.</div>
                  </div>
                  <div className="experience-meta">
                    <div>December 2025 &ndash; January 2026</div>
                    <div>Pune, Maharashtra, India</div>
                  </div>
                </div>

                <ul className="experience-bullets">
                  <li className="experience-bullet">
                    Cleaned and explored datasets using Pandas and NumPy to identify patterns,
                    missing values, and feature anomalies.
                  </li>
                  <li className="experience-bullet">
                    Built and evaluated classification models using accuracy scores and confusion
                    matrices to compare baseline predictive performance.
                  </li>
                  <li className="experience-bullet">
                    Collaborated with a cross-functional team to prepare visual data summaries,
                    analytical charts, and structured reports for stakeholders.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="section" id="skills" aria-labelledby="skills-heading">
          <div className="container">
            <header className="section-header">
              <span className="section-label">04 / Technical Toolkit</span>
              <h2 className="section-title" id="skills-heading">
                Technical Skills
              </h2>
              <p className="section-subtitle">
                Technologies and foundational computer science concepts I work with regularly.
                Formatted for straightforward scanning.
              </p>
            </header>

            <div className="skills-table">
              <div className="skill-row">
                <div className="skill-category">Programming</div>
                <div className="skill-items">
                  <span className="skill-item-tag">Java</span>
                  <span className="skill-item-tag">JavaScript (ES6+)</span>
                  <span className="skill-item-tag">SQL</span>
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-category">Frontend &amp; Backend</div>
                <div className="skill-items">
                  <span className="skill-item-tag">React.js</span>
                  <span className="skill-item-tag">Node.js</span>
                  <span className="skill-item-tag">Express.js</span>
                  <span className="skill-item-tag">REST APIs</span>
                  <span className="skill-item-tag">Socket.io &amp; WebSockets</span>
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-category">Databases &amp; Tools</div>
                <div className="skill-items">
                  <span className="skill-item-tag">MongoDB &amp; Mongoose</span>
                  <span className="skill-item-tag">MySQL</span>
                  <span className="skill-item-tag">Git</span>
                  <span className="skill-item-tag">GitHub</span>
                  <span className="skill-item-tag">Postman</span>
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-category">Core Computer Science</div>
                <div className="skill-items">
                  <span className="skill-item-tag">Data Structures &amp; Algorithms</span>
                  <span className="skill-item-tag">Object-Oriented Programming (OOP)</span>
                  <span className="skill-item-tag">Database Management Systems (DBMS)</span>
                  <span className="skill-item-tag">Operating Systems</span>
                  <span className="skill-item-tag">Computer Networks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Leadership */}
        <section className="section" id="education" aria-labelledby="education-heading">
          <div className="container">
            <header className="section-header">
              <span className="section-label">05 / Background &amp; Involvement</span>
              <h2 className="section-title" id="education-heading">
                Education &amp; Leadership
              </h2>
            </header>

            <div className="dual-col-grid">
              <div className="col-block">
                <h3 className="subhead">Academic Foundation</h3>

                <div className="edu-entry">
                  <div className="edu-degree">Bachelor of Engineering in Information Technology</div>
                  <div className="edu-inst">D.Y. Patil College of Engineering, Akurdi, Pune</div>
                  <div className="edu-meta">2023 &ndash; 2027 &middot; Pune, Maharashtra, India</div>
                  <div className="cgpa-pill">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Current CGPA: 9.45 / 10</span>
                  </div>
                </div>
              </div>

              <div className="col-block">
                <h3 className="subhead">Community Leadership</h3>

                <div className="leadership-entry">
                  <div className="leadership-role">
                    Lead, Google Developer Groups on Campus (GDGC)
                  </div>
                  <div className="leadership-org">D.Y. Patil College of Engineering, Akurdi</div>
                  <div className="leadership-dates">August 2025 &ndash; June 2026</div>
                  <p className="leadership-desc">
                    Coordinated technical activities, hands-on workshops, and collaborative
                    initiatives for a student developer community of over 100 members.
                  </p>
                </div>

                <div className="leadership-entry" style={{ marginTop: 'var(--space-4)' }}>
                  <div className="leadership-role">Public Relations Member, ITESA</div>
                  <div className="leadership-org">
                    Information Technology Engineering Student Association
                  </div>
                  <div className="leadership-dates">2024 &ndash; 2025</div>
                  <p className="leadership-desc">
                    Supported student outreach, department communications, and event coordination
                    for department activities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact" aria-labelledby="contact-heading">
          <div className="container">
            <header className="section-header">
              <span className="section-label">06 / Let's Connect</span>
              <h2 className="section-title" id="contact-heading">
                Get in Touch
              </h2>
            </header>

            <div className="contact-box">
              <h3 className="contact-headline">
                Interested in collaborating or discussing an engineering role?
              </h3>
              <p className="contact-text">
                I’m actively looking for software engineering internships and graduate opportunities.
                Whether you want to talk about system architecture, discuss full-stack projects, or
                explore how I can contribute to your engineering team, feel free to reach out.
              </p>

              <div className="contact-interactive-bar">
                <div className="email-display" id="portfolio-email">
                  {emailAddress}
                </div>
                <div className="contact-btn-group">
                  <button
                    type="button"
                    className={`copy-email-btn ${copiedEmail ? 'copied' : ''}`}
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a href={`mailto:${emailAddress}`} className="mail-link-btn">
                    <span>Send Email</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="container footer-inner">
          <div className="footer-col-main">
            <div className="footer-brand">Tanishka Muttha</div>
            <p className="footer-meta">
              B.E. Information Technology &middot; Pune, Maharashtra, India.
              <br />
              Designed and built with React, Vite, and vanilla CSS. Restrained editorial aesthetics,
              no generative AI templates.
            </p>
          </div>

          <nav className="footer-links" aria-label="Social and external links">
            <a
              href="https://github.com/TanishkaMuttha"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tanishka-muttha"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a href={`mailto:${emailAddress}`} className="footer-link">
              Email
            </a>
            <button
              type="button"
              className="footer-link"
              onClick={() => setIsResumeOpen(true)}
            >
              Resume
            </button>
          </nav>
        </div>
      </footer>

      {/* Accessible Resume Modal */}
      {isResumeOpen && (
        <div
          className="modal-backdrop is-open"
          id="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
          onClick={(e) => {
            if (e.target.id === 'resume-modal') setIsResumeOpen(false);
          }}
        >
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="modal-title" id="resume-dialog-title">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span>Curriculum Vitae &middot; Tanishka Muttha</span>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn"
                  onClick={() => window.print()}
                  aria-label="Print or save as PDF"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  <span>Print / PDF</span>
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsResumeOpen(false)}
                  aria-label="Close dialog"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="modal-body">
              <div className="resume-paper">
                <header className="resume-header">
                  <div className="resume-name">Tanishka Muttha</div>
                  <div className="resume-sub">
                    Software Developer &middot; Full-Stack Development &middot; Problem Solving
                  </div>
                  <div className="resume-contact-row">
                    <span>Pune, Maharashtra, India</span>
                    <span>&bull;</span>
                    <span>{emailAddress}</span>
                    <span>&bull;</span>
                    <span>github.com/TanishkaMuttha</span>
                  </div>
                </header>

                <section>
                  <h4 className="resume-sec-title">Education</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong>B.E. Information Technology</strong>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
                      2023 &ndash; 2027
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    D.Y. Patil College of Engineering, Akurdi, Pune &middot; <strong>CGPA: 9.45 / 10</strong>
                  </div>
                </section>

                <section>
                  <h4 className="resume-sec-title">Experience</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong>Data Science Intern &mdash; Fourise Software Solutions Pvt. Ltd.</strong>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
                      Dec 2025 &ndash; Jan 2026
                    </span>
                  </div>
                  <ul
                    style={{
                      marginTop: '6px',
                      paddingLeft: '18px',
                      listStyle: 'disc',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <li>Cleaned and explored datasets using Pandas and NumPy.</li>
                    <li>
                      Built and evaluated classification models using accuracy and confusion
                      matrices.
                    </li>
                    <li>
                      Collaborated with a cross-functional team to prepare visualizations and summary
                      reports.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="resume-sec-title">Selected Projects</h4>

                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <strong>Smart Parking Booking &amp; Allocation System</strong>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)'
                      }}
                    >
                      {' '}
                      | React.js, Node.js, Express.js, MongoDB Atlas
                    </span>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Built full-stack reservation system with user auth, slot availability
                      verification, and REST APIs. Resolved production CORS and Atlas cloud
                      configuration challenges across Vercel and Render deployments.
                    </p>
                  </div>

                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <strong>SENSES: Human-Centered Conversational AI Ecosystem</strong>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)'
                      }}
                    >
                      {' '}
                      | Gemma/Ollama, DOM Subagent, CDP Action Engine
                    </span>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Final-year project designing an end-to-end computer-control architecture
                      unifying voice, text, and mobile inputs into Chrome DevTools Protocol browser
                      automation actions.
                    </p>
                  </div>

                  <div>
                    <strong>Live Collaborative Code Editor</strong>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)'
                      }}
                    >
                      {' '}
                      | Node.js, Socket.io, WebSockets
                    </span>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Implemented WebSocket duplex channels and Socket.io room management allowing
                      multiple connected peers to broadcast and synchronize live document edits.
                    </p>
                  </div>
                </section>

                <section>
                  <h4 className="resume-sec-title">Technical Skills</h4>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <strong>Languages:</strong> Java, JavaScript (ES6+), SQL
                    <br />
                    <strong>Frameworks &amp; Runtimes:</strong> React.js, Node.js, Express.js, REST APIs,
                    Socket.io
                    <br />
                    <strong>Databases &amp; Tools:</strong> MongoDB, MySQL, Git, GitHub, Postman
                    <br />
                    <strong>Core CS:</strong> Data Structures &amp; Algorithms, OOP, DBMS, Operating
                    Systems, Computer Networks
                  </div>
                </section>

                <section>
                  <h4 className="resume-sec-title">Leadership &amp; Community</h4>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <strong>Lead, Google Developer Groups on Campus (GDGC)</strong> (Aug 2025 &ndash;
                    June 2026): Coordinated technical activities for a community of 100+ members.
                    <br />
                    <strong>PR Member, ITESA</strong> (2024 &ndash; 2025): Public relations and
                    community communications.
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className={`toast-notice ${isToastVisible ? 'show' : ''}`}
        id="toast"
        role="status"
        aria-live="polite"
        aria-hidden={!isToastVisible}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span className="toast-msg">{toastMessage}</span>
      </div>
    </>
  );
}

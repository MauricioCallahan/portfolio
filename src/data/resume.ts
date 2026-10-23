export type ResumeEntry = {
  id: string;
  title: string;
  organization?: string;
  location?: string;
  dates?: string;
  duration?: string;
  summary: string;
  bullets: string[];
  context?: string;
  technologies?: string[];
  projectHref?: string;
};

export const resumeProfile = {
  name: "Mauricio S. Callahan",
  email: "mauricioscallahan@outlook.com",
  phone: "+1 (419) 310-8995",
  github: "https://github.com/MauricioCallahan",
  pdfHref: "/Callahan_Mauricio_Resume.pdf",
};

export const resumeSections: { id: string; title: string; entries: ResumeEntry[] }[] = [
  {
    id: "education", title: "Education",
    entries: [{
      id: "miami-university", title: "Miami University", location: "Oxford, OH", dates: "May 2027",
      summary: "Computer Science · Finance minor",
      bullets: [
        "Bachelor of Arts in Computer Science, Minor in Finance",
        "Relevant Coursework: Database Systems, Introduction to AI, Web Application Programming, Data Abstractions & Structures, Algorithms, Financial Modeling in Excel",
      ],
    }],
  },
  {
    id: "experience", title: "Experience",
    entries: [
      {
        id: "jpmorgan-chase", title: "Software Engineering Intern, Payments", organization: "JPMorgan Chase",
        location: "Columbus, OH", dates: "June 2026 – August 2026", summary: "JPMorgan Chase",
        bullets: [
          "Built a Spring Boot bulk ACH cancellation API so onboarding clients can cancel all test transactions at once",
          "Saved about 15s per transaction by accepting client reference numbers instead of manually looking up identifiers",
          "Designed a PostgreSQL workflow that atomically cancels any size batch of transactions in just 2 queries",
          "Led an AI assisted build with GitHub Copilot, specifying each method and reviewing all generated code",
          "Created an AI agent that translates plain English into Splunk queries through JPMC’s internal MCP server",
        ],
        context: "My focus was backend systems supporting ACH transactions: API functionality for cancellations, efficient database operations, and correct transaction handling.",
        technologies: ["Java", "Spring Boot", "SQL", "Postgres", "Jenkins", "GitHub Copilot"],
      },
      {
        id: "peer-career-coach", title: "Peer Career Coach",
        organization: "Miami University – Center for Career Exploration and Success", location: "Oxford, OH",
        dates: "August 2025 – Present", summary: "Miami University · CCES",
        bullets: [
          "Conduct 1:1 resume reviews, mock interviews, and provide career development guidance to students",
          "Facilitate workshops and deliver 3+ presentations per semester on professional and career readiness",
          "Collaborate with Peer Career Coaches and career staff to improve coaching strategies and interview preparation resources",
        ],
        context: "Alongside technical work, I support students through resume and cover letter reviews, mock interviews, professional presentations, and tabling for CCES.",
      },
    ],
  },
  {
    id: "projects", title: "Projects",
    entries: [
      {
        id: "fire", title: "FIRE! Budgeting App", dates: "In progress", duration: "Launch project", summary: "Concurrent ledgers & secure APIs",
        technologies: ["Next.js", "TypeScript", "Java", "Spring Boot", "Supabase", "PostgreSQL"], projectHref: "/projects/fire",
        bullets: [
          "Designed a PostgreSQL ledger with triggers and ordered row locks that keep totals accurate under concurrency",
          "Secured user data with row level security and column level permissions, verified by automated SQL tests",
          "Built a stateless Spring Boot backend validating Supabase auth tokens, with JUnit tests against a mock server",
        ],
      },
      {
        id: "riven-market", title: "Riven Market Pricing Tool", dates: "March 2026", duration: "About 3–4 months", summary: "Live auction price estimation",
        technologies: ["React", "TypeScript", "TanStack Query", "Python", "Flask"], projectHref: "/projects/riven-market",
        bullets: [
          "A full-stack pricing tool for Warframe’s player-driven Riven market, leveraging the Warframe.market website as its data source.",
          "Its custom estimator compares similar listings and validates auction bids to produce a price range with a confidence rating.",
          "Rate limiting, caching, and fallback data keep searches resilient.",
        ],
      },
      {
        id: "pose-detection", title: "Pose Detection", dates: "May 2026", duration: "About 2 months", summary: "Predicting body joints from radar",
        technologies: ["Python", "PyTorch", "NumPy"], projectHref: "/projects/radar-pose",
        bullets: [
          "Trained a custom CNN and modified ResNet18 with a 4 person team to predict 17 body joints from radar data",
          "Built MMVR preprocessing with Gaussian heatmap targets, reaching 0.931 PCK@5% on a 200 sample subset",
        ],
      },
    ],
  },
  {
    id: "activities", title: "Extracurricular Activities",
    entries: [{
      id: "shpe-president", title: "President", organization: "Society of Hispanic Professional Engineers (SHPE)",
      location: "Oxford, OH", dates: "April 2025 – May 2026", summary: "SHPE · Chapter leadership",
      bullets: [
        "Led 10+ networking and professional development events with corporate recruiters and engineering professionals",
        "Served as liaison between the chapter, National SHPE, CCES, and the engineering department",
      ],
    }],
  },
  {
    id: "skills", title: "Technical Skills",
    entries: [{
      id: "technical-skills", title: "Tools & Technologies", summary: "Languages, frameworks & developer tools",
      bullets: [
        "Languages: Java, Python, TypeScript, JavaScript, SQL, HTML, CSS",
        "Frameworks & Libraries: Spring Boot, Next.js, Flask, React",
        "Databases: PostgreSQL, Supabase",
        "Cloud & DevOps: Docker, Kubernetes, Jenkins, Linux",
        "Developer Tools: CI/CD, Git, GitHub, Bitbucket, Jira, Maven, Splunk, Bruno, REST APIs",
        "AI Tools: GitHub Copilot, MCP, Claude Code, Codex",
      ],
    }],
  },
];

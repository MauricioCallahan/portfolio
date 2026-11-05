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
  pdfHref: "/images/profile/Resume.pdf",
};

export const resumeSections: { id: string; title: string; entries: ResumeEntry[] }[] = [
  {
    id: "education", title: "Education",
    entries: [{
      id: "miami-university", title: "Miami University", location: "Oxford, OH", dates: "May 2027",
      summary: "Computer Science · Finance minor",
      bullets: [
        "Bachelor of Arts in Computer Science, Minor in Finance",
      ],
    }],
  },
  {
    id: "experience", title: "Experience",
    entries: [
      {
        id: "jpmorgan-chase", title: "Software Engineering Intern", organization: "JPMorgan Chase",
        location: "Columbus, OH", dates: "June 2026 – August 2026", summary: "JPMorgan Chase",
        bullets: [
          "Built a bulk ACH cancellation API in Spring Boot, replacing per call with batches (typically 20 to 30 transactions)",
          "Reduced required inputs from 4 per transaction to 2 per batch by resolving IDs from client reference numbers",
          "Verified the cancellation API with 30+ JUnit tests in Jenkins, Bruno validation and senior engineer code review",
          "Created an agent skill that translates plain English requests into Splunk queries through an internal MCP server",
        ],
        context: "My focus was backend systems supporting ACH transactions: API functionality for cancellations, efficient database operations, and correct transaction handling.",
        technologies: ["Java", "Spring Boot", "JUnit", "Jenkins", "Bruno", "MCP", "Splunk"],
      },
      {
        id: "peer-career-coach", title: "Peer Career Coach",
        organization: "Miami University, Center for Career Exploration and Success", location: "Oxford, OH",
        dates: "August 2025 – Present", summary: "Miami University · CCES",
        bullets: [
          "Conduct 1:1 resume reviews and mock interviews, and provide career guidance to students",
          "Facilitate workshops and deliver 3+ presentations per semester on professional and career readiness",
          "Collaborate with student workers and career staff to improve coaching strategies and interview preparation resources",
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
          "Secured user data with row level security and column level permissions, verified by 34 SQL permission checks",
          "Implemented a stateless Spring Boot backend validating Supabase tokens, covered by 30 JUnit assertions",
        ],
      },
      {
        id: "riven-market", title: "Riven Market Pricing Tool", dates: "March 2026", duration: "About 3–4 months", summary: "Live auction price estimation",
        technologies: ["React", "TypeScript", "TanStack Query", "Python", "Flask"], projectHref: "/projects/riven-market",
        bullets: [
          "Developed a price estimator for player traded items across 4 platforms from live auction data",
          "Engineered a 6 stage pricing engine using cosine similarity, archetype matching, and IQR outlier removal",
          "Filtered fake listings with a bid validator that sets 3 confidence tiers from bidder reputation, timing, and jumps",
          "Kept a React and TypeScript search UI responsive under a 3 requests/sec API limit with a shared rate limiter",
        ],
      },
      {
        id: "pose-detection", title: "Pose Detection", dates: "May 2026", duration: "About 2 months", summary: "Predicting body joints from radar",
        technologies: ["Python", "PyTorch", "NumPy"], projectHref: "/projects/radar-pose",
        bullets: [
          "Trained a custom CNN and modified ResNet18 with a 4 person team to predict 17 body joints from radar data",
          "Preprocessed MMVR radar data by normalizing inputs and generating Gaussian target heatmaps for training",
          "Compared ResNet18 against a custom CNN across 6 metrics, raising PCK@5% from 0.117 to 0.931",
        ],
      },
    ],
  },
  {
    id: "activities", title: "Leadership",
    entries: [{
      id: "shpe-president", title: "President", organization: "Society of Hispanic Professional Engineers (SHPE)",
      location: "Oxford, OH", dates: "April 2025 – May 2026", summary: "SHPE · Chapter leadership",
      bullets: [
        "Liaised between the student chapter, National SHPE, and Miami University’s engineering department",
        "Coordinated local events to promote academic excellence and increase engagement for undergraduate STEM",
        "Doubled chapter membership (9 to 20) via 10+ corporate events, including Essity and Avery Dennison",
      ],
    }],
  },
  {
    id: "skills", title: "Technical Skills",
    entries: [{
      id: "technical-skills", title: "Tools & Technologies", summary: "Languages, frameworks & developer tools",
      bullets: [
        "Languages: Java, Python, TypeScript, JavaScript, SQL",
        "Frameworks & Libraries: Spring Boot, Next.js, Flask, React",
        "Databases: PostgreSQL, MySQL, Supabase",
        "Cloud & DevOps: AWS, Docker, Jenkins, Linux",
        "Developer Tools: REST APIs, Bruno, CI/CD, Git, GitHub, Bitbucket, Jira, Maven, Splunk",
        "AI Tools: GitHub Copilot, MCP, Claude Code, Codex",
      ],
    }],
  },
];

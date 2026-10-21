export const projects = [
  {
    slug: "fire", title: "FIRE", resumeEntryId: "fire",
    sections: [
      { title: "The project", paragraphs: ["FIRE! is a budgeting app currently in progress, with a focus on concurrent ledgers and secure APIs."] },
      { title: "Keeping the ledger accurate", paragraphs: ["The PostgreSQL ledger uses triggers and ordered row locks to keep totals accurate under concurrent operations.", "Row level security and column level permissions protect user data. Automated SQL tests verify those permissions."] },
      { title: "Securing the backend", paragraphs: ["A stateless Spring Boot backend validates Supabase authentication tokens. JUnit tests exercise that validation against a mock server."] },
    ],
  },
  {
    slug: "riven-market", title: "Riven Market", resumeEntryId: "riven-market",
    sections: [
      { title: "The project", paragraphs: ["Riven Market is a pricing tool for player traded digital items. Its Flask backend estimates prices using live auction data."] },
      { title: "Estimating a price", paragraphs: ["The estimator compares similar items, removes outliers, and applies age decay and market derived stat weights."] },
      { title: "Handling live data", paragraphs: ["Rate limiting and a 24-hour cache with fallback support the auction data workflow. Unit tests validate that behavior."] },
    ],
  },
  {
    slug: "radar-pose", title: "Radar Pose", resumeEntryId: "pose-detection",
    sections: [
      { title: "The project", paragraphs: ["Working with a four-person team, I trained models to predict 17 body joints from radar data."] },
      { title: "Preparing the data and models", paragraphs: ["The work included MMVR preprocessing with Gaussian heatmap targets, a custom CNN, and a modified ResNet18."] },
      { title: "Results and scope", paragraphs: ["The project reached 0.931 PCK@5% on a 200-sample subset. This result describes that subset, rather than a full-dataset evaluation."] },
    ],
  },
];

export type Project = (typeof projects)[number];

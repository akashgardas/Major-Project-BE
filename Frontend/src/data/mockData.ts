export const userProfile = {
  name: "Harika",
  tier: "Scholar Tier",
  avatarInitials: "H",
};

export const dashboardData = {
  greeting: "Good morning, Harika",
  academicCohort: "ACADEMIC COHORT FALL '24",
  specialization: "Machine Learning Specialization",
  streak: "7-Day Study Streak",
  pacingScore: "Top 5% consistency this term",

  activeModule: {
    title: "Feature Engineering & Dimensionality Reduction",
    lessonInfo: "Lesson 13 of 18 • Imputing missing values with iterative multivariate regression models and variance checks.",
    progress: 68, // 12 of 18 lessons mastered
    timeRemaining: "35 mins remaining",
  },

  recommendedPractice: {
    title: "Targeted Practice: Feature Selection via Mutual Information",
    description: "Based on your diagnostic quiz (82%), practicing non-linear dependency metrics will reinforce high-dimensional pruning before moving to Gradient Boosted Trees.",
    impact: "Reinforces Diagnostic Gap • +12% Retention Forecast",
    time: "15 min",
  },

  learningPlan: [
    {
      id: 1,
      title: "Feature Engineering Video & Interactive Notebook",
      meta: "Learning • 25 min",
      status: "Done",
    },
    {
      id: 2,
      title: "Model Evaluation & Cross-Validation Metrics",
      meta: "Core Lecture • 20 min • In Progress",
      status: "Resume",
    },
    {
      id: 3,
      title: "Feature Engineering & Variance Thresholds Quiz",
      meta: "Assessment • 10 min",
      status: "Queued",
    },
    {
      id: 4,
      title: "Python Scikit-Learn Pipeline Practice Lab",
      meta: "Coding Practice • 20 min",
      status: "Queued",
    },
  ],

  stats: {
    streakDays: 7,
    lessonsMastered: 42,
    accuracy: 86,
    studyTime: "18h 40m",
  },

  milestones: [
    {
      id: 1,
      title: "ML Mid-Term Diagnostic",
      date: "Tomorrow at 10:00 AM • 45 minutes",
      icon: "event",
    },
    {
      id: 2,
      title: "Scikit-Learn Code Review",
      date: "Friday, Oct 18 • Peer Workshop",
      icon: "code",
    },
  ],

  recentActivity: [
    {
      id: 1,
      title: "Scored 90% in Linear Regression Diagnostic",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Completed Bias-Variance Tradeoff Lab",
      time: "Yesterday",
    },
  ],
};

export const learningContextData = {
  currentPath: "Machine Learning Fundamentals — Lesson 13: Feature Engineering",
  progress: 68,
  recentDiagnostic: "86% quiz accuracy",
  nextMilestone: "in 2 days",

  activeTopic: "Feature Engineering & Dimensionality Reduction",
  exercisesCompleted: "12 of 18 exercises completed",

  stats: {
    diagnostic: 86,
    cadence: 7,
    mastery: 14,
  },

  recommendedNext: {
    title: "Feature Selection Practice Drill",
    description: "3 diagnostic probes focusing on Mutual Information thresholds vs. Chi-Square contingency testing.",
    time: "15 mins",
  },
};

export const quizData = {
  title: "Machine Learning Fundamentals",
  topic: "Feature Engineering",
  difficulty: "Intermediate",
  totalQuestions: 10,
  timeEstimate: "~10 min",
  
  question: {
    number: 4,
    type: "MULTIPLE CHOICE",
    text: "Which technique is commonly used to reduce the number of input features while preserving the most important information?",
    options: [
      { id: "A", text: "One-Hot Encoding" },
      { id: "B", text: "Principal Component Analysis", isSelected: true },
      { id: "C", text: "Label Encoding" },
      { id: "D", text: "Data Normalization" },
    ],
  },
  
  progress: {
    percent: 40,
    timeRemaining: "07:39",
    answered: 4,
    flagged: 1,
  },

  competency: [
    { name: "Variance Thresholds", status: "Mastered" },
    { name: "PCA & Dimensionality", status: "In Progress" },
    { name: "Mutual Information", status: "Upcoming" },
  ]
};

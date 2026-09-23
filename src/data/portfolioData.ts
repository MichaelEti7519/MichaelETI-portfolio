export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack & Web' | 'Mobile (Expo)' | 'AI & Real-Time' | 'Backend APIs';
  featured?: boolean;
  problem: string;
  solution: string;
  technologies: string[];
  primaryLanguage: string;
  githubUrl: string;
  liveUrl?: string;
  keyFeatures: string[];
  architectureNotes?: string[];
  repoStats?: {
    stars?: number;
    language?: string;
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    type: 'Language' | 'Framework' | 'Library' | 'Runtime' | 'Database' | 'Tool' | 'API';
    context: string;
    repo: string;
  }[];
}

export interface CurrentlyBuildingItem {
  area: string;
  focus: string;
  description: string;
  relatedRepos: string[];
  status: string;
}

export const DEVELOPER_INFO = {
  name: 'Micheal Eti',
  nickname: 'ME',
  eyebrow: 'SOFTWARE ENGINEER / BUILDER / PROBLEM SOLVER',
  headline: "Hi, I'm Micheal Eti.",
  statement: 'I build digital products that turn complex problems into simple experiences.',
  shortBio:
    'Software engineer focused on building robust web, mobile, backend systems, and AI-powered applications. Passionate about real-time streaming, resilient APIs, and intuitive mobile interfaces.',
  githubUsername: 'MichaelEti7519',
  githubUrl: 'https://github.com/MichaelEti7519',
  avatarUrl: 'https://avatars.githubusercontent.com/u/195116261?v=4',
  email: 'essienetimichael2006@gmail.com',
  linkedinUrl:
    'https://www.linkedin.com/in/micheal-eti-b79b6a26a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  resumeUrl: '/Micheal_Eti_Resume.pdf',
  publicReposCount: 10,
  joinedYear: '2025',
};

export const CAPABILITIES = [
  {
    id: 'capability-frontend',
    title: 'Frontend Engineering',
    summary:
      'Crafting responsive, accessible, and performant web interfaces with modern React, TypeScript, and Tailwind CSS.',
    techs: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'WebSockets', 'HTML5 / Modern DOM'],
    highlight: 'Production SPAs, state orchestration, and responsive design.',
  },
  {
    id: 'capability-mobile',
    title: 'Mobile Development',
    summary:
      'Building cross-platform mobile apps for iOS and Android using React Native and Expo with native-feel navigation and offline caching.',
    techs: ['React Native', 'Expo', 'Expo Router', 'NativeWind', 'Appwrite Auth', 'AsyncStorage', 'Haptics'],
    highlight: 'Multilingual support, device telemetry, and smooth navigation.',
  },
  {
    id: 'capability-backend',
    title: 'Backend & APIs',
    summary:
      'Architecting resilient RESTful APIs, database schemas, authentication systems, and webhook workflows.',
    techs: ['Node.js', 'Express', 'Prisma ORM', 'PostgreSQL', 'MongoDB', 'Spring Boot (Java)', 'Socket.IO'],
    highlight: 'Role-based access control, Stripe webhooks, and layered architectures.',
  },
  {
    id: 'capability-ai',
    title: 'AI & Real-Time Systems',
    summary:
      'Integrating live audio streaming, speech transcription pipelines, and intelligent analytical APIs into user workflows.',
    techs: ['Web Audio API', 'WebSockets', 'Speech Transcripts', 'Weather & Soil APIs', 'AI Expense Insights'],
    highlight: 'Low-latency streaming, audio playback queues, and domain-specific data pipelines.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'ecotreks',
    title: 'EcoTreks',
    tagline: 'Full-Stack Sustainable Travel Marketplace & Booking Engine',
    category: 'Full-Stack & Web',
    featured: true,
    problem:
      'Sustainable travel booking is fragmented and opaque. Travelers struggle to discover eco-certified stays, while local hosts lack integrated booking, messaging, and payout approval workflows.',
    solution:
      'Architected a production-style travel marketplace uniting travelers, hosts, and platform administrators. Built with React 19 and Vite on the frontend, with an Express and Prisma backend supporting Socket.IO real-time chat, calendar reservations, and automated Stripe Checkout webhook processing.',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Prisma ORM',
      'PostgreSQL',
      'Socket.IO',
      'Stripe Checkout',
    ],
    primaryLanguage: 'TypeScript',
    githubUrl: 'https://github.com/MichaelEti7519/Ecotreks',
    keyFeatures: [
      'Three-role RBAC security (Traveler, Host, Admin) with JWT and bcrypt hashing',
      'Live Stripe Checkout integration with raw-body webhook handling for instant booking confirmation',
      'Real-time peer messaging between travelers and hosts powered by Socket.IO',
      'Host dashboard for reservation approvals, calendar views, earnings, and payout requests',
      'Admin oversight interface monitoring platform accounts, disputes, and payout authorizations',
    ],
    architectureNotes: [
      'Modular client-server split with shared type safety across frontend and Express backend',
      'Relational modeling in Prisma ORM targeting PostgreSQL (Neon-compatible)',
      'Raw-body parsing pipeline dedicated to Stripe webhook verification before JSON body parsers',
    ],
    repoStats: {
      language: 'TypeScript',
    },
  },
  {
    id: 'greensight',
    title: 'GreenSight 1.0',
    tagline: 'Mobile Agricultural Assistant for Weather, Soil & Food Price Telemetry',
    category: 'Mobile (Expo)',
    featured: false,
    problem:
      'Smallholder farmers and everyday consumers in emerging markets face steep information gaps regarding localized weather shocks, soil health metrics, and fluctuating staple food prices across states.',
    solution:
      'Built a cross-platform mobile assistant using React Native and Expo Router. Features dual dedicated flows for farmers and consumers, location-based weather forecasts via WeatherAPI, soil moisture metrics from Open-Meteo, regional crop advisory, and multilingual localization across five languages.',
    technologies: [
      'React Native',
      'Expo Router',
      'TypeScript',
      'NativeWind',
      'Appwrite Auth',
      'WeatherAPI',
      'Open-Meteo API',
      'i18next',
      'AsyncStorage',
    ],
    primaryLanguage: 'TypeScript',
    githubUrl: 'https://github.com/MichaelEti7519/GreenSight1.0',
    keyFeatures: [
      'Multilingual architecture localized into English, Yoruba, Hausa, Igbo, and Efik with persistent AsyncStorage',
      'Dual-persona user flows: specialized farmer advisory tabs vs. consumer food market price monitors',
      'Weather & soil health integrations consuming WeatherAPI forecasts and Open-Meteo soil moisture',
      'Appwrite authentication with client-side cooldown guards to mitigate spam request spikes',
      'State-by-state agricultural commodity price comparisons',
    ],
    architectureNotes: [
      'Directory-based routing using Expo Router with custom 404 boundaries',
      'NativeWind (Tailwind CSS) utility design system optimized for mobile viewports',
    ],
    repoStats: {
      language: 'TypeScript',
    },
  },
  {
    id: 'telecom-voice-translation',
    title: 'Telecom Voice Call Translation',
    tagline: 'Real-Time Audio Stream Capture & Live Transcription Interface',
    category: 'AI & Real-Time',
    featured: false,
    problem:
      'Cross-border audio communication creates barriers when callers do not speak the same language. Traditional telecom lines lack synchronized transcription and low-latency audio translation displays.',
    solution:
      'Engineered a real-time voice call client featuring WebSocket signaling, live microphone audio stream capture, continuous transcript streaming, caller peer tiles, and call state lifecycle controls.',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'WebSockets',
      'Web Audio API',
      'Audio Stream Queue',
      'CSS Modules',
    ],
    primaryLanguage: 'TypeScript',
    githubUrl: 'https://github.com/MichaelEti7519/voice-call-frontend',
    keyFeatures: [
      'Bidirectional WebSocket communication for audio packets and text transcript broadcasting',
      'Custom useAudioStream hook capturing microphone input and packaging raw audio buffers',
      'Synchronized useTranscript feed rendering timestamped caller dialogue turns',
      'Interactive room lifecycle: Lobby creation, active call state, peer tiles, and EndCall modals',
    ],
    architectureNotes: [
      'Decoupled audio streaming layer from UI state to avoid audio buffer stuttering',
      'Session token persistence supporting reconnects and room switching',
    ],
    repoStats: {
      language: 'TypeScript',
    },
  },
  {
    id: 'ai-expense-tracker',
    title: 'AI Expense Tracker (Prexp)',
    tagline: 'Mobile Spending Insights & Financial Analytics App',
    category: 'Mobile (Expo)',
    featured: false,
    problem:
      'Manual expense logging is tedious, leaving users without structured categorization or intuitive visual breakdowns of their recurring spending patterns.',
    solution:
      'Crafted a modern mobile finance manager using React Native, Expo, and NativeWind. Incorporates transaction logging, categorized spending breakdowns, cloud data synchronization, and interactive data visualization.',
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'NativeWind',
      'Firebase Firestore',
      'Appwrite',
      'Victory Native',
      'Expo Haptics',
    ],
    primaryLanguage: 'TypeScript',
    githubUrl: 'https://github.com/MichaelEti7519/Ai-expense-tracker',
    keyFeatures: [
      'Category-based expense and revenue tracking with date filters',
      'Interactive chart analytics visualizing monthly spending trends using Victory Native',
      'Multi-provider backend support connecting Firebase Firestore and Appwrite',
      'Polished mobile UX with linear gradients, custom tab navigation, and tactile haptics',
    ],
    architectureNotes: [
      'Modular tab navigation with nested screen layouts in Expo Router',
      'Reactive spending aggregation algorithms executed locally for high responsiveness',
    ],
    repoStats: {
      language: 'TypeScript',
    },
  },
  {
    id: 'student-management-system',
    title: 'Student Management System API',
    tagline: 'Spring Boot REST Service for Departmental Administration',
    category: 'Backend APIs',
    featured: false,
    problem:
      'Academic departments need reliable, type-safe CRUD services to manage student enrollment records, departmental affiliations, and demographic data without schema drift.',
    solution:
      'Engineered an enterprise-style REST API using Java and Spring Boot connected to MySQL. Follows the layered Controller-Service-Repository pattern with structured entity validation.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'Maven', 'Layered Architecture'],
    primaryLanguage: 'Java',
    githubUrl: 'https://github.com/MichaelEti7519/student-management-system',
    keyFeatures: [
      'Layered Spring Boot architecture: Controller layer for HTTP, Service layer for business logic',
      'Full CRUD operations for student records with departmental mappings',
      'Relational MySQL persistence with clean entity lifecycle handling',
      'Clean RESTful error status handling for reliable client integration',
    ],
    architectureNotes: [
      'Standardized Spring Boot application configuration with Maven dependency management',
      'Decoupled business logic from persistence queries for maintainability',
    ],
    repoStats: {
      language: 'Java',
    },
  },
  {
    id: 'remote-job-board',
    title: 'Remote Job Board Platform',
    tagline: 'Server-Rendered Talent & Remote Job Directory',
    category: 'Full-Stack & Web',
    featured: false,
    problem:
      'Remote job seekers need streamlined access to verified listings without intrusive advertisements or sign-up roadblocks.',
    solution:
      'Built a lightweight job posting directory in PHP featuring categorized job listings, employer post submissions, and searchable vacancy records.',
    technologies: ['PHP', 'MySQL', 'CSS3', 'HTML5'],
    primaryLanguage: 'PHP',
    githubUrl: 'https://github.com/MichaelEti7519/Remote-Job-Board',
    keyFeatures: [
      'Job listing query and filtering engine',
      'Posting submission system storing employer listings in MySQL',
      'Responsive, lightweight server-rendered UI',
    ],
    repoStats: {
      language: 'PHP',
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Frameworks & UI',
    description: 'Component-driven web architectures built with modern React, strict TypeScript, and utility design systems.',
    skills: [
      { name: 'React 19', type: 'Framework', context: 'Production component tree & hooks in EcoTreks & LinguaCall', repo: 'Ecotreks / voice-call-frontend' },
      { name: 'TypeScript', type: 'Language', context: 'Static typing across EcoTreks, GreenSight, Voice Call & Prexp', repo: 'All Core Repos' },
      { name: 'Vite 6 / 7', type: 'Tool', context: 'Modern ESM development and optimized bundle compiler', repo: 'Ecotreks / voice-call-frontend' },
      { name: 'Tailwind CSS v4', type: 'Framework', context: 'Modern CSS styling engine with zero-runtime utility classes', repo: 'Ecotreks / Portfolio' },
      { name: 'React Router v7', type: 'Library', context: 'Nested route layouts, client-side guards, and SPA history', repo: 'Ecotreks / voice-call-frontend' },
      { name: 'Leaflet & React-Leaflet', type: 'Library', context: 'Interactive geographic maps for eco-stay coordinates', repo: 'Ecotreks' },
      { name: 'Motion', type: 'Library', context: 'Fluid micro-interactions and layout transitions', repo: 'Ecotreks / Portfolio' },
      { name: 'Lucide Icons', type: 'Library', context: 'Consistent iconography system across web and mobile', repo: 'Ecotreks / GreenSight' },
    ],
  },
  {
    title: 'Mobile Development (React Native & Expo)',
    description: 'Native iOS & Android mobile applications engineered with Expo Router, offline persistence, and localized telemetry.',
    skills: [
      { name: 'React Native', type: 'Framework', context: 'Core mobile framework powering GreenSight and AI Expense Tracker', repo: 'GreenSight1.0 / Ai-expense-tracker' },
      { name: 'Expo SDK & Router', type: 'Framework', context: 'File-based native routing, dev-client builds, and deep linking', repo: 'GreenSight1.0 / Ai-expense-tracker' },
      { name: 'NativeWind', type: 'Library', context: 'Tailwind CSS utility styling compiled to native mobile view primitives', repo: 'GreenSight1.0 / Ai-expense-tracker' },
      { name: 'i18next Localization', type: 'Library', context: '5-language translation (English, Yoruba, Hausa, Igbo, Efik)', repo: 'GreenSight1.0' },
      { name: 'AsyncStorage & SecureStore', type: 'Tool', context: 'Client-side locale cache and token authentication persistence', repo: 'GreenSight1.0' },
      { name: 'Victory Native & Chart Kit', type: 'Library', context: 'Financial performance charts, expense breakdowns, and visual metrics', repo: 'Ai-expense-tracker' },
      { name: 'Lottie React Native', type: 'Library', context: 'Smooth vector motion graphics for onboarding and status states', repo: 'Ai-expense-tracker' },
      { name: 'Expo Hardware APIs', type: 'API', context: 'Location, Haptics, Blur effects, and System UI controls', repo: 'GreenSight1.0 / Ai-expense-tracker' },
    ],
  },
  {
    title: 'Backend Systems & APIs',
    description: 'Server architectures, layered REST controllers, websocket event pipelines, and enterprise services.',
    skills: [
      { name: 'Node.js 20', type: 'Runtime', context: 'Server runtime for EcoTreks and backend REST APIs', repo: 'Ecotreks' },
      { name: 'Express.js', type: 'Framework', context: 'RESTful API routing, raw webhook body handling, and middleware', repo: 'Ecotreks' },
      { name: 'Spring Boot (Java)', type: 'Framework', context: 'Enterprise layered Controller-Service-Repository pattern', repo: 'student-management-system' },
      { name: 'Laravel 11 (PHP 8.2)', type: 'Framework', context: 'Employer hiring flow API, migrations, and model binding', repo: 'Remote-Job-Board' },
      { name: 'RESTful API Design', type: 'Tool', context: 'Standardized HTTP verbs, status codes, and JSON payload contracts', repo: 'All Backend Repos' },
      { name: 'Socket.IO Server', type: 'Runtime', context: 'Bidirectional room-based messaging and live notification distribution', repo: 'Ecotreks' },
      { name: 'Web Audio API / PCM16', type: 'API', context: 'Low-latency microphone capture, ScriptProcessorNode, and audio queues', repo: 'voice-call-frontend' },
    ],
  },
  {
    title: 'AI / ML & Real-Time Systems',
    description: 'Artificial intelligence SDKs, real-time bidirectional media streaming, and live environmental telemetry.',
    skills: [
      { name: 'Google GenAI SDK', type: 'Library', context: '@google/genai integration for generative features and assistants', repo: 'Ecotreks' },
      { name: 'Real-Time Voice Pipeline', type: 'Framework', context: 'Bidirectional audio translation with live dual transcript rendering', repo: 'voice-call-frontend' },
      { name: 'WebSockets', type: 'API', context: 'Low-overhead full-duplex binary and JSON frame transport', repo: 'voice-call-frontend / Ecotreks' },
      { name: 'Weather & Soil Telemetry', type: 'API', context: 'WeatherAPI & Open-Meteo soil moisture integration for agriculture', repo: 'GreenSight1.0' },
      { name: 'AI Expense Analytics', type: 'Library', context: 'Algorithmic spending breakdown, monthly tracking, and anomaly alerts', repo: 'Ai-expense-tracker' },
    ],
  },
  {
    title: 'Databases & ORM',
    description: 'Relational, document, and cloud-hosted data stores with structured schemas and query optimization.',
    skills: [
      { name: 'PostgreSQL / Neon', type: 'Database', context: 'Relational data store powering EcoTreks marketplace data models', repo: 'Ecotreks' },
      { name: 'Prisma ORM 6.8', type: 'Tool', context: 'Type-safe client generation, relational joins, and database push synchronization', repo: 'Ecotreks' },
      { name: 'SQLite / Local Storage', type: 'Database', context: 'Client-side embedded storage and caching for mobile apps', repo: 'Ai-expense-tracker' },
      { name: 'MySQL', type: 'Database', context: 'Relational storage for Student Management System and Job Board', repo: 'student-management-system' },
      { name: 'Appwrite Cloud', type: 'Database', context: 'BaaS auth, document database, and file storage for mobile clients', repo: 'GreenSight1.0 / Ai-expense-tracker' },
      { name: 'Firebase / Firestore', type: 'Database', context: 'NoSQL real-time document synchronization and mobile auth', repo: 'Ai-expense-tracker / Ecotreks' },
    ],
  },
  {
    title: 'Security, Payments & DevOps',
    description: 'Cryptographic security, financial payment processors, schema validation, and deployment pipelines.',
    skills: [
      { name: 'Stripe Checkout & Webhooks', type: 'API', context: 'Session creation, raw signature verification, and automated payouts', repo: 'Ecotreks' },
      { name: 'JWT & Bcrypt Hashing', type: 'Tool', context: 'Stateless authentication tokens, secret signing, and salted password encryption', repo: 'Ecotreks' },
      { name: 'Zod 3.25', type: 'Library', context: 'Runtime TypeScript schema validation for incoming HTTP payloads', repo: 'Ecotreks' },
      { name: 'Helmet & CORS', type: 'Library', context: 'HTTP response header hardening and cross-origin resource protection', repo: 'Ecotreks' },
      { name: 'Git & GitHub', type: 'Tool', context: 'Distributed version control, feature branches, and code repository audits', repo: 'All Repositories' },
      { name: 'Vercel Deployment', type: 'Tool', context: 'SPA rewrite routing, serverless build pipelines, and production hosting', repo: 'Ecotreks / voice-call-frontend' },
      { name: 'Maven & Composer', type: 'Tool', context: 'Dependency resolution for Java Spring Boot and PHP Laravel services', repo: 'student-management / Remote-Job-Board' },
    ],
  },
];

export const CURRENTLY_BUILDING: CurrentlyBuildingItem[] = [
  {
    area: 'Real-Time Voice Streaming & Translation',
    focus: 'Low-latency audio streaming & live transcript processing',
    description:
      'Refining real-time WebRTC and WebSocket audio streaming pipelines to deliver synchronized voice translation and transcript rendering for international communications.',
    relatedRepos: ['voice-call-frontend', 'Telecom-voice-call-translation-'],
    status: 'Active Iteration',
  },
  {
    area: 'Mobile Agricultural Telemetry (GreenSight)',
    focus: 'Offline-first caching & localized agricultural advisory',
    description:
      'Expanding GreenSight with deeper offline-first caching for rural areas with erratic connectivity, broadening soil telemetry insights, and enhancing state-level food price aggregation.',
    relatedRepos: ['GreenSight1.0'],
    status: 'In Development',
  },
  {
    area: 'Full-Stack Marketplace Architecture',
    focus: 'Prisma migrations, dispute resolution & automated payouts',
    description:
      'Hardening the EcoTreks full-stack travel marketplace with robust database migrations, comprehensive host verification flows, and Stripe Connect payout integrations.',
    relatedRepos: ['Ecotreks'],
    status: 'Production Hardening',
  },
  {
    area: 'AI-Assisted Personal Productivity',
    focus: 'Mobile expense analytics & automated budget categorization',
    description:
      'Enhancing the AI expense tracker with proactive spending anomalies detection, exportable tax reports, and local on-device machine learning categorization.',
    relatedRepos: ['Ai-expense-tracker'],
    status: 'Prototyping',
  },
];

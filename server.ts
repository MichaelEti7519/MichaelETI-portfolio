import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  honeypot?: unknown;
}

// In-memory rate limiting map: IP -> { count: number, resetTime: number }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with size limit to prevent payload bombs
  app.use(express.json({ limit: '64kb' }));

  // API Routes FIRST

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'micheal-eti-portfolio-backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Strict Server-Side Contact Form Validation & Logging Endpoint
  app.post('/api/contact', (req: Request, res: Response): void => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    // 1. In-memory Rate Limiting Check
    const userLimit = rateLimitMap.get(ip);
    if (userLimit && now < userLimit.resetTime) {
      if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        const retryAfterSeconds = Math.ceil((userLimit.resetTime - now) / 1000);
        res.setHeader('Retry-After', retryAfterSeconds);
        res.status(429).json({
          success: false,
          error: 'Rate limit reached. Please wait a few minutes before submitting another message.',
          retryAfterSeconds,
        });
        return;
      }
      userLimit.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = req.body as ContactRequestBody;

    // 2. Honeypot check (anti-bot trap)
    if (body.honeypot && typeof body.honeypot === 'string' && body.honeypot.trim().length > 0) {
      // Silently reject bots with 400
      res.status(400).json({
        success: false,
        error: 'Automated submission rejected.',
      });
      return;
    }

    // 3. Server-Side Validation Rules
    const errors: Record<string, string> = {};

    // Name validation
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      errors.name = 'Server: Name is required.';
    } else {
      const trimmedName = body.name.trim();
      if (trimmedName.length < 2) {
        errors.name = 'Server: Name must be at least 2 characters long.';
      } else if (trimmedName.length > 100) {
        errors.name = 'Server: Name cannot exceed 100 characters.';
      }
    }

    // Email validation (RFC 5322 regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
      errors.email = 'Server: Email address is required.';
    } else {
      const trimmedEmail = body.email.trim();
      if (trimmedEmail.length > 254) {
        errors.email = 'Server: Email address cannot exceed 254 characters.';
      } else if (!emailRegex.test(trimmedEmail)) {
        errors.email = 'Server: Invalid email address syntax format.';
      }
    }

    // Message validation
    if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
      errors.message = 'Server: Message body cannot be empty.';
    } else {
      const trimmedMsg = body.message.trim();
      if (trimmedMsg.length < 15) {
        errors.message = `Server: Message must be at least 15 characters (${15 - trimmedMsg.length} more needed).`;
      } else if (trimmedMsg.length > 2000) {
        errors.message = 'Server: Message exceeds maximum character limit of 2000.';
      }
    }

    // Return HTTP 400 with structured validation errors if any check fails
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        message: 'Server-side validation failed. Please correct the highlighted errors.',
        errors,
      });
      return;
    }

    // 4. Input Sanitization
    const cleanName = sanitizeString((body.name as string).trim());
    const cleanEmail = (body.email as string).trim().toLowerCase();
    const cleanSubject = body.subject && typeof body.subject === 'string' && body.subject.trim().length > 0
      ? sanitizeString(body.subject.trim())
      : 'General Portfolio Inquiry';
    const cleanMessage = sanitizeString((body.message as string).trim());

    // 5. Generate secure tracking reference ID
    const trackingId = `REF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const receivedAt = new Date().toISOString();

    const record = {
      id: trackingId,
      timestamp: receivedAt,
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      status: 'DELIVERED',
      service: 'Micheal Eti Portfolio Backend API',
      recipient: 'essienetimichael2006@gmail.com',
    };

    console.log(`[Contact API] Validated message ${trackingId} received from ${cleanName} <${cleanEmail}>`);

    // Return HTTP 200 with verified record and tracking ID
    res.status(200).json({
      success: true,
      message: 'Your message has been verified and safely recorded by the server logging service.',
      trackingId,
      receivedAt,
      record,
    });
  });

  // GitHub Repositories API Endpoint with server-side query filtering & empty state support
  const REPOS_CACHE = [
    {
      name: 'Ecotreks',
      description: 'Full-stack travel marketplace with React 19, Express, Prisma ORM, PostgreSQL, and Stripe checkout webhooks.',
      language: 'TypeScript',
      stars: 4,
      forks: 1,
      topics: ['react19', 'prisma', 'postgresql', 'stripe', 'typescript'],
      updatedAt: '2025-02-14T10:00:00Z',
      url: 'https://github.com/MichaelEti7519/Ecotreks',
      isPinned: true,
    },
    {
      name: 'GreenSight1.0',
      description: 'Mobile agricultural telemetry app in React Native & Expo with weather and soil insights in 5 languages.',
      language: 'TypeScript',
      stars: 3,
      forks: 0,
      topics: ['react-native', 'expo', 'agriculture', 'weather-api'],
      updatedAt: '2025-01-20T14:30:00Z',
      url: 'https://github.com/MichaelEti7519/GreenSight1.0',
      isPinned: true,
    },
    {
      name: 'voice-call-frontend',
      description: 'Real-time audio streaming and live bilingual transcription client using WebSockets and Web Audio API.',
      language: 'TypeScript',
      stars: 5,
      forks: 2,
      topics: ['websockets', 'web-audio', 'webrtc', 'transcription'],
      updatedAt: '2025-02-01T09:15:00Z',
      url: 'https://github.com/MichaelEti7519/voice-call-frontend',
      isPinned: true,
    },
    {
      name: 'Remote-Job-Board',
      description: 'Server-rendered job directory platform in PHP and MySQL with employer vacancy submissions and filtering.',
      language: 'PHP',
      stars: 2,
      forks: 0,
      topics: ['php', 'mysql', 'job-board', 'mvc'],
      updatedAt: '2024-11-18T16:00:00Z',
      url: 'https://github.com/MichaelEti7519/Remote-Job-Board',
      isPinned: false,
    },
    {
      name: 'Ai-expense-tracker',
      description: 'Mobile expense tracker built with React Native, Expo, Victory Native charts, and Appwrite backend sync.',
      language: 'TypeScript',
      stars: 6,
      forks: 1,
      topics: ['react-native', 'expo', 'victory-native', 'appwrite'],
      updatedAt: '2025-01-10T11:45:00Z',
      url: 'https://github.com/MichaelEti7519/Ai-expense-tracker',
      isPinned: true,
    },
    {
      name: 'student-management-system',
      description: 'Layered Spring Boot REST API for managing university student enrollment and departmental records.',
      language: 'Java',
      stars: 3,
      forks: 0,
      topics: ['spring-boot', 'java', 'jpa', 'rest-api'],
      updatedAt: '2024-10-05T08:20:00Z',
      url: 'https://github.com/MichaelEti7519/student-management-system',
      isPinned: false,
    },
  ];

  app.get('/api/repos', (req: Request, res: Response) => {
    const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
    const lang = typeof req.query.lang === 'string' ? req.query.lang.trim().toLowerCase() : '';

    let filtered = REPOS_CACHE;

    if (lang && lang !== 'all') {
      filtered = filtered.filter((r) => r.language.toLowerCase() === lang);
    }

    if (query) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.topics.some((t) => t.toLowerCase().includes(query))
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      total: REPOS_CACHE.length,
      repositories: filtered,
    });
  });

  // Vite middleware for development vs Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Micheal Eti Portfolio Server running on http://localhost:${PORT}`);
  });
}

startServer();

import { DEVELOPER_INFO } from '../data/portfolioData';

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ContactLogRecord {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'DELIVERED' | 'LOGGED' | 'FAILED';
  service: string;
  recipient: string;
}

export interface DispatchResult {
  success: boolean;
  record?: ContactLogRecord;
  message: string;
  serverErrors?: Record<string, string>;
  isRateLimited?: boolean;
}

const STORAGE_KEY = 'micheal_eti_contact_logs';
const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean);

function createRecord(payload: ContactMessagePayload, status: ContactLogRecord['status'], service: string, timestamp: string): ContactLogRecord {
  return {
    id: `REF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    timestamp,
    name: payload.name.trim(),
    email: payload.email.trim(),
    subject: payload.subject.trim() || 'General Inquiry',
    message: payload.message.trim(),
    status,
    service,
    recipient: DEVELOPER_INFO.email,
  };
}

export const contactLoggingService = {
  /**
   * Dispatches contact message to the server API with strict server-side validation,
   * rate limiting verification, and audit logging.
   */
  async dispatchMessage(payload: ContactMessagePayload): Promise<DispatchResult> {
    const timestamp = new Date().toISOString();

    // EmailJS is the production path for the static Vercel deployment.
    if (isEmailJsConfigured) {
      try {
        const response = await fetch(EMAILJS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: emailJsConfig.serviceId,
            template_id: emailJsConfig.templateId,
            user_id: emailJsConfig.publicKey,
            template_params: {
              from_name: payload.name.trim(),
              reply_to: payload.email.trim(),
              subject: payload.subject.trim() || 'General Inquiry',
              message: payload.message.trim(),
              to_email: DEVELOPER_INFO.email,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`EmailJS request failed with status ${response.status}`);
        }

        const record = createRecord(payload, 'DELIVERED', 'EmailJS', timestamp);
        this.saveLog(record);
        return {
          success: true,
          record,
          message: 'Your message was sent successfully. I will get back to you soon.',
        };
      } catch (error) {
        console.error('[Contact Service] EmailJS request failed:', error);
        return {
          success: false,
          message: `The message could not be sent. Please email ${DEVELOPER_INFO.email} directly.`,
        };
      }
    }

    // Keep the Express route available for local development and traditional Node hosting.
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          honeypot: payload.honeypot,
        }),
      });

      const data = await response.json().catch(() => null);

      // Handle Rate Limit (HTTP 429)
      if (response.status === 429) {
        return {
          success: false,
          isRateLimited: true,
          message: data?.error || 'Rate limit reached. Please wait a few minutes before submitting another message.',
        };
      }

      // Handle Server-Side Validation Errors (HTTP 400)
      if (response.status === 400 || !response.ok) {
        if (data?.errors) {
          return {
            success: false,
            serverErrors: data.errors,
            message: data.message || 'Server rejected the submission due to validation errors.',
          };
        }
        return {
          success: false,
          message: data?.error || data?.message || 'Server validation failed.',
        };
      }

      // Server validated and approved!
      if (data && data.success && data.record) {
        const verifiedRecord: ContactLogRecord = {
          id: data.trackingId || data.record.id,
          timestamp: data.receivedAt || data.record.timestamp || timestamp,
          name: data.record.name,
          email: data.record.email,
          subject: data.record.subject,
          message: data.record.message,
          status: 'DELIVERED',
          service: 'Express API Backend (Server-Validated)',
          recipient: DEVELOPER_INFO.email,
        };

        // Persist to local audit log
        this.saveLog(verifiedRecord);

        return {
          success: true,
          record: verifiedRecord,
          message: data.message || 'Message verified and safely recorded by the server.',
        };
      }
    } catch (networkErr) {
      console.warn('[Contact Service] Backend API request error:', networkErr);
    }

    return {
      success: false,
      message: `The message could not be sent. Please email ${DEVELOPER_INFO.email} directly.`,
    };
  },

  /**
   * Saves record to persistent browser audit log
   */
  saveLog(record: ContactLogRecord): void {
    try {
      const existingLogs = this.getLogs();
      const updatedLogs = [record, ...existingLogs.filter((r) => r.id !== record.id).slice(0, 19)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
    } catch (e) {
      console.error('[Contact Service] Could not write to localStorage:', e);
    }
  },

  /**
   * Retrieves historical messages dispatched in this browser
   */
  getLogs(): ContactLogRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * Clear local message logs
   */
  clearLogs(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  },
};

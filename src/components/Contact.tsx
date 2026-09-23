import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  History,
  ShieldCheck,
} from 'lucide-react';
import { defaultViewport, sectionRevealVariants } from '../lib/motionVariants';
import SocialIcon from './SocialIcon';
import {
  contactLoggingService,
  ContactLogRecord,
} from '../services/contactLoggingService';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INQUIRY_TYPES = [
  'Full-Time Opportunity',
  'Contract / Freelance',
  'Project Collaboration',
  'Technical Consultation',
  'General Inquiry',
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Full-Time Opportunity');
  const [customSubject, setCustomSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // anti-spam bot trap

  // Validation & UI State
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastRecord, setLastRecord] = useState<ContactLogRecord | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Logs Drawer / Viewer
  const [logs, setLogs] = useState<ContactLogRecord[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    setLogs(contactLoggingService.getLogs());
  }, [submitStatus]);

  const validateField = (fieldName: string, value: string): string | undefined => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Please enter at least 2 characters.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        // RFC 5322 standard regex validation
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
          return 'Please provide a valid email address (e.g. name@domain.com).';
        }
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message cannot be empty.';
        if (value.trim().length < 15) {
          return `Please write at least 15 characters (${15 - value.trim().length} more needed).`;
        }
        if (value.trim().length > 1500) {
          return 'Message exceeds maximum length of 1500 characters.';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev: { [key: string]: boolean }) => ({ ...prev, [fieldName]: true }));
    let val = '';
    if (fieldName === 'name') val = name;
    if (fieldName === 'email') val = email;
    if (fieldName === 'message') val = message;

    const error = validateField(fieldName, val);
    setErrors((prev: FormErrors) => ({ ...prev, [fieldName]: error }));
  };

  const handleInputChange = (fieldName: string, value: string) => {
    if (fieldName === 'name') setName(value);
    if (fieldName === 'email') setEmail(value);
    if (fieldName === 'message') setMessage(value);

    // If field was touched, perform real-time error clearance
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev: FormErrors) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyRef = (refId: string) => {
    navigator.clipboard.writeText(refId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Silently trap automated bots filling honeypot
    if (honeypot) {
      setSubmitStatus('success');
      return;
    }

    // Trigger full validation across all fields
    const nameErr = validateField('name', name);
    const emailErr = validateField('email', email);
    const msgErr = validateField('message', message);

    const validationErrors: FormErrors = {
      name: nameErr,
      email: emailErr,
      message: msgErr,
    };

    setTouched({ name: true, email: true, message: true });
    setErrors(validationErrors);

    if (nameErr || emailErr || msgErr) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Intentional subtle delay to ensure user experiences smooth loading feedback
      const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 800));
      const finalSubject = customSubject.trim()
        ? `${inquiryType}: ${customSubject.trim()}`
        : inquiryType;

      const [dispatchResult] = await Promise.all([
        contactLoggingService.dispatchMessage({
          name,
          email,
          subject: finalSubject,
          message,
          honeypot,
        }),
        minDelayPromise,
      ]);

      if (dispatchResult.success && dispatchResult.record) {
        setLastRecord(dispatchResult.record);
        setStatusMessage(dispatchResult.message);
        setSubmitStatus('success');
        setLogs(contactLoggingService.getLogs());
      } else {
        setSubmitStatus('error');
        if (dispatchResult.serverErrors) {
          setErrors((prev: FormErrors) => ({ ...prev, ...dispatchResult.serverErrors }));
          setTouched({ name: true, email: true, message: true });
          setStatusMessage(dispatchResult.message || 'Server rejected the submission due to validation constraints.');
        } else {
          setStatusMessage(dispatchResult.message || 'Unable to connect to the logging gateway. You can use direct email.');
        }
      }
    } catch (err) {
      console.error('[Contact Form] Submission error:', err);
      setSubmitStatus('error');
      setStatusMessage('Network interruption occurred. Please try again or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setCustomSubject('');
    setMessage('');
    setTouched({});
    setErrors({});
    setSubmitStatus('idle');
    setLastRecord(null);
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-20 sm:py-28 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={sectionRevealVariants}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h2 className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
                Get In Touch
              </h2>
              <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                Let's work together.
              </p>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                I'm open to full-time engineering roles, contracts, and software collaborations.
                Send a message through the interactive form or reach out directly.
              </p>
            </div>

            {/* Direct Email Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Direct Email</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Click icon to animate</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <SocialIcon name="email" size={24} />
                  <a
                    href={`mailto:${DEVELOPER_INFO.email}`}
                    className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm truncate"
                  >
                    {DEVELOPER_INFO.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
                  aria-label="Copy email to clipboard"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Service & Security Guarantee */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>
                Messages are validated and sent securely. Your email is used only so Micheal can reply.
              </span>
            </div>

            {/* Social Links */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Online Profiles</span>
                <span className="text-[10px] text-slate-400 normal-case">Direct connections</span>
              </div>
              <div className="flex flex-col gap-2.5 text-sm font-medium">
                <a
                  href={DEVELOPER_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all border border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 group shadow-2xs"
                  title="Visit Micheal Eti GitHub Profile"
                >
                  <span className="flex items-center gap-3">
                    <SocialIcon name="github" size={22} />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        GitHub
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        @{DEVELOPER_INFO.githubUsername}
                      </div>
                    </div>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={DEVELOPER_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all border border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 group shadow-2xs"
                  title="Connect with Micheal Eti on LinkedIn"
                >
                  <span className="flex items-center gap-3">
                    <SocialIcon name="linkedin" size={22} />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        LinkedIn
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        micheal-eti
                      </div>
                    </div>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>

            {/* View Previous Logs Toggle */}
            {logs.length > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogs(!showLogs)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>
                    {showLogs ? 'Hide Transmission History' : `View Local Transmission History (${logs.length})`}
                  </span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Right Column: Interactive Contact Form & States */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={sectionRevealVariants}
            className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-[#FAFAFA] dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            {/* Top Loading Progress Line */}
            {isSubmitting && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 dark:bg-blue-950 overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600 dark:bg-blue-400"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && lastRecord ? (
                  /* Success Receipt State */
                  <motion.div
                    key="success-receipt"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                          Message Dispatched & Logged
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {statusMessage || 'Your message has been verified and recorded.'}
                        </p>
                      </div>
                    </div>

                    {/* Transmission Receipt Box */}
                    <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-sans text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Tracking Reference:</span>
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-xs font-semibold text-slate-900 dark:text-slate-200">
                            {lastRecord.id}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopyRef(lastRecord.id)}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title="Copy reference code"
                          >
                            {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Sender:</span>
                        <span className="font-medium text-slate-900 dark:text-slate-200">
                          {lastRecord.name} ({lastRecord.email})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Inquiry Subject:</span>
                        <span className="font-medium text-slate-900 dark:text-slate-200 text-right max-w-[240px] truncate">
                          {lastRecord.subject}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Recipient Gateway:</span>
                        <span className="font-medium text-slate-900 dark:text-slate-200">
                          {lastRecord.recipient}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                        <span>Timestamp:</span>
                        <span>{new Date(lastRecord.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        id="send-another-msg-btn"
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-2xs"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Send Another Message</span>
                      </button>

                      <a
                        href={`mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent(lastRecord.subject)}&body=${encodeURIComponent(lastRecord.message)}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Open in Email Client (Backup)</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* Active Form View */
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Header */}
                    <div className="mb-2">
                      <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                        Send a Message
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Fill in your project or role details below. All inquiries are validated and dispatched immediately.
                      </p>
                    </div>

                    {/* Honeypot Spam Trap (Hidden) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Inquiry Type Pills */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Inquiry Topic
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {INQUIRY_TYPES.map((type) => {
                          const isSelected = inquiryType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setInquiryType(type)}
                              disabled={isSubmitting}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-60 ${
                                isSelected
                                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name and Email Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label
                            htmlFor="contact-form-name"
                            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                          >
                            Your Name <span className="text-rose-500">*</span>
                          </label>
                          {touched.name && !errors.name && name.trim() && (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </div>
                        <input
                          id="contact-form-name"
                          type="text"
                          required
                          disabled={isSubmitting}
                          value={name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          placeholder="e.g. Alex Chen"
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden transition-colors disabled:opacity-60 ${
                            touched.name && errors.name
                              ? 'border-rose-400 dark:border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 focus:border-rose-500'
                              : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                          }`}
                        />
                        {touched.name && errors.name && (
                          <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label
                            htmlFor="contact-form-email"
                            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                          >
                            Your Email <span className="text-rose-500">*</span>
                          </label>
                          {touched.email && !errors.email && email.trim() && (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </div>
                        <input
                          id="contact-form-email"
                          type="email"
                          required
                          disabled={isSubmitting}
                          value={email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="alex@company.com"
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden transition-colors disabled:opacity-60 ${
                            touched.email && errors.email
                              ? 'border-rose-400 dark:border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 focus:border-rose-500'
                              : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                          }`}
                        />
                        {touched.email && errors.email && (
                          <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Custom Subject Line (Optional) */}
                    <div>
                      <label
                        htmlFor="contact-form-custom-subject"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Subject Title <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-form-custom-subject"
                        type="text"
                        disabled={isSubmitting}
                        value={customSubject}
                        onChange={(e) => setCustomSubject(e.target.value)}
                        placeholder={`e.g. Discussing ${inquiryType}`}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 transition-colors disabled:opacity-60"
                      />
                    </div>

                    {/* Message Area */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="contact-form-message"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          Your Message <span className="text-rose-500">*</span>
                        </label>
                        <span
                          className={`text-xs ${
                            message.trim().length > 1500
                              ? 'text-rose-500 font-semibold'
                              : message.trim().length >= 15
                              ? 'text-slate-400 dark:text-slate-500'
                              : 'text-slate-400'
                          }`}
                        >
                          {message.trim().length} / 1500 (min 15)
                        </span>
                      </div>
                      <textarea
                        id="contact-form-message"
                        required
                        rows={4}
                        disabled={isSubmitting}
                        value={message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="Provide some context on the project scope, technical stack, or role details..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden transition-colors resize-none disabled:opacity-60 ${
                          touched.message && errors.message
                            ? 'border-rose-400 dark:border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                        }`}
                      />
                      {touched.message && errors.message && (
                        <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submission Error Banner */}
                    {submitStatus === 'error' && (
                      <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                        <div>
                          <p className="font-semibold">Dispatch could not be completed</p>
                          <p className="mt-0.5 text-rose-600 dark:text-rose-300">{statusMessage}</p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button & Interactive Loading State */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <button
                        id="submit-inquiry-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-xs ${
                          isSubmitting
                            ? 'bg-blue-600 text-white cursor-wait opacity-90'
                            : 'text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 active:scale-[0.99] cursor-pointer'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Transmitting message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Logging service active & ready</span>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>

              {/* Collapsible Local Message Logs with Loading & Empty State */}
              {showLogs && (
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                        Local Transmission Log ({logs.length})
                      </h4>
                    </div>
                    {logs.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          contactLoggingService.clearLogs();
                          setLogs([]);
                        }}
                        className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        Clear Log
                      </button>
                    )}
                  </div>

                  {logs.length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-start justify-between gap-3"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {log.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ({log.id})
                              </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] line-clamp-1">
                              {log.subject} — "{log.message}"
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                              {log.status}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-1">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        No transmission records found in this browser session.
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                        When you submit a message, its verified tracking reference and delivery status will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

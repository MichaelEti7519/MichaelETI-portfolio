import { useState } from 'react';
import { Project } from '../data/portfolioData';
import {
  ArrowUpRight,
  Github,
  CheckCircle2,
  Layers,
  Cpu,
  Eye,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Database,
  ExternalLink,
  Calendar,
  MapPin,
  Sparkles,
  Lock,
  ChevronRight,
  Check,
  Users,
  Compass,
  FileCode2,
  Terminal,
} from 'lucide-react';

interface FeaturedProjectProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export default function FeaturedProject({ project, onSelectProject }: FeaturedProjectProps) {
  const [activePreviewMode, setActivePreviewMode] = useState<'ui' | 'roles' | 'architecture' | 'payments'>('ui');
  const [activeRoleView, setActiveRoleView] = useState<'traveler' | 'host' | 'admin'>('traveler');
  const [guestsCount, setGuestsCount] = useState(2);
  const [nightsCount, setNightsCount] = useState(3);
  const pricePerNight = 120;
  const carbonOffsetKg = nightsCount * 14;
  const totalPrice = nightsCount * pricePerNight + 25; // 25 is eco-tax / green fund

  return (
    <section id="featured-project" aria-label="Featured Project Case Study" className="mb-20 sm:mb-28">
      {/* 1. Large Commanding Project Visual (Dominant Showcase Container) */}
      <div className="rounded-2xl bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Top Control Bar / View Switcher */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs font-semibold text-slate-200">
              ecotreks-fullstack-marketplace / v1.0.0
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-emerald-400 border border-slate-700">
              TypeScript / ESM
            </span>
          </div>

          {/* Interactive Screen Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg font-mono text-xs border border-slate-800">
            <button
              id="preview-mode-ui"
              type="button"
              onClick={() => setActivePreviewMode('ui')}
              className={`px-3 py-1.5 rounded transition-all ${
                activePreviewMode === 'ui'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UI Preview
            </button>
            <button
              id="preview-mode-roles"
              type="button"
              onClick={() => setActivePreviewMode('roles')}
              className={`px-3 py-1.5 rounded transition-all ${
                activePreviewMode === 'roles'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3-Role RBAC
            </button>
            <button
              id="preview-mode-architecture"
              type="button"
              onClick={() => setActivePreviewMode('architecture')}
              className={`px-3 py-1.5 rounded transition-all ${
                activePreviewMode === 'architecture'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Prisma Schema
            </button>
            <button
              id="preview-mode-payments"
              type="button"
              onClick={() => setActivePreviewMode('payments')}
              className={`px-3 py-1.5 rounded transition-all ${
                activePreviewMode === 'payments'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Stripe Webhook
            </button>
          </div>
        </div>

        {/* Representative Visual Workbench / Interactive Screen */}
        <div className="p-6 sm:p-8 lg:p-10 bg-slate-950 text-white border-b border-slate-800">
          
          {/* 1. Representative UI Screen Preview */}
          {activePreviewMode === 'ui' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
                <span>UI PREVIEW: Traveler Eco-Lodge Booking & Checkout View</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Live State Simulator
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
                {/* Stay Summary Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Certified Solar & Rainwater Eco-Lodge
                    </span>
                    <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      Obudu Plateau Eco-Reserve
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Canopy Solar Retreat & Organic Farm Stay
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Zero-grid off-grid retreat with permaculture dining, natural spring water filtration, and solar micro-grid telemetry. Bookings trigger an escrow reservation holding fee with verified Stripe payments.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 text-center">
                      <div className="text-[11px] text-slate-400">Carbon Offset</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">
                        -{carbonOffsetKg} kg CO₂
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 text-center">
                      <div className="text-[11px] text-slate-400">Solar Power</div>
                      <div className="text-sm font-bold text-sky-400 mt-0.5">100% Off-Grid</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 text-center">
                      <div className="text-[11px] text-slate-400">Host Response</div>
                      <div className="text-sm font-bold text-sky-400 mt-0.5">&lt; 15 mins</div>
                    </div>
                  </div>

                  {/* Leaflet Geo Tag & In-App Chat Notice */}
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-sky-400" />
                      <span>Leaflet Map Geolocation: Lat 6.674° N, Lng 9.362° E</span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400">GPS Verified</span>
                  </div>
                </div>

                {/* Interactive Booking Calculator & Stripe Checkout Trigger */}
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                      <div>
                        <span className="text-2xl font-bold text-white">${pricePerNight}</span>
                        <span className="text-xs text-slate-400 ml-1">/ night</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Host Available
                      </span>
                    </div>

                    {/* Dynamic selectors */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Duration (Nights):</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setNightsCount(Math.max(1, nightsCount - 1))}
                            className="w-6 h-6 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold w-4 text-center">{nightsCount}</span>
                          <button
                            type="button"
                            onClick={() => setNightsCount(nightsCount + 1)}
                            className="w-6 h-6 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Guests:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                            className="w-6 h-6 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold w-4 text-center">{guestsCount}</span>
                          <button
                            type="button"
                            onClick={() => setGuestsCount(guestsCount + 1)}
                            className="w-6 h-6 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800/80 mb-4">
                      <div className="flex justify-between">
                        <span>${pricePerNight} x {nightsCount} nights</span>
                        <span className="text-slate-200">${nightsCount * pricePerNight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Eco-Tax & Reforestation Fund</span>
                        <span className="text-emerald-400">+$25</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-slate-800">
                        <span>Total (Stripe Escrow)</span>
                        <span className="text-emerald-400">${totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button Simulation */}
                  <div className="space-y-2">
                    <div className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-sm">
                      <CreditCard className="w-4 h-4" />
                      <span>Proceed to Stripe Checkout (${totalPrice})</span>
                    </div>
                    <div className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Verified Webhook Handshake • Neon PostgreSQL Sync</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Three-Role RBAC Model View */}
          {activePreviewMode === 'roles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
                <span>ROLE-BASED ACCESS CONTROL (RBAC) ARCHITECTURE</span>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveRoleView('traveler')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      activeRoleView === 'traveler' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    Traveler
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveRoleView('host')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      activeRoleView === 'host' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    Host
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveRoleView('admin')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      activeRoleView === 'admin' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {activeRoleView === 'traveler' && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <Users className="w-4 h-4" />
                    <span>Traveler Persona Workspace</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Designed for eco-conscious adventurers seeking verified green accommodations and carbon-conscious expeditions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-sky-400 font-bold mb-1">Stay Discovery</div>
                      <div className="text-slate-400 text-[11px]">Filter by verified solar, organic farms, or carbon rating with Leaflet map markers.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-sky-400 font-bold mb-1">Stripe Checkout</div>
                      <div className="text-slate-400 text-[11px]">Redirects to hosted checkout session; booking state transitions to PAID on webhook trigger.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-sky-400 font-bold mb-1">In-App Chat</div>
                      <div className="text-slate-400 text-[11px]">Socket.IO private room for check-in coordination and route directions with host.</div>
                    </div>
                  </div>
                </div>
              )}

              {activeRoleView === 'host' && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Host Operations Workspace</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Purpose-built dashboard for property managers and eco-lodge proprietors to manage occupancy and revenue.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-sky-400 font-bold mb-1">Listing Publisher</div>
                      <div className="text-slate-400 text-[11px]">Create stays and experiences with geo-coordinates, photo assets, and pricing.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-sky-400 font-bold mb-1">Reservation Calendar</div>
                      <div className="text-slate-400 text-[11px]">Approve or reject incoming reservation requests with instant client notifications.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-sky-400 font-bold mb-1">Earnings & Payouts</div>
                      <div className="text-slate-400 text-[11px]">Track cumulative booking revenue, platform fee deductions, and submit payout requests.</div>
                    </div>
                  </div>
                </div>
              )}

              {activeRoleView === 'admin' && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Governance & Auditing</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Platform security controls for vetting eco-credentials, resolving dispute flags, and approving host payouts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-emerald-400 font-bold mb-1">Host Verification</div>
                      <div className="text-slate-400 text-[11px]">Review host credentials, audit eco-certifications, and grant or suspend listing permissions.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-emerald-400 font-bold mb-1">Payout Authorizations</div>
                      <div className="text-slate-400 text-[11px]">Inspect Stripe payment logs, audit booking completions, and authorize releases.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-emerald-400 font-bold mb-1">Dispute Management</div>
                      <div className="text-slate-400 text-[11px]">Review flagged bookings, moderate in-app messages, and safeguard marketplace trust.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Prisma Schema Entity Relationships */}
          {activePreviewMode === 'architecture' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>schema.prisma (PostgreSQL / Neon Model Structure)</span>
                <span className="text-emerald-400">6 Entity Models • Strict Foreign Keys</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-[11px]">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-sky-400 font-bold block mb-1">model User</span>
                  <p className="text-slate-400 text-[10px] mb-2">id, email, passwordHash, name, role (TRAVELER | HOST | ADMIN), createdAt</p>
                  <span className="text-emerald-400 text-[10px]">Relations: listings, bookings, reviews, messages</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-sky-400 font-bold block mb-1">model Listing</span>
                  <p className="text-slate-400 text-[10px] mb-2">id, title, description, price, latitude, longitude, hostId, ecoCert</p>
                  <span className="text-emerald-400 text-[10px]">Relations: host -&gt; User, bookings, reviews</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">model Booking</span>
                  <p className="text-slate-400 text-[10px] mb-2">id, startDate, endDate, totalPrice, status (PENDING | PAID | COMPLETED)</p>
                  <span className="text-emerald-400 text-[10px]">Relations: listing -&gt; Listing, traveler -&gt; User, payment</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">model Payment</span>
                  <p className="text-slate-400 text-[10px] mb-2">id, bookingId, stripeSessionId, amount, status, signatureVerified</p>
                  <span className="text-emerald-400 text-[10px]">Relations: booking -&gt; Booking (1-to-1)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-violet-400 font-bold block mb-1">model Message</span>
                  <p className="text-slate-400 text-[10px] mb-2">id, senderId, receiverId, bookingId, content, socketDelivered, sentAt</p>
                  <span className="text-emerald-400 text-[10px]">Relations: sender -&gt; User, receiver -&gt; User</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-rose-400 font-bold block mb-1">model PayoutRequest</span>
                  <p className="text-slate-400 text-[10px] mb-2">id, hostId, amount, status (REQUESTED | APPROVED | REJECTED), reviewedAt</p>
                  <span className="text-emerald-400 text-[10px]">Relations: host -&gt; User, admin -&gt; User</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. Stripe Webhook & Payment Flow */}
          {activePreviewMode === 'payments' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>STRIPE CHECKOUT & WEBHOOK LIFECYCLE</span>
                <span className="text-sky-400">Raw-Body Verification Pipeline</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span>1. Checkout Session</span>
                  </div>
                  <p className="text-slate-400 text-[10px]">Express creates session with booking ID metadata, line items, and success/cancel URLs.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>2. Webhook Event</span>
                  </div>
                  <p className="text-slate-400 text-[10px]">Stripe signs webhook with `stripe-signature` header; Express validates raw payload bytes.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Database className="w-4 h-4 shrink-0" />
                    <span>3. Prisma Commit</span>
                  </div>
                  <p className="text-slate-400 text-[10px]">Transaction updates Booking status to PAID, inserts Payment record, and increments host balance.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>4. Socket.IO Broadcast</span>
                  </div>
                  <p className="text-slate-400 text-[10px]">Server emits instant payment confirmation to Host and Traveler active UI channels.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 2. Structured Metadata & Narrative Block Directly Below Visual */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8 bg-white dark:bg-[#0B0F17]">
          
          {/* Header Row: 01 / FEATURED, Project Name & Immediate Actions */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase mb-2 flex items-center gap-2">
                <span>01 / FEATURED</span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-slate-500 dark:text-slate-400">FLAGSHIP REPOSITORY</span>
              </div>
              <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium font-sans max-w-3xl">
                {project.tagline}
              </p>
            </div>

            {/* View Project & GitHub CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                id="featured-primary-view-project"
                type="button"
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-xs"
              >
                <span>VIEW PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                id="featured-primary-github"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Core Description & Technologies Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                EcoTreks was engineered to solve the complex coordination challenge of sustainable tourism: connecting verified eco-conscious travelers with vetted property hosts and environmental guides while providing transparent escrow payments, real-time messaging, and admin compliance auditing.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                Built with a normalized PostgreSQL database mapped via Prisma ORM, strict three-tier role access controls (Traveler, Host, Admin), and atomic Stripe webhook event processing.
              </p>
            </div>

            {/* Technologies */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 font-semibold">
                TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Two-Column Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            
            {/* The Problem It Solves */}
            <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-600 dark:bg-rose-500" />
                <span>The Problem It Solves</span>
              </div>
              <h5 className="text-lg font-bold text-slate-900 dark:text-white">
                Fragmented green-travel booking & opaque host payouts
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.problem}
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Lack of verifiable eco-credentials on mainstream booking channels leads to consumer skepticism.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Independent eco-lodge proprietors struggle with booking software that doesn't support calendar approvals or direct traveler chat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Absence of escrow-style payment verification and transparent admin dispute mediation.</span>
                </li>
              </ul>
            </div>

            {/* The Proposed Solution */}
            <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500" />
                <span>The Proposed Solution</span>
              </div>
              <h5 className="text-lg font-bold text-slate-900 dark:text-white">
                Unified multi-role marketplace with real-time sync & Stripe
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.solution}
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Three distinct role workspaces (Traveler, Host, Admin) backed by JWT RBAC authentication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Automated Stripe Checkout session generation and raw-body webhook signature verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Instant bidirectional Socket.IO messaging rooms linking travelers directly with hosts.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Comprehensive Technology Stack Employed */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Technology Stack Employed Across Repository
              </h5>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Extracted from package.json & backend/package.json
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Frontend Stack */}
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Frontend Architecture</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['React 19', 'TypeScript 5.8', 'Vite 6.2', 'Tailwind CSS 4', 'React Router v7', 'Leaflet', 'Motion', 'Date-fns'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Stack */}
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Backend Architecture</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Node.js 20', 'Express 4.21', 'TypeScript 5.8', 'Prisma ORM 6.8', 'Zod 3.25', 'Socket.IO 4.8', 'Helmet', 'CORS'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database & Storage */}
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Database & Cloud</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['PostgreSQL (Neon)', 'Prisma Schema', 'Relational Joins', 'DB Push Sync', 'Firebase (Legacy)'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Payments & Security */}
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Payments & Security</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Stripe SDK 17.4', 'Stripe Webhooks', 'JWT Tokens', 'bcryptjs Hashing', 'Vercel SPA Rewrites'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Key Functionalities: 6 Pillars */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h5 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Key Functionalities & Implemented Workflows
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>1. Three-Role RBAC Security</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Rigorous role-based routing protecting traveler booking history, host listing tools, and admin platform oversight via signed JWT tokens and bcrypt password hashing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>2. Stripe Checkout & Webhook Pipeline</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Full checkout session creation with raw-body cryptographic signature verification. Automatically marks bookings as PAID and records host earnings upon receipt.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>3. Real-Time Socket.IO Messaging</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Low-latency in-app chat rooms linking travelers and hosts directly for pre-arrival coordination, booking updates, and inquiry resolutions without external apps.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>4. Host Calendar & Payout Dashboard</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Interactive calendar view for approving or rejecting stay reservations, tracking completed checkouts, and initiating official payout requests.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>5. Leaflet Geolocation & Discovery</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Interactive geographic map view for eco-stay coordinates, filterable by carbon rating, certified solar infrastructure, and local eco-guides.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>6. Admin Governance & Audits</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Administrative review interface to verify host sustainability certificates, inspect Stripe transactions, resolve disputed bookings, and authorize payouts.
                </p>
              </div>

            </div>
          </div>

          {/* Action Links: Direct Link to Repository & Details */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                id="featured-direct-github-btn"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white dark:text-slate-950 bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-md hover:shadow-lg group"
              >
                <Github className="w-4 h-4" />
                <span>View EcoTreks Repository on GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-sky-400 dark:text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                id="featured-modal-deepdive-btn"
                type="button"
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-2xs"
              >
                <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Examine Technical Specs</span>
              </button>
            </div>

            {/* Note on verified profile demos */}
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified across 110 source files</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

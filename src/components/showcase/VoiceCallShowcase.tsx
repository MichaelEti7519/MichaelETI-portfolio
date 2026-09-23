import { useState, useEffect } from 'react';
import { Project } from '../../data/portfolioData';
import { ArrowUpRight, Github, Radio, Mic, Activity, Volume2, Cpu, Eye } from 'lucide-react';

interface VoiceCallShowcaseProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export default function VoiceCallShowcase({ project, onSelectProject }: VoiceCallShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSpeaker, setActiveSpeaker] = useState<'alice' | 'carlos'>('alice');
  const [waveformBars, setWaveformBars] = useState<number[]>([25, 45, 80, 60, 95, 40, 75, 30, 85, 50, 70, 90, 35, 65, 85, 45]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setWaveformBars(prev =>
        prev.map(() => Math.floor(Math.random() * 75) + 20)
      );
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div
      id="voice-call-showcase"
      className="mb-20 sm:mb-28 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E131F] rounded-2xl overflow-hidden shadow-xs"
    >
      {/* Editorial Header Ribbon */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-blue-600 dark:text-blue-400">03 / PROJECT 03</span>
          <span className="text-slate-400">•</span>
          <span className="uppercase text-slate-600 dark:text-slate-400 font-medium">
            LOW-LATENCY STREAMING & WEBSOCKET PIPELINE
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="hidden sm:inline">TypeScript • Web Audio API • WebSockets • PCM16</span>
          <a
            id="voice-call-repo-link"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Varied Layout: Information on the LEFT, Large Visual on the RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column (lg:col-span-6): Information & Architectural Pipeline */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
              REAL-TIME AUDIO & TELECOMMUNICATIONS
            </div>
            
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-3">
              {project.title}
            </h3>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-sans">
              {project.problem}
            </p>

            {/* 4-Stage Architectural Pipeline */}
            <div className="mb-6">
              <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Zero-Stutter Audio Ring Buffer</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>STAGE 01</span>
                    <Mic className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">Web Audio API</div>
                  <div className="text-[11px] text-slate-500 font-sans">
                    ScriptProcessor captures raw 16kHz PCM audio frames.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>STAGE 02</span>
                    <Cpu className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">Decoupled Queue</div>
                  <div className="text-[11px] text-slate-500 font-sans">
                    Ring buffer isolates audio packets from UI render passes.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>STAGE 03</span>
                    <Activity className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">WebSocket Relay</div>
                  <div className="text-[11px] text-slate-500 font-sans">
                    Binary transmission over low-overhead TCP WebSocket channel.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>STAGE 04</span>
                    <Volume2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">Synced Transcript</div>
                  <div className="text-[11px] text-slate-500 font-sans">
                    Sub-sentence token streaming with timestamp synchronization.
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="voice-call-inspect-btn"
                type="button"
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-xs"
              >
                <span>VIEW PROJECT</span>
                <Eye className="w-3.5 h-3.5" />
              </button>

              <a
                id="voice-call-github-btn"
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

            <span className="font-mono text-xs text-slate-500">
              Latency: ~42ms Verified
            </span>
          </div>

        </div>

        {/* Right Column (lg:col-span-6): Large Visual Waveform & Interactive Telemetry */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 bg-slate-50 dark:bg-[#080C14] flex flex-col justify-between space-y-6">
          
          {/* Top Audio Telemetry Strip */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between font-mono text-xs pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                PCM16 AUDIO STREAM SIMULATOR
              </span>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {isPlaying ? 'PAUSE' : 'RESUME'}
              </button>
            </div>

            {/* Live Waveform Canvas Bars */}
            <div className="h-24 bg-slate-950 rounded-lg p-3 flex items-end justify-between gap-1 border border-slate-800 mb-3">
              {waveformBars.map((height, idx) => (
                <div
                  key={idx}
                  style={{ height: `${isPlaying ? height : 15}%` }}
                  className="w-full bg-blue-500 dark:bg-blue-400 rounded-xs transition-all duration-150"
                />
              ))}
            </div>

            {/* Channel Metrics */}
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-400 text-[10px]">SAMPLING</div>
                <div className="font-bold text-slate-900 dark:text-white">16,000 Hz</div>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-400 text-[10px]">BUFFER</div>
                <div className="font-bold text-slate-900 dark:text-white">4096 bytes</div>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-400 text-[10px]">LATENCY</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400">42ms</div>
              </div>
            </div>
          </div>

          {/* Synchronized Dual-Stream Conversation Inspector */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-semibold text-slate-900 dark:text-white">
                Bilingual Synchronized Conversation Turns
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setActiveSpeaker('alice')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    activeSpeaker === 'alice'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Speaker A (EN)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSpeaker('carlos')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    activeSpeaker === 'carlos'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Speaker B (ES)
                </button>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between font-mono text-[10px] text-slate-400">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Alice (San Francisco)</span>
                  <span>14:02:11.412 UTC</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200">
                  "Confirming the delivery coordinates for tomorrow morning at the central depot."
                </p>
                <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 pt-1">
                  → ES: "Confirmando las coordenadas de entrega para mañana por la mañana en el depósito central."
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between font-mono text-[10px] text-slate-400">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Carlos (Madrid)</span>
                  <span>14:02:12.108 UTC</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200">
                  "Entendido perfectamente, el equipo de aduanas ya tiene la autorización."
                </p>
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 pt-1">
                  → EN: "Understood perfectly, the customs clearance team already holds the authorization."
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

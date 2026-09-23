import * as THREE from 'three';

export interface CodeFile {
  id: string;
  name: string;
  lang: string;
  icon: string;
  lines: string[];
}

export const CODE_FILES: CodeFile[] = [
  {
    id: 'typescript',
    name: 'HeroComponent.tsx',
    lang: 'TypeScript / React',
    icon: '⚛️',
    lines: [
      "import React, { useState, useEffect } from 'react';",
      "import { motion, AnimatePresence } from 'motion/react';",
      "",
      "interface EngineerProps {",
      "  developer: 'Micheal Eti';",
      "  role: 'Software Engineer';",
      "  specialties: ['Full-Stack', 'Mobile', 'AI Systems'];",
      "}",
      "",
      "export const DeveloperHero: React.FC<EngineerProps> = () => {",
      "  const [status, setStatus] = useState<'coding' | 'shipping'>('coding');",
      "  const [metrics, setMetrics] = useState({ latency: 14, uptime: '99.99%' });",
      "",
      "  useEffect(() => {",
      "    console.log('⚡ Initializing production-ready architecture...');",
      "    // Zero-downtime CI/CD build deployment",
      "    cloudService.onBuildSuccess(() => setStatus('shipping'));",
      "  }, []);",
      "",
      "  return (",
      "    <div className='flex flex-col gap-4 font-sans'>",
      "      <Badge variant='emerald'>{status === 'shipping' ? 'Shipped' : 'Coding'}</Badge>",
      "      <p className='text-sm text-slate-300'>Latency: {metrics.latency}ms</p>",
      "    </div>",
      "  );",
      "};",
    ],
  },
  {
    id: 'backend',
    name: 'apiServer.ts',
    lang: 'Node.js / Express',
    icon: '⚡',
    lines: [
      "import express, { Request, Response } from 'express';",
      "import { securityHeaders, rateLimiter } from './middleware';",
      "import { DatabaseClient } from './db/client';",
      "",
      "const app = express();",
      "const db = new DatabaseClient({ poolSize: 20 });",
      "",
      "app.use(express.json());",
      "app.use(securityHeaders());",
      "app.use(rateLimiter({ windowMs: 60000, max: 1200 }));",
      "",
      "app.get('/api/health', async (req: Request, res: Response) => {",
      "  const health = await db.checkConnection();",
      "  return res.json({",
      "    status: 'healthy',",
      "    db: health.connected,",
      "    uptime: process.uptime(),",
      "  });",
      "});",
      "",
      "app.listen(3000, () => console.log('🚀 Server active on port 3000'));",
    ],
  },
  {
    id: 'ai',
    name: 'geminiAgent.ts',
    lang: 'AI / Gemini SDK',
    icon: '🤖',
    lines: [
      "import { GoogleGenAI } from '@google/genai';",
      "",
      "const ai = new GoogleGenAI();",
      "const model = 'gemini-2.5-flash';",
      "",
      "export async function streamAutonomousPlan(brief: string) {",
      "  const response = await ai.models.generateContentStream({",
      "    model,",
      "    contents: brief,",
      "    config: {",
      "      systemInstruction: 'You are an autonomous engineering agent.',",
      "      temperature: 0.2,",
      "    },",
      "  });",
      "",
      "  for await (const chunk of response) {",
      "    process.stdout.write(chunk.text || '');",
      "  }",
      "}",
    ],
  },
  {
    id: 'rust',
    name: 'data_pipeline.rs',
    lang: 'Rust / Wasm',
    icon: '🦀',
    lines: [
      "use std::sync::Arc;",
      "use tokio::sync::RwLock;",
      "",
      "#[derive(Debug, Clone)]",
      "pub struct DataStream {",
      "    pub buffer: Arc<RwLock<Vec<u8>>>,",
      "    pub packet_count: u64,",
      "}",
      "",
      "impl DataStream {",
      "    pub async fn ingest(&mut self, payload: &[u8]) -> Result<(), Error> {",
      "        let mut lock = self.buffer.write().await;",
      "        lock.extend_from_slice(payload);",
      "        self.packet_count += 1;",
      "        println!(\"✓ Fast ingest batch #{}\", self.packet_count);",
      "        Ok(())",
      "    }",
      "}",
    ],
  },
];

export class CodeScreenTexture {
  public canvas: HTMLCanvasElement;
  public texture: THREE.CanvasTexture;
  private ctx: CanvasRenderingContext2D;

  private currentFileIndex: number = 0;
  private currentLineIdx: number = 0;
  private currentCharsTyped: number = 0;
  private isTyping: boolean = true;
  private cursorBlinkTimer: number = 0;
  private typeTimer: number = 0;
  private scrollOffset: number = 0;
  private terminalLogs: string[] = [
    '$ npm run build',
    '✓ Compiled TypeScript in 38ms',
    '✓ 0 syntax errors • 100% strict mode',
    '⚡ Hot Reload active • Ready for requests',
  ];
  private isDirty: boolean = true;

  constructor() {
    // 1024 x 680 for crisp Retina display text on the 3D laptop
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 680;
    this.ctx = this.canvas.getContext('2d')!;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.generateMipmaps = true;
    this.texture.minFilter = THREE.LinearMipmapLinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;

    this.render();
  }

  public get currentFile(): CodeFile {
    return CODE_FILES[this.currentFileIndex] || CODE_FILES[0];
  }

  public setFileById(id: string): void {
    const idx = CODE_FILES.findIndex((f) => f.id === id);
    if (idx !== -1) {
      this.currentFileIndex = idx;
      this.currentLineIdx = 0;
      this.currentCharsTyped = 0;
      this.scrollOffset = 0;
      this.terminalLogs = [
        `$ switch-context --stack=${id}`,
        `✓ Loaded ${this.currentFile.name}`,
        '⚡ Auto-typing & compiling...',
      ];
      this.isDirty = true;
      this.render();
    }
  }

  public triggerCompile(): void {
    this.terminalLogs = [
      `$ npm test && npm run build -- ${this.currentFile.name}`,
      '✓ Test Suites: 18 passed, 18 total',
      '✓ Bundle built: 42.4 KB gzip',
      '🚀 Deployment verification succeeded!',
    ];
    this.isDirty = true;
    this.render();
  }

  public update(delta: number): void {
    this.cursorBlinkTimer += delta * 3.5;
    this.typeTimer += delta;

    // Type code characters automatically on its own
    if (this.isTyping && this.typeTimer > 0.045) {
      this.typeTimer = 0;
      const file = this.currentFile;
      const targetLine = file.lines[this.currentLineIdx] ?? '';

      if (this.currentCharsTyped < targetLine.length) {
        // Fast keystrokes: type 1 to 3 characters per tick
        this.currentCharsTyped += Math.floor(Math.random() * 2) + 1;
        if (this.currentCharsTyped > targetLine.length) {
          this.currentCharsTyped = targetLine.length;
        }
        this.isDirty = true;
      } else {
        // Move to next line
        if (this.currentLineIdx < file.lines.length - 1) {
          this.currentLineIdx++;
          this.currentCharsTyped = 0;

          // Adjust scroll if lines exceed visible code window
          if (this.currentLineIdx > 12) {
            this.scrollOffset = (this.currentLineIdx - 12) * 28;
          }
          this.isDirty = true;
        } else {
          // Pause at end then loop or wait
          this.isTyping = false;
          setTimeout(() => {
            this.currentLineIdx = 0;
            this.currentCharsTyped = 0;
            this.scrollOffset = 0;
            this.isTyping = true;
          }, 3500);
        }
      }
    }

    if (this.isDirty || Math.floor(this.cursorBlinkTimer) % 2 === 0) {
      this.render();
      this.isDirty = false;
    }
  }

  public render(): void {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const file = this.currentFile;

    // 1. Editor Background (Modern Slate Navy #0B101E)
    ctx.fillStyle = '#090D1A';
    ctx.fillRect(0, 0, w, h);

    // 2. Window Titlebar with macOS buttons
    ctx.fillStyle = '#11172A';
    ctx.fillRect(0, 0, w, 56);

    // Mac Traffic Light Buttons
    ctx.fillStyle = '#FF5F56';
    ctx.beginPath();
    ctx.arc(32, 28, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFBD2E';
    ctx.beginPath();
    ctx.arc(58, 28, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#27C93F';
    ctx.beginPath();
    ctx.arc(84, 28, 8, 0, Math.PI * 2);
    ctx.fill();

    // Tabs Bar
    CODE_FILES.forEach((tab, index) => {
      const isSelected = index === this.currentFileIndex;
      const tabX = 120 + index * 180;
      const tabW = 170;

      if (isSelected) {
        ctx.fillStyle = '#090D1A';
        ctx.fillRect(tabX, 10, tabW, 46);
        ctx.fillStyle = '#38BDF8'; // Active tab indicator line
        ctx.fillRect(tabX, 10, tabW, 3);
      } else {
        ctx.fillStyle = '#11172A';
        ctx.fillRect(tabX, 10, tabW, 46);
      }

      ctx.fillStyle = isSelected ? '#F8FAFC' : '#94A3B8';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(`${tab.icon} ${tab.name}`, tabX + 16, 38);
    });

    // 3. Breadcrumbs Subheader
    ctx.fillStyle = '#0F1527';
    ctx.fillRect(0, 56, w, 36);

    ctx.fillStyle = '#64748B';
    ctx.font = '16px monospace';
    ctx.fillText(`src  ›  components  ›  ${file.name}  [Autonomous Coding Active]`, 28, 80);

    // 4. Line Numbers Gutter
    const codeAreaY = 92;
    const terminalH = 160;
    const codeAreaH = h - codeAreaY - terminalH - 32;

    ctx.fillStyle = '#0C1222';
    ctx.fillRect(0, codeAreaY, 72, codeAreaH);

    // 5. Code Body Area
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, codeAreaY, w, codeAreaH);
    ctx.clip();

    const startY = codeAreaY + 32 - this.scrollOffset;
    const lineHeight = 28;
    const isCursorOn = Math.sin(this.cursorBlinkTimer * 3) > 0;

    file.lines.forEach((lineText, idx) => {
      const y = startY + idx * lineHeight;
      if (y < codeAreaY - 20 || y > codeAreaY + codeAreaH + 20) return;

      const isCurrentLine = idx === this.currentLineIdx;

      // Highlight active typing line
      if (isCurrentLine) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.fillRect(72, y - 22, w - 72, lineHeight);
      }

      // Line number
      ctx.fillStyle = isCurrentLine ? '#38BDF8' : '#475569';
      ctx.font = '17px monospace';
      ctx.fillText(`${idx + 1}`.padStart(3, ' '), 18, y);

      // What text to show
      let displayLine = lineText;
      if (idx > this.currentLineIdx) {
        displayLine = '';
      } else if (idx === this.currentLineIdx) {
        displayLine = lineText.slice(0, this.currentCharsTyped);
      }

      // Syntax highlight
      this.drawSyntaxLine(ctx, displayLine, 92, y);

      // Blinking typing cursor
      if (isCurrentLine && isCursorOn) {
        const textWidth = ctx.measureText(displayLine).width;
        ctx.fillStyle = '#38BDF8';
        ctx.fillRect(92 + textWidth + 2, y - 18, 9, 22);
      }
    });

    ctx.restore();

    // 6. Integrated Terminal Console Drawer
    const termY = h - terminalH - 34;
    ctx.fillStyle = '#05070E';
    ctx.fillRect(0, termY, w, terminalH);

    // Terminal header
    ctx.fillStyle = '#0D1424';
    ctx.fillRect(0, termY, w, 32);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('💻 TERMINAL — zsh (vite hot-reload active)', 24, termY + 22);

    ctx.fillStyle = '#22C55E';
    ctx.font = '15px monospace';
    ctx.fillText('● RUNNING', w - 120, termY + 22);

    // Terminal log lines
    this.terminalLogs.forEach((log, lIdx) => {
      ctx.fillStyle = log.startsWith('✓') ? '#4ADE80' : log.startsWith('🚀') ? '#FBBF24' : '#94A3B8';
      ctx.font = '15px monospace';
      ctx.fillText(log, 24, termY + 60 + lIdx * 24);
    });

    // 7. Status Bar (VS Code Blue)
    ctx.fillStyle = '#1D4ED8';
    ctx.fillRect(0, h - 34, w, 34);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('⚡ main*', 24, h - 11);
    ctx.fillText('✓ TypeScript 5.7', 140, h - 11);
    ctx.fillText('✓ Prettier', 310, h - 11);
    ctx.fillText('UTF-8', w - 100, h - 11);
    ctx.fillText(file.lang, w - 280, h - 11);

    this.texture.needsUpdate = true;
  }

  private drawSyntaxLine(ctx: CanvasRenderingContext2D, line: string, x: number, y: number): void {
    if (!line) return;

    if (line.trim().startsWith('//')) {
      ctx.fillStyle = '#64748B';
      ctx.fillText(line, x, y);
      return;
    }

    const tokens = line.split(/(\s+|[(),={}[\]:;<>*]|['"].*?['"])/);
    let curX = x;

    const keywords = [
      'import', 'from', 'export', 'const', 'let', 'var', 'function', 'return',
      'await', 'async', 'interface', 'type', 'pub', 'struct', 'impl', 'use', 'fn',
    ];
    const types = [
      'React', 'FC', 'useState', 'useEffect', 'AnimatePresence', 'Request', 'Response',
      'GoogleGenAI', 'Arc', 'RwLock', 'Result', 'Error', 'DataStream',
    ];

    tokens.forEach((token) => {
      if (!token) return;

      if (keywords.includes(token)) {
        ctx.fillStyle = '#F43F5E'; // Pink-red keywords
      } else if (types.includes(token)) {
        ctx.fillStyle = '#38BDF8'; // Sky blue types
      } else if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
        ctx.fillStyle = '#34D399'; // Emerald strings
      } else if (/^\d+$/.test(token)) {
        ctx.fillStyle = '#FBBF24'; // Amber numbers
      } else if (token.startsWith('<') || token.endsWith('>')) {
        ctx.fillStyle = '#A78BFA'; // Purple JSX
      } else {
        ctx.fillStyle = '#F1F5F9'; // Light slate text
      }

      ctx.fillText(token, curX, y);
      curX += ctx.measureText(token).width;
    });
  }

  public dispose(): void {
    this.texture.dispose();
  }
}






// 'use client';

// import { useEffect, useRef } from 'react';
// import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';
// import { useTerminalStore } from '@/stores/useTerminalStore'; // Import the store
// import 'xterm/css/xterm.css';

// export default function TerminalPanel() {
//   const terminalRef = useRef<HTMLDivElement>(null);
//   const xtermRef = useRef<Terminal | null>(null);
  
//   // Connect to our global log store
//   const logs = useTerminalStore((state) => state.output);

//   useEffect(() => {
//     if (!terminalRef.current) return;

//     // 1. Initialize Xterm
//     const term = new Terminal({
//       cursorBlink: true,
//       fontFamily: '"JetBrains Mono", monospace',
//       fontSize: 14,
//       theme: {
//         background: '#0a0a0a',
//         foreground: '#00ff00',
//         cursor: '#ffffff',
//         selectionBackground: 'rgba(0, 255, 0, 0.3)',
//       },
//     });

//     const fitAddon = new FitAddon();
//     term.loadAddon(fitAddon);

//     term.open(terminalRef.current);
//     fitAddon.fit();
//     xtermRef.current = term;

//     // 2. Initial Welcome Message
//     term.writeln('\x1b[1;32m➜ SYSTEM ONLINE. INITIALIZING AI CORE...\x1b[0m');

//     // 3. Handle Resize
//     const handleResize = () => fitAddon.fit();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       term.dispose();
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // 4. THE CRITICAL FIX: Sync Logs to Terminal
//   // Whenever 'logs' change in the store, write the NEW ones to Xterm
//   useEffect(() => {
//     const term = xtermRef.current;
//     if (!term) return;

//     // Simple diffing: only write logs we haven't shown yet?
//     // Actually, Xterm is a stream. Let's just clear and rewrite for simplicity in React,
//     // OR better: Just write the last log if it's new.
//     // For this specific bug, let's just write the latest log.
    
//     if (logs.length > 0) {
//         const lastLog = logs[logs.length - 1];
//         // Prevent writing the default message twice
//         if (lastLog !== '> System Ready...') {
//             term.writeln(lastLog);
//         }
//     }
//   }, [logs]);

//   return (
//     <div className="h-full w-full bg-[#0a0a0a] p-2 overflow-hidden">
//       <div ref={terminalRef} className="h-full w-full" />
//     </div>
//   );
// }



























'use client';

import { useEffect, useRef } from 'react';
import { useTerminalStore } from '@/stores/useTerminalStore';
import 'xterm/css/xterm.css'; // 1. FIX: Import styles

// We keep this outside to prevent re-creation, but managing it via ref inside is safer usually.
// For now, we'll keep your pattern but type it safely.
export const fitAddonRef = { current: null as any };

export default function TerminalPanel() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<any>(null);
  const logs = useTerminalStore((state) => state.output);
  
  // Ref to track if we already initialized to prevent double-mounts in Strict Mode
  const initialized = useRef(false);

  useEffect(() => {
    // 2. FIX: Prevent double initialization in React Strict Mode
    if (initialized.current) return;
    initialized.current = true;

    let term: any;
    let fitAddon: any;
    let resizeListener: () => void;

    async function load() {
      // Dynamic imports to avoid SSR issues
      const { Terminal } = await import('xterm');
      const { FitAddon } = await import('xterm-addon-fit');

      // Double check ref exists after await (component might have unmounted)
      if (!terminalRef.current) return;

      term = new Terminal({
        cursorBlink: true,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 13,
        lineHeight: 1.25,
        theme: {
          background: '#00000000', // Transparent
          foreground: '#d1ffd1',
          cursor: '#8fff8f',
          selectionBackground: 'rgba(0,255,120,0.3)',
        },
      });

      fitAddon = new FitAddon();
      fitAddonRef.current = fitAddon;

      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();
      xtermRef.current = term;

      term.writeln('\x1b[1;32m> SYSTEM ONLINE\x1b[0m'); // Colored startup message

      resizeListener = () => fitAddon.fit();
      window.addEventListener('resize', resizeListener);
    }

    load();

    // 3. FIX: Correct Cleanup placement
    // This return MUST be at the top level of useEffect, not inside async load
    return () => {
      if (resizeListener) window.removeEventListener('resize', resizeListener);
      if (term) term.dispose();
      initialized.current = false; // Reset for HMR
    };
  }, []);

  // Sync logs
  useEffect(() => {
    const term = xtermRef.current;
    if (!term || logs.length === 0) return;
    
    // Write only the latest log line
    // Ensure we handle incoming text correctly
    const latestLog = logs[logs.length - 1];
    if (typeof latestLog === 'string') {
        term.writeln(latestLog);
    }
  }, [logs]);

  return (
    <div className="h-full w-full relative overflow-hidden rounded-lg border border-white/10 bg-black/40 backdrop-blur-xl">
      {/* Cool Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-400 blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 blur-3xl opacity-10" />
      </div>

      <div ref={terminalRef} className="h-full w-full px-2 py-1 overflow-hidden font-mono" />
    </div>
  );
}
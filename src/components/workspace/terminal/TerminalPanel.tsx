// 'use client';

// import { useEffect, useRef } from 'react';
// import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';
// import 'xterm/css/xterm.css';

// export default function TerminalPanel() {
//   const terminalRef = useRef<HTMLDivElement>(null);
//   const xtermInstance = useRef<Terminal | null>(null);

//   useEffect(() => {
//     if (!terminalRef.current) return;

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
//     xtermInstance.current = term;

//     term.writeln('\x1b[1;32m➜ SYSTEM ONLINE. INITIALIZING AI CORE...\x1b[0m');
//     term.writeln('  waiting for input...');

//     return () => {
//       term.dispose();
//     };
//   }, []);

//   return (
//     <div className="h-full w-full bg-[#0a0a0a] p-2 overflow-hidden flex flex-col">
//       <div ref={terminalRef} className="h-full w-full" />
//     </div>
//   );
// }






'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useTerminalStore } from '@/stores/useTerminalStore'; // Import the store
import 'xterm/css/xterm.css';

export default function TerminalPanel() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  
  // Connect to our global log store
  const logs = useTerminalStore((state) => state.output);

  useEffect(() => {
    if (!terminalRef.current) return;

    // 1. Initialize Xterm
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 14,
      theme: {
        background: '#0a0a0a',
        foreground: '#00ff00',
        cursor: '#ffffff',
        selectionBackground: 'rgba(0, 255, 0, 0.3)',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = term;

    // 2. Initial Welcome Message
    term.writeln('\x1b[1;32m➜ SYSTEM ONLINE. INITIALIZING AI CORE...\x1b[0m');

    // 3. Handle Resize
    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      term.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 4. THE CRITICAL FIX: Sync Logs to Terminal
  // Whenever 'logs' change in the store, write the NEW ones to Xterm
  useEffect(() => {
    const term = xtermRef.current;
    if (!term) return;

    // Simple diffing: only write logs we haven't shown yet?
    // Actually, Xterm is a stream. Let's just clear and rewrite for simplicity in React,
    // OR better: Just write the last log if it's new.
    // For this specific bug, let's just write the latest log.
    
    if (logs.length > 0) {
        const lastLog = logs[logs.length - 1];
        // Prevent writing the default message twice
        if (lastLog !== '> System Ready...') {
            term.writeln(lastLog);
        }
    }
  }, [logs]);

  return (
    <div className="h-full w-full bg-[#0a0a0a] p-2 overflow-hidden">
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  );
}
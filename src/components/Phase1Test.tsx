
'use client';

import { useState } from 'react';
import { getWebContainerInstance } from '@/lib/webcontainer/instance';
import { useTerminalStore } from '@/stores/useTerminalStore';

export default function Phase1Test() {
  const [loading, setLoading] = useState(false);
  const { addLog, output } = useTerminalStore();

  const startEngine = async () => {
    setLoading(true);
    addLog('🚀 Initiating Boot Sequence...');

    try {
      const webcontainer = await getWebContainerInstance();
      addLog('✅ WebContainer Instance Acquired.');

      addLog('⚡ Running command: "npm -v"');
      const process = await webcontainer.spawn('npm', ['-v']);

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            addLog(`[Term]: ${data}`);
          },
        })
      );

      const exitCode = await process.exit;
      addLog(`🏁 Command finished with exit code: ${exitCode}`);

    } catch (error) {
      addLog(`❌ Fatal Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-400">Phase 1: Engine Test</h2>
        <button
          onClick={startEngine}
          disabled={loading}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-mono disabled:opacity-50"
        >
          {loading ? 'Booting...' : 'START ENGINE'}
        </button>
      </div>

      <div className="bg-black border border-green-900 p-4 h-64 overflow-y-auto rounded-lg font-mono text-sm text-green-500 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

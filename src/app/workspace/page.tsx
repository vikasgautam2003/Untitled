










// 'use client';

// import { useState } from 'react';
// import { useTerminalStore } from '@/stores/useTerminalStore';
// import { getWebContainerInstance } from '@/lib/webcontainer/instance';
// import { mountFiles } from '@/lib/webcontainer/mount';
// import { model } from '@/lib/ai/model';
// import { getSystemPrompt } from '@/lib/ai/prompts';
// import { HumanMessage } from "@langchain/core/messages";
// import { jsonrepair } from 'jsonrepair';
// import dynamic from 'next/dynamic';

// const TerminalPanel = dynamic(
//   () => import('@/components/workspace/terminal/TerminalPanel'),
//   { ssr: false }
// );

// export default function WorkspacePage() {
//   const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  
//   const { addLog } = useTerminalStore();

//   const handleGenerate = async () => {
//     setIsGenerating(true);
//     setActiveTab('editor');
//     addLog('🧠 SYSTEM: Initializing AI Protocol...');

//     try {
//       addLog('📡 CONNECTING: Contacting Gemini 1.5 Flash...');
//       const userPrompt = "Build a simple Hello World page with a red button.";
      
//       const messages = [
//         getSystemPrompt('typescript'),
//         new HumanMessage(userPrompt)
//       ];

//       const response = await model.invoke(messages);
//       const rawContent = response.content as string;
//       addLog('⚡ DATA RECEIVED: Parsing Neural Network Output...');

//       let cleanJson = rawContent;
      
//       if (rawContent.includes('```json')) {
//         cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '');
//       } else if (rawContent.includes('```')) {
//         cleanJson = rawContent.replace(/```/g, '');
//       }

//       const firstBrace = cleanJson.indexOf('{');
//       const lastBrace = cleanJson.lastIndexOf('}');
      
//       if (firstBrace !== -1 && lastBrace !== -1) {
//         cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
//       } else {
//         throw new Error("No JSON object found in AI response.");
//       }

//       let fileTree;
//       try {
//         fileTree = JSON.parse(cleanJson);
//         addLog('✅ PARSE SUCCESS: Standard JSON is valid.');
//       } catch (e) {
//         addLog('⚠️ WARNING: JSON Syntax Error detected. Engaging Auto-Repair...');
//         try {
//           const repairedJson = jsonrepair(cleanJson);
//           fileTree = JSON.parse(repairedJson);
//           addLog('✅ REPAIR SUCCESSFUL: Structure recovered.');
//         } catch (repairError) {
//           console.error("Original JSON:", cleanJson);
//           throw new Error("CRITICAL: JSON is too broken to repair.");
//         }
//       }

//       addLog('💾 FILESYSTEM: Writing files to virtual memory...');
//       await mountFiles(fileTree);
//       addLog('✅ FILESYSTEM: Write Complete.');

//       await startDevServer();

//     } catch (error: any) {
//       addLog(`❌ FATAL ERROR: ${error.message || error}`);
//       console.error(error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // const startDevServer = async () => {
//   //   const instance = await getWebContainerInstance();
    
//   //   addLog('📦 PACKAGE MANAGER: Installing dependencies (this may take 30s)...');
    
//   //   const installProcess = await instance.spawn('npm', ['install']);
//   //   installProcess.output.pipeTo(new WritableStream({
//   //     write(data) { addLog(`[npm]: ${data}`); }
//   //   }));

//   //   const installExitCode = await installProcess.exit;
//   //   if (installExitCode !== 0) {
//   //     addLog('❌ INSTALL FAILED: Dependency error.');
//   //     return;
//   //   }
//   //   addLog('✅ INSTALL COMPLETE.');

//   //   addLog('🚀 LAUNCHER: Starting Next.js Dev Server...');
//   //   const devProcess = await instance.spawn('npm', ['run', 'dev']);

//   //   devProcess.output.pipeTo(new WritableStream({
//   //     write(data) { addLog(`[Server]: ${data}`); }
//   //   }));

//   //   instance.on('server-ready', (port, url) => {
//   //     addLog(`🌐 SERVER ONLINE: App running at ${url}`);
//   //     setIframeUrl(url);
//   //     setActiveTab('preview');
//   //   });
//   // };


//    const startDevServer = async () => {
//   const instance = await getWebContainerInstance();
  
//   addLog('📦 PACKAGE MANAGER: Installing dependencies...');
//   addLog('ℹ️ TIP: This runs faster because we disabled the progress bar.');
  
//   const installProcess = await instance.spawn('npm', [
//     'install', 
//     '--no-audit', 
//     '--no-fund', 
//     '--no-progress', 
//     '--loglevel=error'
//   ]);

//   installProcess.output.pipeTo(new WritableStream({
//     write(data) { 
//       if (!['|', '/', '-', '\\'].includes(data.trim())) {
//         addLog(`[npm]: ${data}`); 
//       }
//     }
//   }));

//   const installExitCode = await installProcess.exit;
//   if (installExitCode !== 0) {
//     addLog('❌ INSTALL FAILED: Dependency error. Check logs above.');
//     return;
//   }
//   addLog('✅ INSTALL COMPLETE.');

//   addLog('🚀 LAUNCHER: Starting Next.js Dev Server...');
//   const devProcess = await instance.spawn('npm', ['run', 'dev']);

//   devProcess.output.pipeTo(new WritableStream({
//     write(data) { addLog(`[Server]: ${data}`); }
//   }));

//   instance.on('server-ready', (port, url) => {
//     addLog(`🌐 SERVER ONLINE: App running at ${url}`);
//     setIframeUrl(url);
//     setActiveTab('preview');
//   });
// };





//   return (
//     <div className="flex h-screen w-full bg-neutral-950 text-white font-sans overflow-hidden">
//       <aside className="w-[350px] lg:w-[400px] border-r border-neutral-800 bg-neutral-900/50 flex flex-col">
//         <div className="p-4 border-b border-neutral-800 font-mono text-xs text-green-500 tracking-widest">
//            // AI_NEURAL_LINK
//         </div>
        
//         <div className="flex-1 p-4 flex flex-col gap-4">
//           <div className="bg-neutral-900 p-4 rounded text-sm text-neutral-400">
//             Current Objective: <br/>
//             <span className="text-white">"Build a simple Hello World page with a red button."</span>
//           </div>

//           <button 
//             onClick={handleGenerate}
//             disabled={isGenerating}
//             className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-mono text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {isGenerating ? (
//               <>
//                 <span className="animate-spin">⚙️</span> PROCESSING...
//               </>
//             ) : (
//               <>⚡ GENERATE APP</>
//             )}
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col min-w-0">
//         <div className="h-10 border-b border-neutral-800 bg-neutral-950 flex items-center px-4 gap-4">
//           <button 
//             onClick={() => setActiveTab('editor')}
//             className={`text-xs font-mono px-3 py-1 rounded transition-colors ${activeTab === 'editor' ? 'bg-green-900/20 text-green-400 border border-green-900' : 'text-neutral-500 hover:text-neutral-300'}`}
//           >
//             CODE_EDITOR
//           </button>
//           <button 
//              onClick={() => setActiveTab('preview')}
//              className={`text-xs font-mono px-3 py-1 rounded transition-colors ${activeTab === 'preview' ? 'bg-blue-900/20 text-blue-400 border border-blue-900' : 'text-neutral-500 hover:text-neutral-300'}`}
//           >
//             LIVE_PREVIEW
//           </button>
//         </div>

//         <div className="flex-1 bg-[#1e1e1e] relative">
//           {activeTab === 'editor' ? (
//              <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-mono text-sm">
//                [Editor View - Files are in Memory] <br/>
//                (Visual Editor coming in Phase 4)
//              </div>
//           ) : (
//             <div className="absolute inset-0 bg-white">
//               {iframeUrl ? (
//                 <iframe src={iframeUrl} className="w-full h-full border-none" />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-black font-mono">
//                   [Waiting for Server Start...]
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="h-64 border-t border-neutral-800 flex flex-col">
//            <div className="px-4 py-1 bg-neutral-900 border-b border-neutral-800 text-[10px] text-neutral-400 font-mono flex justify-between items-center">
//              <span>TERMINAL STREAM</span>
//              <span className="text-green-500">● {iframeUrl ? 'Live' : 'Idle'}</span>
//            </div>
//            <div className="flex-1 bg-black overflow-hidden relative">
//              <TerminalPanel />
//            </div>
//         </div>

//       </main>
//     </div>
//   );
// }









'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTerminalStore } from '@/stores/useTerminalStore';
import { getWebContainerInstance } from '@/lib/webcontainer/instance';
import { mountFiles } from '@/lib/webcontainer/mount';
import { model } from '@/lib/ai/model';
import { groqModel } from '@/lib/ai/groq';
import { getSystemPrompt } from '@/lib/ai/prompts';
import { HumanMessage } from "@langchain/core/messages";
import { jsonrepair } from 'jsonrepair';

const TerminalPanel = dynamic(
  () => import('@/components/workspace/terminal/TerminalPanel'),
  { ssr: false }
);

const BACKUP_FILES = {
  "package.json": JSON.stringify({
    name: "backup-app",
    scripts: { dev: "next dev", build: "next build", start: "next start" },
    dependencies: { 
      "next": "14.2.3", 
      "react": "18.3.1", 
      "react-dom": "18.3.1",
      "lucide-react": "latest"
    }
  }, null, 2),
  "next.config.mjs": "/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nexport default nextConfig;",
  ".babelrc": "{\n  \"presets\": [\"next/babel\"]\n}",
  "src/app/layout.tsx": "export default function RootLayout({ children }) { return <html lang='en'><body>{children}</body></html> }",
  "src/app/page.tsx": "export default function Page() { return <div style={{padding: 50, fontFamily: 'sans-serif'}}><h1>⚠️ AI Generation Failed</h1><p>But the System Auto-Healed! Here is a fallback app.</p></div> }"
};

async function fixJsonWithGroq(brokenJson: string) {
  const prompt = `
    You are an expert JSON repair agent. 
    The following JSON string is broken.
    YOUR JOB:
    1. Fix the syntax errors.
    2. Remove any markdown or conversational text.
    3. Return ONLY the valid, parsable JSON string.
    
    BROKEN JSON:
    ${brokenJson}
  `;

  const response = await groqModel.invoke([new HumanMessage(prompt)]);
  let fixed = response.content as string;
  
  if (fixed.includes('```json')) {
    fixed = fixed.replace(/```json/g, '').replace(/```/g, '');
  } else if (fixed.includes('```')) {
    fixed = fixed.replace(/```/g, '');
  }
  
  return fixed;
}

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isGenerating, setIsGenerating] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  
  const { addLog } = useTerminalStore();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setActiveTab('editor'); 
    addLog('🧠 SYSTEM: Initializing AI Protocol...');

    try {
      addLog('📡 CONNECTING: Contacting Gemini 2.5 Flash...');
      const userPrompt = "Build a simple Next.js landing page for a Cyberpunk Coffee Shop. Use Tailwind CSS. Make it look dark and neon.";
      
      const messages = [
        getSystemPrompt('typescript'),
        new HumanMessage(userPrompt)
      ];

      const response = await model.invoke(messages);
      const rawContent = response.content as string;
      addLog('⚡ DATA RECEIVED: Parsing Neural Network Output...');

      let cleanJson = rawContent;
      
      if (rawContent.includes('```json')) {
        cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '');
      } else if (rawContent.includes('```')) {
        cleanJson = rawContent.replace(/```/g, '');
      }

      const firstBrace = cleanJson.indexOf('{');
      const lastBrace = cleanJson.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
      } else {
        throw new Error("No JSON object found in AI response.");
      }

      let fileTree;
      try {
        fileTree = JSON.parse(cleanJson);
        addLog('✅ PARSE SUCCESS: Standard JSON is valid.');
      } catch (e) {
        addLog('⚠️ WARNING: Syntax Error. Attempting fast repair...');
        
        try {
            const repairedJson = jsonrepair(cleanJson);
            fileTree = JSON.parse(repairedJson);
            addLog('✅ REPAIR SUCCESS: Fixed with heuristics.');
        } catch (repairError) {
            addLog('🚨 HEURISTIC FAILED. Activating Groq Llama 3 for surgical repair...');
            try {
               const fixedJson = await fixJsonWithGroq(cleanJson);
               fileTree = JSON.parse(fixedJson);
               addLog('✅ GROQ SUCCESS: Llama 3 reconstructed the JSON.');
            } catch (groqError) {
               addLog('❌ CRITICAL FAILURE: Even Groq could not fix it.');
               addLog('🛡️ ENGAGING FALLBACK PROTOCOL...');
               fileTree = BACKUP_FILES;
            }
        }
      }

      fileTree['.babelrc'] = JSON.stringify({
          "presets": ["next/babel"]
        });

        try {
          let pkg;
          const pkgData = fileTree['package.json'];

          if (typeof pkgData === 'object' && pkgData !== null) {
            pkg = pkgData;
          } else if (typeof pkgData === 'string') {
            pkg = JSON.parse(pkgData);
          } else {
            throw new Error("package.json is missing or invalid type");
          }

          pkg.dependencies = pkg.dependencies || {};
          pkg.dependencies['@babel/runtime'] = 'latest';
          pkg.dependencies['@babel/plugin-transform-runtime'] = 'latest';

          fileTree['package.json'] = JSON.stringify(pkg, null, 2);

          addLog('🛡️ SYSTEM: Injected Babel dependencies for stability.');
        } catch (e) {
          console.error("Failed to patch package.json", e);
          addLog(`⚠️ PATCH FAILED: Could not update package.json - ${e}`);
        }



        const layoutPath = 'src/app/layout.tsx';
      
  
      if (fileTree[layoutPath] && fileTree[layoutPath].includes('next/font')) {
        addLog('⚠️ DETECTED BANNED FONT IMPORT. Sanitizing layout.tsx...');
        
                       
          fileTree[layoutPath] = `
                import './globals.css';

                export const metadata = {
                  title: 'Generated App',
                  description: 'Created with AI',
                };

                export default function RootLayout({
                  children,
                }: {
                  children: React.ReactNode;
                }) {
                  return (
                    <html lang="en">
                      <body>{children}</body>
                    </html>
                  );
                }
        `.trim();
        addLog('✅ SANITIZATION COMPLETE: Replaced layout with safe version.');
      }


      addLog('💾 FILESYSTEM: Writing files to virtual memory...');
      await mountFiles(fileTree);
      addLog('✅ FILESYSTEM: Write Complete.');

      await startDevServer();

    } catch (error: any) {
      addLog(`❌ FATAL ERROR: ${error.message || error}`);
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // const startDevServer = async () => {
  //   const instance = await getWebContainerInstance();
    
  //   addLog('📦 PACKAGE MANAGER: Installing dependencies...');
    
  //   const installProcess = await instance.spawn('npm', [
  //     'install', 
  //     '--no-audit', 
  //     '--no-fund', 
  //     '--no-progress', 
  //     '--loglevel=error'
  //   ]);

  //   installProcess.output.pipeTo(new WritableStream({
  //     write(data) { 
  //       if (!['|', '/', '-', '\\'].includes(data.trim())) {
  //          addLog(`[npm]: ${data}`); 
  //       }
  //     }
  //   }));

  //   const installExitCode = await installProcess.exit;
  //   if (installExitCode !== 0) {
  //     addLog('❌ INSTALL FAILED: Dependency error. Check logs above.');
  //     return;
  //   }
  //   addLog('✅ INSTALL COMPLETE.');

  //   addLog('🚀 LAUNCHER: Starting Next.js Dev Server...');
  //   const devProcess = await instance.spawn('npm', ['run', 'dev']);

  //   devProcess.output.pipeTo(new WritableStream({
  //     write(data) { addLog(`[Server]: ${data}`); }
  //   }));

  //   instance.on('server-ready', (port, url) => {
  //     addLog(`🌐 SERVER ONLINE: App running at ${url}`);
  //     setIframeUrl(url);
  //     setActiveTab('preview');
  //   });
  // };


const startDevServer = async () => {
    const instance = await getWebContainerInstance();
    
    addLog('📦 PACKAGE MANAGER: Installing dependencies...');
    
    const installProcess = await instance.spawn('npm', [
      'install', 
      '--no-optional',
      '--no-audit', 
      '--prefer-offline',
      '--no-fund', 
      '--no-progress', 
      '--loglevel=error'
    ]);

    installProcess.output.pipeTo(new WritableStream({
      write(data) { 
        if (!['|', '/', '-', '\\'].includes(data.trim())) {
           addLog(`[npm]: ${data}`); 
        }
      }
    }));

    const installExitCode = await installProcess.exit;
    if (installExitCode !== 0) {
      addLog('❌ INSTALL FAILED: Dependency error. Check logs above.');
      return;
    }
    addLog('✅ INSTALL COMPLETE.');

    addLog('🚀 LAUNCHER: Starting Next.js Dev Server...');
    const devProcess = await instance.spawn('npm', ['run', 'dev']);

    devProcess.output.pipeTo(new WritableStream({
      write(data) { addLog(`[Server]: ${data}`); }
    }));

    instance.on('server-ready', (port, url) => {
      addLog(`🌐 SERVER ONLINE: App running at ${url}`);
      setIframeUrl(url);
      setActiveTab('preview');
    });
  };



  return (
    <div className="flex h-screen w-full bg-neutral-950 text-white font-sans overflow-hidden">
      <aside className="w-[350px] lg:w-[400px] border-r border-neutral-800 bg-neutral-900/50 flex flex-col">
        <div className="p-4 border-b border-neutral-800 font-mono text-xs text-green-500 tracking-widest">
           // AI_NEURAL_LINK
        </div>
        
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="bg-neutral-900 p-4 rounded text-sm text-neutral-400">
            Current Objective: <br/>
            <span className="text-white">"Build a Cyberpunk Coffee Shop Landing Page"</span>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-mono text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="animate-spin">⚙️</span> PROCESSING...
              </>
            ) : (
              <>⚡ GENERATE APP</>
            )}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <div className="h-10 border-b border-neutral-800 bg-neutral-950 flex items-center px-4 gap-4">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`text-xs font-mono px-3 py-1 rounded transition-colors ${activeTab === 'editor' ? 'bg-green-900/20 text-green-400 border border-green-900' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            CODE_EDITOR
          </button>
          <button 
             onClick={() => setActiveTab('preview')}
             className={`text-xs font-mono px-3 py-1 rounded transition-colors ${activeTab === 'preview' ? 'bg-blue-900/20 text-blue-400 border border-blue-900' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            LIVE_PREVIEW
          </button>
        </div>

        <div className="flex-1 bg-[#1e1e1e] relative">
          {activeTab === 'editor' ? (
             <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-mono text-sm">
               [Editor View - Files are in Memory] <br/>
               (Visual Editor coming in Phase 4)
             </div>
          ) : (
            <div className="absolute inset-0 bg-white">
              {iframeUrl ? (
                <iframe src={iframeUrl} className="w-full h-full border-none" />
              ) : (
                <div className="flex items-center justify-center h-full text-black font-mono">
                  [Waiting for Server Start...]
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-100 border-t border-neutral-800 flex flex-col">
           <div className="px-4 py-1 bg-neutral-900 border-b border-neutral-800 text-[10px] text-neutral-400 font-mono flex justify-between items-center">
             <span>TERMINAL STREAM</span>
             <span className="text-green-500">● {iframeUrl ? 'Live' : 'Idle'}</span>
           </div>
           <div className="flex-1 bg-black overflow-hidden relative">
             <TerminalPanel />
           </div>
        </div>
      </main>
    </div>
  );
}
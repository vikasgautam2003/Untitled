// import { useState, useCallback } from 'react';
// import { useTerminalStore } from '@/stores/useTerminalStore';
// import { useFileStore } from '@/stores/useFileStore';
// import { getWebContainerInstance } from '@/lib/webcontainer/instance';
// import { mountFiles, parseJsonToTree } from '@/lib/webcontainer/mount';
// import { model } from '@/lib/ai/model';
// import { getSystemPrompt } from '@/lib/ai/prompts';
// import { HumanMessage } from "@langchain/core/messages";
// import { applySafetyOverrides } from '@/lib/webcontainer/safety';
// import { robustParse } from '@/lib/ai/parser';

// export function useWorkspace() {
//   const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [iframeUrl, setIframeUrl] = useState<string | null>(null);
//   const { addLog } = useTerminalStore();

//   const startDevServer = useCallback(async () => {
//   const instance = await getWebContainerInstance();
//   let shouldInstall = true;

//   try {
//     await instance.fs.readdir('node_modules');
//     shouldInstall = false;
//     addLog('speed mode: node_modules detected, skipping install');
//   } catch (_) {
//     shouldInstall = true;
//   }

//   if (shouldInstall) {
//     addLog('installing...');
//     const installProcess = await instance.spawn('npm', [
//       'install',
//       '--no-optional',
//       '--prefer-offline',
//       '--no-audit',
//       '--no-progress',
//       '--no-fund'
//     ]);

//     let logged = false;

//     installProcess.output.pipeTo(
//       new WritableStream({
//         write() {
//           if (!logged) {
//             logged = true;
//             addLog('installing...');
//           }
//         }
//       })
//     );

//     const installExit = await installProcess.exit;
//     if (installExit !== 0) {
//       addLog('install failed');
//       return;
//     }

//     addLog('install complete');
//   }

//   addLog('starting next.js dev server...');
//   const devProcess = await instance.spawn('npm', ['run', 'dev']);

//   devProcess.output.pipeTo(
//     new WritableStream({
//       write(data) {
//         addLog(`[server]: ${data}`);
//       }
//     })
//   );

//   instance.on('server-ready', (port, url) => {
//     setIframeUrl(url);
//     setActiveTab('preview');
//     addLog(`server online: ${url}`);
//   });
// }, [addLog]);


//   const handleGenerate = useCallback(async () => {
//     setIsGenerating(true);
//     setActiveTab('editor');
//     addLog('Initializing AI...');

//     try {
//       const structurePrompt = `
//         Generate ONLY configuration files for Next.js 14 App Router.
//         REQUIRED: package.json, next.config.mjs, postcss.config.js, tailwind.config.ts, .babelrc, tsconfig.json.
//         Return valid JSON key-value pairs.
//       `;
//       const res1 = await model.invoke([getSystemPrompt('typescript'), new HumanMessage(structurePrompt)]);
//       const structureTree = await robustParse(res1.content as string, 'Phase 1', addLog);

//       const appPrompt = `
//         Generate ONLY application source code for: "Build a Cyberpunk Coffee Shop Landing Page."
        
//         RETURN ONLY:
//         - src/app/page.tsx (The Landing Page)
//         - src/app/layout.tsx (Root Layout)
//         - src/app/globals.css (Tailwind CSS)
        
//         IMPORTANT:
//         - Do NOT regenerate config files.
//         - Return valid JSON key-value pairs.
//         - Keep the code concise to avoid token limits.
//       `;
//       const res2 = await model.invoke([getSystemPrompt('typescript'), new HumanMessage(appPrompt)]);
//       const appTree = await robustParse(res2.content as string, 'Phase 2', addLog);

//       const fullTree = { ...structureTree, ...appTree };
//       applySafetyOverrides(fullTree, addLog);

//       addLog('Writing files...');
//       await mountFiles(fullTree);
//       useFileStore.getState().setFileTree(parseJsonToTree(fullTree));
//       addLog('Write complete.');

//       await startDevServer();
//     } catch (err: any) {
//       addLog(`ERROR: ${err.message || err}`);
//       console.error(err);
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [addLog, startDevServer]);

//   return {
//     activeTab,
//     setActiveTab,
//     isGenerating,
//     iframeUrl,
//     handleGenerate
//   };
// }













import { useState, useCallback } from 'react';
import { useTerminalStore } from '@/stores/useTerminalStore';
import { useFileStore } from '@/stores/useFileStore';
import { getWebContainerInstance } from '@/lib/webcontainer/instance';
import { mountFiles, parseJsonToTree } from '@/lib/webcontainer/mount';
import { model } from '@/lib/ai/model';
import { getSystemPrompt } from '@/lib/ai/prompts';
import { HumanMessage } from "@langchain/core/messages";
import { applySafetyOverrides } from '@/lib/webcontainer/safety';
import { robustParse } from '@/lib/ai/parser';

export function useWorkspace() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isGenerating, setIsGenerating] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const { addLog } = useTerminalStore();

  const startDevServer = useCallback(async () => {
    const instance = await getWebContainerInstance();
    
    // 1. CHECK CACHE
    let shouldInstall = true;
    try {
      await instance.fs.readdir('node_modules');
      shouldInstall = false;
      addLog('⚡ SPEED MODE: "node_modules" detected. Skipping install.');
    } catch (_) {
      shouldInstall = true;
    }

    // 2. INSTALL
    if (shouldInstall) {
      addLog('📦 PACKAGE MANAGER: Installing dependencies...');
      
      // FIX: Rely on CLI flags + .npmrc (No ENV vars needed)
      const installProcess = await instance.spawn('npm', [
        'install', 
        '--no-optional',   // <--- Stops SWC download attempt
        '--prefer-offline', // <--- Speeds up install
        '--no-audit',
        '--no-progress',
        '--no-fund',
        '--ignore-scripts'
      ]);

      // Log Silencer: Hides known SWC warnings from the UI
      installProcess.output.pipeTo(new WritableStream({
        write(data) { 
          const ignored = [
            '|', '/', '-', '\\',          // Spinner
            'swc',                        // SWC binary warnings
            'bad platform',               // Platform mismatch warnings
            'skipping optional',          // "Skipping optional dependency" logs
          ];
          if (!ignored.some(i => data.toLowerCase().includes(i))) {
             addLog(`[npm]: ${data}`); 
          }
        }
      }));

      const installExit = await installProcess.exit;
      if (installExit !== 0) {
        addLog('❌ INSTALL FAILED: Dependency error.');
        return;
      }
      addLog('✅ INSTALL COMPLETE.');
    }

    // 3. START SERVER
    addLog('🚀 LAUNCHER: Starting Next.js Dev Server...');
    const devProcess = await instance.spawn('npm', ['run', 'dev']);

    devProcess.output.pipeTo(new WritableStream({
      write(data) { 
        // Filter out SWC noise from the runtime server too
        if (!data.includes('swc') && !data.includes('bad platform')) {
           addLog(`[Server]: ${data}`); 
        }
      }
    }));

    instance.on('server-ready', (port, url) => {
      setIframeUrl(url);
      setActiveTab('preview');
      addLog(`🌐 SERVER ONLINE: ${url}`);
    });
  }, [addLog]);

  // const handleGenerate = useCallback(async () => {
  //   setIsGenerating(true);
  //   setActiveTab('editor'); 
  //   addLog('🧠 SYSTEM: Initializing AI Protocol (Chain-of-Thought)...');

  //   try {
  //     addLog('📡 CONNECTING: Phase 1 - Structural Blueprint...');
      
  //     // Step 1: Configs
  //     const structurePrompt = `
  //       Generate ONLY configuration files for Next.js 14 App Router.
  //       REQUIRED: package.json, next.config.mjs, postcss.config.js, tailwind.config.ts, .babelrc, tsconfig.json.
  //       Return valid JSON key-value pairs.
  //     `;
  //     const res1 = await model.invoke([getSystemPrompt('typescript'), new HumanMessage(structurePrompt)]);
  //     const structureTree = await robustParse(res1.content as string, "Phase 1", addLog);

  //     // Step 2: UI
  //     addLog('🎨 PHASE 2: Generating Application Logic...');
  //     const appPrompt = `
  //       Generate ONLY application source code for: "Build a Cyberpunk Coffee Shop Landing Page."
        
  //       RETURN ONLY:
  //       - src/app/page.tsx (The Landing Page)
  //       - src/app/layout.tsx (Root Layout)
  //       - src/app/globals.css (Tailwind CSS)
        
  //       IMPORTANT:
  //       - Do NOT regenerate config files.
  //       - Return valid JSON key-value pairs.
  //       - Keep the code concise to avoid token limits.
  //     `;
  //     const res2 = await model.invoke([getSystemPrompt('typescript'), new HumanMessage(appPrompt)]);
  //     const appTree = await robustParse(res2.content as string, "Phase 2", addLog);

  //     // Merge & Mount
  //     const fullTree = { ...structureTree, ...appTree };
      
  //     // Apply Safety Patches (Injects .npmrc which handles the config globally)
  //     applySafetyOverrides(fullTree, addLog);

  //     addLog('💾 FILESYSTEM: Writing files to virtual memory...');
  //     await mountFiles(fullTree);
      
  //     const treeStruct = parseJsonToTree(fullTree);
  //     useFileStore.getState().setFileTree(treeStruct);

  //     addLog('✅ FILESYSTEM: Write Complete.');
  //     await startDevServer();

  //   } catch (err: any) {
  //     addLog(`❌ FATAL ERROR: ${err.message || err}`);
  //     console.error(err);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // }, [addLog, startDevServer]);


   const handleGenerate = useCallback(async (userMessage: string) => {
  setIsGenerating(true);
  setActiveTab('editor');
  addLog(`🧠 SYSTEM: Initializing AI Protocol for: "${userMessage}"...`);

  try {
    addLog('📡 CONNECTING: Phase 1 - Structural Blueprint...');

    const structurePrompt = `
      Generate ONLY configuration files for Next.js 14 App Router.
      User Request: "${userMessage}"
      
      REQUIRED: package.json, next.config.mjs, postcss.config.js, tailwind.config.ts, .babelrc, tsconfig.json.
      Return valid JSON key-value pairs.
    `;
    const res1 = await model.invoke([getSystemPrompt('typescript'), new HumanMessage(structurePrompt)]);
    const structureTree = await robustParse(res1.content as string, 'Phase 1', addLog);

    addLog('🎨 PHASE 2: Generating Application Logic...');
    const appPrompt = `
      Generate ONLY application source code.
      User Request: "${userMessage}"
      
      RETURN ONLY:
      - src/app/page.tsx
      - src/app/layout.tsx
      - src/app/globals.css
      
      Do NOT regenerate config files.
      Return valid JSON key-value pairs.
    `;
    const res2 = await model.invoke([getSystemPrompt('typescript'), new HumanMessage(appPrompt)]);
    const appTree = await robustParse(res2.content as string, 'Phase 2', addLog);

    const fullTree = { ...structureTree, ...appTree };
    applySafetyOverrides(fullTree, addLog);

    addLog('💾 FILESYSTEM: Writing files to virtual memory...');
    await mountFiles(fullTree);

    const treeStruct = parseJsonToTree(fullTree);
    useFileStore.getState().setFileTree(treeStruct);

    addLog('✅ FILESYSTEM: Write Complete.');
    await startDevServer();

  } catch (err: any) {
    addLog(`❌ FATAL ERROR: ${err.message || err}`);
    console.error(err);
  } finally {
    setIsGenerating(false);
  }
}, [addLog, startDevServer]);





  const handleUpdate = useCallback(async (userMessage: string) => {
  setIsGenerating(true);
  addLog(`💬 CHAT: Processing request: "${userMessage}"...`);

  try {
    const updatePrompt = `
      The user wants to modify the existing app.
      Request: "${userMessage}"
      
      RULES:
      1. Return ONLY the files that need to be created or modified.
      2. DO NOT return files that haven't changed.
      3. Return valid JSON keys/values.
    `;

    const response = await model.invoke([
      getSystemPrompt('typescript'),
      new HumanMessage(updatePrompt)
    ]);

    addLog('⚡ PATCH RECEIVED. Applying changes...');
    const patchTree = await robustParse(response.content as string, "Update", addLog);

    await mountFiles(patchTree);

    const currentTree = useFileStore.getState().fileTree;
    const patchStruct = parseJsonToTree(patchTree);
    useFileStore.getState().setFileTree({ ...currentTree, ...patchStruct });

    addLog('✅ UPDATE COMPLETE: Hot Reloading...');
  } catch (err: any) {
    addLog(`❌ UPDATE FAILED: ${err.message}`);
  } finally {
    setIsGenerating(false);
  }
}, [addLog]);


  return {
    activeTab,
    setActiveTab,
    isGenerating,
    iframeUrl,
    handleGenerate,
    handleUpdate
  };
}





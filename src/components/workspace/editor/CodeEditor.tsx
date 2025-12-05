// 'use client';

// import { useEffect, useState } from 'react';
// import Editor from '@monaco-editor/react';
// import { useFileStore } from '@/stores/useFileStore';
// import { getWebContainerInstance } from '@/lib/webcontainer/instance';

// export default function CodeEditor() {
//   const selectedFile = useFileStore((state) => state.selectedFile);
//   const [content, setContent] = useState<string>('// Select a file to view code');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!selectedFile) return;

//     const loadFile = async () => {
//       setLoading(true);
//       try {
//         const instance = await getWebContainerInstance();
//         const text = await instance.fs.readFile(selectedFile, 'utf-8');
//         setContent(text);
//       } catch (err) {
//         console.error('Failed to read file', err);
//         setContent('// Error reading file');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFile();
//   }, [selectedFile]);

//   const handleEditorChange = async (value: string | undefined) => {
//     if (!selectedFile || !value) return;
    
//     try {
//       const instance = await getWebContainerInstance();
//       await instance.fs.writeFile(selectedFile, value);
//     } catch (err) {
//       console.error('Failed to save file', err);
//     }
//   };

//   if (!selectedFile) {
//     return (
//       <div className="flex h-full items-center justify-center text-neutral-500 text-sm font-mono">
//         Select a file from the explorer
//       </div>
//     );
//   }

//   return (
//     <div className="h-full w-full relative">
//       {loading && (
//         <div className="absolute top-0 right-0 p-2 text-xs text-green-500 bg-neutral-900 z-10">
//           Loading...
//         </div>
//       )}
//       <Editor
//         height="100%"
//         theme="vs-dark"
//         path={selectedFile}
//         defaultLanguage="typescript"
//         defaultValue={content}
//         value={content}
//         onChange={handleEditorChange}
//         options={{
//           minimap: { enabled: false },
//           fontSize: 14,
//           fontFamily: '"JetBrains Mono", monospace',
//           scrollBeyondLastLine: false,
//           automaticLayout: true,
//         }}
//       />
//     </div>
//   );
// }
















'use client';

import { useEffect, useState, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useFileStore } from '@/stores/useFileStore';
import { getWebContainerInstance } from '@/lib/webcontainer/instance';

const getLanguageFromPath = (path: string) => {
  if (path.endsWith('.tsx') || path.endsWith('.ts')) return 'typescript';
  if (path.endsWith('.jsx') || path.endsWith('.js') || path.endsWith('.mjs')) return 'javascript';
  if (path.endsWith('.css')) return 'css';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.html')) return 'html';
  return 'plaintext';
};

export default function CodeEditor() {
  const selectedFile = useFileStore((state) => state.selectedFile);
  const [content, setContent] = useState<string>('// Select a file to view code');
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    const compilerOptions = {
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: 'React.createElement',
      reactNamespace: 'React',
      allowJs: true,
      checkJs: false,
      strict: false,
      typeRoots: ["node_modules/@types"]
    };

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions);

    const libSource = `
      declare module 'react' { export = React; }
      declare module 'react-dom' { export = ReactDOM; }
      declare module 'react-dom/client' { export const createRoot: any; }
      declare module 'next/image' { const Image: any; export default Image; }
      declare module 'next/link' { const Link: any; export default Link; }
      declare module 'next/navigation' { export const useRouter: any; export const usePathname: any; }
      declare module 'lucide-react' { export const [key: string]: any; }
      declare module 'clsx' { export default function clsx(...args: any[]): string; }
      declare module 'tailwind-merge' { export function twMerge(...args: any[]): string; }
      declare var process: { env: { [key: string]: string } };
      declare var console: any;
      declare var module: any;
      declare var require: any;
      declare module '*.css';
      declare module '*.scss';
      declare module '*.svg';
      declare module '*.png';
      declare module '*.jpg';
    `;

    monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource, 'ts:filename/global.d.ts');
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, 'ts:filename/global.d.ts');

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
  };

  useEffect(() => {
    if (!selectedFile) return;

    const loadFile = async () => {
      setLoading(true);
      try {
        const instance = await getWebContainerInstance();
        try {
          const text = await instance.fs.readFile(selectedFile, 'utf-8');
          setContent(text);
        } catch (readErr) {
          console.warn('File not found in VFS:', selectedFile);
          setContent('');
        }
      } catch (err) {
        console.error('Failed to get instance', err);
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [selectedFile]);

  const handleEditorChange = async (value: string | undefined) => {
    if (!selectedFile || value === undefined) return;
    try {
      const instance = await getWebContainerInstance();
      await instance.fs.writeFile(selectedFile, value);
    } catch (err) {
      console.error('Failed to save file', err);
    }
  };

  if (!selectedFile) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-500 text-sm font-mono bg-[#1e1e1e]">
        Select a file from the explorer
      </div>
    );
  }

  const language = getLanguageFromPath(selectedFile);

  return (
    <div className="h-full w-full relative bg-[#1e1e1e]">
      {loading && (
        <div className="absolute top-0 right-0 p-2 text-xs text-green-500 bg-neutral-900 z-10 font-mono">
          Reading...
        </div>
      )}
      <Editor
        height="100%"
        theme="vs-dark"
        key={selectedFile}
        path={selectedFile}
        language={language}
        defaultValue={content}
        value={content}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: '"JetBrains Mono", monospace',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
          wordWrap: 'on',
        }}
      />
    </div>
  );
}

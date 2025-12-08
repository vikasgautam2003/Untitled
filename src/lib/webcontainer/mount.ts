




// import { WebContainer, FileSystemTree } from '@webcontainer/api';
// import { getWebContainerInstance } from './instance';

// export function parseJsonToTree(files: Record<string, any>): FileSystemTree {
//   const root: FileSystemTree = {};

//   for (const [path, content] of Object.entries(files)) {
//     const parts = path.split('/');
//     let currentLevel = root;

//     parts.forEach((part, index) => {
//       const isFile = index === parts.length - 1;

//       if (isFile) {
//         let safeContent = '';
//         if (typeof content === 'string') {
//           safeContent = content;
//         } else if (content === null || content === undefined) {
//           safeContent = '';
//         } else {
//           safeContent = String(content);
//         }

//         currentLevel[part] = {
//           file: {
//             contents: safeContent,
//           },
//         };
//       } else {
//         if (!currentLevel[part]) {
//           currentLevel[part] = {
//             directory: {},
//           };
//         }

//         const node = currentLevel[part];
//         if ('directory' in node) {
//           currentLevel = node.directory;
//         } else {
//           console.warn(`Path collision at ${part}: Folder expected but file found.`);
//         }
//       }
//     });
//   }

//   return root;
// }

// export async function mountFiles(fileJson: Record<string, any>) {
//   const instance = await getWebContainerInstance();
//   console.log('📂 Converting JSON to FileSystemTree...');
//   const tree = parseJsonToTree(fileJson);
//   console.log('💾 Mounting to WebContainer...');
//   await instance.mount(tree);
//   console.log('✅ Files mounted successfully!');
// }




























// import { WebContainer, FileSystemTree } from '@webcontainer/api';
// import { getWebContainerInstance } from './instance';

// export function parseJsonToTree(files: Record<string, any>): FileSystemTree {
//   const root: FileSystemTree = {};

//   root['src'] = { directory: {} };
//   root['public'] = { directory: {} };

//   if (!files || typeof files !== 'object') {
//     return root;
//   }

//   for (const [rawPath, content] of Object.entries(files)) {
//     let path = rawPath.trim();

//     if (path.startsWith('./')) path = path.slice(2);
//     if (path.startsWith('/')) path = path.slice(1);

//     const coreFiles = ['page.tsx', 'layout.tsx', 'globals.css', 'page.jsx', 'layout.jsx'];
//     if (coreFiles.includes(path)) {
//       path = `src/app/${path}`;
//     }

//     if (
//       !path.startsWith('src/') &&
//       (path.startsWith('app/') || 
//        path.startsWith('components/') || 
//        path.startsWith('lib/') || 
//        path.startsWith('hooks/') ||
//        path.startsWith('utils/') ||
//        path.startsWith('styles/'))
//     ) {
//       path = `src/${path}`;
//     }

//     const parts = path.split('/');
//     let currentLevel = root;

//     parts.forEach((part, index) => {
//       const isFile = index === parts.length - 1;

//       if (isFile) {
//         let safeContent = '';
//         if (typeof content === 'string') safeContent = content;
//         else if (typeof content === 'object' && content !== null) safeContent = JSON.stringify(content, null, 2);
//         else safeContent = String(content || '');

//         currentLevel[part] = {
//           file: { contents: safeContent },
//         };
//       } else {
//         if (!currentLevel[part]) {
//           currentLevel[part] = { directory: {} };
//         }

//         const node = currentLevel[part];
//         if ('directory' in node) {
//           currentLevel = node.directory;
//         } else {
//           currentLevel[part] = { directory: {} };
//           currentLevel = (currentLevel[part] as any).directory;
//         }
//       }
//     });
//   }

//   return root;
// }

// export async function mountFiles(fileJson: Record<string, any>) {
//   const instance = await getWebContainerInstance();
//   const tree = parseJsonToTree(fileJson);
//   await instance.mount(tree);
// }

















import { WebContainer, FileSystemTree } from '@webcontainer/api';
import { getWebContainerInstance } from './instance';

export function parseJsonToTree(files: Record<string, any>): FileSystemTree {
  const root: FileSystemTree = {
    'public': { directory: {} },
    'src': {
      directory: {
        'app': { directory: {} },
        'components': { directory: {} },
        'lib': { directory: {} },
      }
    }
  };

  if (!files || typeof files !== 'object') return root;

  // -----------------------------------------------------------------------
  // PASS 1: Normalize Paths (Create a Clean Map)
  // -----------------------------------------------------------------------
  const cleanFiles = new Map<string, string>();

  for (const [rawPath, content] of Object.entries(files)) {
    let path = rawPath.trim();
    
    // 1. Remove leading garbage (./ or /)
    path = path.replace(/^\.?\//, '').replace(/\/+/g, '/');

    // 2. Identify Key Config Files (Keep at Root)
    const isConfig = [
      'package.json', 'tsconfig.json', 'jsconfig.json', 
      'next.config.mjs', 'next.config.js', 'postcss.config.js', 
      'tailwind.config.ts', 'tailwind.config.js', '.babelrc', 
      '.npmrc', '.eslintrc.json', '.gitignore', 'README.md'
    ].includes(path);

    // 3. Force Application Code into src/
    if (!isConfig && !path.startsWith('public/')) {
        // Core Next.js files at root? -> Move to src/app
        if (['page.tsx', 'layout.tsx', 'globals.css'].includes(path)) {
            path = `src/app/${path}`;
        }
        // App/Components at root? -> Move to src/...
        else if (path.startsWith('app/') || path.startsWith('components/') || path.startsWith('lib/') || path.startsWith('utils/')) {
            path = `src/${path}`;
        }
        // Loose code files at root? -> Move to src/components (Safety Net)
        else if (!path.includes('/') && path.endsWith('.tsx')) {
            path = `src/components/${path}`;
        }
    }

    // 4. Ensure Content is a String
    let safeContent = '';
    if (typeof content === 'string') safeContent = content;
    else if (typeof content === 'object' && content !== null) safeContent = JSON.stringify(content, null, 2);
    else safeContent = String(content || '');

    cleanFiles.set(path, safeContent);
  }

  console.log("📝 CLEANED FILE LIST:", Array.from(cleanFiles.keys())); // DEBUG LOG

  // -----------------------------------------------------------------------
  // PASS 2: Build Tree from Clean Paths
  // -----------------------------------------------------------------------
  for (const [path, content] of cleanFiles) {
    const parts = path.split('/');
    let currentLevel = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;

      if (isFile) {
        // Write File
        currentLevel[part] = { file: { contents: content } };
      } else {
        // Navigate Folder
        if (!currentLevel[part]) {
          currentLevel[part] = { directory: {} };
        }
        
        // Handle "File vs Folder" Collision
        // If we need a folder but a file exists, overwrite it.
        const node = currentLevel[part];
        if ('directory' in node) {
          currentLevel = node.directory;
        } else {
          currentLevel[part] = { directory: {} };
          currentLevel = (currentLevel[part] as any).directory;
        }
      }
    });
  }

  return root;
}

export async function mountFiles(fileJson: Record<string, any>) {
  const instance = await getWebContainerInstance();
  const tree = parseJsonToTree(fileJson);
  await instance.mount(tree);
}
// import { WebContainer, FileSystemTree, DirectoryNode } from '@webcontainer/api';
// import { getWebContainerInstance } from './instance';

// function parseJsonToTree(files: Record<string, string>): FileSystemTree {
//   const root: FileSystemTree = {};

//   for (const [path, content] of Object.entries(files)) {
//     const parts = path.split('/');
//     let currentLevel = root;

//     parts.forEach((part, index) => {
//       const isFile = index === parts.length - 1;

//       if (isFile) {
//         currentLevel[part] = {
//           file: {
//             contents: content,
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
//           throw new Error(`Path collision at ${part}: Cannot create folder because a file exists with this name.`);
//         }
//       }
//     });
//   }

//   return root;
// }

// export async function mountFiles(fileJson: Record<string, string>) {
//   const instance = await getWebContainerInstance();
//   console.log('📂 Converting JSON to FileSystemTree...');
//   const tree = parseJsonToTree(fileJson);
//   console.log('💾 Mounting to WebContainer...', Object.keys(fileJson));
//   await instance.mount(tree);
//   console.log('✅ Files mounted successfully!');
// }







import { WebContainer, FileSystemTree } from '@webcontainer/api';
import { getWebContainerInstance } from './instance';

export function parseJsonToTree(files: Record<string, any>): FileSystemTree {
  const root: FileSystemTree = {};

  for (const [path, content] of Object.entries(files)) {
    const parts = path.split('/');
    let currentLevel = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;

      if (isFile) {
        let safeContent = '';
        if (typeof content === 'string') {
          safeContent = content;
        } else if (content === null || content === undefined) {
          safeContent = '';
        } else {
          safeContent = String(content);
        }

        currentLevel[part] = {
          file: {
            contents: safeContent,
          },
        };
      } else {
        if (!currentLevel[part]) {
          currentLevel[part] = {
            directory: {},
          };
        }

        const node = currentLevel[part];
        if ('directory' in node) {
          currentLevel = node.directory;
        } else {
          console.warn(`Path collision at ${part}: Folder expected but file found.`);
        }
      }
    });
  }

  return root;
}

export async function mountFiles(fileJson: Record<string, any>) {
  const instance = await getWebContainerInstance();
  console.log('📂 Converting JSON to FileSystemTree...');
  const tree = parseJsonToTree(fileJson);
  console.log('💾 Mounting to WebContainer...');
  await instance.mount(tree);
  console.log('✅ Files mounted successfully!');
}

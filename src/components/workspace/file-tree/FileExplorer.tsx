'use client';

import { useFileStore } from '@/stores/useFileStore';
import FileNode from './FileNode';
import { getWebContainerInstance } from '@/lib/webcontainer/instance';

export default function FileExplorer() {
  const { fileTree, selectedFile, setSelectedFile } = useFileStore();

  const handleSelectFile = async (path: string) => {
    setSelectedFile(path);
    // Future Phase 4: This is where we will load the file content into the Editor
    // const instance = await getWebContainerInstance();
    // const content = await instance.fs.readFile(path, 'utf-8');
  };

  if (Object.keys(fileTree).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-neutral-600 text-sm italic">
        <span>No files generated yet.</span>
        <span>Start the AI to build.</span>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-2">
      {Object.entries(fileTree).map(([name, node]) => (
        <FileNode 
          key={name}
          name={name}
          node={node}
          path={name}
          onSelect={handleSelectFile}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen } from 'lucide-react';
import { DirectoryNode, FileNode as WebContainerFileNode, SymlinkNode } from "@webcontainer/api";

interface FileNodeProps {
  name: string;
  node: DirectoryNode | WebContainerFileNode | SymlinkNode;
  path: string;
  onSelect: (path: string) => void;
  selectedFile: string | null;
}


export default function FileNode({ name, node, path, onSelect, selectedFile }: FileNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = 'directory' in node;
  const isSelected = path === selectedFile;

  if (isFolder) {
    return (
      <div className="select-none">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 py-1 px-2 hover:bg-neutral-800 cursor-pointer text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {isOpen ? (
            <FolderOpen size={14} className="text-blue-400" />
          ) : (
            <Folder size={14} className="text-blue-400" />
          )}
          <span className="text-sm font-mono">{name}</span>
        </div>

        {isOpen && (
          <div className="pl-4 border-l border-neutral-800 ml-2">
            {Object.entries((node as DirectoryNode).directory).map(([childName, childNode]) => (
              <FileNode
                key={childName}
                name={childName}
                node={childNode}
                path={`${path}/${childName}`}
                onSelect={onSelect}
                selectedFile={selectedFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const baseClasses =
    "flex items-center gap-2 py-1 px-2 cursor-pointer transition-colors border-l-2 border-transparent ml-2";

  const selectedClasses = "bg-neutral-800 text-green-400 border-green-500";
  const unselectedClasses = "text-neutral-500 hover:bg-neutral-800/50 hover:text-neutral-300";

  return (
    <div
      onClick={() => onSelect(path)}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      <FileCode size={14} />
      <span className="text-sm font-mono">{name}</span>
    </div>
  );
}

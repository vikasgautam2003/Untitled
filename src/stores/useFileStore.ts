import { create } from "zustand";
import { FileSystemTree } from '@webcontainer/api';


interface FileStore {
  fileTree: FileSystemTree;
  selectedFile: string | null;
  openFiles: string[];
  
  setFileTree: (tree: FileSystemTree) => void;
  setSelectedFile: (path: string | null) => void;
}


export const useFileStore = create<FileStore>((set) => ({
  fileTree: {},
  selectedFile: null,
  openFiles: [],

  setFileTree: (tree) => set({ fileTree: tree }),
  setSelectedFile: (path) => set({ selectedFile: path }),
}));
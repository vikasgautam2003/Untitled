import { create } from "zustand";


interface TerminalState {
    output: string[];
    addLog: (log: string) => void;
    clearLogs: () => void;
}




export const useTerminalStore = create<TerminalState>((set) => ({
  output: ['> System Ready...'],

   addLog: (log) =>
    set((state) => ({
      output: [...state.output, log],
    })),

  clearLogs: () => set({ output: [] }),
 }));
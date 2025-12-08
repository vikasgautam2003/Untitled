import React from "react";
import {
  Terminal,
  Code2,
  Zap,
  ArrowRight,
  Play,
  MessageSquare,
  Globe,
  ShieldCheck,
  ChevronRight,
  Command,
  Cpu,
  GitBranch,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050608] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden">
      
      {/* --- PREMIUM AMBIENT LIGHTING --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] mix-blend-screen" />
        {/* Grain Overlay for Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- FLOATING NAVBAR --- */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-5xl bg-[#0B0C10]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Terminal className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-white/90">
              BrowserIDE
            </span>
          </div>

          

          <div className="flex items-center gap-3">

            <Link
              href="/workspace"
              className="group relative bg-white text-black px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-100 transition-all overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Spotlight Effect behind Hero */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-[80px] rounded-full pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] uppercase tracking-widest font-semibold text-cyan-400 mb-8 backdrop-blur-md shadow-lg shadow-cyan-900/20 hover:border-cyan-500/30 transition-colors cursor-pointer group">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          v1.0 Public Beta
          <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-cyan-400 transition-colors" />
        </div>

        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[1] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-6 max-w-4xl mx-auto">
          Development. <br />
          <span className="text-white">Unbound.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
          The first AI-native IDE that boots a full Node.js container in your browser. 
          <span className="text-gray-200"> Zero config. Zero latency.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link
            href="/workspace"
            className="h-12 px-8 rounded-xl bg-white text-black font-semibold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500 px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02]">
            
             <Link
            href="https://github.com/vikasgautam2003/AI-Powered-Browser-IDE-Project"
            className="h-12 px-8 rounded-xl bg-white text-black font-semibold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          > <Command className="w-3 h-3" /> Source Code
            </Link>
          </div>
        </div>

        {/* --- MAIN HERO IMAGE --- */}
        <div className="relative mt-20 w-full max-w-6xl group perspective-1000">
          {/* Glass Reflection */}
          <div className="absolute inset-x-10 -top-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5 transform transition-transform duration-700 hover:rotate-x-1">
            
            {/* Window Chrome */}
            <div className="h-10 border-b border-white/5 bg-[#0F1014] flex items-center px-4 justify-between select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2B2D31]" />
                <div className="w-3 h-3 rounded-full bg-[#2B2D31]" />
                <div className="w-3 h-3 rounded-full bg-[#2B2D31]" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/50 border border-white/5 text-[10px] text-gray-500 font-mono">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                Secure Container
              </div>
              <div className="w-10" />
            </div>

            {/* --- SCREENSHOT PLACEHOLDER --- */}
            <div className="aspect-[16/9] bg-[#0A0A0A] relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#131418] via-[#0A0A0A] to-[#0A0A0A]">
               {/* Replace this div with your <img> tag */}
               <img src={"IDE.png"}></img>
               
               {/* Optional: Add a subtle overlay to integrate the screenshot better */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-20 pointer-events-none" />
            </div>

          </div>
          
          {/* Glow under the image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-3xl opacity-10 -z-10 group-hover:opacity-20 transition-opacity duration-700" />
        </div>
      </section>

      {/* --- SOCIAL PROOF MARQUEE --- */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-8">Trusted by developers at</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500">
             {/* Replace with real SVGs for the 'Unicorn' look */}
             <div className="text-xl font-bold font-serif">ACME</div>
             <div className="text-xl font-bold tracking-tighter">Vercel</div>
             <div className="text-xl font-bold italic">Linear</div>
             <div className="text-xl font-bold">Raycast</div>
             <div className="text-xl font-bold tracking-widest">Stripe</div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold mb-16 text-center tracking-tight">
          Everything you need. <br/>
          <span className="text-gray-500">Nothing you don't.</span>
        </h2>

        <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          
          {/* Feature 1: Large Left */}
          <div className="md:col-span-2 md:row-span-2 bg-[#0C0D12] rounded-3xl border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">WebContainers</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Run Node.js directly in the browser. We've removed the server latency entirely. Your code runs locally, securely, and instantly.
              </p>
              
              {/* Abstract Visual for Speed */}
              <div className="flex-1 w-full bg-[#050608] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                 <div className="flex items-center gap-4 text-xs font-mono text-green-400">
                    <span className="animate-pulse">●</span> Server Ready (12ms)
                 </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Top Right */}
          <div className="md:col-span-2 bg-[#0C0D12] rounded-3xl border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Copilot</h3>
                <p className="text-sm text-gray-400 max-w-xs">
                  Context-aware chat that knows your file system. It writes, refactors, and debugs for you.
                </p>
              </div>
              {/* Mini Chat UI Visual */}
              <div className="hidden sm:block w-32 h-24 bg-[#050608] border border-white/5 rounded-lg p-2 space-y-2 opacity-50 group-hover:opacity-100 transition-opacity">
                 <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                 <div className="w-1/2 h-2 bg-purple-500/20 rounded-full" />
                 <div className="w-full h-2 bg-white/5 rounded-full" />
              </div>
            </div>
          </div>

          {/* Feature 3: Bottom Right 1 */}
          <div className="bg-[#0C0D12] rounded-3xl border border-white/10 p-6 flex flex-col justify-between group hover:border-white/20 transition-colors">
            <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Full Terminal</h3>
              <p className="text-xs text-gray-400">zsh, git, npm. It's all here.</p>
            </div>
          </div>

          {/* Feature 4: Bottom Right 2 */}
          <div className="bg-[#0C0D12] rounded-3xl border border-white/10 p-6 flex flex-col justify-between group hover:border-white/20 transition-colors">
             <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center mb-4">
              <GitBranch className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Git Integration</h3>
              <p className="text-xs text-gray-400">Push to GitHub in one click.</p>
            </div>
          </div>

        </div>
      </section>

      {/* --- HOW IT WORKS (Dark Mode Card) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="relative rounded-[2.5rem] bg-[#08090C] border border-white/10 overflow-hidden">
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#08090C] to-[#08090C]" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 p-8 md:p-20 items-center">
               <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                     See the future. <br/>
                     <span className="text-blue-500">Live.</span>
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                     We intercept localhost traffic and pipe it through a secure service worker directly to an iframe. 
                     The result? Instant hot-reloading without the heavy cloud virtual machine.
                  </p>
                  
                  <div className="flex gap-4 pt-4">
                     <div className="flex flex-col gap-1">
                        <h4 className="text-2xl font-bold text-white">0ms</h4>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Latency</span>
                     </div>
                     <div className="w-px h-12 bg-white/10 mx-4" />
                     <div className="flex flex-col gap-1">
                        <h4 className="text-2xl font-bold text-white">100%</h4>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Local</span>
                     </div>
                  </div>
               </div>

               
               <div className="relative group">
                  <div className="absolute -inset-2 bg-blue-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative bg-[#0F1014] rounded-xl border border-white/10 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                     <div className="text-center">
                        <Globe className="w-12 h-12 text-blue-500/50 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm font-medium">Preview Window Screenshot</p>
                     </div>
                     <img src="/IDE.png" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 bg-[#030304]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-white/5 rounded flex items-center justify-center border border-white/5">
              <Terminal className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">BrowserIDE Inc.</span>
          </div>

          <div className="flex gap-8 text-xs font-medium text-gray-600">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>

          <div className="text-xs text-gray-700">© 2025 Vikas Gautam. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
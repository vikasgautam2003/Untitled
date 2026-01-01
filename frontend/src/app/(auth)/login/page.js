// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../providers/auth.provider";
// import { loginUser } from "../../../lib/auth";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await loginUser({ email, password });

//       login(res.token); // 🔑 KEY LINE
//       router.push("/");

//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main style={{ padding: "2rem", maxWidth: 400 }}>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//     </main>
//   );
// }








// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../providers/auth.provider";
// import { loginUser } from "../../../lib/auth";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError(null);

//   try {
//     const res = await loginUser({ email, password });

//     login(res.token);

//     const role = res.user.role;

//     if (role === "SUPER_ADMIN") {
//       router.push("/super-admin");
//     } else if (role === "ADMIN") {
//       router.push("/admin");
//     } else {
//       router.push("/user");
//     }

//   } catch {
//     setError("Invalid credentials");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <>
//       <main className="page">
//         <aside className="left">
//           <div className="brand">
//             <h1>Dev Prep</h1>
//             <p>
//               Serious preparation for serious technical interviews.
//             </p>
//           </div>

//           <div className="manifesto">
//             <p>
//               Built for students who refuse shortcuts.
//               <br />
//               Practice deeply. Think clearly. Perform decisively.
//             </p>
//           </div>
//         </aside>

//         <section className="right">
//           <div className="login">
//             <h2>Member Access</h2>

//             <form onSubmit={handleSubmit}>
//               <label>
//                 Email
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </label>

//               <label>
//                 Password
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </label>

//               <button disabled={loading}>
//                 {loading ? "Verifying…" : "Enter Dev Prep"}
//               </button>

//               {error && <div className="error">{error}</div>}
//             </form>
//           </div>
//         </section>
//       </main>

//       <style jsx>{`
//         @keyframes reveal {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .page {
//           display: grid;
//           grid-template-columns: 1.2fr 1fr;
//           min-height: 100vh;
//           background: #fff;
//           color: #000;
//         }

//         .left {
//           padding: 4rem;
//           border-right: 1px solid #000;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           animation: reveal 0.8s ease-out;
//         }

//         .brand h1 {
//           font-family: Georgia, "Times New Roman", serif;
//           font-size: 3.2rem;
//           font-weight: 700;
//           margin-bottom: 1rem;
//           letter-spacing: -0.02em;
//         }

//         .brand p {
//           max-width: 420px;
//           font-size: 1rem;
//           line-height: 1.6;
//           color: #222;
//         }

//         .manifesto {
//           font-family: "Courier New", monospace;
//           font-size: 0.9rem;
//           color: #333;
//           border-top: 1px solid #000;
//           padding-top: 1.5rem;
//         }

//         .right {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           animation: reveal 1s ease-out;
//         }

//         .login {
//           width: 100%;
//           max-width: 380px;
//         }

//         .login h2 {
//           font-family: Georgia, "Times New Roman", serif;
//           font-size: 1.8rem;
//           margin-bottom: 2rem;
//         }

//         form {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         label {
//           display: flex;
//           flex-direction: column;
//           font-size: 0.75rem;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//         }

//         input {
//           margin-top: 0.5rem;
//           padding: 0.6rem 0;
//           border: none;
//           border-bottom: 1px solid #000;
//           font-size: 0.95rem;
//           outline: none;
//         }

//         input:focus {
//           border-bottom: 2px solid #000;
//         }

//         button {
//           margin-top: 1rem;
//           padding: 0.8rem;
//           background: #000;
//           color: #fff;
//           border: none;
//           font-size: 0.85rem;
//           cursor: pointer;
//         }

//         button:hover {
//           background: #111;
//         }

//         button:disabled {
//           background: #555;
//           cursor: not-allowed;
//         }

//         .error {
//           font-size: 0.85rem;
//           border-left: 3px solid #000;
//           padding-left: 0.75rem;
//         }

//         @media (max-width: 900px) {
//           .page {
//             grid-template-columns: 1fr;
//           }

//           .left {
//             border-right: none;
//             border-bottom: 1px solid #000;
//           }
//         }
//       `}</style>
//     </>
//   );
// }
















"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../providers/auth.provider";
import { loginUser } from "../../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await loginUser({ email, password });
      login(res.token);

      const role = res.user.role;
      if (role === "SUPER_ADMIN") router.push("/super-admin");
      else if (role === "ADMIN") router.push("/admin");
      else router.push("/user");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#02040a] text-white overflow-hidden flex items-center justify-center font-sans p-4">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-800/20 rounded-full blur-[150px] animate-pulse duration-7000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[150px] animate-pulse duration-10000" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, 
            backgroundSize: '80px 80px' 
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] animate-in fade-in zoom-in duration-700">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] bg-[#0A0F1C]/70 backdrop-blur-3xl border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.7)] overflow-hidden min-h-[850px]">
          
          <aside className="hidden lg:flex flex-col justify-between p-20 bg-gradient-to-br from-[#0f172a]/80 via-[#0B1121]/50 to-transparent relative border-r border-white/5">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 ring-1 ring-white/10">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold tracking-tight text-white">DevPrep</span>
              </div>
              
              <h1 className="text-6xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
                Accelerate your <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300">Technical Career.</span>
              </h1>
              
              <p className="text-xl text-slate-400 font-light max-w-lg leading-relaxed">
                Join 50,000+ engineers mastering system design and algorithms with our AI-powered learning workspace.
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md max-w-md transform transition hover:scale-[1.02] duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">System Design Mastered</div>
                    <div className="text-slate-400 text-sm">Course completed 100%</div>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </aside>

          <section className="p-12 lg:p-24 flex flex-col justify-center bg-[#050914]/40 relative">
            <div className="w-full max-w-xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-white mb-3">Welcome back</h2>
                <p className="text-lg text-slate-400">Enter your credentials to access your workspace.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider ml-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl bg-[#131b2e] border-2 border-[#1f2937] px-6 py-5 text-lg text-white outline-none transition-all 
                             placeholder:text-slate-600 focus:border-indigo-500 focus:bg-[#1a233b] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Forgot password?</a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl bg-[#131b2e] border-2 border-[#1f2937] px-6 py-5 text-lg text-white outline-none transition-all 
                             placeholder:text-slate-600 focus:border-indigo-500 focus:bg-[#1a233b] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
                    placeholder="••••••••••••"
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 py-5 text-lg font-bold text-white shadow-xl shadow-indigo-500/20 
                           hover:shadow-indigo-500/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 
                           disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4"
                >
                  {loading ? "Authenticating..." : "Sign In to Workspace"}
                </button>

                {error && (
                  <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 flex items-center gap-4">
                     <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-base text-red-300 font-medium">{error}</p>
                  </div>
                )}
              </form>

              <div className="mt-12 text-center border-t border-white/5 pt-8">
                <p className="text-base text-slate-500">
                  Don't have an account yet?{" "}
                  <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors hover:underline ml-1">
                    Create a free account
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
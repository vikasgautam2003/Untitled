






// "use client";

// import { useEffect, useState, use } from "react";
// import api from "../../../lib/api-client";
// import Editor from "@monaco-editor/react";
// import SolutionGate from "../../../components/solutions/SolutionGate";


// export default function ProblemDetail({ params }) {
//   const { slug } = use(params);
//   const [problem, setProblem] = useState(null);

//   const [language, setLanguage] = useState("python");
//   const [code, setCode] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState(null);

//   const [submissions, setSubmissions] = useState([]);
//   const [loadingSubs, setLoadingSubs] = useState(false);
//   const [polling, setPolling] = useState(false);

//   const [hint, setHint] = useState(null);
//   const [hintMeta, setHintMeta] = useState(null);
//   const [loadingHint, setLoadingHint] = useState(false);


//   useEffect(() => {
//     if (!slug) return;
//     api.get(`/api/problems/${slug}`).then(res => setProblem(res.data));
//   }, [slug]);

//   useEffect(() => {
//     if (!problem?._id) return;

//     const fetchSubmissions = async () => {
//       setLoadingSubs(true);
//       const res = await api.get(`/api/submissions/problem/${problem._id}`);
//       setSubmissions(res.data);
//       setLoadingSubs(false);
//     };

//     fetchSubmissions();
//   }, [problem]);


//   useEffect(() => {
//   if (!polling || !problem?._id) return;

//   const interval = setInterval(async () => {
//     try {
//       const res = await api.get(`/api/submissions/problem/${problem._id}`);
//       setSubmissions(res.data);

//       const latest = res.data[0];
//       if (latest && latest.verdict !== "Pending") {
//         setPolling(false);
//         clearInterval(interval);
//       }
//     } catch (err) {
//       console.error("Polling failed");
//     }
//   }, 2000);

//   return () => clearInterval(interval);
// }, [polling, problem]);



//   const handleSubmit = async () => {
//     try {
//       setSubmitting(true);
//       setMessage(null);

//       await api.post("/api/submissions", {
//         problemSlug: slug,
//         language,
//         code
//       });

//       setMessage("Submission received. Verdict: PENDING");
//       setPolling(true);


//       const res = await api.get(`/api/submissions/problem/${problem._id}`);
//       setSubmissions(res.data);
//     } catch {
//       setMessage("Submission failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };


   
//   const getHint = async () => {
//   try {
//     setLoadingHint(true);
//     const res = await api.post("/api/ai/hint", {
//       problemId: problem._id,
//       language,
//       code
//     });
//     setHint(res.data.hint);
//     setHintMeta({ level: res.data.level, remaining: res.data.remaining });
//   } catch (e) {
//     setHint("No more hints available.");
//   } finally {
//     setLoadingHint(false);
//   }
// };




//   useEffect(() => {
//   if (problem?.starterCode?.[language]) {
//     setCode(problem.starterCode[language]);
//   }
// }, [problem, language]);



//   if (!problem) return <p>Loading...</p>;

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px" }}>
//       <h1>{problem.title}</h1>
//       <p>Difficulty: {problem.difficulty}</p>

//       <section>
//         <h3>Description</h3>
//         <pre>{problem.description}</pre>
//       </section>

//       <section className="border-t pt-6 space-y-4">
//         <h3>Your Code</h3>

//         <select value={language} onChange={e => setLanguage(e.target.value)}>
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//           <option value="cpp">C++</option>
//         </select>

//         <Editor
//           height="400px"
//           language={
//             language === "cpp" ? "cpp" :
//             language === "java" ? "java" :
//             "python"
//           }
//           value={code}
//           onChange={value => setCode(value || "")}
//           theme="vs-dark"
//           options={{
//             fontSize: 14,
//             minimap: { enabled: false },
//             scrollBeyondLastLine: false,
//             automaticLayout: true
//           }}
//         />

//         <button onClick={handleSubmit} disabled={submitting}>
//           {submitting ? "Submitting..." : "Submit"}
//         </button>

//         {message && <p>{message}</p>}
//       </section>

//       <section className="border-t pt-6">
//         <h3>Submission History</h3>

//         {loadingSubs && <p>Loading...</p>}

//         {submissions.map(sub => (
//           <div key={sub._id} style={{ border: "1px solid #ccc", marginBottom: 12, padding: 10 }}>
//             <div>
//               {new Date(sub.createdAt).toLocaleString()} — {sub.language} — {sub.verdict}
//             </div>

//             {Array.isArray(sub.testResults) && (
//               <ul>
//                 {sub.testResults.map(tr => (
//                   <li key={tr.index}>
//                     Test {tr.index + 1}: {tr.passed ? "✅ Passed" : "❌ Failed"}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </section>
      
//       <section className="border-t pt-6">
//   <button onClick={getHint} disabled={loadingHint}>
//     {loadingHint ? "Thinking..." : "Get Hint"}
//   </button>

//   {hint && (
//     <div className="mt-3">
//       <pre className="p-3 bg-gray-100 rounded whitespace-pre-wrap">{hint}</pre>
//       {hintMeta && (
//         <div className="text-sm text-gray-600 mt-1">
//           Hint {hintMeta.level} of 3 · {hintMeta.remaining} remaining
//         </div>
//       )}
//     </div>
//   )}
// </section>
// <section className="mt-10">
//   <h2 className="text-xl font-semibold mb-3">
//     Optimal Solution
//   </h2>

//   <SolutionGate problemId={problem._id} />
// </section>



//     </main>
//   );
// }







































// "use client";

// import { useEffect, useRef, useState, use } from "react";
// import api from "../../../lib/api-client";
// import Editor from "@monaco-editor/react";
// import SolutionGate from "../../../components/solutions/SolutionGate";
// import {
//   FaCode,
//   FaPlay,
//   FaCloudUploadAlt,
//   FaLightbulb,
//   FaHistory,
//   FaCheckCircle,
//   FaList,
//   FaChevronUp,
//   FaChevronDown
// } from "react-icons/fa";

// export default function ProblemDetail({ params }) {
//   const { slug } = use(params);
//   const [problem, setProblem] = useState(null);

//   const [language, setLanguage] = useState("python");
//   const [code, setCode] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState(null);

//   const [submissions, setSubmissions] = useState([]);
//   const [polling, setPolling] = useState(false);

//   const [hint, setHint] = useState(null);
//   const [loadingHint, setLoadingHint] = useState(false);

//   const [testPanelOpen, setTestPanelOpen] = useState(true);
//   const [solutionOpen, setSolutionOpen] = useState(false);

//   const [panelHeight, setPanelHeight] = useState(260);
//   const draggingRef = useRef(false);

//   const [bottomView, setBottomView] = useState("tests"); 


//   useEffect(() => {
//     if (!slug) return;
//     api.get(`/api/problems/${slug}`).then(res => setProblem(res.data));
//   }, [slug]);

//   useEffect(() => {
//     if (!problem?._id) return;
//     api.get(`/api/submissions/problem/${problem._id}`).then(res =>
//       setSubmissions(res.data)
//     );
//   }, [problem]);

//   useEffect(() => {
//     if (!polling || !problem?._id) return;
//     const interval = setInterval(async () => {
//       const res = await api.get(`/api/submissions/problem/${problem._id}`);
//       setSubmissions(res.data);
//       if (res.data[0]?.verdict !== "Pending") {
//         setPolling(false);
//         setMessage(res.data[0]?.verdict);
//         clearInterval(interval);
//       }
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [polling, problem]);

//   const handleSubmit = async () => {
//     try {
//       setSubmitting(true);
//       setMessage("Running test cases");
//       await api.post("/api/submissions", { problemSlug: slug, language, code });
//       setPolling(true);
//     } catch {
//       setMessage("Submission failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getHint = async () => {
//     try {
//       setLoadingHint(true);
//       const res = await api.post("/api/ai/hint", {
//         problemId: problem._id,
//         language,
//         code
//       });
//       setHint(res.data.hint);
//     } catch {
//       setHint("No hints remaining");
//     } finally {
//       setLoadingHint(false);
//     }
//   };

//   const startDrag = () => (draggingRef.current = true);
//   const stopDrag = () => (draggingRef.current = false);

//   const onDrag = e => {
//     if (!draggingRef.current) return;
//     setPanelHeight(h =>
//       Math.min(420, Math.max(120, h - e.movementY))
//     );
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", onDrag);
//     window.addEventListener("mouseup", stopDrag);
//     return () => {
//       window.removeEventListener("mousemove", onDrag);
//       window.removeEventListener("mouseup", stopDrag);
//     };
//   }, []);

//   useEffect(() => {
//     if (problem?.starterCode?.[language]) {
//       setCode(problem.starterCode[language]);
//     }
//   }, [problem, language]);

//   if (!problem)
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#eaf1fb] text-[#2563eb]">
//         Loading…
//       </div>
//     );

//   return (
//     <main className="h-screen w-full flex bg-[#eaf1fb] text-[#0f172a] overflow-hidden">

//       {/* LEFT */}
//       <div className="w-1/2 min-w-[480px] flex flex-col bg-[#f4f8ff] border-r border-black/10">

//         <div className="h-16 flex items-end px-12 border-b border-black/10">
//           <div className="flex gap-12 text-sm font-medium pb-3">
//             <div className="flex items-center gap-2 text-[#2563eb] border-b-2 border-[#2563eb] pb-2">
//               <FaList /> Description
//             </div>
//             <div className="flex items-center gap-2 text-[#64748b]">
//               <FaHistory /> Submissions
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto px-12 py-12 space-y-14">

//           <div>
//             <h1 className="text-3xl font-semibold mb-4">{problem.title}</h1>
//             <div className="flex items-center gap-4">
//               <span className="px-4 py-1 text-xs rounded-full bg-[#dbeafe] text-[#2563eb]">
//                 {problem.difficulty}
//               </span>
//               <span className="text-xs text-[#16a34a] flex items-center gap-1">
//                 <FaCheckCircle /> Solved
//               </span>
//             </div>
//           </div>

//           <div className="bg-white border border-black/10 rounded-2xl p-10">
//             <pre className="whitespace-pre-wrap text-sm leading-7">
//               {problem.description}
//             </pre>
//           </div>

//           <div className="space-y-6">
//             <button
//               onClick={getHint}
//               disabled={loadingHint}
//               className="px-6 py-3 rounded-xl text-sm bg-[#cfe3ff] text-[#2563eb]"
//             >
//               {loadingHint ? "Thinking…" : "Get Hint"}
//             </button>

//             {hint && (
//               <div className="bg-white border border-black/10 rounded-xl p-6 text-sm">
//                 {hint}
//               </div>
//             )}
//           </div>

//           <div className="bg-[#edf4ff] border border-black/10 rounded-2xl">
//             <div
//               className="flex items-center justify-between px-8 py-5 cursor-pointer"
//               onClick={() => setSolutionOpen(v => !v)}
//             >
//               <div className="flex items-center gap-3 text-sm font-medium text-[#2563eb]">
//                 <FaCode /> Reference Solution
//               </div>
//               {solutionOpen ? <FaChevronUp /> : <FaChevronDown />}
//             </div>

//             {solutionOpen && (
//               <div className="bg-white border-t border-black/10 px-8 py-6">
//                 <SolutionGate problemId={problem._id} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="w-1/2 flex flex-col bg-[#f4f8ff]">

//         <div className="h-16 flex items-center justify-between px-12 border-b border-black/10">
//           <div className="relative">
//             <select
//               value={language}
//               onChange={e => setLanguage(e.target.value)}
//               className="bg-transparent text-sm pr-8 outline-none"
//             >
//               <option value="python">Python</option>
//               <option value="java">Java</option>
//               <option value="cpp">C++</option>
//             </select>
//             <FaChevronDown className="absolute right-0 top-2 text-xs text-[#64748b]" />
//           </div>

//           <div className="flex gap-4">
//             <button className="px-6 py-3 rounded-xl border border-black/10 text-sm flex items-center gap-2">
//               <FaPlay /> Run
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={submitting}
//               className={`px-8 py-3 rounded-xl text-sm text-white flex items-center gap-2 ${
//                 submitting ? "bg-[#93c5fd]" : "bg-[#2563eb]"
//               }`}
//             >
//               <FaCloudUploadAlt /> Submit
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 relative overflow-hidden">
//           <Editor
//             height="100%"
//             language={language === "cpp" ? "cpp" : language}
//             value={code}
//             onChange={v => setCode(v || "")}
//             theme="vs-light"
//             options={{
//               fontSize: 14,
//               minimap: { enabled: false },
//               automaticLayout: true,
//               padding: { top: 24, bottom: 24 }
//             }}
//           />

//           {/* TEST CASES OVERLAY */}
//           <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
//             <div className="pointer-events-auto bg-[#edf4ff] border-t border-black/10">

//               <div
//                 className="h-3 cursor-row-resize"
//                 onMouseDown={startDrag}
//               />

//               <div
//                 className="h-14 flex items-center justify-between px-10 cursor-pointer"
//                 onClick={() => setTestPanelOpen(v => !v)}
//               >
//                 <span className="text-sm font-medium text-[#2563eb]">
//                   Test Cases
//                 </span>
//                 {testPanelOpen ? <FaChevronDown /> : <FaChevronUp />}
//               </div>

//               <div
//                 className={`transition-all duration-300 overflow-hidden ${
//                   testPanelOpen ? "opacity-100" : "opacity-0"
//                 }`}
//                 style={{ height: testPanelOpen ? panelHeight : 0 }}
//               >
//                 <div className="h-full overflow-y-auto px-10 pb-6 space-y-3 text-sm">

//                   {message && (
//                     <div
//                       className={`font-medium ${
//                         message === "Accepted"
//                           ? "text-[#16a34a]"
//                           : message === "Running test cases"
//                           ? "text-[#2563eb]"
//                           : "text-[#dc2626]"
//                       }`}
//                     >
//                       {message}
//                     </div>
//                   )}

//                   {submissions.map(sub => (
//                     <div
//                       key={sub._id}
//                       className="bg-white border border-black/10 rounded-lg p-4 flex justify-between"
//                     >
//                       <span
//                         className={`font-medium ${
//                           sub.verdict === "Accepted"
//                             ? "text-[#16a34a]"
//                             : sub.verdict === "Pending"
//                             ? "text-[#ca8a04]"
//                             : "text-[#dc2626]"
//                         }`}
//                       >
//                         {sub.verdict}
//                       </span>
//                       <span className="text-xs text-[#64748b]">
//                         {new Date(sub.createdAt).toLocaleTimeString()}
//                       </span>
//                     </div>
//                   ))}

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </main>
//   );
// }
























"use client";

import { useEffect, useRef, useState, use } from "react";
import api from "../../../lib/api-client";
import Editor from "@monaco-editor/react";
import SolutionGate from "../../../components/solutions/SolutionGate";
import {
  FaCode,
  FaPlay,
  FaCloudUploadAlt,
  FaLightbulb,
  FaHistory,
  FaCheckCircle,
  FaList,
  FaChevronUp,
  FaChevronDown
} from "react-icons/fa";

export default function ProblemDetail({ params }) {
  const { slug } = use(params);
  const [problem, setProblem] = useState(null);

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const [submissions, setSubmissions] = useState([]);
  const [polling, setPolling] = useState(false);

  const [hint, setHint] = useState(null);
  const [loadingHint, setLoadingHint] = useState(false);

  const [testPanelOpen, setTestPanelOpen] = useState(true);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [bottomView, setBottomView] = useState("tests");

  const [panelHeight, setPanelHeight] = useState(260);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!slug) return;
    api.get(`/api/problems/${slug}`).then(res => setProblem(res.data));
  }, [slug]);

  useEffect(() => {
    if (!problem?._id) return;
    api.get(`/api/submissions/problem/${problem._id}`).then(res =>
      setSubmissions(res.data)
    );
  }, [problem]);

  useEffect(() => {
    if (!polling || !problem?._id) return;
    const interval = setInterval(async () => {
      const res = await api.get(`/api/submissions/problem/${problem._id}`);
      setSubmissions(res.data);
      if (res.data[0]?.verdict !== "Pending") {
        setPolling(false);
        setMessage(res.data[0]?.verdict);
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [polling, problem]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setMessage("Running test cases");
      setBottomView("tests");
      await api.post("/api/submissions", {
        problemSlug: slug,
        language,
        code
      });
      setPolling(true);
    } catch {
      setMessage("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const getHint = async () => {
    try {
      setLoadingHint(true);
      const res = await api.post("/api/ai/hint", {
        problemId: problem._id,
        language,
        code
      });
      setHint(res.data.hint);
    } catch {
      setHint("No hints remaining");
    } finally {
      setLoadingHint(false);
    }
  };

  const startDrag = () => (draggingRef.current = true);
  const stopDrag = () => (draggingRef.current = false);

  const onDrag = e => {
    if (!draggingRef.current) return;
    setPanelHeight(h =>
      Math.min(420, Math.max(120, h - e.movementY))
    );
  };

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, []);

  useEffect(() => {
    if (problem?.starterCode?.[language]) {
      setCode(problem.starterCode[language]);
    }
  }, [problem, language]);

  if (!problem)
    return (
      <div className="h-screen flex items-center justify-center bg-[#eaf1fb] text-[#2563eb]">
        Loading…
      </div>
    );

  return (
    <main className="h-screen w-full flex bg-[#eaf1fb] text-[#0f172a] overflow-hidden">

      <div className="w-1/2 min-w-[480px] flex flex-col bg-[#f4f8ff] border-r border-black/10">

        <div className="h-16 flex items-end px-12 border-b border-black/10">
          <div className="flex gap-12 text-sm font-medium pb-3">
            <div
              onClick={() => setBottomView("tests")}
              className="flex items-center gap-2 text-[#2563eb] border-b-2 border-[#2563eb] pb-2 cursor-pointer"
            >
              <FaList /> Description
            </div>
            <div
              onClick={() => setBottomView("submissions")}
              className="flex items-center gap-2 text-[#64748b] cursor-pointer"
            >
              <FaHistory /> Submissions
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-12 py-12 space-y-14">

          <div>
            <h1 className="text-3xl font-semibold mb-4">{problem.title}</h1>
            <div className="flex items-center gap-4">
              <span className="px-4 py-1 text-xs rounded-full bg-[#dbeafe] text-[#2563eb]">
                {problem.difficulty}
              </span>
              <span className="text-xs text-[#16a34a] flex items-center gap-1">
                <FaCheckCircle /> Solved
              </span>
            </div>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-10">
            <pre className="whitespace-pre-wrap text-sm leading-7">
              {problem.description}
            </pre>
          </div>

          <div className="space-y-6">
            <button
              onClick={getHint}
              disabled={loadingHint}
              className="px-6 py-3 rounded-xl text-sm bg-[#cfe3ff] text-[#2563eb]"
            >
              {loadingHint ? "Thinking…" : "Get Hint"}
            </button>

            {hint && (
              <div className="bg-white border border-black/10 rounded-xl p-6 text-sm">
                {hint}
              </div>
            )}
          </div>

          <div className="bg-[#edf4ff] border border-black/10 rounded-2xl">
            <div
              className="flex items-center justify-between px-8 py-5 cursor-pointer"
              onClick={() => setSolutionOpen(v => !v)}
            >
              <div className="flex items-center gap-3 text-sm font-medium text-[#2563eb]">
                <FaCode /> Reference Solution
              </div>
              {solutionOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {solutionOpen && (
              <div className="bg-white border-t border-black/10 px-8 py-6">
                <SolutionGate problemId={problem._id} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col bg-[#f4f8ff]">

        <div className="h-20 flex items-center justify-between px-12 border-b border-black/10">
          <div className="relative">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-transparent text-sm pr-8 outline-none"
            >
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <FaChevronDown className="absolute right-0 top-2 text-xs text-[#64748b]" />
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl border border-black/10 text-sm flex items-center gap-2">
              <FaPlay /> Run
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`px-8 py-3 rounded-xl text-sm text-white flex items-center gap-2 ${
                submitting ? "bg-[#93c5fd]" : "bg-[#2563eb]"
              }`}
            >
              <FaCloudUploadAlt /> Submit
            </button>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <Editor
            height="100%"
            language={language === "cpp" ? "cpp" : language}
            value={code}
            onChange={v => setCode(v || "")}
            theme="vs-light"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
              padding: { top: 24, bottom: 24 }
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <div className="pointer-events-auto bg-[#edf4ff] border-t border-black/10">

              <div className="h-3 cursor-row-resize" onMouseDown={startDrag} />

              <div
                className="h-14 flex items-center justify-between px-10 cursor-pointer"
                onClick={() => setTestPanelOpen(v => !v)}
              >
                <span className="text-sm font-medium text-[#2563eb]">
                  {bottomView === "tests" ? "Test Cases" : "Submissions"}
                </span>
                {testPanelOpen ? <FaChevronDown /> : <FaChevronUp />}
              </div>

              <div
                className="transition-all duration-300 overflow-hidden"
                style={{ height: testPanelOpen ? panelHeight : 0 }}
              >
                <div className="h-full overflow-y-auto px-10 pb-6 space-y-3 text-sm">

                  {bottomView === "tests" && (
                    <>
                      {message && (
                        <div
                          className={`font-medium ${
                            message === "Accepted"
                              ? "text-[#16a34a]"
                              : message === "Running test cases"
                              ? "text-[#2563eb]"
                              : "text-[#dc2626]"
                          }`}
                        >
                          {message}
                        </div>
                      )}

                      {submissions.slice(0, 1).map(sub => (
                        <div
                          key={sub._id}
                          className="bg-white border border-black/10 rounded-lg p-4 flex justify-between"
                        >
                          <span
                            className={`font-medium ${
                              sub.verdict === "Accepted"
                                ? "text-[#16a34a]"
                                : sub.verdict === "Pending"
                                ? "text-[#ca8a04]"
                                : "text-[#dc2626]"
                            }`}
                          >
                            {sub.verdict}
                          </span>
                          <span className="text-xs text-[#64748b]">
                            Latest submission
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                  {bottomView === "submissions" && (
                    <>
                      {submissions.length === 0 && (
                        <div className="text-sm text-[#64748b]">
                          No submissions yet.
                        </div>
                      )}

                      {submissions.map(sub => (
                        <div
                          key={sub._id}
                          className="bg-white border border-black/10 rounded-lg p-4 flex justify-between"
                        >
                          <span
                            className={`font-medium ${
                              sub.verdict === "Accepted"
                                ? "text-[#16a34a]"
                                : sub.verdict === "Pending"
                                ? "text-[#ca8a04]"
                                : "text-[#dc2626]"
                            }`}
                          >
                            {sub.verdict}
                          </span>
                          <span className="text-xs text-[#64748b]">
                            {new Date(sub.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}














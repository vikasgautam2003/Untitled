







// "use client";

// import { useEffect, useState, use } from "react";
// import api from "../../../lib/api-client";

// export default function ProblemDetail({ params }) {
//   const { slug } = use(params);
//   const [problem, setProblem] = useState(null);


//   const [language, setLanguage] = useState("python");
//   const [code, setCode] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState(null);


//   const [submissions, setSubmissions] = useState([]);
//   const [loadingSubs, setLoadingSubs] = useState(false);


//   useEffect(() => {
//     if (!slug) return;

//     api.get(`/problems/${slug}`)
//       .then(res => setProblem(res.data));
//   }, [slug]);



//   useEffect(() => {
//   if (!problem?._id) return;

//   const fetchSubmissions = async () => {
//     try {
//       setLoadingSubs(true);
//       const res = await api.get(
//         `/submissions/problem/${problem._id}`
//       );
//       setSubmissions(res.data);
//     } catch (err) {
//       console.error("Failed to load submissions");
//     } finally {
//       setLoadingSubs(false);
//     }
//   };

//   fetchSubmissions();
// }, [problem]);


  

//   const handleSubmit = async () => {
//     try{

//       setSubmitting(true);
//       setMessage(null);

//       await api.post("/submissions", {
//         problemSlug: slug,
//         language,
//         code
//       })

//       setMessage("Submission received. Verdict: PENDING");
      
//       const res = await api.get(`/submissions/problem/${problem._id}`);
//       setSubmissions(res.data);

//     } catch (err) {
//       setMessage("Submission failed");
//     } finally {
//       setSubmitting(false);
//     }
//   }



//   if (!problem) return <p>Loading...</p>;

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px" }}>
//       <h1>{problem.title}</h1>
//       <p>Difficulty: {problem.difficulty}</p>

//       <section>
//         <h3>Description</h3>
//         <pre>{problem.description}</pre>
//       </section>

//       <section>
//         <h3>Examples</h3>
//         {problem.examples?.map((e, i) => (
//           <div key={i}>
//             <p>Input: {e.input}</p>
//             <p>Output: {e.output}</p>
//           </div>
//         ))}
//       </section>

//       <section className="border-t pt-6 space-y-4">
//         <h3 className="text-lg font-semibold">Your Code</h3>

//         <select
//           value={language}
//           onChange={e => setLanguage(e.target.value)}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//           <option value="cpp">C++</option>
//         </select>

//         <textarea
//           value={code}
//           onChange={e => setCode(e.target.value)}
//           rows={12}
//           className="w-full border rounded p-2 font-mono"
//           placeholder="Write your code here..."
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={submitting}
//           className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
//         >
//           {submitting ? "Submitting..." : "Submit"}
//         </button>

//         {message && (
//           <p className="text-sm text-gray-600">{message}</p>
//         )}
//       </section>

//       <section className="border-t pt-6">
//   <h3 className="text-lg font-semibold mb-3">
//     Submission History
//   </h3>

//   {loadingSubs && (
//     <p className="text-sm text-gray-500">Loading...</p>
//   )}

//   {!loadingSubs && submissions.length === 0 && (
//     <p className="text-sm text-gray-500">
//       No submissions yet.
//     </p>
//   )}

//   <ul className="space-y-2">
//     {submissions.map(sub => (
//       <li
//         key={sub._id}
//         className="flex justify-between border rounded px-3 py-2 text-sm"
//       >
//         <span>
//           {new Date(sub.createdAt).toLocaleString()}
//         </span>

//         <span className="font-mono">
//           {sub.language}
//         </span>

//         <span className="font-semibold text-yellow-600">
//           {sub.verdict}
//         </span>
//       </li>
//     ))}
//   </ul>
// </section>


//       <section>
//         <h3>🚧 AI Hints (Coming Soon)</h3>
//       </section>

//     </main>
//   );
// }













"use client";

import { useEffect, useState, use } from "react";
import api from "../../../lib/api-client";
import Editor from "@monaco-editor/react";
import SolutionGate from "../../../components/solutions/SolutionGate";


export default function ProblemDetail({ params }) {
  const { slug } = use(params);
  const [problem, setProblem] = useState(null);

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [polling, setPolling] = useState(false);

  const [hint, setHint] = useState(null);
  const [hintMeta, setHintMeta] = useState(null);
  const [loadingHint, setLoadingHint] = useState(false);


  useEffect(() => {
    if (!slug) return;
    api.get(`/api/problems/${slug}`).then(res => setProblem(res.data));
  }, [slug]);

  useEffect(() => {
    if (!problem?._id) return;

    const fetchSubmissions = async () => {
      setLoadingSubs(true);
      const res = await api.get(`/api/submissions/problem/${problem._id}`);
      setSubmissions(res.data);
      setLoadingSubs(false);
    };

    fetchSubmissions();
  }, [problem]);


  useEffect(() => {
  if (!polling || !problem?._id) return;

  const interval = setInterval(async () => {
    try {
      const res = await api.get(`/api/submissions/problem/${problem._id}`);
      setSubmissions(res.data);

      const latest = res.data[0];
      if (latest && latest.verdict !== "Pending") {
        setPolling(false);
        clearInterval(interval);
      }
    } catch (err) {
      console.error("Polling failed");
    }
  }, 2000);

  return () => clearInterval(interval);
}, [polling, problem]);



  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setMessage(null);

      await api.post("/api/submissions", {
        problemSlug: slug,
        language,
        code
      });

      setMessage("Submission received. Verdict: PENDING");
      setPolling(true);


      const res = await api.get(`/api/submissions/problem/${problem._id}`);
      setSubmissions(res.data);
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
    setHintMeta({ level: res.data.level, remaining: res.data.remaining });
  } catch (e) {
    setHint("No more hints available.");
  } finally {
    setLoadingHint(false);
  }
};




  useEffect(() => {
  if (problem?.starterCode?.[language]) {
    setCode(problem.starterCode[language]);
  }
}, [problem, language]);



  if (!problem) return <p>Loading...</p>;

  return (
    <main style={{ padding: "2rem", maxWidth: "800px" }}>
      <h1>{problem.title}</h1>
      <p>Difficulty: {problem.difficulty}</p>

      <section>
        <h3>Description</h3>
        <pre>{problem.description}</pre>
      </section>

      <section className="border-t pt-6 space-y-4">
        <h3>Your Code</h3>

        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <Editor
          height="400px"
          language={
            language === "cpp" ? "cpp" :
            language === "java" ? "java" :
            "python"
          }
          value={code}
          onChange={value => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true
          }}
        />

        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {message && <p>{message}</p>}
      </section>

      <section className="border-t pt-6">
        <h3>Submission History</h3>

        {loadingSubs && <p>Loading...</p>}

        {submissions.map(sub => (
          <div key={sub._id} style={{ border: "1px solid #ccc", marginBottom: 12, padding: 10 }}>
            <div>
              {new Date(sub.createdAt).toLocaleString()} — {sub.language} — {sub.verdict}
            </div>

            {Array.isArray(sub.testResults) && (
              <ul>
                {sub.testResults.map(tr => (
                  <li key={tr.index}>
                    Test {tr.index + 1}: {tr.passed ? "✅ Passed" : "❌ Failed"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
      
      <section className="border-t pt-6">
  <button onClick={getHint} disabled={loadingHint}>
    {loadingHint ? "Thinking..." : "Get Hint"}
  </button>

  {hint && (
    <div className="mt-3">
      <pre className="p-3 bg-gray-100 rounded whitespace-pre-wrap">{hint}</pre>
      {hintMeta && (
        <div className="text-sm text-gray-600 mt-1">
          Hint {hintMeta.level} of 3 · {hintMeta.remaining} remaining
        </div>
      )}
    </div>
  )}
</section>
<section className="mt-10">
  <h2 className="text-xl font-semibold mb-3">
    Optimal Solution
  </h2>

  <SolutionGate problemId={problem._id} />
</section>



    </main>
  );
}

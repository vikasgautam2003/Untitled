// "use client";

// import { useEffect, useState } from "react";
// import api from "../../../lib/api-client";


// export default function ProblemDetail({ params }) {
//     const { slug } = params;
//     const [problem, setProblem] = useState(null);

//     useEffect(() => {
//     api.get(`/problems/${slug}`)
//       .then(res => setProblem(res.data));
//     }, [slug]);


//     if (!problem) return <p>Loading...</p>;

//     return (
//     <main style={{ padding: "2rem", maxWidth: "800px" }}>
//       <h1>{problem.title}</h1>
//       <p>Difficulty: {problem.difficulty}</p>

//       <section>
//         <h3>Description</h3>
//         <pre>{problem.description}</pre>
//       </section>

//       <section>
//         <h3>Examples</h3>
//         {problem.examples.map((e, i) => (
//           <div key={i}>
//             <p>Input: {e.input}</p>
//             <p>Output: {e.output}</p>
//           </div>
//         ))}
//       </section>

//       <section>
//         <h3>🚧 Code Editor (Coming Soon)</h3>
//       </section>

//       <section>
//         <h3>🚧 AI Hints (Coming Soon)</h3>
//       </section>
//     </main>
//   );
// }









"use client";

import { useEffect, useState, use } from "react";
import api from "../../../lib/api-client";

export default function ProblemDetail({ params }) {
  const { slug } = use(params);
  const [problem, setProblem] = useState(null);


  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);


  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);


  useEffect(() => {
    if (!slug) return;

    api.get(`/problems/${slug}`)
      .then(res => setProblem(res.data));
  }, [slug]);



  useEffect(() => {
  if (!problem?._id) return;

  const fetchSubmissions = async () => {
    try {
      setLoadingSubs(true);
      const res = await api.get(
        `/submissions/problem/${problem._id}`
      );
      setSubmissions(res.data);
    } catch (err) {
      console.error("Failed to load submissions");
    } finally {
      setLoadingSubs(false);
    }
  };

  fetchSubmissions();
}, [problem]);


  

  const handleSubmit = async () => {
    try{

      setSubmitting(true);
      setMessage(null);

      await api.post("/submissions", {
        problemSlug: slug,
        language,
        code
      })

      setMessage("Submission received. Verdict: PENDING");
      
      const res = await api.get(`/submissions/problem/${problem._id}`);
      setSubmissions(res.data);

    } catch (err) {
      setMessage("Submission failed");
    } finally {
      setSubmitting(false);
    }
  }



  if (!problem) return <p>Loading...</p>;

  return (
    <main style={{ padding: "2rem", maxWidth: "800px" }}>
      <h1>{problem.title}</h1>
      <p>Difficulty: {problem.difficulty}</p>

      <section>
        <h3>Description</h3>
        <pre>{problem.description}</pre>
      </section>

      <section>
        <h3>Examples</h3>
        {problem.examples?.map((e, i) => (
          <div key={i}>
            <p>Input: {e.input}</p>
            <p>Output: {e.output}</p>
          </div>
        ))}
      </section>

      <section className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold">Your Code</h3>

        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={12}
          className="w-full border rounded p-2 font-mono"
          placeholder="Write your code here..."
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p className="text-sm text-gray-600">{message}</p>
        )}
      </section>

      <section className="border-t pt-6">
  <h3 className="text-lg font-semibold mb-3">
    Submission History
  </h3>

  {loadingSubs && (
    <p className="text-sm text-gray-500">Loading...</p>
  )}

  {!loadingSubs && submissions.length === 0 && (
    <p className="text-sm text-gray-500">
      No submissions yet.
    </p>
  )}

  <ul className="space-y-2">
    {submissions.map(sub => (
      <li
        key={sub._id}
        className="flex justify-between border rounded px-3 py-2 text-sm"
      >
        <span>
          {new Date(sub.createdAt).toLocaleString()}
        </span>

        <span className="font-mono">
          {sub.language}
        </span>

        <span className="font-semibold text-yellow-600">
          {sub.verdict}
        </span>
      </li>
    ))}
  </ul>
</section>


      <section>
        <h3>🚧 AI Hints (Coming Soon)</h3>
      </section>

    </main>
  );
}

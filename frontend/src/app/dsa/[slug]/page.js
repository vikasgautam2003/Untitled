"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api-client";


export default function ProblemDetail({ params }) {
    const { slug } = params;
    const [problem, setProblem] = useState(null);

    useEffect(() => {
    api.get(`/problems/${slug}`)
      .then(res => setProblem(res.data));
    }, [slug]);


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
        {problem.examples.map((e, i) => (
          <div key={i}>
            <p>Input: {e.input}</p>
            <p>Output: {e.output}</p>
          </div>
        ))}
      </section>

      <section>
        <h3>🚧 Code Editor (Coming Soon)</h3>
      </section>

      <section>
        <h3>🚧 AI Hints (Coming Soon)</h3>
      </section>
    </main>
  );
}
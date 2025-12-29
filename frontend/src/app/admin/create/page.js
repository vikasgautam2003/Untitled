// "use client";

// import { useState } from "react";
// import api from "../../../lib/api-client";

// export default function CreateProblem() {
//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     topic: "ARRAYS",
//     difficulty: "EASY",
//     description: ""
//   });

//   const submit = async () => {
//     await api.post("/problems", form);
//     alert("Problem created");
//   };

//   return (
//     <main style={{ padding: 20 }}>
//       <h2>Create Problem</h2>

//       <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
//       <input placeholder="Slug" onChange={e => setForm({ ...form, slug: e.target.value })} />

//       <select onChange={e => setForm({ ...form, topic: e.target.value })}>
//         <option>ARRAYS</option>
//         <option>STRINGS</option>
//         <option>GRAPH</option>
//         <option>DP</option>
//       </select>

//       <select onChange={e => setForm({ ...form, difficulty: e.target.value })}>
//         <option>EASY</option>
//         <option>MEDIUM</option>
//         <option>HARD</option>
//       </select>

//       <textarea
//         placeholder="Description"
//         onChange={e => setForm({ ...form, description: e.target.value })}
//       />

//       <button onClick={submit}>Create</button>
//     </main>
//   );
// }







"use client";

import { useState } from "react";
import api from "../../../lib/api-client";

export default function CreateProblem() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    topic: "ARRAYS",
    difficulty: "EASY",
    description: "",
    testCases: [{ stdin: "", expectedOutput: "" }]
  });

  const updateTestCase = (i, field, value) => {
    const next = [...form.testCases];
    next[i][field] = value;
    setForm({ ...form, testCases: next });
  };

  const addTestCase = () => {
    setForm({
      ...form,
      testCases: [...form.testCases, { stdin: "", expectedOutput: "" }]
    });
  };

  const removeTestCase = i => {
    setForm({
      ...form,
      testCases: form.testCases.filter((_, idx) => idx !== i)
    });
  };

  const submit = async () => {
    await api.post("/problems", form);
    alert("Problem created");
  };

  return (
    <main style={{ padding: 20, maxWidth: 800 }}>
      <h2>Create Problem</h2>

      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Slug" onChange={e => setForm({ ...form, slug: e.target.value })} />

      <select onChange={e => setForm({ ...form, topic: e.target.value })}>
        <option>ARRAYS</option>
        <option>STRINGS</option>
        <option>GRAPH</option>
        <option>DP</option>
      </select>

      <select onChange={e => setForm({ ...form, difficulty: e.target.value })}>
        <option>EASY</option>
        <option>MEDIUM</option>
        <option>HARD</option>
      </select>

      <textarea
        placeholder="Description"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <h3>Test Cases</h3>

      {form.testCases.map((tc, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <textarea
            placeholder="stdin"
            value={tc.stdin}
            onChange={e => updateTestCase(i, "stdin", e.target.value)}
          />
          <textarea
            placeholder="expected output"
            value={tc.expectedOutput}
            onChange={e => updateTestCase(i, "expectedOutput", e.target.value)}
          />
          <button onClick={() => removeTestCase(i)}>Remove</button>
        </div>
      ))}

      <button onClick={addTestCase}>Add Test Case</button>
      <br /><br />
      <button onClick={submit}>Create</button>
    </main>
  );
}

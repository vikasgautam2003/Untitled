"use client";

import { useState } from "react";
import api from "../../../lib/api-client";

export default function CreateProblem() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    topic: "ARRAYS",
    difficulty: "EASY",
    description: ""
  });

  const submit = async () => {
    await api.post("/problems", form);
    alert("Problem created");
  };

  return (
    <main style={{ padding: 20 }}>
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

      <button onClick={submit}>Create</button>
    </main>
  );
}

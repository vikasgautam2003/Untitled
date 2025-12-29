"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api-client";

export default function AdminProblems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    api.get("/problems").then(res => setProblems(res.data));
  }, []);

  const del = async (id) => {
    await api.delete(`/problems/${id}`);
    setProblems(p => p.filter(x => x._id !== id));
  };

  return (
    <main style={{ padding: 20 }}>
      <h2>All Problems</h2>

      {problems.map(p => (
        <div key={p._id}>
          {p.title} ({p.topic})
          <button onClick={() => del(p._id)}>Delete</button>
        </div>
      ))}
    </main>
  );
}

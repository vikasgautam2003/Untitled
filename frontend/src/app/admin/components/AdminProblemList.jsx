"use client";

import { useEffect, useState } from "react";
import AdminProblemRow from "./AdminProblemRow";

export default function AdminProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/problems`)
      .then(res => res.json())
      .then(data => setProblems(data));
  }, []);

  const handleDeleted = (id) => {
    setProblems(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Manage Problems
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">Title</th>
            <th>Topic</th>
            <th>Difficulty</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {problems.map(problem => (
            <AdminProblemRow
              key={problem._id}
              problem={problem}
              onDeleted={handleDeleted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

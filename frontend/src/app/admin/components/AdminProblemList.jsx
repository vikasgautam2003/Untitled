// "use client";

// import { useEffect, useState } from "react";
// import AdminProblemRow from "./AdminProblemRow";

// export default function AdminProblemList() {
//   const [problems, setProblems] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/problems`)
//       .then(res => res.json())
//       .then(data => setProblems(data));
//   }, []);

//   const handleDeleted = (id) => {
//     setProblems(prev => prev.filter(p => p._id !== id));
//   };

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">
//         Manage Problems
//       </h2>

//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="border-b text-left">
//             <th className="py-2">Title</th>
//             <th>Topic</th>
//             <th>Difficulty</th>
//             <th className="text-right">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {problems.map(problem => (
//             <AdminProblemRow
//               key={problem._id}
//               problem={problem}
//               onDeleted={handleDeleted}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import AdminProblemRow from "./AdminProblemRow";

export default function AdminProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/problems`)
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDeleted = (id) => {
    setProblems((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="w-full">
      {/* List Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Manage Problems
        </h2>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
          {problems.length} Total
        </span>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-gray-50 text-xs uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Title
                </th>
                <th scope="col" className="px-6 py-4">
                  Topic
                </th>
                <th scope="col" className="px-6 py-4">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                // Loading Skeletons
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-gray-100 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-gray-100 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-100 rounded"></div>
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : problems.length > 0 ? (
                // Data Rows
                problems.map((problem) => (
                  <AdminProblemRow
                    key={problem._id}
                    problem={problem}
                    onDeleted={handleDeleted}
                  />
                ))
              ) : (
                // Empty State
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-400 italic bg-gray-50/30"
                  >
                    No problems found. Start by creating one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
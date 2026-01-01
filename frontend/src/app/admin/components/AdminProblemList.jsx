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
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Manage Problems
        </h2>
        <span className="text-xs font-medium text-slate-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
          {problems.length} Total
        </span>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-[#0B1121]/40 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-slate-300">
              <tr>
                <th scope="col" className="px-6 py-4 tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-4 tracking-wider">
                  Topic
                </th>
                <th scope="col" className="px-6 py-4 tracking-wider">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-4 text-right tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-white/5 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-white/5 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-white/5 rounded"></div>
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : problems.length > 0 ? (
                problems.map((problem) => (
                  <AdminProblemRow
                    key={problem._id}
                    problem={problem}
                    onDeleted={handleDeleted}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 italic">
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
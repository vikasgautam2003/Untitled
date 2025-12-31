// "use client";

// import { useEffect, useState } from "react";
// import api from "../../../../lib/api-client";
// import Link from "next/link";

// export default function TopicProblems({ params }) {
//   const { topic } = params;
//   const [problems, setProblems] = useState([]);

//   useEffect(() => {
//     api.get(`/problems/topic/${topic}`)
//       .then(res => setProblems(res.data));
//   }, [topic]);

//   return (
//     <main style={{ padding: "2rem" }}>
//       <h2>{topic.replace("_", " ")} Problems</h2>

//       <ul>
//         {problems.map(p => (
//           <li key={p._id}>
//             <Link href={`/dsa/${p.slug}`}>
//               {p.title}
//             </Link>
//             {" "}— {p.difficulty}
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }






"use client";

import { useEffect, useState, use } from "react";
import api from "../../../../lib/api-client";
import Link from "next/link";

export default function TopicProblems({ params }) {
  const { topic } = use(params);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    api.get(`/api/problems/topic/${topic}`)
      .then(res => setProblems(res.data));
  }, [topic]);

  return (
    <main style={{ padding: "2rem" }}>
      <h2>{topic.replaceAll("_", " ")} Problems</h2>

      <ul>
        {problems.map(p => (
          <li key={p._id}>
            <Link href={`/dsa/${p.slug}`}>
              {p.title}
            </Link>{" "}
            — {p.difficulty}
          </li>
        ))}
      </ul>
    </main>
  );
}

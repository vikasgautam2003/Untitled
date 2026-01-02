// "use client";

// import { useState } from "react";

// export default function ExplanationPanel({ data }) {
//   const [openIndex, setOpenIndex] = useState(null);

//   return (
//     <div className="space-y-6 text-sm leading-relaxed">

//       <div>
//         <strong>Category:</strong> {data.category}
//       </div>

//       <div>
//         <strong>What it is</strong>
//         <p>{data.simpleDefinition}</p>
//       </div>

//       <div>
//         <strong>Why it exists</strong>
//         <p>{data.whyItExists}</p>
//       </div>

//       <div>
//         <strong>How it works</strong>
//         <ul className="list-disc ml-5">
//           {data.howItWorks.map((h, i) => (
//             <li key={i}>{h}</li>
//           ))}
//         </ul>
//       </div>

//       {data.subConcepts && data.subConcepts.length > 0 && (
//         <div>
//           <strong>Key ideas (click to explore)</strong>
//           <ul className="mt-2 space-y-1">
//             {data.subConcepts.map((s, i) => (
//               <li key={i}>
//                 <button
//                   onClick={() =>
//                     setOpenIndex(openIndex === i ? null : i)
//                   }
//                   className="text-left text-blue-400 hover:underline"
//                 >
//                   {s.title}
//                 </button>

//                 {openIndex === i && (
//                   <p className="mt-1 ml-3 text-gray-300">
//                     {s.explanation}
//                   </p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div>
//         <strong>Common confusions</strong>
//         <ul className="list-disc ml-5">
//           {data.commonConfusions.map((c, i) => (
//             <li key={i}>{c}</li>
//           ))}
//         </ul>
//       </div>


//          {data.docExcerpts?.length > 0 && (
//         <div className="space-y-4">
//           <strong>From the official docs</strong>

//           {data.docExcerpts.map((d, i) => (
//             <div
//               key={i}
//               className="border border-gray-700 bg-[#0f0f0f] rounded p-3"
//             >
//               <div className="text-xs text-gray-400 mb-2">
//                 {d.source}
//               </div>

//               <blockquote className="border-l-2 border-gray-600 pl-3 text-gray-300 italic">
//   {Array.isArray(d.excerpt)
//     ? d.excerpt.join(" ")
//     : String(d.excerpt || "")}
// </blockquote>


//               <p className="mt-2 text-gray-200">
//                 {d.explanation}
//               </p>

//               <a
//                 href={d.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block mt-2 text-blue-400 hover:underline text-xs"
//               >
//                 Read more in docs ↗
//               </a>
//             </div>
//           ))}
//         </div>
//       )}

//       {data.whatIfScenarios?.length > 0 && (
//   <div className="space-y-3">
//     <strong>What if…</strong>

//     {data.whatIfScenarios.map((w) => (
//       <details
//         key={w.id}
//         className="border border-gray-700 rounded bg-[#0f0f0f] p-3"
//       >
//         <summary className="cursor-pointer text-blue-400 hover:underline">
//           {w.label}
//         </summary>

//         <p className="mt-2 text-gray-200">
//           {w.explanation}
//         </p>
//       </details>
//     ))}
//   </div>
// )}


//       {data.tinyExample && (
//         <div>
//           <strong>Small example</strong>
//           <pre className="mt-2 p-3 bg-[#111] border border-gray-700 rounded text-xs overflow-x-auto">
// {data.tinyExample}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }






































"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Lightbulb, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpRight,
  Code2,
  FileText
} from "lucide-react";

export default function ExplanationPanel({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20 font-sans text-gray-300">

      {/* HEADER SECTION */}
      <header className="border-b border-gray-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <BookOpen size={12} />
          {data.category}
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              What is it?
            </h3>
            <p className="text-xl leading-relaxed text-gray-200 font-medium">
              {data.simpleDefinition}
            </p>
          </div>
          
          <div className="bg-[#111] rounded-2xl p-6 border border-gray-800">
             <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-2 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-400" />
                Why it exists
             </h4>
             <p className="text-gray-400 leading-relaxed">
               {data.whyItExists}
             </p>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          How it works
        </h3>
        <ul className="grid gap-3">
          {data.howItWorks.map((h, i) => (
            <li key={i} className="flex gap-4 items-start group">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 text-gray-400 text-xs font-bold mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {i + 1}
              </span>
              <span className="text-lg text-gray-300 leading-7">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* KEY IDEAS (INTERACTIVE) */}
      {data.subConcepts && data.subConcepts.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Key Concepts</h3>
          <div className="grid gap-3">
            {data.subConcepts.map((s, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`
                    rounded-xl border transition-all duration-300 overflow-hidden
                    ${isOpen ? "bg-[#161616] border-blue-500/30" : "bg-[#111] border-gray-800 hover:border-gray-700 hover:bg-[#161616]"}
                  `}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between"
                  >
                    <span className={`font-semibold text-lg transition-colors ${isOpen ? "text-blue-400" : "text-gray-200"}`}>
                      {s.title}
                    </span>
                    {isOpen ? (
                        <ChevronUp className="text-blue-500" size={20} />
                    ) : (
                        <ChevronDown className="text-gray-500" size={20} />
                    )}
                  </button>

                  <div 
                    className={`px-5 text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {s.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* COMMON CONFUSIONS */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle size={24} className="text-gray-500" />
            Common Confusions
        </h3>
        <div className="bg-orange-900/10 rounded-2xl p-6 border border-orange-900/20">
          <ul className="space-y-3">
            {data.commonConfusions.map((c, i) => (
              <li key={i} className="flex gap-3 text-gray-300">
                <span className="text-orange-500 font-bold">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OFFICIAL DOCS */}
      {data.docExcerpts?.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-white">
            From the Official Docs
          </h3>

          <div className="grid gap-6">
            {data.docExcerpts.map((d, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-gray-800 bg-[#111] p-6 shadow-sm hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  <FileText size={14} />
                  {d.source}
                </div>

                <blockquote className="relative pl-4 border-l-2 border-blue-500 italic text-gray-400 mb-4">
                  "{Array.isArray(d.excerpt)
                    ? d.excerpt.join(" ")
                    : String(d.excerpt || "")}"
                </blockquote>

                <p className="text-gray-200 font-medium leading-relaxed mb-4">
                  {d.explanation}
                </p>

                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Read full documentation <ArrowUpRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WHAT IF SCENARIOS */}
      {data.whatIfScenarios?.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-white">
            "What If" Scenarios
          </h3>

          <div className="grid gap-4">
            {data.whatIfScenarios.map((w) => (
              <details
                key={w.id}
                className="group rounded-2xl border border-gray-800 bg-[#111] overflow-hidden open:border-blue-500/50 transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-200 hover:bg-[#1a1a1a] transition-colors list-none select-none">
                  <span>{w.label}</span>
                  <div className="text-gray-500 group-open:rotate-180 transition-transform duration-200">
                     <ChevronDown size={20} />
                  </div>
                </summary>

                <div className="px-5 pb-5 pt-0 text-gray-400 leading-relaxed border-t border-transparent group-open:border-gray-800 group-open:pt-4">
                  {w.explanation}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CODE EXAMPLE */}
      {data.tinyExample && (
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 size={24} className="text-gray-500" />
            Minimal Example
          </h3>
          <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-gray-800 bg-[#0d0d0d]">
             <div className="absolute top-0 left-0 right-0 h-8 bg-[#1f1f1f] flex items-center px-4 gap-1.5 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
             </div>
             <pre className="p-6 pt-12 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
                <code>{data.tinyExample}</code>
             </pre>
          </div>
        </section>
      )}

    </div>
  );
}
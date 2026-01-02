// import Link from "next/link";
// import ProgressBar from "./ProgressBar";

// export default function TopicCard({ data }) {
//     const  { topic, totalProblems, completedProblems } = data;


//     return (
//         <div style={{ border: "1px solid #333", padding: "1rem", borderRadius: "8px" }}>
//             <h3>{topic.replace("_", " ")}</h3>

//             <ProgressBar
//                 completed={completedProblems}
//                 total={totalProblems}
//             />

//             <p>{completedProblems} / {totalProblems} completed</p>

//             <Link href={`/dsa/topic/${topic}`}>
//                 View Problems →
//             </Link>
//        </div>
//   );
// }







import Link from "next/link";
import ProgressBar from "./ProgressBar";

export default function TopicCard({ data }) {
  const { topic, totalProblems, completedProblems } = data;
  const percentage = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

  return (
    <div className="group relative flex flex-col h-full p-6 bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5">
      
      {/* Decorative gradient blob on hover */}
      <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-600/20 transition-all duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 capitalize tracking-tight group-hover:text-blue-700 transition-colors">
                {topic.replace(/_/g, " ")}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Core Module</p>
            </div>
          </div>
          
          <div className={`text-xs font-bold px-2.5 py-1 rounded-full border ${percentage === 100 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
            {percentage}%
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="w-full opacity-90">
            {/* Note: Ensure ProgressBar supports light mode or has neutral styling */}
            <ProgressBar
              completed={completedProblems}
              total={totalProblems}
            />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Completion</span>
            <span className="font-mono text-slate-600">
              <span className="font-bold text-slate-900">{completedProblems}</span>
              <span className="text-slate-300 mx-1">/</span>
              {totalProblems}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <Link 
            href={`/dsa/topic/${topic}`}
            className="flex items-center justify-between w-full text-sm font-semibold text-slate-500 hover:text-blue-700 group/link transition-colors"
          >
            <span>Start Practice</span>
            <span className="p-1.5 rounded-lg bg-slate-50 group-hover/link:bg-blue-600 group-hover/link:text-white transition-all duration-300 transform group-hover/link:translate-x-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
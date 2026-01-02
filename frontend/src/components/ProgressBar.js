// export default function ProgressBar({ completed, total }) {
//   const percent = total === 0 ? 0 : (completed / total) * 100;

//   return (
//     <div style={{ background: "#222", borderRadius: "4px", height: "8px" }}>
//       <div
//         style={{
//           width: `${percent}%`,
//           background: "#4ade80",
//           height: "100%",
//           borderRadius: "4px"
//         }}
//       />
//     </div>
//   );
// }









export default function ProgressBar({ completed, total }) {
  const percent = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="h-2 w-full bg-[#0a0f1c] rounded-full overflow-hidden border border-white/5 relative group">
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] relative transition-all duration-1000 ease-out"
        style={{ width: `${percent}%` }}
      >
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>
    </div>
  );
}
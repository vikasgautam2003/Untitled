// "use client";

// export default function AdminProblemRow({ problem, onDeleted }) {
//   const handleDelete = async () => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${problem.title}"?\nThis action is irreversible.`
//     );

//     if (!confirmed) return;

//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/problems/${problem._id}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     if (!res.ok) {
//       alert("Failed to delete problem");
//       return;
//     }

//     onDeleted(problem._id);
//   };

//   return (
//     <tr className="border-b">
//       <td className="py-2">{problem.title}</td>
//       <td>{problem.topic}</td>
//       <td>{problem.difficulty}</td>
//       <td className="text-right">
//         <button
//           onClick={handleDelete}
//           className="text-red-500 hover:text-red-700 font-semibold"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// }





















"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function AdminProblemRow({ problem, onDeleted }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const performDelete = async () => {
    setIsDeleting(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/problems/${problem._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        showNotification("Failed to delete problem", "error");
        setIsDeleting(false);
        setShowConfirm(false);
        return;
      }

      onDeleted(problem._id);
    } catch {
      showNotification("An unexpected error occurred", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case "easy":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "hard":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  return (
    <>
      <tr className="hover:bg-white/5 transition-colors group relative">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-white">
            {problem.title}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-sm text-slate-400 bg-[#0B1121] px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
              {problem.topic}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getDifficultyColor(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={handleDeleteClick}
            className="text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-lg hover:bg-red-500/10"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </td>
      </tr>

      {mounted &&
        showConfirm &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-[#02040a]/80 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={handleCancel}
            />
            <div className="relative w-full max-w-md bg-[#0a0a0a] rounded-2xl border border-red-500/20 shadow-[0_0_50px_rgba(220,38,38,0.4)] overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 ring-1 ring-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Delete "{problem.title}"?
                </h3>

                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 mb-8 w-full">
                  <p className="text-sm text-red-200/80 font-medium">
                    Warning: This action is permanent. All data associated with
                    this problem will be wiped immediately.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={handleCancel}
                    disabled={isDeleting}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-white/5 text-slate-300 font-semibold hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={performDelete}
                    disabled={isDeleting}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 shadow-lg shadow-red-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Delete Forever"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {mounted &&
        notification &&
        createPortal(
          <div className="fixed top-6 right-6 z-[10000] bg-[#1a1a1a] border border-red-500/30 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 duration-300">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-sm">System Error</h4>
              <p className="text-xs text-red-200/70 mt-0.5">
                {notification.message}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

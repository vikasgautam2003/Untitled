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
import { Trash2, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react"; // Optional: using Lucide icons for consistency if available, otherwise SVGs are fine. Keeping SVGs for safety as per instruction.

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
        return "text-emerald-700 bg-emerald-50 border-emerald-200 ring-1 ring-emerald-600/20";
      case "medium":
        return "text-amber-700 bg-amber-50 border-amber-200 ring-1 ring-amber-600/20";
      case "hard":
        return "text-rose-700 bg-rose-50 border-rose-200 ring-1 ring-rose-600/20";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200 ring-1 ring-slate-400/20";
    }
  };

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors group relative">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-semibold text-slate-900">
            {problem.title}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-xs font-medium text-slate-600 bg-white px-2.5 py-1 rounded-md border border-gray-200 shadow-sm">
              {problem.topic}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getDifficultyColor(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={handleDeleteClick}
            className="text-slate-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-lg hover:bg-red-50"
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

      {/* CONFIRMATION MODAL */}
      {mounted &&
        showConfirm &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={handleCancel}
            />
            <div className="relative w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6 ring-4 ring-red-50">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                  Delete "{problem.title}"?
                </h3>

                <p className="text-slate-500 mb-6 text-sm">
                   Are you sure you want to delete this problem? This action cannot be undone and will remove the data from student dashboards.
                </p>

                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={handleCancel}
                    disabled={isDeleting}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-gray-300 text-slate-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={performDelete}
                    disabled={isDeleting}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-md shadow-red-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

      {/* NOTIFICATION TOAST */}
      {mounted &&
        notification &&
        createPortal(
          <div className="fixed top-6 right-6 z-[10000] bg-white border border-red-100 text-slate-800 px-5 py-4 rounded-xl shadow-lg flex items-start gap-4 animate-in slide-in-from-right-10 duration-300 max-w-sm">
            <div className="w-6 h-6 rounded-full bg-red-50 flex-shrink-0 flex items-center justify-center text-red-600 mt-0.5">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-sm text-red-700">System Error</h4>
              <p className="text-xs text-slate-500 mt-1">
                {notification.message}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
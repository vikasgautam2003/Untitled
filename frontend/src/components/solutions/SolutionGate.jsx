"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api-client";
import UnlockModal from "./UnlockModal";
import OptimalSolutionViewer from "./OptimalSolutionViewer";

export default function SolutionGate({ problemId }) {
  const [access, setAccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api
      .get(`/api/solutions/${problemId}/access`)
      .then(res => setAccess(res.data));
  }, [problemId]);

  if (!access) return null;

  if (!access.canView) {
    return (
      <>
        <div className="bg-[#edf4ff] border border-black/10 rounded-2xl px-8 py-7">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[#0f172a]">
              Optimal Solution
            </h3>

            <p className="text-sm text-[#64748b] leading-relaxed">
              The reference solution is locked.  
              Unlock it to review the optimal approach and learn the intended pattern.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition"
              >
                Unlock Solution
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <UnlockModal
            problemId={problemId}
            onUnlocked={() => setAccess({ ...access, canView: true })}
            onClose={() => setShowModal(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
      <OptimalSolutionViewer problemId={problemId} />
    </div>
  );
}

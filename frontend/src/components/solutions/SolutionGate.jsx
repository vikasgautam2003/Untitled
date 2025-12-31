"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api-client";
import UnlockModal from "./UnlockModal";
import OptimalSolutionViewer from "./OptimalSolutionViewer";

export default function SolutionGate({ problemId }) {
  const [access, setAccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get(`/api/solutions/${problemId}/access`)
      .then(res => setAccess(res.data));
  }, [problemId]);

  if (!access) return null;

  if (!access.canView) {
    return (
      <>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">🔒 Optimal Solution Locked</h3>
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Unlock Solution
          </button>
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

  return <OptimalSolutionViewer problemId={problemId} />;
}

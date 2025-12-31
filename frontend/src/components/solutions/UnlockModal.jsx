"use client";
import api from "../../lib/api-client";

export default function UnlockModal({ problemId, onUnlocked, onClose }) {
  const unlock = async () => {
    await api.post(`/api/solutions/${problemId}/unlock`);
    onUnlocked();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h3 className="font-semibold mb-2">
          Unlock Optimal Solution?
        </h3>
        <p className="text-sm mb-4">
          Unlocking early may reduce learning value.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={unlock}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

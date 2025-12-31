"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api-client";

export default function UserDashboard() {
  
  const [progress, setProgress] = useState(null);
  const [progressLoading, setProgressLoading] = useState(true);

  
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null); // success | error

 
  useEffect(() => {
    api
      .get("/api/user/progress/summary")
      .then(res => setProgress(res.data))
      .catch(() => setProgress(null))
      .finally(() => setProgressLoading(false));
  }, []);


  const requestAdmin = async () => {
    try {
      setRequestLoading(true);
      setRequestStatus(null);

      await api.post("/api/user/request-admin");

      setRequestStatus("success");
    } catch {
      setRequestStatus("error");
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
      
      <section className="border rounded-md p-4">
        <h2 className="text-sm font-semibold mb-2">Your Progress</h2>

        {progressLoading && (
          <p className="text-sm text-gray-500">Loading progress…</p>
        )}

        {!progressLoading && !progress && (
          <p className="text-sm text-red-600">
            Failed to load progress summary.
          </p>
        )}

        {progress && (
          <>
            <p className="text-sm text-gray-700">
              Solved{" "}
              <span className="font-semibold">
                {progress.totalSolved}
              </span>{" "}
              out of{" "}
              <span className="font-semibold">
                {progress.totalProblems}
              </span>{" "}
              problems
            </p>

            {progress.totalProblems === 0 && (
              <p className="mt-2 text-xs text-gray-500">
                Progress tracking will unlock after you start submitting
                solutions.
              </p>
            )}
          </>
        )}
      </section>

      {/* =============================
          Admin Request
      ============================= */}
      <section className="border rounded-md p-4">
        <h2 className="text-sm font-semibold mb-2">
          Admin Access
        </h2>

        <button
          onClick={requestAdmin}
          disabled={requestLoading || requestStatus === "success"}
          className={`
            w-full rounded-md px-4 py-2 text-sm font-medium
            transition-all duration-200
            ${
              requestLoading
                ? "bg-gray-400 cursor-not-allowed"
                : requestStatus === "success"
                ? "bg-green-600 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }
            text-white
          `}
        >
          {requestLoading
            ? "Submitting request..."
            : requestStatus === "success"
            ? "Request Submitted"
            : "Request Admin Access"}
        </button>

        {requestStatus === "success" && (
          <p className="mt-2 text-xs text-green-700">
            Your request has been sent to a Super Admin.
          </p>
        )}

        {requestStatus === "error" && (
          <p className="mt-2 text-xs text-red-600">
            Failed to submit request. Please try again later.
          </p>
        )}
      </section>
    </main>
  );
}

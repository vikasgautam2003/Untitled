"use client";

import CodeReviewPanel from "../../components/codeReview/CodeReviewPanel";

export default function CodeLabPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">
        Code Review Lab
      </h1>

      <p className="text-gray-600 mb-6">
        Paste your code and get a structured explanation,
        just like an interview code review.
      </p>

      <CodeReviewPanel />
    </main>
  );
}

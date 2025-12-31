"use client";

import { useState } from "react";

export default function ExplanationPanel({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-6 text-sm leading-relaxed">

      <div>
        <strong>Category:</strong> {data.category}
      </div>

      <div>
        <strong>What it is</strong>
        <p>{data.simpleDefinition}</p>
      </div>

      <div>
        <strong>Why it exists</strong>
        <p>{data.whyItExists}</p>
      </div>

      <div>
        <strong>How it works</strong>
        <ul className="list-disc ml-5">
          {data.howItWorks.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>

      {data.subConcepts && data.subConcepts.length > 0 && (
        <div>
          <strong>Key ideas (click to explore)</strong>
          <ul className="mt-2 space-y-1">
            {data.subConcepts.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  className="text-left text-blue-400 hover:underline"
                >
                  {s.title}
                </button>

                {openIndex === i && (
                  <p className="mt-1 ml-3 text-gray-300">
                    {s.explanation}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <strong>Common confusions</strong>
        <ul className="list-disc ml-5">
          {data.commonConfusions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      {data.tinyExample && (
        <div>
          <strong>Small example</strong>
          <pre className="mt-2 p-3 bg-[#111] border border-gray-700 rounded text-xs overflow-x-auto">
{data.tinyExample}
          </pre>
        </div>
      )}
    </div>
  );
}

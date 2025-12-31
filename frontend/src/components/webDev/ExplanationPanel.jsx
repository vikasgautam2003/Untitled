"use client";

export default function ExplanationPanel({ data }) {
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
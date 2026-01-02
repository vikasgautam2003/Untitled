"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CodeReviewViewer({ data }) {
  return (
    <div className="mt-16 space-y-16">

      <section className="rounded-2xl border border-slate-200 bg-slate-50 px-10 py-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
            1
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-slate-600">
            What does this code do?
          </div>
        </div>
        <div className="prose prose-slate max-w-4xl text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.summary}
          </ReactMarkdown>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white px-10 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
            2
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-slate-600">
            How does the code run?
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          {data.controlFlow.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="font-mono text-sm text-slate-500 mt-0.5">
                Step {i + 1}
              </div>
              <div className="prose prose-slate text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {step}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white px-10 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
            3
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-slate-600">
            What does each part mean?
          </div>
        </div>

        <div className="divide-y divide-slate-200 max-w-5xl">
          {data.lineByLine.map(l => (
            <div key={l.line} className="grid grid-cols-[100px_1fr] gap-6 py-5">
              <div className="font-mono text-sm text-slate-500">
                Line {l.line}
              </div>
              <div className="prose prose-slate text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {l.explanation}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white px-10 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
            4
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-slate-600">
            What happens when the code runs?
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          {data.dryRun.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                {i + 1}
              </div>
              <div className="prose prose-slate text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {step}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </section>

    <section className="rounded-2xl border border-slate-200 bg-slate-50 px-10 py-8">
  <div className="flex items-center gap-3 mb-8">
    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
      5
    </div>
    <div className="text-sm font-semibold uppercase tracking-widest text-slate-600">
      How efficient is the code?
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
    <div className="rounded-xl bg-white border border-slate-200 px-6 py-5 space-y-3">
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        Time Complexity
      </div>
      <div className="font-mono text-lg text-slate-800">
        {data.complexity.time}
      </div>
      <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
        <li>Measures how execution time grows</li>
        <li>Depends on the size of the input</li>
        <li>Lower growth means faster performance</li>
      </ul>
    </div>

    <div className="rounded-xl bg-white border border-slate-200 px-6 py-5 space-y-3">
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        Space Complexity
      </div>
      <div className="font-mono text-lg text-slate-800">
        {data.complexity.space}
      </div>
      <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
        <li>Measures extra memory usage</li>
        <li>Excludes the input itself</li>
        <li>Lower usage means better scalability</li>
      </ul>
    </div>
  </div>
</section>


      <section className="rounded-2xl border border-slate-200 bg-white px-10 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
            6
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-slate-600">
            When can this code break?
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          {data.edgeCases.map((e, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="h-2 w-2 rounded-full bg-slate-400 mt-2"></div>
              <div className="prose prose-slate text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {e}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white px-10 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
            7
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-slate-600">
            What should be improved?
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          {data.reviewNotes.map((n, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="h-2 w-2 rounded-full bg-slate-400 mt-2"></div>
              <div className="prose prose-slate text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {n}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

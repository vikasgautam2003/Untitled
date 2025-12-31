export default function CodeReviewViewer({ data }) {
  return (
    <div className="mt-6 space-y-6">
      <section>
        <h4 className="font-semibold">Summary</h4>
        <p>{data.summary}</p>
      </section>

      <section>
        <h4 className="font-semibold">Control Flow</h4>
        <ul>
          {data.controlFlow.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="font-semibold">Line by Line</h4>
        <ul>
          {data.lineByLine.map(l => (
            <li key={l.line}>
              <strong>Line {l.line}:</strong> {l.explanation}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="font-semibold">Dry Run</h4>
        <ol>
          {data.dryRun.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className="font-semibold">Complexity</h4>
        <p>Time: {data.complexity.time}</p>
        <p>Space: {data.complexity.space}</p>
      </section>

      <section>
        <h4 className="font-semibold">Edge Cases</h4>
        <ul>
          {data.edgeCases.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="font-semibold">Review Notes</h4>
        <ul>
          {data.reviewNotes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

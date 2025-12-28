export default function ProgressBar({ completed, total }) {
  const percent = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div style={{ background: "#222", borderRadius: "4px", height: "8px" }}>
      <div
        style={{
          width: `${percent}%`,
          background: "#4ade80",
          height: "100%",
          borderRadius: "4px"
        }}
      />
    </div>
  );
}

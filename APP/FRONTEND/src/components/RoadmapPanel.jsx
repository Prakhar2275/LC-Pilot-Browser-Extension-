export default function RoadmapPanel({ roadmap }) {
  if (!roadmap) return null;

  const lines = roadmap.split("\n").filter((l) => l.trim() !== "");

  return (
    <div className="rounded-lg border border-lc-border bg-lc-surface overflow-hidden">
      {/* new panel design to match LC */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-lc-border">
        <span className="w-1.5 h-1.5 rounded-full bg-lc-orange" />
        <span className="text-xs font-semibold text-lc-orange uppercase tracking-wider">
          Solving Roadmap
        </span>
      </div>
      <ul className="px-3 py-2 space-y-1.5">
        {lines.map((line, i) => (
          <li
            key={i}
            className="text-xs text-lc-text leading-relaxed flex gap-2"
          >
            <span className="text-lc-muted shrink-0 mt-0.5">›</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

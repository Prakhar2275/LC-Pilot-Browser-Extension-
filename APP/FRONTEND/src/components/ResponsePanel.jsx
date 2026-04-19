export default function ResponsePanel({ response, loading }) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-lc-muted text-xs py-2">
        <span className="w-3 h-3 rounded-full border-2 border-lc-orange border-t-transparent animate-spin" />
        LC Pilot is thinking...
      </div>
    );
  }

  if (!response) return null;

  const lines = response.split("\n").filter((l) => l.trim() !== "");

  return (
    <div className="rounded-lg border border-lc-border bg-lc-surface overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-lc-border">
        <span className="w-1.5 h-1.5 rounded-full bg-lc-green" />
        <span className="text-xs font-semibold text-lc-green uppercase tracking-wider">
          LC Buddy Says
        </span>
      </div>
      <div className="px-3 py-2 space-y-1.5">
        {lines.map((line, i) => (
          <p key={i} className="text-xs text-lc-text leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

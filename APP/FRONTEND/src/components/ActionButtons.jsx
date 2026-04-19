export default function ActionButtons({
  onAnalyze,
  onNextStep,
  onTest,
  loading,
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* code analysis button*/}
      <button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full py-2 rounded-lg text-xs font-semibold bg-lc-orange hover:bg-lc-orange-dark text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Analyze Code
      </button>

      {/* next stepp button */}
      <div className="flex gap-2">
        <button
          onClick={onNextStep}
          disabled={loading}
          className="flex-1 py-2 rounded-lg text-xs font-semibold bg-lc-surface hover:bg-lc-border border border-lc-border text-lc-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
        <button
          onClick={onTest}
          disabled={loading}
          className="flex-1 py-2 rounded-lg text-xs font-semibold bg-lc-surface hover:bg-lc-border border border-lc-border text-lc-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Test Code
        </button>
      </div>
    </div>
  );
}

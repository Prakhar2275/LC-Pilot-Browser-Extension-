import { useEffect, useState } from "react";
import {
  generateRoadmap,
  analyzeCode,
  getNextStep,
  testCode,
} from "./services/api";
import RoadmapPanel from "./components/RoadmapPanel";
import ResponsePanel from "./components/ResponsePanel";
import ActionButtons from "./components/ActionButtons";

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [roadmap, setRoadmap] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [problemTitle, setProblemTitle] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // for extraction of the data of the problem form the main page
    let attempts = 0;
    const tryLoad = () => {
      const problem = window.__LC_BUDDY_PROBLEM__;
      if (!problem && attempts < 15) {
        attempts++;
        setTimeout(tryLoad, 400);
        return;
      }
      if (!problem) {
        setError("Could not read problem. Refresh the page.");
        setReady(true);
        return;
      }
      setReady(true);
      setProblemTitle(problem.title);
      setLoading(true);
      generateRoadmap(problem.title, problem.description)
        .then((res) => {
          setSessionId(res.data.session_id);
          setRoadmap(res.data.roadmap);
        })
        .catch(() => setError("Backend not running? Start it on port 8000."))
        .finally(() => setLoading(false));
    };
    tryLoad();
  }, []);

  const getCode = () => window.__LC_BUDDY_CODE__ || "";

  const handleAnalyze = async () => {
    setLoading(true);
    setResponse("");
    setError("");
    try {
      setResponse((await analyzeCode(getCode(), sessionId)).data.message);
    } catch {
      setError("Analyze failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    if (!sessionId) {
      setError("Roadmap not loaded yet.");
      return;
    }
    setLoading(true);
    setResponse("");
    setError("");
    try {
      setResponse((await getNextStep(getCode(), sessionId)).data.message);
    } catch {
      setError("Next step failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    setLoading(true);
    setResponse("");
    setError("");
    try {
      setResponse((await testCode(getCode(), sessionId)).data.message);
    } catch {
      setError("Test failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-lc-bg text-lc-text overflow-hidden"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* header part */}
      <div className="shrink-0 flex items-center gap-2.5 px-4 py-3 bg-lc-surface border-b border-lc-border">
        <div className="w-7 h-7 rounded-lg bg-lc-orange flex items-center justify-center">
          <span className="text-white font-black text-xs">LC</span>
        </div>
        <span className="font-bold text-sm">Buddy</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-lc-green" />
          <span className="text-xs text-lc-muted">mentor mode</span>
        </div>
      </div>

      {/* problem title */}
      {problemTitle && (
        <div className="shrink-0 px-4 py-2 border-b border-lc-border">
          <p className="text-xs text-lc-muted truncate" title={problemTitle}>
            {problemTitle}
          </p>
        </div>
      )}

      {/* body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Welcome message — shown before roadmap loads */}
        {!roadmap && !error && (
          <div className="rounded-xl border border-lc-border bg-lc-surface px-4 py-5 text-center space-y-2">
            <div className="text-3xl">👋</div>
            <p className="text-sm font-semibold text-lc-text">
              Hi, I'm LC Buddy!
            </p>
            <p className="text-xs text-lc-muted leading-relaxed">
              I'm your coding mentor. I'll guide you step by step — no spoilers,
              just hints.
            </p>
            {loading && (
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="w-3 h-3 rounded-full border-2 border-lc-orange border-t-transparent animate-spin" />
                <span className="text-xs text-lc-muted">
                  Generating your roadmap...
                </span>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-800/40 bg-red-950/30 px-3 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        <RoadmapPanel roadmap={roadmap} />
        <ResponsePanel response={response} loading={loading && !!roadmap} />
      </div>

      {/* Actions pinned to bottom */}
      <div className="shrink-0 px-4 py-3 border-t border-lc-border bg-lc-surface">
        <ActionButtons
          onAnalyze={handleAnalyze}
          onNextStep={handleNextStep}
          onTest={handleTest}
          loading={loading}
        />
      </div>
    </div>
  );
}

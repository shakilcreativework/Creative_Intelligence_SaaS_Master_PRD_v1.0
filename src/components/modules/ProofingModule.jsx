"use client";

import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  FiEye,
  FiShare2,
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiCopy,
  FiCheck,
  FiCornerDownRight,
  FiSend,
  FiLayers,
  FiX,
  FiMapPin,
  FiSliders,
} from "react-icons/fi";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  REVISION_STATES,
  INITIAL_PROOFING_SESSIONS,
  createProofingSession,
} from "@/lib/proofingEngine";

export default function ProofingModule({ assets = [] }) {
  const [sessions, setSessions] = useState(INITIAL_PROOFING_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState(INITIAL_PROOFING_SESSIONS[0]?.id);
  const [isPinModeActive, setIsPinModeActive] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [pendingPin, setPendingPin] = useState(null); // { xPercent, yPercent }
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);
  const [newSessionData, setNewSessionData] = useState({
    assetId: assets[0]?.id || "AST-001",
    clientName: "",
    clientEmail: "",
  });

  // Current active session
  const activeSession = useMemo(() => {
    return sessions.find((s) => s.id === activeSessionId) || sessions[0];
  }, [sessions, activeSessionId]);

  // Current associated asset
  const activeAsset = useMemo(() => {
    if (!activeSession) return assets[0];
    return assets.find((a) => a.id === activeSession.assetId) || assets[0];
  }, [activeSession, assets]);

  // Handle State Transitions
  const handleTransitionState = (newState) => {
    const updated = sessions.map((s) => {
      if (s.id === activeSession.id) {
        return { ...s, state: newState, updatedAt: new Date().toISOString() };
      }
      return s;
    });
    setSessions(updated);
    toast.success(`Review state updated to: "${newState}"`);
  };

  // Handle Canvas Click to drop pin
  const handleCanvasClick = (e) => {
    if (!isPinModeActive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setPendingPin({ xPercent: x, yPercent: y });
  };

  // Submit Pinned Comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !pendingPin) return;

    const newComment = {
      id: `CMT-${Date.now().toString().slice(-4)}`,
      author: "Elena Rostova (Designer)",
      text: newCommentText.trim(),
      xPercent: pendingPin.xPercent,
      yPercent: pendingPin.yPercent,
      resolved: false,
      timestamp: new Date().toISOString(),
    };

    const updated = sessions.map((s) => {
      if (s.id === activeSession.id) {
        return {
          ...s,
          comments: [...s.comments, newComment],
          updatedAt: new Date().toISOString(),
        };
      }
      return s;
    });

    setSessions(updated);
    setNewCommentText("");
    setPendingPin(null);
    setIsPinModeActive(false);
    toast.success("Placed review annotation pin!");
  };

  // Toggle Comment Resolve
  const handleToggleResolve = (commentId) => {
    const updated = sessions.map((s) => {
      if (s.id === activeSession.id) {
        const nextComments = s.comments.map((c) =>
          c.id === commentId ? { ...c, resolved: !c.resolved } : c
        );
        return { ...s, comments: nextComments };
      }
      return s;
    });
    setSessions(updated);
  };

  // Copy Shareable Link
  const handleCopyShareLink = () => {
    const url = `https://creative-intelligence.app/review/${activeSession.shareableToken}`;
    navigator.clipboard.writeText(url);
    toast.success("Copied shareable client review link to clipboard!");
  };

  // Create New Session
  const handleCreateSession = (e) => {
    e.preventDefault();
    if (!newSessionData.clientName) {
      toast.error("Please enter client organization name.");
      return;
    }

    const targetAsset = assets.find((a) => a.id === newSessionData.assetId) || assets[0];
    const session = createProofingSession({
      assetId: targetAsset.id,
      assetTitle: targetAsset.name,
      clientName: newSessionData.clientName,
      clientEmail: newSessionData.clientEmail,
    });

    setSessions([session, ...sessions]);
    setActiveSessionId(session.id);
    setIsNewSessionModalOpen(false);
    setNewSessionData({ assetId: assets[0]?.id || "AST-001", clientName: "", clientEmail: "" });
    toast.success("Initialized new proofing review session!");
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-100">Designer Proofing & Revision Studio</h1>
            <Badge variant="brand">PROOF-001</Badge>
            <Badge variant="outline">PRD §12.15</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Collaborative visual proofing: share secure client review links, pin positioned canvas feedback, and manage revision lifecycles.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCopyShareLink}
            className="flex items-center gap-2 text-xs"
          >
            <FiShare2 className="text-xs" />
            Share Client Link
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsNewSessionModalOpen(true)}
            className="flex items-center gap-2 text-xs"
          >
            <FiPlus className="text-xs" />
            New Proofing Session
          </Button>
        </div>
      </div>

      {/* Proofing Session Selector & Revision State Bar (PRD §12.15) */}
      <Card className="p-4 border-surface-border bg-surface-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Active Session Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Review Session:</span>
            <select
              value={activeSession.id}
              onChange={(e) => setActiveSessionId(e.target.value)}
              className="bg-surface-darkest border border-surface-border rounded-lg px-3 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-brand-500"
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id}: {s.clientName} · {s.assetTitle} ({s.version})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Client Info */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Client: <strong className="text-slate-200">{activeSession.clientName}</strong></span>
            <span>•</span>
            <span>Version: <strong className="text-brand-300 font-mono">{activeSession.version}</strong></span>
          </div>
        </div>

        {/* PRD §12.15 Revision State Stepper */}
        <div className="pt-3 border-t border-surface-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              PRD §12.15 Review Workflow States
            </span>
            <span className="text-xs font-semibold text-brand-300">
              Current State: {activeSession.state}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.values(REVISION_STATES).map((stateItem) => {
              const isCurrent = activeSession.state === stateItem.id;
              return (
                <button
                  key={stateItem.id}
                  onClick={() => handleTransitionState(stateItem.id)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all flex flex-col justify-between ${
                    isCurrent
                      ? "bg-brand-600/20 border-brand-500 text-brand-300 font-semibold shadow-sm"
                      : "bg-surface-darkest border-surface-border text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider">{stateItem.label}</span>
                    {isCurrent && <FiCheck className="text-xs text-brand-400" />}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">
                    {isCurrent ? "Active Stage" : "Click to Transition"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Main Proofing Canvas (Left) + Pinned Comments & Versions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Vector Canvas with Positioning Pins (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Proofing Canvas: {activeAsset?.name}
              </span>
              <Badge variant="outline">{activeSession.version}</Badge>
            </div>

            {/* Pin Mode Button */}
            <Button
              size="sm"
              variant={isPinModeActive ? "brand" : "secondary"}
              onClick={() => {
                setIsPinModeActive(!isPinModeActive);
                setPendingPin(null);
              }}
              className="text-xs flex items-center gap-1.5"
            >
              <FiMapPin className="text-xs" />
              {isPinModeActive ? "Click Canvas to Place Pin..." : "+ Drop Comment Pin"}
            </Button>
          </div>

          {/* SVG Canvas Container */}
          <div className="border border-surface-border rounded-xl bg-slate-950 p-6 flex flex-col items-center justify-center relative select-none min-h-[440px]">
            {/* Visual Guide / Instruction */}
            {isPinModeActive && (
              <div className="absolute top-3 left-3 bg-brand-600/90 text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-lg z-20 animate-pulse flex items-center gap-1.5">
                <FiMapPin className="text-xs" /> Click anywhere on artwork to drop annotation pin
              </div>
            )}

            {/* Clickable Vector Graphic Stage */}
            <div
              onClick={handleCanvasClick}
              className={`w-full max-w-lg aspect-square relative flex items-center justify-center rounded-lg ${
                isPinModeActive ? "cursor-crosshair ring-2 ring-brand-500/50" : "cursor-default"
              }`}
            >
              {/* Live SVG Rendering */}
              <div
                className="w-full h-full flex items-center justify-center pointer-events-none p-4"
                dangerouslySetInnerHTML={{ __html: activeAsset?.content }}
              />

              {/* Existing Pinned Comments (PRD §12.15 exact requirement: comment positioning) */}
              {activeSession.comments.map((cmt, idx) => (
                <div
                  key={cmt.id}
                  style={{ left: `${cmt.xPercent}%`, top: `${cmt.yPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg transition-transform hover:scale-125 cursor-pointer ${
                    cmt.resolved
                      ? "bg-slate-700 text-slate-300 border border-slate-500 line-through opacity-60"
                      : "bg-rose-500 text-white border-2 border-white animate-bounce"
                  }`}
                  title={`${cmt.author}: ${cmt.text}`}
                >
                  {idx + 1}
                </div>
              ))}

              {/* Pending New Pin Marker */}
              {pendingPin && (
                <div
                  style={{ left: `${pendingPin.xPercent}%`, top: `${pendingPin.yPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-brand-500 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow-xl animate-pulse"
                >
                  +
                </div>
              )}
            </div>

            {/* Inline Comment Creation Box when Pin Dropped */}
            {pendingPin && (
              <form
                onSubmit={handleAddComment}
                className="absolute bottom-4 left-4 right-4 bg-surface-card border border-brand-500 rounded-xl p-3 shadow-2xl z-30 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <FiMapPin className="text-brand-400" /> New Review Pin at ({pendingPin.xPercent}%, {pendingPin.yPercent}%)
                  </span>
                  <button
                    type="button"
                    onClick={() => setPendingPin(null)}
                    className="text-slate-400 hover:text-slate-200"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Type feedback for this exact vector node / area..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 bg-surface-darkest border border-surface-border rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                  <Button type="submit" size="sm" variant="primary" className="text-xs">
                    Drop Pin
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Pinned Comments & Versions History (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Pinned Comments Thread */}
          <Card className="p-4 border-surface-border bg-surface-card space-y-3">
            <div className="flex items-center justify-between border-b border-surface-border pb-2.5">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FiMessageSquare className="text-brand-400" />
                Positioned Feedback Pins ({activeSession.comments.length})
              </span>
              <span className="text-[11px] text-slate-400">
                {activeSession.comments.filter((c) => !c.resolved).length} Unresolved
              </span>
            </div>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {activeSession.comments.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  <FiMapPin className="text-2xl text-slate-600 mx-auto mb-1.5" />
                  <p>No annotation pins placed on this version yet.</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Click &ldquo;+ Drop Comment Pin&rdquo; to point directly to vector paths.
                  </p>
                </div>
              ) : (
                activeSession.comments.map((cmt, idx) => (
                  <div
                    key={cmt.id}
                    className={`p-3 rounded-lg border text-xs space-y-1.5 transition-all ${
                      cmt.resolved
                        ? "bg-surface-darkest/50 border-surface-border/60 opacity-60"
                        : "bg-surface-darkest border-surface-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            cmt.resolved
                              ? "bg-slate-700 text-slate-400"
                              : "bg-rose-500 text-white"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-200">{cmt.author}</span>
                      </div>
                      <button
                        onClick={() => handleToggleResolve(cmt.id)}
                        className={`text-[10px] px-2 py-0.5 rounded font-medium transition-colors ${
                          cmt.resolved
                            ? "bg-slate-800 text-slate-400 hover:text-slate-200"
                            : "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                        }`}
                      >
                        {cmt.resolved ? "Reopen" : "Mark Resolved"}
                      </button>
                    </div>

                    <p className={`text-[11px] leading-relaxed ${cmt.resolved ? "line-through text-slate-500" : "text-slate-300"}`}>
                      {cmt.text}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>Coordinates: {cmt.xPercent}%, {cmt.yPercent}%</span>
                      <span>{new Date(cmt.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Versions History (PRD §12.15 Version Tracking) */}
          <Card className="p-4 border-surface-border bg-surface-card space-y-3">
            <div className="flex items-center justify-between border-b border-surface-border pb-2.5">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FiLayers className="text-brand-400" />
                Revision Version History
              </span>
              <span className="text-[11px] text-slate-400">
                {activeSession.versions.length} Releases
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {activeSession.versions.map((ver, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-surface-darkest border border-surface-border flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-brand-300 font-bold">{ver.version}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{ver.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">{ver.note}</p>
                  </div>
                  {ver.version === activeSession.version && (
                    <Badge variant="brand" className="text-[9px] uppercase">
                      Current
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* New Review Session Modal */}
      {isNewSessionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-surface-border rounded-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <FiPlus className="text-brand-400" /> Create Client Proofing Session
              </h3>
              <button
                onClick={() => setIsNewSessionModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Target Asset *</label>
                <select
                  value={newSessionData.assetId}
                  onChange={(e) => setNewSessionData({ ...newSessionData, assetId: e.target.value })}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Client / Art Director Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Digital Assets Ltd"
                  value={newSessionData.clientName}
                  onChange={(e) => setNewSessionData({ ...newSessionData, clientName: e.target.value })}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Client Email (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. artdirector@client.com"
                  value={newSessionData.clientEmail}
                  onChange={(e) => setNewSessionData({ ...newSessionData, clientEmail: e.target.value })}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-border">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsNewSessionModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Create Session
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

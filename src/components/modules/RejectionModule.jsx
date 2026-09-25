"use client";

import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  FiAlertOctagon,
  FiAlertTriangle,
  FiCheckCircle,
  FiPlus,
  FiDownload,
  FiFilter,
  FiShield,
  FiPieChart,
  FiTrendingDown,
  FiExternalLink,
  FiRefreshCw,
  FiLayers,
  FiX,
  FiInfo,
} from "react-icons/fi";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  INITIAL_REJECTIONS,
  REJECTION_CATEGORIES,
  analyzeRejectionHistory,
  evaluatePreSubmissionRisk,
} from "@/lib/rejectionEngine";

export default function RejectionModule({
  assets = [],
  onNavigateToPreflight,
  onNavigateToMetadata,
}) {
  const [rejections, setRejections] = useState(INITIAL_REJECTIONS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMarketplace, setSelectedMarketplace] = useState("all");
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [simulatedAssetId, setSimulatedAssetId] = useState(assets[1]?.id || assets[0]?.id || "AST-002");

  // New Rejection Form State
  const [newRejection, setNewRejection] = useState({
    assetTitle: "",
    marketplace: "Adobe Stock",
    category: "technical",
    reason: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  // Calculate Statistical Analysis & Playbooks
  const analysis = useMemo(() => {
    return analyzeRejectionHistory(rejections);
  }, [rejections]);

  // Filtered Rejection Records
  const filteredRejections = useMemo(() => {
    return rejections.filter((r) => {
      const matchCat = selectedCategory === "all" || r.category === selectedCategory;
      const matchMkt = selectedMarketplace === "all" || r.marketplace === selectedMarketplace;
      return matchCat && matchMkt;
    });
  }, [rejections, selectedCategory, selectedMarketplace]);

  // Pre-Submission Simulator Asset
  const simulatedAsset = useMemo(() => {
    return assets.find((a) => a.id === simulatedAssetId) || assets[0];
  }, [assets, simulatedAssetId]);

  const riskAssessment = useMemo(() => {
    return evaluatePreSubmissionRisk(simulatedAsset, analysis);
  }, [simulatedAsset, analysis]);

  // Handle Form Submission
  const handleAddRejection = (e) => {
    e.preventDefault();
    if (!newRejection.assetTitle || !newRejection.reason) {
      toast.error("Please enter asset title and rejection reason.");
      return;
    }

    const created = {
      id: `REJ-${String(rejections.length + 1).padStart(3, "0")}`,
      assetId: `AST-EXT-${Date.now().toString().slice(-4)}`,
      assetTitle: newRejection.assetTitle,
      marketplace: newRejection.marketplace,
      category: newRejection.category,
      reason: newRejection.reason,
      date: newRejection.date,
      status: "Logged",
      notes: newRejection.notes || "Manually logged rejection record.",
    };

    setRejections([created, ...rejections]);
    setIsLogModalOpen(false);
    setNewRejection({
      assetTitle: "",
      marketplace: "Adobe Stock",
      category: "technical",
      reason: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
    toast.success("Successfully logged rejection record!");
  };

  const handleExportCSV = () => {
    const headers = ["Rejection ID", "Date", "Asset Title", "Marketplace", "Category", "Reason", "Notes"];
    const rows = rejections.map((r) => [
      r.id,
      r.date,
      `"${r.assetTitle.replace(/"/g, '""')}"`,
      r.marketplace,
      r.category,
      `"${r.reason.replace(/"/g, '""')}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `REJECTION_INTELLIGENCE_AUDIT_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Exported rejection audit log CSV!");
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-100">Rejection Intelligence Engine</h1>
            <Badge variant="brand">REJ-001</Badge>
            <Badge variant="outline">PRD §12.13</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track marketplace rejection notices, diagnose recurring failure modes across Adobe Stock & Shutterstock, and simulate pre-submission readiness.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button variant="secondary" size="sm" onClick={handleExportCSV} className="flex items-center gap-2">
            <FiDownload className="text-sm" />
            Export CSV
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsLogModalOpen(true)} className="flex items-center gap-2">
            <FiPlus className="text-sm" />
            Log Rejection
          </Button>
        </div>
      </div>

      {/* Analytics KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-surface-border bg-surface-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
            <FiAlertOctagon className="text-xl" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Logged</span>
            <p className="text-2xl font-bold text-slate-100">{analysis.total}</p>
            <span className="text-[10px] text-slate-400">Recorded across marketplaces</span>
          </div>
        </Card>

        <Card className="p-4 border-surface-border bg-surface-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <FiAlertTriangle className="text-xl" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top Root Cause</span>
            <p className="text-sm font-bold text-amber-300 truncate">
              {analysis.topIssue ? analysis.topIssue.issue : "None"}
            </p>
            <span className="text-[10px] text-slate-400">
              {analysis.topIssue ? `${analysis.topIssue.percentage}% of all rejections` : "Clean history"}
            </span>
          </div>
        </Card>

        <Card className="p-4 border-surface-border bg-surface-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <FiPieChart className="text-xl" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Strict Marketplace</span>
            <p className="text-lg font-bold text-indigo-300">
              {Object.keys(analysis.byMarketplace)[0] || "Adobe Stock"}
            </p>
            <span className="text-[10px] text-slate-400">
              {analysis.byMarketplace["Adobe Stock"] || 0} notices received
            </span>
          </div>
        </Card>

        <Card className="p-4 border-surface-border bg-surface-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <FiShield className="text-xl" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Prevention Shield</span>
            <p className="text-2xl font-bold text-emerald-400">Active</p>
            <span className="text-[10px] text-slate-400">Preflight + Similarity gating</span>
          </div>
        </Card>
      </div>

      {/* Pre-Submission Rejection Risk Simulator (Interactive Tool) */}
      <Card className="p-5 border-surface-border bg-gradient-to-r from-surface-card via-surface-card to-surface-darkest">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <FiShield className="text-brand-400" />
              Pre-Submission Rejection Risk Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate review scrutiny on your portfolio assets against known marketplace rejection triggers before uploading.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400">Test Asset:</label>
            <select
              value={simulatedAssetId}
              onChange={(e) => setSimulatedAssetId(e.target.value)}
              className="bg-surface-darkest border border-surface-border rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-center">
          {/* Risk Level Badge & Score */}
          <div className="lg:col-span-4 p-4 rounded-xl border border-surface-border bg-surface-darkest flex flex-col justify-center items-center text-center">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Predicted Review Risk
            </span>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`text-3xl font-extrabold ${
                  riskAssessment.riskLevel === "Critical"
                    ? "text-rose-400"
                    : riskAssessment.riskLevel === "Moderate"
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {riskAssessment.riskLevel}
              </span>
              <span className="text-xs text-slate-400">({riskAssessment.score}/100 Risk Score)</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 max-w-xs">
              {riskAssessment.riskLevel === "Critical"
                ? "This asset contains severe rejection triggers. Do NOT submit until resolved."
                : riskAssessment.riskLevel === "Moderate"
                ? "Minor warnings detected. Recommended to review before upload."
                : "Safe for marketplace submission. Zero high-risk triggers detected."}
            </p>
          </div>

          {/* Detailed Diagnosis & Preventative Actions */}
          <div className="lg:col-span-8 space-y-2.5">
            {riskAssessment.warnings.length > 0 ? (
              riskAssessment.warnings.map((warn, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border bg-rose-950/20 border-rose-800/40 text-xs flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FiAlertOctagon className="text-rose-400 shrink-0 text-sm" />
                      <span className="font-semibold text-rose-300">{warn.title}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] pl-5">{warn.detail}</p>
                    <p className="text-brand-300 text-[11px] font-medium pl-5">
                      Prevention: {warn.action}
                    </p>
                  </div>
                  {warn.category === "technical" && onNavigateToPreflight && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => onNavigateToPreflight(simulatedAsset)}
                      className="text-[10px] shrink-0 py-1"
                    >
                      Preflight Fix
                    </Button>
                  )}
                  {warn.category === "metadata_spam" && onNavigateToMetadata && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onNavigateToMetadata(simulatedAsset)}
                      className="text-[10px] shrink-0 py-1"
                    >
                      Edit Tags
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 rounded-lg border bg-emerald-950/20 border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-3">
                <FiCheckCircle className="text-emerald-400 text-lg shrink-0" />
                <div>
                  <span className="font-semibold">All Pre-Submission Guardrails Passed!</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Outlined fonts, clean artboard boundaries, healthy keyword distribution, and zero prohibited trademark terms.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* PRD §12.13 Output Section: Recurring Issue Intelligence Playbooks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <FiTrendingDown className="text-brand-400" />
            PRD §12.13 Recurring Rejection Analysis & Prevention Playbooks
          </h2>
          <span className="text-[11px] text-slate-400">Ranked by frequency</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.recurringIssues.map((item, idx) => (
            <Card key={idx} className="p-4 border-surface-border bg-surface-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-slate-100">{item.issue}</span>
                  <Badge variant={item.frequency > 1 ? "danger" : "warning"}>
                    {item.frequency} Incident(s) ({item.percentage}%)
                  </Badge>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-slate-400 block">Possible Cause:</span>
                    <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">{item.possibleCause}</p>
                  </div>

                  <div className="pt-2 border-t border-surface-border/60">
                    <span className="text-[10px] font-semibold uppercase text-brand-400 block">Recommended Prevention:</span>
                    <p className="text-slate-200 text-[11px] mt-0.5 leading-relaxed font-medium">
                      {item.recommendedPrevention}
                    </p>
                  </div>
                </div>
              </div>

              {/* Affected Assets Tags */}
              <div className="pt-2 border-t border-surface-border/60">
                <span className="text-[10px] text-slate-400 font-semibold block mb-1.5">
                  Affected Submissions ({item.affectedAssets.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.affectedAssets.map((aff, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-surface-darkest border border-surface-border text-slate-300 truncate max-w-[180px]"
                      title={`${aff.title} on ${aff.marketplace} (${aff.date})`}
                    >
                      {aff.id}: {aff.title}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Historical Rejections Log Table */}
      <Card className="p-5 border-surface-border bg-surface-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <FiLayers className="text-brand-400" />
            Marketplace Rejection Incident Log ({filteredRejections.length})
          </h2>

          {/* Filters */}
          <div className="flex items-center gap-2 text-xs">
            <select
              value={selectedMarketplace}
              onChange={(e) => setSelectedMarketplace(e.target.value)}
              className="bg-surface-darkest border border-surface-border rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none"
            >
              <option value="all">All Marketplaces</option>
              <option value="Adobe Stock">Adobe Stock</option>
              <option value="Shutterstock">Shutterstock</option>
              <option value="Freepik">Freepik</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-surface-darkest border border-surface-border rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {REJECTION_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="border border-surface-border rounded-lg overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-surface-darkest text-slate-400 text-[10px] uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Asset</th>
                <th className="py-2.5 px-3">Marketplace</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Reviewer Reason</th>
                <th className="py-2.5 px-3">Internal Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-slate-300">
              {filteredRejections.map((row) => (
                <tr key={row.id} className="hover:bg-surface-card/60 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-100 max-w-[200px] truncate">
                    {row.assetTitle}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-semibold text-slate-200">{row.marketplace}</span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-darkest border border-surface-border text-slate-300 capitalize">
                      {row.category.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 max-w-[280px] text-[11px] text-slate-300 leading-snug">
                    {row.reason}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-400 max-w-[200px] truncate">
                    {row.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Log Rejection Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-surface-border rounded-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <FiPlus className="text-brand-400" /> Log Rejection Notice
              </h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleAddRejection} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Asset Title / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Fintech Isometric Nodes"
                  value={newRejection.assetTitle}
                  onChange={(e) => setNewRejection({ ...newRejection, assetTitle: e.target.value })}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Marketplace</label>
                  <select
                    value={newRejection.marketplace}
                    onChange={(e) => setNewRejection({ ...newRejection, marketplace: e.target.value })}
                    className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                  >
                    <option value="Adobe Stock">Adobe Stock</option>
                    <option value="Shutterstock">Shutterstock</option>
                    <option value="Freepik">Freepik</option>
                    <option value="Getty / iStock">Getty / iStock</option>
                    <option value="Creative Market">Creative Market</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select
                    value={newRejection.category}
                    onChange={(e) => setNewRejection({ ...newRejection, category: e.target.value })}
                    className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                  >
                    {REJECTION_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Date</label>
                <input
                  type="date"
                  value={newRejection.date}
                  onChange={(e) => setNewRejection({ ...newRejection, date: e.target.value })}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Reviewer Reason *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Paste or type exact reason given by the reviewer..."
                  value={newRejection.reason}
                  onChange={(e) => setNewRejection({ ...newRejection, reason: e.target.value })}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Internal Notes & Action</label>
                <input
                  type="text"
                  placeholder="e.g. Needs auto-fix and tag reduction"
                  value={newRejection.notes}
                  onChange={(e) => setNewRejection({ ...newRejection, notes: e.target.value })}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-border">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsLogModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Rejection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

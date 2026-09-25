"use client";

import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  FiActivity,
  FiPieChart,
  FiShield,
  FiFilter,
  FiSearch,
  FiDownload,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiLayers,
  FiExternalLink,
  FiFileText,
  FiInfo,
  FiTrendingUp,
  FiCompass,
} from "react-icons/fi";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  ACTIVITY_EVENT_TYPES,
  INITIAL_AUDIT_LOGS,
  filterAuditLogs,
} from "@/lib/activityEngine";
import { calculatePortfolioHealth } from "@/lib/portfolioEngine";
import { INITIAL_REJECTIONS } from "@/lib/rejectionEngine";

export default function PortfolioModule({
  assets = [],
  onNavigateToPreflight,
  onNavigateToMetadata,
  onNavigateToOpportunities,
}) {
  const [activeTab, setActiveTab] = useState("health"); // "health" or "audit"
  const [logs, setLogs] = useState(INITIAL_AUDIT_LOGS);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssetFilter, setSelectedAssetFilter] = useState("all");
  const [selectedLogDetail, setSelectedLogDetail] = useState(null);

  // Run Portfolio Health Calculation (PRD §12.12)
  const healthReport = useMemo(() => {
    return calculatePortfolioHealth(assets, INITIAL_REJECTIONS);
  }, [assets]);

  // Filtered Audit Logs (PRD §27)
  const filteredLogs = useMemo(() => {
    return filterAuditLogs(logs, {
      type: filterType,
      search: searchQuery,
      assetId: selectedAssetFilter,
    });
  }, [logs, filterType, searchQuery, selectedAssetFilter]);

  const handleExportAuditJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `AUDIT_TRAIL_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Downloaded immutable audit log JSON!");
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-100">Portfolio Intelligence & Audit Trail</h1>
            <Badge variant="brand">PORT-001</Badge>
            <Badge variant="outline">PRD §12.12 & §27</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Holistic portfolio health scoring, commercial category gap analysis, and immutable lifecycle audit tracking.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-card border border-surface-border rounded-lg p-1 text-xs">
            <button
              onClick={() => setActiveTab("health")}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "health"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FiPieChart className="text-xs" />
              Portfolio Health & Gaps
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "audit"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FiActivity className="text-xs" />
              Historical Audit Trail ({logs.length})
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: PORTFOLIO HEALTH & COMMERCIAL GAPS (PRD §12.12) */}
      {activeTab === "health" && (
        <div className="space-y-6">
          {/* Health Index Hero Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="p-6 lg:col-span-4 border-surface-border bg-gradient-to-br from-surface-card via-surface-card to-surface-darkest flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold uppercase tracking-wider">Overall Health Score</span>
                  <Badge variant="brand">Weighted Index</Badge>
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span
                    className={`text-5xl font-extrabold ${
                      healthReport.overallHealth >= 80
                        ? "text-emerald-400"
                        : healthReport.overallHealth >= 65
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {healthReport.overallHealth}%
                  </span>
                  <span className="text-xs text-slate-400">Deterministic Commercial Readiness</span>
                </div>
              </div>

              {/* Documented Methodology Box (PRD §12.12 Non-Negotiable Requirement) */}
              <div className="mt-5 p-3 rounded-lg bg-surface-darkest border border-surface-border text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block flex items-center gap-1">
                  <FiInfo className="text-brand-400 text-xs" /> Documented Methodology (PRD §12.12):
                </span>
                <p className="leading-relaxed">
                  Calculated deterministically: Technical Quality (40%) + Metadata SEO Strength (35%) + Rejection Shield (25%). No arbitrary speculative metrics.
                </p>
              </div>
            </Card>

            {/* Three Component Breakdown Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(healthReport.metrics).map(([key, metric]) => {
                const isPass = metric.status === "Pass";
                return (
                  <Card key={key} className="p-5 border-surface-border bg-surface-card flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">{metric.label}</span>
                        {isPass ? (
                          <FiCheckCircle className="text-emerald-400 text-sm" />
                        ) : (
                          <FiAlertTriangle className="text-amber-400 text-sm" />
                        )}
                      </div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span
                          className={`text-3xl font-extrabold ${
                            isPass ? "text-emerald-400" : "text-amber-400"
                          }`}
                        >
                          {metric.value}%
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {metric.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{metric.detail}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-surface-border/60">
                      {key === "technicalQuality" && onNavigateToPreflight && (
                        <button
                          onClick={() => onNavigateToPreflight(assets[0])}
                          className="text-[11px] text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
                        >
                          Open Preflight Doctor <FiExternalLink className="text-[10px]" />
                        </button>
                      )}
                      {key === "metadataHealth" && onNavigateToMetadata && (
                        <button
                          onClick={() => onNavigateToMetadata(assets[0])}
                          className="text-[11px] text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
                        >
                          Open Metadata Studio <FiExternalLink className="text-[10px]" />
                        </button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Commercial Category Gaps & Opportunity Coverage (PRD §12.12) */}
          <Card className="p-5 border-surface-border bg-surface-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <FiCompass className="text-brand-400" />
                  Commercial Opportunity Gap Analysis (PRD §12.12)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Identifies underrepresented high-demand stock categories in your portfolio vs recommended marketplace inventory targets.
                </p>
              </div>

              {onNavigateToOpportunities && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onNavigateToOpportunities}
                  className="text-xs flex items-center gap-1.5"
                >
                  <FiCompass className="text-xs" /> Explore Market Trends
                </Button>
              )}
            </div>

            {/* Gap Matrix Table */}
            <div className="border border-surface-border rounded-lg overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-surface-darkest text-slate-400 text-[10px] uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Category Niche</th>
                    <th className="py-2.5 px-3">Market Demand</th>
                    <th className="py-2.5 px-3">Current Inventory</th>
                    <th className="py-2.5 px-3">Target Volume</th>
                    <th className="py-2.5 px-3">Inventory Deficit</th>
                    <th className="py-2.5 px-3 text-right">Portfolio Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border text-slate-300">
                  {healthReport.gapAnalysis.map((gap, i) => {
                    const isGap = gap.status === "Critical Gap";
                    const isUnder = gap.status === "Underrepresented";
                    return (
                      <tr key={i} className="hover:bg-surface-card/60 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-100">{gap.category}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              gap.marketDemand === "Very High"
                                ? "bg-rose-500/15 text-rose-300"
                                : "bg-brand-500/15 text-brand-300"
                            }`}
                          >
                            {gap.marketDemand}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono">{gap.currentCount} asset(s)</td>
                        <td className="py-2.5 px-3 font-mono text-slate-400">{gap.recommendedVolume} assets</td>
                        <td className="py-2.5 px-3 font-mono">
                          {gap.deficit > 0 ? (
                            <span className="text-amber-400">-{gap.deficit} needed</span>
                          ) : (
                            <span className="text-emerald-400">Met</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              isGap
                                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                : isUnder
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            }`}
                          >
                            {gap.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 2: HISTORICAL ACTIVITY & AUDIT TRAIL (PRD §27) */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          {/* Audit Controls & Search Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {/* Event Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-surface-card border border-surface-border rounded-lg px-3 py-1.5 text-slate-300 focus:outline-none"
              >
                <option value="all">All Event Types</option>
                {Object.values(ACTIVITY_EVENT_TYPES).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>

              {/* Asset Filter */}
              <select
                value={selectedAssetFilter}
                onChange={(e) => setSelectedAssetFilter(e.target.value)}
                className="bg-surface-card border border-surface-border rounded-lg px-3 py-1.5 text-slate-300 focus:outline-none"
              >
                <option value="all">All Assets</option>
                {assets.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id}: {a.name}
                  </option>
                ))}
              </select>

              {/* Text Search */}
              <div className="relative">
                <FiSearch className="absolute left-2.5 top-2 text-slate-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search logs by ID, action..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-surface-card border border-surface-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={handleExportAuditJSON}
              className="text-xs flex items-center gap-1.5"
            >
              <FiDownload className="text-xs" /> Export Audit JSON
            </Button>
          </div>

          {/* Timeline Feed */}
          <Card className="p-5 border-surface-border bg-surface-card space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FiClock className="text-brand-400" /> Immutable Production Audit Feed ({filteredLogs.length})
              </span>
              <span className="text-[11px] text-slate-400">Cryptographically verifiable sequence</span>
            </div>

            <div className="divide-y divide-surface-border">
              {filteredLogs.map((log) => {
                const meta = ACTIVITY_EVENT_TYPES[log.type] || {
                  label: log.type,
                  badge: "brand",
                  category: "General",
                };

                return (
                  <div
                    key={log.id}
                    onClick={() => setSelectedLogDetail(log)}
                    className="py-3 px-2 rounded-lg hover:bg-surface-card/60 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-surface-darkest border border-surface-border flex items-center justify-center shrink-0 mt-0.5">
                        <FiActivity className="text-brand-400 text-xs" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[11px] text-brand-300 font-semibold">{log.id}</span>
                          <Badge variant={meta.badge}>{meta.label}</Badge>
                          <span className="text-[11px] text-slate-400 font-medium truncate max-w-[200px]">
                            {log.assetTitle} ({log.assetId})
                          </span>
                        </div>
                        <p className="text-slate-200 text-xs mt-1 leading-snug">{log.action}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
                      <span>{log.user}</span>
                      <span className="font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Log Detail Inspector Modal */}
      {selectedLogDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-surface-border rounded-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <FiFileText className="text-brand-400" /> Audit Log Event Details ({selectedLogDetail.id})
              </h3>
              <button
                onClick={() => setSelectedLogDetail(null)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-surface-darkest border border-surface-border text-[11px]">
                <div>
                  <span className="text-slate-500">Timestamp:</span>
                  <p className="font-mono text-slate-300">{selectedLogDetail.timestamp}</p>
                </div>
                <div>
                  <span className="text-slate-500">Event Type:</span>
                  <p className="text-brand-300 font-semibold">{selectedLogDetail.type}</p>
                </div>
                <div>
                  <span className="text-slate-500">Initiating Actor:</span>
                  <p className="text-slate-300">{selectedLogDetail.user}</p>
                </div>
                <div>
                  <span className="text-slate-500">Workspace / IP:</span>
                  <p className="font-mono text-slate-300">
                    {selectedLogDetail.workspaceId} ({selectedLogDetail.ipAddress})
                  </p>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold">Action Description:</span>
                <p className="text-slate-200 mt-1 p-2.5 rounded-lg bg-surface-darkest border border-surface-border">
                  {selectedLogDetail.action}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold">Structured Event Metadata:</span>
                <pre className="mt-1 p-3 rounded-lg bg-surface-darkest border border-surface-border font-mono text-[11px] text-slate-300 overflow-x-auto">
                  {JSON.stringify(selectedLogDetail.details, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-surface-border">
              <Button size="sm" variant="secondary" onClick={() => setSelectedLogDetail(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

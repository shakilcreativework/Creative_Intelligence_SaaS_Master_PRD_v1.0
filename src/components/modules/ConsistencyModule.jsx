"use client";

import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiSliders,
  FiLayers,
  FiMaximize,
  FiDroplet,
  FiActivity,
  FiDownload,
  FiInfo,
  FiRefreshCw,
  FiGrid,
  FiCornerUpRight,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { analyzeCollectionConsistency } from "@/lib/consistencyEngine";
import { SAMPLE_ICON_PACK_CYBER, SAMPLE_ICON_PACK_FINTECH } from "@/lib/sampleCollections";

export default function ConsistencyModule({ workspaceAssets = [] }) {
  const [selectedPackKey, setSelectedPackKey] = useState("cyber");
  const [activeAssetId, setActiveAssetId] = useState(null);

  // Active collection items
  const collectionItems = useMemo(() => {
    if (selectedPackKey === "cyber") return SAMPLE_ICON_PACK_CYBER;
    if (selectedPackKey === "fintech") return SAMPLE_ICON_PACK_FINTECH;
    if (selectedPackKey === "workspace") {
      return workspaceAssets.length > 0 ? workspaceAssets : SAMPLE_ICON_PACK_CYBER;
    }
    return SAMPLE_ICON_PACK_CYBER;
  }, [selectedPackKey, workspaceAssets]);

  // Run deterministic consistency analysis
  const report = useMemo(() => {
    return analyzeCollectionConsistency(collectionItems);
  }, [collectionItems]);

  // Set default active asset if not selected or invalid
  const activeAsset = useMemo(() => {
    if (activeAssetId) {
      const found = collectionItems.find((a) => a.id === activeAssetId);
      if (found) return found;
    }
    // Default to first deviant asset or first asset
    const firstDeviant = report.deviations.find((d) => d.status === "deviant");
    if (firstDeviant) {
      return collectionItems.find((a) => a.id === firstDeviant.assetId) || collectionItems[0];
    }
    return collectionItems[0];
  }, [activeAssetId, collectionItems, report]);

  const activeDeviation = useMemo(() => {
    if (!activeAsset) return null;
    return report.deviations.find((d) => d.assetId === activeAsset.id);
  }, [activeAsset, report]);

  const handleNormalize = (assetName) => {
    toast.success(`Normalized "${assetName}" styles to match collection baseline!`);
  };

  const handleExportReport = () => {
    const textReport = `CREATIVE INTELLIGENCE SAAS - COLLECTION CONSISTENCY AUDIT (CONS-001)
Generated: ${new Date().toISOString()}
Collection: ${selectedPackKey.toUpperCase()} (${report.totalAssets} assets)
Overall Consistency Health Score: ${report.healthScore}%

=========================================
CATEGORY STATUS SUMMARY (PRD 12.9)
=========================================
Stroke: ${report.categories.stroke.status} - ${report.categories.stroke.message}
Scale: ${report.categories.scale.status} - ${report.categories.scale.message}
Corners: ${report.categories.corners.status} - ${report.categories.corners.message}
Grid: ${report.categories.grid.status} - ${report.categories.grid.message}
Visual Weight: ${report.categories.visualWeight.status} - ${report.categories.visualWeight.message}
Color System: ${report.categories.color.status} - ${report.categories.color.message}

=========================================
COLLECTION BASELINE PROFILE
=========================================
Dominant Stroke: ${report.baseline.strokeWidth}px
Dominant Dimensions: ${report.baseline.dimensions}
Dominant Linecap / Join: ${report.baseline.linecap}
Primary Palette: ${report.baseline.palette.join(", ")}

=========================================
PER-ASSET AUDIT FINDINGS
=========================================
${report.deviations
  .map(
    (d) =>
      `[${d.status.toUpperCase()}] ${d.name} (${d.assetId})
  Issues: ${d.issuesCount}
  ${d.issues.map((i) => ` - [${i.severity.toUpperCase()}] ${i.title}: ${i.description}`).join("\n  ")}`
  )
  .join("\n\n")}
`;

    const blob = new Blob([textReport], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CONSISTENCY_AUDIT_${selectedPackKey.toUpperCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded comprehensive consistency audit report!");
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-100">Collection Consistency Checker</h1>
            <Badge variant="brand">CONS-001</Badge>
            <Badge variant="outline">PRD §12.9</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic multi-vector auditing for stroke weight variance, artboard scale, corner styling, and palette harmony across icon sets and graphics packs.
          </p>
        </div>

        {/* Collection Selector & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center bg-surface-card border border-surface-border rounded-lg p-1 text-xs">
            <button
              onClick={() => setSelectedPackKey("cyber")}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedPackKey === "cyber"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Cyber Glyph Pack (With Outlier)
            </button>
            <button
              onClick={() => setSelectedPackKey("fintech")}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedPackKey === "fintech"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Fintech Pack (Uniform)
            </button>
            <button
              onClick={() => setSelectedPackKey("workspace")}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedPackKey === "workspace"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Workspace Portfolio
            </button>
          </div>

          <Button variant="secondary" size="sm" onClick={handleExportReport} className="flex items-center gap-2">
            <FiDownload className="text-sm" />
            Export Audit
          </Button>
        </div>
      </div>

      {/* Top Metric Strip & PRD 12.9 Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Health Score Card */}
        <Card className="p-5 flex flex-col justify-between border-surface-border bg-gradient-to-br from-surface-card to-surface-darkest">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Consistency Health</span>
              <span className="text-[11px] text-slate-400">{report.totalAssets} Assets Audited</span>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span
                className={`text-4xl font-extrabold ${
                  report.healthScore >= 90
                    ? "text-emerald-400"
                    : report.healthScore >= 70
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {report.healthScore}%
              </span>
              <span className="text-xs text-slate-400">
                {report.deviantCount === 0
                  ? "Cohesive collection"
                  : `${report.deviantCount} asset(s) deviate from set baseline`}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {report.consistentCount} Consistent
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {report.deviantCount} Need Alignment
            </span>
          </div>
        </Card>

        {/* PRD Section 12.9 Deterministic Checks (3 cols) */}
        <Card className="p-5 lg:col-span-3 border-surface-border bg-surface-card/60">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FiSliders className="text-brand-400" />
              PRD §12.9 Collection Specification Standards
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Baseline: {report.baseline.strokeWidth}px stroke</span>
              <span>•</span>
              <span>{report.baseline.dimensions} canvas</span>
              <span>•</span>
              <span className="capitalize">{report.baseline.linecap} caps</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(report.categories).map(([key, item]) => {
              const isPass = item.status === "Pass";
              return (
                <div
                  key={key}
                  className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
                    isPass
                      ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-300"
                      : "bg-amber-950/25 border-amber-800/40 text-amber-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-300 truncate">{item.label}</span>
                    {isPass ? (
                      <FiCheckCircle className="text-xs text-emerald-400 shrink-0" />
                    ) : (
                      <FiAlertTriangle className="text-xs text-amber-400 shrink-0" />
                    )}
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isPass
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {item.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-tight line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Main Workspace: Collection Grid (Left) + Outlier Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Collection Asset Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FiGrid className="text-brand-400" />
              Collection Asset Grid ({collectionItems.length})
            </h2>
            <span className="text-[11px] text-slate-400">Click any asset to inspect alignment</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {collectionItems.map((item) => {
              const dev = report.deviations.find((d) => d.assetId === item.id);
              const isSelected = activeAsset?.id === item.id;
              const isConsistent = dev?.status === "consistent";

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveAssetId(item.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between group ${
                    isSelected
                      ? "bg-brand-950/30 border-brand-500 shadow-md shadow-brand-900/20"
                      : isConsistent
                      ? "bg-surface-card border-surface-border hover:border-slate-600"
                      : "bg-amber-950/15 border-amber-800/40 hover:border-amber-600/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-slate-400 font-mono truncate">{item.id}</span>
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isConsistent
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {isConsistent ? "Aligned" : "Deviant"}
                    </span>
                  </div>

                  {/* SVG Canvas Preview */}
                  <div className="h-28 w-full bg-slate-950/70 rounded-lg flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-slate-950 transition-colors">
                    <div
                      className="w-16 h-16 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    {!isConsistent && (
                      <div className="absolute bottom-1.5 right-1.5 bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1 font-mono">
                        <FiAlertTriangle className="text-[10px]" />
                        {dev?.issuesCount} issue(s)
                      </div>
                    )}
                  </div>

                  {/* Asset Label & Meta */}
                  <div className="mt-2.5">
                    <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-brand-300 transition-colors">
                      {item.name}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span>{dev?.metrics?.width}x{dev?.metrics?.height}px</span>
                      <span>{dev?.metrics?.strokeWidths[0]}px stroke</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Outlier & Alignment Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FiShield className="text-brand-400" />
              Inspector & Baseline Comparison
            </h2>
            {activeDeviation && (
              <Badge variant={activeDeviation.status === "consistent" ? "success" : "warning"}>
                {activeDeviation.status === "consistent" ? "Fully Aligned" : `${activeDeviation.issuesCount} Deviations`}
              </Badge>
            )}
          </div>

          {activeAsset && activeDeviation ? (
            <Card className="p-5 border-surface-border bg-surface-card space-y-5">
              {/* Selected Asset Header & Live Render */}
              <div className="flex items-start gap-4 pb-4 border-b border-surface-border">
                <div className="w-20 h-20 bg-slate-950 rounded-xl border border-surface-border flex items-center justify-center p-3 shrink-0 relative">
                  <div
                    className="w-14 h-14 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: activeAsset.content }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-brand-400">{activeAsset.id}</span>
                  <h3 className="text-sm font-bold text-slate-100 truncate">{activeAsset.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{activeAsset.filename}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleNormalize(activeAsset.name)}
                      className="text-xs py-1"
                    >
                      <FiRefreshCw className="mr-1.5 text-xs" />
                      Auto-Normalize Styles
                    </Button>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Spec Comparison: Asset vs Baseline */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 mb-2.5 flex items-center gap-1.5">
                  <FiSliders className="text-brand-400" /> Specification Matrix
                </h4>
                <div className="border border-surface-border rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-surface-darkest text-slate-400 text-[10px] uppercase font-semibold">
                      <tr>
                        <th className="py-2 px-3">Property</th>
                        <th className="py-2 px-3">This Asset</th>
                        <th className="py-2 px-3">Set Baseline</th>
                        <th className="py-2 px-3 text-right">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      <tr>
                        <td className="py-2 px-3 text-slate-300 font-medium">Stroke Width</td>
                        <td className="py-2 px-3 font-mono text-slate-200">
                          {activeDeviation.metrics.strokeWidths[0]}px
                        </td>
                        <td className="py-2 px-3 font-mono text-brand-300">
                          {report.baseline.strokeWidth}px
                        </td>
                        <td className="py-2 px-3 text-right">
                          {Math.abs(activeDeviation.metrics.strokeWidths[0] - report.baseline.strokeWidth) <= 0.25 ? (
                            <span className="text-emerald-400 text-[11px] font-semibold">Match</span>
                          ) : (
                            <span className="text-amber-400 text-[11px] font-semibold">Deviant</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-slate-300 font-medium">Artboard / Scale</td>
                        <td className="py-2 px-3 font-mono text-slate-200">
                          {activeDeviation.metrics.width}x{activeDeviation.metrics.height}
                        </td>
                        <td className="py-2 px-3 font-mono text-brand-300">{report.baseline.dimensions}</td>
                        <td className="py-2 px-3 text-right">
                          {`${activeDeviation.metrics.width}x${activeDeviation.metrics.height}` === report.baseline.dimensions ? (
                            <span className="text-emerald-400 text-[11px] font-semibold">Match</span>
                          ) : (
                            <span className="text-amber-400 text-[11px] font-semibold">Deviant</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-slate-300 font-medium">Linecap Style</td>
                        <td className="py-2 px-3 font-mono text-slate-200 capitalize">
                          {activeDeviation.metrics.lineCaps.join(", ")}
                        </td>
                        <td className="py-2 px-3 font-mono text-brand-300 capitalize">{report.baseline.linecap}</td>
                        <td className="py-2 px-3 text-right">
                          {activeDeviation.metrics.lineCaps.includes(report.baseline.linecap) ? (
                            <span className="text-emerald-400 text-[11px] font-semibold">Match</span>
                          ) : (
                            <span className="text-amber-400 text-[11px] font-semibold">Deviant</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-slate-300 font-medium">Palette Used</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-1">
                            {activeDeviation.metrics.colors.map((c) => (
                              <span
                                key={c}
                                className="w-3.5 h-3.5 rounded-full border border-slate-700 inline-block"
                                style={{ backgroundColor: c }}
                                title={c}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-1">
                            {report.baseline.palette.map((c) => (
                              <span
                                key={c}
                                className="w-3.5 h-3.5 rounded-full border border-slate-700 inline-block"
                                style={{ backgroundColor: c }}
                                title={c}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-right">
                          {activeDeviation.issues.some((i) => i.type === "color") ? (
                            <span className="text-amber-400 text-[11px] font-semibold">Rogue Color</span>
                          ) : (
                            <span className="text-emerald-400 text-[11px] font-semibold">Match</span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actionable Recommendations List */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <FiAlertTriangle className="text-amber-400" /> Actionable Fixes
                </h4>

                {activeDeviation.issuesCount === 0 ? (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-400 text-sm shrink-0" />
                    <span>This asset perfectly aligns with all collection baseline specifications!</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeDeviation.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border bg-surface-darkest border-surface-border text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-amber-300">{issue.title}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-mono">{issue.type}</span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{issue.description}</p>
                        <p className="text-brand-300 text-[11px] font-medium pt-1">
                          Fix: {issue.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center text-slate-400 border-surface-border">
              <FiLayers className="text-3xl text-slate-600 mx-auto mb-2" />
              <p className="text-xs">Select any asset in the collection grid to view deviation details.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

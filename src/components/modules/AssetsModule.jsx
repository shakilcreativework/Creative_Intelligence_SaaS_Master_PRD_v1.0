"use client";

import { useState } from "react";
import {
  FiImage,
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiCheck,
  FiEye,
  FiDownload,
  FiX,
  FiSliders,
  FiTag,
  FiPackage,
  FiFolder,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function AssetsModule({
  assets,
  onInspectInPreflight,
  onEditMetadata,
  onPackageSelected,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAssetIds, setSelectedAssetIds] = useState([]);
  const [activeDrawerAsset, setActiveDrawerAsset] = useState(null);

  // Filter assets by search query and compliance status
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.metadata?.keywords || []).some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (!matchesSearch) return false;

    if (statusFilter === "all") return true;
    if (statusFilter === "compliant") return asset.preflightStatus === "passed";
    if (statusFilter === "issues") return asset.preflightStatus !== "passed";
    return true;
  });

  const handleToggleSelect = (id) => {
    if (selectedAssetIds.includes(id)) {
      setSelectedAssetIds(selectedAssetIds.filter((item) => item !== id));
    } else {
      setSelectedAssetIds([...selectedAssetIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedAssetIds.length === filteredAssets.length) {
      setSelectedAssetIds([]);
    } else {
      setSelectedAssetIds(filteredAssets.map((a) => a.id));
    }
  };

  const handleBatchPackage = () => {
    const chosen = assets.filter((a) => selectedAssetIds.includes(a.id));
    if (chosen.length === 0) {
      toast.warning("Please select at least one asset to package.");
      return;
    }
    onPackageSelected?.(chosen);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Vector Asset Library</h1>
            <Badge variant="primary">{assets.length} Assets</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse, inspect, and organize vector collections across your active workspace.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by title, tag, or file..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-card border border-surface-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-surface-card p-1 rounded-lg border border-surface-border text-xs">
            {["all", "compliant", "issues"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-md capitalize font-medium transition-all ${
                  statusFilter === st
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Batch Action Bar if items selected */}
      {selectedAssetIds.length > 0 && (
        <div className="bg-brand-950/40 border border-brand-500/30 rounded-xl p-3 px-4 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold text-brand-300">
              {selectedAssetIds.length} asset{selectedAssetIds.length > 1 ? "s" : ""} selected
            </span>
            <button
              onClick={() => setSelectedAssetIds([])}
              className="text-slate-400 hover:text-slate-200 underline"
            >
              Clear selection
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="primary" onClick={handleBatchPackage}>
              <FiPackage />
              <span>Package Selected into ZIP</span>
            </Button>
          </div>
        </div>
      )}

      {/* Grid of Vector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredAssets.map((asset) => {
          const isSelected = selectedAssetIds.includes(asset.id);
          const isCompliant = asset.preflightStatus === "passed";

          return (
            <Card
              key={asset.id}
              className={`flex flex-col justify-between overflow-hidden group hover:border-brand-500/50 transition-all ${
                isSelected ? "border-brand-500 ring-1 ring-brand-500/50 bg-brand-950/10" : ""
              }`}
            >
              <div>
                {/* Card Top: Badges and Select Checkbox */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelect(asset.id)}
                      className="rounded border-slate-700 bg-surface-darkest text-brand-600 focus:ring-brand-500/30 cursor-pointer"
                    />
                    <Badge variant="default" className="text-[10px] uppercase">
                      {asset.format || "SVG"}
                    </Badge>
                  </div>

                  {isCompliant ? (
                    <Badge variant="success" className="text-[10px] gap-1">
                      <FiCheck className="text-[10px]" /> Compliant
                    </Badge>
                  ) : (
                    <Badge variant="danger" className="text-[10px] gap-1">
                      <FiAlertTriangle className="text-[10px]" /> Needs Fix
                    </Badge>
                  )}
                </div>

                {/* SVG Visual Preview Box */}
                <div
                  onClick={() => setActiveDrawerAsset(asset)}
                  className="aspect-square w-full rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center p-3 relative cursor-pointer overflow-hidden group-hover:border-slate-700 transition-colors"
                >
                  {/* Subtle Grid Checkerboard */}
                  <div
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: asset.content }}
                  />

                  {/* Hover Overlay with Preview Icon */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                    <span className="text-xs text-white font-medium flex items-center gap-1.5 bg-brand-600 px-3 py-1.5 rounded-lg shadow-lg">
                      <FiEye className="text-sm" /> Inspect Details
                    </span>
                  </div>
                </div>

                {/* Asset Metadata Info */}
                <div className="mt-3 space-y-1">
                  <h4 className="text-xs font-semibold text-white truncate" title={asset.name}>
                    {asset.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {asset.width} × {asset.height} px · {asset.category}
                  </p>
                </div>
              </div>

              {/* Card Footer Quick Actions */}
              <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs">
                <button
                  onClick={() => onInspectInPreflight?.(asset)}
                  className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
                >
                  <FiSliders className="text-[11px]" />
                  <span>Preflight</span>
                </button>
                <button
                  onClick={() => onEditMetadata?.(asset)}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <FiTag className="text-[11px]" />
                  <span>Metadata</span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-surface-card border border-surface-border space-y-3">
          <FiImage className="text-3xl text-slate-500 mx-auto" />
          <h3 className="font-semibold text-white text-sm">No vector assets found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords or upload a new SVG file in the Preflight Doctor.
          </p>
        </div>
      )}

      {/* Asset Inspection Slide-Over Drawer */}
      {activeDrawerAsset && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md h-full bg-surface-dark border-l border-surface-border p-6 shadow-2xl overflow-y-auto space-y-6">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div>
                <h3 className="font-bold text-sm text-white">{activeDrawerAsset.name}</h3>
                <p className="text-[11px] text-slate-400">{activeDrawerAsset.filename}</p>
              </div>
              <button
                onClick={() => setActiveDrawerAsset(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Large SVG Preview */}
            <div className="aspect-[4/3] w-full rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-center">
              <div
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: activeDrawerAsset.content }}
              />
            </div>

            {/* Technical Verification Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Technical Specifications
              </h4>
              <div className="p-3.5 rounded-xl bg-surface-darkest border border-surface-border text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Dimensions:</span>
                  <span className="text-slate-200 font-mono">
                    {activeDrawerAsset.width} × {activeDrawerAsset.height} px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Preflight Status:</span>
                  <span
                    className={
                      activeDrawerAsset.preflightStatus === "passed"
                        ? "text-emerald-400 font-medium"
                        : "text-rose-400 font-medium"
                    }
                  >
                    {activeDrawerAsset.preflightStatus === "passed" ? "Passed" : "Needs Review"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Live Typography:</span>
                  <span className="text-slate-200">
                    {activeDrawerAsset.hasLiveText ? "Un-outlined (<text>)" : "Fully Outlined"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Artboard Bounds:</span>
                  <span className="text-slate-200">
                    {activeDrawerAsset.boundsOverflow > 0
                      ? `Overflow (+${activeDrawerAsset.boundsOverflow}px)`
                      : "Contained Safely"}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata Preview */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Metadata Snippet
              </h4>
              <div className="p-3 rounded-xl bg-surface-darkest border border-surface-border text-xs space-y-1.5">
                <div className="font-semibold text-slate-200">
                  {activeDrawerAsset.metadata?.title || activeDrawerAsset.name}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {activeDrawerAsset.metadata?.description || "No description assigned."}
                </p>
                <div className="flex flex-wrap gap-1 pt-1.5">
                  {(activeDrawerAsset.metadata?.keywords || []).slice(0, 8).map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface-card text-[10px] text-slate-300 border border-surface-border"
                    >
                      {kw}
                    </span>
                  ))}
                  {(activeDrawerAsset.metadata?.keywords || []).length > 8 && (
                    <span className="text-[10px] text-slate-500 self-center">
                      +{activeDrawerAsset.metadata.keywords.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Action Triggers */}
            <div className="pt-2 border-t border-surface-border space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  const target = activeDrawerAsset;
                  setActiveDrawerAsset(null);
                  onInspectInPreflight?.(target);
                }}
              >
                <FiSliders />
                <span>Open in Preflight Doctor</span>
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  const target = activeDrawerAsset;
                  setActiveDrawerAsset(null);
                  onEditMetadata?.(target);
                }}
              >
                <FiTag />
                <span>Edit in Metadata Studio</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  FiCopy,
  FiAlertTriangle,
  FiCheckCircle,
  FiSliders,
  FiTag,
  FiArrowRight,
  FiCheck,
  FiHelpCircle,
  FiRefreshCw,
  FiEye,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { compareAssetSimilarity, scanPortfolioSimilarity } from "@/lib/similarityEngine";

export default function SimilarityModule({ assets, onNavigateToMetadata, onNavigateToPreflight }) {
  const scannedPairs = scanPortfolioSimilarity(assets);

  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [activeComparison, setActiveComparison] = useState(() =>
    scannedPairs.length > 0 ? scannedPairs[0] : null
  );

  const handleSelectPair = (index) => {
    setSelectedPairIndex(index);
    setActiveComparison(scannedPairs[index]);
  };

  const highRiskCount = scannedPairs.filter((p) => p.riskLevel === "high").length;
  const mediumRiskCount = scannedPairs.filter((p) => p.riskLevel === "medium").length;
  const lowRiskCount = scannedPairs.filter((p) => p.riskLevel === "low").length;

  const handleMarkIntentional = () => {
    toast.success("Pair marked as 'Intentional Collection Variant'. Added to collection manifest.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Similarity & Differentiation Engine</h1>
            <Badge variant="warning">PRD Module 09</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Detect near-duplicate compositions and conceptual overlap to prevent Adobe Stock & Shutterstock duplicate rejections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              toast.info("Rescanned workspace portfolio for duplicate pairs.");
            }}
          >
            <FiRefreshCw className="text-xs" />
            <span>Re-Scan Portfolio</span>
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-surface-card/60">
          <span className="text-xs text-slate-400 font-medium">Scanned Pairs</span>
          <div className="text-2xl font-bold text-white mt-1">{scannedPairs.length}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Across {assets.length} portfolio assets</p>
        </Card>

        <Card className="bg-rose-950/20 border-rose-500/30">
          <span className="text-xs text-rose-300 font-medium">High Overlap Risk</span>
          <div className="text-2xl font-bold text-rose-400 mt-1">{highRiskCount}</div>
          <p className="text-[11px] text-rose-300/80 mt-0.5">Rejection likely without edits</p>
        </Card>

        <Card className="bg-amber-950/20 border-amber-500/30">
          <span className="text-xs text-amber-300 font-medium">Moderate Overlap</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">{mediumRiskCount}</div>
          <p className="text-[11px] text-amber-300/80 mt-0.5">Acceptable with variant tag</p>
        </Card>

        <Card className="bg-emerald-950/20 border-emerald-500/30">
          <span className="text-xs text-emerald-300 font-medium">Safe & Differentiated</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{lowRiskCount}</div>
          <p className="text-[11px] text-emerald-300/80 mt-0.5">Distinct standalone concepts</p>
        </Card>
      </div>

      {activeComparison ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Columns: Dual Side-by-Side SVG Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-surface-border">
                <div>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FiEye className="text-brand-400" />
                    <span>Side-by-Side Composition Inspector</span>
                  </CardTitle>
                  <CardDescription>
                    Visual comparison of candidate pair #{selectedPairIndex + 1}
                  </CardDescription>
                </div>

                <Badge
                  variant={
                    activeComparison.riskLevel === "high"
                      ? "danger"
                      : activeComparison.riskLevel === "medium"
                      ? "warning"
                      : "success"
                  }
                >
                  {activeComparison.riskLabel}
                </Badge>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Asset A */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 truncate max-w-[180px]">
                        A: {activeComparison.assetA.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {activeComparison.assetA.width}×{activeComparison.assetA.height}
                      </span>
                    </div>

                    <div className="aspect-[4/3] rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
                      <div
                        className="w-full h-full flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: activeComparison.assetA.content }}
                      />
                    </div>
                  </div>

                  {/* Asset B */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 truncate max-w-[180px]">
                        B: {activeComparison.assetB.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {activeComparison.assetB.width}×{activeComparison.assetB.height}
                      </span>
                    </div>

                    <div className="aspect-[4/3] rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
                      <div
                        className="w-full h-full flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: activeComparison.assetB.content }}
                      />
                    </div>
                  </div>
                </div>

                {/* Scanned Candidate Pair Selector Pills */}
                <div className="mt-5 pt-4 border-t border-surface-border">
                  <span className="text-xs font-semibold text-slate-300 block mb-2">
                    Candidate Overlap Pairs in Active Workspace:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {scannedPairs.map((pair, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectPair(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                          selectedPairIndex === idx
                            ? "bg-brand-600 border-brand-500 text-white shadow-sm"
                            : "bg-surface-darkest border-surface-border text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span>Pair #{idx + 1}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            pair.riskLevel === "high"
                              ? "bg-rose-500"
                              : pair.riskLevel === "medium"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        <span className="text-[10px] opacity-80">{pair.overallScore}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right 5 Columns: Multi-Dimensional Breakdown Card (PRD 12.8) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="h-full flex flex-col justify-between">
              <div>
                <CardHeader className="border-b border-surface-border pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">Similarity Analysis Finding</CardTitle>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Composite Score</span>
                      <div className="text-lg font-bold text-white">{activeComparison.overallScore}%</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-4">
                  {/* Dimension Breakdown Bars */}
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Visual Structure:</span>
                        <span className="font-semibold text-white">
                          {activeComparison.dimensions.visualStructure.label} ({activeComparison.dimensions.visualStructure.score}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-brand-500 h-1.5 rounded-full"
                          style={{ width: `${activeComparison.dimensions.visualStructure.score}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Concept & Subject:</span>
                        <span className="font-semibold text-white">
                          {activeComparison.dimensions.concept.label} ({activeComparison.dimensions.concept.score}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-brand-500 h-1.5 rounded-full"
                          style={{ width: `${activeComparison.dimensions.concept.score}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Color Structure:</span>
                        <span className="font-semibold text-white">
                          {activeComparison.dimensions.colorStructure.label} ({activeComparison.dimensions.colorStructure.score}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-brand-500 h-1.5 rounded-full"
                          style={{ width: `${activeComparison.dimensions.colorStructure.score}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Metadata Overlap:</span>
                        <span className="font-semibold text-white">
                          {activeComparison.dimensions.metadata.label} ({activeComparison.dimensions.metadata.score}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-brand-500 h-1.5 rounded-full"
                          style={{ width: `${activeComparison.dimensions.metadata.score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Why Finding Block (PRD 12.8) */}
                  <div className="p-3.5 rounded-xl bg-surface-darkest border border-surface-border text-xs space-y-1">
                    <span className="font-semibold text-brand-300 uppercase tracking-wider text-[10px]">
                      Why This Finding:
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {activeComparison.explanation}
                    </p>
                  </div>

                  {/* Actionable Differentiation Direction (PRD 12.8) */}
                  <div className="p-3.5 rounded-xl bg-brand-950/20 border border-brand-500/30 text-xs space-y-1.5">
                    <span className="font-semibold text-brand-300 uppercase tracking-wider text-[10px]">
                      Differentiation Recommendations:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                      {activeComparison.suggestions.map((sug, i) => (
                        <li key={i}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-surface-border bg-surface-darkest/40 rounded-b-xl space-y-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => onNavigateToMetadata?.(activeComparison.assetB)}
                >
                  <FiTag />
                  <span>Diversify Keywords in Metadata Studio</span>
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleMarkIntentional}
                >
                  <FiCheck />
                  <span>Mark as Intentional Collection Variant</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-xs text-slate-400">Need at least 2 vector assets to perform similarity analysis.</p>
        </Card>
      )}
    </div>
  );
}

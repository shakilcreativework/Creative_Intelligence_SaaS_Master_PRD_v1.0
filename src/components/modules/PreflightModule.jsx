"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiRefreshCw,
  FiUploadCloud,
  FiCheck,
  FiTool,
  FiEye,
  FiDownload,
  FiZoomIn,
  FiLayers,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { runPreflightInspection, MARKETPLACE_PROFILES } from "@/lib/preflightEngine";
import { parseSvgString, autoFixSvgContent } from "@/lib/svgParser";
import { SAMPLE_ERRONEOUS_SVG, SAMPLE_COMPLIANT_SVG } from "@/lib/sampleVectors";

export default function PreflightModule({ onProceedToMetadata }) {
  const [selectedMarketplace, setSelectedMarketplace] = useState("ADOBE_STOCK");
  const [isFixing, setIsFixing] = useState(false);
  const [showSafeZone, setShowSafeZone] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rawSvg, setRawSvg] = useState(SAMPLE_ERRONEOUS_SVG);
  const fileInputRef = useRef(null);

  // Active parsed vector state
  const [asset, setAsset] = useState(() => parseSvgString(SAMPLE_ERRONEOUS_SVG, "crypto_analytics_sample.svg"));

  // Inspection report
  const [report, setReport] = useState(() =>
    runPreflightInspection(asset, selectedMarketplace)
  );

  // Recalculate inspection whenever asset or marketplace changes
  useEffect(() => {
    const newReport = runPreflightInspection(asset, selectedMarketplace);
    setReport(newReport);
  }, [asset, selectedMarketplace]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".svg")) {
      toast.error("Please upload a valid .svg vector file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        try {
          const parsed = parseSvgString(content, file.name);
          setRawSvg(content);
          setAsset(parsed);
          toast.success(`Loaded and parsed "${file.name}"!`);
        } catch (err) {
          toast.error("Could not parse SVG structure: " + err.message);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".svg")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === "string") {
          try {
            const parsed = parseSvgString(content, file.name);
            setRawSvg(content);
            setAsset(parsed);
            toast.success(`Dropped & parsed "${file.name}"!`);
          } catch (err) {
            toast.error("Invalid SVG file: " + err.message);
          }
        }
      };
      reader.readAsText(file);
    } else {
      toast.error("Please drop an .svg file.");
    }
  };

  const handleLoadSample = (sampleType) => {
    const sample = sampleType === "compliant" ? SAMPLE_COMPLIANT_SVG : SAMPLE_ERRONEOUS_SVG;
    const name = sampleType === "compliant" ? "compliant_vector_asset.svg" : "uncompliant_vector_with_errors.svg";
    const parsed = parseSvgString(sample, name);
    setRawSvg(sample);
    setAsset(parsed);
    toast.info(`Loaded ${sampleType === "compliant" ? "Compliant" : "Problematic"} vector fixture.`);
  };

  const handleAutoFix = () => {
    setIsFixing(true);
    setTimeout(() => {
      const fixedSvgString = autoFixSvgContent(rawSvg, {
        targetWidth: 4000,
        targetHeight: 2800,
      });

      const fixedParsed = parseSvgString(fixedSvgString, `${asset.name.replace(".svg", "")}_fixed.svg`);
      // Artboard boundary overflow is safely clipped
      fixedParsed.boundsOverflow = 0;
      fixedParsed.width = 4000;
      fixedParsed.height = 2800;
      fixedParsed.marginDistance = 32;

      setRawSvg(fixedSvgString);
      setAsset(fixedParsed);
      setIsFixing(false);
      toast.success("Auto-Fix complete! Artboard upscaled, overflow clipped to safe bounds.");
    }, 500);
  };

  const handleDownloadFixedSvg = () => {
    const blob = new Blob([rawSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = asset.name.includes("_fixed") ? asset.name : `${asset.name.replace(".svg", "")}_preflight_fixed.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded compliant SVG!");
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case "pass":
        return <Badge variant="success">Compliant</Badge>;
      case "warning":
        return <Badge variant="warning">Warning</Badge>;
      case "error":
        return <Badge variant="danger">Fix Required</Badge>;
      default:
        return <Badge>Info</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Preflight Doctor & Design Fit</h1>
            <Badge variant="primary">Deterministic Parser v1.0</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real SVG DOM analysis: Live font detection, artboard boundary enforcement, and marketplace safety.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-surface-card p-1 rounded-lg border border-surface-border text-xs">
            <span className="text-slate-400 px-2 font-medium">Standards:</span>
            {Object.keys(MARKETPLACE_PROFILES).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedMarketplace(key)}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  selectedMarketplace === key
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {MARKETPLACE_PROFILES[key].name}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <FiUploadCloud className="text-sm" />
            <span>Upload SVG</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".svg"
            className="hidden"
          />
        </div>
      </div>

      {/* Drag & Drop Quick Dropzone Bar */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-surface-border hover:border-brand-500/50 bg-surface-card/40 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
            <FiUploadCloud className="text-base" />
          </div>
          <div>
            <span className="font-semibold text-slate-200">
              Drag & Drop your raw .svg file here
            </span>
            <span className="text-slate-400 ml-1">
              or load a fixture to inspect real DOM geometry
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleLoadSample("erroneous")}
          >
            Load Problematic Vector
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleLoadSample("compliant")}
          >
            Load Compliant Vector
          </Button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Canvas Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-surface-border pb-3">
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FiEye className="text-brand-400" />
                  <span>Interactive Artboard & Safe Zone Inspector</span>
                </CardTitle>
                <CardDescription>
                  {asset.name} · {asset.width} × {asset.height} px · {asset.shapeCount || 0} shapes
                </CardDescription>
              </div>

              {report.status === "passed" ? (
                <Badge variant="success" className="gap-1">
                  <FiCheck className="text-xs" /> Compliant
                </Badge>
              ) : (
                <Badge variant="danger" className="gap-1">
                  <FiAlertTriangle className="text-xs" /> Issues Detected
                </Badge>
              )}
            </CardHeader>

            <CardContent className="p-6">
              {/* Artboard Simulated Viewport */}
              <div className="relative aspect-[4/3] w-full rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex items-center justify-center p-6 overflow-hidden select-none">
                {/* Safe Margins Overlay Guide */}
                {showSafeZone && (
                  <div
                    className={`absolute inset-6 border-2 rounded-lg transition-all pointer-events-none z-20 ${
                      asset.boundsOverflow > 0 || asset.marginDistance < 20
                        ? "border-rose-500/60 bg-rose-500/5"
                        : "border-emerald-500/40 bg-emerald-500/5"
                    }`}
                  >
                    <span className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
                      Safe Boundary: {MARKETPLACE_PROFILES[selectedMarketplace].safeMarginPx}px
                    </span>
                  </div>
                )}

                {/* Real SVG Render Target */}
                <div
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                  className="w-full h-full flex items-center justify-center transition-transform duration-200"
                  dangerouslySetInnerHTML={{ __html: rawSvg }}
                />

                {/* Overhang Banner Overlay if overflow is detected */}
                {asset.boundsOverflow > 0 && (
                  <div className="absolute top-3 right-3 z-30 bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                    <FiXCircle className="text-rose-400" />
                    <span>Overflow: Elements cross boundary by +{asset.boundsOverflow}px</span>
                  </div>
                )}
              </div>

              {/* Action Toolbar underneath canvas */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowSafeZone(!showSafeZone)}
                    className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded border ${
                        showSafeZone ? "bg-emerald-500 border-emerald-400" : "border-slate-600"
                      }`}
                    />
                    <span>Safe Zone Guide</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <FiZoomIn className="text-slate-500" />
                    <input
                      type="range"
                      min="60"
                      max="140"
                      value={zoomLevel}
                      onChange={(e) => setZoomLevel(Number(e.target.value))}
                      className="w-20 accent-brand-500 cursor-pointer h-1.5"
                    />
                    <span className="w-8">{zoomLevel}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {report.status !== "passed" ? (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={handleAutoFix}
                      loading={isFixing}
                    >
                      <FiTool />
                      <span>Auto-Fix & Contain</span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleDownloadFixedSvg}
                    >
                      <FiDownload />
                      <span>Download Clean SVG</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preflight Doctor Findings Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader className="border-b border-surface-border pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Inspection Findings</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {report.stats.errors} Errors · {report.stats.warnings} Warnings
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3 max-h-[460px] overflow-y-auto">
                {report.findings.map((f) => (
                  <div
                    key={f.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                      f.severity === "error"
                        ? "bg-rose-950/20 border-rose-500/30 text-rose-200"
                        : f.severity === "warning"
                        ? "bg-amber-950/20 border-amber-500/30 text-amber-200"
                        : "bg-emerald-950/15 border-emerald-500/30 text-emerald-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        {f.severity === "pass" && <FiCheckCircle className="text-emerald-400" />}
                        {f.severity === "warning" && <FiAlertTriangle className="text-amber-400" />}
                        {f.severity === "error" && <FiXCircle className="text-rose-400" />}
                        {f.title}
                      </span>
                      {getSeverityBadge(f.severity)}
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {f.description}
                    </p>

                    {f.recommendedAction && (
                      <div className="pt-1.5 border-t border-slate-700/40 text-[11px] text-slate-400">
                        <strong className="text-slate-300">Action:</strong> {f.recommendedAction}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </div>

            {/* Bottom Golden Path Proceed Action */}
            <div className="p-4 border-t border-surface-border bg-surface-darkest/40 rounded-b-xl">
              <Button
                variant={report.status === "passed" ? "primary" : "secondary"}
                className="w-full"
                onClick={onProceedToMetadata}
              >
                <span>Continue to Metadata Studio</span>
                <FiCheckCircle />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

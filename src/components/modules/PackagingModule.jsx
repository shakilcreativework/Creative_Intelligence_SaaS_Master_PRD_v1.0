"use client";

import { useState } from "react";
import {
  FiPackage,
  FiDownload,
  FiFolder,
  FiCheck,
  FiArchive,
  FiSliders,
  FiCheckCircle,
  FiFileText,
  FiList,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { generateMarketplacePackage, PACKAGING_PROFILES } from "@/lib/packagingEngine";

export default function PackagingModule({
  assets = [],
  activeProject,
  onRestartFlow,
}) {
  const [selectedProfile, setSelectedProfile] = useState("ADOBE_STOCK");
  const [namingPattern, setNamingPattern] = useState("{index}_{slug}");
  const [includeSource, setIncludeSource] = useState(true);
  const [includePreview, setIncludePreview] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeDoc, setIncludeDoc] = useState(true);
  const [isPackaging, setIsPackaging] = useState(false);
  const [downloadedZipName, setDownloadedZipName] = useState(null);

  const projectContext = activeProject || {
    name: "FinTech_Isometric_Vectors_V1",
    targetMarketplace: "Adobe Stock",
  };

  const handleDownloadPackage = async () => {
    if (assets.length === 0) {
      toast.warning("No assets available to package.");
      return;
    }

    setIsPackaging(true);
    try {
      const options = {
        profile: selectedProfile,
        filenamePattern: namingPattern,
        includeSource,
        includePreview,
        includeMetadata,
        includeDocumentation: includeDoc,
      };

      const blob = await generateMarketplacePackage(projectContext, assets, options);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const zipFileName = `${projectContext.name}_${selectedProfile}_Submission.zip`;
      a.href = url;
      a.download = zipFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadedZipName(zipFileName);
      toast.success(`Batch package (${assets.length} vectors) generated and downloaded!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate ZIP package: " + err.message);
    } finally {
      setIsPackaging(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Batch Export & Packaging Engine</h1>
            <Badge variant="success">PRD Module 12</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generate marketplace-compliant multi-folder ZIP archives with automated batch metadata CSV.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleDownloadPackage}
          loading={isPackaging}
        >
          <FiDownload />
          <span>Generate & Download ZIP ({assets.length} items)</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configurator & Directory Tree */}
        <div className="lg:col-span-7 space-y-5">
          {/* Packaging Profile & Naming Config Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-surface-border">
              <CardTitle className="text-sm flex items-center gap-2">
                <FiSliders className="text-brand-400" />
                <span>Export Profile Configuration</span>
              </CardTitle>
              <CardDescription>
                Customize marketplace batch CSV format and file renaming conventions
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {/* Marketplace Presets */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Marketplace Target Profile
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {Object.keys(PACKAGING_PROFILES).map((key) => {
                    const p = PACKAGING_PROFILES[key];
                    const isSelected = selectedProfile === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedProfile(key)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-brand-600/15 border-brand-500 text-white shadow-sm"
                            : "bg-surface-darkest border-surface-border text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span className="font-semibold text-xs block leading-tight">{p.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {p.csvColumns.length} CSV Columns
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Naming Pattern Options */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Vector Naming Pattern
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: "{index}_{slug}", label: "001_crypto_fintech.svg" },
                    { id: "{category}_{slug}", label: "finance_crypto_fintech.svg" },
                    { id: "{original}", label: "Original Filename" },
                  ].map((pat) => (
                    <button
                      key={pat.id}
                      onClick={() => setNamingPattern(pat.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all font-mono text-[11px] ${
                        namingPattern === pat.id
                          ? "bg-surface-card border-brand-500 text-brand-300"
                          : "bg-surface-darkest border-surface-border text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {pat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Folder Hierarchy Inclusions */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Included Package Folders
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-darkest border border-surface-border text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSource}
                      onChange={(e) => setIncludeSource(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-brand-600"
                    />
                    <span>SOURCE/</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-darkest border border-surface-border text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePreview}
                      onChange={(e) => setIncludePreview(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-brand-600"
                    />
                    <span>PREVIEW/</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-darkest border border-surface-border text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeMetadata}
                      onChange={(e) => setIncludeMetadata(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-brand-600"
                    />
                    <span>METADATA/</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-darkest border border-surface-border text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeDoc}
                      onChange={(e) => setIncludeDoc(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-brand-600"
                    />
                    <span>MANIFEST/</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Directory Structure Visualization */}
          <Card>
            <CardHeader className="pb-3 border-b border-surface-border">
              <CardTitle className="text-sm flex items-center gap-2">
                <FiArchive className="text-brand-400" />
                <span>Generated ZIP Folder Hierarchy Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-surface-darkest p-4 rounded-xl border border-surface-border font-mono text-xs text-slate-300 space-y-1.5 select-none">
                <div className="flex items-center gap-2 text-brand-400 font-bold">
                  <FiFolder />
                  <span>{projectContext.name}/</span>
                </div>

                <div className="pl-6 space-y-1.5 border-l border-slate-700/60 ml-2 text-[11px]">
                  {includeSource && (
                    <div>
                      <div className="flex items-center gap-2 text-amber-400">
                        <FiFolder />
                        <span>SOURCE/</span>
                        <span className="text-[10px] text-slate-500">({assets.length} clean SVGs)</span>
                      </div>
                      <div className="pl-5 text-slate-400">
                        └── {namingPattern === "{index}_{slug}" ? "001_crypto_fintech.svg" : "vector_asset.svg"}
                      </div>
                    </div>
                  )}

                  {includePreview && (
                    <div>
                      <div className="flex items-center gap-2 text-sky-400">
                        <FiFolder />
                        <span>PREVIEW/</span>
                      </div>
                      <div className="pl-5 text-slate-400">
                        └── {namingPattern === "{index}_{slug}" ? "001_crypto_fintech_preview.svg" : "vector_asset_preview.svg"}
                      </div>
                    </div>
                  )}

                  {includeMetadata && (
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <FiFolder />
                        <span>METADATA/</span>
                      </div>
                      <div className="pl-5 text-slate-400">
                        └── marketplace_metadata.csv ({PACKAGING_PROFILES[selectedProfile].name} format)
                      </div>
                    </div>
                  )}

                  {includeDoc && (
                    <div>
                      <div className="flex items-center gap-2 text-purple-400">
                        <FiFolder />
                        <span>DOCUMENTATION/</span>
                      </div>
                      <div className="pl-5 text-slate-400">
                        ├── SUBMISSION_MANIFEST.json
                        <br />
                        └── README.txt
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Assets Included & Package Action */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader className="border-b border-surface-border pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FiList className="text-brand-400" />
                    <span>Included Batch Assets</span>
                  </CardTitle>
                  <span className="text-xs text-slate-400">{assets.length} assets ready</span>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-2.5 max-h-[380px] overflow-y-auto">
                {assets.map((asset, i) => (
                  <div
                    key={asset.id}
                    className="p-3 rounded-lg bg-surface-darkest border border-surface-border text-xs flex items-center justify-between"
                  >
                    <div className="space-y-0.5 truncate max-w-[220px]">
                      <span className="font-semibold text-slate-200 block truncate">
                        {i + 1}. {asset.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {asset.width}×{asset.height}px · {(asset.metadata?.keywords || []).length} tags
                      </span>
                    </div>

                    <Badge
                      variant={asset.preflightStatus === "passed" ? "success" : "warning"}
                      className="text-[10px]"
                    >
                      {asset.preflightStatus === "passed" ? "Passed" : "Needs Review"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-surface-border bg-surface-darkest/40 rounded-b-xl space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={handleDownloadPackage}
                loading={isPackaging}
              >
                <FiDownload />
                <span>Build & Download Submission ZIP</span>
              </Button>

              {downloadedZipName && (
                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                  <span className="truncate text-[11px] font-mono">{downloadedZipName}</span>
                  <span className="text-[10px] font-semibold text-emerald-400">Ready</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

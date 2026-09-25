"use client";

import { useState } from "react";
import {
  FiPackage,
  FiDownload,
  FiFolder,
  FiFileText,
  FiCheckCircle,
  FiCheck,
  FiArchive,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { generateMarketplacePackage } from "@/lib/packagingEngine";

export default function PackagingModule({ onRestartFlow }) {
  const [isPackaging, setIsPackaging] = useState(false);
  const [packageGenerated, setPackageGenerated] = useState(false);

  const sampleProject = {
    name: "FinTech_Isometric_Vectors_V1",
    targetMarketplace: "Adobe Stock / Shutterstock",
  };

  const sampleAssets = [
    {
      id: "AST-101",
      filename: "fintech_crypto_dashboard_elements.svg",
      name: "FinTech Crypto Dashboard Elements",
      category: "Vector Graphics / Finance",
      metadata: {
        title: "Futuristic Isometric Cryptocurrency Blockchain FinTech Technology Vector Elements",
        description: "High quality scalable vector illustration set for fintech, banking, decentralized cryptocurrency data analytics and dashboard user interfaces.",
        keywords: ["cryptocurrency", "blockchain", "fintech", "banking", "finance", "data", "isometric"],
      },
    },
  ];

  const handleDownloadPackage = async () => {
    setIsPackaging(true);
    try {
      const blob = await generateMarketplacePackage(sampleProject, sampleAssets);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${sampleProject.name}_Submission_Package.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setPackageGenerated(true);
      toast.success("Submission package generated and downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate ZIP package. Please try again.");
    } finally {
      setIsPackaging(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Export & Packaging Engine</h1>
            <Badge variant="success">Step 5 of Golden Path</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build standardized multi-folder marketplace packages containing verified vectors, high-res previews, and auto-generated CSV metadata.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleDownloadPackage}
          loading={isPackaging}
        >
          <FiDownload />
          <span>Generate & Download ZIP</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Package Structure Preview (PRD 12.14) */}
        <div className="lg:col-span-7 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FiArchive className="text-brand-400" />
                <span>Standardized Marketplace Folder Hierarchy</span>
              </CardTitle>
              <CardDescription>
                Matches Adobe Stock Contributor Portal & Shutterstock batch uploader specifications.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="bg-surface-darkest p-5 rounded-xl border border-surface-border font-mono text-xs text-slate-300 space-y-2 select-none">
                <div className="flex items-center gap-2 text-brand-400 font-bold">
                  <FiFolder />
                  <span>{sampleProject.name}/</span>
                </div>

                <div className="pl-6 space-y-1.5 border-l border-slate-700/60 ml-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <FiFolder className="text-amber-400" />
                    <span>SOURCE/</span>
                    <span className="text-[10px] text-slate-400">(Clean EPS / SVG source files)</span>
                  </div>
                  <div className="pl-6 text-slate-400 text-[11px]">
                    └── fintech_crypto_dashboard_elements.svg
                  </div>

                  <div className="flex items-center gap-2 text-slate-300 pt-1">
                    <FiFolder className="text-sky-400" />
                    <span>PREVIEW/</span>
                    <span className="text-[10px] text-slate-400">(Expanded high-res JPEG/SVG previews)</span>
                  </div>
                  <div className="pl-6 text-slate-400 text-[11px]">
                    └── fintech_crypto_dashboard_elements_preview.svg
                  </div>

                  <div className="flex items-center gap-2 text-slate-300 pt-1">
                    <FiFolder className="text-emerald-400" />
                    <span>METADATA/</span>
                    <span className="text-[10px] text-slate-400">(Marketplace batch CSV format)</span>
                  </div>
                  <div className="pl-6 text-slate-400 text-[11px]">
                    └── marketplace_metadata.csv
                  </div>

                  <div className="flex items-center gap-2 text-slate-300 pt-1">
                    <FiFolder className="text-purple-400" />
                    <span>DOCUMENTATION/</span>
                  </div>
                  <div className="pl-6 text-slate-400 text-[11px]">
                    ├── SUBMISSION_MANIFEST.json
                    <br />
                    └── README.txt
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Validation & Summary */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-sm">Packaging Verification Checklist</CardTitle>
                <CardDescription>
                  Quality gate before marketplace submission
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-darkest border border-surface-border text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <FiCheck className="text-emerald-400" />
                    <span>Preflight Vector Doctor</span>
                  </div>
                  <Badge variant="success">Passed</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-darkest border border-surface-border text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <FiCheck className="text-emerald-400" />
                    <span>Design Fit Artboard Boundary</span>
                  </div>
                  <Badge variant="success">Contained</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-darkest border border-surface-border text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <FiCheck className="text-emerald-400" />
                    <span>Metadata CSV Formulation</span>
                  </div>
                  <Badge variant="success">100% Score</Badge>
                </div>
              </CardContent>
            </div>

            <div className="p-4 border-t border-surface-border bg-surface-darkest/40 rounded-b-xl space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={handleDownloadPackage}
                loading={isPackaging}
              >
                <FiDownload />
                <span>Download Submission ZIP</span>
              </Button>

              {packageGenerated && (
                <Button
                  variant="ghost"
                  className="w-full text-xs"
                  onClick={onRestartFlow}
                >
                  Return to Dashboard
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

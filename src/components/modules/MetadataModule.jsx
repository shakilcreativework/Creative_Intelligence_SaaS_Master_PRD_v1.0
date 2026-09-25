"use client";

import { useState } from "react";
import {
  FiTag,
  FiPlus,
  FiX,
  FiZap,
  FiCheck,
  FiAlertCircle,
  FiArrowRight,
  FiSliders,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { validateMetadata } from "@/lib/metadataEngine";

export default function MetadataModule({ onProceedToPackaging }) {
  const [title, setTitle] = useState(
    "Futuristic Isometric Cryptocurrency Blockchain FinTech Technology Vector Elements"
  );
  const [description, setDescription] = useState(
    "High quality scalable vector illustration set for fintech, banking, decentralized cryptocurrency data analytics and dashboard user interfaces."
  );
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([
    "cryptocurrency", "blockchain", "fintech", "banking", "finance", "data",
    "analytics", "isometric", "crypto", "trading", "digital", "technology",
    "money", "currency", "decentralized", "investment", "graph", "chart"
  ]);

  const validation = validateMetadata({ title, description, keywords });

  const handleAddKeyword = (e) => {
    e?.preventDefault();
    const trimmed = keywordInput.trim().toLowerCase();
    if (!trimmed) return;

    if (keywords.includes(trimmed)) {
      toast.warning(`Keyword "${trimmed}" is already in your list.`);
      return;
    }

    setKeywords([...keywords, trimmed]);
    setKeywordInput("");
    toast.success(`Added keyword: ${trimmed}`);
  };

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleCleanDuplicates = () => {
    setKeywords(validation.cleanedKeywords);
    toast.success("Duplicates cleaned automatically!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Metadata Studio</h1>
            <Badge variant="primary">Marketplace Ready</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Prepare, optimize, and validate titles and keywords for maximum search visibility on Adobe Stock & Shutterstock.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-surface-card px-4 py-2 rounded-xl border border-surface-border">
          <div className="text-right">
            <div className="text-xs text-slate-400">SEO Health Score</div>
            <div className="text-lg font-bold text-emerald-400">{validation.score}%</div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-500/10">
            <FiZap className="text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-8 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Asset Title & Description</CardTitle>
              <CardDescription>
                Titles should be clear, factual, and between 25 to 70 characters.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Title</label>
                  <span
                    className={`text-[11px] ${
                      title.length > 70 ? "text-amber-400" : "text-slate-400"
                    }`}
                  >
                    {title.length} / 70 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          {/* Keywords Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm">Keyword Tagging</CardTitle>
                <CardDescription>
                  {keywords.length} of 50 keywords used (Marketplaces allow up to 50 tags)
                </CardDescription>
              </div>

              {keywords.length !== validation.cleanedKeywords.length && (
                <Button size="sm" variant="outline" onClick={handleCleanDuplicates}>
                  Remove Duplicates
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleAddKeyword} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a keyword and press Enter..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  className="flex-1 bg-surface-darkest border border-surface-border rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
                <Button type="submit" size="sm" variant="primary">
                  <FiPlus /> Add Tag
                </Button>
              </form>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2 pt-2 min-h-[120px] p-3 rounded-xl bg-surface-darkest/50 border border-surface-border">
                {keywords.map((kw, i) => (
                  <span
                    key={`${kw}-${i}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-surface-card border border-surface-border text-slate-200 group hover:border-brand-500/50 transition-colors"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(i)}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <FiX className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Validation & Insights */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-sm">Marketplace Quality Checks</CardTitle>
                <CardDescription>Automated compliance scanner</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {validation.issues.length === 0 ? (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
                    <FiCheck className="text-emerald-400 text-base" />
                    <span>All metadata fields pass marketplace rules!</span>
                  </div>
                ) : (
                  validation.issues.map((iss, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border text-xs space-y-1 ${
                        iss.severity === "error"
                          ? "bg-rose-950/20 border-rose-500/30 text-rose-300"
                          : "bg-amber-950/20 border-amber-500/30 text-amber-300"
                      }`}
                    >
                      <div className="font-semibold flex items-center gap-1.5">
                        <FiAlertCircle />
                        <span className="capitalize">{iss.field}:</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{iss.message}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </div>

            <div className="p-4 border-t border-surface-border bg-surface-darkest/40 rounded-b-xl">
              <Button
                variant="primary"
                className="w-full"
                onClick={onProceedToPackaging}
              >
                <span>Proceed to Export & Packaging</span>
                <FiArrowRight />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

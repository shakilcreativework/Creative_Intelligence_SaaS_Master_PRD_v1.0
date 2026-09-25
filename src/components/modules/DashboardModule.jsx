"use client";

import {
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiUploadCloud,
  FiPackage,
  FiArrowUpRight,
  FiZap,
} from "react-icons/fi";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function DashboardModule({ onNavigate, stats, projects }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner / Value Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-900/60 via-surface-card to-surface-dark border border-brand-500/20 p-6 md:p-8">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary" className="text-xs">
              Creative Production Intelligence
            </Badge>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Preflight Engine Active
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Research smarter. Check quality. Package faster.
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Eliminate repetitive stock vector production tasks, catch artboard boundary and font errors before submission, and prepare marketplace packages in seconds.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate("preflight")}
            >
              <FiCheckCircle />
              <span>Launch Preflight Doctor</span>
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onNavigate("metadata")}
            >
              <FiZap />
              <span>Metadata Studio</span>
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-600/10 to-transparent pointer-events-none" />
      </div>

      {/* KPI & Value Metrics Cards (PRD Section 31/32) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-surface-card/70 hover:border-brand-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Time Saved This Week</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <FiClock className="text-base" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">4.8 hrs</div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <FiArrowUpRight /> +1.2 hrs vs last week
            </p>
          </div>
        </Card>

        <Card className="bg-surface-card/70 hover:border-brand-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Preflight Pass Rate</span>
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
              <FiCheckCircle className="text-base" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">96.4%</div>
            <p className="text-[11px] text-slate-400 mt-1">
              28 of 29 vectors submission ready
            </p>
          </div>
        </Card>

        <Card className="bg-surface-card/70 hover:border-brand-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Detected Issues Auto-Fixed</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <FiAlertTriangle className="text-base" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">14</div>
            <p className="text-[11px] text-amber-400 mt-1">
              Artboard overhang & live fonts
            </p>
          </div>
        </Card>

        <Card className="bg-surface-card/70 hover:border-brand-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Packages Generated</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <FiPackage className="text-base" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">6 ZIPs</div>
            <p className="text-[11px] text-sky-400 mt-1">
              Ready for Adobe Stock & Shutterstock
            </p>
          </div>
        </Card>
      </div>

      {/* Grid: Active Projects & Golden Path Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects (PRD 12.4) */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Recent vector collections and marketplaces</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("projects")}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-3.5 rounded-lg bg-surface-darkest/60 border border-surface-border hover:border-brand-500/40 transition-colors flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">
                          {project.name}
                        </span>
                        <Badge variant="primary" className="text-[10px]">
                          {project.targetMarketplace}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400">
                        {project.assetCount} assets · {project.category} · Updated {project.updatedAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {project.status}
                      </span>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onNavigate("preflight")}
                      >
                        Inspect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opportunity Card (PRD 12.11) */}
        <div>
          <Card className="h-full border-brand-500/30 bg-gradient-to-b from-brand-950/20 to-surface-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="warning" className="text-[10px]">
                  Marketplace Signal
                </Badge>
                <span className="text-[11px] text-slate-400">High Demand</span>
              </div>
              <CardTitle className="text-base mt-2">
                Opportunity: Fintech 3D Isometric Vectors
              </CardTitle>
              <CardDescription>
                Identified gap in your vector portfolio matching seasonal Adobe Stock demand.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-surface-darkest/70 border border-surface-border text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Category:</span>
                  <span className="text-slate-200 font-medium">Business / Finance</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Competition Index:</span>
                  <span className="text-emerald-400 font-medium">Low (High Opportunity)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recommended Asset Size:</span>
                  <span className="text-slate-200 font-medium">10 - 15 items</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => onNavigate("opportunities")}
              >
                Explore Opportunity Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

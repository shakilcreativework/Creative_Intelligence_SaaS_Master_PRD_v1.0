"use client";

import {
  FiGrid,
  FiFolder,
  FiImage,
  FiCheckCircle,
  FiMaximize2,
  FiTag,
  FiPackage,
  FiTrendingUp,
  FiSettings,
  FiHelpCircle,
  FiCompass,
  FiLayers,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function Sidebar({ currentTab, onSelectTab }) {
  const primaryNav = [
    { id: "dashboard", label: "Dashboard", icon: FiGrid },
    { id: "projects", label: "Projects", icon: FiFolder },
    { id: "assets", label: "Asset Library", icon: FiImage },
    { id: "preflight", label: "Preflight Doctor", icon: FiCheckCircle, badge: "Core" },
    { id: "designfit", label: "Design Fit Checker", icon: FiMaximize2 },
    { id: "similarity", label: "Similarity Engine", icon: FiTrendingUp },
    { id: "consistency", label: "Collection Consistency", icon: FiLayers, badge: "CONS-001" },
    { id: "metadata", label: "Metadata Studio", icon: FiTag },
    { id: "packaging", label: "Export & Packaging", icon: FiPackage },
    { id: "opportunities", label: "Opportunities", icon: FiCompass },
  ];

  const secondaryNav = [
    { id: "settings", label: "Settings & Usage", icon: FiSettings },
    { id: "docs", label: "PRD & Guides", icon: FiHelpCircle },
  ];

  return (
    <aside className="w-64 border-r border-surface-border bg-surface-darkest/95 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none">
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Navigation Group */}
        <div>
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Production Intelligence
          </p>
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group",
                    isActive
                      ? "bg-brand-600/15 text-brand-300 border border-brand-500/30 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-surface-card"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "text-base transition-colors",
                        isActive ? "text-brand-400" : "text-slate-400 group-hover:text-slate-300"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quota / Status Overview Box */}
        <div className="bg-surface-card/60 border border-surface-border rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Preflight Quota</span>
            <span className="text-[11px] text-brand-400 font-medium">84 / 100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-brand-500 h-1.5 rounded-full w-[84%]" />
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            16 deterministic vector checks remaining in current monthly cycle.
          </p>
        </div>
      </div>

      {/* Footer secondary links */}
      <div className="p-4 border-t border-surface-border space-y-1">
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                isActive
                  ? "bg-surface-card text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-surface-card/50"
              )}
            >
              <Icon className="text-base text-slate-400" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

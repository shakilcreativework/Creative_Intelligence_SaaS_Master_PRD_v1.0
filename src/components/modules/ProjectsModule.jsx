"use client";

import { useState } from "react";
import {
  FiFolder,
  FiPlus,
  FiFilter,
  FiExternalLink,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function ProjectsModule({ projects, onInspectProject }) {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Project Workspaces</h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize vector collections, track preflight status, and manage marketplace export packages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["all", "ready", "in progress"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition-all ${
                filter === f
                  ? "bg-brand-600 text-white"
                  : "bg-surface-card text-slate-400 hover:text-slate-200 border border-surface-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="hover:border-brand-500/40 cursor-pointer flex flex-col justify-between"
            onClick={() => onInspectProject(project)}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
                  <FiFolder className="text-lg" />
                </div>
                <Badge
                  variant={project.status === "Ready" ? "success" : "primary"}
                >
                  {project.status}
                </Badge>
              </div>

              <h3 className="font-semibold text-white text-base mb-1">
                {project.name}
              </h3>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                {project.description || "Vector collection optimized for microstock marketplaces."}
              </p>
            </div>

            <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs text-slate-400">
              <span>{project.assetCount} assets</span>
              <span className="text-brand-400 font-medium flex items-center gap-1">
                Inspect <FiExternalLink className="text-[11px]" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

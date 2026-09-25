"use client";

import { useState } from "react";
import { FiX, FiLayers, FiCheck, FiPlus, FiUsers, FiBriefcase, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function WorkspaceModal({
  isOpen,
  onClose,
  workspaces,
  activeWorkspace,
  onSelectWorkspace,
  onCreateWorkspace,
}) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [targetMarketplace, setTargetMarketplace] = useState("Adobe Stock");

  if (!isOpen) return null;

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) {
      toast.warning("Please enter a workspace name.");
      return;
    }

    const created = {
      id: `WS-${Date.now().toString().slice(-4)}`,
      name: newWorkspaceName.trim(),
      subtitle: `${targetMarketplace} Portfolio`,
      role: "Owner",
      memberCount: 1,
      type: "Team",
      plan: "Creator Pro",
    };

    onCreateWorkspace(created);
    setNewWorkspaceName("");
    setShowCreateForm(false);
    toast.success(`Created and switched to "${created.name}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-dark border border-surface-border p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
              <FiLayers className="text-base" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Workspaces & Organizations</h3>
              <p className="text-[11px] text-slate-400">
                Switch workspaces or invite team collaborators (PRD Section 12.2)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {!showCreateForm ? (
          <div className="space-y-4">
            {/* Workspaces List */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {workspaces.map((ws) => {
                const isActive = activeWorkspace.id === ws.id;
                return (
                  <div
                    key={ws.id}
                    onClick={() => {
                      onSelectWorkspace(ws);
                      toast.info(`Switched to "${ws.name}"`);
                      onClose();
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                      isActive
                        ? "bg-brand-600/10 border-brand-500/50 shadow-sm"
                        : "bg-surface-darkest/70 border-surface-border hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isActive
                            ? "bg-brand-600 text-white"
                            : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                        }`}
                      >
                        {ws.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white">
                            {ws.name}
                          </span>
                          {isActive && (
                            <Badge variant="primary" className="text-[10px] py-0 px-1.5">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          {ws.subtitle} · {ws.memberCount} member{ws.memberCount > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-[10px]">
                        {ws.role}
                      </Badge>
                      {isActive && <FiCheck className="text-brand-400 text-base" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Create Workspace CTA */}
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={() => setShowCreateForm(true)}
            >
              <FiPlus />
              <span>Create New Workspace</span>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Workspace Name
              </label>
              <input
                type="text"
                placeholder="e.g. Cyberpunk Vector Studio"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                autoFocus
                className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Primary Target Marketplace
              </label>
              <select
                value={targetMarketplace}
                onChange={(e) => setTargetMarketplace(e.target.value)}
                className="w-full bg-surface-darkest border border-surface-border rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="Adobe Stock">Adobe Stock</option>
                <option value="Shutterstock">Shutterstock</option>
                <option value="Freepik / Envato">Freepik / Envato</option>
                <option value="Multi-Marketplace">Multi-Marketplace</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Create Workspace
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

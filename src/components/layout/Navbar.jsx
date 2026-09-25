"use client";

import { useState } from "react";
import {
  FiBell,
  FiPlus,
  FiSearch,
  FiLayers,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiLogIn,
} from "react-icons/fi";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Navbar({
  onNewProject,
  activeWorkspace,
  onOpenWorkspaceModal,
  user,
  onOpenAuthModal,
  onSignOut,
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 border-b border-surface-border bg-surface-dark/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Brand & Workspace Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center shadow-md shadow-brand-500/20">
            <FiLayers className="text-white text-lg" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base">
                CreativeIntel
              </span>
              <Badge variant="primary" className="text-[10px] py-0 px-2">
                PROD-MVP
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Stock & Vector Production System
            </p>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-surface-border mx-1 hidden sm:block" />

        {/* Interactive Workspace Switcher Trigger */}
        <button
          onClick={onOpenWorkspaceModal}
          className="hidden md:flex items-center gap-2.5 bg-surface-card hover:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-surface-border text-xs text-slate-300 transition-all cursor-pointer group"
          title="Click to Switch Workspace"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <span className="font-semibold text-slate-200 block leading-tight">
              {activeWorkspace?.name || "Personal Workspace"}
            </span>
            <span className="text-[10px] text-slate-400 block leading-tight">
              {activeWorkspace?.subtitle || "Vector Portfolio"}
            </span>
          </div>
          <FiChevronDown className="text-slate-400 group-hover:text-slate-200 text-xs ml-1" />
        </button>
      </div>

      {/* Global Search & User Actions */}
      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search vectors, preflight..."
            className="w-full bg-surface-card border border-surface-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <button
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-surface-card transition-colors relative"
          title="Notifications"
        >
          <FiBell className="text-base" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
        </button>

        <Button
          size="sm"
          variant="primary"
          onClick={onNewProject}
          className="font-medium"
        >
          <FiPlus className="text-sm" />
          <span className="hidden sm:inline">New Project</span>
        </Button>

        {/* User Account / Session Dropdown */}
        <div className="relative">
          {user ? (
            <div>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-card transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs">
                  {user.name?.slice(0, 2).toUpperCase() || "CR"}
                </div>
                <div className="hidden xl:block text-left text-xs">
                  <div className="font-semibold text-slate-200 leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-brand-400 leading-tight">
                    {user.role || "Owner"}
                  </div>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-dark border border-surface-border p-1.5 shadow-xl z-50 text-xs space-y-1">
                  <div className="px-3 py-2 border-b border-surface-border">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenWorkspaceModal();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-surface-card hover:text-white"
                  >
                    Switch Workspace
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onSignOut();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                  >
                    <FiLogOut className="text-xs" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={onOpenAuthModal}
              className="gap-1.5"
            >
              <FiLogIn className="text-xs" />
              <span>Sign In</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

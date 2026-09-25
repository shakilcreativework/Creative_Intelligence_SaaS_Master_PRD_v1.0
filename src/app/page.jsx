"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DashboardModule from "@/components/modules/DashboardModule";
import PreflightModule from "@/components/modules/PreflightModule";
import MetadataModule from "@/components/modules/MetadataModule";
import PackagingModule from "@/components/modules/PackagingModule";
import ProjectsModule from "@/components/modules/ProjectsModule";
import OpportunitiesModule from "@/components/modules/OpportunitiesModule";
import AuthModal from "@/components/auth/AuthModal";
import WorkspaceModal from "@/components/workspace/WorkspaceModal";

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState("dashboard");

  // User Authentication State (Better Auth integration)
  const [user, setUser] = useState({
    name: "Elena Rostova",
    email: "elena.stock@vectors.net",
    role: "Owner",
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Multi-Tenant Workspaces (PRD Section 12.2)
  const [workspaces, setWorkspaces] = useState([
    {
      id: "WS-01",
      name: "Personal Workspace",
      subtitle: "Vector Portfolio",
      role: "Owner",
      memberCount: 1,
      type: "Personal",
      plan: "Creator Pro",
    },
    {
      id: "WS-02",
      name: "CyberVector Studio Agency",
      subtitle: "Microstock Team",
      role: "Admin",
      memberCount: 4,
      type: "Team",
      plan: "Studio Team",
    },
  ]);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  // Project Workspaces Scoped to Tenants
  const [projects, setProjects] = useState([
    {
      id: "PRJ-001",
      workspaceId: "WS-01",
      name: "FinTech 3D Isometric Vectors",
      category: "Business / Finance",
      status: "Ready",
      targetMarketplace: "Adobe Stock",
      assetCount: 12,
      updatedAt: "Today, 15:40",
      description: "Isometric blockchain, cryptocurrency, and digital wallet assets.",
    },
    {
      id: "PRJ-002",
      workspaceId: "WS-01",
      name: "Clean Energy Flat Icons",
      category: "Environment / Icons",
      status: "In Progress",
      targetMarketplace: "Shutterstock",
      assetCount: 16,
      updatedAt: "Yesterday",
      description: "Consistent 24px stroke icon system for solar and wind power.",
    },
    {
      id: "PRJ-003",
      workspaceId: "WS-02",
      name: "Cyberpunk Futuristic HUD Interfaces",
      category: "Technology / UI",
      status: "In Progress",
      targetMarketplace: "Adobe Stock",
      assetCount: 8,
      updatedAt: "2 days ago",
      description: "Sci-fi vector user interfaces and gaming icons for team client deliveries.",
    },
  ]);

  // Filter projects by active workspace
  const workspaceProjects = projects.filter(
    (p) => !p.workspaceId || p.workspaceId === activeWorkspace.id
  );

  const handleNewProject = () => {
    const newProj = {
      id: `PRJ-${String(projects.length + 1).padStart(3, "0")}`,
      workspaceId: activeWorkspace.id,
      name: `New Vector Collection ${projects.length + 1}`,
      category: "Vector Graphics",
      status: "In Progress",
      targetMarketplace: "Adobe Stock",
      assetCount: 1,
      updatedAt: "Just now",
      description: `Collection created in ${activeWorkspace.name}.`,
    };

    setProjects([newProj, ...projects]);
    toast.success(`Project "${newProj.name}" created in ${activeWorkspace.name}!`);
    setCurrentTab("preflight");
  };

  const handleStartOpportunity = (opp) => {
    const newProj = {
      id: `PRJ-${String(projects.length + 1).padStart(3, "0")}`,
      workspaceId: activeWorkspace.id,
      name: opp.title,
      category: opp.category,
      status: "In Progress",
      targetMarketplace: "Adobe Stock",
      assetCount: 1,
      updatedAt: "Just now",
      description: opp.reason,
    };

    setProjects([newProj, ...projects]);
    toast.success(`Initialized project from Opportunity: "${opp.title}"`);
    setCurrentTab("preflight");
  };

  const handleCreateWorkspace = (newWs) => {
    setWorkspaces([...workspaces, newWs]);
    setActiveWorkspace(newWs);
  };

  const handleSignOut = () => {
    setUser(null);
    toast.info("Signed out of CreativeIntel.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-darkest text-slate-100">
      {/* Top Navbar with Workspace Switcher & User Profile */}
      <Navbar
        onNewProject={handleNewProject}
        activeWorkspace={activeWorkspace}
        onOpenWorkspaceModal={() => setIsWorkspaceOpen(true)}
        user={user}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Workspace Frame */}
      <div className="flex flex-1 overflow-hidden">
        {/* Persistent Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
        />

        {/* Dynamic Module Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto w-full">
          {currentTab === "dashboard" && (
            <DashboardModule
              onNavigate={(tab) => setCurrentTab(tab)}
              projects={workspaceProjects}
            />
          )}

          {currentTab === "projects" && (
            <ProjectsModule
              projects={workspaceProjects}
              onInspectProject={() => setCurrentTab("preflight")}
            />
          )}

          {(currentTab === "preflight" || currentTab === "designfit") && (
            <PreflightModule
              onProceedToMetadata={() => {
                setCurrentTab("metadata");
                toast.info("Moved to Metadata Studio");
              }}
            />
          )}

          {currentTab === "metadata" && (
            <MetadataModule
              onProceedToPackaging={() => {
                setCurrentTab("packaging");
                toast.info("Moved to Export & Packaging Engine");
              }}
            />
          )}

          {currentTab === "packaging" && (
            <PackagingModule
              onRestartFlow={() => {
                setCurrentTab("dashboard");
                toast.success("Golden Path cycle completed!");
              }}
            />
          )}

          {currentTab === "opportunities" && (
            <OpportunitiesModule
              onStartOpportunity={handleStartOpportunity}
            />
          )}

          {(currentTab === "settings" || currentTab === "docs") && (
            <div className="p-8 text-center space-y-4 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-white">System Settings & Quotas</h2>
              <p className="text-xs text-slate-400">
                Active Tenant: <strong className="text-white">{activeWorkspace.name}</strong> · Role: {activeWorkspace.role} · Plan: {activeWorkspace.plan}
              </p>
              <div className="p-4 rounded-xl bg-surface-card border border-surface-border text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Session User:</span>
                  <span className="text-slate-200">{user ? user.email : "Guest"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Workspace Type:</span>
                  <span className="text-slate-200">{activeWorkspace.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Collaborators:</span>
                  <span className="text-slate-200">{activeWorkspace.memberCount} active</span>
                </div>
              </div>
              <button
                onClick={() => setCurrentTab("dashboard")}
                className="text-xs text-brand-400 underline hover:text-brand-300"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />

      <WorkspaceModal
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
        workspaces={workspaces}
        activeWorkspace={activeWorkspace}
        onSelectWorkspace={(ws) => setActiveWorkspace(ws)}
        onCreateWorkspace={handleCreateWorkspace}
      />
    </div>
  );
}

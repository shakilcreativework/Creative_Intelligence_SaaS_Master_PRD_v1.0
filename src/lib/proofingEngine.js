/**
 * Creative Intelligence SaaS - Designer Proofing & Revision Management (PROOF-001, REV-001 / PRD §12.15)
 * Handles client review links, pin-point visual annotations on canvas, version history,
 * and review approval states (Draft, Sent for Review, Changes Requested, Approved, Final).
 */

export const REVISION_STATES = {
  DRAFT: { id: "Draft", label: "Draft", badge: "default", color: "slate" },
  SENT_FOR_REVIEW: { id: "Sent for Review", label: "Sent for Review", badge: "info", color: "blue" },
  CHANGES_REQUESTED: { id: "Changes Requested", label: "Changes Requested", badge: "warning", color: "amber" },
  APPROVED: { id: "Approved", label: "Approved", badge: "success", color: "emerald" },
  FINAL: { id: "Final", label: "Final Release", badge: "brand", color: "indigo" },
};

export const INITIAL_PROOFING_SESSIONS = [
  {
    id: "PRF-801",
    assetId: "AST-001",
    assetTitle: "Crypto FinTech Isometric Nodes",
    clientName: "Apex Digital Assets Ltd",
    clientEmail: "artdirector@apexdigital.io",
    version: "v1.2",
    state: "Changes Requested",
    shareableToken: "rev_801_apex_crypto_nodes",
    createdAt: "2026-09-24T10:00:00Z",
    updatedAt: "2026-09-25T14:30:00Z",
    versions: [
      { version: "v1.0", date: "2026-09-23", note: "Initial vector concept and isometric grid layout." },
      { version: "v1.1", date: "2026-09-24", note: "Standardized 2px stroke and primary violet brand palette." },
      { version: "v1.2", date: "2026-09-25", note: "Integrated secondary emerald node accents." },
    ],
    comments: [
      {
        id: "CMT-1",
        author: "Marcus Chen (Art Director)",
        text: "Please increase the contrast on the central blockchain nexus node. It blends slightly with the isometric grid.",
        xPercent: 52,
        yPercent: 44,
        resolved: false,
        timestamp: "2026-09-25T11:20:00Z",
      },
      {
        id: "CMT-2",
        author: "Elena Rostova (Designer)",
        text: "Adjusted central nexus glow to #10B981 emerald with high contrast fill.",
        xPercent: 52,
        yPercent: 56,
        resolved: true,
        timestamp: "2026-09-25T12:05:00Z",
      },
      {
        id: "CMT-3",
        author: "Marcus Chen (Art Director)",
        text: "Top right wireless data node could use slightly softer corner curves.",
        xPercent: 78,
        yPercent: 26,
        resolved: false,
        timestamp: "2026-09-25T14:15:00Z",
      },
    ],
  },
  {
    id: "PRF-802",
    assetId: "AST-003",
    assetTitle: "Clean Energy Eco Icons",
    clientName: "GreenFuture Impact Agency",
    clientEmail: "design@greenfuture.earth",
    version: "v2.0",
    state: "Approved",
    shareableToken: "rev_802_green_eco_icons",
    createdAt: "2026-09-22T09:00:00Z",
    updatedAt: "2026-09-25T08:00:00Z",
    versions: [
      { version: "v1.0", date: "2026-09-22", note: "Outline icon drafts." },
      { version: "v2.0", date: "2026-09-25", note: "Applied 2px uniform stroke and round linecaps." },
    ],
    comments: [
      {
        id: "CMT-4",
        author: "Sophia Valenti (Client)",
        text: "The wind turbine icon stroke aligns beautifully with our brand guidelines. Approved for packaging!",
        xPercent: 50,
        yPercent: 50,
        resolved: true,
        timestamp: "2026-09-25T07:45:00Z",
      },
    ],
  },
];

/**
 * Creates a new proofing review session
 */
export function createProofingSession(data) {
  const token = `rev_${Date.now().toString(36)}_${(data.clientName || "review").toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
  return {
    id: `PRF-${Math.floor(100 + Math.random() * 900)}`,
    assetId: data.assetId || "AST-001",
    assetTitle: data.assetTitle || "Untitled Asset",
    clientName: data.clientName || "Valued Client",
    clientEmail: data.clientEmail || "",
    version: "v1.0",
    state: "Draft",
    shareableToken: token,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    versions: [
      { version: "v1.0", date: new Date().toISOString().slice(0, 10), note: "Initial proofing draft." },
    ],
    comments: [],
  };
}

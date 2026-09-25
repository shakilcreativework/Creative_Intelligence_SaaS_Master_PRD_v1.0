/**
 * Creative Intelligence SaaS - Production Activity & Historical Audit Log (PORT-001 / PRD §27)
 * Implements an immutable audit trail and historical activity feed tracking the lifecycle
 * of creative assets from ingestion to marketplace packaging and submission.
 */

export const ACTIVITY_EVENT_TYPES = {
  ASSET_UPLOADED: {
    id: "ASSET_UPLOADED",
    label: "Asset Uploaded",
    badge: "info",
    category: "Ingestion",
  },
  PREFLIGHT_RUN: {
    id: "PREFLIGHT_RUN",
    label: "Preflight Analysis",
    badge: "brand",
    category: "Quality",
  },
  AUTO_FIX_APPLIED: {
    id: "AUTO_FIX_APPLIED",
    label: "Auto-Fix Applied",
    badge: "success",
    category: "Sanitization",
  },
  SIMILARITY_SCANNED: {
    id: "SIMILARITY_SCANNED",
    label: "Similarity Scan",
    badge: "warning",
    category: "Differentiation",
  },
  CONSISTENCY_CHECKED: {
    id: "CONSISTENCY_CHECKED",
    label: "Consistency Audit",
    badge: "indigo",
    category: "Standardization",
  },
  METADATA_OPTIMIZED: {
    id: "METADATA_OPTIMIZED",
    label: "Metadata Formulated",
    badge: "purple",
    category: "SEO",
  },
  PACKAGE_GENERATED: {
    id: "PACKAGE_GENERATED",
    label: "Export Packaged",
    badge: "success",
    category: "Export",
  },
  REJECTION_RECORDED: {
    id: "REJECTION_RECORDED",
    label: "Rejection Logged",
    badge: "danger",
    category: "Review",
  },
};

export const INITIAL_AUDIT_LOGS = [
  {
    id: "EVT-1092",
    timestamp: "2026-09-25T18:45:20Z",
    type: "PACKAGE_GENERATED",
    assetId: "AST-001",
    assetTitle: "Crypto FinTech Isometric Nodes",
    user: "Elena Rostova (Owner)",
    workspaceId: "WS-01",
    action: "Generated Adobe Stock submission package with SUBMISSION_MANIFEST.json.",
    details: {
      profile: "Adobe Stock",
      naming: "{index}_{slug}",
      filesIncluded: 4,
    },
    ipAddress: "192.168.1.42",
  },
  {
    id: "EVT-1091",
    timestamp: "2026-09-25T18:15:00Z",
    type: "CONSISTENCY_CHECKED",
    assetId: "COL-CYBER-01",
    assetTitle: "Cyber Security Glyph Set",
    user: "Elena Rostova (Owner)",
    workspaceId: "WS-01",
    action: "Ran collection consistency check across 6 icons. Detected 1 deviant asset (stroke 3px).",
    details: {
      healthScore: 89,
      dominantStroke: "2.0px",
      dominantCanvas: "24x24",
    },
    ipAddress: "192.168.1.42",
  },
  {
    id: "EVT-1090",
    timestamp: "2026-09-25T17:30:10Z",
    type: "SIMILARITY_SCANNED",
    assetId: "AST-001",
    assetTitle: "Crypto FinTech Isometric Nodes",
    user: "Elena Rostova (Owner)",
    workspaceId: "WS-01",
    action: "Compared AST-001 against AST-002. Highest similarity: 64% (Concept: 82%, Visual: 48%).",
    details: {
      verdict: "Moderate Overlap",
      riskLevel: "Medium",
    },
    ipAddress: "192.168.1.42",
  },
  {
    id: "EVT-1089",
    timestamp: "2026-09-25T16:50:44Z",
    type: "METADATA_OPTIMIZED",
    assetId: "AST-001",
    assetTitle: "Crypto FinTech Isometric Nodes",
    user: "Elena Rostova (Owner)",
    workspaceId: "WS-01",
    action: "Updated metadata title and 28 keywords. SEO Quality Score increased to 92/100.",
    details: {
      seoScore: 92,
      keywordCount: 28,
      bannedTermsDetected: 0,
    },
    ipAddress: "192.168.1.42",
  },
  {
    id: "EVT-1088",
    timestamp: "2026-09-25T15:20:12Z",
    type: "AUTO_FIX_APPLIED",
    assetId: "AST-002",
    assetTitle: "Crypto Analytics Chart Unclipped",
    user: "Elena Rostova (Owner)",
    workspaceId: "WS-01",
    action: "Sanitized vector: Injected SVG clip-path boundary and outlined live font dependencies.",
    details: {
      preflightBefore: 45,
      preflightAfter: 100,
      sanitizedSize: "1600x1200",
    },
    ipAddress: "192.168.1.42",
  },
  {
    id: "EVT-1087",
    timestamp: "2026-09-25T14:10:05Z",
    type: "PREFLIGHT_RUN",
    assetId: "AST-002",
    assetTitle: "Crypto Analytics Chart Unclipped",
    user: "Elena Rostova (Owner)",
    workspaceId: "WS-01",
    action: "Preflight inspection detected 2 errors: unexpanded <text> element and 20px artboard overflow.",
    details: {
      healthScore: 45,
      status: "failed",
      hasLiveText: true,
      boundsOverflow: 20,
    },
    ipAddress: "192.168.1.42",
  },
  {
    id: "EVT-1086",
    timestamp: "2026-09-25T13:00:00Z",
    type: "ASSET_UPLOADED",
    assetId: "AST-001",
    assetTitle: "Crypto FinTech Isometric Nodes",
    user: "Elena Rostova (Owner)",
    workspaceId: "WS-01",
    action: "Uploaded vector SVG file 'crypto_fintech_isometric_nodes.svg' (4000x2800px).",
    details: {
      format: "SVG",
      fileSize: "184 KB",
    },
    ipAddress: "192.168.1.42",
  },
  {
    id: "EVT-1085",
    timestamp: "2026-09-25T12:00:00Z",
    type: "REJECTION_RECORDED",
    assetId: "AST-002",
    assetTitle: "Crypto Analytics Chart Unclipped",
    user: "Elena Rostova (Owner)",
    workspaceId: "WS-01",
    action: "Logged Adobe Stock reviewer rejection notice: Unexpanded live fonts.",
    details: {
      marketplace: "Adobe Stock",
      category: "technical",
    },
    ipAddress: "192.168.1.42",
  },
];

/**
 * Filter activity and audit events
 * @param {Array} logs 
 * @param {object} filterOptions { type, search, assetId, startDate }
 * @returns {Array} Filtered events
 */
export function filterAuditLogs(logs = INITIAL_AUDIT_LOGS, filterOptions = {}) {
  const { type = "all", search = "", assetId = "all" } = filterOptions;

  return logs.filter((log) => {
    // Type match
    if (type !== "all" && log.type !== type) return false;

    // Asset match
    if (assetId !== "all" && log.assetId !== assetId) return false;

    // Search query match
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = (log.assetTitle || "").toLowerCase().includes(q);
      const matchAction = (log.action || "").toLowerCase().includes(q);
      const matchUser = (log.user || "").toLowerCase().includes(q);
      const matchId = (log.id || "").toLowerCase().includes(q);
      if (!matchTitle && !matchAction && !matchUser && !matchId) return false;
    }

    return true;
  });
}

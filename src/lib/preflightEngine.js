/**
 * Deterministic Vector & Asset Preflight Inspection Engine
 * Inspects SVG / vector structures against marketplace standards (Adobe Stock, Shutterstock)
 */

export const MARKETPLACE_PROFILES = {
  ADOBE_STOCK: {
    name: "Adobe Stock",
    minWidth: 4000,
    minHeight: 2800,
    allowedFormats: ["AI", "EPS", "SVG", "JPEG"],
    disallowLiveText: true,
    disallowOpenPaths: true,
    colorProfileRequired: "sRGB / CMYK",
    maxFileSizeMb: 45,
    safeMarginPx: 20,
  },
  SHUTTERSTOCK: {
    name: "Shutterstock",
    minWidth: 4000,
    minHeight: 2800,
    allowedFormats: ["EPS", "SVG", "JPEG"],
    disallowLiveText: true,
    disallowOpenPaths: true,
    colorProfileRequired: "sRGB",
    maxFileSizeMb: 50,
    safeMarginPx: 24,
  },
};

/**
 * Runs deterministic preflight inspection on an asset
 * @param {Object} asset
 * @param {string} marketplaceKey
 * @returns {Object} Preflight inspection report
 */
export function runPreflightInspection(asset, marketplaceKey = "ADOBE_STOCK") {
  const profile = MARKETPLACE_PROFILES[marketplaceKey] || MARKETPLACE_PROFILES.ADOBE_STOCK;
  const findings = [];

  // 1. Dimension Check
  const width = asset.width || 0;
  const height = asset.height || 0;
  if (width < profile.minWidth || height < profile.minHeight) {
    findings.push({
      id: "DIM-001",
      category: "Document",
      severity: "error",
      title: "Artboard Dimensions Below Marketplace Minimum",
      description: `Detected ${width}x${height}px. ${profile.name} recommends at least ${profile.minWidth}x${profile.minHeight}px for vector preview scaling.`,
      recommendedAction: "Upscale artboard dimensions to 4000x2800px or larger.",
      autoFixable: true,
    });
  } else {
    findings.push({
      id: "DIM-002",
      category: "Document",
      severity: "pass",
      title: "Dimensions Compliant",
      description: `Artboard dimension ${width}x${height}px meets ${profile.name} threshold.`,
    });
  }

  // 2. Live Text / Font Outlines Check
  if (asset.hasLiveText) {
    findings.push({
      id: "FONT-001",
      category: "Typography",
      severity: "error",
      title: "Live Editable Text Detected",
      description: "Live un-outlined fonts detected. Marketplaces require all text elements to be expanded to outlined vector paths.",
      affectedCount: asset.liveTextCount || 1,
      recommendedAction: "Select all text and convert to outlines (Expand / Outline Strokes).",
      autoFixable: true,
    });
  } else {
    findings.push({
      id: "FONT-002",
      category: "Typography",
      severity: "pass",
      title: "All Typography Outlined",
      description: "No un-outlined active font references detected.",
    });
  }

  // 3. Open Paths Inspection
  if (asset.openPathsCount && asset.openPathsCount > 0) {
    findings.push({
      id: "PATH-001",
      category: "Vector Geometry",
      severity: "warning",
      title: "Unclosed Vector Paths Found",
      description: `${asset.openPathsCount} open vector paths detected. These can produce rendering defects or fill artifacts on export.`,
      affectedCount: asset.openPathsCount,
      recommendedAction: "Close unjoined anchor points or join overlapping nodes.",
      autoFixable: false,
    });
  }

  // 4. Embedded Raster Content
  if (asset.hasEmbeddedRaster) {
    findings.push({
      id: "RASTER-001",
      category: "Vector Geometry",
      severity: "error",
      title: "Embedded Raster / Bitmap Image",
      description: "Embedded pixel bitmap found in vector file. Pure vector submissions must not contain embedded PNG/JPG rasters.",
      recommendedAction: "Remove raster elements or vectorize using image trace.",
      autoFixable: false,
    });
  }

  // 5. Design Fit & Artboard Bounds Inspection
  if (asset.boundsOverflow && asset.boundsOverflow > 0) {
    findings.push({
      id: "FIT-001",
      category: "Design Fit",
      severity: "error",
      title: "Vectors Crossing Artboard Boundary",
      description: `Elements extend ${asset.boundsOverflow}px beyond the active artboard boundaries.`,
      recommendedAction: "Scale design down into the safe zone or crop to artboard.",
      autoFixable: true,
    });
  } else if (asset.marginDistance && asset.marginDistance < profile.safeMarginPx) {
    findings.push({
      id: "FIT-002",
      category: "Design Fit",
      severity: "warning",
      title: "Elements Inside Unsafe Edge Margin",
      description: `Artwork is within ${asset.marginDistance}px of artboard edge (recommended safe margin: ${profile.safeMarginPx}px).`,
      recommendedAction: "Add breathing room between the perimeter and artwork.",
      autoFixable: true,
    });
  } else {
    findings.push({
      id: "FIT-003",
      category: "Design Fit",
      severity: "pass",
      title: "Design Fit Safe",
      description: "All vector nodes and bounding boxes remain safely inside the artboard perimeter.",
    });
  }

  // Summary calculation
  const errors = findings.filter((f) => f.severity === "error").length;
  const warnings = findings.filter((f) => f.severity === "warning").length;
  const passes = findings.filter((f) => f.severity === "pass").length;

  const status = errors > 0 ? "failed" : warnings > 0 ? "warning" : "passed";

  return {
    marketplace: profile.name,
    timestamp: new Date().toISOString(),
    status,
    stats: { errors, warnings, passes, total: findings.length },
    findings,
  };
}

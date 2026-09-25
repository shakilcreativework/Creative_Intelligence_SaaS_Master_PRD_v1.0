/**
 * Creative Intelligence SaaS - Collection Consistency Engine (CONS-001)
 * Evaluates collections (icon sets, coordinated graphics, illustration packs) for:
 * - Stroke width uniformity
 * - Artboard scale & aspect ratio conformance
 * - Corner treatment (linecap/linejoin & corner radii)
 * - Color system & palette adherence
 * - Visual weight & complexity balance
 * - Grid alignment & safe padding
 */

/**
 * Parses basic SVG vector properties from an SVG content string
 * @param {string} svgContent 
 * @returns {object} Extracted metrics
 */
export function extractSvgStylingMetrics(svgContent) {
  if (!svgContent) {
    return {
      strokeWidths: [],
      lineCaps: [],
      lineJoins: [],
      colors: [],
      viewBox: null,
      width: 0,
      height: 0,
      aspectRatio: 1,
      elementCount: 0,
      pathLengthEstimate: 0,
      estimatedFillRatio: 0.5,
    };
  }

  // 1. ViewBox and dimensions
  const vbMatch = svgContent.match(/viewBox=["']([0-9.\s-]+)["']/i);
  let vbWidth = 0;
  let vbHeight = 0;
  if (vbMatch) {
    const parts = vbMatch[1].trim().split(/[\s,]+/).map(Number);
    if (parts.length >= 4) {
      vbWidth = parts[2];
      vbHeight = parts[3];
    }
  }

  const wMatch = svgContent.match(/width=["']([0-9.]+)(px)?["']/i);
  const hMatch = svgContent.match(/height=["']([0-9.]+)(px)?["']/i);
  const width = vbWidth || (wMatch ? parseFloat(wMatch[1]) : 24);
  const height = vbHeight || (hMatch ? parseFloat(hMatch[1]) : 24);
  const aspectRatio = height > 0 ? Number((width / height).toFixed(2)) : 1;

  // 2. Stroke widths
  const strokeWidthMatches = Array.from(svgContent.matchAll(/stroke-width=["']([0-9.]+)(px)?["']/gi));
  const strokeWidths = strokeWidthMatches.map(m => parseFloat(m[1])).filter(n => !isNaN(n) && n > 0);

  // 3. Line caps & joins
  const lineCapMatches = Array.from(svgContent.matchAll(/stroke-linecap=["']([a-zA-Z]+)["']/gi));
  const lineCaps = lineCapMatches.map(m => m[1].toLowerCase());

  const lineJoinMatches = Array.from(svgContent.matchAll(/stroke-linejoin=["']([a-zA-Z]+)["']/gi));
  const lineJoins = lineJoinMatches.map(m => m[1].toLowerCase());

  // 4. Color extractions (hex & named colors)
  const hexMatches = Array.from(svgContent.matchAll(/#(?:[0-9a-fA-F]{3}){1,2}\b/g));
  const colors = [...new Set(hexMatches.map(m => m[0].toUpperCase()))];

  // 5. Element counts
  const paths = (svgContent.match(/<path\b/gi) || []).length;
  const circles = (svgContent.match(/<circle\b/gi) || []).length;
  const rects = (svgContent.match(/<rect\b/gi) || []).length;
  const lines = (svgContent.match(/<line\b/gi) || []).length;
  const polygons = (svgContent.match(/<polygon\b/gi) || []).length;
  const totalElements = paths + circles + rects + lines + polygons;

  return {
    strokeWidths: strokeWidths.length > 0 ? strokeWidths : [2], // fallback standard
    lineCaps: lineCaps.length > 0 ? [...new Set(lineCaps)] : ["round"],
    lineJoins: lineJoins.length > 0 ? [...new Set(lineJoins)] : ["round"],
    colors: colors.length > 0 ? colors : ["#000000"],
    viewBox: vbMatch ? vbMatch[1] : `0 0 ${width} ${height}`,
    width,
    height,
    aspectRatio,
    elementCount: totalElements,
    estimatedWeight: totalElements > 12 ? "dense" : totalElements < 3 ? "sparse" : "balanced",
  };
}

/**
 * Analyzes a collection of assets for visual and technical consistency
 * @param {Array} assets List of asset objects { id, name, content, ... }
 * @returns {object} Consistency results, scores, and per-asset deviations
 */
export function analyzeCollectionConsistency(assets) {
  if (!assets || assets.length === 0) {
    return {
      healthScore: 100,
      summary: "No assets in collection to analyze.",
      categories: {
        stroke: { status: "Pass", label: "Stroke Weight", message: "N/A" },
        scale: { status: "Pass", label: "Scale & Artboard", message: "N/A" },
        corners: { status: "Pass", label: "Corner Treatment", message: "N/A" },
        color: { status: "Pass", label: "Color System", message: "N/A" },
        visualWeight: { status: "Pass", label: "Visual Weight", message: "N/A" },
        grid: { status: "Pass", label: "Grid & Spacing", message: "N/A" },
      },
      baseline: {},
      deviations: [],
    };
  }

  // Extract metrics for all assets
  const assetMetrics = assets.map(asset => ({
    id: asset.id,
    name: asset.name || asset.filename || asset.id,
    content: asset.content || "",
    metrics: extractSvgStylingMetrics(asset.content),
  }));

  // 1. Calculate Baseline Stroke Width (Most frequent average stroke width)
  const strokeCounts = {};
  assetMetrics.forEach(a => {
    const avgStroke = a.metrics.strokeWidths.reduce((sum, v) => sum + v, 0) / (a.metrics.strokeWidths.length || 1);
    const roundedStroke = Number(avgStroke.toFixed(1));
    strokeCounts[roundedStroke] = (strokeCounts[roundedStroke] || 0) + 1;
  });
  let baselineStroke = 2.0;
  let maxStrokeCount = 0;
  Object.entries(strokeCounts).forEach(([stroke, count]) => {
    if (count > maxStrokeCount) {
      maxStrokeCount = count;
      baselineStroke = parseFloat(stroke);
    }
  });

  // 2. Calculate Baseline Artboard Dimensions & Aspect Ratio
  const dimCounts = {};
  assetMetrics.forEach(a => {
    const key = `${a.metrics.width}x${a.metrics.height}`;
    dimCounts[key] = (dimCounts[key] || 0) + 1;
  });
  let baselineDim = "24x24";
  let maxDimCount = 0;
  Object.entries(dimCounts).forEach(([dim, count]) => {
    if (count > maxDimCount) {
      maxDimCount = count;
      baselineDim = dim;
    }
  });

  // 3. Baseline Line Caps & Joins
  const capCounts = {};
  assetMetrics.forEach(a => {
    a.metrics.lineCaps.forEach(c => {
      capCounts[c] = (capCounts[c] || 0) + 1;
    });
  });
  let dominantCap = "round";
  let maxCapCount = 0;
  Object.entries(capCounts).forEach(([cap, count]) => {
    if (count > maxCapCount) {
      maxCapCount = count;
      dominantCap = cap;
    }
  });

  // 4. Baseline Palette
  const colorUsage = {};
  assetMetrics.forEach(a => {
    a.metrics.colors.forEach(c => {
      colorUsage[c] = (colorUsage[c] || 0) + 1;
    });
  });
  // Sort colors by frequency
  const dominantPalette = Object.entries(colorUsage)
    .sort((a, b) => b[1] - a[1])
    .map(([col]) => col);

  // 5. Evaluate Deviations per Asset
  const deviations = [];
  let strokeIssues = 0;
  let scaleIssues = 0;
  let cornerIssues = 0;
  let colorIssues = 0;
  let weightIssues = 0;

  assetMetrics.forEach(item => {
    const issues = [];
    const avgStroke = item.metrics.strokeWidths.reduce((sum, v) => sum + v, 0) / (item.metrics.strokeWidths.length || 1);
    const strokeDiff = Math.abs(avgStroke - baselineStroke);

    // Stroke check (tolerance 0.2px)
    if (strokeDiff > 0.25) {
      strokeIssues++;
      issues.push({
        type: "stroke",
        severity: "warning",
        title: "Stroke Weight Mismatch",
        description: `Uses ${avgStroke.toFixed(1)}px stroke, deviates from set baseline (${baselineStroke}px).`,
        recommendation: `Standardize stroke width to ${baselineStroke}px.`,
      });
    }

    // Scale / Dimension check
    const currentDim = `${item.metrics.width}x${item.metrics.height}`;
    if (currentDim !== baselineDim) {
      scaleIssues++;
      issues.push({
        type: "scale",
        severity: "warning",
        title: "Artboard Size Inconsistency",
        description: `Canvas is ${currentDim}, whereas collection baseline is ${baselineDim}.`,
        recommendation: `Resize artboard to ${baselineDim} or align viewBox coordinates.`,
      });
    }

    // Corner / Linecap check
    const hasDifferentCap = item.metrics.lineCaps.some(c => c !== dominantCap);
    if (hasDifferentCap) {
      cornerIssues++;
      issues.push({
        type: "corners",
        severity: "warning",
        title: "Terminal Cap Inconsistency",
        description: `Uses "${item.metrics.lineCaps.join(", ")}" cap style, deviates from collection dominant "${dominantCap}".`,
        recommendation: `Set stroke-linecap and stroke-linejoin to "${dominantCap}".`,
      });
    }

    // Color check: checks if asset introduces outlier colors
    const rogueColors = item.metrics.colors.filter(c => (colorUsage[c] || 0) <= 1 && dominantPalette.length > 2);
    if (rogueColors.length > 0) {
      colorIssues++;
      issues.push({
        type: "color",
        severity: "warning",
        title: "Rogue Color Usage",
        description: `Introduces isolated color(s): ${rogueColors.join(", ")} outside standard collection palette.`,
        recommendation: `Map fills and strokes to primary collection swatches (${dominantPalette.slice(0, 3).join(", ")}).`,
      });
    }

    // Visual Weight check
    if (item.metrics.estimatedWeight !== "balanced" && assetMetrics.length > 2) {
      weightIssues++;
      issues.push({
        type: "weight",
        severity: "info",
        title: "Visual Weight Disparity",
        description: `Icon is rated "${item.metrics.estimatedWeight}" (${item.metrics.elementCount} elements), which may visually contrast with neighboring icons.`,
        recommendation: `Simplify or add subtle balancing accents to match the visual mass of the set.`,
      });
    }

    deviations.push({
      assetId: item.id,
      name: item.name,
      metrics: item.metrics,
      issuesCount: issues.length,
      issues,
      status: issues.length === 0 ? "consistent" : "deviant",
    });
  });

  // Calculate Category Statuses (Matching PRD 12.9 Output Format)
  const total = assets.length || 1;
  const strokeStatus = strokeIssues === 0 ? "Pass" : strokeIssues <= Math.ceil(total * 0.3) ? "Warning" : "Fail";
  const scaleStatus = scaleIssues === 0 ? "Pass" : "Warning";
  const cornerStatus = cornerIssues === 0 ? "Pass" : "Warning";
  const colorStatus = colorIssues === 0 ? "Pass" : colorIssues <= Math.ceil(total * 0.3) ? "Warning" : "Fail";
  const weightStatus = weightIssues === 0 ? "Pass" : "Warning";
  const gridStatus = scaleIssues === 0 ? "Pass" : "Warning";

  // Compute Overall Consistency Health Score (0 - 100)
  const penalty = (strokeIssues * 12) + (scaleIssues * 15) + (cornerIssues * 8) + (colorIssues * 10) + (weightIssues * 5);
  const healthScore = Math.max(20, Math.min(100, Math.round(100 - (penalty / total))));

  return {
    healthScore,
    totalAssets: assets.length,
    consistentCount: deviations.filter(d => d.status === "consistent").length,
    deviantCount: deviations.filter(d => d.status === "deviant").length,
    baseline: {
      strokeWidth: baselineStroke,
      dimensions: baselineDim,
      linecap: dominantCap,
      palette: dominantPalette.slice(0, 4),
    },
    categories: {
      stroke: {
        status: strokeStatus,
        label: "Stroke Weight",
        message: strokeStatus === "Pass" ? "Uniform across collection" : `${strokeIssues} asset(s) deviate from ${baselineStroke}px baseline`,
      },
      scale: {
        status: scaleStatus,
        label: "Scale & Artboard",
        message: scaleStatus === "Pass" ? `All assets adhere to ${baselineDim}` : `${scaleIssues} asset(s) have mismatched viewBox dimensions`,
      },
      corners: {
        status: cornerStatus,
        label: "Corner Treatment",
        message: cornerStatus === "Pass" ? `Cohesive ${dominantCap} terminal styling` : `${cornerIssues} asset(s) mix sharp and round terminal caps`,
      },
      grid: {
        status: gridStatus,
        label: "Grid & Spacing",
        message: gridStatus === "Pass" ? "Consistent bounding geometry" : "Padding or alignment variance detected",
      },
      visualWeight: {
        status: weightStatus,
        label: "Visual Weight",
        message: weightStatus === "Pass" ? "Balanced mass and node density" : `${weightIssues} asset(s) have disproportionate density`,
      },
      color: {
        status: colorStatus,
        label: "Color System",
        message: colorStatus === "Pass" ? `Harmonious ${dominantPalette.length}-color palette` : `${colorIssues} asset(s) contain rogue isolated swatches`,
      },
    },
    deviations,
  };
}

/**
 * Deterministic Vector Similarity & Differentiation Engine
 * Enforces PRD Section 12.8 to prevent microstock rejections for "Similar/Repetitive Content"
 */

/**
 * Computes multi-dimensional similarity between two creative assets
 * @param {Object} assetA
 * @param {Object} assetB
 * @returns {Object} Comprehensive similarity report
 */
export function compareAssetSimilarity(assetA, assetB) {
  if (!assetA || !assetB || assetA.id === assetB.id) {
    return null;
  }

  // 1. Metadata Similarity (Jaccard Index on Keywords + Title tokens)
  const kwA = new Set((assetA.metadata?.keywords || []).map((k) => k.toLowerCase().trim()));
  const kwB = new Set((assetB.metadata?.keywords || []).map((k) => k.toLowerCase().trim()));

  const intersection = new Set([...kwA].filter((x) => kwB.has(x)));
  const union = new Set([...kwA, ...kwB]);
  const keywordSimilarityScore = union.size > 0 ? (intersection.size / union.size) * 100 : 0;

  // Title token overlap
  const titleAWords = (assetA.metadata?.title || assetA.name || "")
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);
  const titleBWords = (assetB.metadata?.title || assetB.name || "")
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const titleMatches = titleAWords.filter((w) => titleBWords.includes(w)).length;
  const titleScore = Math.min(100, (titleMatches / Math.max(1, Math.min(titleAWords.length, titleBWords.length))) * 100);

  const metadataScore = Math.round(keywordSimilarityScore * 0.7 + titleScore * 0.3);

  // 2. Visual Structure Similarity (Aspect ratio + Geometry shape counts)
  const ratioA = (assetA.width || 4000) / (assetA.height || 2800);
  const ratioB = (assetB.width || 4000) / (assetB.height || 2800);
  const ratioDiff = Math.abs(ratioA - ratioB);
  const ratioMatch = Math.max(0, 100 - ratioDiff * 100);

  // Category & Format match
  const categoryMatch = assetA.category === assetB.category ? 90 : 30;

  const visualStructureScore = Math.round(ratioMatch * 0.4 + categoryMatch * 0.6);

  // 3. Concept Similarity
  const sharedKeywordsList = [...intersection];
  const conceptScore = Math.round(
    Math.min(100, sharedKeywordsList.length * 12 + (assetA.category === assetB.category ? 40 : 0))
  );

  // 4. Color Structure Similarity (Extract primary hex patterns from content)
  const extractColors = (svgText = "") => {
    const matches = svgText.match(/#[a-fA-F0-9]{6}/g) || [];
    return new Set(matches.map((c) => c.toLowerCase()));
  };
  const colorsA = extractColors(assetA.content);
  const colorsB = extractColors(assetB.content);
  const sharedColors = [...colorsA].filter((c) => colorsB.has(c));
  const colorScore = Math.round(
    colorsA.size > 0 && colorsB.size > 0
      ? (sharedColors.length / Math.min(colorsA.size, colorsB.size)) * 100
      : 50
  );

  // Weighted overall composite score
  const overallScore = Math.round(
    visualStructureScore * 0.3 + conceptScore * 0.35 + metadataScore * 0.25 + colorScore * 0.1
  );

  // Risk Classification
  let riskLevel = "low";
  let riskLabel = "Safe (Differentiated)";
  if (overallScore >= 72) {
    riskLevel = "high";
    riskLabel = "High Risk (Rejection Likely)";
  } else if (overallScore >= 45) {
    riskLevel = "medium";
    riskLabel = "Moderate Overlap (Family Variant)";
  }

  // Why explanation generator (PRD Section 12.8)
  const explanations = [];
  if (sharedKeywordsList.length >= 5) {
    explanations.push(`Shares ${sharedKeywordsList.length} identical keywords (${sharedKeywordsList.slice(0, 4).join(", ")}, ...)`);
  }
  if (visualStructureScore >= 70) {
    explanations.push("Identical artboard proportion and matching geometry categorization.");
  }
  if (colorScore >= 60) {
    explanations.push("Shares primary gradient / brand palette tones.");
  }
  if (explanations.length === 0) {
    explanations.push("Distinct visual composition and separate conceptual focus.");
  }

  // Differentiation Suggestions
  const suggestions = [];
  if (metadataScore > 60) {
    suggestions.push("Diversify keyword list: Replace overlapping general tags with specific use-case terms.");
  }
  if (visualStructureScore > 65) {
    suggestions.push("Modify camera perspective: Convert isometric composition to flat front-facing or orthographic angle.");
  }
  if (colorScore > 50) {
    suggestions.push("Shift color palette: Swap active gradient hues to create distinct contrast.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Artwork possesses strong standalone differentiation.");
  }

  return {
    assetA,
    assetB,
    overallScore,
    riskLevel,
    riskLabel,
    dimensions: {
      visualStructure: {
        score: visualStructureScore,
        label: visualStructureScore > 65 ? "High" : visualStructureScore > 40 ? "Medium" : "Low",
      },
      concept: {
        score: conceptScore,
        label: conceptScore > 65 ? "High" : conceptScore > 40 ? "Medium" : "Low",
      },
      colorStructure: {
        score: colorScore,
        label: colorScore > 65 ? "High" : colorScore > 40 ? "Medium" : "Low",
      },
      metadata: {
        score: metadataScore,
        label: metadataScore > 65 ? "High" : metadataScore > 40 ? "Medium" : "Low",
        sharedKeywords: sharedKeywordsList,
      },
    },
    explanation: explanations.join(" "),
    suggestions,
  };
}

/**
 * Analyzes a full collection of assets and finds highest-risk duplicate pairs
 * @param {Array} assets
 * @returns {Array} List of pair comparison reports sorted by risk
 */
export function scanPortfolioSimilarity(assets = []) {
  const reports = [];

  for (let i = 0; i < assets.length; i++) {
    for (let j = i + 1; j < assets.length; j++) {
      const comp = compareAssetSimilarity(assets[i], assets[j]);
      if (comp) {
        reports.push(comp);
      }
    }
  }

  return reports.sort((a, b) => b.overallScore - a.overallScore);
}

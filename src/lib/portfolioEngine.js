/**
 * Creative Intelligence SaaS - Portfolio Intelligence Engine (PORT-001 / PRD §12.12)
 * Computes portfolio health metrics and commercial opportunity coverage.
 * 
 * METHODOLOGY NOTICE (PRD §12.12 Requirement):
 * Each indicator reflects deterministic technical readiness, metadata optimization,
 * and portfolio differentiation metrics. They do not represent speculative financial forecasts.
 */

export function calculatePortfolioHealth(assets = [], rejections = []) {
  const total = assets.length;
  if (total === 0) {
    return {
      overallHealth: 100,
      totalAssets: 0,
      metrics: {},
      categoryDistribution: [],
      gapAnalysis: [],
    };
  }

  // 1. Technical Quality Readiness (% passing preflight without live text / bounds overflow)
  const compliantAssets = assets.filter((a) => a.preflightStatus === "passed" && !a.hasLiveText && (!a.boundsOverflow || a.boundsOverflow === 0));
  const qualityRate = Math.round((compliantAssets.length / total) * 100);

  // 2. Metadata SEO Health (Average keyword completeness & score)
  let totalMetaScore = 0;
  assets.forEach((a) => {
    const kCount = a.metadata?.keywords?.length || 0;
    const hasDesc = (a.metadata?.description?.length || 0) > 30;
    const hasTitle = (a.metadata?.title?.length || 0) > 15;
    let score = 50;
    if (kCount >= 15 && kCount <= 40) score += 30;
    else if (kCount > 0) score += 15;
    if (hasTitle) score += 10;
    if (hasDesc) score += 10;
    totalMetaScore += Math.min(100, score);
  });
  const metadataHealth = Math.round(totalMetaScore / total);

  // 3. Rejection Resistance (% with 0 high-risk review triggers)
  const rejectionRate = rejections.length > 0 ? Math.max(0, 100 - (rejections.length * 10)) : 95;

  // 4. Overall Weighted Health Score (PRD §12.12 Documented Methodology)
  // Quality (40%) + Metadata (35%) + Rejection Resistance (25%)
  const overallHealth = Math.round((qualityRate * 0.4) + (metadataHealth * 0.35) + (rejectionRate * 0.25));

  // 5. Category Distribution & Commercial Gaps
  const categoriesMap = {};
  assets.forEach((a) => {
    const cat = a.category || "Uncategorized";
    categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
  });

  const categoryDistribution = Object.entries(categoriesMap).map(([name, count]) => ({
    name,
    count,
    percentage: Math.round((count / total) * 100),
  }));

  // Target High-Demand Commercial Categories (PRD §12.11 & §12.12 Gap Analysis)
  const TARGET_MARKETPLACE_NICHES = [
    { name: "Business & Finance", demand: "High", recommendedVolume: 5 },
    { name: "Clean Technology & Green Energy", demand: "High", recommendedVolume: 4 },
    { name: "Healthcare & Biotech", demand: "High", recommendedVolume: 4 },
    { name: "Artificial Intelligence & Cloud", demand: "Very High", recommendedVolume: 6 },
    { name: "Cybersecurity & Cryptography", demand: "Very High", recommendedVolume: 5 },
    { name: "Travel & Hospitality", demand: "Moderate", recommendedVolume: 3 },
  ];

  const gapAnalysis = TARGET_MARKETPLACE_NICHES.map((niche) => {
    const existing = categoryDistribution.find((c) =>
      c.name.toLowerCase().includes(niche.name.toLowerCase().split(" ")[0])
    );
    const count = existing ? existing.count : 0;
    const isCovered = count >= niche.recommendedVolume;
    const deficit = Math.max(0, niche.recommendedVolume - count);

    return {
      category: niche.name,
      marketDemand: niche.demand,
      currentCount: count,
      recommendedVolume: niche.recommendedVolume,
      status: isCovered ? "Optimized" : count > 0 ? "Underrepresented" : "Critical Gap",
      deficit,
    };
  });

  return {
    overallHealth,
    totalAssets: total,
    metrics: {
      technicalQuality: {
        label: "Technical Vector Quality",
        value: qualityRate,
        status: qualityRate >= 80 ? "Pass" : "Attention",
        detail: `${compliantAssets.length} of ${total} assets meet marketplace preflight bounds.`,
      },
      metadataHealth: {
        label: "Metadata SEO Strength",
        value: metadataHealth,
        status: metadataHealth >= 75 ? "Pass" : "Attention",
        detail: `Average title, description, and keyword completeness rating.`,
      },
      rejectionResistance: {
        label: "Rejection Shield Score",
        value: rejectionRate,
        status: rejectionRate >= 70 ? "Pass" : "Warning",
        detail: `Derived from historical reviewer feedback and preflight guardrails.`,
      },
    },
    categoryDistribution,
    gapAnalysis,
  };
}

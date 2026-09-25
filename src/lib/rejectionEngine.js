/**
 * Creative Intelligence SaaS - Rejection Intelligence Engine (REJ-001 / PRD §12.13)
 * Analyzes marketplace rejection patterns, identifies recurring root causes,
 * and provides pre-submission preventive intelligence.
 */

export const REJECTION_CATEGORIES = [
  { id: "technical", label: "Technical & Quality", color: "rose" },
  { id: "similar_content", label: "Similar Content / Spam", color: "amber" },
  { id: "metadata_spam", label: "Metadata & Keyword Spam", color: "purple" },
  { id: "ip_trademark", label: "Intellectual Property & Trademarks", color: "red" },
  { id: "commercial_fit", label: "Commercial Value & Aesthetics", color: "blue" },
];

export const INITIAL_REJECTIONS = [
  {
    id: "REJ-001",
    assetId: "AST-002",
    assetTitle: "Crypto Analytics Chart Unclipped",
    marketplace: "Adobe Stock",
    category: "technical",
    reason: "Quality issue: Unexpanded live text elements and vector boundary clipping.",
    date: "2026-09-18",
    status: "Logged",
    notes: "Reviewer flagged live text font dependency and path overflow outside artboard.",
  },
  {
    id: "REJ-002",
    assetId: "AST-005",
    assetTitle: "Blockchain Coin Icon Variant #4",
    marketplace: "Adobe Stock",
    category: "similar_content",
    reason: "Similar Content: Content too similar to existing submissions in your portfolio.",
    date: "2026-09-15",
    status: "Logged",
    notes: "Only slight rotation and single color change compared to AST-001.",
  },
  {
    id: "REJ-003",
    assetId: "AST-007",
    assetTitle: "Modern Tech Startup Logo Pack",
    marketplace: "Shutterstock",
    category: "ip_trademark",
    reason: "Potential trademark infringement or recognizable brand symbol resemblance.",
    date: "2026-09-10",
    status: "Logged",
    notes: "Icon resembled stylized Ethereum diamond prism.",
  },
  {
    id: "REJ-004",
    assetId: "AST-009",
    assetTitle: "AI Cyber Security Vector Illustration",
    marketplace: "Shutterstock",
    category: "metadata_spam",
    reason: "Spam tags: Irrelevant keywords and trademark keywords used in metadata.",
    date: "2026-09-02",
    status: "Logged",
    notes: "Included 'bitcoin', 'apple', 'chatgpt' in generic cybersecurity tags.",
  },
  {
    id: "REJ-005",
    assetId: "AST-011",
    assetTitle: "Clean Energy Leaf Wind Turbine",
    marketplace: "Adobe Stock",
    category: "technical",
    reason: "Technical error: Open vector paths and stray anchor points found.",
    date: "2026-08-25",
    status: "Logged",
    notes: "Reviewer required fully closed compound vector paths.",
  },
  {
    id: "REJ-006",
    assetId: "AST-014",
    assetTitle: "Cloud Database Server Outline",
    marketplace: "Freepik",
    category: "similar_content",
    reason: "Spam / Minimal Differentiation: Repetitive upload with minimal aesthetic variation.",
    date: "2026-08-14",
    status: "Logged",
    notes: "Freepik bulk reviewer rejected set of 12 nearly identical database icons.",
  },
];

/**
 * Analyzes rejection records to identify recurring failure patterns
 * @param {Array} rejections 
 * @returns {object} Statistical breakdown and actionable prevention playbooks
 */
export function analyzeRejectionHistory(rejections = INITIAL_REJECTIONS) {
  const total = rejections.length;
  if (total === 0) {
    return {
      total: 0,
      byMarketplace: {},
      byCategory: {},
      recurringIssues: [],
      topIssue: null,
    };
  }

  // 1. Group by Marketplace
  const byMarketplace = {};
  rejections.forEach((r) => {
    byMarketplace[r.marketplace] = (byMarketplace[r.marketplace] || 0) + 1;
  });

  // 2. Group by Category
  const byCategory = {};
  rejections.forEach((r) => {
    byCategory[r.category] = (byCategory[r.category] || 0) + 1;
  });

  // 3. Aggregate Recurring Issues & Playbooks (PRD §12.13 Output Schema)
  const patternMap = {
    technical: {
      issue: "Technical Execution & Vector Hygiene",
      category: "technical",
      possibleCause: "Unexpanded live <text> fonts, unclosed vector paths, or elements overflowing artboard boundaries.",
      recommendedPrevention: "Always run Preflight Doctor before packaging. Utilize the 1-click Auto-Fix to convert unexpanded fonts to paths and inject clip-path bounds.",
      checkKey: "preflight",
    },
    similar_content: {
      issue: "Similar Content / Spam Rejection",
      category: "similar_content",
      possibleCause: "Submitting minor color variations, simple 90-degree rotations, or near-identical icon permutations.",
      recommendedPrevention: "Use the Similarity Engine. Ensure visual structure similarity stays below 65% and conceptual diversity includes varied metaphor archetypes.",
      checkKey: "similarity",
    },
    metadata_spam: {
      issue: "Metadata & Keyword Spamming",
      category: "metadata_spam",
      possibleCause: "Keyword stuffing, exceeding 45 tags, or stuffing popular trending terms that don't match the image.",
      recommendedPrevention: "Use Metadata Studio SEO Validator. Limit tags to 25-35 highly relevant descriptors and eliminate low-relevance filler words.",
      checkKey: "metadata",
    },
    ip_trademark: {
      issue: "Trademark & Intellectual Property Resemblance",
      category: "ip_trademark",
      possibleCause: "Inadvertently mimicking protected brand logos, company iconography, or cryptocurrency insignia.",
      recommendedPrevention: "Consult the Prohibited Keywords and IP Trademark Scanner in Metadata Studio before finalizing titles and tags.",
      checkKey: "trademark",
    },
    commercial_fit: {
      issue: "Commercial Utility & Aesthetic Quality",
      category: "commercial_fit",
      possibleCause: "Outdated visual style, lack of commercial demand, or overly complex/niche graphics.",
      recommendedPrevention: "Cross-reference the Opportunity Engine to verify commercial demand and high-selling category trends.",
      checkKey: "opportunities",
    },
  };

  const recurringIssues = Object.entries(byCategory).map(([catKey, count]) => {
    const meta = patternMap[catKey] || {
      issue: "Uncategorized Rejection",
      category: catKey,
      possibleCause: "General review guidelines mismatch.",
      recommendedPrevention: "Review target marketplace contributor documentation.",
    };

    const affected = rejections.filter((r) => r.category === catKey);

    return {
      issue: meta.issue,
      category: catKey,
      frequency: count,
      percentage: Math.round((count / total) * 100),
      affectedAssets: affected.map((a) => ({
        id: a.assetId,
        title: a.assetTitle,
        marketplace: a.marketplace,
        date: a.date,
        reason: a.reason,
      })),
      possibleCause: meta.possibleCause,
      recommendedPrevention: meta.recommendedPrevention,
      checkKey: meta.checkKey,
    };
  });

  // Sort by highest frequency
  recurringIssues.sort((a, b) => b.frequency - a.frequency);

  return {
    total,
    byMarketplace,
    byCategory,
    recurringIssues,
    topIssue: recurringIssues[0] || null,
  };
}

/**
 * Pre-Submission Risk Evaluator: checks an asset against known rejection triggers
 * @param {object} asset 
 * @param {object} rejectionStats 
 * @returns {object} Pre-submission risk score and preventive warnings
 */
export function evaluatePreSubmissionRisk(asset, rejectionStats) {
  if (!asset) {
    return { riskLevel: "Low", score: 0, warnings: [], passItems: [] };
  }

  const warnings = [];
  const passItems = [];

  // 1. Technical vector checks
  if (asset.hasLiveText) {
    warnings.push({
      category: "technical",
      title: "Live Text Detected (Critical Rejection Trigger)",
      detail: "Marketplaces (Adobe Stock & Shutterstock) reject files containing unexpanded <text> elements.",
      action: "Run Preflight Doctor and convert text to outlines.",
    });
  } else {
    passItems.push("No unexpanded live text detected (Fonts outlined)");
  }

  if (asset.boundsOverflow && asset.boundsOverflow > 0) {
    warnings.push({
      category: "technical",
      title: "Artboard Boundary Overflow",
      detail: `Paths extend ${asset.boundsOverflow}px beyond artboard bounds without clipping.`,
      action: "Apply clip-path in Preflight Doctor to ensure zero canvas bleed.",
    });
  } else {
    passItems.push("Paths strictly contained within artboard bounds");
  }

  // 2. Metadata checks
  const keywords = asset.metadata?.keywords || [];
  if (keywords.length > 40) {
    warnings.push({
      category: "metadata_spam",
      title: "Keyword Count Exceeds Safe Threshold",
      detail: `Contains ${keywords.length} keywords. More than 40 keywords increases rejection risk for keyword stuffing.`,
      action: "Prune redundant tags down to 25-35 in Metadata Studio.",
    });
  } else if (keywords.length < 5) {
    warnings.push({
      category: "metadata_spam",
      title: "Under-tagged Metadata",
      detail: `Only ${keywords.length} keyword(s). Minimum recommended for marketplace indexing is 15.`,
      action: "Add more descriptive conceptual and technical keywords.",
    });
  } else {
    passItems.push(`Healthy keyword count (${keywords.length} tags)`);
  }

  // 3. Prohibited terms check
  const BANNED_TERMS = ["apple", "bitcoin", "ethereum", "nike", "adidas", "gucci", "coca-cola", "pepsi"];
  const titleAndTags = `${asset.metadata?.title || ""} ${keywords.join(" ")}`.toLowerCase();
  const matchedBanned = BANNED_TERMS.filter((term) => titleAndTags.includes(term));
  if (matchedBanned.length > 0) {
    warnings.push({
      category: "ip_trademark",
      title: "Protected Trademark / Brand Term Detected",
      detail: `Found restricted term(s): "${matchedBanned.join(", ")}". High risk of immediate copyright rejection.`,
      action: "Replace brand terms with generic descriptions (e.g. 'smartphone', 'cryptocurrency coin').",
    });
  } else {
    passItems.push("No trademarked brand names found in title or keywords");
  }

  // Calculate Risk Level
  let score = 0;
  warnings.forEach((w) => {
    if (w.category === "ip_trademark") score += 40;
    else if (w.category === "technical") score += 35;
    else if (w.category === "similar_content") score += 25;
    else score += 15;
  });

  let riskLevel = "Low";
  if (score >= 50) riskLevel = "Critical";
  else if (score >= 25) riskLevel = "Moderate";

  return {
    score: Math.min(100, score),
    riskLevel,
    warnings,
    passItems,
  };
}

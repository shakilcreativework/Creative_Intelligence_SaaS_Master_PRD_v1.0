/**
 * Metadata Studio & Keyword Validation Engine
 * Enforces marketplace rules (Adobe Stock & Shutterstock keyword rules)
 */

const PROHIBITED_WORDS = new Set([
  "free", "download", "vector", "eps", "illustration", "isolated", "background",
  "stock", "photo", "image", "buy", "cheap", "sale", "discount", "copyright",
  "nike", "apple", "google", "disney", "coca-cola" // Trademarks
]);

/**
 * Validates a creative asset's metadata against marketplace rules
 * @param {Object} metadata { title, description, keywords }
 * @param {string} marketplaceKey
 * @returns {Object} validation report with score, errors, and warnings
 */
export function validateMetadata(metadata, marketplaceKey = "ADOBE_STOCK") {
  const issues = [];
  const title = (metadata.title || "").trim();
  const keywords = Array.isArray(metadata.keywords)
    ? metadata.keywords.map((k) => k.trim().toLowerCase()).filter(Boolean)
    : [];

  // Title validations
  if (!title) {
    issues.push({
      field: "title",
      severity: "error",
      message: "Title is required for marketplace search indexing.",
    });
  } else if (title.length < 15) {
    issues.push({
      field: "title",
      severity: "warning",
      message: "Title is too short (recommended: 25-70 characters).",
    });
  } else if (title.length > 100) {
    issues.push({
      field: "title",
      severity: "error",
      message: "Title exceeds maximum length of 100 characters.",
    });
  }

  // Keyword count checks
  if (keywords.length < 5) {
    issues.push({
      field: "keywords",
      severity: "error",
      message: `Only ${keywords.length} keywords provided. Minimum recommended is 15-20.`,
    });
  } else if (keywords.length > 50) {
    issues.push({
      field: "keywords",
      severity: "error",
      message: `Keywords count (${keywords.length}) exceeds marketplace maximum of 50.`,
    });
  }

  // Duplicate keywords check
  const seenKeywords = new Set();
  const duplicateKeywords = [];
  const flaggedProhibited = [];

  keywords.forEach((keyword) => {
    if (seenKeywords.has(keyword)) {
      duplicateKeywords.push(keyword);
    } else {
      seenKeywords.add(keyword);
    }

    if (PROHIBITED_WORDS.has(keyword)) {
      flaggedProhibited.push(keyword);
    }
  });

  if (duplicateKeywords.length > 0) {
    issues.push({
      field: "keywords",
      severity: "warning",
      message: `Duplicate keywords found: ${[...new Set(duplicateKeywords)].join(", ")}`,
      action: "Remove duplicates",
    });
  }

  if (flaggedProhibited.length > 0) {
    issues.push({
      field: "keywords",
      severity: "warning",
      message: `Potentially spammy or generic keywords: ${[...new Set(flaggedProhibited)].join(", ")}`,
      action: "Replace with specific concept terms",
    });
  }

  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;

  let score = 100 - errorCount * 30 - warningCount * 10;
  if (score < 0) score = 0;

  return {
    score,
    isValid: errorCount === 0,
    issues,
    cleanedKeywords: [...seenKeywords],
  };
}

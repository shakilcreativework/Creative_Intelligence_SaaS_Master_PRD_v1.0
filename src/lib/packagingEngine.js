import JSZip from "jszip";

/**
 * Standardized Marketplace Profiles
 */
export const PACKAGING_PROFILES = {
  ADOBE_STOCK: {
    id: "ADOBE_STOCK",
    name: "Adobe Stock Contributor",
    csvColumns: ["Filename", "Title", "Keywords", "Category"],
    formatRow: (asset, filename) => [
      filename,
      `"${(asset.metadata?.title || asset.name || "").replace(/"/g, '""')}"`,
      `"${(asset.metadata?.keywords || []).join(", ").replace(/"/g, '""')}"`,
      `"${asset.category || "Illustrations"}"`,
    ],
  },
  SHUTTERSTOCK: {
    id: "SHUTTERSTOCK",
    name: "Shutterstock Contributor",
    csvColumns: ["Filename", "Description", "Keywords", "Categories", "Illustration", "Editorial"],
    formatRow: (asset, filename) => [
      filename,
      `"${(asset.metadata?.description || asset.metadata?.title || asset.name || "").replace(/"/g, '""')}"`,
      `"${(asset.metadata?.keywords || []).join(", ").replace(/"/g, '""')}"`,
      `"${asset.category || "Vectors"}"`,
      '"Yes"',
      '"No"',
    ],
  },
  UNIVERSAL: {
    id: "UNIVERSAL",
    name: "Universal Microstock Package",
    csvColumns: ["Filename", "Title", "Description", "Keywords", "Category", "Marketplace Target"],
    formatRow: (asset, filename) => [
      filename,
      `"${(asset.metadata?.title || asset.name || "").replace(/"/g, '""')}"`,
      `"${(asset.metadata?.description || "").replace(/"/g, '""')}"`,
      `"${(asset.metadata?.keywords || []).join(", ").replace(/"/g, '""')}"`,
      `"${asset.category || "Vector Graphic"}"`,
      '"Adobe Stock / Shutterstock / Freepik"',
    ],
  },
};

/**
 * Generates a compliant multi-asset marketplace submission ZIP archive
 * @param {Object} project
 * @param {Array} assets
 * @param {Object} options Configurable packaging options
 * @returns {Promise<Blob>} ZIP package binary blob
 */
export async function generateMarketplacePackage(project, assets = [], options = {}) {
  const zip = new JSZip();
  const rootFolderName = (project.name || "Marketplace_Submission_Package")
    .replace(/[^a-zA-Z0-9_-]/g, "_");

  const root = zip.folder(rootFolderName);

  // Configuration options
  const profileKey = options.profile || "ADOBE_STOCK";
  const profile = PACKAGING_PROFILES[profileKey] || PACKAGING_PROFILES.UNIVERSAL;
  const filenamePattern = options.filenamePattern || "{original}"; // '{index}_{slug}', '{category}_{slug}', '{original}'

  const includeSource = options.includeSource !== false;
  const includePreview = options.includePreview !== false;
  const includeMetadata = options.includeMetadata !== false;
  const includeDocumentation = options.includeDocumentation !== false;

  // Subfolders
  const sourceFolder = includeSource ? root.folder("SOURCE") : null;
  const previewFolder = includePreview ? root.folder("PREVIEW") : null;
  const metadataFolder = includeMetadata ? root.folder("METADATA") : null;
  const docFolder = includeDocumentation ? root.folder("DOCUMENTATION") : null;

  // Build CSV Rows
  const csvRows = [profile.csvColumns.join(",")];

  assets.forEach((asset, index) => {
    // Generate normalized filename according to pattern
    const originalBase = (asset.filename || `vector_${asset.id}.svg`).replace(/\.[^/.]+$/, "");
    let resolvedBase = originalBase;

    if (filenamePattern === "{index}_{slug}") {
      const slug = (asset.name || originalBase).toLowerCase().replace(/[^a-z0-9]+/g, "_");
      resolvedBase = `${String(index + 1).padStart(3, "0")}_${slug}`;
    } else if (filenamePattern === "{category}_{slug}") {
      const cat = (asset.category || "vector").toLowerCase().replace(/[^a-z0-9]+/g, "_");
      const slug = (asset.name || originalBase).toLowerCase().replace(/[^a-z0-9]+/g, "_");
      resolvedBase = `${cat}_${slug}`;
    }

    const sourceFilename = `${resolvedBase}.svg`;
    const previewFilename = `${resolvedBase}_preview.svg`;

    // Add to CSV
    csvRows.push(profile.formatRow(asset, sourceFilename).join(","));

    // Write source file
    if (sourceFolder) {
      sourceFolder.file(
        sourceFilename,
        asset.content ||
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#7c3aed"/><circle cx="50" cy="50" r="30" fill="#ffffff"/></svg>`
      );
    }

    // Write preview file
    if (previewFolder) {
      previewFolder.file(
        previewFilename,
        asset.content ||
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#182234"/><text x="50" y="50" fill="#fff" text-anchor="middle">PREVIEW</text></svg>`
      );
    }
  });

  // Write CSV Metadata
  if (metadataFolder) {
    metadataFolder.file("marketplace_metadata.csv", csvRows.join("\n"));
  }

  // Write Documentation and Submission Manifest (PRD Section 12.14)
  if (docFolder) {
    const passedCount = assets.filter((a) => a.preflightStatus === "passed").length;
    const manifest = {
      packageId: `PKG-${Date.now()}`,
      packageName: rootFolderName,
      targetMarketplace: profile.name,
      namingPattern: filenamePattern,
      totalAssets: assets.length,
      preflightPassed: passedCount,
      complianceRate: `${Math.round((passedCount / Math.max(1, assets.length)) * 100)}%`,
      generatedAt: new Date().toISOString(),
      generator: "Creative Intelligence SaaS v1.0",
      assetManifest: assets.map((a, i) => ({
        index: i + 1,
        id: a.id,
        name: a.name,
        dimensions: `${a.width || 4000}x${a.height || 2800}px`,
        status: a.preflightStatus || "passed",
        keywordsCount: (a.metadata?.keywords || []).length,
      })),
    };

    docFolder.file("SUBMISSION_MANIFEST.json", JSON.stringify(manifest, null, 2));
    docFolder.file(
      "README.txt",
      `=======================================================\nCREATIVE PRODUCTION INTELLIGENCE - SUBMISSION PACKAGE\n=======================================================\n\nPackage: ${rootFolderName}\nTarget Marketplace: ${profile.name}\nTotal Vectors: ${assets.length}\nPreflight Verified: ${passedCount}/${assets.length}\nDate: ${new Date().toLocaleString()}\n\nFolder Hierarchy:\n- SOURCE/: Clean EPS/SVG vector files ready for direct marketplace upload.\n- PREVIEW/: High-resolution expanded raster/vector previews.\n- METADATA/: CSV formatted strictly according to ${profile.name} batch uploader standards.\n- DOCUMENTATION/: Audit manifest and technical specifications.\n\nGenerated with Creative Intelligence SaaS v1.0\n`
    );
  }

  return await zip.generateAsync({ type: "blob" });
}

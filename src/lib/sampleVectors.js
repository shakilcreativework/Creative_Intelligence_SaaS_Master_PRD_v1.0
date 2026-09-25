/**
 * Sample SVG Vector Fixtures for Instant Testing
 */

export const SAMPLE_ERRONEOUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <!-- Background Card -->
  <rect x="100" y="100" width="1400" height="1000" rx="32" fill="#131c2e" stroke="#243247" stroke-width="4" />
  
  <!-- Live Text Element (Violates Marketplace Outlined Font Rule) -->
  <text x="200" y="260" font-family="Arial" font-size="48" fill="#ffffff" font-weight="bold">FinTech Crypto Analytics</text>
  <text x="200" y="320" font-family="Arial" font-size="24" fill="#94a3b8">Decentralized Asset Flow</text>

  <!-- Main Chart Line with unclosed path -->
  <path d="M 200 800 Q 500 400 800 650 T 1400 400" fill="none" stroke="url(#grad)" stroke-width="12" stroke-linecap="round" />
  <circle cx="800" cy="650" r="16" fill="#60a5fa" />
  <circle cx="1400" cy="400" r="16" fill="#8b5cf6" />

  <!-- Deliberate Artboard Boundary Violation (Extends beyond x=1600, y=1200) -->
  <rect x="1520" y="300" width="180" height="200" rx="16" fill="#f43f5e" opacity="0.8" />
  <circle cx="1620" cy="1180" r="80" fill="#f59e0b" opacity="0.7" />
</svg>`;

export const SAMPLE_COMPLIANT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 2800" width="4000" height="2800">
  <defs>
    <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <rect x="200" y="200" width="3600" height="2400" rx="48" fill="#111827" stroke="#374151" stroke-width="6" />
  <!-- Pure Outlined Geometries with Safe Margins -->
  <path d="M 500 1800 C 1200 900, 2200 2200, 3500 1100 Z" fill="none" stroke="url(#cg1)" stroke-width="24" stroke-linejoin="round" />
  <circle cx="2000" cy="1400" r="180" fill="#3b82f6" />
  <rect x="900" y="800" width="400" height="400" rx="40" fill="#10b981" />
  <polygon points="2800,700 3200,1200 2400,1200" fill="#8b5cf6" />
</svg>`;

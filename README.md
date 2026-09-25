# Creative Intelligence SaaS — Master PRD v1.0

A unified creative production intelligence platform designed for stock contributors, vector designers, and creative freelancers (Adobe Stock, Shutterstock, and compatible microstock marketplaces).

## Key Features
- **Deterministic Preflight Doctor**: Inspects SVG geometry, detects un-outlined live text (`<text>`), identifies embedded rasters (`<image>`), and checks open paths.
- **Design Fit Checker**: Visualizes artboard safe margins and catches elements crossing artboard boundaries with one-click Auto-Fix.
- **Metadata Studio**: Validates title length, scores keyword SEO health, and eliminates duplicate/prohibited tags.
- **Marketplace Packaging Engine**: Generates standardized multi-folder ZIP submission packages (`SOURCE/`, `PREVIEW/`, `METADATA/` CSV, `DOCUMENTATION/`).
- **Opportunity Engine**: Surfaces data-backed marketplace demand signals to target underdeveloped portfolio categories.
- **Better Auth & Multi-Tenant Workspaces**: Switch between personal contributor workspaces and agency/team portfolios.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (ES6+ / JSX) — No TypeScript
- **Styling**: Tailwind CSS
- **Utilities**: `clsx`, `tailwind-merge`
- **Icons**: `react-icons` (Feather icons)
- **Notifications**: `react-toastify`
- **Packaging**: `jszip`
- **Auth**: `better-auth`

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

## Documentation
- [Master PRD](Creative_Intelligence_SaaS_Master_PRD_v1.0.md)
- [Project Working Tracker](PROJECT_WORKING_TRACKER.md)

# CREATIVE INTELLIGENCE SaaS — MASTER PRODUCT REQUIREMENTS DOCUMENT

**Document Type:** Master PRD  
**Version:** 1.0  
**Status:** Product Foundation / Development-Ready  
**Audience:** Product owner, UX/UI designer, frontend engineer, backend engineer, AI engineer, QA engineer, agentic coding agents  
**Primary Users:** Stock contributors, vector designers, graphic designers, creative freelancers, small creative teams  
**Primary Marketplaces:** Adobe Stock, Shutterstock, and compatible creative marketplaces  
**Product Philosophy:** Help creators research, create, validate, organize, package, submit, learn, and improve — without replacing human creative judgment.

---

# 1. Executive Summary

Creative Intelligence SaaS is a creator-focused productivity and quality platform designed for stock contributors and graphic designers.

The product addresses the fragmented workflow that currently exists between:

1. deciding what to create,
2. researching opportunities,
3. planning a collection,
4. producing assets,
5. checking technical quality,
6. checking visual consistency and differentiation,
7. preparing metadata,
8. exporting files,
9. packaging marketplace submissions,
10. tracking portfolio performance,
11. learning from rejections,
12. identifying future opportunities.

The product is not intended to be another generic AI image generator or keyword generator.

Its central value proposition is:

> **Research smarter. Create systematically. Check quality before submission. Prepare files faster. Learn from your portfolio. Spend more time designing and less time doing repetitive production work.**

The platform should function as a **Creative Production Intelligence System**.

---

# 2. Product Vision

## 2.1 Vision

Build a unified workspace where a creative professional can move from idea to marketplace-ready asset with minimal repetitive work.

### Core lifecycle

```text
IDEA
  ↓
RESEARCH
  ↓
OPPORTUNITY
  ↓
PLAN
  ↓
CREATE
  ↓
CHECK
  ↓
IMPROVE
  ↓
METADATA
  ↓
EXPORT
  ↓
PACKAGE
  ↓
SUBMIT
  ↓
TRACK
  ↓
LEARN
  ↓
CREATE BETTER NEXT TIME
```

## 2.2 Long-Term Vision

The platform should become the creator's persistent production memory.

It should understand:

- projects,
- assets,
- versions,
- collections,
- styles,
- categories,
- recurring technical problems,
- rejected assets,
- successful assets,
- metadata patterns,
- production preferences,
- workflow habits,
- marketplace requirements,
- opportunity history.

The system should use this context to help users make better decisions without taking creative control away from them.

---

# 3. Product Mission

## Mission Statement

Reduce repetitive creative-production work while improving asset quality, consistency, organization, marketplace readiness, and portfolio intelligence.

## Product Promise

The SaaS should help a user:

- save time,
- reduce avoidable mistakes,
- maintain professional quality,
- produce coherent collections,
- avoid accidental duplication,
- prepare marketplace-ready packages,
- understand portfolio gaps,
- learn from rejection patterns,
- discover useful production opportunities.

---

# 4. Product Principles

These principles are non-negotiable.

## 4.1 Human Creative Control

The user remains the final creative decision-maker.

AI suggestions must be:

- explainable,
- editable,
- dismissible,
- reviewable.

Never silently change important creative work.

## 4.2 Quality Before Quantity

The system should not encourage mass production of low-value or nearly identical assets.

## 4.3 Meaningful Differentiation

The system should help users identify overly similar assets and encourage genuine conceptual, compositional, or functional differentiation.

## 4.4 Automation of Repetitive Work

Automate:

- checking,
- organizing,
- converting,
- packaging,
- metadata preparation,
- repetitive analysis,
- reporting.

Do not unnecessarily automate creative judgment.

## 4.5 Evidence-Based Suggestions

When the system recommends an opportunity, explain the reason.

Examples:

- portfolio gap,
- category demand signal,
- seasonal relevance,
- underdeveloped collection,
- repeated buyer use case,
- user history,
- existing portfolio imbalance.

## 4.6 Never Break Existing Work

New features must not silently remove or damage existing functionality.

## 4.7 One Source of Truth

Product behavior, architecture, feature requirements, and acceptance criteria must be documented.

## 4.8 Small and Verifiable Development

Every major feature must be decomposed into small implementation tasks.

---

# 5. Target Users

## 5.1 Primary Persona — Stock Contributor

Needs:

- faster production,
- quality checking,
- metadata assistance,
- file preparation,
- portfolio organization,
- opportunity discovery,
- rejection analysis.

Pain points:

- repetitive metadata work,
- manual file checking,
- uncertainty about what to create,
- duplicate/similar content,
- poor organization,
- marketplace-specific preparation,
- time lost on non-creative work.

## 5.2 Primary Persona — Vector Designer

Needs:

- vector quality checking,
- artboard safety,
- stroke consistency,
- icon consistency,
- export automation,
- batch processing,
- collection management.

## 5.3 Primary Persona — Graphic Designer / Freelancer

Needs:

- project management,
- version control,
- client proofing,
- revisions,
- delivery,
- asset organization,
- time tracking.

## 5.4 Secondary Persona — Small Creative Team

Needs:

- shared workspaces,
- roles,
- approvals,
- project visibility,
- shared assets,
- activity history,
- standardized production workflows.

---

# 6. Jobs To Be Done

## Job 1

"When I want to create new stock content, I want to know which concepts are worth exploring so I don't waste time making random assets."

## Job 2

"When I finish a design, I want to know whether it has technical problems before I submit it."

## Job 3

"When I create a collection, I want to know whether the assets are consistent and meaningfully different."

## Job 4

"When I prepare marketplace content, I want accurate metadata without spending excessive time writing titles and keywords."

## Job 5

"When I have many files, I want to export and organize them consistently."

## Job 6

"When my content is rejected, I want to understand recurring causes so I can prevent future mistakes."

## Job 7

"When my portfolio grows, I want to understand what is missing, overrepresented, or worth exploring next."

## Job 8

"When I work with clients, I want feedback and revisions to remain organized instead of being scattered across messages and screenshots."

---

# 7. Core Problems

## Problem A — Opportunity Uncertainty

Creators often know how to design but do not always know:

- what category to enter,
- what collection to extend,
- what use case to target,
- what concepts are missing from their portfolio.

## Problem B — Repetitive Production

Creators spend significant time on:

- naming,
- metadata,
- export,
- file organization,
- validation,
- packaging.

## Problem C — Quality Risk

Errors can occur in:

- artboards,
- paths,
- clipping,
- raster content,
- document setup,
- dimensions,
- color,
- fonts,
- file structure,
- export.

## Problem D — Similarity Risk

Large portfolios can accidentally contain:

- duplicate concepts,
- near-duplicate compositions,
- minor variations,
- repeated layouts,
- overly similar collections.

## Problem E — Fragmented Workflow

Creators use multiple tools for:

- research,
- design,
- checking,
- metadata,
- export,
- upload,
- analytics,
- project management.

## Problem F — Weak Portfolio Intelligence

A creator may have thousands of assets without a clear answer to:

> "What should I improve or create next?"

---

# 8. Product Scope

## In Scope

- creator workspace,
- projects,
- asset library,
- file upload,
- asset preview,
- project organization,
- preflight,
- design-fit checking,
- metadata generation and validation,
- similarity analysis,
- collection consistency analysis,
- opportunity research,
- portfolio intelligence,
- rejection intelligence,
- batch processing,
- export preparation,
- marketplace packaging,
- analytics,
- notifications,
- subscriptions,
- team/workspace foundation,
- designer proofing and revision tools.

## Out of Scope for Initial MVP

- full replacement of Adobe Illustrator,
- full replacement of Photoshop,
- automatic publishing without user review,
- guaranteed marketplace approval,
- guaranteed sales,
- autonomous creative business decisions,
- automated copyright ownership decisions,
- legal advice.

---

# 9. Product Modules

The platform consists of the following major modules.

## Module 01 — Authentication & Account

- sign up,
- sign in,
- password reset,
- email verification,
- session management,
- account settings,
- profile.

## Module 02 — Workspace

- personal workspace,
- team workspace,
- workspace switcher,
- members,
- roles,
- permissions.

## Module 03 — Dashboard

- recent projects,
- pending work,
- quality summary,
- opportunity summary,
- portfolio summary,
- time saved,
- notifications.

## Module 04 — Project Management

- create project,
- edit project,
- archive project,
- project status,
- project folders,
- project notes,
- project activity.

## Module 05 — Asset Library

- upload,
- preview,
- search,
- filter,
- sort,
- tagging,
- folders,
- collections,
- versioning,
- bulk actions.

## Module 06 — Opportunity Engine

- opportunity discovery,
- portfolio gap analysis,
- category analysis,
- seasonal ideas,
- collection suggestions,
- opportunity history,
- opportunity status.

## Module 07 — Preflight Doctor

- technical inspection,
- document inspection,
- vector inspection,
- raster inspection,
- font inspection,
- path inspection,
- artboard inspection,
- transparency inspection,
- warnings,
- errors,
- recommendations.

## Module 08 — Design Fit Checker

- artboard boundary detection,
- overflow detection,
- clipping detection,
- unsafe edge detection,
- fit visualization,
- fix suggestions,
- verification.

## Module 09 — Similarity Engine

- portfolio similarity,
- project similarity,
- composition similarity,
- concept similarity,
- metadata similarity,
- duplicate detection,
- near-duplicate detection,
- differentiation suggestions.

## Module 10 — Collection Consistency

- stroke consistency,
- scale consistency,
- spacing,
- visual weight,
- grid alignment,
- style consistency,
- color system,
- icon consistency.

## Module 11 — Metadata Studio

- title,
- description,
- keywords,
- categories,
- keyword ordering,
- relevance checking,
- duplicate keyword detection,
- unsupported keyword detection,
- marketplace-specific metadata.

## Module 12 — Export & Packaging

- export profiles,
- batch export,
- naming rules,
- folder structure,
- metadata package,
- preview package,
- ZIP package,
- final validation.

## Module 13 — Submission Workspace

- submission preparation,
- marketplace profiles,
- status tracking,
- submission records,
- rejection records,
- notes.

## Module 14 — Portfolio Intelligence

- portfolio health,
- category distribution,
- diversity,
- quality,
- opportunity gaps,
- metadata health,
- rejection patterns,
- production activity.

## Module 15 — Rejection Intelligence

- rejection import,
- rejection classification,
- recurring issue analysis,
- issue trends,
- corrective recommendations.

## Module 16 — Designer Client Workspace

- client,
- project,
- proof,
- review link,
- comments,
- revision,
- approval,
- delivery.

## Module 17 — Analytics

- asset production,
- processing time,
- quality,
- opportunities,
- workflow time,
- project performance,
- usage.

## Module 18 — Billing

- plans,
- usage,
- subscription,
- invoices,
- limits,
- upgrade,
- downgrade,
- cancellation.

---

# 10. MVP Definition

The MVP must prove the central workflow rather than contain every future feature.

## MVP Core

### Required

1. Authentication
2. Workspace
3. Dashboard
4. Projects
5. Asset upload
6. Asset library
7. Asset preview
8. Preflight Doctor
9. Design Fit Checker
10. Metadata Studio
11. Similarity baseline
12. Export preparation
13. Marketplace package creation
14. Opportunity baseline
15. Usage tracking
16. Settings

## MVP Golden Path

```text
SIGN UP
  ↓
CREATE WORKSPACE
  ↓
CREATE PROJECT
  ↓
UPLOAD ASSET
  ↓
ANALYZE
  ↓
PREFLIGHT
  ↓
DESIGN FIT
  ↓
FIX / REVIEW
  ↓
METADATA
  ↓
EXPORT
  ↓
PACKAGE
  ↓
DOWNLOAD
```

This path must work end-to-end before large secondary features are added.

---

# 11. Future Roadmap

## V1 — Production Foundation

- core asset workflow,
- preflight,
- metadata,
- packaging,
- project management.

## V2 — Intelligence

- opportunity engine,
- similarity engine,
- rejection intelligence,
- portfolio intelligence,
- collection consistency.

## V3 — Professional Collaboration

- clients,
- proofing,
- revisions,
- approvals,
- team workspaces.

## V4 — Advanced Automation

- deeper file transformation,
- advanced batch operations,
- integrations,
- marketplace workflow automation,
- advanced analytics.

---

# 12. Detailed Functional Requirements

# 12.1 Authentication

### Requirements

- user can create an account,
- user can log in,
- user can log out,
- user can reset password,
- user can verify email,
- protected pages require authentication,
- expired sessions are handled,
- unauthorized users cannot access private workspace data.

### Acceptance Criteria

- invalid credentials produce a clear error,
- loading states exist,
- network failures are handled,
- session persistence works,
- protected routes are tested.

---

# 12.2 Workspace

### Requirements

- create workspace,
- workspace name,
- workspace avatar/logo,
- member management,
- workspace switching,
- role system,
- workspace settings.

### Roles

Initial roles:

- Owner
- Admin
- Member
- Viewer

---

# 12.3 Dashboard

Dashboard must answer:

1. What needs my attention?
2. What am I working on?
3. What opportunities exist?
4. How healthy is my portfolio?
5. How much time am I saving?

### Dashboard sections

- quick actions,
- recent projects,
- recent assets,
- pending checks,
- opportunities,
- quality summary,
- activity,
- usage,
- time saved.

---

# 12.4 Project Management

### Project properties

- ID,
- name,
- description,
- category,
- status,
- owner,
- workspace,
- created date,
- updated date,
- tags,
- target marketplace,
- target format.

### Statuses

- Draft
- Planning
- In Progress
- Review
- Ready
- Archived

---

# 12.5 Asset Library

### Supported conceptual asset types

- SVG,
- EPS,
- AI,
- PDF,
- PNG,
- JPG,
- other supported formats defined by the implementation.

Actual support must be determined by technical feasibility and licensing.

### Asset properties

- asset ID,
- project ID,
- filename,
- file type,
- size,
- dimensions,
- metadata,
- version,
- status,
- tags,
- analysis status,
- created date,
- modified date.

### User actions

- upload,
- preview,
- rename,
- move,
- tag,
- analyze,
- download,
- archive,
- delete,
- duplicate,
- compare versions.

---

# 12.6 Preflight Doctor

## Purpose

Identify technical problems before marketplace preparation.

## Checks

### Document

- dimensions,
- orientation,
- resolution where applicable,
- color information,
- artboard count,
- artboard size.

### Vector

- open paths,
- excessive nodes,
- hidden objects,
- clipping,
- masks,
- unsupported structures,
- embedded raster content,
- linked assets,
- transparency,
- object overflow.

### Typography

- missing fonts,
- live text,
- font embedding/outlining status where detectable.

### File

- corruption,
- unsupported format,
- suspicious structure,
- file size,
- naming.

### Result categories

- Pass
- Warning
- Error
- Informational

### Every finding must include

- problem,
- severity,
- affected object/file,
- explanation,
- recommended action,
- optional fix.

---

# 12.7 Design Fit Checker

## Core requirement

All design elements must remain inside the selected artboard/document when the user requires a contained marketplace asset.

### Detect

- object outside artboard,
- stroke crossing boundary,
- clipped object,
- overflow,
- unsafe edge distance,
- hidden overflow.

### Visualization

The interface must clearly show:

- artboard,
- design,
- problematic objects,
- safe zone,
- boundary.

### Actions

- inspect,
- select,
- auto-fix where safe,
- ignore,
- recheck.

### Critical rule

The system must never claim a design is safe when an actual boundary violation remains.

---

# 12.8 Similarity Engine

## Purpose

Reduce accidental duplication.

### Analyze

- visual structure,
- composition,
- shape arrangement,
- subject/concept,
- colors,
- typography,
- metadata,
- project relationship.

### Results

The system must not use a single unexplained "duplicate score" as the only answer.

Instead show:

```text
SIMILARITY FINDING

Visual structure: High
Concept: Medium
Color structure: Low
Layout: High
Metadata: Medium

Why:
Same central composition and similar object arrangement.
```

### User actions

- compare,
- inspect,
- mark intentional,
- modify,
- dismiss,
- archive.

---

# 12.9 Collection Consistency

For collections such as icon sets, patterns, or coordinated graphics:

### Check

- stroke,
- scale,
- spacing,
- corner treatment,
- visual weight,
- alignment,
- color,
- grid,
- padding.

### Output

```text
Collection Consistency

Stroke: Pass
Scale: Warning
Spacing: Pass
Grid: Pass
Visual Weight: Warning
Color System: Pass
```

---

# 12.10 Metadata Studio

## Inputs

- asset,
- user description,
- project context,
- category,
- target marketplace,
- optional user notes.

## Outputs

- title,
- description,
- keywords,
- category suggestions,
- warnings,
- relevance checks.

## Rules

Metadata must be:

- accurate,
- relevant,
- concise,
- editable,
- marketplace-aware.

The system must not intentionally generate misleading metadata.

### Keyword tools

- reorder,
- remove,
- replace,
- group,
- detect duplicates,
- detect irrelevant terms,
- detect unsupported concepts.

---

# 12.11 Opportunity Engine

## Purpose

Help the user decide what to create next.

### Inputs

- portfolio,
- projects,
- categories,
- asset history,
- metadata,
- seasonality,
- marketplace information,
- user preferences,
- research sources where legally and technically appropriate.

### Output

Opportunity cards:

```text
Opportunity
Category
Concept
Potential buyer use
Suggested formats
Portfolio gap
Differentiation direction
Difficulty
Reason
```

### Important

An opportunity is a suggestion, not a promise of sales.

The system must not claim guaranteed demand or guaranteed income.

---

# 12.12 Portfolio Intelligence

### Metrics

- total assets,
- active projects,
- category distribution,
- collection distribution,
- quality status,
- metadata health,
- duplicate risk,
- rejection patterns,
- opportunity coverage,
- production activity.

### Portfolio health

The product may calculate internal health indicators, but each metric must have a documented methodology.

Do not present arbitrary scores as objective marketplace success predictions.

---

# 12.13 Rejection Intelligence

### Inputs

- manual rejection entry,
- supported import,
- marketplace,
- date,
- asset,
- rejection reason,
- notes.

### Analysis

- issue categories,
- recurring issues,
- project patterns,
- asset type patterns,
- time trends.

### Output

```text
Recurring Issue
Frequency
Affected Assets
Possible Cause
Recommended Prevention
```

---

# 12.14 Export & Packaging

### Requirements

User can configure:

- filename pattern,
- destination structure,
- preview format,
- metadata output,
- marketplace package.

### Example package

```text
PROJECT/
├── SOURCE/
├── PREVIEW/
├── WEB/
├── METADATA/
├── DOCUMENTATION/
└── FINAL/
```

The exact structure must remain configurable.

---

# 12.15 Designer Proofing

### Requirements

- create review,
- generate shareable review link,
- upload preview,
- client comments,
- comment positioning,
- version tracking,
- approval,
- revision request,
- final approval.

### Revision states

- Draft
- Sent for Review
- Changes Requested
- Approved
- Final

---

# 13. User Experience Requirements

## 13.1 UX Principle

Every screen must make the next useful action obvious.

## 13.2 Primary Navigation

Recommended:

```text
Dashboard
Projects
Assets
Opportunities
Quality
Metadata
Packaging
Portfolio
Analytics
Clients
Settings
```

Navigation should adapt to the user's plan and role.

## 13.3 Empty States

Every empty screen must explain:

- what this area does,
- why it matters,
- what the user should do next.

Example:

> No projects yet. Create your first project to organize assets, analysis, metadata, and marketplace preparation in one place.

## 13.4 Loading States

Every asynchronous operation must have a meaningful loading state.

## 13.5 Error States

Errors must:

- explain what happened,
- avoid technical jargon where possible,
- provide next action,
- preserve user data.

## 13.6 Destructive Actions

Delete/archive/reset actions require appropriate confirmation.

---

# 14. UI Design System Requirements

## Visual Direction

Premium professional SaaS.

Characteristics:

- clean,
- modern,
- restrained,
- high information clarity,
- excellent spacing,
- strong hierarchy,
- professional typography,
- accessible contrast,
- subtle motion.

Avoid:

- excessive gradients,
- unnecessary glassmorphism,
- decorative UI that reduces clarity,
- excessive animations,
- fake AI effects.

## Responsive Requirements

Must support:

- desktop,
- tablet,
- mobile.

Complex file-analysis interfaces may prioritize desktop while still providing a functional mobile experience.

---

# 15. AI Requirements

## AI should be used for

- classification,
- explanation,
- semantic understanding,
- metadata assistance,
- opportunity reasoning,
- similarity explanation,
- summarization,
- recommendation generation.

## AI should not be trusted blindly for

- exact technical file validation,
- security decisions,
- billing calculations,
- permissions,
- marketplace policy enforcement,
- deterministic document dimensions,
- deterministic geometry.

Use deterministic code wherever correctness is required.

---

# 16. AI Output Requirements

Every AI result should ideally contain:

```text
Result
Reason
Confidence/uncertainty where meaningful
Evidence/context
Suggested action
User controls
```

The interface must distinguish:

- verified fact,
- detected condition,
- AI suggestion,
- user decision.

---

# 17. Technical Architecture Requirements

The exact stack may be finalized during technical architecture planning.

The architecture must support:

- scalable frontend,
- secure backend,
- relational data,
- object/file storage,
- background processing,
- AI service abstraction,
- authentication,
- authorization,
- billing,
- observability,
- rate limiting,
- audit logging.

## Architectural principle

Keep these concerns separated:

```text
UI
 ↓
Application/API
 ↓
Domain Services
 ↓
Data Layer
 ↓
External Services
```

File processing and long-running AI operations should be suitable for asynchronous/background processing.

---

# 18. File Processing Architecture

Large creative files can be expensive to process.

The system should support:

```text
UPLOAD
 ↓
VALIDATE
 ↓
STORE
 ↓
QUEUE JOB
 ↓
PROCESS
 ↓
SAVE ANALYSIS
 ↓
NOTIFY USER
```

Never block the primary application request unnecessarily for expensive operations.

---

# 19. Data Model — Initial Entities

Required conceptual entities:

```text
User
Workspace
WorkspaceMember
Project
ProjectFolder
Asset
AssetVersion
File
AssetAnalysis
PreflightResult
PreflightFinding
Metadata
Keyword
Marketplace
MarketplaceProfile
Submission
SubmissionStatus
Rejection
Opportunity
Collection
CollectionMember
Client
ClientProject
Review
Comment
Revision
Notification
Subscription
Plan
UsageRecord
ActivityLog
AuditLog
AIJob
ExportJob
Package
```

The technical team must normalize and refine these before implementation.

---

# 20. Permissions

Every private resource must be scoped correctly.

Examples:

```text
User
 ↓
Workspace
 ↓
Project
 ↓
Asset
 ↓
Analysis
```

A user must never access another workspace's private resources simply by changing an ID in a URL or request.

---

# 21. Security Requirements

Minimum requirements:

- secure authentication,
- secure sessions,
- authorization checks,
- input validation,
- output encoding,
- file type validation,
- file size limits,
- malware/security scanning where appropriate,
- rate limiting,
- secure secrets,
- encrypted transport,
- secure storage,
- audit logging for sensitive actions,
- safe webhook handling,
- payment security,
- privacy controls.

Never expose secret API keys to the client.

---

# 22. Privacy

The product may process user-owned creative files.

Therefore:

- clearly explain file processing,
- provide appropriate deletion controls,
- avoid using private user files for model training without explicit authorization and a documented policy,
- protect project data,
- maintain access controls,
- document retention behavior.

---

# 23. Billing Requirements

Plans should be based on understandable usage.

Possible dimensions:

- storage,
- projects,
- analysis jobs,
- AI usage,
- exports,
- team members,
- advanced features.

Potential plan structure:

```text
Free
Creator
Professional
Studio
Team
```

Final pricing must be validated through market research and operating costs.

---

# 24. Usage Tracking

Track:

- AI jobs,
- file processing,
- storage,
- exports,
- analysis,
- users,
- workspace members.

Usage must be deterministic and auditable.

---

# 25. Notifications

Notification types:

- analysis completed,
- export completed,
- package ready,
- review requested,
- approval received,
- subscription event,
- system warning,
- processing failure.

Users should be able to control non-essential notification preferences.

---

# 26. Search

Global search should eventually support:

- projects,
- assets,
- collections,
- metadata,
- clients,
- opportunities,
- rejection records.

Search must provide:

- exact matching,
- relevant filtering,
- fast results,
- empty states.

---

# 27. Activity & Audit Logs

Activity examples:

```text
Asset uploaded
Project created
Analysis started
Analysis completed
Metadata generated
Export created
Asset archived
Review approved
Subscription changed
```

Audit logs should be more restrictive and immutable than ordinary activity feeds.

---

# 28. Performance Requirements

The application should:

- load primary UI quickly,
- lazy-load heavy features,
- avoid unnecessary network requests,
- process large files asynchronously,
- provide progress indicators,
- cache appropriate data,
- optimize thumbnails/previews,
- paginate large collections.

Never load thousands of large assets into the browser at once.

---

# 29. Accessibility

Minimum requirements:

- keyboard navigation,
- visible focus states,
- semantic HTML,
- accessible labels,
- appropriate contrast,
- meaningful error messages,
- screen-reader compatibility where applicable,
- no essential information conveyed only by color.

---

# 30. Internationalization

Architecture should avoid hard-coded user-facing strings where practical.

Future support may include:

- English,
- Bengali,
- additional languages.

English can be the initial product language.

---

# 31. Analytics

Product analytics should measure:

### Activation

- registration,
- first project,
- first upload,
- first analysis,
- first completed package.

### Engagement

- projects created,
- assets processed,
- analysis runs,
- metadata sessions,
- export sessions.

### Retention

- returning users,
- weekly active creators,
- monthly active creators.

### Value

- time saved,
- errors detected,
- errors fixed,
- packages created,
- repeated workflow usage.

Do not use analytics to mislead users about marketplace success.

---

# 32. Core Success Metrics

## Product Metrics

- time from upload to ready package,
- percentage of users completing the golden path,
- analysis completion rate,
- preflight issue resolution rate,
- metadata editing rate,
- export completion rate,
- repeat workflow usage.

## User Value Metrics

- reported time saved,
- detected issues,
- corrected issues,
- organized assets,
- completed projects.

## Business Metrics

- activation,
- conversion,
- retention,
- churn,
- average revenue per user,
- support burden,
- processing cost per active user.

---

# 33. Quality Requirements

Every feature must support:

- happy path,
- empty state,
- loading state,
- error state,
- validation,
- permission checks,
- responsive UI,
- accessibility,
- regression testing.

---

# 34. Definition of Done — Individual Feature

A feature is complete only when:

```text
[ ] Requirement documented
[ ] UX defined
[ ] Technical approach defined
[ ] Dependencies identified
[ ] UI implemented
[ ] Frontend logic implemented
[ ] Backend implemented if required
[ ] Database implemented if required
[ ] API implemented if required
[ ] Validation implemented
[ ] Error handling implemented
[ ] Loading state implemented
[ ] Empty state implemented
[ ] Permission/security checks completed
[ ] Desktop tested
[ ] Mobile tested
[ ] Accessibility reviewed
[ ] Unit tests added where appropriate
[ ] Integration tests added where appropriate
[ ] End-to-end path tested where appropriate
[ ] Regression test completed
[ ] Documentation updated
[ ] Acceptance criteria passed
[ ] Build passes
[ ] No known critical blocker
```

---

# 35. Definition of Done — Product

The product is production-ready only when:

```text
[ ] PRD requirements completed
[ ] MVP golden path works end-to-end
[ ] Critical user workflows verified
[ ] No unresolved critical bugs
[ ] Security review completed
[ ] Authorization verified
[ ] File processing verified
[ ] AI failure handling verified
[ ] Billing verified
[ ] Usage limits verified
[ ] Data backup/recovery strategy documented
[ ] Monitoring enabled
[ ] Error logging enabled
[ ] Production environment verified
[ ] Responsive experience verified
[ ] Accessibility reviewed
[ ] Privacy documentation completed
[ ] Terms/legal requirements reviewed
[ ] Help/onboarding completed
[ ] Documentation completed
[ ] Regression suite passes
[ ] Production deployment verified
```

---

# 36. Development Workflow

Every feature follows:

```text
RESEARCH
 ↓
REQUIREMENTS
 ↓
FEATURE SPEC
 ↓
DEPENDENCY CHECK
 ↓
IMPLEMENTATION PLAN
 ↓
HUMAN REVIEW
 ↓
BUILD
 ↓
TEST
 ↓
VISUAL VERIFY
 ↓
REGRESSION TEST
 ↓
DOCUMENT
 ↓
MARK COMPLETE
```

---

# 37. Task Decomposition Rules

Never ask an agent to build a large module in one uncontrolled task.

Example:

Bad:

> Build the complete Preflight Doctor.

Good:

```text
PRE-001 Upload validation
PRE-002 File inspection
PRE-003 Artboard detection
PRE-004 Overflow detection
PRE-005 Finding model
PRE-006 Finding UI
PRE-007 Object highlighting
PRE-008 Auto-fix
PRE-009 Recheck
PRE-010 Save results
PRE-011 Regression tests
```

Each task should have a clear beginning and end.

---

# 38. Agent Operating Rules

The coding agent must:

1. Read the relevant project context.
2. Inspect the existing implementation.
3. Identify reusable components.
4. Identify affected files.
5. Identify dependencies.
6. Identify risks.
7. Create a small implementation plan.
8. Implement only requested scope.
9. Run tests.
10. Fix discovered problems.
11. Run regression checks.
12. Update documentation.
13. Report exact changes.
14. Report remaining issues.
15. Never claim completion without verification.

---

# 39. Agent Must Not

The agent must not:

- rewrite unrelated features,
- delete working functionality,
- replace real functionality with mock UI,
- duplicate existing architecture,
- silently change database contracts,
- silently change API contracts,
- install unnecessary dependencies,
- hard-code secrets,
- fabricate successful tests,
- claim a feature is complete without verification,
- invent marketplace requirements,
- guarantee sales or approval,
- hide errors,
- modify unrelated design systems without authorization.

---

# 40. Human Approval Gates

Human approval is required after:

### Gate 1

Market research.

### Gate 2

PRD.

### Gate 3

Technical architecture.

### Gate 4

Database architecture.

### Gate 5

MVP definition.

### Gate 6

Major UI redesign.

### Gate 7

Security-sensitive architecture.

### Gate 8

Billing architecture.

After approval, small implementation tasks may proceed autonomously under the documented rules.

---

# 41. Research Requirements

Before implementing marketplace-specific functionality, research current official documentation.

Research must distinguish:

- official marketplace requirements,
- third-party recommendations,
- community experience,
- assumptions.

Never treat an old blog post as a current official requirement without verification.

Research should be periodically refreshed because marketplace policies can change.

---

# 42. Competitive Research Framework

For each competitor/tool record:

```text
Product
Website
Primary audience
Core problem
Features
Pricing
Strengths
Weaknesses
User complaints
Workflow
Integrations
Differentiation
Opportunity gap
```

Do not copy proprietary implementations.

---

# 43. Opportunity Research Framework

Each opportunity should be evaluated using documented evidence.

Possible dimensions:

- user problem severity,
- workflow frequency,
- time saved,
- technical feasibility,
- differentiation,
- willingness to pay,
- implementation complexity,
- marketplace relevance,
- retention potential.

Do not convert uncertain research into false certainty.

---

# 44. Marketplace Integration Philosophy

The product should initially prepare users for marketplaces rather than depend on fragile direct-upload automation.

Each marketplace integration must have:

- official requirements,
- supported metadata fields,
- supported formats,
- validation rules,
- status behavior,
- API availability,
- rate limits,
- authentication method,
- error handling.

Direct API integration should only be implemented where officially supported and technically appropriate.

---

# 45. File Safety Rules

Before processing a user file:

```text
Validate
 ↓
Identify format
 ↓
Check size
 ↓
Scan/security process
 ↓
Store safely
 ↓
Create processing job
```

Never trust user-provided filenames, MIME types, paths, or metadata.

---

# 46. AI Job Architecture

Long-running AI tasks should use a job system.

Example:

```text
User Request
 ↓
Create AI Job
 ↓
Queue
 ↓
Worker
 ↓
AI Provider
 ↓
Validate Result
 ↓
Store Result
 ↓
Notify User
```

AI output must pass application-level validation before becoming trusted application data.

---

# 47. Error Recovery

Every long-running operation should have:

- status,
- progress,
- retry,
- failure reason,
- cancel where possible,
- safe retry behavior.

Example statuses:

```text
Queued
Processing
Completed
Failed
Cancelled
```

---

# 48. Versioning

Assets and important documents should support version history where applicable.

Version record:

```text
Version
Created by
Created date
Change summary
File reference
Analysis status
Metadata status
```

Users should be able to compare versions where technically appropriate.

---

# 49. Undo / Recovery Philosophy

For destructive or automated transformations:

- preserve original when practical,
- create a new version,
- show what changed,
- allow recovery where feasible.

Never overwrite valuable creative source files unnecessarily.

---

# 50. Reporting

Reports should be exportable where useful.

Possible formats:

- CSV,
- JSON,
- PDF,
- marketplace-specific package.

Reports must clearly distinguish:

- measured data,
- detected findings,
- AI recommendations.

---

# 51. Onboarding

First-time users should answer a small number of useful questions:

- creator type,
- primary asset types,
- primary marketplace(s),
- current workflow,
- main goal.

Then personalize the workspace.

Do not make onboarding unnecessarily long.

---

# 52. In-App Education

The product should explain unfamiliar features with:

- tooltips,
- short explanations,
- examples,
- help links,
- contextual guidance.

Avoid overwhelming users with technical terminology.

---

# 53. Support

Include:

- help center foundation,
- contact/support channel,
- issue reporting,
- system status messaging,
- FAQ.

---

# 54. Future Integrations

Potential future integrations:

- Adobe ecosystem,
- Shutterstock workflow,
- cloud storage,
- design tools,
- project management tools,
- GitHub/developer workflow,
- accounting/billing services.

Each integration requires independent feasibility and API research.

---

# 55. Non-Functional Requirements

The system must prioritize:

- reliability,
- security,
- scalability,
- maintainability,
- observability,
- accessibility,
- performance,
- recoverability,
- clear user feedback.

---

# 56. Release Strategy

## Alpha

Internal testing.

Focus:

- architecture,
- golden path,
- major bugs.

## Private Beta

Small group of real creators.

Focus:

- workflow friction,
- usefulness,
- reliability,
- time saved.

## Public Beta

Broader creator audience.

Focus:

- retention,
- pricing,
- performance,
- support,
- product-market fit.

## Production

Stable core workflow with monitoring and documented support processes.

---

# 57. Rollback Strategy

Every production deployment should have a rollback plan.

Before major deployment:

- backup relevant data,
- verify migration,
- verify environment variables,
- run tests,
- deploy incrementally where possible,
- monitor errors.

---

# 58. Observability

Monitor:

- application errors,
- API failures,
- processing failures,
- AI failures,
- queue delays,
- storage errors,
- billing errors,
- authentication failures,
- performance.

Critical errors should generate actionable alerts.

---

# 59. Documentation Requirements

Documentation must be updated when:

- architecture changes,
- database changes,
- API changes,
- major feature behavior changes,
- security behavior changes,
- marketplace requirements change.

Required project documents:

```text
PRODUCT_PRD.md
PRODUCT_CONTEXT.md
MARKET_RESEARCH.md
COMPETITOR_ANALYSIS.md
FEATURE_REGISTRY.md
TECHNICAL_ARCHITECTURE.md
DATA_MODEL.md
API_ARCHITECTURE.md
UI_UX_SYSTEM.md
AI_AGENT_RULES.md
QA_ACCEPTANCE.md
BUILD_STATUS.md
DECISION_LOG.md
KNOWN_ISSUES.md
CHANGELOG.md
```

---

# 60. Feature Registry Requirements

Every feature gets a unique ID.

Example:

```text
AUTH-001
PROJ-001
ASSET-001
PRE-001
FIT-001
META-001
SIM-001
OPP-001
PORT-001
PACK-001
```

Each record must include:

```text
ID
Name
Purpose
Priority
Dependencies
Status
Specification
Acceptance Criteria
Test Status
```

---

# 61. Priority System

Use:

### P0 — Critical

Required for product operation.

### P1 — Core

Required for MVP value.

### P2 — Important

Strong product enhancement.

### P3 — Future

Useful but not required for initial release.

Never allow P3 work to delay P0/P1 completion without an explicit product decision.

---

# 62. Current Recommended MVP Feature Registry

```text
AUTH-001 Authentication
WORK-001 Workspace
DASH-001 Dashboard
PROJ-001 Projects
ASSET-001 Asset Upload
ASSET-002 Asset Library
ASSET-003 Asset Preview
PRE-001 File Preflight
FIT-001 Design Fit Checker
META-001 Metadata Studio
SIM-001 Similarity Baseline
PACK-001 Export Preparation
PACK-002 Package Creation
OPP-001 Opportunity Baseline
USAGE-001 Usage Tracking
SET-001 Settings
```

---

# 63. Post-MVP Feature Registry

```text
SIM-002 Advanced Similarity
CONS-001 Collection Consistency
REJ-001 Rejection Intelligence
PORT-001 Portfolio Health
PORT-002 Portfolio Gap Analysis
OPP-002 Advanced Opportunity Engine
ANALYTICS-001 Advanced Analytics
CLIENT-001 Client Workspace
PROOF-001 Proofing
REV-001 Revision Management
TEAM-001 Team Workspace
BILL-001 Billing
INTEGRATION-001 Marketplace Integration
```

---

# 64. Golden User Journey Acceptance Test

A new user must be able to:

```text
1. Create account
2. Enter workspace
3. Create project
4. Upload asset
5. See asset
6. Run analysis
7. See preflight findings
8. Inspect design fit
9. Resolve or acknowledge findings
10. Generate metadata
11. Edit metadata
12. Prepare export
13. Create package
14. Download package
15. Return to project
16. See completed history
```

If any critical step cannot be completed, the MVP golden path is not complete.

---

# 65. Quality Gate Before Every Release

```text
PRODUCT
[ ] Requirements verified

UI
[ ] Responsive
[ ] Empty states
[ ] Loading states
[ ] Error states

FUNCTIONAL
[ ] Happy path
[ ] Validation
[ ] Edge cases

DATA
[ ] Database migration verified
[ ] Data integrity verified

SECURITY
[ ] Authentication
[ ] Authorization
[ ] Input validation
[ ] File safety

AI
[ ] Failure handling
[ ] Output validation
[ ] User review

PERFORMANCE
[ ] Large assets
[ ] Slow network
[ ] Concurrent jobs

REGRESSION
[ ] Existing core features

DEPLOYMENT
[ ] Production build
[ ] Environment variables
[ ] Monitoring
```

---

# 66. Product Anti-Goals

The product must not become:

### A generic AI image generator

It may integrate with creative AI tools but should focus on production intelligence.

### A generic project management app

Project management exists to support creative production.

### A generic keyword generator

Metadata is one part of the workflow.

### A marketplace sales predictor

The system may analyze documented data but must not promise sales.

### An uncontrolled automation bot

Users remain in control of important decisions.

### A feature collection

Every feature must connect to a real workflow.

---

# 67. Differentiation Strategy

The product's differentiation should come from the combination of:

```text
OPPORTUNITY
+
CREATIVE PRODUCTION
+
QUALITY CONTROL
+
DIFFERENTIATION
+
METADATA
+
PACKAGING
+
PORTFOLIO INTELLIGENCE
+
WORKFLOW MEMORY
```

The strongest strategic concept is:

> **A persistent creative production intelligence layer for stock contributors and designers.**

---

# 68. Product Moat

Potential long-term advantages:

## Workflow Memory

The system learns the user's production history.

## Portfolio Graph

The system understands relationships among:

- assets,
- projects,
- categories,
- collections,
- metadata,
- issues.

## Quality History

The system learns recurring user errors.

## Opportunity History

The system records:

- suggested opportunity,
- accepted/rejected,
- created assets,
- outcome.

## Production Knowledge

The system becomes better at understanding the user's real workflow over time.

---

# 69. Trust Requirements

The product must clearly distinguish:

```text
VERIFIED
Detected by deterministic system

AI SUGGESTION
Generated by AI

USER DECISION
Chosen by the user

EXTERNAL INFORMATION
Obtained from documented external source

UNKNOWN
Insufficient information
```

This is essential for professional users.

---

# 70. Final Product Architecture Concept

```text
                         CREATIVE INTELLIGENCE SaaS
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
        CREATION               QUALITY            INTELLIGENCE
             │                    │                    │
        Projects              Preflight           Opportunity
        Assets                Design Fit          Similarity
        Collections           Consistency         Portfolio
        Versions              Validation          Rejection
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
                            WORKFLOW ENGINE
                                  │
                 ┌────────────────┼────────────────┐
                 │                │                │
              Metadata          Export          Packaging
                 │                │                │
                 └────────────────┼────────────────┘
                                  │
                            USER WORKSPACE
                                  │
                 ┌────────────────┼────────────────┐
                 │                │                │
              Analytics         Clients          Billing
```

---

# 71. Final Product Principle

The product should continuously answer five questions:

### 1. WHAT SHOULD I MAKE?

Opportunity Engine

### 2. HOW CAN I MAKE IT SYSTEMATICALLY?

Project / Collection / Production System

### 3. IS IT GOOD ENOUGH?

Quality / Preflight / Design Fit

### 4. HOW DO I PREPARE IT?

Metadata / Export / Packaging

### 5. WHAT SHOULD I DO NEXT?

Portfolio / Rejection / Opportunity Intelligence

---

# 72. Final Acceptance Statement

The product should not be considered complete because the interface looks finished.

It is complete when the documented user workflows work reliably from beginning to end, the system handles normal and failure conditions, user data is protected, file-processing operations are validated, AI output is reviewed and controlled, marketplace preparation is accurate according to current documented requirements, and all critical acceptance criteria pass.

The product's success is not measured by the number of AI features.

It is measured by whether creators can:

> **produce better work, avoid preventable problems, organize their workflow, reduce repetitive work, and make more informed creative decisions.**

---

# 73. Next Documents to Generate From This PRD

This PRD is the product foundation. It should now be expanded into separate engineering documents:

```text
01_PRODUCT_CONTEXT.md
02_MARKET_RESEARCH.md
03_COMPETITOR_ANALYSIS.md
04_FEATURE_REGISTRY.md
05_TECHNICAL_ARCHITECTURE.md
06_DATA_MODEL.md
07_API_ARCHITECTURE.md
08_UI_UX_SYSTEM.md
09_AI_ARCHITECTURE.md
10_WORKFLOW_SPECS.md
11_AI_AGENT_RULES.md
12_QA_ACCEPTANCE.md
13_BUILD_STATUS.md
14_DECISION_LOG.md
15_KNOWN_ISSUES.md
16_MVP_IMPLEMENTATION_PLAN.md
```

These documents must be generated and reviewed before large-scale implementation.

---

# END OF MASTER PRD

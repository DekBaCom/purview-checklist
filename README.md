# PurviewTrack - Deployment Readiness

PurviewTrack is a professional, single-page web application designed to help organizations track their Microsoft Purview rollout process globally. It acts as an interactive deployment readiness checklist, complete with progress tracking, visual dashboards, an interactive plan builder, and readiness report generation.

## Features

- **Interactive Dashboard:** Get an overview of the rollout process with progress boards and dynamic charts powered by Chart.js.
- **Implementation Checklist:** Track granular tasks across different phases to automatically update your deployment metrics.
- **Plan Builder:** Utilize an interactive wizard to formulate a customized Microsoft Purview rollout plan tailored to your organization.
- **Readiness Report Export:** Generate a categorized executive readiness summary based entirely on local inputs and seamlessly export it to a PDF format.
- **Privacy-First (No Backend):** All data is saved on your device and localized within your browser via `localStorage` (auto-save enabled). No external server dependencies are required.
- **Dark Mode Support:** A built-in theme toggle dynamically switches the application between sleek Light and Dark UI modes.

## Technology Stack

- **Core:** HTML5, Vanilla JavaScript
- **Styling:** Tailwind CSS (via CDN) + Custom Vanilla CSS for specific UI/UX components
- **Libraries:**
  - [Chart.js](https://www.chartjs.org/) for beautiful, data-driven charts
  - [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) for seamless client-side PDF document generation
  - [Phosphor Icons](https://phosphoricons.com/) for clean and consistent iconography

## Getting Started

1. **Clone the repository** or download the source code files.
2. **Open `index.html`** in any modern web browser (Edge, Chrome, Firefox, Safari).
3. Ensure you have an active internet connection on the first run, as the application requires CDN access for Tailwind CSS, Phosphor Icons, and selected scripts.

## Workspace Structure

- `index.html`: The main markup file that builds the structural SPA interface.
- `style.css`: The stylesheet providing custom tokens, dynamic shape geometry, micro-animations, and custom styling that complements Tailwind.
- `script.js`: The central logic handler addressing routing, interactive tabs, storage operations, PDF exports, layout configuration, and charting initializations.

## Important Note

This tool leverages local browser caching for persistence across sessions. If you clear your browser's site data, or use Incognito/InPrivate mode without saving, your progress will be internally reset.

## Contributor

- **Contributed by:** Mr. Abdulloh Etaeluengoh
- **Email:** [Abdulloh.eg@gmail.com](mailto:Abdulloh.eg@gmail.com)
- **LinkedIn:** Abdulloh Etaeluengoh

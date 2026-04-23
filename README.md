# Portal Center for Microsoft Purview Solution

A professional, enterprise-grade architecture planning and deployment readiness platform for Microsoft Purview. This tool transforms complex compliance requirements into an actionable, persona-driven portal.

## 🚀 Key Features

- **Advanced Assessment (Enrollment Questioner):** An intelligent onboarding wizard that uses industry-specific logic (Financial, Healthcare, etc.) to automatically inject regulatory tasks (PCI-DSS, HIPAA, SEC) into your plan.
- **The Architect’s Toolkit:** Built-in technical deep-dive library featuring:
  - **PowerShell Snippets:** Ready-to-use commands for rapid configuration.
  - **KQL Queries:** Pre-built queries for Microsoft Sentinel and Audit log investigations.
- **Persona-Based UI Views:** Dynamically adjust the interface for different stakeholders:
  - **Executive:** High-level risk summaries and progress charts.
  - **Architect:** Full access to technical tools, license toggles, and detailed notes.
  - **Operator:** Simplified, task-focused interface for day-to-day execution.
- **Interactive Reference Architecture:** A visual map of the Purview ecosystem. Click on components to see technical details and the "Value & Outcomes" they provide to the organization.
- **License Selector (E3 vs E5):** Real-time visualization of license gaps. Switching to E3 gracefully grays out features that require E5, providing a clear path for upselling or budgeting.
- **Template Repository:** A community-style hub for downloading pre-configured JSON/CSV templates for DLP policies, Sensitivity Labels, and Insider Risk groups.
- **Project Management Export:** One-click export to a CSV format optimized for importing tasks directly into Microsoft Planner, Jira, or Azure DevOps.
- **Dashboard & Heatmaps:** Visual health checks across different Purview modules (Governance, Protection, Compliance) using interactive heatmaps and Chart.js.
- **Privacy-First (No Backend):** All data stays localized in your browser via `localStorage`. No external server dependencies are required for data storage.

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (Glassmorphism design)
- **Visualizations:** [Chart.js](https://www.chartjs.org/) for analytics and heatmaps
- **Reports:** [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) for executive PDF generation
- **Icons:** [Phosphor Icons](https://phosphoricons.com/) for a sleek, consistent interface

## 🏁 Getting Started

1. **Clone the repository** or download the source files.
2. **Open `index.html`** in any modern web browser (Edge, Chrome, Chrome).
3. **Start the Enrollment:** Use the *Enrollment Questioner* to generate your customized implementation plan based on your industry and specific needs.

## 📂 Project Structure

- `index.html`: The core Single Page Application (SPA) structure and UI layout.
- `script.js`: The "brain" of the portal, handling persona logic, industry rules, toolkit snippets, and data persistence.
- `style.css`: Custom design tokens, glassmorphism effects, and premium UI styling.

## 👤 Contributor

- **Developed by:** Mr. Abdulloh Etaeluengoh
- **Role:** Microsoft 365 Solution Architect
- **Email:** [Abdulloh.eg@gmail.com](mailto:Abdulloh.eg@gmail.com)
- **LinkedIn:** [Abdulloh Etaeluengoh](https://www.linkedin.com/in/abdulloh-etaeluengoh/)

---
*Powered by Microsoft Purview Deployment Best Practices.*

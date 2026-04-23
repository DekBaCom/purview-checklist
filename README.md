# Portal Center for Microsoft Purview Solution

A professional, enterprise-grade architecture planning and deployment readiness platform for Microsoft Purview. This tool transforms complex compliance requirements into an actionable, persona-driven portal with automated project planning capabilities.

## 🚀 Key Features

### 1. Advanced Assessment & Enrollment
- **Intelligent Enrollment Form:** Captures organizational context (Organization Name, Industry, License, Readiness) to tailor the entire experience.
- **Industry-Specific Logic:** Automatically injects regulatory tasks (PCI-DSS, HIPAA, SEC) based on whether you are in Financial Services, Healthcare, or Government.

### 2. Automated Project Planning
- **Interactive Implementation Wizard:** A step-by-step guide to scope your Data Discovery, Classification, DLP, Insider Risk, and eDiscovery needs.
- **Project Roadmap (Timeline):** Generates a visual 3-phase rollout plan (Foundation, Protection, Optimization) with estimated weekly durations.
- **Detailed Action Plan:** Provides a technical breakdown of specific actions required, mapped to the correct Microsoft Purview tools and platforms.

### 3. The Architect’s Toolkit
- **Technical Snippets:** Quick-access library for PowerShell commands and KQL queries (Microsoft Sentinel) for rapid implementation.
- **Interactive Reference Architecture:** A high-level logical design map. Click on any component (M365, Purview Core, SecOps) to view technical details and expected business outcomes.

### 4. Persona-Driven UI & Licensing
- **Persona Views:** Tailors the dashboard and checklist for Executives (strategic), Architects (technical), and Operators (execution).
- **License Gap Analysis:** Real-time visualization of E3 vs E5 capabilities. Gray-out logic identifies features requiring license upgrades.

### 5. Advanced Reporting & Export
- **Readiness Report:** Generates an executive-level summary with maturity scoring, gap analysis, and recommendations.
- **Multi-Format Export:**
  - **PDF:** Executive summary for leadership reporting.
  - **Excel (CSV) Project Plan:** Detailed roadmap and action items for project management.
  - **Excel (CSV) Tasks:** Granular checklist items for importing into Planner, Jira, or Azure DevOps.

## 📖 User Guide & Manual

### Step 1: Initialization (Enrollment)
When you first launch the portal, you will be directed to the **Enrollment Questioner**.
1. **Fill in Organization Context:** Enter your company name and select your industry. This sets the regulatory baseline.
2. **Select License:** Choose between E3 and E5. This will adjust the available features in the checklist.
3. **Run the Wizard:** Answer the scoping questions (Discovery, Protection, etc.).
4. **Generate Plan:** Click "Finish" to inject personalized tasks into your checklist and generate your project roadmap.

### Step 2: Implementation & Tracking
Navigate to the **Checklist** tab:
1. **Update Progress:** Change task statuses (Not Started, In Progress, Done) to see real-time updates on your Dashboard.
2. **Architect's Toolkit:** If you are an Architect or Operator, click the **"Quick Action"** button on a task to view the relevant PowerShell and KQL snippets.
3. **Add Notes:** Use the notes field to track owners, dates, or specific configuration details.

### Step 3: Architecture Review
Navigate to the **Architecture** tab:
1. **View Ecosystem:** Visualize the flow from Data Sources to SecOps.
2. **Deep Dive:** Click on any card (e.g., "Information Protection") to open a detailed modal explaining the technical components and business value.

### Step 4: Executive Reporting
Navigate to the **Report** tab:
1. **Review Maturity:** Check your overall completion percentage and maturity level (1-5).
2. **Analyze Gaps:** Review high-priority items that still require attention.
3. **Project Roadmap:** Review the generated 3-phase timeline.
4. **Export:**
   - Use **"Export PDF"** for a professional executive summary.
   - Use **"Export Project Plan"** for an Excel-compatible roadmap for PMO.

### Step 5: Data Management
Navigate to the **Dashboard** bottom section:
- **Reset Data:** If you need to start a new project or clear the current progress, use the "Reset All Data" button. This will take you back to Step 1.

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (Glassmorphism design)
- **Visualizations:** [Chart.js](https://www.chartjs.org/) for analytics and heatmaps
- **Reports:** [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) for executive PDF generation
- **Icons:** [Phosphor Icons](https://phosphoricons.com/) for a sleek, consistent interface

## 🏁 Getting Started

1. **Clone the repository** or download the source files.
2. **Open `index.html`** in any modern web browser (Edge, Chrome, Safari).
3. **Internet Connection:** Required for loading CDN assets (Tailwind, Icons, Charts).

## 📂 Project Structure

- `index.html`: Core SPA layout and structure.
- `script.js`: Central logic for the wizard, architecture interactions, report generation, and CSV/PDF exports.
- `style.css`: Custom CSS for glassmorphism, animations, and theme-specific styling.

## 👤 Contributor

- **Developed by:** Mr. Abdulloh Etaeluengoh
- **Role:** Microsoft 365 Solution Architect
- **Email:** [Abdulloh.eg@gmail.com](mailto:Abdulloh.eg@gmail.com)
- **LinkedIn:** [Abdulloh Etaeluengoh](https://www.linkedin.com/in/abdulloh-etaeluengoh/)

---
*Powered by Microsoft Purview Deployment Best Practices.*

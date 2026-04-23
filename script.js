const STORAGE_KEY = 'purview_readiness_data';
const THEME_KEY = 'purview_theme';

// Default data structure
const defaultData = [
    {
        id: "discovery",
        title: "Data Discovery",
        module: "Governance",
        desc: "Identify and understand your data landscape across M365 and external systems.",
        items: [
            { id: "d1", title: "Setup Content Explorer & Activity Explorer", status: "Not Started", priority: "High", license: "E3", powershell: "Connect-IPPSSession\nGet-DataClassificationActivity", kql: "AuditLogs | where Operation == 'Viewed Content Explorer'", notes: "" },
            { id: "d2", title: "Scan SharePoint and OneDrive for sensitive data", status: "Not Started", priority: "High", license: "E3", powershell: "Start-DlpComplianceRule -Identity 'Scan-SPO'", kql: "OfficeActivity | where RecordType == 'SharePointFileOperation'", notes: "" },
            { id: "d3", title: "Map on-premises data repositories using Purview scanners", status: "Not Started", priority: "Medium", license: "E5", powershell: "Set-AIPScannerConfiguration -OnPremises $true", kql: "PurviewDataMapLogs | where EventName == 'ScanCompleted'", notes: "" },
            { id: "d4", title: "Review third-party app connections (Shadow IT)", status: "Not Started", priority: "Medium", license: "E5", powershell: "Get-MCASAppDiscovery", kql: "CloudAppEvents | where ActionType == 'AppConnected'", notes: "" }
        ]
    },
    {
        id: "classification",
        title: "Data Classification",
        module: "Protection",
        desc: "Define what sensitive data means to your organization and tag it.",
        items: [
            { id: "c1", title: "Define default Sensitive Information Types (SITs)", status: "Not Started", priority: "High", license: "E3", powershell: "Get-DlpSensitiveInformationType", kql: "AuditLogs | where Operation contains 'SensitiveInformationType'", notes: "" },
            { id: "c2", title: "Create custom SITs for industry-specific data", status: "Not Started", priority: "Medium", license: "E3", powershell: "New-DlpSensitiveInformationType -Name 'CustomSIT'", kql: "AuditLogs | where Operation == 'New-DlpSensitiveInformationType'", notes: "" },
            { id: "c3", title: "Create Sensitivity Labels (Public, Internal, Confidential, Strict)", status: "Not Started", priority: "High", license: "E3", powershell: "New-Label -Name 'Confidential'", kql: "AuditLogs | where Operation == 'New-Label'", notes: "" },
            { id: "c4", title: "Publish Sensitivity Label policies to user groups", status: "Not Started", priority: "High", license: "E3", powershell: "New-LabelPolicy -Name 'Global Policy'", kql: "AuditLogs | where Operation == 'New-LabelPolicy'", notes: "" },
            { id: "c5", title: "Train Custom Classifiers for complex documents", status: "Not Started", priority: "Low", license: "E5", powershell: "New-DataClassificationTrainer", kql: "AuditLogs | where Operation == 'Train-Classifier'", notes: "" }
        ]
    },
    {
        id: "dlp",
        title: "Data Loss Prevention",
        module: "Protection",
        desc: "Prevent accidental or malicious sharing of sensitive data.",
        items: [
            { id: "dlp1", title: "Create baseline Exchange DLP policy", status: "Not Started", priority: "High", license: "E3", powershell: "New-DlpCompliancePolicy -Name 'Exchange DLP'", kql: "OfficeActivity | where Operation == 'DLPPolicyMatch'", notes: "" },
            { id: "dlp2", title: "Configure Teams chat and channel DLP", status: "Not Started", priority: "Medium", license: "E3", powershell: "New-DlpComplianceRule -Policy 'Teams DLP'", kql: "OfficeActivity | where Workload == 'MicrosoftTeams' and Operation == 'DLPPolicyMatch'", notes: "" },
            { id: "dlp3", title: "Onboard Windows 10/11 devices to Endpoint DLP", status: "Not Started", priority: "High", license: "E5", powershell: "Set-MdatpEnforcement -EnableEndpointDlp $true", kql: "DeviceEvents | where ActionType == 'DlpRuleMatch'", notes: "" },
            { id: "dlp4", title: "Test policies in Audit Only mode", status: "Not Started", priority: "High", license: "E3", powershell: "Set-DlpCompliancePolicy -Mode Test", kql: "AuditLogs | where Operation == 'Set-DlpCompliancePolicy'", notes: "" }
        ]
    },
    {
        id: "insider_risk",
        title: "Insider Risk Management",
        module: "Compliance",
        desc: "Identify and mitigate hidden risks within the organization.",
        items: [
            { id: "irm1", title: "Enable audit logging in M365", status: "Not Started", priority: "High", license: "E3", powershell: "Set-AdminAuditLogConfig -UnifiedAuditLogIngestionEnabled $true", kql: "AuditLogs | take 10", notes: "" },
            { id: "irm2", title: "Configure data theft by departing users policy", status: "Not Started", priority: "Medium", license: "E5", powershell: "New-InsiderRiskPolicy -Name 'Departing Users'", kql: "InsiderRiskAlerts | where PolicyName == 'Departing Users'", notes: "" },
            { id: "irm3", title: "Set up communication compliance for harassment/profanity", status: "Not Started", priority: "Low", license: "E5", powershell: "New-SupervisoryReviewPolicy -Name 'Harassment'", kql: "CommunicationComplianceAlerts | where Category == 'Harassment'", notes: "" },
            { id: "irm4", title: "Define access thresholds and anonymized reporting", status: "Not Started", priority: "Medium", license: "E5", powershell: "Set-InsiderRiskSettings -AnonymizeUsers $true", kql: "AuditLogs | where Operation == 'UpdateInsiderRiskSettings'", notes: "" }
        ]
    },
    {
        id: "ediscovery",
        title: "eDiscovery & Lifecycle",
        module: "Compliance",
        desc: "Respond to legal requests and manage data retention.",
        items: [
            { id: "edis1", title: "Assign eDiscovery Manager/Administrator roles", status: "Not Started", priority: "High", license: "E3", powershell: "Add-RoleGroupMember -Identity 'eDiscovery Manager' -Member 'user@domain.com'", kql: "AuditLogs | where Operation == 'Add-RoleGroupMember'", notes: "" },
            { id: "edis2", title: "Define default Retention Labels and Policies", status: "Not Started", priority: "High", license: "E3", powershell: "New-RetentionCompliancePolicy -Name 'Default Retention'", kql: "AuditLogs | where Operation == 'New-RetentionCompliancePolicy'", notes: "" },
            { id: "edis3", title: "Create legal hold test cases", status: "Not Started", priority: "Medium", license: "E3", powershell: "New-CaseHoldPolicy -Name 'Legal Hold Test'", kql: "AuditLogs | where Operation == 'New-CaseHoldPolicy'", notes: "" },
            { id: "edis4", title: "Review retention rules for Teams recordings", status: "Not Started", priority: "Low", license: "E3", powershell: "Set-TeamsCompliancePolicy -RecordingsRetention $true", kql: "AuditLogs | where Operation contains 'TeamsCompliance'", notes: "" }
        ]
    }
];

let appData = [];
let chartPieInstance = null;
let chartBarInstance = null;
let currentPersona = 'Architect';
let currentLicense = 'E5';

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadData();
    renderChecklist();
    updateDashboard();
    
    // Set current date in report
    const d = new Date();
    document.getElementById('report-date').textContent = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Check if it's the first time / pristine state
    const isEnrolled = localStorage.getItem('purview_enrolled');
    if (!isEnrolled) {
        switchTab('builder'); // Force Enrollment Questioner on first visit
    } else {
        switchTab('dashboard'); // Otherwise default to Dashboard
    }
});

// --- Theme Management ---
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    const toggleBtn = document.getElementById('themeToggle');
    
    // Initial Setting
    if (savedTheme === 'dark' || (!localStorage.getItem(THEME_KEY) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.getElementById('themeIcon').className = 'ph-fill ph-sun text-yellow-400 text-xl';
        document.getElementById('themeText').textContent = 'Light Mode';
    }

    toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        
        document.getElementById('themeIcon').className = isDark ? 'ph-fill ph-sun text-yellow-400 text-xl' : 'ph ph-moon text-xl';
        document.getElementById('themeText').textContent = isDark ? 'Light Mode' : 'Dark Mode';
        
        // Re-render charts to update colors
        if(chartPieInstance) updateDashboard();
    });
}

// --- Mobile Sidebar Toggle ---
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('opacity-100'), 10);
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.remove('opacity-100');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
}

// --- Data Management ---
function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Check if the old data format is used (missing new toolkit fields)
            if (parsed.length && parsed[0].items && parsed[0].items[0].powershell !== undefined) {
                appData = parsed;
                return;
            }
        } catch (e) {
            console.error('Error parsing local data', e);
        }
    }
    appData = JSON.parse(JSON.stringify(defaultData)); 
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    updateDashboard(); // Also sync dash
}

function resetData() {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
        appData = JSON.parse(JSON.stringify(defaultData));
        localStorage.removeItem('purview_enrolled');
        saveData();
        renderChecklist();
        switchTab('builder'); // Take them back to Enrollment
    }
}

// --- UI Navigation ---
function switchTab(tabId) {
    // Hide all sections
    ['sec-dashboard', 'sec-checklist', 'sec-report', 'sec-builder', 'sec-templates', 'sec-architecture'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.classList.add('hidden');
            el.classList.remove('block');
        }
    });

    // Remove active state from tabs
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('bg-indigo-500/10');
        btn.classList.remove('font-bold');
        btn.classList.add('font-medium');
    });

    // Show target section
    document.getElementById('sec-' + tabId).classList.remove('hidden');
    document.getElementById('sec-' + tabId).classList.add('block');
    
    // Set active tab
    const activeBtn = document.getElementById('tab-' + tabId);
    if(activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.classList.remove('font-medium');
        activeBtn.classList.add('font-bold');
    }
    
    // Close mobile sidebar if open
    if(window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        if(!sidebar.classList.contains('-translate-x-full')) {
            toggleMobileSidebar();
        }
    }

    // Refresh specific section
    if (tabId === 'dashboard') updateDashboard();
    if (tabId === 'report') renderReport();
    if (tabId === 'builder' && Object.keys(builderAnswers).length === 0) resetBuilder();
}

// --- Checklist Rendering ---
function renderChecklist() {
    const container = document.getElementById('checklist-container');
    container.innerHTML = '';

    appData.forEach((category, cIndex) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'glass-card p-6 md:p-8';
        
        let headerHtml = `
            <div class="mb-6 pb-4 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-bold flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-black border border-indigo-500/20 shadow-sm">${cIndex + 1}</div>
                        ${category.title}
                        <span class="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-bold uppercase tracking-widest text-[color:var(--text-muted)]">${category.module}</span>
                    </h3>
                    ${currentPersona !== 'Executive' ? `<p class="text-sm text-[color:var(--text-muted)] mt-2 md:pl-11">${category.desc}</p>` : ''}
                </div>
            </div>
            <div class="space-y-3">
        `;
        
        let itemsHtml = category.items.map((item, iIndex) => {
            const isDone = item.status === "Done";
            const requiresE5 = item.license === 'E5';
            const disabledByLicense = requiresE5 && currentLicense === 'E3';

            let prioColor = item.priority === 'High' ? 'text-red-500 bg-red-500/10 border-red-500/20' : 
                            (item.priority === 'Medium' ? 'text-orange-500 bg-orange-500/10 border-orange-500/20' : 
                            'text-slate-500 bg-slate-500/10 border-slate-500/20');

            let licBadge = requiresE5 ? `<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-500/30 text-purple-600 bg-purple-500/10 flex items-center gap-1"><i class="ph-fill ph-crown"></i> E5</span>` : `<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-blue-500/30 text-blue-600 bg-blue-500/10">E3/E5</span>`;

            let itemClass = isDone ? 'border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10' : 'border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50';
            
            if (disabledByLicense) {
                itemClass += ' opacity-50 grayscale pointer-events-none';
            }

            return `
            <div class="checklist-item flex flex-col lg:flex-row lg:items-center gap-4 p-4 rounded-xl border ${itemClass} shadow-sm transition-all">
                <div class="flex items-start gap-4 flex-grow">
                    <input type="checkbox" class="glass-checkbox mt-1" 
                           ${isDone ? 'checked' : ''} 
                           ${disabledByLicense ? 'disabled' : ''}
                           onchange="handleCheckbox('${category.id}', '${item.id}', this.checked)">
                    <div class="flex-grow">
                        <div class="font-semibold text-base flex flex-wrap items-center gap-2 ${isDone ? 'line-through text-[color:var(--text-muted)] opacity-70' : 'text-slate-800 dark:text-slate-100'}">
                            ${item.title}
                            ${disabledByLicense ? '<span class="text-[10px] text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded uppercase tracking-wider border border-red-500/20">Requires E5</span>' : ''}
                        </div>
                        <div class="flex gap-2 mt-2 items-center flex-wrap">
                            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${prioColor}">
                                ${item.priority}
                            </span>
                            ${currentPersona === 'Architect' ? licBadge : ''}
                            ${(currentPersona === 'Architect' || currentPersona === 'Operator') && !disabledByLicense && (item.powershell || item.kql) ? `<button onclick="showSnippets('${btoa(item.powershell || '')}', '${btoa(item.kql || '')}')" class="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border border-indigo-500/30 text-indigo-600 bg-indigo-500/10 hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1"><i class="ph-bold ph-terminal-window"></i> Quick Action</button>` : ''}
                        </div>
                    </div>
                </div>
                ${currentPersona !== 'Executive' ? `
                <div class="flex flex-col sm:flex-row gap-3 lg:w-auto w-full">
                    <select class="glass-input px-3 py-2 text-sm lg:w-40 font-medium cursor-pointer" 
                            onchange="updateItem('${category.id}', '${item.id}', 'status', this.value)"
                            ${isDone || disabledByLicense ? 'disabled' : ''}>
                        <option value="Not Started" ${item.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                        <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Done" ${item.status === 'Done' ? 'selected' : ''}>Done</option>
                    </select>
                    <input type="text" placeholder="Add notes/owners..." class="glass-input px-3 py-2 text-sm flex-grow lg:w-56 placeholder:text-[color:var(--text-muted)]"
                           value="${item.notes}"
                           ${disabledByLicense ? 'disabled' : ''}
                           onchange="updateItem('${category.id}', '${item.id}', 'notes', this.value)">
                </div>` : ''}
            </div>
            `;
        }).join('');

        catDiv.innerHTML = headerHtml + itemsHtml + `</div>`;
        container.appendChild(catDiv);
    });
}

function updateItem(catId, itemId, field, value) {
    const cat = appData.find(c => c.id === catId);
    if (!cat) return;
    const item = cat.items.find(i => i.id === itemId);
    if (!item) return;

    item[field] = value;
    saveData();
    
    if (field === 'status') {
        renderChecklist();
    }
}

function handleCheckbox(catId, itemId, isChecked) {
    const newStatus = isChecked ? "Done" : "In Progress";
    updateItem(catId, itemId, 'status', newStatus);
}

// --- Dashboard Logic ---
function updateDashboard() {
    let totalItems = 0;
    let completedItems = 0;
    
    let statusCounts = { "Not Started": 0, "In Progress": 0, "Done": 0 };
    let categoryStats = [];

    appData.forEach(cat => {
        let catTotal = cat.items.length;
        let catDone = 0;
        
        cat.items.forEach(item => {
            totalItems++;
            statusCounts[item.status]++;
            if (item.status === 'Done') {
                completedItems++;
                catDone++;
            }
        });
        
        categoryStats.push({
            title: cat.title,
            shortTitle: cat.title.split(' ')[1] || cat.title.split(' ')[0], // Discovery, Classification, etc.
            total: catTotal,
            done: catDone,
            percent: Math.round((catDone / catTotal) * 100)
        });
    });

    const overallPercent = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
    document.getElementById('overall-progress-text').textContent = overallPercent + '%';
    document.getElementById('overall-tasks-text').textContent = `(${completedItems}/${totalItems})`;
    document.getElementById('overall-progress-bar').style.width = overallPercent + '%';

    // Update Category Cards
    const cardsContainer = document.getElementById('dashboard-cards');
    cardsContainer.innerHTML = '';
    categoryStats.forEach((stat, idx) => {
        let isComplete = stat.percent === 100;
        
        cardsContainer.innerHTML += `
            <div class="glass-card p-5 flex flex-col justify-between border-t-4 ${isComplete ? 'border-t-emerald-500' : 'border-t-indigo-500'}">
                <div class="flex justify-between items-start mb-2">
                    <div class="text-[11px] font-bold text-[color:var(--text-muted)] uppercase tracking-wider truncate" title="${stat.title}">${stat.title}</div>
                    ${isComplete ? '<i class="ph-fill ph-check-circle text-emerald-500 text-lg"></i>' : ''}
                </div>
                <div class="text-3xl font-black mt-1 ${isComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-white'}">${stat.percent}%</div>
                <div class="text-xs text-[color:var(--text-muted)] mt-1 mb-4 font-medium">${stat.done} of ${stat.total} completed</div>
                <div class="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-1.5 mt-auto overflow-hidden">
                    <div class="${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'} h-1.5 rounded-full" style="width: ${stat.percent}%"></div>
                </div>
            </div>
        `;
    });

    // Update Heatmap
    const heatmapContainer = document.getElementById('heatmap-container');
    if (heatmapContainer) {
        heatmapContainer.innerHTML = '';
        categoryStats.forEach(stat => {
            let intensityClass = 'bg-slate-200 dark:bg-slate-700'; // 0%
            if (stat.percent > 0) intensityClass = 'bg-indigo-200 dark:bg-indigo-900/50';
            if (stat.percent >= 40) intensityClass = 'bg-indigo-400 dark:bg-indigo-600';
            if (stat.percent >= 70) intensityClass = 'bg-indigo-600 dark:bg-indigo-500';
            if (stat.percent === 100) intensityClass = 'bg-emerald-500 dark:bg-emerald-500';

            heatmapContainer.innerHTML += `
                <div class="flex flex-col gap-1 items-center" title="${stat.title}: ${stat.percent}%">
                    <div class="w-full h-12 rounded-lg ${intensityClass} transition-colors border border-black/5 dark:border-white/5 shadow-sm"></div>
                    <span class="text-[10px] font-bold text-center text-[color:var(--text-muted)] uppercase tracking-wider truncate w-full">${stat.shortTitle}</span>
                </div>
            `;
        });
    }

    drawCharts(statusCounts, categoryStats);
}

// Chart drawing logic
function drawCharts(statusCounts, categoryStats) {
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#94a3b8' : '#64748b'; // muted text
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.font.weight = 600;

    // Destroy existing instances
    if (chartPieInstance) chartPieInstance.destroy();
    if (chartBarInstance) chartBarInstance.destroy();

    // Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    
    // Create subtle gradients
    let g1 = pieCtx.createLinearGradient(0,0,0,300);
    g1.addColorStop(0, '#cbd5e1'); g1.addColorStop(1, '#94a3b8');
    if(isDark) { g1.addColorStop(0, '#475569'); g1.addColorStop(1, '#334155'); }
    
    let g2 = pieCtx.createLinearGradient(0,0,0,300);
    g2.addColorStop(0, '#818cf8'); g2.addColorStop(1, '#4f46e5');
    
    let g3 = pieCtx.createLinearGradient(0,0,0,300);
    g3.addColorStop(0, '#34d399'); g3.addColorStop(1, '#059669');

    chartPieInstance = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: ['Not Started', 'In Progress', 'Done'],
            datasets: [{
                data: [statusCounts["Not Started"], statusCounts["In Progress"], statusCounts["Done"]],
                backgroundColor: [g1, g2, g3],
                borderWidth: isDark ? 2 : 3,
                borderColor: isDark ? '#1e293b' : '#ffffff',
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
            }
        }
    });

    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    let barGrad = barCtx.createLinearGradient(0,0,0,400);
    barGrad.addColorStop(0, '#6366f1'); barGrad.addColorStop(1, '#8b5cf6');

    chartBarInstance = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: categoryStats.map(c => c.shortTitle),
            datasets: [{
                label: 'Completion %',
                data: categoryStats.map(c => c.percent),
                backgroundColor: barGrad,
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 24
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true, max: 100,
                    grid: { color: gridColor, drawBorder: false },
                    ticks: { callback: v => v + '%' }
                },
                x: {
                    grid: { display: false, drawBorder: false }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.9)',
                    titleColor: isDark ? '#fff' : '#000',
                    bodyColor: isDark ? '#cbd5e1' : '#475569',
                    bodyFont: { weight: 'bold' },
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: (items) => categoryStats[items[0].dataIndex].title,
                        label: (c) => c.raw + '% Completed'
                    }
                }
            }
        }
    });
}

// --- Report Generation ---
function renderReport() {
    let total = 0, done = 0;
    let gaps = [];
    let recs = [];
    let breakdownHtml = '';

    appData.forEach(cat => {
        let catTotal = cat.items.length;
        let catDone = 0;
        
        cat.items.forEach(item => {
            total++;
            if (item.status === 'Done') {
                catDone++;
            } else {
                if (item.priority === 'High') {
                    gaps.push(`<strong>${cat.title}:</strong> ${item.title}`);
                } else if (item.status === 'In Progress') {
                    recs.push(`Finalize in-progress item: "${item.title}"`);
                } else {
                    recs.push(`Scope and plan: "${item.title}"`);
                }
            }
        });
        
        done += catDone;
        let pcent = Math.round((catDone / catTotal) * 100);
        
        breakdownHtml += `
            <div class="px-5 py-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col justify-center">
                <div class="flex justify-between items-center mb-2 text-sm font-bold">
                    <span>${cat.title}</span>
                    <span class="${pcent===100 ? 'text-emerald-500' : 'text-indigo-500'}">${pcent}%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div class="${pcent===100 ? 'bg-emerald-500' : 'bg-indigo-500'} h-1.5 rounded-full" style="width: ${pcent}%"></div>
                </div>
            </div>
        `;
    });

    let overallPcent = Math.round((done / total) * 100);
    
    let maturityName = "Level 1";
    let maturityBar = "20%";
    let summaryText = "";
    let barColor = "from-indigo-500 to-purple-600";
    
    if (overallPcent >= 90) {
        maturityName = "Level 5 (Optimized)"; maturityBar = "100%";
        barColor = "from-emerald-400 to-emerald-600";
        summaryText = `Outstanding compliance readiness. At ${overallPcent}% completion, the organization's architecture is highly robust. Core configurations across Discovery, Classification, and DLP are fully established.`;
    } else if (overallPcent >= 70) {
        maturityName = "Level 4 (Advanced)"; maturityBar = "80%";
        barColor = "from-blue-400 to-indigo-600";
        summaryText = `Strong progress shown. Standing at ${overallPcent}% complete, the security posture is Advanced. Most critical workflows are integrated. Ensure remaining high-priority gaps are closed.`;
    } else if (overallPcent >= 40) {
        maturityName = "Level 3 (Proactive)"; maturityBar = "60%";
        summaryText = `The rollout is actively taking shape. At ${overallPcent}% completion, foundational capabilities are transitioning into enforcement phases.`;
    } else if (overallPcent >= 15) {
        maturityName = "Level 2 (Developing)"; maturityBar = "40%";
        barColor = "from-yellow-400 to-orange-500";
        summaryText = `Early deployment phase. With ${overallPcent}% complete, the focus remains heavily on Data Discovery. Acceleration on Information Protection is advised.`;
    } else {
        barColor = "from-red-400 to-rose-600";
        summaryText = `Deployment is in the nascent stage (${overallPcent}% complete). The immediate priority is defining sensitive information types and initiating data landscape scanning.`;
    }

    document.getElementById('report-maturity').textContent = maturityName;
    const matBar = document.getElementById('report-maturity-bar');
    matBar.style.width = maturityBar;
    matBar.className = `h-full bg-gradient-to-r w-1/5 shadow-sm transition-all duration-1000 ${barColor}`;

    document.getElementById('report-summary-text').textContent = summaryText;

    const gapsDiv = document.getElementById('report-gaps');
    if (gaps.length === 0) {
        gapsDiv.innerHTML = '<li class="flex items-start gap-3"><i class="ph-fill ph-check-circle text-emerald-500 mt-0.5 text-lg"></i> <span class="font-medium text-emerald-700 dark:text-emerald-400">Zero critical blockers detected. Excellent condition.</span></li>';
    } else {
        gapsDiv.innerHTML = gaps.slice(0, 5).map(g => `<li class="flex items-start gap-3"><i class="ph-fill ph-warning-circle text-red-500 mt-0.5 text-lg"></i> <span>${g}</span></li>`).join('');
        if(gaps.length > 5) gapsDiv.innerHTML += `<li class="flex items-start gap-3 pl-7 text-xs italic text-[color:var(--text-muted)]">+ ${gaps.length - 5} additional items...</li>`;
    }

    const recsDiv = document.getElementById('report-recommendations');
    if (recs.length === 0) {
        recsDiv.innerHTML = '<li class="flex items-start gap-3"><i class="ph-fill ph-check-circle text-emerald-500 mt-0.5 text-lg"></i> <span class="font-medium text-emerald-700 dark:text-emerald-400">System is optimized. Proceed to maintenance and periodic reviews.</span></li>';
    } else {
        recsDiv.innerHTML = recs.slice(0, 5).map(r => `<li class="flex items-start gap-3"><i class="ph-fill ph-arrow-circle-right text-emerald-500 mt-0.5 text-lg"></i> <span>${r}</span></li>`).join('');
    }

    document.getElementById('report-category-breakdown').innerHTML = breakdownHtml;
}

// --- Export to PDF ---
function exportPDF() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        setTimeout(() => { performExport(true); }, 150);
    } else {
        performExport(false);
    }
}

function performExport(wasDark) {
    const element = document.getElementById('report-print-area');
    const opt = {
        margin:       [0.5, 0.5, 0.5, 0.5],
        filename:     'Purview_Assessment_Report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    const btn = document.querySelector('#sec-report .saas-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-spinner-gap animate-spin text-lg"></i> Exporting...';
    btn.disabled = true;

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        if (wasDark) {
            document.documentElement.classList.add('dark');
        }
    });
}

// --- Builder Wizard Logic ---
const builderQuestions = [
    {
        id: "industry",
        text: "What is your primary industry?",
        options: [
            { id: "financial", label: "Financial Services (Banking, SEC, PCI-DSS)" },
            { id: "healthcare", label: "Healthcare (Hospital, HIPAA, HITECH)" },
            { id: "government", label: "Government / Public Sector" },
            { id: "other", label: "Other" }
        ]
    },
    {
        id: "discovery",
        text: "Which data sources will you connect to Microsoft Purview?",
        options: [
            { id: "m365", label: "Microsoft 365 (Exchange, SharePoint, Teams)" },
            { id: "azure", label: "Azure Data Sources" },
            { id: "onprem", label: "On-premises Data" },
            { id: "multicloud", label: "Multi-cloud (AWS, GCP)" }
        ]
    },
    {
        id: "classification",
        text: "How do you plan to classify your sensitive data?",
        options: [
            { id: "manual", label: "Manual labeling by users" },
            { id: "auto", label: "Automatic labeling (Requires E5)" },
            { id: "edm", label: "Exact Data Match with Databases (Requires E5)" }
        ]
    },
    {
        id: "dlp",
        text: "Which channels should Data Loss Prevention (DLP) cover?",
        options: [
            { id: "email", label: "Email & SharePoint" },
            { id: "endpoint", label: "Windows/macOS Endpoint Devices (Requires E5)" },
            { id: "teams", label: "Microsoft Teams Chat & Channels" },
            { id: "non_ms", label: "Non-Microsoft cloud apps like Box (Requires E5)" }
        ]
    },
    {
        id: "insider_risk",
        text: "Do you need to monitor risky user behavior?",
        options: [
            { id: "yes_irm", label: "Yes, Insider Risk Management (Requires E5)" },
            { id: "yes_comm", label: "Yes, Communication Compliance (Requires E5)" },
            { id: "no", label: "No, standard audit logs are sufficient" }
        ]
    },
    {
        id: "ediscovery",
        text: "What are your requirements for legal holds and eDiscovery?",
        options: [
            { id: "standard", label: "Standard eDiscovery (Manual)" },
            { id: "premium", label: "Premium eDiscovery with AI Review (Requires E5)" }
        ]
    }
];

let builderStep = 0;
let builderAnswers = {};
let currentSelections = [];

function initBuilder() {
    const container = document.getElementById('builder-content');
    if (builderStep < builderQuestions.length) {
        let q = builderQuestions[builderStep];
        let prog = ((builderStep) / (builderQuestions.length + 1)) * 100;
        document.getElementById('builder-progress').style.width = Math.max(prog, 5) + '%';
        
        let html = `
            <div class="mb-2">
                <span class="text-xs font-extrabold text-purple-500 dark:text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-1 rounded">Step ${builderStep + 1} of ${builderQuestions.length}</span>
                <h3 class="text-xl md:text-2xl font-bold mt-4 mb-2 text-slate-800 dark:text-white">${q.text}</h3>
                <p class="text-[color:var(--text-muted)] text-sm mb-6">Select all that apply for your organization's scope.</p>
            </div>
            <div class="space-y-3">
        `;
        
        q.options.forEach(opt => {
            html += `
                <div class="p-4 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer bg-white/50 dark:bg-slate-800/50 transition-all flex items-center gap-4 group" onclick="selectBuilderOption('${opt.id}')">
                    <div class="w-6 h-6 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center builder-opt-box transition-colors" id="box-${opt.id}"></div>
                    <span class="font-medium text-slate-700 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">${opt.label}</span>
                </div>
            `;
        });
        
        html += `</div>
            <div class="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <button class="secondary-btn px-6 py-2.5 text-sm font-semibold" onclick="finishBuilderStep(true)">Skip to Defaults</button>
                <button class="saas-btn px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20" onclick="finishBuilderStep(false)">Next Step <i class="ph-bold ph-arrow-right inline-block ml-1"></i></button>
            </div>
        `;
        container.innerHTML = html;
        currentSelections = []; // reset for this step
    } else {
        generateImplementationPlan();
    }
}

function selectBuilderOption(optId) {
    const box = document.getElementById('box-' + optId);
    let idx = currentSelections.indexOf(optId);
    if(idx > -1) {
        currentSelections.splice(idx, 1);
        box.innerHTML = '';
        box.classList.remove('bg-purple-500', 'border-purple-500', 'dark:bg-purple-500', 'dark:border-purple-500');
    } else {
        currentSelections.push(optId);
        box.innerHTML = '<i class="ph-bold ph-check text-white text-sm"></i>';
        box.classList.add('bg-purple-500', 'border-purple-500', 'dark:bg-purple-500', 'dark:border-purple-500');
    }
}

function finishBuilderStep(skip = false) {
    let q = builderQuestions[builderStep];
    if(skip) {
        builderAnswers[q.id] = ["default"];
    } else {
        if(currentSelections.length === 0) currentSelections.push("default");
        builderAnswers[q.id] = [...currentSelections];
    }
    builderStep++;
    initBuilder();
}

function resetBuilder() {
    builderStep = 0;
    builderAnswers = {};
    currentSelections = [];
    initBuilder();
}

function generateImplementationPlan() {
    document.getElementById('builder-progress').style.width = '100%';
    const container = document.getElementById('builder-content');
    
    let generatedCount = 0;
    let needsE5 = false;
    let e5Reasons = [];
    window.latestGeneratedTasks = [];
    
    function addGTask(catId, taskObj) {
        let cat = appData.find(c => c.id === catId);
        if (!cat.items.find(i=>i.id === taskObj.id)) {
            cat.items.push(taskObj);
            window.latestGeneratedTasks.push({...taskObj, category: cat.title});
            generatedCount++;
        }
    }
    
    // Discovery
    if(builderAnswers['discovery']) {
        let ans = builderAnswers['discovery'];
        if(ans.includes('m365')) addGTask('discovery', { id: "b_d1", title: "Integrate M365 Data (Exchange, SPO, Teams)", status: "Done", priority: "High", notes: "Phase 1 - Effort: Low" });
        if(ans.includes('azure')) addGTask('discovery', { id: "b_d2", title: "Map Azure Data Sources using Purview Maps", status: "Done", priority: "Medium", notes: "Phase 2 - Effort: Medium" });
        if(ans.includes('onprem')) addGTask('discovery', { id: "b_d3", title: "Configure Integration Runtime for On-Premise", status: "Done", priority: "High", notes: "Phase 3 - Effort: High" });
        if(ans.includes('multicloud')) addGTask('discovery', { id: "b_d4", title: "Extend scanning to AWS/GCP buckets", status: "Done", priority: "Low", notes: "Phase 3 - Effort: High" });
    }
    
    // Classification
    if(builderAnswers['classification']) {
        let ans = builderAnswers['classification'];
        if(ans.includes('manual')) addGTask('classification', { id: "b_c1", title: "Deploy Sensitivity Labels for Manual use", status: "Done", priority: "High", notes: "Phase 1" });
        if(ans.includes('auto')) { addGTask('classification', { id: "b_c2", title: "Configure Auto-Labeling Rules", status: "Done", priority: "High", notes: "Phase 2 (Requires E5)" }); needsE5=true; e5Reasons.push("Auto-Labeling"); }
        if(ans.includes('edm')) { addGTask('classification', { id: "b_c3", title: "Implement Exact Data Match (EDM)", status: "Done", priority: "Medium", notes: "Phase 3 (Requires E5)" }); needsE5=true; e5Reasons.push("Exact Data Match"); }
    }
    
    // DLP
    if(builderAnswers['dlp']) {
        let ans = builderAnswers['dlp'];
        if(ans.includes('email')) addGTask('dlp', { id: "b_dlp1", title: "Exchange & SharePoint DLP Policies", status: "Done", priority: "High", notes: "Phase 1" });
        if(ans.includes('endpoint')) { addGTask('dlp', { id: "b_dlp2", title: "Onboard devices to Endpoint DLP", status: "Done", priority: "High", notes: "Phase 2 (Requires E5)" }); needsE5=true; e5Reasons.push("Endpoint DLP"); }
        if(ans.includes('teams')) addGTask('dlp', { id: "b_dlp3", title: "Teams Chat / Channel Blocking", status: "Done", priority: "Medium", notes: "Phase 1" });
        if(ans.includes('non_ms')) { addGTask('dlp', { id: "b_dlp4", title: "DLP for Cloud Apps (MCAS)", status: "Done", priority: "Medium", notes: "Phase 3 (Requires E5)" }); needsE5=true; e5Reasons.push("DLP for Cloud Apps"); }
    }
    
    // Insider Risk
    if(builderAnswers['insider_risk']) {
        let ans = builderAnswers['insider_risk'];
        if(ans.includes('yes_irm')) { addGTask('insider_risk', { id: "b_ir1", title: "Set up Insider Risk Management Policies", status: "Done", priority: "High", notes: "Phase 2 (Requires E5)" }); needsE5=true; e5Reasons.push("Insider Risk Management"); }
        if(ans.includes('yes_comm')) { addGTask('insider_risk', { id: "b_ir2", title: "Configure Communication Compliance", status: "Done", priority: "Medium", notes: "Phase 2 (Requires E5)" }); needsE5=true; e5Reasons.push("Communication Compliance"); }
    }
    
    // Industry rules
    if(builderAnswers['industry']) {
        let ans = builderAnswers['industry'];
        if(ans.includes('financial')) {
            addGTask('dlp', { id: "b_ind1", title: "Configure SEC & PCI-DSS DLP Policies", status: "Not Started", priority: "High", license: "E3", powershell: "New-DlpCompliancePolicy -Name 'Financial Regulatory' -Regulatory PCI,SEC", kql: "AuditLogs | where Operation == 'New-DlpCompliancePolicy'", notes: "Financial Industry Mandate" });
            addGTask('classification', { id: "b_ind2", title: "Enable Financial Sensitive Info Types (SIT)", status: "Not Started", priority: "High", license: "E3", powershell: "Get-DlpSensitiveInformationType | Where Name -match 'Credit Card|ABA'", kql: "", notes: "Financial Industry Mandate" });
        }
        if(ans.includes('healthcare')) {
            addGTask('dlp', { id: "b_ind3", title: "Configure HIPAA/HITECH DLP Policies", status: "Not Started", priority: "High", license: "E3", powershell: "New-DlpCompliancePolicy -Name 'Healthcare Regulatory' -Regulatory HIPAA", kql: "", notes: "Healthcare Mandate" });
        }
    }

    // eDiscovery
    if(builderAnswers['ediscovery']) {
        let ans = builderAnswers['ediscovery'];
        if(ans.includes('premium')) { addGTask('ediscovery', { id: "b_ed1", title: "Enable Premium eDiscovery capabilities", status: "Done", priority: "Medium", license: "E5", notes: "Phase 3 (Requires E5)" }); needsE5=true; e5Reasons.push("Premium eDiscovery"); }
    }

    localStorage.setItem('purview_enrolled', 'true');
    saveData();
    renderChecklist();
    
    const licenseBox = needsE5 
        ? `<div class="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5 mb-6 text-left">
            <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2"><i class="ph-fill ph-microsoft-logo"></i> License Recommendation: Microsoft 365 E5</h4>
            <p class="text-sm text-[color:var(--text-muted)] mb-3">Based on your answers, you require E5 or the E5 Compliance Add-on for the following features:</p>
            <ul class="list-disc list-inside text-sm font-semibold text-slate-800 dark:text-slate-200">
                ${e5Reasons.map(r => `<li>${r}</li>`).join('')}
            </ul>
           </div>`
        : `<div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 mb-6 text-left">
            <h4 class="font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2"><i class="ph-fill ph-check-circle text-xl"></i> License Recommendation: Microsoft 365 E3</h4>
            <p class="text-sm text-[color:var(--text-muted)]">Your selected requirements align with the foundational compliance features included natively in Microsoft 365 E3.</p>
           </div>`;

    let tableHtml = "";
    if (window.latestGeneratedTasks.length > 0) {
        tableHtml = `
            <div class="overflow-x-auto mt-4 mb-2 bg-white/50 dark:bg-slate-800/10 rounded-xl border border-slate-200 dark:border-slate-700 max-h-52 overflow-y-auto w-full text-left shadow-sm">
                <table class="w-full text-sm">
                    <thead class="bg-indigo-50/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 sticky top-0 z-10">
                        <tr>
                            <th class="px-3 py-2.5 font-bold border-b border-slate-200 dark:border-slate-700">Category</th>
                            <th class="px-3 py-2.5 font-bold border-b border-slate-200 dark:border-slate-700">Generated Task Name</th>
                            <th class="px-3 py-2.5 font-bold border-b border-slate-200 dark:border-slate-700">Priority</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 dark:divide-slate-700/50">
                        ${window.latestGeneratedTasks.map(t => `
                        <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                            <td class="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 align-top">${t.category.split(' ')[1] || t.category.split(' ')[0]}</td>
                            <td class="px-3 py-2 font-medium text-slate-700 dark:text-slate-300 align-top">${t.title}</td>
                            <td class="px-3 py-2 align-top"><span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${t.priority==='High'?'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400':'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'}">${t.priority}</span></td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`;
    }

    container.innerHTML = `
        <div class="text-center py-6 space-y-4 px-4 fade-in">
            <div class="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-inner">
                <i class="ph-fill ph-check-circle text-4xl text-emerald-500"></i>
            </div>
            <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">Implementation Plan Generated!</h3>
            <p class="text-[color:var(--text-muted)] text-sm mb-6">We successfully built your plan and directly injected <strong>${generatedCount} personalized tasks</strong> into your checklist.</p>
            
            ${licenseBox}
            
            ${tableHtml}
            
            <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="exportTasksToCSV()" class="secondary-btn px-6 py-3 font-semibold text-sm w-full sm:w-auto flex items-center justify-center gap-2 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-500 transition-all rounded-xl shadow-sm">
                    <i class="ph-bold ph-microsoft-excel-logo text-lg text-emerald-500"></i> Export to Excel (CSV)
                </button>
                <button onclick="switchTab('checklist')" class="saas-btn px-8 py-3 font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl shadow-purple-500/20 w-full sm:w-auto flex items-center justify-center">
                    View Interactive Checklist <i class="ph-bold ph-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    `;
}

function exportTasksToCSV() {
    let tasks = window.latestGeneratedTasks || [];
    if(tasks.length === 0) return alert("No new tasks were generated to export.");
    
    let csvContent = "\uFEFFCategory,Task Name,Status,Priority,Phase/Effort\n";
    
    tasks.forEach(t => {
        let title = `"${t.title.replace(/"/g, '""')}"`;
        let notes = `"${t.notes.replace(/"/g, '""')}"`;
        let cat = `"${t.category.replace(/"/g, '""')}"`;
        csvContent += `${cat},${title},${t.status},${t.priority},${notes}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Purview_Generated_Tasks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

// --- Persona & License ---
function updatePersona() {
    currentPersona = document.getElementById('persona-selector').value;
    
    // Adjust dashboard layout based on persona
    const chartsRow = document.getElementById('dashboard-charts-row');
    
    if (currentPersona === 'Executive') {
        if(chartsRow) chartsRow.classList.remove('hidden');
    } else if (currentPersona === 'Operator') {
        if(chartsRow) chartsRow.classList.add('hidden');
    } else {
        if(chartsRow) chartsRow.classList.remove('hidden');
    }

    renderChecklist();
}

function setLicense(lic) {
    currentLicense = lic;
    document.getElementById('btn-lic-e3').classList.toggle('bg-white', lic === 'E3');
    document.getElementById('btn-lic-e3').classList.toggle('shadow-sm', lic === 'E3');
    document.getElementById('btn-lic-e3').classList.toggle('dark:bg-slate-600', lic === 'E3');
    
    document.getElementById('btn-lic-e5').classList.toggle('bg-white', lic === 'E5');
    document.getElementById('btn-lic-e5').classList.toggle('shadow-sm', lic === 'E5');
    document.getElementById('btn-lic-e5').classList.toggle('dark:bg-slate-600', lic === 'E5');
    
    renderChecklist();
}

// --- Quick Actions ---
function showSnippets(psB64, kqlB64) {
    const ps = atob(psB64) || "# No PowerShell snippet available";
    const kql = atob(kqlB64) || "// No KQL query available";
    
    document.getElementById('ps-snippet').textContent = ps;
    document.getElementById('kql-snippet').textContent = kql;
    
    const modal = document.getElementById('quick-action-modal');
    const content = document.getElementById('quick-action-content');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
    }, 10);
}

function closeQuickAction() {
    const modal = document.getElementById('quick-action-modal');
    const content = document.getElementById('quick-action-content');
    
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}

// --- Export to PM ---
function exportToProjectManagement() {
    // Generates a Jira / Planner compatible CSV of the entire checklist
    let csvContent = "\uFEFFSummary,Description,Status,Priority,Labels\n";
    
    appData.forEach(cat => {
        cat.items.forEach(item => {
            let title = `"[${cat.title}] ${item.title.replace(/"/g, '""')}"`;
            let desc = `"${item.notes.replace(/"/g, '""')}\nRequires: ${item.license}"`;
            let status = item.status === 'Done' ? 'Done' : (item.status === 'In Progress' ? 'In Progress' : 'To Do');
            let priority = item.priority === 'High' ? 'Highest' : (item.priority === 'Medium' ? 'Medium' : 'Low');
            let labels = `"${cat.module},Purview"`;
            
            csvContent += `${title},${desc},${status},${priority},${labels}\n`;
        });
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Purview_Jira_Import.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

const archData = {
    'm365': {
        title: 'Microsoft 365 Integration',
        desc: 'เชื่อมต่อโดยตรงกับ Workload หลักขององค์กร เช่น Exchange Online, SharePoint Online, OneDrive for Business และ Microsoft Teams ผ่าน API อัตโนมัติ',
        outcomes: [
            'สแกนและค้นหาข้อมูลสำคัญในอีเมลและไฟล์ของพนักงานทั้งหมด',
            'ควบคุมการแชร์ไฟล์ออกนอกองค์กรผ่าน Teams และ SharePoint',
            'รักษาความปลอดภัยข้อมูลโดยไม่ต้องติดตั้ง Agent เพิ่มเติม'
        ]
    },
    'cloud': {
        title: 'Multi-Cloud & SaaS',
        desc: 'ขยายขอบเขตการคุ้มครองข้อมูลไปยัง Azure SQL, Blob Storage, AWS S3 และแอปพลิเคชัน SaaS อื่นๆ (เช่น Box, Dropbox, Salesforce) ผ่าน Microsoft Defender for Cloud Apps',
        outcomes: [
            'มุมมองแบบ Unified View สำหรับข้อมูลที่กระจายตัวอยู่หลาย Cloud',
            'บังคับใช้นโยบายความปลอดภัยเดียวกันกับไฟล์ที่อยู่บน AWS และ GCP',
            'ตรวจจับการรั่วไหลของข้อมูลในแอปพลิเคชันบุคคลที่สาม'
        ]
    },
    'onprem': {
        title: 'On-Premises Data Sources',
        desc: 'ใช้ Microsoft Purview Information Protection Scanner เพื่อเชื่อมต่อกับ File Shares (SMB) และ SharePoint Server ภายใน Data Center ขององค์กร',
        outcomes: [
            'ขยายการจำแนกประเภทข้อมูล (Classification) ไปยัง Legacy Systems',
            'ระบุจุดเสี่ยงของข้อมูลสำคัญที่เก็บไว้ใน Server ภายในองค์กร',
            'เตรียมความพร้อมในการย้ายข้อมูลขึ้น Cloud อย่างปลอดภัย'
        ]
    },
    'governance': {
        title: 'Unified Data Governance',
        desc: 'หัวใจสำคัญคือ Data Map ที่ทำการรวบรวม Metadata และ Data Catalog ที่ช่วยให้ผู้ใช้งานสามารถค้นหาและทำความเข้าใจความหมายของข้อมูลผ่าน Business Glossary',
        outcomes: [
            'สร้างแผนที่ความสัมพันธ์ของข้อมูล (Data Lineage) ทั้งองค์กร',
            'ลดเวลาที่ใช้ในการค้นหาข้อมูลสำหรับทีม Data Scientist และ Analyst',
            'ตรวจสอบสุขภาพของข้อมูล (Data Estate Insights) ได้แบบ Real-time'
        ]
    },
    'protection': {
        title: 'Information Protection & DLP',
        desc: 'ใช้ AI และ Machine Learning ในการจำแนกประเภทข้อมูล (Sensitivity Labels) และบังคับใช้นโยบายป้องกันการรั่วไหล (DLP) ในทุกช่องทาง',
        outcomes: [
            'ติดป้ายระดับความลับให้กับไฟล์โดยอัตโนมัติ (Auto-labeling)',
            'ป้องกันพนักงานส่งข้อมูลบัตรเครดิตหรือข้อมูลส่วนบุคคลออกนอกบริษัท',
            'ควบคุมการ Print หรือ Copy ข้อมูลสำคัญลงใน USB'
        ]
    },
    'insider': {
        title: 'Insider Risk Management',
        desc: 'วิเคราะห์พฤติกรรมผู้ใช้งานที่มีความเสี่ยง เช่น การดาวน์โหลดไฟล์ปริมาณมากก่อนลาออก หรือการพยายามเข้าถึงข้อมูลที่ไม่มีสิทธิ์',
        outcomes: [
            'ตรวจจับภัยคุกคามจากภายใน (Insider Threats) ก่อนเกิดความเสียหาย',
            'ลดขั้นตอนในการสืบสวนด้วยหลักฐานดิจิทัลที่ครบถ้วน',
            'ปกป้องทรัพย์สินทางปัญญา (IP) ของบริษัทจากการจารกรรม'
        ]
    },
    'compliance': {
        title: 'eDiscovery & Audit',
        desc: 'กระบวนการค้นหาข้อมูลทางกฎหมายที่มีประสิทธิภาพสูง และการจัดการวงจรชีวิตข้อมูล (Lifecycle Management) ผ่านการตั้งค่า Retention Policies',
        outcomes: [
            'ค้นหาและ Hold ข้อมูลเพื่อใช้ในการฟ้องร้องได้รวดเร็วกว่าเดิม 10 เท่า',
            'ทำความสะอาดข้อมูลที่หมดความจำเป็น (Data Minimization)',
            'รองรับการตรวจสอบตามมาตรฐานสากล (Compliance Audit)'
        ]
    },
    'sentinel': {
        title: 'Microsoft Sentinel Integration',
        desc: 'ส่ง Alert จาก Purview ไปยัง SIEM ขององค์กร เพื่อทำการ Correlate กับเหตุการณ์ความปลอดภัยอื่นๆ และทำ Automation (SOAR)',
        outcomes: [
            'มุมมองความปลอดภัยแบบ 360 องศา (SIEM + Compliance)',
            'ตอบสนองต่อเหตุการณ์รั่วไหลได้โดยอัตโนมัติผ่าน Playbooks',
            'เก็บ Log ระยะยาวสำหรับการตรวจสอบย้อนหลังทางนิติวิทยาศาสตร์'
        ]
    },
    'defender': {
        title: 'Defender XDR Integration',
        desc: 'การบังคับใช้นโยบายที่ระดับ Endpoint (Windows/macOS) และการเชื่อมต่อกับ Cloud Apps เพื่อหยุดยั้งการรั่วไหลในระดับ Device',
        outcomes: [
            'ป้องกันการหลุดของข้อมูลผ่าน Browser หรือแอปพลิเคชันบนเครื่อง',
            'แยกแยะไฟล์ที่ติดป้ายความลับ (Label) ได้ที่ระดับ OS',
            'ประสานงานกับ Defender for Endpoint เพื่อบล็อกเครื่องที่มีความเสี่ยง'
        ]
    }
};

function showArchDetail(key) {
    const data = archData[key];
    if (!data) return;

    const modal = document.getElementById('arch-detail-modal');
    const content = document.getElementById('arch-detail-content');
    
    document.getElementById('arch-modal-title').innerHTML = `<i class="ph-fill ph-blueprint"></i> ${data.title}`;
    document.getElementById('arch-modal-desc').textContent = data.desc;
    
    const outcomesList = document.getElementById('arch-modal-outcomes');
    outcomesList.innerHTML = data.outcomes.map(o => `<li class="flex items-start gap-3"><i class="ph-bold ph-check-circle text-emerald-500 mt-1"></i> ${o}</li>`).join('');

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
}

function closeArchModal() {
    const modal = document.getElementById('arch-detail-modal');
    const content = document.getElementById('arch-detail-content');
    
    modal.classList.remove('opacity-100');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function downloadTemplate(filename) {
    let content = "";
    let mimeType = "text/plain";

    if (filename === 'financial-dlp.json') {
        content = JSON.stringify({
            "name": "Financial Sector Regulatory DLP",
            "description": "Baseline DLP policy for PCI-DSS and SEC regulations.",
            "rules": [
                {
                    "name": "Detect Credit Cards",
                    "conditions": { "contains": ["Credit Card Number", "U.S. Bank Account Number"] },
                    "actions": { "blockAccess": true, "notifyUsers": true }
                }
            ]
        }, null, 4);
        mimeType = "application/json";
    } else if (filename === 'sensitivity-labels.json') {
        content = JSON.stringify({
            "labels": [
                { "name": "Public", "tooltip": "Business data meant for public consumption." },
                { "name": "General", "tooltip": "Internal business data." },
                { "name": "Confidential", "tooltip": "Sensitive data. Requires protection." },
                { "name": "Highly Confidential", "tooltip": "Extremely sensitive data. Strict access control." }
            ]
        }, null, 4);
        mimeType = "application/json";
    } else if (filename === 'priority-users.csv') {
        content = "\uFEFFEmail,PriorityLevel\nexecutive@domain.com,High\nfinance_lead@domain.com,High\nadmin@domain.com,Critical";
        mimeType = "text/csv;charset=utf-8;";
    } else {
        alert("Template not found.");
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

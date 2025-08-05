// --- SCRIPT FOR INTERACTIVITY ---

// Function to show/hide main content sections based on nav clicks
function showSection(sectionId) {
    // Hide all main sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Update active state for nav buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(`'${sectionId}'`)) {
            button.classList.add('active');
        }
    });
}

// Function to handle tabs within the "Journey" section
function showTab(tabId) {
    // Hide all tab panes within the journey section
    document.querySelectorAll('#journey .tab-pane').forEach(pane => {
        pane.classList.add('hidden');
    });

    // Show the target tab pane
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.remove('hidden');
    }

    // Update active state for tab buttons
    document.querySelectorAll('#journey .tab-button').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(`'${tabId}'`)) {
            button.classList.add('active');
        }
    });
}

// --- SCRIPT FOR ASSESSMENT CHART ---
const displayLabels = [
    'Part A: Project Proposal/Plan & Defense (30%)',
    'Part B: Group Presentation (10%)',
    'Part C: Employability Portfolio (10%)',
    'Part D: Individual Journal of Agile Development (40%)',
    'Part D: Class Test (10%)'
];

const assessmentData = {
    labels: ['Part A', 'Part B', 'Part C', 'Part D.1', 'Part D.2'], // Internal, unique labels
    datasets: [{
        label: 'Assessment Weighting',
        data: [30, 10, 10, 40, 10],
        backgroundColor: ['#E07A5F', '#3D405B', '#81B29A', '#F2CC8F', '#D4A373'],
        hoverOffset: 4
    }]
};

const config = {
    type: 'doughnut',
    data: assessmentData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    generateLabels: function(chart) {
                        const originalLabels = chart.data.labels;
                        const data = chart.data.datasets[0].data;
                        return originalLabels.map((label, i) => ({
                            text: `${displayLabels[i]}`, // Use the detailed display labels
                            fillStyle: chart.data.datasets[0].backgroundColor[i],
                            hidden: isNaN(data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                            lineCap: 'butt',
                            lineDash: [],
                            lineDashOffset: 0,
                            lineJoin: 'miter',
                            lineWidth: 1,
                            strokeStyle: chart.data.datasets[0].backgroundColor[i],
                            pointStyle: 'circle',
                            rotation: 0,
                            textAlign: 'left',
                            datasetIndex: 0,
                            index: i
                        }));
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return ` ${context.parsed}%`;
                    }
                }
            },
            title: {
                display: false
            }
        }
    }
};

// Render the chart
window.onload = () => {
    const ctx = document.getElementById('assessmentChart').getContext('2d');
    new Chart(ctx, config);
};
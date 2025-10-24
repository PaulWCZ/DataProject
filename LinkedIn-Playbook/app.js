// Global application state
const app = {
    charts: {},
    animatedElements: new Set(),
    
    // Data from the project
    data: {
        formatPerformance: [
            { name: 'Repost', value: 160.8 },
            { name: 'Video', value: 137.4 },
            { name: 'Text', value: 136.0 },
            { name: 'Image', value: 93.0 },
            { name: 'Document', value: 77.1 },
            { name: 'Article', value: 42.6 },
            { name: 'Poll', value: 27.5 }
        ],
        timingPerformance: [
            { segment: 'Evening', value: 114.4 },
            { segment: 'Night', value: 107.0 },
            { segment: 'Afternoon', value: 104.6 },
            { segment: 'Morning', value: 87.5 }
        ],
        featureImportance: [
            { name: 'followers_log', value: 46.4 },
            { name: 'industry_Computer Hardware', value: 7.2 },
            { name: 'hour_sin', value: 4.0 },
            { name: 'industry_Higher Education', value: 3.8 },
            { name: 'num_sentences', value: 3.8 },
            { name: 'industry_Broadcast Media', value: 3.4 },
            { name: 'hour_cos', value: 3.2 },
            { name: 'format_Repost', value: 2.8 },
            { name: 'content_richness', value: 2.4 },
            { name: 'format_Text', value: 2.2 }
        ]
    }
};

// Chart colors for consistency
const chartColors = {
    primary: '#1FB8CD',
    secondary: '#FFC185',
    tertiary: '#B4413C',
    quaternary: '#ECEBD5',
    quinary: '#5D878F',
    senary: '#DB4545',
    septenary: '#D2BA4C',
    octonary: '#964325',
    nonary: '#944454',
    denary: '#13343B'
};

const colorPalette = [
    chartColors.primary,
    chartColors.secondary,
    chartColors.tertiary,
    chartColors.quaternary,
    chartColors.quinary,
    chartColors.senary,
    chartColors.septenary,
    chartColors.octonary,
    chartColors.nonary,
    chartColors.denary
];

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupSmoothScrolling();
    setupTabNavigation();
    setupAnimations();
    setupCharts();
    animateCounters();
    setupIntersectionObserver();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Tab navigation functionality
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(`${tabName}-tab`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Initialize charts for the active tab
                setTimeout(() => {
                    initializeTabChart(tabName);
                }, 100);
            }
        });
    });
    
    // Initialize the first chart
    setTimeout(() => {
        initializeTabChart('format');
    }, 500);
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !app.animatedElements.has(entry.target)) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                app.animatedElements.add(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    document.querySelectorAll('.problem-card, .timeline-item, .advanced-card, .playbook-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Start animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    setTimeout(() => animateCounter(counter), 800);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    const hero = document.querySelector('.hero');
    if (hero) {
        heroObserver.observe(hero);
    }
}

// Setup general animations
function setupAnimations() {
    // Add hover effects to cards
    document.querySelectorAll('.stat-card, .problem-card, .insight-card, .time-card, .avoid-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize all charts
function setupCharts() {
    // Charts will be initialized when tabs are activated
}

// Initialize chart for specific tab
function initializeTabChart(tabName) {
    switch(tabName) {
        case 'format':
            createFormatChart();
            break;
        case 'timing':
            createTimingChart();
            break;
        case 'features':
            createFeaturesChart();
            break;
    }
}

// Create format performance chart
function createFormatChart() {
    const ctx = document.getElementById('formatChart');
    if (!ctx || app.charts.formatChart) return;
    
    app.charts.formatChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: app.data.formatPerformance.map(item => item.name),
            datasets: [{
                label: 'Average Engagement',
                data: app.data.formatPerformance.map(item => item.value),
                backgroundColor: colorPalette.slice(0, app.data.formatPerformance.length),
                borderColor: colorPalette.slice(0, app.data.formatPerformance.length),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#cbd5e1',
                    borderColor: '#6366f1',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Engagement: ${context.parsed.y.toFixed(1)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                delay: (context) => {
                    return context.dataIndex * 100;
                },
                duration: 800,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Create timing analysis chart
function createTimingChart() {
    const ctx = document.getElementById('timingChart');
    if (!ctx || app.charts.timingChart) return;
    
    app.charts.timingChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: app.data.timingPerformance.map(item => item.segment),
            datasets: [{
                data: app.data.timingPerformance.map(item => item.value),
                backgroundColor: [
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.tertiary,
                    chartColors.quaternary
                ],
                borderColor: '#0f172a',
                borderWidth: 3,
                hoverBorderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#cbd5e1',
                        padding: 20,
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#cbd5e1',
                    borderColor: '#6366f1',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed.toFixed(1)} avg engagement`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1200,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Create feature importance chart
function createFeaturesChart() {
    const ctx = document.getElementById('featuresChart');
    if (!ctx || app.charts.featuresChart) return;
    
    app.charts.featuresChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: app.data.featureImportance.map(item => {
                // Shorten long feature names
                return item.name.length > 20 ? item.name.substring(0, 17) + '...' : item.name;
            }),
            datasets: [{
                label: 'Importance (%)',
                data: app.data.featureImportance.map(item => item.value),
                backgroundColor: app.data.featureImportance.map((item, index) => 
                    index === 0 ? chartColors.primary : colorPalette[index % colorPalette.length]
                ),
                borderColor: app.data.featureImportance.map((item, index) => 
                    index === 0 ? chartColors.primary : colorPalette[index % colorPalette.length]
                ),
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#cbd5e1',
                    borderColor: '#6366f1',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        title: function(context) {
                            // Show full feature name in tooltip
                            return app.data.featureImportance[context[0].dataIndex].name;
                        },
                        label: function(context) {
                            return `Importance: ${context.parsed.x.toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                delay: (context) => {
                    return context.dataIndex * 50;
                },
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = currentScrollY;
});

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize charts after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeTabChart('format');
    }, 1000);
});

// Handle resize events
window.addEventListener('resize', function() {
    // Resize charts if they exist
    Object.values(app.charts).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });
});

// Error handling for charts
window.addEventListener('error', function(e) {
    console.error('Chart error:', e);
});
// Page content storage
const pageContent = {
    home: `
        <div id="home" class="page active">
            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-text">
                            <h1>Professional Energy Management <span class="highlight">Made Simple</span></h1>
                            <p>Monitor, control, and optimize your facility's energy consumption with our enterprise-grade IoT platform. Real-time insights, automated controls, and comprehensive analytics.</p>
                            
                            <div class="hero-stats">
                                <div class="stat">
                                    <span class="stat-value" id="liveDevices">1,247</span>
                                    <span class="stat-label">Connected Devices</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value" id="energySaved">34%</span>
                                    <span class="stat-label">Energy Reduction</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value" id="monthlySavings">₹2.4M</span>
                                    <span class="stat-label">Monthly Savings</span>
                                </div>
                            </div>

                            <div class="hero-cta">
                                <a href="#" class="btn btn-primary btn-large" onclick="startTrial()">Start Free Trial</a>
                                <a href="#" class="btn btn-outline btn-large" onclick="requestDemo()">Request Demo</a>
                            </div>
                        </div>

                        <div class="dashboard-mockup">
                            <div class="mockup-header">
                                <div class="mockup-title">Energy Dashboard</div>
                                <div class="status-badge">
                                    <div class="status-dot"></div>
                                    Live Data
                                </div>
                            </div>
                            
                            <div class="chart-area">
                                <canvas id="heroChart" width="400" height="200"></canvas>
                            </div>
                            
                            <div class="devices-grid">
                                <div class="device-item">
                                    <div class="device-icon">🏢</div>
                                    <div class="device-name">Main Office</div>
                                    <div class="device-status status-on">Active</div>
                                </div>
                                <div class="device-item">
                                    <div class="device-icon">💡</div>
                                    <div class="device-name">Conference</div>
                                    <div class="device-status status-auto">Auto</div>
                                </div>
                                <div class="device-item">
                                    <div class="device-icon">❄️</div>
                                    <div class="device-name">HVAC Zone 1</div>
                                    <div class="device-status status-on">Active</div>
                                </div>
                                <div class="device-item">
                                    <div class="device-icon">🚪</div>
                                    <div class="device-name">Corridor</div>
                                    <div class="device-status status-off">Standby</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `,
    
    features: `
        <div id="features" class="page">
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">Features</h1>
                    <p class="page-subtitle">Comprehensive platform with advanced monitoring, intelligent automation, and powerful analytics for modern businesses.</p>
                </div>
            </div>
            
            <div class="page-content">
                <div class="container">
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 3v18l10-8-10-8zM11 21V3L1 11l10 10z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">Real-Time Monitoring</h3>
                            <p class="feature-description">Monitor energy consumption across all devices with millisecond precision. Get instant alerts and automated reports delivered to your dashboard.</p>
                            <a href="#" class="feature-link">Explore Monitoring →</a>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">Smart Automation</h3>
                            <p class="feature-description">AI-powered automation optimizes energy usage based on occupancy patterns, weather data, and business schedules for maximum efficiency.</p>
                            <a href="#" class="feature-link">View Automation →</a>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">Advanced Analytics</h3>
                            <p class="feature-description">Comprehensive analytics with custom dashboards, trend analysis, cost forecasting, and actionable insights to drive decision-making.</p>
                            <a href="#" class="feature-link">See Analytics →</a>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">Mobile Applications</h3>
                            <p class="feature-description">Native iOS and Android apps with offline capabilities, push notifications, and intuitive controls for managing your energy systems on-the-go.</p>
                            <a href="#" class="feature-link">Download Apps →</a>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">Enterprise API</h3>
                            <p class="feature-description">RESTful API with comprehensive documentation, webhooks, OAuth2 authentication, and SDKs for seamless system integration.</p>
                            <a href="#" class="feature-link" onclick="showPage('api')">API Documentation →</a>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">Enterprise Security</h3>
                            <p class="feature-description">Bank-level security with end-to-end encryption, SOC 2 compliance, and enterprise-grade access controls.</p>
                            <a href="#" class="feature-link">Security Details →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    pricing: `
        <div id="pricing" class="page">
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">Pricing</h1>
                    <p class="page-subtitle">Choose the perfect plan for your business. Start free and scale as you grow.</p>
                </div>
            </div>
            
            <div class="page-content">
                <div class="container">
                    <div class="pricing-grid">
                        <div class="pricing-card">
                            <div class="pricing-title">Starter</div>
                            <div class="pricing-price">₹2,999</div>
                            <div class="pricing-period">per month</div>
                            <ul class="pricing-features">
                                <li>Up to 50 connected devices</li>
                                <li>Real-time monitoring</li>
                                <li>Basic automation rules</li>
                                <li>Mobile app access</li>
                                <li>Email support</li>
                                <li>Standard analytics</li>
                            </ul>
                            <a href="#" class="btn btn-outline btn-large" onclick="selectPlan('starter')">Start Free Trial</a>
                        </div>

                        <div class="pricing-card featured">
                            <div class="pricing-badge">Most Popular</div>
                            <div class="pricing-title">Professional</div>
                            <div class="pricing-price">₹8,999</div>
                            <div class="pricing-period">per month</div>
                            <ul class="pricing-features">
                                <li>Up to 500 connected devices</li>
                                <li>Advanced monitoring & alerts</li>
                                <li>AI-powered automation</li>
                                <li>API access & webhooks</li>
                                <li>Priority support</li>
                                <li>Advanced analytics & reports</li>
                                <li>Custom dashboards</li>
                                <li>Energy forecasting</li>
                            </ul>
                            <a href="#" class="btn btn-primary btn-large" onclick="selectPlan('professional')">Start Free Trial</a>
                        </div>

                        <div class="pricing-card">
                            <div class="pricing-title">Enterprise</div>
                            <div class="pricing-price">Custom</div>
                            <div class="pricing-period">contact sales</div>
                            <ul class="pricing-features">
                                <li>Unlimited connected devices</li>
                                <li>White-label solutions</li>
                                <li>Custom integrations</li>
                                <li>Dedicated account manager</li>
                                <li>24/7 phone support</li>
                                <li>Custom analytics</li>
                                <li>SLA guarantees</li>
                                <li>On-premise deployment</li>
                            </ul>
                            <a href="#" class="btn btn-outline btn-large" onclick="contactSales()">Contact Sales</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    api: `
        <div id="api" class="page">
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">API Documentation</h1>
                    <p class="page-subtitle">Powerful REST API for seamless integration with your existing systems and workflows.</p>
                </div>
            </div>
            
            <div class="page-content">
                <div class="container">
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">RESTful API</h3>
                            <p class="feature-description">Clean, intuitive REST endpoints with comprehensive documentation and examples for quick integration.</p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">Real-time WebSockets</h3>
                            <p class="feature-description">Live data streaming with WebSocket connections for real-time monitoring and instant updates.</p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon-wrapper">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                                </svg>
                            </div>
                            <h3 class="feature-title">Secure Authentication</h3>
                            <p class="feature-description">OAuth2 and API key authentication with rate limiting and comprehensive security controls.</p>
                        </div>
                    </div>

                    <div class="api-demo">
                        <h3 style="color: #ffffff; margin-bottom: 16px;">Interactive API Demo</h3>
                        <p style="color: #cbd5e1; margin-bottom: 24px;">Try our API endpoints below to see live responses:</p>
                        
                        <div class="demo-controls">
                            <button class="demo-btn" onclick="testApiCall('devices')">GET /devices</button>
                            <button class="demo-btn" onclick="testApiCall('energy')">GET /energy/live</button>
                            <button class="demo-btn secondary" onclick="testApiCall('control')">POST /control</button>
                            <button class="demo-btn secondary" onclick="testApiCall('analytics')">GET /analytics</button>
                        </div>
                        
                        <div id="apiResponse">
{
  "message": "Click a button above to test our API endpoints",
  "status": "ready",
  "timestamp": "2025-07-26T15:30:00Z",
  "endpoints": [
    "/devices - Get connected devices",
    "/energy/live - Real-time energy data",
    "/control - Device control commands",
    "/analytics - Usage analytics"
  ]
}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    about: `
        <div id="about" class="page">
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">About Wattson</h1>
                    <p class="page-subtitle">We're building the future of intelligent energy management for businesses worldwide.</p>
                </div>
            </div>
            
            <div class="page-content">
                <div class="container">
                    <div style="max-width: 800px; margin: 0 auto 80px; text-align: center;">
                        <h2 style="font-size: 36px; font-weight: 700; color: var(--gray-900); margin-bottom: 24px;">Our Mission</h2>
                        <p style="font-size: 18px; color: var(--gray-600); line-height: 1.8;">
                            At Wattson, we believe that intelligent energy management is key to building a sustainable future. 
                            Our platform empowers businesses to reduce their environmental impact while saving costs through 
                            smart automation and data-driven insights.
                        </p>
                    </div>

                    <div class="team-grid">
                        <div class="team-card">
                            <div class="team-avatar">HM</div>
                            <div class="team-name">Hannah Mariam</div>
                            <div class="team-role">CEO & Co-founder</div>
                            <div class="team-bio">Hannah is a seasoned entrepreneur with a passion for sustainability.</div>
                        </div>

                        <div class="team-card">
                            <div class="team-avatar">CV</div>
                            <div class="team-name">Christine Veigas</div>
                            <div class="team-role">Product Specialist & Co-founder</div>
                            <div class="team-bio">Christine brings her expertise in IoT to help shape the future of Wattson.</div>
                        </div>

                        <div class="team-card">
                            <div class="team-avatar">ST</div>
                            <div class="team-name">Sharon Thomas</div>
                            <div class="team-role">Back end Developer & Co-founder</div>
                            <div class="team-bio">Sharon is a skilled developer with a passion for building scalable solutions.</div>
                        </div>
                    </div>

                    <div style="margin-top: 80px; text-align: center;">
                        <h2 style="font-size: 36px; font-weight: 700; color: var(--gray-900); margin-bottom: 24px;">Our Story</h2>
                        <div style="max-width: 800px; margin: 0 auto;">
                            <p style="font-size: 16px; color: var(--gray-600); line-height: 1.8; margin-bottom: 24px;">
                                Founded in 2025, Wattson emerged from a simple observation: businesses were wasting enormous amounts 
                                of energy due to lack of visibility and control over their systems. Our founders, having worked in 
                                energy and technology sectors, saw an opportunity to bridge this gap with intelligent IoT solutions.
                            </p>
                            <p style="font-size: 16px; color: var(--gray-600); line-height: 1.8;">
                                Today, we serve over 500+ businesses across India, helping them reduce energy consumption by an 
                                average of 34% while providing unprecedented visibility into their energy usage patterns. 
                                Our platform has processed over 50 billion data points and continues to grow rapidly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    contact: `
        <div id="contact" class="page">
            <div class="page-header">
                <div class="container">
                    <h1 class="page-title">Contact Us</h1>
                    <p class="page-subtitle">Get in touch with our team. We'd love to hear from you and help you get started.</p>
                </div>
            </div>
            
            <div class="page-content">
                <div class="container">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;">
                        <div>
                            <h3 style="font-size: 24px; font-weight: 600; color: var(--gray-900); margin-bottom: 24px;">Get Started Today</h3>
                            <p style="font-size: 16px; color: var(--gray-600); line-height: 1.6; margin-bottom: 32px;">
                                Ready to transform your energy management? Our team is here to help you get started with Wattson 
                                and answer any questions you might have.
                            </p>

                            <div style="margin-bottom: 32px;">
                                <h4 style="font-size: 16px; font-weight: 600; color: var(--gray-900); margin-bottom: 12px;">📧 Email</h4>
                                <p style="color: var(--gray-600);">contact@wattson.io</p>
                            </div>

                            <div style="margin-bottom: 32px;">
                                <h4 style="font-size: 16px; font-weight: 600; color: var(--gray-900); margin-bottom: 12px;">📞 Phone</h4>
                                <p style="color: var(--gray-600);">+91 80 4567 8900</p>
                            </div>

                            <div style="margin-bottom: 32px;">
                                <h4 style="font-size: 16px; font-weight: 600; color: var(--gray-900); margin-bottom: 12px;">🏢 Office</h4>
                                <p style="color: var(--gray-600);">
                                    WeWork Galaxy, 43, Residency Road<br>
                                    Bengaluru, Karnataka 560025<br>
                                    India
                                </p>
                            </div>

                            <div>
                                <h4 style="font-size: 16px; font-weight: 600; color: var(--gray-900); margin-bottom: 12px;">🕒 Business Hours</h4>
                                <p style="color: var(--gray-600);">
                                    Monday - Friday: 9:00 AM - 6:00 PM IST<br>
                                    Saturday: 10:00 AM - 2:00 PM IST
                                </p>
                            </div>
                        </div>

                        <div class="contact-form">
                            <h3 style="font-size: 24px; font-weight: 600; color: var(--gray-900); margin-bottom: 24px;">Send us a Message</h3>
                            
                            <form onsubmit="handleContactForm(event)">
                                <div class="form-group">
                                    <label class="form-label">Full Name *</label>
                                    <input type="text" class="form-input" required placeholder="Enter your full name">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Email Address *</label>
                                    <input type="email" class="form-input" required placeholder="Enter your email">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Company</label>
                                    <input type="text" class="form-input" placeholder="Enter your company name">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Phone Number</label>
                                    <input type="tel" class="form-input" placeholder="Enter your phone number">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">How can we help? *</label>
                                    <textarea class="form-input form-textarea" required placeholder="Tell us about your energy management needs..."></textarea>
                                </div>

                                <button type="submit" class="btn btn-primary btn-large" style="width: 100%;">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

// Page Navigation System
function showPage(pageId) {
    const container = document.getElementById('page-container');
    container.innerHTML = pageContent[pageId] || pageContent.home;
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find and activate current nav link
    const currentLink = Array.from(navLinks).find(link => 
        link.getAttribute('onclick') === `showPage('${pageId}')`
    );
    if (currentLink) {
        currentLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Initialize page-specific content
    if (pageId === 'home') {
        setTimeout(initHeroChart, 100);
    }
    
    // Re-initialize animations for new content
    initializeAnimations();
}

// API Demo Functions
async function testApiCall(endpoint) {
    const responseDiv = document.getElementById('apiResponse');
    if (!responseDiv) return;

    // Show loading state
    responseDiv.innerHTML = `
{
  "status": "loading",
  "message": "Fetching data from ${endpoint} endpoint...",
  "timestamp": "${new Date().toISOString()}"
}`;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mock responses based on endpoint
    let mockResponse;
    switch(endpoint) {
        case 'devices':
            mockResponse = {
                status: "success",
                timestamp: new Date().toISOString(),
                data: {
                    devices: [
                        {
                            id: "wattson-main-001",
                            name: "Main Office Floor 1",
                            type: "smart_controller",
                            status: "online",
                            energyUsage: 247.8,
                            efficiency: 92.3,
                            location: "Building A"
                        },
                        {
                            id: "wattson-conf-002",
                            name: "Conference Room A",
                            type: "lighting_controller",
                            status: "online",
                            energyUsage: 156.2,
                            efficiency: 88.7,
                            location: "Building A"
                        }
                    ],
                    totalDevices: 1247,
                    onlineDevices: 1245,
                    offlineDevices: 2
                }
            };
            break;
        case 'energy':
            mockResponse = {
                status: "success",
                timestamp: new Date().toISOString(),
                data: {
                    realTimeUsage: 2847.6,
                    unit: "watts",
                    trend: "decreasing",
                    efficiency: 94.2,
                    projectedSavings: {
                        daily: 847.2,
                        monthly: 25416.0,
                        currency: "INR"
                    },
                    breakdown: {
                        lighting: 35.2,
                        hvac: 42.8,
                        equipment: 22.0
                    }
                }
            };
            break;
        case 'control':
            mockResponse = {
                status: "success",
                timestamp: new Date().toISOString(),
                data: {
                    deviceId: "wattson-main-001",
                    action: "brightness_adjust",
                    previousValue: 80,
                    newValue: 65,
                    estimatedSavings: 15.6,
                    response: "Device control successful",
                    executionTime: "0.23s"
                }
            };
            break;
        case 'analytics':
            mockResponse = {
                status: "success",
                timestamp: new Date().toISOString(),
                data: {
                    period: "last_30_days",
                    totalConsumption: 45680.5,
                    averageDaily: 1522.7,
                    peakHour: "14:00",
                    efficiency: {
                        current: 92.4,
                        improvement: 5.2,
                        target: 95.0
                    },
                    costAnalysis: {
                        totalCost: 228402.5,
                        projectedSavings: 34567.8,
                        currency: "INR"
                    }
                }
            };
            break;
        default:
            mockResponse = {
                status: "error",
                message: "Unknown endpoint",
                timestamp: new Date().toISOString()
            };
    }

    // Format and display response
    responseDiv.innerHTML = JSON.stringify(mockResponse, null, 2)
        .replace(/"([^"]+)":/g, '<span class="code-key">"$1"</span>:')
        .replace(/": "([^"]+)"/g, '": <span class="code-string">"$1"</span>')
        .replace(/": ([0-9.]+)/g, '": <span class="code-number">$1</span>')
        .replace(/": (true|false)/g, '": <span class="code-boolean">$1</span>');
}

// Chart initialization
function initHeroChart() {
    const ctx = document.getElementById('heroChart');
    if (!ctx || ctx.chart) return;

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            datasets: [{
                label: 'Energy Usage (kW)',
                data: [120, 85, 180, 250, 320, 280, 150],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#2563eb',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                    ticks: { 
                        color: '#64748b', 
                        font: { size: 12 },
                        callback: function(value) {
                            return value + ' kW';
                        }
                    }
                },
                x: {
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                    ticks: { color: '#64748b', font: { size: 12 } }
                }
            },
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            }
        }
    });

    ctx.chart = chart;

    // More realistic chart updates
    setInterval(() => {
        if (document.getElementById('heroChart')) {
            const newData = chart.data.datasets[0].data.map((value, index) => {
                // Different patterns for different times of day
                let baseVariation = 20;
                if (index >= 2 && index <= 4) { // Business hours
                    baseVariation = 30;
                } else if (index <= 1 || index >= 5) { // Off hours
                    baseVariation = 15;
                }
                
                const change = (Math.random() * baseVariation * 2 - baseVariation);
                return Math.max(50, Math.min(400, value + change));
            });
            
            chart.data.datasets[0].data = newData;
            chart.update('none');
        }
    }, 2500);
}

// Live data simulation
function updateLiveStats() {
    const devices = document.getElementById('liveDevices');
    const energy = document.getElementById('energySaved');
    const savings = document.getElementById('monthlySavings');
    
    if (devices && document.getElementById('home')) {
        const currentDevices = parseInt(devices.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 7 - 3); // -3 to +3
        const newDevices = Math.max(1200, Math.min(1300, currentDevices + change));
        devices.textContent = newDevices.toLocaleString();
        
        // Add visual feedback for changes
        if (change !== 0) {
            devices.style.color = change > 0 ? 'var(--success)' : 'var(--warning)';
            setTimeout(() => {
                devices.style.color = 'var(--primary)';
            }, 1000);
        }
    }
    
    // Update energy savings percentage
    if (energy && document.getElementById('home')) {
        const currentEnergy = parseFloat(energy.textContent.replace('%', ''));
        const change = (Math.random() * 0.4 - 0.2); // -0.2 to +0.2
        const newEnergy = Math.max(30, Math.min(40, currentEnergy + change));
        energy.textContent = newEnergy.toFixed(1) + '%';
        
        // Visual feedback
        if (Math.abs(change) > 0.1) {
            energy.style.color = change > 0 ? 'var(--success)' : 'var(--warning)';
            setTimeout(() => {
                energy.style.color = 'var(--primary)';
            }, 1000);
        }
    }
    
    // Update monthly savings
    if (savings && document.getElementById('home')) {
        const match = savings.textContent.match(/[\d.]+/);
        if (match) {
            const currentSavings = parseFloat(match[0]);
            const change = (Math.random() * 0.06 - 0.03); // -0.03 to +0.03
            const newSavings = Math.max(2.0, Math.min(3.0, currentSavings + change));
            savings.textContent = `₹${newSavings.toFixed(1)}M`;
            
            // Visual feedback
            if (Math.abs(change) > 0.02) {
                savings.style.color = change > 0 ? 'var(--success)' : 'var(--warning)';
                setTimeout(() => {
                    savings.style.color = 'var(--primary)';
                }, 1000);
            }
        }
    }
}

// Device status simulation
function updateDeviceStatuses() {
    if (!document.getElementById('home')) return;
    
    const deviceItems = document.querySelectorAll('.device-item');
    deviceItems.forEach((device, index) => {
        const statusElement = device.querySelector('.device-status');
        if (Math.random() < 0.1) { // 10% chance to change status
            const statuses = ['Active', 'Auto', 'Standby'];
            const statusClasses = ['status-on', 'status-auto', 'status-off'];
            const currentStatus = statusElement.textContent;
            let newStatusIndex = Math.floor(Math.random() * statuses.length);
            
            // Ensure we don't pick the same status
            while (statuses[newStatusIndex] === currentStatus) {
                newStatusIndex = Math.floor(Math.random() * statuses.length);
            }
            
            statusElement.textContent = statuses[newStatusIndex];
            statusElement.className = `device-status ${statusClasses[newStatusIndex]}`;
            
            // Add brief animation
            device.style.transform = 'scale(1.05)';
            setTimeout(() => {
                device.style.transform = 'scale(1)';
            }, 300);
        }
    });
}

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'var(--success)' : type === 'warning' ? 'var(--warning)' : 'var(--primary)'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 14px;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Interactive functions
function startTrial() {
    showNotification('🚀 Starting your free 30-day trial! Check your email for setup instructions.', 'success');
}

function requestDemo() {
    showNotification('📅 Demo requested! Our team will contact you within 24 hours.', 'success');
}

function contactSales() {
    showPage('contact');
}

function selectPlan(plan) {
    showNotification(`✨ ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan selected! Redirecting to signup...`, 'success');
}

function showSignIn() {
    showNotification('🔐 Opening sign-in portal...', 'info');
}

function handleContactForm(event) {
    event.preventDefault();
    showNotification('📧 Message sent successfully! We\'ll respond within 24 hours.', 'success');
    event.target.reset();
}

// Animation initialization
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card, .team-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.borderBottom = '1px solid var(--gray-300)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.borderBottom = '1px solid var(--gray-200)';
    }
});

// Easter eggs and interactions
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('logo-icon')) {
        clickCount++;
        if (clickCount === 5) {
            showNotification('🎉 You found the easter egg! Wattson loves curious users!', 'success');
            clickCount = 0;
        }
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load home page by default
    showPage('home');
    
    // Start all the live updates
    setInterval(updateLiveStats, 3000);
    setInterval(updateDeviceStatuses, 8000);
    
    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                const originalText = this.textContent;
                this.classList.add('loading');
                this.innerHTML = '<div class="loading"></div> Loading...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 1500);
            }
        });
    });
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }
    
    // Welcome message
    setTimeout(() => {
        showNotification('👋 Welcome to Wattson! Explore our energy management platform.', 'info');
    }, 2000);
});
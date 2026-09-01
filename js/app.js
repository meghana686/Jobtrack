// Global State & LocalStorage Keys
const STORAGE_KEY = 'jobtrack_applications';

// Initialize Sample Data if empty
function initData() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        const sampleData = [
            { id: Date.now(), company: 'Google', role: 'Frontend Developer', location: 'Mountain View, CA', type: 'full-time', date: '2024-03-01', status: 'interview', url: 'https://google.com', notes: 'First round technical done.' },
            { id: Date.now() + 1, company: 'Meta', role: 'Software Engineer', location: 'Remote', type: 'full-time', date: '2024-03-05', status: 'applied', url: '', notes: 'Referral from John.' }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    }
}

// Data Helpers
function getApps() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveApps(apps) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') body.classList.add('dark');

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const theme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Run init
initData();

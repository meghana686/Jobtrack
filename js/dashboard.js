document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    renderRecent();
});

function updateStats() {
    const apps = getApps();
    
    document.getElementById('total-apps').textContent = apps.length;
    document.getElementById('count-applied').textContent = apps.filter(a => a.status === 'applied').length;
    document.getElementById('count-interview').textContent = apps.filter(a => a.status === 'interview').length;
    document.getElementById('count-selected').textContent = apps.filter(a => a.status === 'selected').length;
    document.getElementById('count-rejected').textContent = apps.filter(a => a.status === 'rejected').length;
}

function renderRecent() {
    const apps = getApps();
    const list = document.getElementById('recent-list');
    const emptyState = document.getElementById('empty-state');
    
    if (apps.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    // Sort by date (newest first) and take top 5
    const recent = [...apps].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    
    list.innerHTML = recent.map(app => `
        <tr>
            <td><strong>${app.company}</strong></td>
            <td>${app.role}</td>
            <td>${app.date}</td>
            <td><span class="badge badge-${app.status}">${app.status}</span></td>
        </tr>
    `).join('');
}

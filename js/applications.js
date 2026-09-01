document.addEventListener('DOMContentLoaded', () => {
    const appsList = document.getElementById('applications-list');
    const jobForm = document.getElementById('job-form');
    
    // Check if we are on the List page or Add/Edit page
    if (appsList) {
        renderApplications();
        setupFilters();
    }

    if (jobForm) {
        handleFormLogic();
    }
});

function renderApplications(filterData = null) {
    let apps = getApps();
    const list = document.getElementById('applications-list');
    
    // Apply Filtering
    if (filterData) {
        const { search, status, sort } = filterData;
        if (search) {
            apps = apps.filter(a => 
                a.company.toLowerCase().includes(search.toLowerCase()) || 
                a.role.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (status !== 'all') {
            apps = apps.filter(a => a.status === status);
        }
        if (sort === 'newest') apps.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (sort === 'oldest') apps.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    list.innerHTML = apps.map(app => `
        <tr>
            <td><strong>${app.company}</strong></td>
            <td>${app.role}</td>
            <td>${app.location || 'N/A'}</td>
            <td>${app.date}</td>
            <td><span class="badge badge-${app.status}">${app.status}</span></td>
            <td>
                <button class="btn-icon" onclick="editApp(${app.id})">✏️</button>
                <button class="btn-icon" onclick="deleteApp(${app.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function setupFilters() {
    const search = document.getElementById('search-input');
    const status = document.getElementById('filter-status');
    const sort = document.getElementById('sort-date');

    const triggerUpdate = () => {
        renderApplications({
            search: search.value,
            status: status.value,
            sort: sort.value
        });
    };

    search.addEventListener('input', triggerUpdate);
    status.addEventListener('change', triggerUpdate);
    sort.addEventListener('change', triggerUpdate);
}

// Add/Edit Logic
function handleFormLogic() {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const jobForm = document.getElementById('job-form');

    if (editId) {
        document.getElementById('form-title').textContent = "Edit Application";
        const apps = getApps();
        const appToEdit = apps.find(a => a.id == editId);
        if (appToEdit) {
            document.getElementById('company').value = appToEdit.company;
            document.getElementById('role').value = appToEdit.role;
            document.getElementById('location').value = appToEdit.location;
            document.getElementById('type').value = appToEdit.type;
            document.getElementById('date').value = appToEdit.date;
            document.getElementById('status').value = appToEdit.status;
            document.getElementById('url').value = appToEdit.url;
            document.getElementById('notes').value = appToEdit.notes;
        }
    }

    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const apps = getApps();
        
        const formData = {
            id: editId ? parseInt(editId) : Date.now(),
            company: document.getElementById('company').value,
            role: document.getElementById('role').value,
            location: document.getElementById('location').value,
            type: document.getElementById('type').value,
            date: document.getElementById('date').value,
            status: document.getElementById('status').value,
            url: document.getElementById('url').value,
            notes: document.getElementById('notes').value,
        };

        if (editId) {
            const index = apps.findIndex(a => a.id == editId);
            apps[index] = formData;
        } else {
            apps.push(formData);
        }

        saveApps(apps);
        window.location.href = 'applications.html';
    });
}

function deleteApp(id) {
    if (confirm('Are you sure you want to delete this application?')) {
        const apps = getApps().filter(a => a.id !== id);
        saveApps(apps);
        renderApplications();
    }
}

function editApp(id) {
    window.location.href = `add-application.html?edit=${id}`;
}

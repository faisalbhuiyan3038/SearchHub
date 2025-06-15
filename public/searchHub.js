const defaultEngines = [
    {
        name: 'Google',
        url: 'https://www.google.com/search?q={query}',
        description: 'The most popular search engine',
        favicon: 'https://www.google.com/favicon.ico'
    },
    {
        name: 'Bing',
        url: 'https://www.bing.com/search?q={query}',
        description: 'Microsoft\'s search engine',
        favicon: 'https://www.bing.com/favicon.ico'
    },
    {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q={query}',
        description: 'Privacy-focused search',
        favicon: 'https://duckduckgo.com/favicon.ico'
    },
    {
        name: 'Yandex',
        url: 'https://yandex.com/search/?text={query}',
        description: 'Russian search engine',
        favicon: 'https://yandex.com/favicon.ico'
    },
    {
        name: 'Brave',
        url: 'https://search.brave.com/search?q={query}',
        description: 'Brave\'s privacy-focused search engine',
        favicon: 'https://www.google.com/s2/favicons?domain=search.brave.com&sz=32'
    },
    {
        name: 'SearX',
        url: 'https://searx.fmhy.net/search?q={query}',
        description: 'A privacy-respecting metasearch engine',
        favicon: 'https://www.google.com/s2/favicons?domain=searx.fmhy.net&sz=32'
    },
    {
        name: 'Mojeek',
        url: 'https://www.mojeek.com/search?q={query}',
        description: 'British search engine with its own index',
        favicon: 'https://www.mojeek.com/favicon.ico'
    },
    {
        name: 'Qwant',
        url: 'https://www.qwant.com/?q={query}',
        description: 'European search engine focused on privacy',
        favicon: 'https://www.qwant.com/favicon.ico'
    },
    {
        name: 'Perplexity',
        url: 'https://www.perplexity.ai/search?q={query}',
        description: 'AI-powered search engine',
        favicon: 'https://www.perplexity.ai/favicon.ico'
    },
    {
        name: 'ChatGPT',
        url: 'https://chagpt.com/?q={query}',
        description: 'OpenAI\'s conversational AI',
        favicon: 'https://chatgpt.com/favicon.ico'
    },
    {
        name: 'Grok',
        url: 'https://grok.com/?q={query}',
        description: 'Elon Musk\'s AI search engine',
        favicon: 'https://grok.com/favicon.ico'
    },
    {
        name: 'Scira',
        url: 'https://scira.ai/?q={query}',
        description: 'AI search powered by Grok',
        favicon: 'https://scira.ai/favicon.ico'
    },
    {
        name: 'Copilot',
        url: 'https://copilot.microsoft.com/?q={query}',
        description: 'Microsoft\'s AI-powered search assistant',
        favicon: 'https://copilot.microsoft.com/favicon.ico'
    }
];

let currentQuery = '';
let searchEngines = [];
let isEditMode = false;
let openInNewTab = true;

// Initialize
function init() {
    loadEngines();
    loadSettings();
    handleUrlQuery();
    renderEngines();
    setupSettings();
}

// Load engines from storage or use defaults
function loadEngines() {
    const stored = localStorage.getItem('searchEngines');
    searchEngines = stored ? JSON.parse(stored) : [...defaultEngines];
}

// Load settings from storage
function loadSettings() {
    const stored = localStorage.getItem('openInNewTab');
    openInNewTab = stored !== null ? JSON.parse(stored) : true;
}

// Save engines to storage
function saveEngines() {
    localStorage.setItem('searchEngines', JSON.stringify(searchEngines));
}

// Save settings to storage
function saveSettings() {
    localStorage.setItem('openInNewTab', JSON.stringify(openInNewTab));
}

// Handle URL query parameter
function handleUrlQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        currentQuery = decodeURIComponent(query);
        document.getElementById('searchInput').value = currentQuery;
        document.getElementById('currentQuery').textContent = currentQuery;
        document.getElementById('queryDisplay').style.display = 'block';
        document.getElementById('clearSearchBtn').style.display = currentQuery ? 'block' : 'none';
    }
}

// Perform search
function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        currentQuery = query;
        document.getElementById('currentQuery').textContent = currentQuery;
        document.getElementById('queryDisplay').style.display = 'block';
        document.getElementById('clearSearchBtn').style.display = 'block';
        // Update URL without page reload
        const newUrl = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(query)}`;
        history.pushState({}, '', newUrl);
    }
}

// Clear search input
function clearSearch() {
    currentQuery = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('currentQuery').textContent = '';
    document.getElementById('queryDisplay').style.display = 'none';
    document.getElementById('clearSearchBtn').style.display = 'none';
    // Clear URL query parameter
    const newUrl = `${window.location.origin}${window.location.pathname}`;
    history.pushState({}, '', newUrl);
}

// Handle Enter key in search input
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Update search input event listener to show/hide clear button
document.getElementById('searchInput').addEventListener('input', function () {
    document.getElementById('clearSearchBtn').style.display = this.value ? 'block' : 'none';
});

// Toggle edit mode
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.getElementById('editToggleBtn');
    editBtn.textContent = isEditMode ? 'Done' : 'Edit';
    renderEngines();
}

// Setup settings modal
function setupSettings() {
    const openInNewTabCheckbox = document.getElementById('openInNewTab');
    openInNewTabCheckbox.checked = openInNewTab;
    openInNewTabCheckbox.addEventListener('change', function () {
        openInNewTab = this.checked;
        saveSettings();
    });
}

// Render search engines
function renderEngines() {
    const grid = document.getElementById('enginesGrid');
    grid.innerHTML = '';

    searchEngines.forEach((engine, index) => {
        const card = document.createElement('div');
        card.className = 'engine-card';
        card.setAttribute('draggable', isEditMode ? 'true' : 'false');
        card.dataset.index = index;

        // Drag and drop event listeners
        if (isEditMode) {
            card.addEventListener('dragstart', dragStart);
            card.addEventListener('dragover', dragOver);
            card.addEventListener('dragenter', dragEnter);
            card.addEventListener('dragleave', dragLeave);
            card.addEventListener('drop', drop);
            card.addEventListener('dragend', dragEnd);
        }

        // Create elements
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove engine';
        removeBtn.style.display = isEditMode ? 'block' : 'none';
        removeBtn.onclick = () => removeEngine(index);

        const faviconDiv = document.createElement('div');
        faviconDiv.className = 'engine-favicon';

        const faviconImg = document.createElement('img');
        faviconImg.src = engine.favicon;
        faviconImg.alt = engine.name;
        faviconImg.onerror = function () {
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';
        };

        const nameDiv = document.createElement('div');
        nameDiv.className = 'engine-name';
        nameDiv.textContent = engine.name;

        const descDiv = document.createElement('div');
        descDiv.className = 'engine-description';
        descDiv.textContent = engine.description || '';

        // Append elements
        faviconDiv.appendChild(faviconImg);
        card.appendChild(removeBtn);
        card.appendChild(faviconDiv);
        card.appendChild(nameDiv);
        card.appendChild(descDiv);

        if (!isEditMode) {
            card.addEventListener('click', (e) => {
                if (e.target === removeBtn) return;
                if (currentQuery) {
                    const searchUrl = engine.url.replace('{query}', encodeURIComponent(currentQuery));
                    window.open(searchUrl, openInNewTab ? '_blank' : '_self');
                } else {
                    alert('Please enter a search query first');
                }
            });
        }

        grid.appendChild(card);
    });
}

// Drag and drop handlers
let draggedItem = null;

function dragStart(e) {
    draggedItem = e.target;
    setTimeout(() => {
        e.targ
        System: et.style.opacity = '0.5';
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('engine-card')) {
        e.target.classList.add('drag-over');
    }
}

function dragLeave(e) {
    if (e.target.classList.contains('engine-card')) {
        e.target.classList.remove('drag-over');
    }
}

function drop(e) {
    e.preventDefault();
    if (e.target.classList.contains('engine-card')) {
        const target = e.target;
        const draggedIndex = parseInt(draggedItem.dataset.index);
        const targetIndex = parseInt(target.dataset.index);

        // Reorder array
        const [draggedEngine] = searchEngines.splice(draggedIndex, 1);
        searchEngines.splice(targetIndex, 0, draggedEngine);

        saveEngines();
        renderEngines();
        target.classList.remove('drag-over');
    }
}

function dragEnd(e) {
    e.target.style.opacity = '1';
    document.querySelectorAll('.engine-card').forEach(card => {
        card.classList.remove('drag-over');
    });
    draggedItem = null;
}

// Toggle add engine form
function openAddModal() {
    document.getElementById('addEngineModal').style.display = 'block';
    document.body.classList.add('modal-open');
    document.getElementById('engineName').value = '';
    document.getElementById('engineUrl').value = '';
    document.getElementById('engineDescription').value = '';
    document.getElementById('engineFavicon').value = '';
}

function closeAddModal() {
    document.getElementById('addEngineModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Open settings modal
function openSettingsModal() {
    document.getElementById('settingsModal').style.display = 'block';
    document.body.classList.add('modal-open');
}

function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Close modals when clicking outside
window.onclick = function (event) {
    const addModal = document.getElementById('addEngineModal');
    const settingsModal = document.getElementById('settingsModal');
    if (event.target === addModal) {
        closeAddModal();
    }
    if (event.target === settingsModal) {
        closeSettingsModal();
    }
}

// Close modals with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeAddModal();
        closeSettingsModal();
    }
});

// Auto-detect favicon from URL
function getFaviconUrl(searchUrl) {
    try {
        const url = new URL(searchUrl.replace('{query}', 'test'));
        return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
    } catch {
        return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';
    }
}

// Add new engine
function addEngine() {
    const name = document.getElementById('engineName').value.trim();
    const url = document.getElementById('engineUrl').value.trim();
    const description = document.getElementById('engineDescription').value.trim();
    const customFavicon = document.getElementById('engineFavicon').value.trim();

    if (name && url) {
        const favicon = customFavicon || getFaviconUrl(url);

        searchEngines.push({
            name,
            url,
            description,
            favicon
        });

        saveEngines();
        renderEngines();
        closeAddModal();
    } else {
        alert('Please provide at least a name and URL');
    }
}

// Remove engine
function removeEngine(index) {
    if (confirm('Are you sure you want to remove this search engine?')) {
        searchEngines.splice(index, 1);
        saveEngines();
        renderEngines();
    }
}

// Reset to default engines
function resetEngines() {
    if (confirm('This will reset all search engines to default. Continue?')) {
        searchEngines = [...defaultEngines];
        saveEngines();
        renderEngines();
    }
}

// Export search engines to JSON
function exportEngines() {
    const dataStr = JSON.stringify(searchEngines, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'searchhub_engines.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import search engines from JSON
function importEngines() {
    const input = document.getElementById('importEngines');
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const importedEngines = JSON.parse(e.target.result);
                // Validate imported engines
                if (Array.isArray(importedEngines) && importedEngines.every(engine =>
                    engine.name && typeof engine.name === 'string' &&
                    engine.url && typeof engine.url === 'string'
                )) {
                    searchEngines = importedEngines;
                    saveEngines();
                    renderEngines();
                    alert('Search engines imported successfully');
                    input.value = ''; // Clear file input
                } else {
                    alert('Invalid JSON format. Please ensure the file contains a valid array of search engines.');
                }
            } catch (error) {
                alert('Error importing search engines: ' + error.message);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a JSON file to import');
    }
}

// Advanced Search Variables
let isAdvancedOpen = false;
let activeFileTypes = new Set();
let activeSites = new Set();
let activeContentLocation = null;

// Toggle advanced search panel
function toggleAdvancedSearch() {
    isAdvancedOpen = !isAdvancedOpen;
    const panel = document.getElementById('advancedPanel');
    const toggle = document.querySelector('.advanced-toggle');
    
    if (isAdvancedOpen) {
        panel.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
    } else {
        panel.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
    }
}

// Toggle site chip
function toggleSiteChip(element, site) {
    if (activeSites.has(site)) {
        activeSites.delete(site);
        element.classList.remove('active');
    } else {
        activeSites.add(site);
        element.classList.add('active');
    }
    updateSiteInput();
    updateQueryPreview();
}

// Update site input field
function updateSiteInput() {
    const siteInput = document.getElementById('siteSearch');
    const sites = Array.from(activeSites).join(' OR ');
    siteInput.value = sites;
}

// Toggle file type
function toggleFileType(element, type) {
    if (activeFileTypes.has(type)) {
        activeFileTypes.delete(type);
        element.classList.remove('active');
    } else {
        activeFileTypes.add(type);
        element.classList.add('active');
    }
    updateQueryPreview();
}

// Toggle content location
function toggleContentLocation(element, type) {
    const buttons = document.querySelectorAll('.operator-toggle');
    const textInput = document.getElementById('contentLocationText');
    
    if (activeContentLocation === type) {
        // Deactivate
        activeContentLocation = null;
        element.classList.remove('active');
        element.setAttribute('data-active', 'false');
        textInput.style.display = 'none';
    } else {
        // Activate this one, deactivate others
        buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('data-active', 'false');
        });
        activeContentLocation = type;
        element.classList.add('active');
        element.setAttribute('data-active', 'true');
        textInput.style.display = 'block';
        textInput.placeholder = `Text to search in ${type === 'intitle' ? 'title' : 'body'}`;
    }
    updateQueryPreview();
}

// Update query preview
function updateQueryPreview() {
    const baseQuery = document.getElementById('searchInput').value.trim();
    const exactPhrase = document.getElementById('exactPhrase').value.trim();
    const excludeWords = document.getElementById('excludeWords').value.trim();
    const orWords = document.getElementById('orWords').value.trim();
    const siteSearch = document.getElementById('siteSearch').value.trim();
    const contentLocationText = document.getElementById('contentLocationText').value.trim();
    
    let queryParts = [];
    
    // Base query
    if (baseQuery) queryParts.push(baseQuery);
    
    // Exact phrase
    if (exactPhrase) {
        queryParts.push(`"${exactPhrase}"`);
    }
    
    // Exclude words
    if (excludeWords) {
        const excludes = excludeWords.split(' ').filter(word => word.trim())
            .map(word => word.startsWith('-') ? word : `-${word}`);
        queryParts.push(...excludes);
    }
    
    // OR words
    if (orWords) {
        queryParts.push(`(${orWords})`);
    }
    
    // Site search
    // Site search - FIXED VERSION
    if (siteSearch) {
        const sites = siteSearch.split(' OR ').filter(site => site.trim());
        if (sites.length === 1) {
            queryParts.push(`site:${sites[0].trim()}`);
        } else if (sites.length > 1) {
            // Group multiple sites with OR operator
            const siteQueries = sites.map(site => `site:${site.trim()}`);
            queryParts.push(`(${siteQueries.join(' OR ')})`);
        }
    }
    
    // Content location
    if (activeContentLocation && contentLocationText) {
        queryParts.push(`${activeContentLocation}:"${contentLocationText}"`);
    }
    
    // File types
    if (activeFileTypes.size > 0) {
        const fileTypes = Array.from(activeFileTypes);
        if (fileTypes.length === 1) {
            queryParts.push(`filetype:${fileTypes[0]}`);
        } else {
            const fileTypeQuery = fileTypes.map(type => `filetype:${type}`).join(' OR ');
            queryParts.push(`(${fileTypeQuery})`);
        }
    }
    
    const finalQuery = queryParts.join(' ');
    document.getElementById('queryPreview').textContent = finalQuery || 'Your search query will appear here...';
    
    return finalQuery;
}

// Clear all operators
function clearAllOperators() {
    // Clear inputs
    document.getElementById('exactPhrase').value = '';
    document.getElementById('excludeWords').value = '';
    document.getElementById('orWords').value = '';
    document.getElementById('siteSearch').value = '';
    document.getElementById('contentLocationText').value = '';
    
    // Clear active states
    activeFileTypes.clear();
    activeSites.clear();
    activeContentLocation = null;
    
    // Reset UI
    document.querySelectorAll('.filetype-chip, .site-chip, .operator-toggle').forEach(chip => {
        chip.classList.remove('active');
        chip.setAttribute('data-active', 'false');
    });
    
    document.getElementById('contentLocationText').style.display = 'none';
    updateQueryPreview();
}

// Modified performSearch function to include operators
function performSearchWithOperators() {
    const finalQuery = updateQueryPreview();
    if (finalQuery.trim()) {
        currentQuery = finalQuery;
        document.getElementById('currentQuery').textContent = currentQuery;
        document.getElementById('queryDisplay').style.display = 'block';
        document.getElementById('clearSearchBtn').style.display = 'block';
        
        // Update URL
        const newUrl = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(finalQuery)}`;
        history.pushState({}, '', newUrl);
    }
}

// Add event listeners for real-time preview updates
document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['exactPhrase', 'excludeWords', 'orWords', 'siteSearch', 'contentLocationText'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateQueryPreview);
        }
    });
    
    // Also update when main search input changes
    document.getElementById('searchInput').addEventListener('input', updateQueryPreview);
});

// Override the original performSearch to use operators
const originalPerformSearch = performSearch;
performSearch = function() {
    if (isAdvancedOpen && (activeFileTypes.size > 0 || activeSites.size > 0 || 
        document.getElementById('exactPhrase').value.trim() ||
        document.getElementById('excludeWords').value.trim() ||
        document.getElementById('orWords').value.trim() ||
        document.getElementById('siteSearch').value.trim() ||
        (activeContentLocation && document.getElementById('contentLocationText').value.trim()))) {
        performSearchWithOperators();
    } else {
        originalPerformSearch();
    }
};

// Initialize the app
init();

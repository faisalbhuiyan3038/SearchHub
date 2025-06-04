// Default search engines
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
        name: 'Yahoo',
        url: 'https://search.yahoo.com/search?p={query}',
        description: 'Yahoo Search',
        favicon: 'https://www.yahoo.com/favicon.ico'
    },
    {
        name: 'Startpage',
        url: 'https://www.startpage.com/sp/search?query={query}',
        description: 'Private Google results',
        favicon: 'https://www.startpage.com/favicon.ico'
    },
    {
        name: 'Yandex',
        url: 'https://yandex.com/search/?text={query}',
        description: 'Russian search engine',
        favicon: 'https://yandex.com/favicon.ico'
    }
];

let currentQuery = '';
let searchEngines = [];

// Initialize
function init() {
    loadEngines();
    handleUrlQuery();
    renderEngines();
}

// Load engines from storage or use defaults
function loadEngines() {
    const stored = localStorage.getItem('searchEngines');
    searchEngines = stored ? JSON.parse(stored) : [...defaultEngines];
}

// Save engines to storage
function saveEngines() {
    localStorage.setItem('searchEngines', JSON.stringify(searchEngines));
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
    }
}

// Perform search
function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        currentQuery = query;
        document.getElementById('currentQuery').textContent = currentQuery;
        document.getElementById('queryDisplay').style.display = 'block';
        // Update URL without page reload
        const newUrl = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(query)}`;
        history.pushState({}, '', newUrl);
    }
}

// Handle Enter key in search input
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Render search engines
function renderEngines() {
    const grid = document.getElementById('enginesGrid');
    grid.innerHTML = '';

    searchEngines.forEach((engine, index) => {
        const card = document.createElement('div');
        card.className = 'engine-card';
        
        // Create elements separately to avoid innerHTML escaping issues
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove engine';
        removeBtn.onclick = () => removeEngine(index);
        
        const faviconDiv = document.createElement('div');
        faviconDiv.className = 'engine-favicon';
        
        const faviconImg = document.createElement('img');
        faviconImg.src = engine.favicon;
        faviconImg.alt = engine.name;
        faviconImg.onerror = function() {
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
        
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking remove button
            if (e.target === removeBtn) return;
            
            if (currentQuery) {
                const searchUrl = engine.url.replace('{query}', encodeURIComponent(currentQuery));
                window.open(searchUrl, '_blank');
            } else {
                alert('Please enter a search query first');
            }
        });

        grid.appendChild(card);
    });
}

// Toggle add engine form
// Update your existing functions:
function openAddModal() {
    document.getElementById('addEngineModal').style.display = 'block';
    document.body.classList.add('modal-open'); // Prevent body scroll
    // Clear form
    document.getElementById('engineName').value = '';
    document.getElementById('engineUrl').value = '';
    document.getElementById('engineDescription').value = '';
    document.getElementById('engineFavicon').value = '';
}

function closeAddModal() {
    document.getElementById('addEngineModal').style.display = 'none';
    document.body.classList.remove('modal-open'); // Restore body scroll
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addEngineModal');
    if (event.target === modal) {
        closeAddModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAddModal();
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
        // Use custom favicon if provided, otherwise auto-detect
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



// Initialize the app
init();
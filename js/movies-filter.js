let allMovies = [];
let displayedCount = 8;
let currentStatus = 'all';

async function loadMoviesByStatus(statusFilter) {
    const grid = document.getElementById('moviesGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!grid) return;

    currentStatus = statusFilter;
    displayedCount = 8;

    try {
        const response = await fetch('./movies.json');
        const movies = await response.json();

        allMovies = statusFilter === 'all' 
            ? movies 
            : movies.filter(m => m.status === statusFilter);

        renderMovies();

    } catch (error) {
        console.error("Помилка завантаження:", error);
    }
}

function renderMovies() {
    const grid = document.getElementById('moviesGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    grid.innerHTML = '';

    const moviesToDisplay = allMovies.slice(0, displayedCount);

    moviesToDisplay.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <h4>${movie.title}</h4>
                <p class="description">${movie.description}</p>
                <span class="status ${movie.status}">
                    ${movie.status === 'now' ? 'Now in cinema' : 'Coming soon'}
                </span>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `./movie-info.html?id=${movie.id}`;
        });

        grid.appendChild(card);
    });

    if (displayedCount >= allMovies.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

document.getElementById('loadMoreBtn')?.addEventListener('click', () => {
    displayedCount += 8;
    renderMovies();
});
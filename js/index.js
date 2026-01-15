let popularMovies = [];
let index = 0;
const filmWidth = 220;

async function loadPopularFilms() {
    try {
        const response = await fetch('./movies.json');
        const movies = await response.json();
        popularMovies = movies.filter(m => m.isPopular);

        renderFilms();
        attachEventListeners();
    } catch (e) {
        console.error("Error loading films:", e);
    }
}

function renderFilms() {
    const track = document.getElementById('filmsTrack');
    track.innerHTML = ''; // Очищаємо

    popularMovies.forEach(film => {
        const filmDiv = document.createElement('div');
        filmDiv.className = 'film';
        filmDiv.setAttribute('data-id', film.id);
        filmDiv.innerHTML = `
            <img src="${film.poster}" alt="${film.title}">
            <p>${film.title}</p>
        `;
        track.appendChild(filmDiv);
    });
}

function attachEventListeners() {
    const films = document.querySelectorAll('.film');
    const btnLeft = document.querySelector('.arrow.left');
    const btnRight = document.querySelector('.arrow.right');

    films.forEach(film => {
        film.style.cursor = 'pointer';
        film.addEventListener('click', () => {
            const movieId = film.getAttribute('data-id');
            window.location.href = `/movie-info.html?id=${movieId}`;
        });
    });

    btnRight.addEventListener('click', () => {
        index++;
        const maxIndex = Math.max(0, popularMovies.length - 5);
        if (index > maxIndex) {
            index = 0;
        }
        updateTrackPosition();
    });

    btnLeft.addEventListener('click', () => {
        index--;
        const maxIndex = Math.max(0, popularMovies.length - 5);
        if (index < 0) {
            index = maxIndex;
        }
        updateTrackPosition();
    });
}

function updateTrackPosition() {
    const track = document.getElementById('filmsTrack');
    track.style.transform = `translateX(-${index * filmWidth}px)`;
}

// Завантажуємо популярні фільми при завантаженні сторінки
loadPopularFilms();

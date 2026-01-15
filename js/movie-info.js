let currentMovie = null;
const SEAT_PRICE = 150; // Ціна одного квитка

async function loadMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    try {
        const response = await fetch('./movies.json');
        const movies = await response.json();
        currentMovie = movies.find(m => m.id == movieId);

        if (currentMovie) {
            document.title = `Film: "${currentMovie.title}"`;
            document.getElementById('movieTitle').innerText = currentMovie.title;
            document.getElementById('moviePoster').src = currentMovie.poster;
            document.getElementById('movieDesc').innerText = currentMovie.description;

            // Перевіряємо статус фільму
            if (currentMovie.status === 'soon') {
                // Для "coming soon" фільмів показуємо форму підписки
                document.getElementById('bookingAside').style.display = 'none';
                document.getElementById('subscriptionAside').style.display = 'block';
                initSubscriptionForm();
            } else {
                // Для фільмів в прокаті показуємо вибір дати/часу
                document.getElementById('subscriptionAside').style.display = 'none';
                document.getElementById('bookingAside').style.display = 'block';
                initBooking();
            }
        }
    } catch (e) { console.error("Error:", e); }
}

function initBooking() {
    const dateSelector = document.getElementById('sessionDate');
    const dates = Object.keys(currentMovie.schedule);

    if (dates.length > 0) {
        dates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.innerText = new Date(date).toLocaleDateString('uk-UA', {day:'numeric', month:'long'});
            dateSelector.appendChild(option);
        });
        dateSelector.onchange = () => updateTimeSlots(dateSelector.value);
        updateTimeSlots(dates[0]);
    }

    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.onclick = () => {
        const selectedTime = document.querySelector('.time-btn.active');
        if (!selectedTime) {
            alert('Будь ласка, оберіть час сеансу');
            return;
        }
        const selectedDate = document.getElementById('sessionDate').value;
        window.location.href = `booking.html?id=${currentMovie.id}&date=${selectedDate}&time=${selectedTime.innerText}`;
    };
}

function updateTimeSlots(selectedDate) {
    const slotsGrid = document.getElementById('slotsGrid');
    const confirmBtn = document.getElementById('confirmBtn');
    slotsGrid.innerHTML = '';
    confirmBtn.style.visibility = 'hidden'; // Прячем кнопку

    currentMovie.schedule[selectedDate].forEach(time => {
        const btn = document.createElement('button');
        btn.className = 'time-btn';
        btn.innerText = time;
        btn.onclick = () => {
            document.querySelectorAll('.time-btn').forEach(b => {
                if (b !== confirmBtn) b.classList.remove('active');
            });
            btn.classList.add('active');
            confirmBtn.style.visibility = 'visible'; // Показуємо кнопку
        };
        slotsGrid.appendChild(btn);
    });
}

function initSubscriptionForm() {
    const form = document.getElementById('subscriptionForm');
    const subscriptionAside = document.getElementById('subscriptionAside');

    form.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('subEmail').value;
        
        // Логування даних
        console.log('Підписка:', { email, movieId: currentMovie.id });
        
        // Приховуємо форму
        form.style.display = 'none';
        
        // Показуємо повідомлення про успіх
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.innerHTML = '<h3>Дякую за підписку!</h3><p>Очікуйте повідомлення про вихід фільму <strong>' + currentMovie.title + '</strong> на адресу <strong>' + email + '</strong></p>';
        
        // Вставляємо повідомлення на місце форми
        subscriptionAside.appendChild(thankYouMessage);
    };
}

loadMovieDetails();
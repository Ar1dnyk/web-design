const SEAT_PRICE = 150;
let selectedSeats = [];

async function initBooking() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');
    const date = params.get('date');
    const time = params.get('time');

    // Завантажуємо інфо про фільм для заголовка
    const resp = await fetch('./movies.json');
    const movies = await resp.json();
    const movie = movies.find(m => m.id == movieId);

    if (movie) {
        document.getElementById('bookingTitle').innerText = movie.title;
        document.getElementById('bookingDetails').innerText = `${date} | ${time}`;
    }

    renderHall(7, 12); // Зал 7 рядів, 12 місць
}

function renderHall(rows, cols) {
    const container = document.getElementById('hallContainer');
    for (let r = 1; r <= rows; r++) {
        const row = document.createElement('div');
        row.className = 'hall-row';
        for (let s = 1; s <= cols; s++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            
            // Рандомно робимо деякі місця зайнятими (для вигляду)
            if (Math.random() < 0.2) seat.classList.add('occupied');

            seat.onclick = () => {
                if (seat.classList.contains('occupied')) return;
                
                seat.classList.toggle('selected');
                const seatInfo = `Ряд ${r}, Місце ${s}`;
                
                if (seat.classList.contains('selected')) {
                    selectedSeats.push({id: `${r}-${s}`, label: seatInfo});
                } else {
                    selectedSeats = selectedSeats.filter(item => item.id !== `${r}-${s}`);
                }
                updateCart();
            };
            row.appendChild(seat);
        }
        container.appendChild(row);
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const payBtn = document.getElementById('payBtn');

    if (selectedSeats.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Місця не обрано</p>';
        payBtn.disabled = true;
    } else {
        cartItems.innerHTML = selectedSeats.map(seat => `
            <div class="cart-item">
                <span>${seat.label}</span>
                <span>${SEAT_PRICE} грн</span>
            </div>
        `).join('');
        payBtn.disabled = false;
    }

    totalPrice.innerText = selectedSeats.length * SEAT_PRICE;
}

// Обробник кнопки оплати
document.addEventListener('DOMContentLoaded', () => {
    const payBtn = document.getElementById('payBtn');
    
    payBtn.addEventListener('click', () => {
        const totalPrice = document.getElementById('totalPrice').innerText;
        const movieTitle = document.getElementById('bookingTitle').innerText;
        
        // Показуємо повідомлення про успіх
        alert(`✓ Дякуємо за покупку!\n\nФільм: ${movieTitle}\nВибрано місць: ${selectedSeats.length}\nСума: ${totalPrice} грн\n\nЗабронюємо ваші квитки...`);
        
        // Закриваємо сторінку через 1 секунду
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 100);
    });
});

// Ініціалізація при завантаженні сторінки
initBooking();

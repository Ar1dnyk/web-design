const SEAT_PRICE = 150;
let selectedSeats = [];

async function initBooking() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');
    const date = params.get('date');
    const time = params.get('time');

    // Load movie info for the title
    const resp = await fetch('./movies.json');
    const movies = await resp.json();
    const movie = movies.find(m => m.id == movieId);

    if (movie) {
        document.getElementById('bookingTitle').innerText = movie.title;
        document.getElementById('bookingDetails').innerText = `${date} | ${time}`;
    }

    renderHall(7, 12); // Hall: 7 rows, 12 seats
}

function renderHall(rows, cols) {
    const container = document.getElementById('hallContainer');
    for (let r = 1; r <= rows; r++) {
        const row = document.createElement('div');
        row.className = 'hall-row';
        for (let s = 1; s <= cols; s++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            
            // Randomly make some seats occupied (for appearance)
            if (Math.random() < 0.2) seat.classList.add('occupied');

            seat.onclick = () => {
                if (seat.classList.contains('occupied')) return;
                
                seat.classList.toggle('selected');
                const seatInfo = `Row ${r}, Seat ${s}`;
                
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
        cartItems.innerHTML = '<p class="empty-msg">No seats selected</p>';
        payBtn.disabled = true;
    } else {
        cartItems.innerHTML = selectedSeats.map(seat => `
            <div class="cart-item">
                <span>${seat.label}</span>
                <span>${SEAT_PRICE} UAH</span>
            </div>
        `).join('');
        payBtn.disabled = false;
    }

    totalPrice.innerText = selectedSeats.length * SEAT_PRICE;
}

document.addEventListener('DOMContentLoaded', () => {
    const payBtn = document.getElementById('payBtn');
    
    payBtn.addEventListener('click', () => {
        const totalPrice = document.getElementById('totalPrice').innerText;
        const movieTitle = document.getElementById('bookingTitle').innerText;
        
        alert(`✓ Thank you for your purchase!\n\nMovie: ${movieTitle}\nSeats selected: ${selectedSeats.length}\nTotal: ${totalPrice} UAH\n\nBooking your tickets...`);
        
        setTimeout(() => {
            window.location.href = './index.html';
        }, 100);
    });
});


initBooking();

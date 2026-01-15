document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('senderEmail').value;
        const name = document.getElementById('senderName').value;
        const subject = document.getElementById('messageSubject').value;
        const message = document.getElementById('messageText').value;

        // Логування даних (в реальному додатку відправляємо на сервер)
        console.log('Контактна форма:', { name, email, subject, message });

        // Приховуємо форму
        contactForm.style.display = 'none';
        
        // Показуємо повідомлення про успіх
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.innerHTML = '<h3>Дякую!</h3><p>Очікуйте нашу відповідь на адресу <strong>' + email + '</strong></p>';
        
        // Вставляємо повідомлення на місце форми
        const formSection = document.querySelector('.contact-form-section');
        formSection.appendChild(thankYouMessage);
    });
});

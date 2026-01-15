document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('senderEmail').value;
        const name = document.getElementById('senderName').value;
        const subject = document.getElementById('messageSubject').value;
        const message = document.getElementById('messageText').value;

        // Log data (in a real app, send to server)
        console.log('Contact form:', { name, email, subject, message });

        // Hide form
        contactForm.style.display = 'none';
        
        // Show success message
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.innerHTML = '<h3>Thank you!</h3><p>Expect our response at <strong>' + email + '</strong></p>';
        
        // Insert message in place of form
        const formSection = document.querySelector('.contact-form-section');
        formSection.appendChild(thankYouMessage);
    });
});

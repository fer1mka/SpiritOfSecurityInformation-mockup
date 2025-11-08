// Функции для страницы техподдержки
document.addEventListener('DOMContentLoaded', function () {
	initEmailForm();
	initPhoneSupport();
});

function initEmailForm() {
	const emailForm = document.querySelector('.email-form');
	if (emailForm) {
		const sendButton = emailForm.querySelector('.auth-button');
		if (sendButton) {
			sendButton.addEventListener('click', function () {
				const name = document.getElementById('email-name').value;
				const email = document.getElementById('email-address').value;
				const subject = document.getElementById('email-subject').value;
				const message = document.getElementById('email-message').value;

				if (!name || !email || !subject || !message) {
					alert('Пожалуйста, заполните все поля формы');
					return;
				}

				// Здесь будет отправка email на сервер
				alert('Ваше сообщение отправлено! Мы ответим вам в течение 24 часов.');

				// Очищаем форму
				document.getElementById('email-name').value = '';
				document.getElementById('email-address').value = '';
				document.getElementById('email-subject').value = '';
				document.getElementById('email-message').value = '';
			});
		}
	}
}

function initPhoneSupport() {
	const phoneButton = document.querySelector('.support-button[data-tab="phone"]');
	if (phoneButton) {
		phoneButton.addEventListener('click', function () {
			// В реальном приложении здесь может быть вызов API телефонии
			alert('Позвоните нам по номеру: +7 (800) 555-35-35\nЧасы работы: Пн-Пт 9:00-18:00');
		});
	}
}
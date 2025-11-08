// Специфичные функции для страниц аутентификации
document.addEventListener('DOMContentLoaded', function () {
	initSocialAuth();
	initPhoneMask();
	initForgotPassword();
});

function initSocialAuth() {
	const socialButtons = document.querySelectorAll('.social-button');
	socialButtons.forEach(button => {
		button.addEventListener('click', function () {
			const provider = this.classList.contains('google-button') ? 'Google' : 'GitHub';
			alert(`Вход через ${provider} в настоящее время не доступен. Используйте форму регистрации/входа.`);
		});
	});
}

function initPhoneMask() {
	const phoneInput = document.getElementById('reg-phone');
	if (phoneInput) {
		phoneInput.addEventListener('input', function (e) {
			let value = e.target.value.replace(/\D/g, '');

			if (value.startsWith('7') || value.startsWith('8')) {
				value = value.substring(1);
			}

			let formattedValue = '+7 (';

			if (value.length > 0) {
				formattedValue += value.substring(0, 3);
			}
			if (value.length > 3) {
				formattedValue += ') ' + value.substring(3, 6);
			}
			if (value.length > 6) {
				formattedValue += '-' + value.substring(6, 8);
			}
			if (value.length > 8) {
				formattedValue += '-' + value.substring(8, 10);
			}

			e.target.value = formattedValue;
		});
	}
}

function initForgotPassword() {
	const forgotPasswordLink = document.querySelector('.forgot-password');
	if (forgotPasswordLink) {
		forgotPasswordLink.addEventListener('click', function (e) {
			e.preventDefault();
			const email = prompt('Введите ваш email для восстановления пароля:');
			if (email) {
				if (validateEmail(email)) {
					alert(`Инструкции по восстановлению пароля отправлены на ${email}`);
				} else {
					alert('Пожалуйста, введите корректный email адрес');
				}
			}
		});
	}
}

function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}
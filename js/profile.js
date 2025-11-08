// Функции для страницы профиля
document.addEventListener('DOMContentLoaded', function () {
	initProfileTabs();
	initAvatarUpload();
	initProfileForms();
	initNotifications();
});

function initProfileTabs() {
	const navLinks = document.querySelectorAll('.nav-items a');
	const tabs = document.querySelectorAll('.content-section');

	navLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();

			// Убираем активный класс у всех ссылок и вкладок
			navLinks.forEach(l => l.classList.remove('active'));
			tabs.forEach(tab => tab.classList.remove('active'));

			// Добавляем активный класс текущей ссылке
			this.classList.add('active');

			// Показываем соответствующую вкладку
			const tabId = this.getAttribute('data-tab') + 'Tab';
			const targetTab = document.getElementById(tabId);
			if (targetTab) {
				targetTab.classList.add('active');
			}
		});
	});
}

function initAvatarUpload() {
	const avatarInput = document.getElementById('avatarInput');
	const avatar = document.querySelector('.avatar');

	if (avatarInput && avatar) {
		avatarInput.addEventListener('change', function (e) {
			const file = e.target.files[0];
			if (file) {
				// Проверяем тип файла
				if (!file.type.match('image.*')) {
					alert('Пожалуйста, выберите изображение');
					return;
				}

				// Проверяем размер файла (максимум 5MB)
				if (file.size > 5 * 1024 * 1024) {
					alert('Размер файла не должен превышать 5MB');
					return;
				}

				const reader = new FileReader();
				reader.onload = function (e) {
					avatar.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;

					// Здесь будет отправка аватара на сервер
					setTimeout(() => {
						alert('Аватар успешно обновлен!');
					}, 1000);
				};
				reader.readAsDataURL(file);
			}
		});
	}
}

function initProfileForms() {
	// Обработка формы безопасности
	const securityForm = document.querySelector('#securityTab .settings-form');
	if (securityForm) {
		const saveButton = securityForm.querySelector('.auth-button');
		if (saveButton) {
			saveButton.addEventListener('click', function (e) {
				e.preventDefault();

				const currentPassword = securityForm.querySelector('input[type="password"]').value;
				const newPassword = securityForm.querySelectorAll('input[type="password"]')[1].value;
				const confirmPassword = securityForm.querySelectorAll('input[type="password"]')[2].value;

				if (!currentPassword) {
					alert('Пожалуйста, введите текущий пароль');
					return;
				}

				if (newPassword && newPassword !== confirmPassword) {
					alert('Новые пароли не совпадают');
					return;
				}

				if (newPassword && newPassword.length < 8) {
					alert('Новый пароль должен содержать минимум 8 символов');
					return;
				}

				// Здесь будет отправка данных на сервер
				alert('Настройки безопасности успешно обновлены!');
				securityForm.reset();
			});
		}
	}

	// Обработка кнопок редактирования
	const editButtons = document.querySelectorAll('.edit-btn');
	editButtons.forEach(btn => {
		btn.addEventListener('click', function () {
			const section = this.closest('.content-section');
			if (section.id === 'personalTab') {
				enablePersonalInfoEditing();
			}
		});
	});
}

function initNotifications() {
	const notificationSwitches = document.querySelectorAll('.notification-item input[type="checkbox"]');
	notificationSwitches.forEach(switchEl => {
		switchEl.addEventListener('change', function () {
			const notificationType = this.closest('.notification-item').querySelector('.notification-title').textContent;
			const status = this.checked ? 'включены' : 'выключены';

			// Здесь будет сохранение настроек на сервере
			console.log(`Уведомления "${notificationType}" ${status}`);
		});
	});
}

function enablePersonalInfoEditing() {
	const personalInfo = document.querySelector('#personalTab .info-grid');
	const infoItems = personalInfo.querySelectorAll('.info-item');

	infoItems.forEach(item => {
		const label = item.querySelector('.info-label').textContent;
		const value = item.querySelector('.info-value').textContent;

		if (label !== 'Статус клиента') {
			item.innerHTML = `
				<span class="info-label">${label}</span>
				<input type="text" class="form-input" value="${value}" style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px;">
			`;
		}
	});

	// Показываем кнопки сохранения/отмены
	const sectionHeader = document.querySelector('#personalTab .section-header');
	const saveButton = document.createElement('button');
	saveButton.className = 'edit-btn';
	saveButton.innerHTML = '<i class="fas fa-save"></i> Сохранить';
	saveButton.style.marginLeft = '10px';

	const cancelButton = document.createElement('button');
	cancelButton.className = 'edit-btn';
	cancelButton.innerHTML = '<i class="fas fa-times"></i> Отмена';
	cancelButton.style.background = '#e74c3c';

	cancelButton.addEventListener('click', function () {
		location.reload();
	});

	saveButton.addEventListener('click', function () {
		// Здесь будет сохранение данных на сервере
		alert('Данные успешно сохранены!');
		location.reload();
	});

	sectionHeader.appendChild(saveButton);
	sectionHeader.appendChild(cancelButton);
}
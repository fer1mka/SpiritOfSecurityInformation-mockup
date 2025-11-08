// Функции для страницы профиля
document.addEventListener('DOMContentLoaded', function () {
    initProfileTabs();
    initAvatarUpload();
    initOrderFilters();
    initForms();
    initPasswordStrength();
    updateNavigationBadges();
});

// Инициализация вкладок профиля
function initProfileTabs() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');

            // Убираем активный класс у всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');

            // Скрываем все вкладки
            tabContents.forEach(tab => tab.classList.remove('active'));
            // Показываем выбранную вкладку
            document.getElementById(tabName + '-tab').classList.add('active');

            // Обновляем историю браузера
            history.pushState(null, null, `#${tabName}`);
        });
    });

    // Обработка хеша в URL при загрузке страницы
    const hash = window.location.hash.substring(1);
    if (hash && ['orders', 'settings', 'security', 'billing'].includes(hash)) {
        const targetBtn = document.querySelector(`.nav-btn[data-tab="${hash}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }
}

// Обновление бейджей навигации
function updateNavigationBadges() {
    const activeOrders = document.querySelectorAll('.order-card.active').length;
    const ordersBadge = document.getElementById('ordersBadge');
    
    if (ordersBadge) {
        ordersBadge.textContent = activeOrders;
        
        // Скрываем бейдж если нет активных заказов
        if (activeOrders === 0) {
            ordersBadge.style.display = 'none';
        }
    }

    // Обновляем статистику в боковой панели
    updateOrdersStatistics();
}

// Обновление статистики заказов
function updateOrdersStatistics() {
    const inProgressOrders = document.querySelectorAll('.order-status.in-progress').length;
    const pendingOrders = document.querySelectorAll('.order-status.pending').length;
    const completedOrders = document.querySelectorAll('.order-card.completed').length;
    
    // Обновляем счетчики в статистике
    const statCounts = document.querySelectorAll('.stat-count');
    if (statCounts.length >= 3) {
        statCounts[0].textContent = inProgressOrders;
        statCounts[1].textContent = pendingOrders;
        statCounts[2].textContent = completedOrders;
    }

    // Обновляем общее количество заказов
    const totalOrders = inProgressOrders + pendingOrders + completedOrders;
    const summaryItems = document.querySelectorAll('.summary-item strong');
    if (summaryItems.length >= 1) {
        summaryItems[0].textContent = totalOrders;
    }
}

// Остальные функции остаются без изменений...
function initAvatarUpload() {
    const avatarUploadBtn = document.getElementById('avatarUploadBtn');
    const avatarInput = document.getElementById('avatarInput');
    const userAvatar = document.getElementById('userAvatar');

    avatarUploadBtn.addEventListener('click', function () {
        avatarInput.click();
    });

    avatarInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Аватар пользователя';
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.borderRadius = '50%';
                    img.style.objectFit = 'cover';

                    userAvatar.innerHTML = '';
                    userAvatar.appendChild(img);

                    localStorage.setItem('userAvatar', e.target.result);
                    
                    showNotification('Аватар успешно обновлен!', 'success');
                };
                
                reader.readAsDataURL(file);
            } else {
                showNotification('Пожалуйста, выберите изображение', 'error');
            }
        }
    });

    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        const img = document.createElement('img');
        img.src = savedAvatar;
        img.alt = 'Аватар пользователя';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        userAvatar.innerHTML = '';
        userAvatar.appendChild(img);
    }
}

function initOrderFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const orderCards = document.querySelectorAll('.order-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            orderCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'active') {
                    card.style.display = card.classList.contains('active') ? 'block' : 'none';
                } else if (filter === 'completed') {
                    card.style.display = card.classList.contains('completed') ? 'block' : 'none';
                }
            });

            // Обновляем бейджи после фильтрации
            updateNavigationBadges();
        });
    });
}

// Функции для страницы профиля
document.addEventListener('DOMContentLoaded', function () {
	initProfileTabs();
	initAvatarUpload();
	initOrderFilters();
	initForms();
	initPasswordStrength();
});

// Инициализация вкладок профиля
function initProfileTabs() {
	const navButtons = document.querySelectorAll('.nav-btn');
	const tabContents = document.querySelectorAll('.tab-content');

	navButtons.forEach(button => {
		button.addEventListener('click', function () {
			const tabName = this.getAttribute('data-tab');

			// Убираем активный класс у всех кнопок
			navButtons.forEach(btn => btn.classList.remove('active'));
			// Добавляем активный класс текущей кнопке
			this.classList.add('active');

			// Скрываем все вкладки
			tabContents.forEach(tab => tab.classList.remove('active'));
			// Показываем выбранную вкладку
			document.getElementById(tabName + '-tab').classList.add('active');
		});
	});
}

// Загрузка аватарки
function initAvatarUpload() {
	const avatarUploadBtn = document.getElementById('avatarUploadBtn');
	const avatarInput = document.getElementById('avatarInput');
	const userAvatar = document.getElementById('userAvatar');

	avatarUploadBtn.addEventListener('click', function () {
		avatarInput.click();
	});

	avatarInput.addEventListener('change', function (e) {
		const file = e.target.files[0];
		if (file) {
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();

				reader.onload = function (e) {
					// Создаем новый элемент изображения
					const img = document.createElement('img');
					img.src = e.target.result;
					img.alt = 'Аватар пользователя';
					img.style.width = '100%';
					img.style.height = '100%';
					img.style.borderRadius = '50%';
					img.style.objectFit = 'cover';

					// Очищаем содержимое аватара и добавляем изображение
					userAvatar.innerHTML = '';
					userAvatar.appendChild(img);

					// Сохраняем в localStorage (в реальном приложении - отправка на сервер)
					localStorage.setItem('userAvatar', e.target.result);

					showNotification('Аватар успешно обновлен!', 'success');
				};

				reader.readAsDataURL(file);
			} else {
				showNotification('Пожалуйста, выберите изображение', 'error');
			}
		}
	});

	// Загружаем сохраненный аватар при загрузке страницы
	const savedAvatar = localStorage.getItem('userAvatar');
	if (savedAvatar) {
		const img = document.createElement('img');
		img.src = savedAvatar;
		img.alt = 'Аватар пользователя';
		img.style.width = '100%';
		img.style.height = '100%';
		img.style.borderRadius = '50%';
		img.style.objectFit = 'cover';
		userAvatar.innerHTML = '';
		userAvatar.appendChild(img);
	}
}

// Фильтрация заказов
function initOrderFilters() {
	const filterButtons = document.querySelectorAll('.filter-btn');
	const orderCards = document.querySelectorAll('.order-card');

	filterButtons.forEach(button => {
		button.addEventListener('click', function () {
			const filter = this.getAttribute('data-filter');

			// Убираем активный класс у всех кнопок
			filterButtons.forEach(btn => btn.classList.remove('active'));
			// Добавляем активный класс текущей кнопке
			this.classList.add('active');

			// Фильтруем заказы
			orderCards.forEach(card => {
				if (filter === 'all') {
					card.style.display = 'block';
				} else if (filter === 'active') {
					card.style.display = card.classList.contains('active') ? 'block' : 'none';
				} else if (filter === 'completed') {
					card.style.display = card.classList.contains('completed') ? 'block' : 'none';
				}
			});
		});
	});
}

// Инициализация форм
function initForms() {
	const profileForm = document.getElementById('profileForm');
	const passwordForm = document.getElementById('passwordForm');

	if (profileForm) {
		profileForm.addEventListener('submit', function (e) {
			e.preventDefault();

			// Собираем данные формы
			const formData = {
				firstName: document.getElementById('firstName').value,
				lastName: document.getElementById('lastName').value,
				username: document.getElementById('username').value,
				phone: document.getElementById('phone').value
			};

			// Сохраняем в localStorage (в реальном приложении - отправка на сервер)
			localStorage.setItem('userProfile', JSON.stringify(formData));

			// Обновляем данные в боковой панели
			updateUserInfo(formData);

			showNotification('Профиль успешно обновлен!', 'success');
		});
	}

	if (passwordForm) {
		passwordForm.addEventListener('submit', function (e) {
			e.preventDefault();

			const currentPassword = document.getElementById('currentPassword').value;
			const newPassword = document.getElementById('newPassword').value;
			const confirmPassword = document.getElementById('confirmPassword').value;

			if (newPassword !== confirmPassword) {
				showNotification('Пароли не совпадают', 'error');
				return;
			}

			if (newPassword.length < 6) {
				showNotification('Пароль должен содержать минимум 6 символов', 'error');
				return;
			}

			// В реальном приложении здесь была бы отправка на сервер
			showNotification('Пароль успешно изменен!', 'success');
			passwordForm.reset();
		});
	}

	// Загружаем сохраненные данные профиля
	loadSavedProfile();
}

// Загрузка сохраненных данных профиля
function loadSavedProfile() {
	const savedProfile = localStorage.getItem('userProfile');
	if (savedProfile) {
		const profileData = JSON.parse(savedProfile);

		document.getElementById('firstName').value = profileData.firstName || '';
		document.getElementById('lastName').value = profileData.lastName || '';
		document.getElementById('username').value = profileData.username || '';
		document.getElementById('phone').value = profileData.phone || '';

		updateUserInfo(profileData);
	}
}

// Обновление информации пользователя в боковой панели
function updateUserInfo(profileData) {
	const userNameElement = document.getElementById('userName');
	const userEmailElement = document.getElementById('userEmail');

	if (userNameElement && profileData.firstName && profileData.lastName) {
		userNameElement.textContent = `${profileData.firstName} ${profileData.lastName}`;
	}

	if (userEmailElement && profileData.username) {
		userEmailElement.textContent = `${profileData.username}@example.com`;
	}
}

// Проверка надежности пароля
function initPasswordStrength() {
	const newPasswordInput = document.getElementById('newPassword');
	const strengthBar = document.querySelector('.strength-bar');
	const strengthText = document.querySelector('.strength-text');

	if (newPasswordInput && strengthBar && strengthText) {
		newPasswordInput.addEventListener('input', function () {
			const password = this.value;
			const strength = calculatePasswordStrength(password);

			updatePasswordStrength(strength, strengthBar, strengthText);
		});
	}
}

function calculatePasswordStrength(password) {
	let strength = 0;

	if (password.length >= 8) strength++;
	if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
	if (password.match(/\d/)) strength++;
	if (password.match(/[^a-zA-Z\d]/)) strength++;

	return strength;
}

function updatePasswordStrength(strength, bar, text) {
	const strengthLevels = {
		0: { width: '0%', color: '#e74c3c', text: 'Очень слабый' },
		1: { width: '25%', color: '#e74c3c', text: 'Слабый' },
		2: { width: '50%', color: '#f39c12', text: 'Средний' },
		3: { width: '75%', color: '#f39c12', text: 'Хороший' },
		4: { width: '100%', color: '#2ecc71', text: 'Надежный' }
	};

	const level = strengthLevels[strength] || strengthLevels[0];

	bar.style.width = level.width;
	bar.style.backgroundColor = level.color;
	text.textContent = level.text;
	text.style.color = level.color;
}

// Уведомления
function showNotification(message, type = 'info') {
	// Создаем элемент уведомления
	const notification = document.createElement('div');
	notification.className = `notification ${type}`;
	notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

	// Добавляем стили для уведомления
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;

	document.body.appendChild(notification);

	// Удаляем уведомление через 3 секунды
	setTimeout(() => {
		notification.style.animation = 'slideOutRight 0.3s ease';
		setTimeout(() => {
			if (notification.parentNode) {
				notification.parentNode.removeChild(notification);
			}
		}, 300);
	}, 3000);
}

// Добавляем CSS анимации для уведомлений
const notificationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Обработчики для кнопок действий
document.addEventListener('DOMContentLoaded', function () {
	// Обработчик для кнопки "Чат с исполнителем"
	document.querySelectorAll('.action-btn.primary').forEach(btn => {
		if (btn.textContent.includes('Чат')) {
			btn.addEventListener('click', function () {
				window.location.href = 'executor-chat.html';
			});
		}
	});

	// Обработчик для включения 2FA
	document.querySelector('.enable-2fa-btn')?.addEventListener('click', function () {
		showNotification('Двухфакторная аутентификация включена!', 'success');
		this.textContent = '2FA включена';
		this.disabled = true;
	});

	// Обработчик для добавления способа оплаты
	document.querySelector('.add-payment-btn')?.addEventListener('click', function () {
		showNotification('Функция добавления способа оплаты будет доступна в ближайшее время', 'info');
	});
});
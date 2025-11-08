// Функции для страницы услуг
document.addEventListener('DOMContentLoaded', function () {
	initServiceButtons();
	initServiceCategories();
	initServiceSearch();
});

function initServiceButtons() {
	// Обработка кнопки "Загрузить больше"
	const loadMoreBtn = document.querySelector('.load-more');
	if (loadMoreBtn) {
		loadMoreBtn.addEventListener('click', function () {
			alert('Функция "Загрузить больше" в настоящее время не доступна. Это заглушка для демонстрации.');
		});
	}

	// Обработка выбора услуги
	document.querySelectorAll('.service-button').forEach(button => {
		button.addEventListener('click', function () {
			const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
			const servicePrice = this.closest('.service-card').querySelector('.service-price').textContent;

			// Перенаправляем на страницу оплаты с параметрами
			const url = `payment.html?service=${encodeURIComponent(serviceTitle)}&price=${encodeURIComponent(servicePrice.replace(/[^\d]/g, ''))}`;
			window.location.href = url;
		});
	});
}

function initServiceCategories() {
	// Обработка категорий услуг
	document.querySelectorAll('.category-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
			this.classList.add('active');

			const category = this.textContent;
			filterServicesByCategory(category);
		});
	});
}

function initServiceSearch() {
	// Обработка поиска
	const searchBox = document.querySelector('.search-box');
	if (searchBox) {
		searchBox.addEventListener('input', function () {
			const searchTerm = this.value.toLowerCase();
			filterServicesBySearch(searchTerm);
		});
	}
}

function filterServicesByCategory(category) {
	const serviceCards = document.querySelectorAll('.service-card');

	serviceCards.forEach(card => {
		if (category === 'Все услуги') {
			card.style.display = 'block';
		} else {
			const serviceTitle = card.querySelector('.service-title').textContent.toLowerCase();
			// Простая логика фильтрации по категориям
			if ((category === 'Пентестинг' && (serviceTitle.includes('пентест') || serviceTitle.includes('тестирование'))) ||
				(category === 'Анализ кода' && serviceTitle.includes('анализ кода')) ||
				(category === 'Консалтинг' && serviceTitle.includes('аудит'))) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		}
	});
}

function filterServicesBySearch(searchTerm) {
	const serviceCards = document.querySelectorAll('.service-card');

	serviceCards.forEach(card => {
		const serviceTitle = card.querySelector('.service-title').textContent.toLowerCase();
		const serviceDescription = card.querySelector('.service-description').textContent.toLowerCase();

		if (serviceTitle.includes(searchTerm) || serviceDescription.includes(searchTerm)) {
			card.style.display = 'block';
		} else {
			card.style.display = 'none';
		}
	});
}
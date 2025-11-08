// Функции для открытия/закрытия модального окна оплаты
function openPaymentModal(serviceName, servicePrice, serviceDescription) {
	// Устанавливаем данные услуги
	if (serviceName) {
		document.getElementById('serviceName').textContent = serviceName;
	}
	if (servicePrice) {
		const priceElements = document.querySelectorAll('#priceAmount, #summaryPrice, #totalAmount, #payAmount');
		priceElements.forEach(element => {
			element.textContent = servicePrice;
		});
	}
	if (serviceDescription) {
		document.querySelector('.service-details .service-description').textContent = serviceDescription;
	}
	
	// Показываем модальное окно
	document.getElementById('paymentOverlay').style.display = 'block';
	document.getElementById('paymentModal').classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
	document.getElementById('paymentOverlay').style.display = 'none';
	document.getElementById('paymentModal').classList.remove('active');
	document.body.style.overflow = '';
}

// Инициализация модального окна
document.addEventListener('DOMContentLoaded', function () {
	// Добавляем обработчик закрытия
	const closeBtn = document.getElementById('closePaymentBtn');
	const overlay = document.getElementById('paymentOverlay');
	
	if (closeBtn) {
		closeBtn.addEventListener('click', closePaymentModal);
	}
	if (overlay) {
		overlay.addEventListener('click', closePaymentModal);
	}
	
	// Закрытие по ESC
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			closePaymentModal();
		}
	});
	
	// Предотвращаем закрытие при клике на само модальное окно
	const modal = document.getElementById('paymentModal');
	if (modal) {
		modal.addEventListener('click', function(e) {
			e.stopPropagation();
		});
	}
	
	// Инициализация остальных функций оплаты
	initPaymentMethods();
	initPaymentForm();
	initPayButton();
});

// Обновляем функцию закрытия модального окна после оплаты
function closeModalAndRedirect() {
	const modal = document.querySelector('.payment-modal');
	if (modal) {
		modal.remove();
	}
	closePaymentModal();
	// Перенаправляем на главную страницу
	setTimeout(() => {
		window.location.href = '../index.html';
	}, 500);
}

// Функции для работы с оплатой
function initPaymentMethods() {
	const methodCards = document.querySelectorAll('.method-card');
	const paymentForms = document.querySelectorAll('.payment-form');

	methodCards.forEach(card => {
		card.addEventListener('click', function () {
			const method = this.getAttribute('data-method');

			// Убираем активный класс у всех карточек
			methodCards.forEach(c => c.classList.remove('active'));
			// Добавляем активный класс текущей карточке
			this.classList.add('active');

			// Скрываем все формы
			paymentForms.forEach(form => form.classList.remove('active'));
			// Показываем соответствующую форму
			const targetForm = document.getElementById(method + 'Form');
			if (targetForm) {
				targetForm.classList.add('active');
			}
		});
	});

	// По умолчанию выбираем первую карточку
	if (methodCards.length > 0) {
		methodCards[0].click();
	}
}

function initPaymentForm() {
	// Форматирование номера карты
	const cardNumberInput = document.getElementById('cardNumber');
	if (cardNumberInput) {
		cardNumberInput.addEventListener('input', function (e) {
			let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
			let formattedValue = '';

			for (let i = 0; i < value.length; i++) {
				if (i > 0 && i % 4 === 0) {
					formattedValue += ' ';
				}
				formattedValue += value[i];
			}

			e.target.value = formattedValue;
		});
	}

	// Форматирование срока действия
	const cardExpiryInput = document.getElementById('cardExpiry');
	if (cardExpiryInput) {
		cardExpiryInput.addEventListener('input', function (e) {
			let value = e.target.value.replace(/[^0-9]/gi, '');
			if (value.length >= 2) {
				value = value.substring(0, 2) + '/' + value.substring(2, 4);
			}
			e.target.value = value;
		});
	}

	// Ограничение CVC только цифрами
	const cardCvcInput = document.getElementById('cardCvc');
	if (cardCvcInput) {
		cardCvcInput.addEventListener('input', function (e) {
			e.target.value = e.target.value.replace(/[^0-9]/gi, '');
		});
	}

	// Валидация формы
	const paymentForm = document.getElementById('paymentForm');
	if (paymentForm) {
		paymentForm.addEventListener('submit', function (e) {
			e.preventDefault();
			processPayment();
		});
	}
}

function initPayButton() {
	const payButton = document.getElementById('payButton');
	if (payButton) {
		payButton.addEventListener('click', function () {
			processPayment();
		});
	}
}

function processPayment() {
	const payButton = document.getElementById('payButton');
	const originalText = payButton.innerHTML;

	// Показываем индикатор загрузки
	payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка платежа...';
	payButton.disabled = true;

	// Имитация процесса оплаты
	setTimeout(() => {
		const isSuccess = Math.random() > 0.1; // 90% успешных платежей для демонстрации

		if (isSuccess) {
			showSuccessMessage();
		} else {
			showErrorMessage();
		}

		// Восстанавливаем кнопку
		payButton.innerHTML = originalText;
		payButton.disabled = false;
	}, 3000);
}

function showSuccessMessage() {
	const modal = document.createElement('div');
	modal.className = 'payment-modal success';
	modal.innerHTML = `
		<div class="modal-content">
			<div class="modal-icon">
				<i class="fas fa-check-circle"></i>
			</div>
			<h3>Оплата прошла успешно!</h3>
			<p>Ваш заказ принят в обработку. В ближайшее время с вами свяжется наш специалист.</p>
			<div class="order-details">
				<div class="detail-item">
					<span>Номер заказа:</span>
					<strong>SO${Date.now().toString().slice(-6)}</strong>
				</div>
				<div class="detail-item">
					<span>Сумма:</span>
					<strong>${document.getElementById('totalAmount').textContent}</strong>
				</div>
			</div>
			<div class="modal-actions">
				<button class="modal-btn primary" onclick="closeModalAndRedirect()">Отлично!</button>
			</div>
		</div>
	`;

	document.body.appendChild(modal);
	document.body.style.overflow = 'hidden';
}

function showErrorMessage() {
	const modal = document.createElement('div');
	modal.className = 'payment-modal error';
	modal.innerHTML = `
		<div class="modal-content">
			<div class="modal-icon">
				<i class="fas fa-exclamation-circle"></i>
			</div>
			<h3>Ошибка оплаты</h3>
			<p>К сожалению, не удалось обработать платеж. Пожалуйста, проверьте данные карты или попробуйте другой способ оплаты.</p>
			<div class="modal-actions">
				<button class="modal-btn" onclick="closeModal()">Понятно</button>
			</div>
		</div>
	`;

	document.body.appendChild(modal);
	document.body.style.overflow = 'hidden';
}

function closeModal() {
	const modal = document.querySelector('.payment-modal');
	if (modal) {
		modal.remove();
		document.body.style.overflow = '';
	}
}

// Добавляем стили для модальных окон
const modalStyles = `
.payment-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	animation: fadeIn 0.3s ease;
}

.modal-content {
	background: white;
	padding: 40px;
	border-radius: 20px;
	text-align: center;
	max-width: 400px;
	width: 90%;
	animation: slideUp 0.3s ease;
}

@keyframes slideUp {
	from { transform: translateY(30px); opacity: 0; }
	to { transform: translateY(0); opacity: 1; }
}

.modal-icon {
	font-size: 64px;
	margin-bottom: 20px;
}

.success .modal-icon {
	color: #2ecc71;
}

.error .modal-icon {
	color: #e74c3c;
}

.modal-content h3 {
	color: #2c3e50;
	margin-bottom: 15px;
	font-size: 24px;
}

.modal-content p {
	color: #666;
	margin-bottom: 20px;
	line-height: 1.5;
}

.order-details {
	background: #f8f9fa;
	padding: 15px;
	border-radius: 8px;
	margin: 20px 0;
}

.detail-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 0;
}

.modal-actions {
	margin-top: 20px;
}

.modal-btn {
	padding: 12px 30px;
	border: none;
	border-radius: 8px;
	font-size: 16px;
	cursor: pointer;
	transition: all 0.3s ease;
}

.modal-btn.primary {
	background: #3498db;
	color: white;
}

.modal-btn:hover {
	transform: translateY(-1px);
}
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
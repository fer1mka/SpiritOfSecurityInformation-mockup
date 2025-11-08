// Функции для чата с исполнителем
document.addEventListener('DOMContentLoaded', function () {
	initChatSelection();
	initChatFunctionality();
	initFileUpload();
	initProjectActions();
});

function initChatSelection() {
	const chatItems = document.querySelectorAll('.chat-item');
	chatItems.forEach(item => {
		item.addEventListener('click', function () {
			// Убираем активный класс у всех чатов
			chatItems.forEach(chat => chat.classList.remove('active'));
			// Добавляем активный класс текущему чату
			this.classList.add('active');

			// Обновляем информацию о выбранном исполнителе
			const chatName = this.querySelector('.chat-name').textContent;
			const executorNameElement = document.querySelector('.executor-name');
			if (executorNameElement) {
				executorNameElement.textContent = chatName;
			}

			// Очищаем поле ввода при смене чата
			const chatInput = document.getElementById('chatInput');
			if (chatInput) {
				chatInput.value = '';
			}

			console.log('Загружаем историю чата:', chatName);
		});
	});
}

function initChatFunctionality() {
	const chatInput = document.getElementById('chatInput');
	const sendButton = document.getElementById('sendMessageBtn');
	const chatMessages = document.getElementById('chatMessages');

	if (chatInput && sendButton && chatMessages) {
		function sendMessage() {
			const messageText = chatInput.value.trim();

			if (messageText) {
				// Создаем элемент сообщения пользователя
				const messageElement = createMessageElement('user', messageText, getCurrentTime());

				// Добавляем сообщение в чат
				chatMessages.appendChild(messageElement);

				// Очищаем поле ввода
				chatInput.value = '';

				// Прокручиваем к последнему сообщению
				scrollToBottom();

				// Показываем индикатор набора текста исполнителем
				showTypingIndicator();

				// Имитируем ответ исполнителя через случайную задержку
				setTimeout(() => {
					// Убираем индикатор набора
					removeTypingIndicator();

					// Генерируем ответ исполнителя
					const responseText = generateExecutorResponse(messageText);
					const responseElement = createMessageElement('support', responseText, getCurrentTime(), 'Алексей');

					// Добавляем ответ в чат
					chatMessages.appendChild(responseElement);

					// Прокручиваем к последнему сообщению
					scrollToBottom();

					// Обновляем превью в списке чатов
					updateChatPreview(messageText);

				}, getRandomDelay(1000, 3000));
			}
		}

		// Обработчик клика по кнопке отправки
		sendButton.addEventListener('click', sendMessage);

		// Обработчик нажатия Enter в поле ввода
		chatInput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				sendMessage();
			}
		});

		// Автофокус на поле ввода
		chatInput.focus();
	}
}

function createMessageElement(type, text, time, sender = null) {
	const messageDiv = document.createElement('div');
	messageDiv.className = `message ${type}`;

	if (type === 'support') {
		messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user-tie"></i>
            </div>
            <div class="message-content">
                <div class="message-sender">${sender}</div>
                <div class="message-text">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
	} else {
		messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
	}

	return messageDiv;
}

function showTypingIndicator() {
	const chatMessages = document.getElementById('chatMessages');
	const typingIndicator = document.createElement('div');
	typingIndicator.className = 'message support typing-indicator';
	typingIndicator.id = 'typingIndicator';
	typingIndicator.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="message-content">
            <div class="message-sender">Алексей</div>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

	chatMessages.appendChild(typingIndicator);
	scrollToBottom();
}

function removeTypingIndicator() {
	const typingIndicator = document.getElementById('typingIndicator');
	if (typingIndicator) {
		typingIndicator.remove();
	}
}

function generateExecutorResponse(userMessage) {
	const responses = [
		"Понял ваш вопрос. Давайте разберемся детальнее.",
		"Спасибо за уточнение! Учту это в работе.",
		"Отличный вопрос! Как раз сейчас работаю над этим.",
		"По этому вопросу могу сказать следующее...",
		"Да, я уже занимаюсь этим. Результаты скоро будут готовы.",
		"Хорошо, приму к сведению. Продолжаем работу.",
		"По вашей проблеме: уже нашел несколько решений.",
		"Спасибо за информацию! Это поможет ускорить процесс.",
		"Понимаю вашу озабоченность. Работаю в приоритетном порядке.",
		"Отлично! Жду следующих уточнений по проекту."
	];

	// Простая логика ответов на основе ключевых слов
	const lowerMessage = userMessage.toLowerCase();

	if (lowerMessage.includes('когда') || lowerMessage.includes('срок')) {
		return "Предварительный отчет будет готов к пятнице. Сейчас завершаю основные проверки.";
	} else if (lowerMessage.includes('проблем') || lowerMessage.includes('ошибк')) {
		return "Пока серьезных проблем не обнаружено. Есть несколько minor issues, которые легко исправить.";
	} else if (lowerMessage.includes('отчет') || lowerMessage.includes('результат')) {
		return "Отчет будет содержать детальный анализ всех модулей и рекомендации по исправлению уязвимостей.";
	} else if (lowerMessage.includes('стоимость') || lowerMessage.includes('цена')) {
		return "Стоимость услуг остается неизменной, согласно нашему договору.";
	} else {
		// Случайный ответ из общего пула
		return responses[Math.floor(Math.random() * responses.length)];
	}
}

function updateChatPreview(lastMessage) {
	const activeChat = document.querySelector('.chat-item.active');
	if (activeChat) {
		const previewElement = activeChat.querySelector('.chat-preview');
		const timeElement = activeChat.querySelector('.chat-time');

		if (previewElement) {
			previewElement.textContent = lastMessage.length > 40 ?
				lastMessage.substring(0, 40) + '...' : lastMessage;
		}

		if (timeElement) {
			timeElement.textContent = getCurrentTime();
		}
	}
}

function getCurrentTime() {
	const now = new Date();
	return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getRandomDelay(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scrollToBottom() {
	const chatMessages = document.getElementById('chatMessages');
	if (chatMessages) {
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}
}

function initFileUpload() {
	const attachFileBtn = document.getElementById('attachFileBtn');
	const fileActionBtn = document.querySelector('.action-btn .fa-paperclip')?.closest('.action-btn');

	[attachFileBtn, fileActionBtn].forEach(btn => {
		if (btn) {
			btn.addEventListener('click', function () {
				const fileInput = document.createElement('input');
				fileInput.type = 'file';
				fileInput.style.display = 'none';
				fileInput.multiple = true;

				fileInput.addEventListener('change', function (e) {
					const files = e.target.files;
					if (files.length > 0) {
						// В реальном приложении здесь была бы загрузка файлов
						const chatInput = document.getElementById('chatInput');
						if (chatInput) {
							chatInput.value = `Прикреплено файлов: ${files.length} (в реальном приложении файлы будут загружены)`;
						}
					}
				});

				document.body.appendChild(fileInput);
				fileInput.click();
				document.body.removeChild(fileInput);
			});
		}
	});
}

function initProjectActions() {
	const infoButtons = document.querySelectorAll('.action-btn');
	infoButtons.forEach(btn => {
		if (btn.querySelector('.fa-info-circle')) {
			btn.addEventListener('click', function () {
				alert('Информация о проекте:\n\nПроект: Анализ кода на уязвимости\nСтатус: В работе\nСрок сдачи: 19 января 2024\nПрогресс: 65%');
			});
		}

		if (btn.querySelector('.fa-cog')) {
			btn.addEventListener('click', function () {
				alert('Настройки чата:\n\n- Уведомления о новых сообщениях\n- Звуковые оповещения\n- Автосохранение черновиков');
			});
		}
	});
}
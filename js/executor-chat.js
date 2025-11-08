// Функции для чата с исполнителем
document.addEventListener('DOMContentLoaded', function () {
	initChatSelection();
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

			// Здесь будет загрузка истории чата
			const chatName = this.querySelector('.chat-name').textContent;
			console.log('Загружаем историю чата:', chatName);
		});
	});
}

function initFileUpload() {
	const fileButtons = document.querySelectorAll('.tool-btn, .action-btn');
	fileButtons.forEach(btn => {
		if (btn.querySelector('.fa-paperclip')) {
			btn.addEventListener('click', function () {
				// Создаем скрытый input для загрузки файлов
				const fileInput = document.createElement('input');
				fileInput.type = 'file';
				fileInput.style.display = 'none';
				fileInput.multiple = true;

				fileInput.addEventListener('change', function (e) {
					const files = e.target.files;
					if (files.length > 0) {
						alert(`Выбрано файлов: ${files.length}\nВ реальном приложении файлы будут загружены на сервер.`);
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
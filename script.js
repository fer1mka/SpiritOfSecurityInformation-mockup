// Навигация
document.addEventListener('DOMContentLoaded', function() {
    // Подсветка активной ссылки в навигации
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Валидация пароля при регистрации
    const passwordInput = document.getElementById('reg-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            
            strengthBar.style.width = strength + '%';
            
            if (strength < 50) {
                strengthBar.style.background = '#e74c3c';
                strengthText.textContent = 'Слабый пароль';
            } else if (strength < 75) {
                strengthBar.style.background = '#f39c12';
                strengthText.textContent = 'Средний пароль';
            } else {
                strengthBar.style.background = '#2ecc71';
                strengthText.textContent = 'Надежный пароль';
            }
        });
    }

    // Обработка формы регистрации
    const registerForm = document.querySelector('.auth-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            
            if (password !== confirm) {
                alert('Пароли не совпадают!');
                return;
            }
            
            // Здесь будет отправка формы на сервер
            alert('Регистрация успешно завершена!');
            window.location.href = 'login.html';
        });
    }
});

// Фильтрация отзывов
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Обновляем активную кнопку
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Фильтруем отзывы
                reviewCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const cardType = card.getAttribute('data-type');
                        card.style.display = cardType === filter ? 'block' : 'none';
                    }
                });
            });
        });
    }
    
    // Рейтинг в форме отзыва
    const ratingStars = document.querySelectorAll('.rating-input i');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            const container = this.parentElement;
            
            // Сбрасываем все звезды
            container.querySelectorAll('i').forEach(s => {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            });
            
            // Заполняем звезды до выбранной
            container.querySelectorAll('i').forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                }
            });
        });
    });
    
    // Переключение между вкладками техподдержки
    const supportButtons = document.querySelectorAll('.support-button');
    const supportContainers = document.querySelectorAll('.support-content > div');
    
    if (supportButtons.length > 0) {
        supportButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const tab = this.getAttribute('data-tab');
                
                // Обновляем активные кнопки
                supportButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Показываем соответствующий контейнер
                supportContainers.forEach(container => {
                    container.classList.remove('active');
                    if (container.id === tab + '-tab') {
                        container.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Отправка сообщений в чатах
    const sendButtons = document.querySelectorAll('.send-button');
    sendButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.chat-input');
            const message = input.value.trim();
            
            if (message) {
                const messagesContainer = this.closest('.chat-container').querySelector('.chat-messages') ||
                                        this.closest('.executor-chat-container').querySelector('.executor-chat-messages');
                
                const newMessage = document.createElement('div');
                newMessage.className = 'message user';
                newMessage.innerHTML = `
                    <div class="message-content">
                        <div class="message-text">${message}</div>
                        <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                `;
                
                messagesContainer.appendChild(newMessage);
                
                // Очищаем поле ввода
                input.value = '';
                
                // Прокручиваем к новому сообщению
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        });
    });
    
    // Обработка нажатия Enter в полях ввода чата
    const chatInputs = document.querySelectorAll('.chat-input');
    chatInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const sendButton = this.parentElement.querySelector('.send-button');
                sendButton.click();
            }
        });
    });
});
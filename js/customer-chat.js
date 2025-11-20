// Функции для чата с заказчиком
document.addEventListener('DOMContentLoaded', function () {
    initChat();
    initFileUpload();
});

function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'executor');
            chatInput.value = '';
            
            // Имитация ответа заказчика
            setTimeout(() => {
                const responses = [
                    "Спасибо за информацию!",
                    "Понятно, жду отчет.",
                    "Есть ли какие-то вопросы по проекту?",
                    "Хорошо, буду на связи."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'customer');
            }, 2000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' + 
                    now.getMinutes().toString().padStart(2, '0');
        
        if (sender === 'customer') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <div class="message-sender">Иван Иванов</div>
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
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Инициализация списка чатов
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function () {
            chatItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Здесь можно загрузить историю чата для выбранного заказчика
            showNotification('Загрузка истории чата...', 'info');
        });
    });
}

function initFileUpload() {
    const attachFileBtn = document.getElementById('attachFileBtn');
    
    attachFileBtn.addEventListener('click', function () {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx,.txt,.py,.js,.html,.css';
        
        fileInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                showNotification(`Файл "${file.name}" успешно прикреплен!`, 'success');
                
                // Здесь можно добавить логику для отправки файла
                // addFileMessage(file.name, file.size);
            }
        });
        
        fileInput.click();
    });
}

function addFileMessage(fileName, fileSize) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message executor';
    
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                now.getMinutes().toString().padStart(2, '0');
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">
                <i class="fas fa-paperclip"></i>
                Прикреплен файл: ${fileName}
                <div style="font-size: 12px; color: #666; margin-top: 5px;">
                    Размер: ${formatFileSize(fileSize)}
                </div>
            </div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
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
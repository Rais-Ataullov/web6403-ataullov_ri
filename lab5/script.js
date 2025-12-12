// Класс для хранения данных формы
class UserData {
    constructor(username, email, password, favoritePlayer, newsletter, terms) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.favoritePlayer = favoritePlayer;
        this.newsletter = newsletter;
        this.terms = terms;
    }

    // Метод форматированного вывода в консоль
    logToConsole() {
        console.log("=== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ===");
        console.log(`Имя пользователя: ${this.username}`);
        console.log(`Email: ${this.email}`);
        console.log(`Пароль: ${this.password}`);
        console.log(`Любимый игрок: ${this.getPlayerName(this.favoritePlayer)}`);
        console.log(`Подписка на рассылку: ${this.newsletter ? 'Да' : 'Нет'}`);
        console.log(`Согласие с условиями: ${this.terms ? 'Да' : 'Нет'}`)
    }

    // Вспомогательный метод для получения имени игрока
    getPlayerName(playerKey) {
        const players = {
            'muller': 'Томас Мюллер',
            'kimmich': 'Йозуа Киммих',
            'neuer': 'Мануэль Нойер',
            'musiala': 'Джамал Мусиала',
            'kane': 'Гарри Кейн'
        };
        return players[playerKey] || 'Не указан';
    }
}


// Динамическая проверка данных формы с выводом подсказок
function setupFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    // Элементы формы
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const favoritePlayerSelect = document.getElementById('favoritePlayer');
    const termsCheckbox = document.getElementById('terms');

    // Контейнеры для подсказок
    createHintContainers();

    // Валидация имени пользователя
    usernameInput.addEventListener('input', function() {
        const value = this.value.trim();
        const hintElement = document.getElementById('username-hint');
        
        if (value.length === 0) {
            showHint(hintElement, 'Введите имя пользователя', 'error');
        } else if (value.length < 3) {
            showHint(hintElement, 'Имя должно содержать минимум 3 символа', 'error');
        } else if (!/^[a-zA-Zа-яА-Я0-9_]+$/.test(value)) {
            showHint(hintElement, 'Допустимы только буквы, цифры и подчеркивание', 'error');
        } else {
            showHint(hintElement, '✓ Имя пользователя корректно', 'success');
        }
    });

    // Валидация email
    emailInput.addEventListener('input', function() {
        const value = this.value.trim();
        const hintElement = document.getElementById('email-hint');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value.length === 0) {
            showHint(hintElement, 'Введите email адрес', 'error');
        } else if (!emailRegex.test(value)) {
            showHint(hintElement, 'Введите корректный email (например: user@example.com)', 'error');
        } else {
            showHint(hintElement, '✓ Email корректный', 'success');
        }
    });

    // Валидация пароля
    passwordInput.addEventListener('input', function() {
        const value = this.value;
        const hintElement = document.getElementById('password-hint');
        
        if (value.length === 0) {
            showHint(hintElement, 'Введите пароль', 'error');
        } else if (value.length < 6) {
            showHint(hintElement, 'Пароль должен содержать минимум 6 символов', 'error');
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            showHint(hintElement, 'Пароль должен содержать буквы в верхнем и нижнем регистре и цифры', 'error');
        } else {
            showHint(hintElement, '✓ Пароль надежный', 'success');
        }
    });

    // Валидация выбора игрока
    favoritePlayerSelect.addEventListener('change', function() {
        const hintElement = document.getElementById('player-hint');
        if (this.value === '') {
            showHint(hintElement, 'Выберите любимого игрока', 'error');
        } else {
            showHint(hintElement, `Вы выбрали: ${getPlayerName(this.value)}`, 'success');
        }
    });

    // Валидация согласия с условиями
    termsCheckbox.addEventListener('change', function() {
        const hintElement = document.getElementById('terms-hint');
        if (!this.checked) {
            showHint(hintElement, 'Для регистрации необходимо согласие с условиями', 'error');
        } else {
            showHint(hintElement, '✓ Согласие получено', 'success');
        }
    });

    // Функция для создания контейнеров подсказок
    function createHintContainers() {
        const fields = [
            { id: 'username', label: 'Имя пользователя' },
            { id: 'email', label: 'Email' },
            { id: 'password', label: 'Пароль' },
            { id: 'player', label: 'Любимый игрок' },
            { id: 'terms', label: 'Согласие с условиями' }
        ];

        fields.forEach(field => {
            const inputElement = document.getElementById(field.id);
            if (inputElement) {
                const hintElement = document.createElement('div');
                hintElement.id = `${field.id}-hint`;
                hintElement.className = 'form__hint';
                inputElement.parentNode.appendChild(hintElement);
            }
        });
    }

    // Функция для отображения подсказок
    function showHint(element, message, type) {
        if (!element) return;
        
        element.textContent = message;
        element.className = 'form__hint';
        
        if (type === 'error') {
            element.classList.add('form__hint--error');
        } else if (type === 'success') {
            element.classList.add('form__hint--success');
        }
    }
}

// Отправка данных формы на сервер через POST-запрос
async function submitFormToServer(formData) {
    const apiUrl = 'http://localhost:8000/users'; // URL для отправки данных
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();
        console.log('Данные успешно отправлены на сервер:', data);
        return data;
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        throw error;
    }
}

// Асинхронное получение данных с сервера с обработкой ошибок
async function fetchDataFromServer() {
    const apiUrl = 'http://localhost:8000/users'; // URL для получения данных
    
    try {
        console.log('Выполняется запрос данных с сервера...');
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Данные успешно получены с сервера:', data);
        
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error);

        showNotification(`Ошибка загрузки данных: ${error.message}`, 'error');
        
        throw error;
    }
}

// Периодическое получение данных (раз в 5 минут)
function setupPeriodicDataFetch() {
    const interval = 5 * 60 * 1000;
    setInterval(() => {
        fetchDataFromServer();
    }, interval);
    
    console.log(`Периодическое обновление данных настроено (интервал: 5 минут)`);
}

// Вспомогательные функции
function getPlayerName(playerKey) {
    const players = {
        'muller': 'Томас Мюллер',
        'kimmich': 'Йозуа Киммих',
        'neuer': 'Мануэль Нойер',
        'musiala': 'Джамал Мусиала',
        'kane': 'Гарри Кейн'
    };
    return players[playerKey] || 'Не указан';
}

function showNotification(message, type) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Удаляем через 5 секунд
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Основная функция инициализации
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    // Настраиваем динамическую валидацию формы
    setupFormValidation();
    
    // Настраиваем периодическое получение данных
    setupPeriodicDataFetch();
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Получаем данные из формы
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const favoritePlayer = document.getElementById('favoritePlayer').value;
            const newsletter = document.getElementById('newsletter').checked;
            const terms = document.getElementById('terms').checked;
            
            // Проверяем обязательные поля
            if (!username || !email || !password || !terms) {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // Проверяем валидность email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Проверяем длину пароля
            if (password.length < 6) {
                showNotification('Пароль должен содержать минимум 6 символов', 'error');
                return;
            }
            
            // Создаем объект пользователя
            const user = new UserData(username, email, password, favoritePlayer, newsletter, terms);
            
            // Выводим данные в консоль
            user.logToConsole();
            
            try {
                // Отправляем данные на сервер
                showNotification('Отправка данных на сервер...', 'info');
                await submitFormToServer({
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    favoritePlayer: user.favoritePlayer,
                    favoritePlayerName: user.getPlayerName(user.favoritePlayer),
                    newsletter: user.newsletter,
                    terms: user.terms,
                    registrationDate: new Date().toISOString()
                });
                
                showNotification(`Спасибо за регистрацию, ${username}! Данные успешно отправлены.`, 'success');
                
                // Очищаем форму
                registrationForm.reset();
                
                // Обновляем данные с сервера
                await fetchDataFromServer();
                
            } catch (error) {
                console.error('Ошибка при регистрации:', error);
                showNotification('Произошла ошибка при регистрации. Попробуйте еще раз.', 'error');
            }
        });
    }
});

// Добавляем CSS стили для подсказок и уведомлений
const style = document.createElement('style');
style.textContent = `
    .form__hint {
        font-size: 12px;
        margin-top: 4px;
        padding: 4px 8px;
        border-radius: 4px;
        display: none;
    }
    
    .form__hint--error {
        display: block;
        color: #d32f2f;
        background-color: #ffebee;
        border-left: 3px solid #d32f2f;
    }
    
    .form__hint--success {
        display: block;
        color: #388e3c;
        background-color: #e8f5e9;
        border-left: 3px solid #388e3c;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification--success {
        background-color: #4caf50;
    }
    
    .notification--error {
        background-color: #f44336;
    }
    
    .notification--info {
        background-color: #2196f3;
    }
    
    .user-count {
        background-color: #f5f5f5;
        padding: 10px 15px;
        border-radius: 4px;
        margin: 20px 0;
        text-align: center;
        font-weight: bold;
        color: #333;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);
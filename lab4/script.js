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

// Обработчик отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Получаем данные из формы
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const favoritePlayer = document.getElementById('favoritePlayer').value;
            const newsletter = document.getElementById('newsletter').checked;
            const terms = document.getElementById('terms').checked;
            
            // Создаем объект пользователя
            const user = new UserData(username, email, password, favoritePlayer, newsletter, terms);
            
            // Выводим данные в консоль
            user.logToConsole();
            
            // Показываем сообщение об успешной регистрации
            alert(`Спасибо за регистрацию, ${username}! Ваши данные были записаны в консоль.`);
            
            // Очищаем форму
            registrationForm.reset();
        });
    }
});
### Необходимые требования
При необходимости установить serve:
npm install --global serve
или использовать аналогичный сервер.

### Установка и запуск проекта
1. Склонируйте данный репозиторий к себе на диск.
2. Для запуска приложения из директории game_pair выполните
команду npx serve и откройте браузер по
адресу http://localhost:3000/.
Или команду npx serve -l ***(где *** это номер порта).
Например npx serve -l 5000 и откройте браузер по
адресу http://localhost:5000/.

### Начальное состояние игры при открытии в браузере
Перед игрой можно настроить количество карточек на поле и
доступно выбрать время таймера по истечении которого игра завершается,
даже если ещё не открыты все карточки.

### Ход игры
Игрок может нажать на любую карточку. После нажатия карточка открывается —
появляется символ (карточка переворачивается). Далее игрок может открыть вторую карточку.
Если открытые карточки содержат одинаковые символы, они подсвечиваются и остаются открытыми до конца игры.
Если вторая карточка отличается от первой, обе карточки закрываются, как только игрок откроет новую карточку.
На поле остаются открытыми только найденные пары и 1-2 карточки, которые открывает игрок.

### Конец игры
Как только игрок открыл все пары на поле, игра считается завершённой.
Под полем с открытыми карточками появляется кнопка «Сыграть ещё раз»,
при нажатии на которую игра сбрасывается до начального состояния.

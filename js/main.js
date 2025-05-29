import { getArrPair, mixArray } from './array.js';
import AmazingCard from './card.js';

// container
const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

const timerSet = document.createElement('span');
timerSet.classList.add('span-timer');
timerSet.textContent = '';
container.append(timerSet);

// form-box
const formBox = document.createElement('form');
formBox.classList.add('form-box');

const formTitle = document.createElement('h2');
formTitle.classList.add('form-title');
formTitle.textContent = 'Количество карточек';

// ---
const formBoxNumber = document.createElement('div');
formBoxNumber.classList.add('form-box-number');

const arrNumber = [2, 4, 6, 8];
for (const number of arrNumber) {
  const radioNumber = document.createElement('input');
  radioNumber.classList.add('form-radio-number');
  radioNumber.setAttribute('type', 'radio');
  radioNumber.setAttribute('name', 'number');
  radioNumber.setAttribute('value', `${number}`);
  radioNumber.setAttribute('id', `id-radio-number-${number}`);
  if (number === 4) {
    radioNumber.checked = true;
  }
  formBoxNumber.append(radioNumber);

  const labelNumber = document.createElement('label');
  labelNumber.classList.add('form-label-number');
  labelNumber.setAttribute('for', `id-radio-number-${number}`);
  labelNumber.textContent = `${number * number}`;
  formBoxNumber.append(labelNumber);
}

// ---
const formTitleTimer = document.createElement('h3');
formTitleTimer.classList.add('form-title-timer');
formTitleTimer.textContent = 'Игра с таймером';

const formBoxTimer = document.createElement('div');
formBoxTimer.classList.add('form-box-timer');

const arrTimer = [0, 1, 3, 5, 10];
for (const timer of arrTimer) {
  const radioTimer = document.createElement('input');
  radioTimer.classList.add('form-radio-timer');
  radioTimer.setAttribute('type', 'radio');
  radioTimer.setAttribute('name', 'timer');
  radioTimer.setAttribute('value', `${timer}`);
  radioTimer.setAttribute('id', `id-radio-timer-${timer}`);
  if (timer === 0) {
    radioTimer.checked = true;
  }

  const labelTimer = document.createElement('label');
  labelTimer.classList.add('form-label-timer');
  labelTimer.setAttribute('for', `id-radio-timer-${timer}`);
  labelTimer.textContent = ` ${timer} мин.`;
  if (timer === 0) {
    labelTimer.textContent = 'Без таймера';
  }

  const wrapTimer = document.createElement('div');
  wrapTimer.classList.add('form-wrap-timer');


  wrapTimer.append(radioTimer);
  wrapTimer.append(labelTimer);
  formBoxTimer.append(wrapTimer);
}

// ---

const formBtn = document.createElement('button');
formBtn.classList.add('form-btn', 'btn-reset');
formBtn.textContent = 'Начать игру';

container.append(formBox);
formBox.append(formTitle);
formBox.append(formBoxNumber);
formBox.append(formTitleTimer);
formBox.append(formBoxTimer);
formBox.append(formBtn);

// card-box div
const cardBox = document.createElement('div');
cardBox.classList.add('card-box');
container.append(cardBox);

// form endBox
const endBox = document.createElement('div');
const endBtn = document.createElement('button');
endBtn.classList.add('end-btn');
endBtn.textContent = 'Сыграть ещё раз';

container.append(endBox);
endBox.append(endBtn);
// пока скрываем
endBox.classList.add('end-form', 'visually-hidden');

// ----------------------------------- //

// всего карт
let cardTotal = 0;

// переменные для "клика" по карточке
let arrOpen = [];
let countFind = 0;

// id таймера
let idTimer = null;

// начать игру //
// ------------//

formBox.addEventListener('submit', (e) => {
  // это предотвращает перезагрузку страницы
  e.preventDefault();

  // скрываем formBox
  formBox.classList.add('visually-hidden');

  // определяем кол-во карточек в ряду

  const cardNumRow = Number(document.querySelector("input[type='radio'][name=number]:checked").value);

  // всего карточек
  cardTotal = cardNumRow * cardNumRow;

  // массив с числами
  let arrPair = getArrPair(cardTotal);
  mixArray(arrPair);

  // добавляем ul в container
  const cardItems = document.createElement('ul');
  cardItems.classList.add('list-reset', 'card-items', `card-items-size-${cardNumRow}`);
  cardBox.append(cardItems);

  // добавляем в ul li с обработчиком "клика"
  for (let i = 0; i < cardTotal; i++) {
    new AmazingCard(cardItems, cardNumRow, arrPair[i], clickItem);
  }

  const count = Number(document.querySelector("input[type='radio'][name=timer]:checked").value);

  if (count !== 0) {
    startTimer(count);
  }
});

// клик по карте
function clickItem(cardItem) {
  // все карты найдены ничего не делаем
  if (cardTotal === countFind) {
    return;
  }

  // карта открыта ничего не делаем
  if (cardItem.open) {
    return;
  }

  // открываем карту
  cardItem.setFace();
  cardItem.open = true;

  // здесь проверяем arrOpen

  // уже есть одна открытая карта
  if (arrOpen.length === 1) {
    // карты совпали
    if (arrOpen[0].num === cardItem.num) {
      arrOpen[0].setFind();
      cardItem.setFind();
      arrOpen.length = 0;
      countFind += 2;
      // все карточки найдены и открыты
      if (cardTotal === countFind) {
        setTimeout(() => {
          endBox.classList.remove('visually-hidden');
        }, 800);
        if (idTimer) {
          clearInterval(idTimer);
          idTimer = null;
          setTimeout(() => {
            timerSet.textContent = 'Вы выйграли!';
          }, 800);
        }
      }
      return;
    }
  // уже есть две карты - они точно не одинаковые
  } else if (arrOpen.length === 2) {
    arrOpen[0].open = false;
    arrOpen[0].setShirt();
    arrOpen[1].open = false;
    arrOpen[1].setShirt();
    arrOpen.length = 0;
  }

  // добавляем если в массиве 0 или 1 не одинаковая
  arrOpen.push(cardItem);
}

// сбрасываем
endBox.addEventListener('click', () => {
  // уничтожаем что создаётся при событии на форме
  // доступно выбрать кол-во карточек и таймер
  arrOpen.length = 0;
  countFind = 0;

  cardBox.innerHTML = '';

  timerSet.textContent = '';

  formBox.classList.remove('visually-hidden');
  endBox.classList.add('visually-hidden');
});

// таймер
function startTimer(count = 1) {
  // на сколько минут ставим таймер

  // запоминаем время
  const startTime = new Date();
  // получаем время окончания таймера
  const stopTime = startTime.setMinutes(startTime.getMinutes() + count);

  // отправляем значение таймера на страницу
  timerSet.textContent = 'Осталось времени: ' + count + ':00';

  idTimer = setInterval(() => {
    // текущее время
    const now = new Date().getTime();
    // осталось до конца таймера
    const remain = stopTime - now;
    // переводим миллисекунды в минуты и секунды
    const min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
    let sec = Math.floor( (remain % (1000 * 60)) / 1000 );
    // если значение текущей секунды меньше 10, добавляем ноль
    sec = sec < 10 ? "0" + sec : sec;
    // отправляем значение таймера на страницу
    timerSet.textContent = 'Осталось времени: ' + min + ':' + sec;
    // если время вышло
    if (remain < 0) {
      // останавливаем отсчёт
      clearInterval(idTimer);
      idTimer = null;
      timerSet.textContent = 'Время вышло!';
      // не даём переворачивать карты
      countFind = cardTotal;

      endBox.classList.remove('visually-hidden');
    }
  }, 1000);
}

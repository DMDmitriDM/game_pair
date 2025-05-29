class Card {
  constructor(container, cardNumRow, cardNum, flip) {
    this.cardItem = this.createCard(container, cardNumRow, flip);
    this.num = cardNum;
    this.open = false;
    this.setShirt();
  }

  createCard(container, cardNumRow, flip) {
    const cardItem = document.createElement('li');
    cardItem.classList.add('card-item', `card-item-size-${cardNumRow}`);
    container.append(cardItem);

    cardItem.addEventListener('click', () => {
      // Передаём в колбэк-функцию экземпляр класса.
      flip(this);
   })

    return cardItem;
  }

  /**
  * @param { num } number
  */
  set num(number) {
    this._num = number;
  }

  get num() {
    return this._num;
  }

  set open(value) {
    this._open = value;
  }

  get open() {
    return this._open;
  }

  setShirt() {
    this.cardItem.textContent = '?';
  }

  setFace() {
    this.cardItem.textContent = this.num;
  }

  setFind() {
    this.cardItem.classList.add('card-item-finded');
  }

  deleteFind() {
    this.cardItem.classList.remove('card-item-finded');
  }
}

export default class AmazingCard extends Card {
  /**
  * @param { num } number
  */
  set num(number) {
    this._num = number;

    const shirt = document.createElement('img');
    shirt.classList.add('img-max');
    shirt.id = 'id-shirt';
    const face = document.createElement('img');
    face.classList.add('img-max')
    face.id = 'id-face';

    shirt.src = './img/shirt.ico';
    shirt.onerror = () => {
      shirt.alt = '?';

      console.error('No load img shirt!');
    };

    face.src = `./img/${number}.ico`;
    face.onerror = () => {
      face.alt = `Карта ${number}`;

      console.error('No load img face!');
    };

    const card = document.createElement('div');
    card.classList.add('card');

    const cardShirt = document.createElement('div');
    cardShirt.classList.add('card-shirt');

    const cardFace = document.createElement('div');
    cardFace.classList.add('card-face');

    cardShirt.append(shirt);
    cardFace.append(face);
    card.append(cardShirt);
    card.append(cardFace);

    this.cardItem.append(card);
  }

  get num() {
    return this._num;
  }

  setShirt() {
    this.cardItem.children[0].classList.remove('flip');
  }

  setFace() {
    this.cardItem.children[0].classList.add('flip');
  }

  setFind() {
    setTimeout(() => {
      this.cardItem.classList.add('card-item-finded');
    }, 800);
  }
}

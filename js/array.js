// фунциия получения массива
  export function getArrPair(count) {
    let num = 0;
    const arr =[];
    for (let i = 0; i < count; i++) {
      if (i % 2 == 0) {
        num += 1;
      }
      arr.push(num);
    }
    return arr;
  }

  // Тасование Фишера — Йетса
  // function mixArr(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     // случайный индекс от 0 до i
  //     let j = Math.floor(Math.random() * (i + 1));
  //     // let t = array[i]; array[i] = array[j]; array[j] = t
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // }

  // Тасование Бармалея
  export function mixArray(arr) {
    const count = arr.length;
    for (let i = 0; i < count; i++) {
      // случайный индекс от 0 до count
      const x = Math.floor(Math.random() * (count));
      let temp = arr[i];
      arr[i] = arr[x];
      arr[x] = temp;
    }
  }

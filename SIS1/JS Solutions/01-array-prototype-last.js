// https://leetcode.com/problems/array-prototype-last/
// Метод last() возвращает последний элемент массива или -1, если массив пуст.
Array.prototype.last = function () {
  return this.length === 0 ? -1 : this[this.length - 1];
};

// const arr = [1, 2, 3];
// arr.last(); // 3

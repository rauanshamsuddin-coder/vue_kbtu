// https://leetcode.com/problems/filter-elements-from-array/
// Фильтрация без Array.filter: оставляем элементы, для которых fn(элемент, индекс) истинно.
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      result.push(arr[i]);
    }
  }
  return result;
};

// filter([0, 10, 20, 30], (n) => n > 10); // [20, 30]
// filter([1, 2, 3], (n, i) => i === 0);   // [1]

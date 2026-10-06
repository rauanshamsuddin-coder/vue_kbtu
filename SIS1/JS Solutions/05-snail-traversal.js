// https://leetcode.com/problems/snail-traversal/
// Превращает одномерный массив в матрицу rowsCount x colsCount,
// заполняя её «улиткой»: колонки идут слева направо,
// нечётные колонки заполняются снизу вверх.
/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function (rowsCount, colsCount) {
  if (rowsCount * colsCount !== this.length) return [];

  const matrix = Array.from({ length: rowsCount }, () => new Array(colsCount));

  for (let i = 0; i < this.length; i++) {
    const col = Math.floor(i / rowsCount);
    const offset = i % rowsCount;
    const row = col % 2 === 0 ? offset : rowsCount - 1 - offset;
    matrix[row][col] = this[i];
  }

  return matrix;
};

// [1, 2, 3, 4].snail(1, 4); // [[1, 2, 3, 4]]
// [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
//   .snail(5, 4);
// [[19, 17, 16, 15], [10, 1, 14, 4], [3, 2, 12, 20], [7, 5, 18, 11], [9, 8, 6, 13]]

// https://leetcode.com/problems/join-two-arrays-by-id/
// Объединяет два массива объектов по полю id.
// Результат отсортирован по id по возрастанию.
// Если id есть в обоих массивах, поля объединяются, значения из arr2 перезаписывают arr1.
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  const byId = new Map();

  for (const item of arr1) {
    byId.set(item.id, item);
  }
  for (const item of arr2) {
    byId.set(item.id, byId.has(item.id) ? { ...byId.get(item.id), ...item } : item);
  }

  return [...byId.values()].sort((a, b) => a.id - b.id);
};

// join([{ id: 1, x: 1 }, { id: 2, x: 9 }], [{ id: 3, x: 5 }]);
// [{ id: 1, x: 1 }, { id: 2, x: 9 }, { id: 3, x: 5 }]

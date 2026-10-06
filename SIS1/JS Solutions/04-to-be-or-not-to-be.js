// https://leetcode.com/problems/to-be-or-not-to-be/
// expect(val) возвращает объект с методами toBe и notToBe.
/**
 * @param {string} val
 * @return {Object}
 */
var expect = function (val) {
  return {
    toBe: (other) => {
      if (val !== other) throw new Error('Not Equal');
      return true;
    },
    notToBe: (other) => {
      if (val === other) throw new Error('Equal');
      return true;
    },
  };
};

// expect(5).toBe(5);    // true
// expect(5).notToBe(5); // выбросит Error("Equal")

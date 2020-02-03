const {
  milesToFeet,
  hoursToSeconds,
  calculateVehicleLength,
  correctForCosineError
} = require('../daemon/utils');


test('Can convert hours to seconds', () => {
  expect(hoursToSeconds(1)).toBe(3600);
});

test('Can convert miles to feet', () => {
  expect(milesToFeet(1)).toBe(5280);
});

test('Can calculate vehicle length', () => {
  expect(Math.floor(calculateVehicleLength(35, 0.25))).toBe(12);
});

test('Can correct cosine error', () => {
  expect(Math.round(correctForCosineError(40, 20 + 10))).toBe(43);
})

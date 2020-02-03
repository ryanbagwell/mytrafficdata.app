const {
  milesToFeet,
  hoursToSeconds,
  calculateVehicleLength
} = require('../utils');


test('Can convert hours to seconds', () => {
  expect(hoursToSeconds(1)).toBe(3600);
});

test('Can convert miles to feet', () => {
  expect(milesToFeet(1)).toBe(5280);
});


test('Can calculate vehicle length', () => {
  expect(Math.floor(calculateVehicleLength(35, 0.25))).toBe(12);
});

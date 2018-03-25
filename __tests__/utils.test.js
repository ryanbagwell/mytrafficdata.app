const {metersToFeet, feetToMiles, metersToMiles, millisecondsToHours} = require('../utils');


test('Can correctly convert meters to feet', () => {
  const feet = metersToFeet(1);
  expect(feet).toBe((3.28084).toFixed(10));
});

test('Can correctly convert feet to miles', () => {
  expect(feetToMiles(1)).toBe((0.000189394).toFixed(10));
  expect(feetToMiles(5280)).toBe((1.00000032).toFixed(10));
});

test('Can correctly convert meters to miles', () => {
  expect(metersToMiles(1)).toBe((0.000621371).toFixed(10));
});

test('Can correctly convert milliseconds to hours', () => {
  expect(millisecondsToHours(3600 * 1000)).toBe((1).toFixed(10));
});


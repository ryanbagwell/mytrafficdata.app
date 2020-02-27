const {
  milesToFeet,
  hoursToSeconds,
  calculateVehicleLength,
  correctForCosineError,
  calculateRangeToTarget,
  calculateTargetAngle,
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

test('Can correct cosine error', () => {
  const distanceToLaneCenter = 20;
  const lineOfSiteDistance = 80;
  const angle = calculateTargetAngle(distanceToLaneCenter, lineOfSiteDistance);
  expect(Math.round(correctForCosineError(29.1, angle))).toBe(30);
})

test('Can calculate range to target', () => {
  const distanceToLaneCenter = 20;
  const lineOfSiteDistance = 80;
  expect(Math.round(calculateRangeToTarget(distanceToLaneCenter, lineOfSiteDistance))).toBe(77);
});

test('Can calculate target angle', () => {
  const distanceToLaneCenter = 20;
  const lineOfSiteDistance = 80;
  const angle = calculateTargetAngle(distanceToLaneCenter, lineOfSiteDistance);
  expect(Math.round(angle)).toBe(14);
});

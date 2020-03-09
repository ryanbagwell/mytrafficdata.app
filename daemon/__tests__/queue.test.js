const {
  OutboundmMeasurementQueue,
  InboundMeasurementQueue,
} = require('../measurementQueue');
const {getConfig} = require('../config');

const config = getConfig();

const fs = require('fs');

const testSets = [
  {
    count: 2,
    fileName: 'two-cars.json',
  },
  {
    count: 1,
    fileName: 'one-car.json',
  },
  {
    count: 2,
    fileName: 'two-cars-b.json',
  },
  {
    count: 5,
    fileName: 'five-cars.json',
  },
]


test('Can count speed reports', () => {

  testSets.map(({count, fileName}) => {

    let liveCounts = 0,
      savedCounts = 0;

    console.log(config.deviceMaxRange);

    const queue = new InboundMeasurementQueue({
      updateLive: (data) => {
        liveCounts++;
      },
      saveCount: (data) => {
        savedCounts++;
      },
      distanceToLaneCenter: config.distanceToInboundLaneCenter,
      deviceMaxRange: config.deviceMaxRange,
    });

    let data = fs.readFileSync(`${__dirname}/data/${fileName}`);
    let json = JSON.parse(data.toString());

    // we have to add an extra report that's more than 1 second longer
    // to account for the next car
    let last = json[json.length - 1];

    json = [
      ...json,
      {
        ...last,
        time: parseFloat(last.time) + 1.1,
        speed: parseFloat(last.speed) + 4,
      }
    ]

    json.map(item => queue.push(item));

    expect(liveCounts).toBe(count + 1);
    expect(savedCounts).toBe(count);

  })

});


test('Can count combined speed reports', () => {

  let liveCounts = 0,
    savedCounts = 0,
    totalCars = 0;


  const queue = new InboundMeasurementQueue({
    updateLive: (data) => {
      liveCounts++;
    },
    saveCount: (data) => {
      savedCounts++;
    },
    distanceToLaneCenter: config.distanceToInboundLaneCenter,
    deviceMaxRange: config.deviceMaxRange,
  });

  testSets.map(({count, fileName}, x) => {
    let data = fs.readFileSync(`${__dirname}/data/${fileName}`);
    let json = JSON.parse(data.toString());

    json.map((item, i) => {
      queue.push({
        ...item,
        speed: i === 0 ? item.speed * 2 : item.speed,
      })
    });

    if (x === testSets.length - 1) {
      queue.push({
        ...json[json.length - 1],
        speed: 80,
      })
    }

    totalCars = totalCars + count;
  })

  expect(liveCounts).toBe(totalCars + 1);
  expect(savedCounts).toBe(totalCars);

});


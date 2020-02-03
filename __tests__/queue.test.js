const MeasurementQueue = require('../MeasurementQueue');
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

    const queue = new MeasurementQueue({
      updateLive: (data) => {
        liveCounts++;
      },
      saveCount: (data) => {
        savedCounts++;
      }
    });

    let data = fs.readFileSync(`${__dirname}/data/${fileName}`);
    let json = JSON.parse(data.toString());

    // we have to add an extra report that's more than 1 second longer
    // to account for the next car
    let last = json.pop();

    json = [
      ...json,
      last,
      {
        ...last,
        time: last.time + 1.1
      }
    ]

    json.map(item => queue.push(item));

    expect(liveCounts).toBe(count);
    expect(savedCounts).toBe(count);

  })

});


test('Can count combined speed reports', () => {

  let liveCounts = 0,
    savedCounts = 0,
    totalCars = 0;


  const queue = new MeasurementQueue({
    updateLive: (data) => {
      liveCounts++;
    },
    saveCount: (data) => {
      savedCounts++;
    }
  });

  testSets.map(({count, fileName}) => {
    let data = fs.readFileSync(`${__dirname}/data/${fileName}`);
    let json = JSON.parse(data.toString());
    json.map(item => queue.push(item));
    totalCars = totalCars + count;
  })

  expect(liveCounts).toBe(totalCars);
  expect(savedCounts).toBe(totalCars - 1);



});


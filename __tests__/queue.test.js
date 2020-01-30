const MeasurementQueue = require('../MeasurementQueue');
const fs = require('fs');


const testSets = [
  {
    count: 2,
    fileName: 'two-cars.json',
  },
  {
    count: 2,
    fileName: 'two-cars-a.json',
  },
  {
    count: 1,
    fileName: 'one-car-a.json',
  },
  {
    count: 1,
    fileName: 'one-car-b.json',
  }
]


test('Can count speed reports', () => {

  testSets.map(({count, fileName}) => {
    const queue = new MeasurementQueue();

    let data = fs.readFileSync(`${__dirname}/data/${fileName}`);
    let json = JSON.parse(data.toString());
    json.map(item => queue.push(item));

    expect(queue.length).toBe(count);

  })

});


test('Can count combined speed reports', () => {

  const queue = new MeasurementQueue();
  let totalCount = 0;

  testSets.map(({count, fileName}) => {
    let data = fs.readFileSync(`${__dirname}/data/${fileName}`);
    let json = JSON.parse(data.toString());
    json.map(item => queue.push(item));
    totalCount = totalCount + count;
  })

  expect(queue.length).toBe(totalCount);


});


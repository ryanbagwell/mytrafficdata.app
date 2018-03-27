#!/usr/bin/env node
require("babel-core/register");
const SerialPort = require('serialport');
let {metersToMiles, millisecondsToHours} = require('./utils');
const moment = require('moment');
const babar = require('babar');


const port = new SerialPort(null, {
  baudRate: 115200,
  autoOpen: false,
});

SerialPort.list().then((ports) => {

  let usbport = ports.find((port) => {
    return /Silicon Labs/.test(manufacturer);
  });

  if (usbport) {
    console.log('Opening serial port');
    port.open(usbport.comName);
  } else {
    console.error("Couldn't find Silicon Labs USB serial port");
    process.exit();
  }

});

const startBytes = new Buffer([0x42, 0x57, 0x02, 0x00, 0x00, 0x00, 0x01, 0x06]);

let history = [];

const queue = [];

port.on('open', (data) => {
  console.log('port opened')
});

port.on('data', (data) => {

  const dist = (data[2] + (data[3] << 8)) / 100;

  const strength = data[4] + (data[5] << 8);

  queue.push({
    distance: dist,
    time: moment().format('x'),
    strength: strength,
  });

  if (queue.length == 2) {
    const {distance: distance1, time: time1, strength: strength1} = queue[0];
    const {distance: distance2, time: time2, strength: strength2} = queue[1];

    const meters = distance1 - distance2;

    const timeDiff = time2 - time1;

    const miles = metersToMiles(meters);

    const hours = millisecondsToHours(timeDiff);

    const mph = (miles / hours).toFixed(2);

    queue.shift();

    if (history[history.length - 1] !== mph && mph > 0) {

      history.push(mph > 0 ? mph : mph * -1);

      history = history.slice(Math.max(history.length - 20, 0));

      let chart = babar(history.map((speed, i) => {
        return [i, speed];
      }), {
        minY: 0,
        maxY: 50,
        width: 120,
        height: 30,
      })

      // process.stdout.cursorTo(0, 0);
      // process.stdout.clearScreenDown();
      // process.stdout.write('\n');
      // process.stdout.write(chart);

    }

  }

});

port.write(startBytes, (err) => {
  console.log('Writing start bytes ...');
  if (err) console.log(err);
});


#!/usr/bin/env node
require("babel-core/register");
const SerialPort = require('serialport');
const {metersToMiles, millisecondsToHours} = require('./utils');
const moment = require('moment');
const babar = require('babar');
const MeasurementQueue = require('./MeasurementQueue');


let history = [];
const queue = new MeasurementQueue();
const startBytes = new Buffer([0x42, 0x57, 0x02, 0x00, 0x00, 0x00, 0x01, 0x06]);


function reportGraph(mph) {

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

    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
    process.stdout.write('\n');
    process.stdout.write(chart);

  }

}

function reportCli(mph, distance, strength) {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
    process.stdout.write(`Speed: ${mph} mph\n`);
    process.stdout.write(`Distance: ${distance} miles\n`);
    process.stdout.write(`Strength: ${strength}\n`);
}



SerialPort.list().then((ports) => {

    let usbport = ports.find((port) => {
      return /Silicon Labs/.test(port.manufacturer);
    });

    if (usbport) {
      console.log('Opening serial port');
      return usbport.comName;
    } else {
      console.error("Couldn't find Silicon Labs USB serial port");
      process.exit();
    }

}).then((path) => {
  const port = new SerialPort(path, {
    baudRate: 115200,
  });

  port.on('data', (data) => {

    const dist = (data[2] + (data[3] << 8)) / 100;

    const strength = data[4] + (data[5] << 8);

    const {mph, distance, signalStrength} = queue.measure({
      distance: dist,
      time: moment().format('x'),
      strength: strength,
    });

    reportCli(mph, distance, signalStrength);

  });

  port.write(startBytes, (err) => {
    console.log('Writing start bytes ...');
    if (err) console.log(err);
  });

});
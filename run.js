#!/usr/bin/env node
const SerialPort = require('serialport');
const {metersToMiles, millisecondsToHours} = require('./utils');
const moment = require('moment');
const commands = require('./commands');
const logger = require('./logger');
const asciichart = require('asciichart');
const Readline = require('@serialport/parser-readline');
const getSerialPort = require('./getSerialPort');
const MeasurementQueue = require('./MeasurementQueue');


let lastInboundSpeed = null,
  lastOutboundSpeed = null;

function reportOutboundSpeed({speed, magnitude}) {

}


function reportInboundSpeed({speed, magnitude}) {

  if (lastInboundSpeed && lastInboundSpeed.magnitude < magnitude) {
    //
  }

}


function reportSpeed({speed, magnitude}) {

    if (speed > 0) {
      // Inbound
      reportInboundSpeed({speed, magnitude});



    } else {
      //outbound
      reportOutboundSpeed({speed, magnitude});


    }


}

const queue = new MeasurementQueue();


let speeds =[0];

function reportGraph(mph) {

  speeds.push(mph);
  const start = Math.max(speeds.length - 50, 0);
  process.stdout.cursorTo(0, 0);
  process.stdout.clearScreenDown();
  process.stdout.write(
    asciichart.plot(speeds.slice(start), {height: 10})
  );

}

function reportCli(mph, distance, strength) {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
    process.stdout.write(`Speed: ${mph} mph\n`);
    process.stdout.write(`Distance: ${distance} miles\n`);
    process.stdout.write(`Strength: ${strength}\n`);
}

const sendCommand = (portInstance, {cmd, actionDescription}) => {

  if (actionDescription) {
    logger.info(actionDescription);
  }

  portInstance.write(cmd, (err) => {

    if (err) console.log(err);
  });

}





getSerialPort.then(({port, parser}) => {

  parser.on('data', (buffer) => {

    let data;

    try {
      data = JSON.parse(buffer.toString());
      console.log(data);

    } catch (err) {
      return;
    }

    data && data.speed && queue.push(data);

  });

  port.write('PA', () => {
    logger.info('Listening for data ...');
  });




});
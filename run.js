#!/usr/bin/env node
const logger = require('./logger');
const getSerialPort = require('./getSerialPort');
const MeasurementQueue = require('./MeasurementQueue');
const {
  updateLiveSpeedReport,
  saveSpeedReport
} = require('./db');

const queue = new MeasurementQueue({
  updateLive: updateLiveSpeedReport,
  saveCount: saveSpeedReport,
});

function cleanup(port) {
  logger.info('Closing serial port');
  port.isOpen && port.close();
  logger.info('Shutting down ...');
  process.exit(0);
}

getSerialPort.then(({port, parser}) => {

  parser.on('data', (buffer) => {

    let data;

    try {
      data = JSON.parse(buffer.toString());
      logger.debug(JSON.stringify(data));
    } catch (err) {
      return;
    }

    data && data.speed && queue.push(data);

  });

  port.write('PA', () => {
    logger.info('Listening for data ...');
  });

  process.on('SIGINT', () => cleanup(port));
  process.on('exit', () => cleanup(port));


});
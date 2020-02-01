#!/usr/bin/env node
const logger = require('./logger');
const getSerialPort = require('./getSerialPort');
const MeasurementQueue = require('./MeasurementQueue');
const saveSpeedReport = require('./saveSpeedReport');

const queue = new MeasurementQueue({save: saveSpeedReport});


function cleanup(port) {
  logger.info('Closing serial port');
  port.isOpen && port.close();
  logger.on('Shutting down ...');
}


getSerialPort.then(({port, parser}) => {

  parser.on('data', (buffer) => {

    let data;

    try {
      data = JSON.parse(buffer.toString());
      logger.silly(data);
    } catch (err) {
      return;
    }

    data && data.speed && queue.push(data);

  });

  port.write('PA', () => {
    logger.info('Listening for data ...');
  });

  process.on('exit', cleanup(port));
  process.on('SIGINT', cleanup(port));

});
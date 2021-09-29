#!/usr/bin/env node
const logger = require('./logger');
const moment = require('moment-timezone');
const getSerialPort = require('./getSerialPort');
const {
  InboundMeasurementQueue,
  OutboundMeasurementQueue,
} = require('./measurementQueue');
const {
  updateLiveSpeedReport,
  saveSpeedReport
} = require('./db');
const {getConfig, configureDevice} = require('./config');

if (!process.env.LOCATION_DESCRIPTION) {
  logger.info('No LOCATION_DESCRIPTION environment variable set. Using the current time as the default location')
  process.env.LOCATION_DESCRIPTION = moment().tz('America/New_York').format('YYYY-MM-DD-kk-mm-ss');
}

const config = getConfig();

const inboundQueue = new InboundMeasurementQueue({
  updateLive: updateLiveSpeedReport,
  saveCount: saveSpeedReport,
  distanceToLaneCenter: config.distanceToInboundLaneCenter,
  finalLineOfSiteDistance: config.finalInboundLineOfSiteDistance,
  initialLineOfSiteDistance: config.initialInboundLineOfSiteDistance,
  deviceMaxRange: config.deviceMaxRange,
});

const outboundQueue = new OutboundMeasurementQueue({
  updateLive: () => {},
  saveCount: () => {},
});

function cleanup(port) {
  if (port) {
    logger.info('Placing device in idle mode');
    port.write('PI');
    logger.info('Closing serial port');
    port.isOpen && port.close();
  }
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

    if (data && data.speed) {
      if (parseFloat(data.speed < 0)) {
        outboundQueue.push(data);
      } else {
        inboundQueue.push(data);
      }
    }

  });

  configureDevice(port);

  port.write('PA', () => {
    logger.info('Listening for data ...');
  });

  process.on('SIGINT', () => cleanup(port));
  process.on('exit', () => cleanup(port));

}).catch((err) => {
  logger.error(err);
  cleanup()
})

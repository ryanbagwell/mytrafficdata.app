const logger = require('../logger');
const moment = require('moment');
const {calculateVehicleLength, correctForCosineError} = require('../utils');


class BaseMeasurementQueue {

  constructor(params = {}) {
    this.timeSeparator = 1;
    this.angle = 45;
    this.queue = [];
    this.counts = [];
    this.saveCount = params.saveCount || function(){};
    this.updateLive = params.updateLive || function(){};
  }

  save(data) {
    this.counts.push(data);
    this.saveCount(data);
  }

  push({magnitude, speed, time}) {
    magnitude = parseFloat(magnitude);
    speed = parseFloat(speed);
    time = parseFloat(time);

    this.queue.push({
      magnitude,
      speed,
      time: process.env.JEST_WORKER_ID === undefined ? moment().valueOf() / 1000 : time,
    });

    this.processQueue();

  }

  processQueue() {

  }

  clear() {
    this.queue = [];
    this.counts = [];
    this.length = 0;
  }

  get length() {
    return this.counts.length;
  }

}

class InboundMeasurementQueue extends BaseMeasurementQueue {

  processQueue() {
    let {queue} = this;
    let initialReport = queue[0];

    // only one item in the queue means
    // the vehicle has just started to enter the
    // field of vision, so just update the live
    // count and do nothing else;
    if (queue.length === 1) {
      return this.updateLive({
        ...initialReport,
        measuredSpeed: initialReport.speed,
        correctedSpeed: correctForCosineError(initialReport.speed, this.angle),
      });
    }

    // Now check if enough time has elapsed
    // to denote another vehicle, save that speed report, and
    // clear the queue
    let previousReport = queue[queue.length - 2];
    let currentReport = queue[queue.length - 1];
    let timeDiff = currentReport.time - previousReport.time;

    logger.debug(`Report time difference: ${timeDiff}`);

    if (currentReport.time - previousReport.time > 1) {
      // account for random extra reports are more than 1 second
      // than the previous report when there are only two reports
      // in the queue by just removing the first report;
      if (queue.length === 2) {
        logger.info('Removing extra report');
        return queue.shift();
      }

      const {magnitude, speed: measuredSpeed} = initialReport;

      const correctedSpeed = correctForCosineError(measuredSpeed, this.angle),
        startTime = initialReport.time,
        endTime = initialReport.time;

      this.saveCount({
        startTime: initialReport.time,
        endTime: initialReport.time,
        measuredSpeed,
        magnitude: magnitude,
        correctedSpeed,
        length: calculateVehicleLength(correctedSpeed, endTime - startTime),
      });

      logger.debug('Saved count');

      this.queue = [];

    }

  }

}


class OutboundMeasurementQueue extends BaseMeasurementQueue {

  processQueue() {
    let {queue} = this;
    let initialReport = queue[0];

    // only one item in the queue means
    // the vehicle has just started to enter the
    // field of vision, so just update the live
    // count and do nothing else;
    if (queue.length === 1) {
      return this.updateLive({
        ...initialReport,
        measuredSpeed: initialReport.speed,
        correctedSpeed: correctForCosineError(initialReport.speed, this.angle),
      });
    }

    // Now check if enough time has elapsed
    // to denote another vehicle, save that speed report, and
    // clear the queue
    let previousReport = queue[queue.length - 2];
    let currentReport = queue[queue.length - 1];
    let timeDiff = currentReport.time - previousReport.time;

    logger.debug(`Report time difference: ${timeDiff}`);

    if (currentReport.time - previousReport.time > 1) {
      // account for random extra reports are more than 1 second
      // than the previous report when there are only two reports
      // in the queue by just removing the first report;
      if (queue.length === 2) {
        logger.info('Removing extra report');
        return queue.shift();
      }

      const {magnitude, speed: measuredSpeed} = initialReport;

      const correctedSpeed = correctForCosineError(measuredSpeed, this.angle),
        startTime = initialReport.time,
        endTime = initialReport.time;

      this.saveCount({
        startTime: initialReport.time,
        endTime: initialReport.time,
        measuredSpeed,
        magnitude: magnitude,
        correctedSpeed,
        length: calculateVehicleLength(correctedSpeed, endTime - startTime),
      });

      this.queue = [];

    }

  }

}

module.exports = {
  OutboundMeasurementQueue,
  InboundMeasurementQueue,
}

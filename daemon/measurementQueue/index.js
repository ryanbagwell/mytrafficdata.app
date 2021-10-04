const logger = require('../logger');
const moment = require('moment');
const {
  inboundSpeedIncrease
} = require('./delineationStrategies');
const {
  rangeEstimationStrategy
} = require('./speedCorrectionStrategies');
const {
  calculateVehicleLength,
  correctForCosineError,
  calculateTargetAngle
} = require('../utils');



class BaseMeasurementQueue {

  constructor(params = {}) {
    this.timeSeparator = 1;
    this.angle = 0;
    this.queue = [];
    this.counts = [];
    this.saveCount = params.saveCount || function(){};
    this.updateLive = params.updateLive || function(){};
    this.distanceToLaneCenter = params.distanceToLaneCenter;
    this.deviceMaxRange = params.deviceMaxRange || 80;
    this.delinationStrategy = params.delinationStrategy || inboundSpeedIncrease;
    this.speedCorrectionStrategy = params.speedCorrectionStrategy || rangeEstimationStrategy;


    this.initialLineOfSiteDistance = params.initialLineOfSiteDistance;
    this.finalLineOfSiteDistance = params.finalLineOfSiteDistance;

  }

  save(data) {
    //this.counts.push(data);
    this.saveCount(data);
  }

  push({magnitude, speed, time}) {
    magnitude = parseFloat(magnitude);
    speed = parseFloat(speed);
    time = parseFloat(time);

    // Add the current time of the count.
    // the startTime and endTime timestamps
    // supplied by the device are the seconds since
    // the device was last powered on or something
    // like that. They're not a reliable source of
    // actual point in time that the count was measured.
    const timestamp = Date.now()

    this.queue.push({
      magnitude,
      speed,
      time: process.env.JEST_WORKER_ID === undefined ? moment().valueOf() / 1000 : time,
      countTimestamp: timestamp,
      countDateTime: new Date(timestamp).toISOString(),
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

  constructor(params) {
    super(params);
  }

  updateLiveSpeed(speedReport) {

    const correctedSpeed = this.speedCorrectionStrategy(
      null,
      speedReport,
      this.distanceToLaneCenter,
      this.deviceMaxRange
    );

    this.updateLive({
      ...speedReport,
      measuredSpeed: speedReport.speed,
      correctedSpeed,
    });

  }

  save(previousReport, currentReport) {

    const {magnitude, speed: measuredSpeed} = previousReport;

    const correctedSpeed = this.speedCorrectionStrategy(
      previousReport,
      currentReport,
      this.distanceToLaneCenter,
      this.deviceMaxRange
    ),
      startTime = previousReport.time,
      endTime = currentReport.time,
      countDateTime = currentReport.countDateTime,
      countTimestamp = currentReport.countTimestamp;


    this.saveCount({
      startTime: startTime,
      endTime: endTime,
      measuredSpeed,
      magnitude: magnitude,
      correctedSpeed,
      length: calculateVehicleLength(correctedSpeed, endTime - startTime),
      countDateTime,
      countTimestamp,
    });

    logger.debug('Saved count');

  }

  isNewVehicle(previousReport, currentReport) {
    return this.delinationStrategy(previousReport, currentReport);
  }

  processQueue() {
    let {queue} = this;

    if (queue.length === 1) {
      return this.updateLiveSpeed(queue[0]);
    };

    const previousReport = queue.shift();
    const currentReport = queue[0];

    /*
     *  The reported speed of an inbound car should be decreasing
     *  due to the cosine error (unless it suddenly and dramatically
     *  accelerated while in the antenna view)
     */

    const isNew = this.isNewVehicle(previousReport, currentReport);

    if (isNew) {
      this.save(previousReport, currentReport);
      this.updateLiveSpeed(currentReport);
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

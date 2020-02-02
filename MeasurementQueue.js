const logger = require('./logger');
const moment = require('moment');


module.exports = class MeasurementQueue {

  constructor(params = {}) {
    this.angle = 45;
    this.rawData = [];
    this.counts = [];

    this.save = params.save || this.save;
  }

  save(data) {
    this.counts.push(data);
  }

  push({magnitude, speed, time}) {
    magnitude = parseFloat(magnitude);
    speed = parseFloat(speed);
    time = parseFloat(time);

    const last = this.rawData.slice(-1)[0];

    last && time - last.time > 1 && this.count();

    this.rawData.push({magnitude, speed, time});

  }

  count() {
    let {speed, magnitude} = this.rawData[0];

    this.rawData = [];
    this.save({
      time: moment().unix(),
      measuredSpeed: speed, // should we average out the speed?,
      magnitude: magnitude,
      correctedSpeed: speed / Math.cos((this.angle - 10) * Math.PI / 180),
    });
    logger.info(`Counted 1. Total: ${this.length}`);
  }

  clear() {
    this.rawData = [];
    this.length = 0;
  }

  get length() {
    return this.counts.length;
  }


}

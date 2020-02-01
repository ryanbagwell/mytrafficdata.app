const logger = require('./logger');
const moment = require('moment');


module.exports = class MeasurementQueue {

  constructor(params = {}) {
    this.rawData = [];
    this.counts = [];

    this.save = params.save || this.save;
  }

  save(data) {
    this.counts.push(data);
  }

  push({magnitude, speed}) {
    magnitude = parseFloat(magnitude);
    speed = parseFloat(speed);

    const last = this.rawData.slice(-1)[0];

    last && magnitude < 30 && last.magnitude - magnitude >= 20 && this.count();

    this.rawData.push({magnitude, speed});

  }

  count() {
    const speeds = this.rawData.map(x => x.speed);
    const magnitudes = this.rawData.map(x => x.magnitude);

    let speed = Math.max(speeds);

    if (speed < 1) {
      speed = Math.min(speeds);
    }

    this.rawData = [];
    this.save({
      time: moment().unix(),
      speed: speed, // should we average out the speed?,
      magnitude: Math.max(...magnitudes),
    });
    //logger.info(`Counted 1. Total: ${this.length}`);
  }

  clear() {
    this.rawData = [];
    this.length = 0;
  }

  get length() {
    return this.counts.length;
  }


}

const logger = require('./logger');

module.exports = class MeasurementQueue extends Array {

  rawData = [];

  constructor(items) {
    super(items);
  }

  push = ({magnitude, speed}) => {

    const last = arr.slice(-1)[0] ;

    if (magnitude < 30 && last - magnitude >= 20) {
      const speeds = rawData.map(x => x.speed);
      super.push({
        time: '',
        speed: Math.max(speeds),
      });
      rawData = [];
      logger.info(`Counted 1. Total: ${this.length}`);
    }
    rawData.push({magnitude, speed});

  }

}

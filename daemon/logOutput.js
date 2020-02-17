const logger = require('./logger');

const MESSAGES = {
  'OutputFeature': {
    J: 'JSON output on',
    j: 'JSON output off',
    M: 'Magnitude reporting on',
    m: 'Magnitude reporting off',
    T: 'Time reporting on',
    t: 'Time reporting off',
  },
  PowerMode: {
    'Continuously Active': 'Power mode set to continuous',
  },
  Units: {
    mph: 'Reporting speed in mph',
  },
}

module.exports = (data = {}) => {

  return Object.keys(data).map((key) => {
    const feat = MESSAGES[key];

    if (feat) {
      msg = feat[data[key]];
      console.log(msg)
      logger.info(msg);
      return msg;
    }

  }, []);

}
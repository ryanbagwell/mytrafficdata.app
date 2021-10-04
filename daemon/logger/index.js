const winston = require('winston');
const {combine, timestamp, printf} = winston.format;

const logLevel = process.env.LOG_LEVEL || 'debug';

const formatter = printf(( {level, message, timestamp, logLocation}) => {
  return `${timestamp} [${level}] (${logLocation}): ${message}`;
});

const logger = winston.createLogger({
  level: logLevel,
  levels: {
    ...winston.config.npm.levels,
    rawCountData: 7,
  },
  format: combine(
    timestamp(),
    formatter,
  ),
  transports: [
    new winston.transports.Console(),
  ]
});

const logMethods = [...Object.keys(logger.levels), 'log'].reduce((methods, level) => {
  methods[level] = function(...args) {

    const extraArgs = {
      logLocation: (new Error()).stack.split("\n")[2].split(" ").slice(-1)[0].replace(/\(|\)/g, ''),
      stack: (new Error()).stack,
    }

    args.push(extraArgs);

    logger[level](...args)
  }
  return methods;
}, {})


module.exports = logMethods;
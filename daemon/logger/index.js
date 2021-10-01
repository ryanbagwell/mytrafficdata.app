const winston = require('winston');
const {combine, timestamp, printf} = winston.format;

const logLevel = process.env.LOG_LEVEL || 'debug';

const formatter = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: logLevel,
  format: combine(
    timestamp(),
    formatter,
  ),
  transports: [
    new winston.transports.Console(),
  ]
});

module.exports = logger;
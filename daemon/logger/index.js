const winston = require('winston');
const {combine, timestamp, cli, printf} = winston.format;

winston.level = process.env.LOG_LEVEL || 'debug';

const formatter = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    timestamp(),
    formatter,
  ),
  transports: [
    new winston.transports.Console(),
  ]
});

module.exports = logger;
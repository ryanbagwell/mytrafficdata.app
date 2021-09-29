const winston = require('winston');
const {combine, timestamp, cli} = winston.format;

winston.level = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    timestamp(),
    cli(),
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.Console({ level: 'warn' }),
    new winston.transports.Console({ level: 'error' }),
  ]
});

module.exports = logger;
const winston = require('winston');

winston.level = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.cli(),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.Console({ level: 'warn' }),
    new winston.transports.Console({ level: 'error' }),
  ]
});

module.exports = logger;
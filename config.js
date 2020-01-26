#!/usr/bin/env node
const logger = require('./logger');
const getSerialPort = require('./getSerialPort');
const commands = require('./commands');


const conf = {
  json: true, //json reporting
  idle: false, //idle power mode
  magnitude: true, //magnitude reporting,
  timeReports: false,
  units: 'mph', //mph, mps, kph, fps,
  blankReporting: false,
  ledControl: false,
  powerLevel: 0, // 0 through 7, 7 is lowest power,
  minimumSpeed: 10,
  bufferSize: 1024,
  sampleSize: 20000,
  save: true,
}


const confFunctions = {
  json: (value = true, port) => {
    const cmd = value ? 'OJ' : 'Oj';
    port.write(cmd);
  },
  idle: (value = true, port) => {
    const cmd = value ? 'PI' : 'PA';
    port.write(cmd);
  },
  magnitude: (value = true, port) => {
    const cmd = value ? 'OM' : 'Om';
    port.write(cmd);
  },
  timeReports: (value = false, port) => {
    const cmd = value ? 'OT' : 'Ot';
    port.write(cmd);
  },
  units: (value = 'mph', port) => {
    let units = {
      mph: 'US',
      mps: 'UM',
      kph: 'UK',
      fps: 'UF',
    }
    port.write(units[value]);

  },
  blankReporting: (value = false, port) => {
    const cmd = value ? 'BV' : 'BL';
    port.write(cmd);
  },
  ledControl: (value = false, port) => {
    const cmd = value ? 'OL' : 'Ol';
    port.write(cmd);
  },
  powerLevel: (value = 0, port) => {
    if (value > 7) {
      return logger.error('Power level value must not exceed 7');
    };
    port.write(`P${value}`);
  },
  minimumSpeed: (value = 5, port) => {
    port.write(`R>${value}\r`);
  },
  bufferSize: (value = 1024, port) => {
    const sizes = {
      1024: 'S>',
      512: 'S<',
      256: 'S[',
    };

    port.write(sizes[value]);
  },
  sampleSize: (value = 20000, port) => {
    let sizes = {
      10000: 'S1',
      20000: 'S2',
      50000: 'SL',
    }
    port.write(sizes[value])
  },
  save: (value = true, port) => {
    value && port.write('A!');
  }
}

getSerialPort.then(({port, parser}) => {

  parser.on('data', (buffer) => {
    logger.debug(buffer.toString())
  });

  Object.entries(conf).map(([name, value], i) => {

    const func = confFunctions[name];

    try {
      func(value, port);
      logger.info(`Set value ${value} for ${name}`);
    } catch(err) {
      logger.error(err);
    }

  });

  setTimeout(() => {
    process.exit();
  }, 2000);

});
#!/usr/bin/env node
const logger = require('./logger');
const getSerialPort = require('./getSerialPort');
const commands = require('./commands');
const fs = require('fs');


const defaultConf = {
  json: true, //json reporting
  idle: false, //idle power mode
  magnitude: true, //magnitude reporting,
  timeReports: false,
  units: 'mph', //mph, mps, kph, fps,
  blankReporting: false,
  ledControl: false,
  powerLevel: 0, // 0 through 7, 7 is lowest power,
  minimumSpeed: 10,
  minimumMagnitude: 0,
  bufferSize: 1024,
  sampleSize: 20000,
  numReports: 9,
  save: true,
  hibernate: false,
  hibernateTime: 1,
  hibernateDelay: 0.5,
  direction: 'both',
  reportTime: false,
};


const confFunctions = {
  json: (value = true, port) => {
    const cmd = value ? 'OJ' : 'Oj';
    return port.write(cmd);
  },
  idle: (value = true, port) => {
    const cmd = value ? 'PI' : 'PA';
    return port.write(cmd);
  },
  magnitude: (value = true, port) => {
    const cmd = value ? 'OM' : 'Om';
    return port.write(cmd);
  },
  timeReports: (value = false, port) => {
    const cmd = value ? 'OT' : 'Ot';
    return port.write(cmd);
  },
  units: (value = 'mph', port) => {
    let units = {
      mph: 'US',
      mps: 'UM',
      kph: 'UK',
      fps: 'UF',
    }
    return port.write(units[value]);

  },
  blankReporting: (value = false, port) => {
    const cmd = value ? 'BV' : 'BL';
    return port.write(cmd);
  },
  ledControl: (value = false, port) => {
    const cmd = value ? 'OL' : 'Ol';
    return port.write(cmd);
  },
  powerLevel: (value = 0, port) => {
    if (value > 7) {
      return logger.error('Power level value must not exceed 7');
    };
    return port.write(`P${value}`);
  },
  minimumSpeed: (value = 5, port) => {
    return port.write(`R>${value}\r`);
  },
  bufferSize: (value = 1024, port) => {
    const sizes = {
      1024: 'S>',
      512: 'S<',
      256: 'S[',
    };

    return port.write(sizes[value]);
  },
  sampleSize: (value = 20000, port) => {
    let sizes = {
      10000: 'S1',
      20000: 'S2',
      50000: 'SL',
    }
    return port.write(sizes[value]);
  },
  numReports: (value = 9, port) => {
    return port.write(`O${value}`);
  },
  direction: (value = 'both', port) => {
    let cmd;

    switch (value) {
      case 'both':
        cmd = 'R|';
        break;
      case 'inbound':
        cmd = 'R+';
        break;
      case 'outbound':
        cmd = 'R-';
        break;
      default:
        cmd = 'R|';
    }
    return port.write(cmd);
  },
  minimumMagnitude: (value = 0, port) => {
    return port.write(`M>${value}`);
  },
  reportTime: (value = false, port) => {
    if (value === true) {
      return port.write('OT');
    }
  },
  save: (value = true, port) => {
    return value && port.write('A!');
  }
}

module.exports = (port) => {

  fs.readFile('./config.json', (err, data) => {

    let conf = {
      ...defaultConf,
    };

    if (data) {
      try {
        conf = {
          ...conf,
          ...JSON.parse(data.toString()),
        }
      } catch (err) {
        logger.error(err);
      };
    }

    Object.entries(confFunctions).map(([name, func], i) => {

      const value = conf[name];

      try {
        func(value, port);
      } catch(err) {
        logger.error(err);
      }

    });

  });

}
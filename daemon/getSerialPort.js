const SerialPort = require('serialport');
const logger = require('./logger');
const Readline = require('@serialport/parser-readline');

module.exports = SerialPort.list().then((ports) => {

  let usbport = ports.find((port) => {
    logger.debug(`Checking if ${port.manufacturer} is Infineon`)
    return /Infineon/.test(port.manufacturer);
  });

  if (usbport) {
    logger.info('Opening serial port');

    const port = new SerialPort(usbport.path, {
      baudRate: 19200,
    });

    const parser = port.pipe(
      new Readline({delimiter: '\r\n'})
    )

    return {port, parser};

  } else {
    logger.info("Couldn't find Infineon USB serial port");
  }

});
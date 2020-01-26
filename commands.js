module.exports = {
  enableObjectSensorLight: {
    description: 'Enables the object sensor light',
    actionDescription: 'Enabling the object sensor light',
    cmd: 'OG',
  },
  disableObjectSensorLight: {
    description: 'Disables the object sensor light',
    actionDescription: 'Disabling the object sensor light',
    cmd: 'Og',
  },
  enableJsonFormat: {
    description: 'Reports data in JSON format',
    actionDescription: 'Turning on JSON reporting',
    cmd: 'OJ',
  },
  disableJsonFormat: {
    actionDescription: 'Turning off JSON reporting',
    cmd: 'Oj',
  },
  enableMagnitudeReporting: {
    cmd: 'OM',
  },
  disableMagnitudeReporting: {
    cmd: 'Om',
  },
  enableTimeReports: {
    description: 'Turns on Time Reporting',
    actionDescription: 'Turning on time reporting',
    cmd: 'OT',
  },
  disableTimeReports: {
    description: 'Turns off Time Reporting',
    actionDescription: 'Turning off time reporting',
    cmd: 'Ot',
  },
  useMPH: {
    description: 'Report Speed in Miles per Hour',
    actionDescription: 'Reporting speed in Miles Per Hour',
    cmd: 'US',
  },
  useKPH: {
    description: 'Report Speed in Kilometers per Hour',
    cmd: 'UK',
  },
  useMPS: {
    description: 'Report Speed in Meters per Second',
    cmd: 'UM',
  },
  saveSettings: {
    description: 'Saves settings to memory',
    actionDescription: 'Saving settings to memory',
    cmd: 'AI'
  },
  getSavedSettings: {
    description: 'Gets settings saved to memory',
    actionDescription: 'Getting saved settings',
    cmd: 'A.',
  },
  disableBlankReporting: {
    description: 'Do not report empty data',
    actionDescription: 'Not reporting empty data',
    cmd: 'BV',
  },
  disableLEDControl: {
    description: 'Disables LEDs',
    actionDescription: 'Disabling LEDs',
    cmd: 'Ol'
  },
  enableLEDControl: {
    description: 'Enables LEDs',
    actionDescription: 'Enabling LEDs',
    cmd: 'OL',
  },
  setMaxPower: {
    cmd: 'P0'
  },
  setP1Power: {
    cmd: 'P1'
  },
  setP2Power: {
    cmd: 'P2'
  },
  setP3Power: {
    cmd: 'P3',
  },
  setMinSpeedReport: {
    cmd: 'R>0\r',
  },
  getCurrentDelayTime: {
    cmd: 'W?',
  },
  setNumReports: {
    cmd: 'O1',
  },
  getInfo: {
    cmd: '??',
  },
  set256BufferSize: {
    cmd: 'S[',
  },
  set512BufferSize: {
    cmd: 'S<',
  },
  set1024BufferSize: {
    cmd: 'S>',
  },
  set20KSample: {
    cmd: 'S2',
  },
  set10KSample: {
    cmd: 'SX',
  },
  set1KSampleRate: {
    cmd: 'SI',
  },
  setIdlePowerMode: {
    cmd: 'PI',
  },
  setTransmitOff: {
    cmd: 'PO',
  },
  setTransmitOn: {
    cmd: 'P!',
  }
}
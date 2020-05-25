const base = require('./base');

const desktopConfig = {
  ...base,
};

desktopConfig.globals.__BROWSER_CONFIG__ = {
  headless: true,
  defaultViewport: { width: 1600, height: 1000 },
};

desktopConfig.globals.__DISPOSITIVO_A_EMULAR__ = null;

module.exports = desktopConfig;

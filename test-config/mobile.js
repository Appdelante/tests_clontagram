const base = require('./base');
const puppeteer = require('puppeteer');

const mobileConfig = {
  ...base,
};

mobileConfig.globals.__BROWSER_CONFIG__ = {
  headless: true,
};

mobileConfig.globals.__DISPOSITIVO_A_EMULAR__ = puppeteer.devices['iPhone 6'];

module.exports = mobileConfig;

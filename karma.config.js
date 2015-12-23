"use strict";

const PORT = 9876;
const SOURCES = "dist/predators-es6-injector.js";
const SOURCE_SPECS = "specs/**/*.spec.js";

module.exports = function(karma) {
  let configs = {
    basePath: __dirname,
    colors: true,

    logLevel: karma.LOG_INFO,
    port: PORT,
    autoWatch: true,
    singleRun: false,

    frameworks: ['jasmine'],
    browsers: ['PhantomJS']
  };

  configs.plugins = [
    'karma-phantomjs-launcher',
    'karma-jasmine'
  ];

  configs.files = [
    "node_modules/jquery/dist/jquery.js",
    SOURCES,
    SOURCE_SPECS
  ];

  return karma.set(configs);
};

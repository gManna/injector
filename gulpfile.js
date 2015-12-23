'use strict';

const
  gulp = require('gulp'),
  tsc = require('gulp-typescript'),
  uglify = require('gulp-uglify'),
  wrap = require('gulp-wrap'),
  sourcemaps = require('gulp-sourcemaps'),
  copy = require('gulp-copy'),
  pkg = require('./package.json'),
  NOW = new Date()
;

const APP_NAME = 'predators-es6-injector';
const OUTPUT_DIR = `./release/`;

const INPUT = `./dist/${APP_NAME}.js`;

const OUTPUT = `${OUTPUT_DIR}${APP_NAME}.js`;
const OUTPUT_MIN = `${OUTPUT_DIR}${APP_NAME}.min.js`;

let banner = `/*!
 * @project $M - Predators Module Management System
 * @requires jQuery (window.jQuery)
 * @version ${pkg.version}
 * @date ${NOW.toString()}
**/`;

let uglifyOpts = {
  output: {
    quote_keys: true,
    semicolons: true
  },
  compress: {},
  mangle: false,
  preserveComments: "license"
};
let tscOpts = {};

gulp.task('uglify', () => {
  return gulp
    .src(INPUT)
    .pipe(sourcemaps.init())
    .pipe(wrap(`${banner}(function(window, jQuery){\n'use strict'\n;<%= contents %>\n})(window, window.jQuery)`))
    .pipe(uglify(uglifyOpts))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(OUTPUT_DIR))
});

gulp.task('release', ['uglify'], () => {
  return gulp
    .src([
      "./README.md",
      "./LICENSE",
      "./dist/predators-es6-injector.d.ts"
    ])
    .pipe(copy(OUTPUT_DIR), {
      prefix: 2
    })
});
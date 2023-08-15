const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const data = require('gulp-data');
const nunjucksRender = require('gulp-nunjucks-render');
const htmlmin = require('gulp-htmlmin');
const cachebust = require('gulp-cache-bust');
const mode = require('gulp-mode')();
const rename = require('gulp-rename');
const paths = require('../paths');

const htmlminConfig = {
  collapseWhitespace: true,
};

const cachebustConfig = {
  type: 'timestamp',
};

const getDataForFile = file => {
  return require('../../src/data.json');
};

const html = () => {
  return gulp
    .src(paths.src.html)
    .pipe(data(getDataForFile))
    .pipe(
      nunjucksRender({
        path: ['src/html/partials'],
        envOptions: {
          autoescape: false,
        },
        watch: true,
      }),
    )
    .pipe(mode.production(htmlmin(htmlminConfig)))
    .pipe(mode.production(cachebust(cachebustConfig)))
    .pipe(mode.production(rename({ extname: '.php' })))
    .pipe(gulp.dest(paths.build.html));
};

module.exports = { html };

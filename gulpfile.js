'use strict';

const { series, parallel, watch } = require('gulp');
const requireDir = require('require-dir');
const browserSync = require('browser-sync').create();
const tasks = requireDir('./gulp/tasks', { recurse: true });
const paths = require('./gulp/paths');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

const serve = () => {
  return browserSync.init({
    server: 'build/',
    startPath: '/index.html',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    logPrefix: 'DevServer',
    host: 'localhost',
    port: process.env.PORT || 1234,
  });
};

const watcher = done => {
  watch(paths.watch.html).on('change', parallel(tasks.html.html, browserSync.reload));
  watch(paths.watch.data).on('change', parallel(tasks.html.html, browserSync.reload));

  watch(paths.watch.css).on('change', series(tasks.css, browserSync.reload));
  watch(paths.watch.js).on('change', series(tasks.scripts, browserSync.reload));
  watch(paths.watch.images, tasks.images);
  watch(paths.watch.fonts, tasks.fonts);

  done();
};

exports.start = series(
  tasks.clean,
  parallel(tasks.php, tasks.images, tasks.css, tasks.fonts, tasks.scripts, tasks.html.html),
  watcher,
  serve,
);

exports.build = series(
  tasks.clean,
  parallel(tasks.php, tasks.images, tasks.css, tasks.fonts, tasks.scripts, tasks.html.html),
);

gulp.task('deploy', function () {
  return gulp.src('./build/**/*').pipe(ghPages());
});

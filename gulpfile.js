const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

gulp.task('default', function () {
  let bundler = browserify({
    entries: ['client.jsx'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  bundler.on('update', doBundle);
  doBundle();

  function doBundle() {
    bundler.transform(babelify);
    bundler.bundle()
      .on('error', function (err) {
        console.error(err);
      })
      .pipe(source('client.js'))
      .pipe(buffer())
      .pipe(uglify()) // Use any gulp plugins you want now
      .pipe(gulp.dest('dist'));
  }
});

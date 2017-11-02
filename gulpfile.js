const gulp = require('gulp');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const fs = require('fs');
const sass = require('node-sass');

gulp.task('index', function () {
  fs.existsSync("dist") || fs.mkdirSync("dist");
  fs.copyFile('src/index.html', 'dist/index.html', (err) => {
    if (err) throw err;
  })
  sass.render({
    file: 'src/app.scss',
      outFile: 'dist/app.css',
}, function(error, result) {
    if(!error){
      fs.writeFile('dist/app.css', result.css, function(err){
        if (err) throw err;
      });
    }else{
      throw error;
    }
  });
});

gulp.task('server', function () {
  gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('client', function () {
  let bundler = browserify({
    entries: ['src/App.jsx'],
    cache: {},
    packageCache: {}
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

gulp.task('watch', function() {
  gulp.watch(['src/*.html', 'src/*.css', 'src/*.scss'], ['index'])
  gulp.watch('src/*.jsx', ['client'])
  gulp.watch('src/*.js', ['server'])
});

gulp.task('default', ['server', 'client', 'index', 'watch']);
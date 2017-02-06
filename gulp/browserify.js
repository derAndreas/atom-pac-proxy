const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const config = require('../gulp-config');

/**
 * Task: Browserify
 * Bundle the JS starting with the entrypoint (from config)
 * and all dependecies required in the entrypoint.
 */
gulp.task('browserify', function() {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false,
    entries: config.browserify.entryPoint
  }).transform("babelify", {
    presets: ["es2015"]
  });

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', function(err) {
        console.error('[ERROR]', err.message);
        this.emit('end');
      })
      .pipe(source(config.browserify.filename))
      .pipe(buffer())
      .pipe(gulp.dest(config.paths.build))
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(config.paths.build))
  };

  return bundle();
});

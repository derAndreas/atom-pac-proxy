const gulp = require('gulp');
const cache = require('gulp-cache');

/**
 * Task: clear-cache
 * Clear the gulp-cache cache
 */
gulp.task('cache-clear', function (done) {
  return cache.clearAll(done);
});

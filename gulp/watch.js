const gulp = require('gulp');
const path = require('path');
const config = require('../gulp-config');

/**
 * Watcher task
 */
gulp.task('watch', ['build'], function() {
  gulp.watch(path.join(config.paths.src, '*'), ['build'])
});

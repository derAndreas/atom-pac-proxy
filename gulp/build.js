
const gulp = require('gulp');

/**
 * Task: Build
 * The build task runs a series of task to generate
 * a new build from the sources.
 */
gulp.task('build', ['cache-clear', 'clean', 'browserify']);

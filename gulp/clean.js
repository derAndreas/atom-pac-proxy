const gulp = require('gulp');
const del = require('del');
const config = require('../gulp-config');

/**
 * Task: Clean
 * Clean up the paths defined in the config for this task
 */
gulp.task('clean', del.bind(null, config.paths.dist, { dot: true}));

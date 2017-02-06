const path = require('path');
const PATH_ROOT = path.join(__dirname);
const PATH_BUILD = path.join(PATH_ROOT, 'build');
const PATH_DIST = path.join(PATH_ROOT, 'dist');
const PATH_SRC = path.join(PATH_ROOT, 'lib');

module.exports = {
  paths: {
    build: PATH_BUILD,
    dist: PATH_DIST,
    src: PATH_SRC
  },
  browserify: {
    entryPoint: path.join(PATH_ROOT, 'lib', 'pac-proxy.js'),
    filename: 'pac-proxy.js'
  }
};

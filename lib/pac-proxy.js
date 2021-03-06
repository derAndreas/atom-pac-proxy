'use strict';

const npm = require('npm');

const get = require('./get');
const lookup = require('./lookup');
const parse = require('./parse');

// TODO: Currently this is an inline config
//       Need to find out howto define config options in atom.io
let config = {
  url: 'http://some-url-to-proxy-pac',
  test_url: 'http://atom.io',
  test_host: 'atom.io'
}

/**
 * Main function to get, invoke, parse and set the proxy
 */
const atomPACProxy = () => {
  get(config.url, (err, pacdata) => {
    if(err) {
      throw err;
    }

    lookup(pacdata, config.test_url, config.test_host, (err, proxy) => {
      if(err) {
        throw err;
      }

      parse(proxy, (err, result) => {
        if(err) {
          throw err;
        }

        if(!result || result.length === 0) {
          throw new Error('No valid proxy informations found');
        }

        let p = proxy.shift();

        if(p.type === 'direct') {
          // pass, nothing to do
        } else {
          npm.config.set('http-proxy', p.url);
          npm.config.set('https-proxy', p.url);
        }
      });
    });
  });
};

module.exports = atomPACProxy;

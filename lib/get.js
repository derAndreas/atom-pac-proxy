const http = require('http');

/**
 * Download the raw proxy PAC script from the server
 * and callback the result with `err, result`.
 *
 * @param  {String}   url      URL to the proxy PAC file on the server
 * @param  {Function} callback callback with `err, result` signature
 */
const getPACProxy = (url, callback) => {
  http.get(url, (res) => {
    let rawData = '';

    if (res.statusCode !== 200) {
      res.resume();
      return callback(
        new Error(`Request Failed.\nStatus Code: ${res.statusCode}`), null
      );
    }

    res.setEncoding('utf8');
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      callback(null, rawData);
    });
  }).on('error', (e) => {
    callback(error, null);
  });
};

module.exports = getPACProxy;

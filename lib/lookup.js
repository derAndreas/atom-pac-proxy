const pac = require('pac-resolver');

/**
 * Invoke the PAC lookup module
 *
 * @param  {String}   pacdata  the PAC script from the proxy
 * @param  {String}   url      the url to find out the proxy for
 * @param  {String}   host     the hostname to find out the proxy for
 * @param  {Function} callback callback with `err, result` signature
 */
const pacResolve = (pacdata, url, host, callback) => {
  let FindProxyForURL = pac(pacdata);

  FindProxyForURL(url, host, (err, proxy) => {
    if(err) {
      return callback(err, null);
    }

    callback(null, proxy);
  });
};

module.exports = pacResolve;

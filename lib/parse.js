
const re_proxy = /^(SOCKS[45]?|HTTPS?|PROXY)\s+([^:]+):(\d+)$/i;

/**
 * Parse the result proxy line into an array of objects
 * for the gather proxy informations.
 *
 * Multiple proxs should be in order, because of returning array.
 *
 * @param  {String}   line     Proxy line to parse
 * @param  {Function} callback callback with `err, result` signature
 */
const parseProxy = (line, callback) => {
  let result = [];
  line
    .trim()
    .split(';')
    .forEach((el) => {
      el = el.toLowerCase().trim();

      if(el == 'direct') {
        result.push({
          type: 'direct'
        });
      } else {
        let m = re_proxy.exec(el);
        if(m) {
          result.push({
            type: m[1],
            host: m[2],
            port: m[3],
            url: m[2] + ':' + m[3]
          })
        }
      }
    });

  callback(null, result);
};

module.exports = parseProxy;

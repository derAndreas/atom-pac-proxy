# atom-pac-proxy - set http-proxy with PAC url

The package is created to work within a company environment,
where there is a [PAC Proxy setup][pac-wikipedia].

## install

copy the `pac-proxy.js` and `package.json` into the `~/.atom/packages` folder.
Change the URL of the PAC Server in the `.js` file.

_NOTE:_ At the moment there is not a config option to change this within atom.
This is on the TODO list :)

## informations

PAC (proxy-auto-config) return proxy settings based on the URL that you
want to reach. With the result, the browser can update their settings.

In atom.io the proxy can be configured to a direct proxy server, but not
with a PAC. This is because atom.io and APM rely on NPM, which also cannot
handle any PAC.

This ATOM package is designed, to be downloaded as ZIP (from build folder)
and copied into the `~/.atom/packages` folder.

There are dependecies (which are bundled with browserify), so that the
package itself does not need any externel modules to run.


## TODO

- find a way to get config options into the settings from atom
  to configure the PAC url not in the .js code


[pac-wikipedia]: http://wikipedia.org/wiki/Proxy_auto-config

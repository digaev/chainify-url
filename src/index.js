/* eslint-disable no-param-reassign */

const urlBuilder = require('./url-builder');

function pathify(object, path, enders) {
  const pathLength = path.length + 1;

  return new Proxy(object, {
    get(target, prop) {
      const cb = enders[prop];

      if (cb) {
        return cb(path.slice());
      }

      path.length = pathLength;
      path[pathLength - 1] = { prop };

      const proxy = pathify((param) => {
        path[pathLength - 1].param = param;
        return proxy;
      }, path, enders);

      target[prop] = proxy;
      return proxy;
    },
  });
}

function chainify(baseURL, enders) {
  baseURL = new URL(baseURL);

  const proxy = new Proxy({}, {
    get(target, prop) {
      const cb = enders[prop];

      if (cb) {
        return (path) => cb(urlBuilder(baseURL, path));
      }
      return cb;
    },
  });

  return pathify({}, [], proxy);
}

module.exports = chainify;

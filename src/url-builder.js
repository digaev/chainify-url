/* eslint-disable no-param-reassign */

function urlBuilder(baseURL, path) {
  const pathname = path.map((p) => {
    if (p.param === undefined) {
      return encodeURIComponent(p.prop);
    }

    return `${encodeURIComponent(p.prop)}/${encodeURIComponent(p.param)}`;
  }).join('/');

  return new URL(pathname, baseURL);
}

module.exports = urlBuilder;

const { assert } = require('chai');

const chainify = require('../src');

describe('chainify', () => {
  it('creates a chain', () => {
    const chain = chainify('https://example.com/api/', {
      url(url) {
        return url;
      },

      getURL(url) {
        return () => url;
      },
    });

    assert.equal(chain.foo.url.href, 'https://example.com/api/foo');
    assert.equal(chain.foo.getURL().href, 'https://example.com/api/foo');

    assert.equal(chain.foo.bar.baz.url.href, 'https://example.com/api/foo/bar/baz');
    assert.equal(chain.foo.bar('baz').url.href, 'https://example.com/api/foo/bar/baz');

    assert.equal(chain.foo(1).bar(2).url.href, 'https://example.com/api/foo/1/bar/2');
    assert.equal(chain.foo(3).bar(4).url.href, 'https://example.com/api/foo/3/bar/4');

    assert.equal(chain.users['bar baz'].url.href, 'https://example.com/api/users/bar%20baz');
    assert.equal(chain.users('bar/baz').getURL().href, 'https://example.com/api/users/bar%2Fbaz');
  });
});

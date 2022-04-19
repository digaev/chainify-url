# Chainify URL

[![CircleCI](https://circleci.com/gh/digaev/chainify-url/tree/master.svg?style=svg)](https://circleci.com/gh/digaev/chainify-url/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/digaev/chainify-url/badge.svg?branch=master)](https://coveralls.io/github/digaev/chainify-url?branch=master)

Object oriented URL builder.

## Installation

```
npm install chainify-url
```

## Usage

See [sample project](example/src/index.js) and examples below.

## Why?

Have you ever concatenated strings to build a URL? With this library you can do the same (and not only) but in an object oriented way — by chaining properties. Huh? 😳 Watch this:

```js
import chainify from 'chainify-url';

// Pass a string or a URL as baseURL
const chain = chainify('https://example.com/', {
  // Define "chain enders" - the rightmost properties that end the chain
  url(url) {
    // It is not necessarily to return the URL or any other value from enders,
    // but we are going to read this property
    return url;
  },

  // We want this property to be a function
  build(url) {
    return () => url;
  }
});

// Build a chain

chain.foo.bar.baz.url.href; // => 'https://example.com/foo/bar/baz'

chain.foo('bar baz').build().href; // => 'https://example.com/foo/bar%20baz'
```

That's it! 🙂 Yes, it's that simple. Now let's look at another, more realistic example, a Discord client:

```js
import axios from 'axios'; // Or any other HTTP client
import chainify from 'chainify-url';

const api = chainify('https://discord.com/api/v9/', {
  get: (url) => (config = {}) => {
    // What if there are search parameters? 🤔 Pass them in config!
    if (config.search) {
      url.search = new URLSearchParams(config.search).toString();
    }

    return axios.get(url.href, { headers: config.headers })
  },

  // Let's add a method for POSTing requests
  post: (url) => (config = {}) => {
    if (config.search) {
      url.search = new URLSearchParams(config.search).toString();
    }

    return axios.post(url.href, config.data, { headers: config.headers })
  },
});

// GET https://discord.com/api/v9/users/%40me
api.users('@me').get({
  headers: {
    Authorization: 'Bearer <ACCESS_TOKEN>',
  }
})
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error.message);
  });

// Exactly the same URL as above, but built by accessing the property
api.users['@me'].get({
  headers: {
    Authorization: 'Bearer <ACCESS_TOKEN>',
  }
});

// GET https://discord.com/api/v9/users/%40me/guilds/12345/member
api.users('@me').guilds(12345).member.get({
  headers: {
    Authorization: 'Bearer <ACCESS_TOKEN>',
  }
});

// POST https://discord.com/api/v9/guilds/12345/channels
api.guilds(12345).channels.post({
  data: {
    name: 'My Channel',
    type: 0,
    // ...
  },
  headers: {
    Authorization: 'Bearer <ACCESS_TOKEN>',
  }
});
```
We just turned our URL builder into an HTTP client that covers every endpoint, even with the deepest nesting, WOAH! 😀 API calls are intuitive and look very similar to the endpoints they use, no additional classes or functions required, simplicity and readability, everything is right here!

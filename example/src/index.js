import 'source-map-support/register';

import axios from 'axios';
import chainify from 'chainify-url';

const api = chainify('https://api.open-meteo.com/v1/', {
  get: (url) => (config) => {
    if (config.search) {
      // eslint-disable-next-line no-param-reassign
      url.search = new URLSearchParams(config.search)
        .toString()
        .replace(/%2C/g, ',');
    }

    return axios.get(url.href);
  },
});

// https://api.open-meteo.com/v1/forecast?latitude=6.00504&longitude=20.69991&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=UTC
api.forecast.get({
  search: {
    latitude: '6.00504',
    longitude: '20.69991',
    daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset',
    timezone: 'UTC',
  },
})
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.error(error.message);
  });

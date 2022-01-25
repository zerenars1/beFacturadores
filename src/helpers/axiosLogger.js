const axios = require('axios');
const { logRequests } = require('./couchDB');

function intercep() {
  axios.interceptors.request.use((req) => {
    logRequests(req);
    return req;
  });

  axios.interceptors.response.use((res) => {
    const { data, status, statusText, headers, config } = res;
    logRequests({
      status,
      statusText,
      headers,
      config,
      data
    });
    return res;
  }, (error) => {
    if (error.response) {
      const { data, status, headers } = error.response;
      logRequests({ data, status, headers });
    } else if (error.request) {
      logRequests(error.toJSON());
    } else {
      logRequests({ message: error.message });
    }
    return Promise.reject(error);
  });
}

module.exports = intercep;

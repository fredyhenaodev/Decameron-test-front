import axios from 'axios';

const getClient = () => {
  const options = {
    baseURL: 'https://api-decameron.tk/api/'
  };
  if (localStorage.token) {
    options.headers = {
      Authorization: `Bearer ${localStorage.token}`
    };
  }

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    requestError => Promise.reject(requestError)
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status >= 500) {
        console.log('Error 500');
      }

      return Promise.reject(error.response.data);
    }
  );

  return client;
};

class ApiClient {
  constructor() {
    this.client = getClient();
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post = (url, data = {}, conf = {}) => this.client
    .post(url, data, conf)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));

  put = (url, data = {}, conf = {}) => this.client
    .put(url, data, conf)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));

  patch = (url, data = {}, conf = {}) => this.client
    .patch(url, data, conf)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    return getClient()
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  delete(url, conf = {}) {
    return getClient()
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  head(url, conf = {}) {
    return getClient()
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  options(url, conf = {}) {
    return getClient()
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  post(url, data = {}, conf = {}) {
    return getClient()
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  put(url, data = {}, conf = {}) {
    return getClient()
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  patch(url, data = {}, conf = {}) {
    return getClient()
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};

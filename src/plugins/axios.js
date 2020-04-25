"use strict";

import Vue from 'vue';
import axios from "axios";
import LocalStorageService from "../services/storage/localStorageService";

const localStorageService = LocalStorageService.getService();

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
 config => {
    config.headers.Accept = "application/json"

    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Add a token request interceptor
_axios.interceptors.request.use(
  config => {
    const token = localStorageService.getAccessToken();
    if (token !== null) {
      config.headers['Authorization'] = 'Bearer ' + token;
    } else {
      // log error? check if token!==null logic works
    }
    return config;
  },
  error => {
    Promise.reject(error)
  })

// Add a token response interceptor
_axios.interceptors.response.use(
  response => {
    if (response.request.responseURL.includes("oauth/token"))
      localStorageService.setToken(response.data)
    return response
  },
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;
      return axios.post('http://bouldergoals.test/oauth/token',
        {
          'grant_type': 'refresh_token',
          'client_id': 2,
          'client_secret': 'axRhKwudPT9e6smaYzbe5TLk3U8CUpLv2lGO8EF6',
          "refresh_token": localStorageService.getRefreshToken()
        })
        .then(res => {
          if (res.status === 201) {
            // 1) put token to LocalStorage
            localStorageService.setToken(res.data);

            // 2) Change Authorization header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        })
    }

    // return Error object with Promise
    return Promise.reject(error);
  })

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;

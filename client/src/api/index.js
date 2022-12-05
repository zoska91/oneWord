import axios from 'axios';

const apiURL = 'http://localhost:8080/api';

const instance = axios.create({
  baseURL: apiURL,
  timeout: 1000,
});

export const api = {
  // auth
  login: ({ email, password }) => instance.post('/auth/login', { username: email, password }),
  register: ({ email, password }) => instance.post('/auth/register', { username: email, password }),

  //settings
};

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_REST_API_URL,
  withCredentials: true
});

export const loadFiles = () => api.get('/').then((response) => response.data);

export const fileCreate = (file) =>
  api
    .post('/', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data);

export const logDownloadCount = (id, count) =>
  api.post(`/${id}`, { count }).then((response) => response.data);

import axios from 'axios';

const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

http.defaults.headers.common['Authorization'] = 'API-KEY';
http.defaults.headers.post['Content-Type'] = 'application/json';

export default http;
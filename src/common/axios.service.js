import axios from 'axios';

const http = axios.create({
  baseURL: 'https://cobafirebase-f8575.firebaseio.com/'
});

export default http;
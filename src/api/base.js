import axios from 'axios';
import get from 'local-storage';

function api() {
  let token = get('token');

  return axios.create({
    baseURL: '/api',
    headers: {
      Authorization: "Bearer " + token
    }
  })
}

export default api;
import axios from 'axios';
import get from 'local-storage';

function api() {
  let token = get('token');

  return axios.create({
    baseURL: '/api',
    headers: {
      'x-access-token': token
    }
  })
}

export default api;
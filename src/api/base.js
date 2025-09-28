import axios from 'axios';
import get from 'local-storage';

function api() {
  let token = get('token');

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: "Bearer " + token
    }
  })
}

export default api;
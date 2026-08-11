import axios from 'axios';
import get from 'local-storage';

// Instância axios separada da usada pelo candidato (src/api/base.js) — lê o
// token da chave "adminToken" (nunca "token") para que a sessão de admin e a
// sessão de candidato possam coexistir no mesmo navegador sem se misturar.
function adminApi() {
  let token = get('adminToken');

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: "Bearer " + token
    }
  })
}

export default adminApi;

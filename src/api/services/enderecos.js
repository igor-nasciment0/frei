import axios from "axios";

export async function getEnderecoCompleto(CEP) {
  const stringCep = [...CEP].filter(char => Number.parseInt(char) !== Number.isNaN(char)).join('');
  const r = await axios.get(`https://viacep.com.br/ws/${stringCep}/json/`);

  return r.data;
}
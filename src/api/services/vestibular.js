import api from "../base";

export async function getStatusVestibular() {
  const r = await api().get("/parameters");
  return r.data;
}
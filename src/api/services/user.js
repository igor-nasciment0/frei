import api from "../base";

export async function login(loginData) {
    const r = await api().post('/users/login', loginData);
    return r.data;
}
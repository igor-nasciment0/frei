import api from "../base";

export async function login(loginData) {
    return await api().post('/users/login', loginData);
}
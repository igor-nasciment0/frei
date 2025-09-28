import api from "../base";

export async function login(dadosLogin) {
    const r = await api().post('/users/login', dadosLogin);
    return r.data;
}

export async function recuperacaoSenha(dados) {
    const r = await api().post('/users/forgot-password', dados);
    return r.data;
}

export async function trocaSenha(dados) {
    const r = await api().post('/users/reset-password', dados);
    return r.data;
}
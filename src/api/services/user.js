import api from "../base";

export async function cadastro(dadosCadastro) {
    const r = await api().post('/users', dadosCadastro);
    return r.data;
}

export async function login(dadosLogin) {
    const r = await api().post('/users/login', dadosLogin);
    return r.data;
}

export async function atualizaUsuario(novosDados) {
    const r = await api().put('/users/profile', novosDados);
    return r;
}

export async function recuperacaoSenha(dados) {
    const r = await api().post('/users/forgot-password', dados);
    return r.data;
}

export async function trocaSenha(dados) {
    const r = await api().post('/users/reset-password', dados);
    return r.data;
}

export async function getInfoUsuario() {
    const r = await api().get('/users/profile');

    return r.data;
}
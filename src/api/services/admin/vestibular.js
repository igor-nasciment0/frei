import adminApi from "../../adminBase";

export async function listarEdicoes() {
    const r = await adminApi().get('/admin/parameters');
    return r.data;
}

export async function getEdicao(id) {
    const r = await adminApi().get('/admin/parameters/' + id);
    return r.data;
}

export async function criarEdicao(dadosEdicao) {
    const r = await adminApi().post('/admin/parameters', dadosEdicao);
    return r.data;
}

export async function atualizarEdicao(id, dadosEdicao) {
    const r = await adminApi().put('/admin/parameters/' + id, dadosEdicao);
    return r.data;
}

export async function ativarEdicao(id) {
    const r = await adminApi().post('/admin/parameters/' + id + '/activate');
    return r.data;
}

import adminApi from "../../adminBase";

export async function login(dadosLogin) {
    const r = await adminApi().post('/admin/auth/login', dadosLogin);
    return r.data;
}

export async function bootstrap(dadosBootstrap) {
    const r = await adminApi().post('/admin/auth/bootstrap', dadosBootstrap);
    return r.data;
}

export async function criarAdmin(novoAdmin) {
    const r = await adminApi().post('/admin/users', novoAdmin);
    return r.data;
}

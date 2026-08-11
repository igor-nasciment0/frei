import adminApi from "../../adminBase";

export async function getDashboard(vestibularParametersId) {
    const r = await adminApi().get('/admin/enrollments/dashboard', {
        params: vestibularParametersId ? { vestibularParametersId } : {}
    });
    return r.data;
}

export async function listarInscricoes({ search, status, vestibularParametersId, page = 1, pageSize = 20 } = {}) {
    const r = await adminApi().get('/admin/enrollments', {
        params: { search, status, vestibularParametersId, page, pageSize }
    });
    return r.data;
}

export async function getInscricao(id) {
    const r = await adminApi().get('/admin/enrollments/' + id);
    return r.data;
}

export async function resetarSenha(id, novaSenha) {
    const r = await adminApi().post('/admin/enrollments/' + id + '/reset-password', {
        newPassword: novaSenha || null
    });
    return r.data;
}

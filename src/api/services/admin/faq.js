import adminApi from "../../adminBase";

export async function listarFAQs() {
    const r = await adminApi().get('/admin/faqs');
    return r.data;
}

export async function getFAQ(id) {
    const r = await adminApi().get('/admin/faqs/' + id);
    return r.data;
}

export async function criarFAQ(dadosFAQ) {
    const r = await adminApi().post('/admin/faqs', dadosFAQ);
    return r.data;
}

export async function atualizarFAQ(id, dadosFAQ) {
    const r = await adminApi().put('/admin/faqs/' + id, dadosFAQ);
    return r.data;
}

export async function desativarFAQ(id) {
    const r = await adminApi().delete('/admin/faqs/' + id);
    return r.data;
}

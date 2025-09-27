import api from "../base";

export async function getCursos() {
    const r = await api().get("/courses");
    return r.data;
}

export async function getCursoId(idCurso) {
    const r = await api().get("/courses/" + idCurso);
    return r.data;
}

export async function getCursoImagem(idCurso) {
    const r = await api().get("/courses/" + idCurso + "/image");
    return r.data;
}
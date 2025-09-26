import api from "../base";

export async function getCursos() {
    return await api().get("/courses");
}

export async function getCursoId(idCurso) {
    return await api().get("/courses/" + idCurso);
}

export async function getCursoImagem(idCurso) {
    return await api().get("/courses/" + idCurso + "/image");
}
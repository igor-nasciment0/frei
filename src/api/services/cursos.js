import api from "../base";

export async function getCursos() {
    const r = await api().get("/courses");
    return r.data;
}

export async function getCursoId(idCurso) {
    const r = await api().get("/courses/" + idCurso);
    return r.data;
}

export async function getCursoImagem(idImagem) {
    const r = await api().get("/courses/" + idImagem + "/image", { responseType: "blob" });
    return r.data;
}

export async function getCursoHorarios(idCurso) {
    const r = await api().get("/courses/" + idCurso + "/periods");
    return r.data;
}
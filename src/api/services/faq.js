import api from "../base";

export async function getFAQ() {
    const r = await api().get("/faqs");
    return r.data;
}
import api from "../base";

export async function getFAQ() {
    return await api().get("/faqs");
}
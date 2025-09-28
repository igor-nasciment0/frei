import React from "react";

export function formatarData(stringData) {
  return new Date(stringData).toLocaleDateString()
}

export function formatarComoHTML(texto) {
  const html = new DOMParser().parseFromString(texto, "text/html");
  return <span dangerouslySetInnerHTML={{ __html: html.body.innerHTML }} />;
}

export function corrigeURLVideo(url) {
  try {
    const u = new URL(url);

    let videoId = "";
    let params = "";

    if (u.hostname.includes("youtu.be")) {
      // Caso short link: https://youtu.be/VIDEOID
      videoId = u.pathname.slice(1); // remove a primeira "/"
    } else if (u.hostname.includes("youtube.com")) {
      // Caso normal: https://www.youtube.com/watch?v=VIDEOID
      videoId = u.searchParams.get("v");
    }

    // Se existir uma playlist ou outros parâmetros (ex: ?list=...)
    const listParam = u.searchParams.get("list");
    if (listParam) {
      params += `?list=${listParam}`;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}${params}` : null;
  } catch {
    return null; // URL inválida
  }
}
import { Link, useOutletContext } from "react-router";
import "./index.scss";
import { useEffect, useState } from "react";
import callApi from "../../../../../api/callAPI";
import { getCursoId } from "../../../../../api/services/cursos";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { sleep } from "../../../../../util/general";
import { corrigeURLVideo, formatarComoHTML } from "../../../../../util/string";


export default function DetalhesCurso() {

  const idCurso = useOutletContext();

  const [infoCurso, setInfoCurso] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await callApi(getCursoId, false, idCurso);

      if (r) {
        await sleep(1000);
        setInfoCurso(r);
        setLoading(false);
      }
    })();
  }, [])

  function separaStringIdade(string) {
    if (!string)
      return;

    const resultado = [];

    resultado[0] = string.slice(0, string.indexOf("anos") + 4);
    resultado[1] = string.slice(string.indexOf("anos") + 4);

    return resultado;
  }

  return (
    <section className="curso-detalhes">
      {!loading &&
        <h3 className='nav'>Frei Online {'>'} Cursos {'>'} {infoCurso?.name}</h3>
      }

      <Link className="voltar" to=".." >{"<"} Voltar</Link>

      {loading ?
        <Skeleton height={250} style={{ marginBottom: '3rem' }} /> :
        <>
          {infoCurso?.apresentationVideoUrl &&
            <iframe className="banner" src={corrigeURLVideo(infoCurso?.apresentationVideoUrl)} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          }
        </>
      }

      <section className="secao">
        <h3 className="secao-titulo">{loading ? <Skeleton /> : "Visão Geral"}</h3>
        <div className="card">
          <p>
            {loading ? <Skeleton count={10} /> : formatarComoHTML(infoCurso?.description)}
          </p>
        </div>
      </section>

      <section className="secao">
        <h3 className="secao-titulo">{loading ? <Skeleton /> : "Informações"}</h3>

        {loading ? <Skeleton height={300} /> :
          <table className="tabela-infos">
            <tbody>
              <tr>
                <td className="label">Carga Horária</td>
                <td>
                  <div className="valor">
                    <img src="/assets/images/icons/relogio.svg" alt="" /> {infoCurso?.workload}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="label">Idade Mínima/Máxima</td>
                <td>
                  <div className="valor">
                    <img src="/assets/images/icons/calendario2.svg" alt="" />
                    <span>
                      {separaStringIdade(infoCurso?.minAge)[0]} <small>{separaStringIdade(infoCurso?.minAge)[1]}</small>
                    </span>
                    <img src="/assets/images/icons/calendario2.svg" alt="" />
                    <span>
                      {separaStringIdade(infoCurso?.maxAge)[0]} <small>{separaStringIdade(infoCurso?.maxAge)[1]}</small>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="label">Escolaridade mínima</td>
                <td>
                  <div className="valor">
                    <img src="/assets/images/icons/chapeu.svg" alt="" /> {infoCurso?.minSchoolLevel}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="label">Contribuição mensal</td>
                <td>
                  <div className="valor">
                    <img src="/assets/images/icons/contribuicao.svg" alt="" /> {infoCurso?.contribution}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="label">Períodos</td>
                <td>
                  <div className="valor">
                    <img src="/assets/images/icons/alarme.svg" alt="" />
                    {infoCurso?.availablePeriods.filter(periodo => periodo.isActive).map(periodo =>
                      <span>
                        {periodo.entryTime} a {periodo.exitTime} <small>{periodo.name}</small>
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        }
      </section>

      <section className="secao">
        <h3 className="secao-titulo">{loading ? <Skeleton /> : "Mercado de Trabalho"}</h3>
        <div className="card">
          <p>
            {loading ? <Skeleton count={5} /> : formatarComoHTML(infoCurso?.jobMarket)}
          </p>
        </div>
      </section>
    </section>
  );
}

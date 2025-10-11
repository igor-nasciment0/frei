import { useEffect, useState } from "react";
import "./index.scss";
import callApi from "../../../../api/callAPI";
import { getInscricao } from "../../../../api/services/inscricao";
import { useNavigate } from "react-router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LinhaTempo from "./components/linhaTempo/linhaTempo";
import ToasterContainer from "../../../../components/toaster_container";

export default function Acompanhamento() {

  const navigate = useNavigate();

  const [dadosInscricao, setDadosInscricao] = useState();
  const [naoPossui, setNaoPossui] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await callApi(getInscricao);

      if (r.status == 404)
        setNaoPossui(true);

      else setDadosInscricao(r.data);

      setTimeout(() => setCarregando(false), 1000)
    })();
  }, [])

  if (naoPossui && !carregando)
    return (
      <section className="sem-inscricao">
        <h2>Acompanhamento</h2>
        <p>Você ainda não possui inscrição.</p>

        <button onClick={() => navigate("/inscricao")}>Realizar pré-inscrição</button>
      </section>
    )

  return (
    <section className="acompanhamento-page">

      <ToasterContainer />

      {
        !carregando &&
        <h3 className='nav'>Frei Online {'>'} Acompanhamento</h3>
      }

      <section className="acompanhamento">
        <h2>{carregando ? <Skeleton /> : "Acompanhamento"}</h2>
        <div className="opcoes">
          <SkeletonTheme baseColor="#e0e0e0" highlightColor="#ffffffff">
            <div className="card-opcao">
              <span className="icon-container">
                <img src="/assets/images/icons/sacola.svg" alt="" />
              </span>
              <span className="option-label">{carregando ? <Skeleton /> : "Primeira Opção"}</span>
              <h3>{carregando ? <Skeleton /> : dadosInscricao?.firstChoice.courseName}</h3>
              <p>{carregando ? <Skeleton /> : dadosInscricao?.firstChoice.periodName}</p>
            </div>
            <div className="card-opcao">
              <span className="icon-container">
                <img src="/assets/images/icons/sacola.svg" alt="" />
              </span>
              <span className="option-label">{carregando ? <Skeleton /> : "Segunda Opção"}</span>
              <h3>{carregando ? <Skeleton /> : dadosInscricao?.secondChoice.courseName}</h3>
              <p>{carregando ? <Skeleton /> : dadosInscricao?.secondChoice.periodName}</p>
            </div>
          </SkeletonTheme>
        </div>
      </section>

      <section className="proximos-passos">
        <h2>{carregando ? <Skeleton /> : "Próximos Passos"}</h2>

        {!carregando &&
          <LinhaTempo dadosInscricao={dadosInscricao} />
        }
      </section>
    </section>
  );
};
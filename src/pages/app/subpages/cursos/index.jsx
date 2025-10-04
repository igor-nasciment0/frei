import { Outlet, useNavigate, useParams } from "react-router";
import "./index.scss";
import { useEffect, useState } from "react";
import callApi from "../../../../api/callAPI";
import { getCursoImagem, getCursos } from "../../../../api/services/cursos";
import Carregamento from "../../../../components/carregamento";

export default function Cursos() {

  const [cursos, setCursos] = useState();

  useEffect(() => {
    async function getData() {
      setCursos(await callApi(getCursos));
    }

    getData();
  }, [])

  const { id: idCurso } = useParams();

  if (idCurso)
    return (<Outlet context={idCurso} />)

  if (!cursos)
    return <Carregamento />

  return (
    <section className="cursos">
      <h3 className='nav'>Frei Online {'>'} Início</h3>

      <h2 className="titulo-pagina">Nossos Cursos</h2>

      <div className="grid">
        {cursos.map((curso, index) => (
          <CardCurso infoCurso={curso} key={index} />
        ))}
      </div>
    </section>
  );
}

function CardCurso({ infoCurso }) {

  const [imagemURL, setImagemURL] = useState();
  const navigate = useNavigate();  

  useEffect(() => {
    let currentUrl = '';

    const fetchImage = async () => {
      if (infoCurso.imageId) {
        try {
          const blob = await callApi(getCursoImagem, false, infoCurso.imageId);
          currentUrl = URL.createObjectURL(blob);
          setImagemURL(currentUrl);
        } catch (error) {
          console.error("Erro ao buscar a imagem do curso:", error);
        }
      }
    };

    fetchImage();

    return () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [infoCurso.imageId]);

  return (
    <div className="card">
      <div
        className="card-imagem"
        style={{ backgroundImage: `url(${imagemURL})` }}
      ></div>

      <div className="card-conteudo">
        <h3 className="card-titulo">{infoCurso.name}</h3>

        <div className="tags">
          <span className="tag">{infoCurso.type}</span>
          <span className="tag">{infoCurso.workload}</span>
        </div>

        <button className="btn-detalhes" onClick={() => navigate('/cursos/' + infoCurso.id)}>
          Detalhes
          <img src="/assets/images/icons/seta.svg" alt="" />
        </button>
      </div>
    </div>
  )
}
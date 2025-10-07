import { Outlet, useNavigate, useParams } from "react-router";
import "./index.scss";
import { useEffect, useState } from "react";
import callApi from "../../../../api/callAPI";
import { getCursoImagem, getCursos } from "../../../../api/services/cursos";
import Carregamento from "../../../../components/carregamento";
import { sleep } from "../../../../util/general";

export default function Cursos() {

  const [cursos, setCursos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [cursosFiltrados, setCursosFiltrados] = useState([]);

  const tiposCurso = [...new Set(cursos.map(c => c.type.trim()))];

  useEffect(() => {
    async function getData() {
      const r = (await callApi(getCursos));
      for(const curso of r) {
        curso.image = await fetchImage(curso.imageId);
      }
      await sleep(500);
      setCursos(r);
    }

    getData();
  }, [])

  useEffect(() => {
    if (filtro) {
      setCursosFiltrados(cursos.filter(c => c.type === filtro));
    } else {
      setCursosFiltrados(cursos);
    }
  }, [filtro, cursos])

  const { id: idCurso } = useParams();

  if (idCurso)
    return (<Outlet context={idCurso} />)

  if (!cursos.length)
    return <Carregamento />

  return (
    <section className="cursos">
      <h3 className='nav'>Frei Online {'>'} Cursos</h3>

      <h2 className="titulo-pagina">Nossos Cursos</h2>

      <div className="filtro">
        {tiposCurso.map((tipo, index) => (
          <button
            key={index}
            className={filtro === tipo ? 'ativo' : ''}
            onClick={() => setFiltro(filtro === tipo.trim() ? '' : tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>

      <div className="grid">
        {cursosFiltrados.map((curso, index) => (
          <CardCurso infoCurso={curso} key={index} />
        ))}
      </div>
    </section>
  );
}

function CardCurso({ infoCurso }) {

  const navigate = useNavigate();

  return (
    <div className="card">
      <div
        className="card-imagem"
        style={{ backgroundImage: `url(${infoCurso.image})` }}
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

const fetchImage = async (imageId) => {
  if (imageId) {
    try {
      const blob = await callApi(getCursoImagem, false, imageId);
      let currentUrl = URL.createObjectURL(blob);
      return currentUrl;
    } catch (error) {
      console.error("Erro ao buscar a imagem do curso:", error);
    }
  }
};
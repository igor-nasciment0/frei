import { Outlet, useNavigate, useParams } from "react-router";
import "./index.scss";
import { useEffect, useState } from "react";
import callApi from "../../../../api/callAPI";
import { getCursos } from "../../../../api/services/cursos";
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

  const navigate = useNavigate();

  if (idCurso)
    return (<Outlet context={idCurso} />)

  if(!cursos)
    return <Carregamento />

  return (
    <section className="cursos">
      <h3 className='nav'>Frei Online {'>'} Início</h3>

      <h2 className="titulo-pagina">Nossos Cursos</h2>

      <div className="grid">
        {cursos.map((curso, index) => (
          <div key={index} className="card">
            <div
              className="card-imagem"
              style={{ backgroundImage: `url(${curso.imagem})` }}
            ></div>

            <div className="card-conteudo">
              <h3 className="card-titulo">{curso.name}</h3>

              <div className="tags">
                <span className="tag">{curso.tipo}</span>
                <span className="tag">{curso.carga}</span>
              </div>

              <button className="btn-detalhes" onClick={() => navigate('/cursos/' + curso.id)}>
                Detalhes
                <img src="/assets/images/icons/seta.svg" alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Outlet, useParams } from "react-router";
import "./index.scss";
const cursos = [
  {
    titulo: "Técnico em Administração",
    tipo: "Técnico",
    carga: "800 horas",
    imagem: "/assets/images/adm.jpg",
  },
  {
    titulo: "Técnico em Comunicação Visual",
    tipo: "Qualificação",
    carga: "1000 horas",
    imagem: "/assets/images/cv.jpg",
  },
  {
    titulo: "Técnico em Informática",
    tipo: "Técnico",
    carga: "1000 horas",
    imagem: "/assets/images/info.jpg",
  },
];

export default function Cursos() {
  const { curso } = useParams();

  if (curso)
    return (<Outlet context={curso} />)

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
              <h3 className="card-titulo">{curso.titulo}</h3>

              <div className="tags">
                <span className="tag">{curso.tipo}</span>
                <span className="tag">{curso.carga}</span>
              </div>

              <button className="btn-detalhes">
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

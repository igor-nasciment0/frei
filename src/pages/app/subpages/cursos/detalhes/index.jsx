import { useOutletContext } from "react-router";
import "./index.scss";

export default function DetalhesCurso({ infoCurso }) {

  const nomeCurso = useOutletContext();  

  return (
    <section className="curso-detalhes">
      <h3 className='nav'>Frei Online {'>'} Início {'>'} {nomeCurso}</h3>

      <div className="banner">
        <div className="overlay">
          <span className="play-button">▶</span>
          <h2 className="curso-nome">Administração</h2>
        </div>
      </div>

      <section className="secao">
        <h3 className="secao-titulo">Visão Geral</h3>
        <div className="card">
          <p>
            A administração é a gestão de uma organização, que envolve a tomada
            de decisões sobre recursos, pessoas e processos.
          </p>
        </div>
      </section>

      <section className="secao">
        <h3 className="secao-titulo">Informações</h3>
        <table className="tabela-infos">
          <tbody>
            <tr>
              <td className="label">Carga Horária</td>
              <td>
                <div className="valor">
                  <img src="/assets/images/icons/relogio.svg" alt="" /> 1.000 horas
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">Idade Mínima/Máxima</td>
              <td>
                <div className="valor">
                  <img src="/assets/images/icons/calendario2.svg" alt="" />
                  <span>
                    18 anos <small>até 29 de Jan, 2024</small>
                  </span>
                  <img src="/assets/images/icons/calendario2.svg" alt="" />
                  <span>
                    25 anos <small>até 29 de Jan, 2024</small>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">Escolaridade mínima</td>
              <td>
                <div className="valor">
                  <img src="/assets/images/icons/chapeu.svg" alt="" /> Ensino fundamental completo em 2024
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">Contribuição mensal</td>
              <td>
                <div className="valor">
                  <img src="/assets/images/icons/contribuicao.svg" alt="" /> R$ 130,00
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">Períodos</td>
              <td>
                <div className="valor">
                  <img src="/assets/images/icons/alarme.svg" alt="" />
                  <span>
                    07:05 <small>Manhã</small>
                  </span>
                  <span>
                    12:45 <small>Tarde</small>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="secao">
        <h3 className="secao-titulo">Mercado de Trabalho</h3>
        <div className="card">
          <p>
            A administração é a gestão de uma organização, que envolve a tomada
            de decisões sobre recursos, pessoas e processos.
          </p>
        </div>
      </section>
    </section>
  );
}

import { useEffect, useState } from "react";
import "./index.scss";
import callApi from "../../../../api/callAPI";
import { getInscricao } from "../../../../api/services/inscricao";
import Carregamento from "../../../../components/carregamento";
import { useNavigate } from "react-router";

export default function Acompanhamento() {

  const navigate = useNavigate();

  const [dadosUsuario, setDadosUsuario] = useState();
  const [naoPossui, setNaoPossui] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await callApi(getInscricao);

      if (r.status == 404)
        setNaoPossui(true);

      else setDadosUsuario(r.data);

      setTimeout(() => setCarregando(false), 1000)
    })();
  }, [])

  if (carregando)
    return <Carregamento />

  if (naoPossui)
    return (
      <section className="sem-inscricao">
        <h2>Acompanhamento</h2>
        <p>Você ainda não possui inscrição.</p>

        <button onClick={() => navigate("/inscricao")}>Realizar pré-inscrição</button>
      </section>
    )

  return (
    <section className="acompanhamento-page">
      <h3 className='nav'>Frei Online {'>'} Acompanhamento</h3>

      <section className="acompanhamento">
        <h2>Acompanhamento</h2>
        <div className="opcoes">
          <div>
            <span className="icon-container">
              <img src="/assets/images/icons/sacola.svg" alt="" />
            </span>
            <span className="option-label">PRIMEIRA OPÇÃO</span>
            <h3>Técnico em Informática</h3>
            <p>Manhã</p>
          </div>
          <div>
            <span className="icon-container">
              <img src="/assets/images/icons/sacola.svg" alt="" />
            </span>
            <span className="option-label">SEGUNDA OPÇÃO</span>
            <h3>Técnico em Administração</h3>
            <p>Tarde</p>
          </div>
        </div>
      </section>

      <section className="proximos-passos">
        <h2>Próximos Passos</h2>

        <form action="">
          <table className="tabela-form">
            <tbody>
              <tr>
                <td className="label obrigatorio">Carga Horária</td>
                <td className="input">
                  <input type="text" placeholder='Informe o nome' />
                </td>
              </tr>
              <tr>
                <td className="label">Idade Mínima/Máxima</td>
                <td className="input">
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td className="label">Escolaridade mínima</td>
                <td className="input">
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td className="label">Contribuição mensal</td>
                <td className="input">
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td className="label">Períodos</td>
                <td className="input">
                  <input type="text" />
                </td>
              </tr>
            </tbody>
            <tr className='submit'>
              <td>
                <input type="submit" value="Registrar" />
              </td>
            </tr>
          </table>
        </form>
      </section>
    </section>
  );
};
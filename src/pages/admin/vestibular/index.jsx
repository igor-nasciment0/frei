import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import callApi from "../../../api/callAPI";
import { listarEdicoes, ativarEdicao } from "../../../api/services/admin/vestibular";
import { converterDataUTCParaLocalSemMudarDia } from "../../../util/date";
import Carregamento from "../../../components/carregamento";
import "./index.scss";

export default function AdminVestibular() {
  const [edicoes, setEdicoes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    const r = await callApi(listarEdicoes, true);

    if (!r) {
      navigate("/admin/login");
      return;
    }

    setEdicoes(r);
  }

  async function ativar(edicao) {
    if (!confirm(`Tornar esta a edição ativa do vestibular (${converterDataUTCParaLocalSemMudarDia(edicao.startDate)} – ${converterDataUTCParaLocalSemMudarDia(edicao.endDate)})?`)) return;

    const r = await callApi(ativarEdicao, true, edicao.id);
    if (r?.id) carregar();
  }

  return (
    <div className="admin-lista">
      <div className="cabecalho-pagina">
        <p className="eyebrow">Painel administrativo</p>
        <h1>Edições do vestibular</h1>
        <Link to="/admin/vestibular/novo" className="btn-primario">Nova edição</Link>
      </div>

      <p className="aviso">
        Apenas uma edição pode estar ativa por vez — é ela que aparece para os candidatos (<code>GET /parameters</code>)
        e vale para novas inscrições/agendamentos.
      </p>

      {!edicoes && <Carregamento />}

      {edicoes &&
        <table className="admin-table">
          <thead>
            <tr>
              <th>Período de inscrição</th>
              <th>Data da prova</th>
              <th>Divulgação do resultado</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {edicoes.length === 0 &&
              <tr className="vazio"><td colSpan={5}>Nenhuma edição cadastrada ainda.</td></tr>
            }

            {edicoes.map(edicao => (
              <tr key={edicao.id}>
                <td>{converterDataUTCParaLocalSemMudarDia(edicao.startDate)} – {converterDataUTCParaLocalSemMudarDia(edicao.endDate)}</td>
                <td>{edicao.testDate ? converterDataUTCParaLocalSemMudarDia(edicao.testDate) : "—"}</td>
                <td>{edicao.resultPublicationDate ? converterDataUTCParaLocalSemMudarDia(edicao.resultPublicationDate) : "—"}</td>
                <td>
                  <span className={"admin-badge " + (edicao.isActive ? "ativo" : "inativo")}>
                    {edicao.isActive ? "Ativa" : "Inativa"}
                  </span>
                </td>
                <td className="acoes">
                  <Link to={`/admin/vestibular/${edicao.id}`}>Editar</Link>
                  {!edicao.isActive && <button className="acao-ativar" onClick={() => ativar(edicao)}>Ativar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

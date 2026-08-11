import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import callApi from "../../../api/callAPI";
import { listarInscricoes } from "../../../api/services/admin/inscricoes";
import { converterDataUTCParaLocalSemMudarDia } from "../../../util/date";
import Carregamento from "../../../components/carregamento";
import "./index.scss";

const STATUS_LABEL = { Open: "Aberta", Validated: "Validada", Canceled: "Cancelada" };
const PAGE_SIZE = 20;

export default function AdminInscricoes() {
  const [resultado, setResultado] = useState(null);
  const [buscaInput, setBuscaInput] = useState("");
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [pagina, setPagina] = useState(1);
  const navigate = useNavigate();

  // Debounce simples do campo de busca — espera o usuário parar de digitar
  // antes de disparar a requisição (search casa com protocolo, nome, CPF ou e-mail).
  useEffect(() => {
    const t = setTimeout(() => {
      setPagina(1);
      setBusca(buscaInput);
    }, 400);

    return () => clearTimeout(t);
  }, [buscaInput]);

  useEffect(() => { carregar(); }, [busca, status, pagina]);

  async function carregar() {
    const r = await callApi(listarInscricoes, true, { search: busca || undefined, status: status || undefined, page: pagina, pageSize: PAGE_SIZE });

    if (!r) {
      navigate("/admin/login");
      return;
    }

    setResultado(r);
  }

  const totalPaginas = resultado ? Math.max(Math.ceil(resultado.total / resultado.pageSize), 1) : 1;

  return (
    <div className="admin-lista admin-inscricoes">
      <div className="cabecalho-pagina">
        <p className="eyebrow">Painel administrativo</p>
        <h1>Inscrições</h1>
      </div>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por protocolo, nome, CPF ou e-mail…"
          value={buscaInput}
          onChange={e => setBuscaInput(e.target.value)}
        />

        <select value={status} onChange={e => { setStatus(e.target.value); setPagina(1); }}>
          <option value="">Todos os status</option>
          <option value="Open">Aberta</option>
          <option value="Validated">Validada</option>
          <option value="Canceled">Cancelada</option>
        </select>
      </div>

      {!resultado && <Carregamento />}

      {resultado &&
        <table className="admin-table">
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Candidato</th>
              <th>CPF</th>
              <th>1ª opção</th>
              <th>Status</th>
              <th>Inscrito em</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {resultado.items.length === 0 &&
              <tr className="vazio"><td colSpan={7}>Nenhuma inscrição encontrada.</td></tr>
            }

            {resultado.items.map(item => (
              <tr key={item.id}>
                <td>{item.protocol}</td>
                <td>
                  <span className="nome">{item.studentName}</span>
                  <span className="email">{item.studentEmail}</span>
                </td>
                <td>{item.studentCpf}</td>
                <td>{item.firstChoiceCourseName} — {item.firstChoicePeriodName}</td>
                <td>
                  <span className={"admin-badge status-" + item.status.toLowerCase()}>
                    {STATUS_LABEL[item.status] || item.status}
                  </span>
                </td>
                <td>{converterDataUTCParaLocalSemMudarDia(item.createdAt)}</td>
                <td className="acoes">
                  <Link to={`/admin/inscricoes/${item.id}`}>Ver detalhes</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {resultado && resultado.total > 0 &&
        <div className="paginacao">
          <button disabled={pagina <= 1} onClick={() => setPagina(p => p - 1)}>Anterior</button>
          <span>Página {resultado.page} de {totalPaginas} · {resultado.total} inscrições</span>
          <button disabled={pagina >= totalPaginas} onClick={() => setPagina(p => p + 1)}>Próxima</button>
        </div>
      }
    </div>
  );
}

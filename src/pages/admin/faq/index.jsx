import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import callApi from "../../../api/callAPI";
import { listarFAQs, desativarFAQ } from "../../../api/services/admin/faq";
import Carregamento from "../../../components/carregamento";
import "./index.scss";

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    const r = await callApi(listarFAQs, true);

    if (!r) {
      navigate("/admin/login");
      return;
    }

    setFaqs([...r].sort((a, b) => a.order - b.order));
  }

  async function excluir(faq) {
    if (!confirm(`Desativar a pergunta "${faq.question}"?`)) return;

    const r = await callApi(desativarFAQ, true, faq.id);
    if (r !== undefined) carregar();
  }

  return (
    <div className="admin-lista">
      <div className="cabecalho-pagina">
        <p className="eyebrow">Painel administrativo</p>
        <h1>Dúvidas frequentes</h1>
        <Link to="/admin/faq/novo" className="btn-primario">Nova pergunta</Link>
      </div>

      {!faqs && <Carregamento />}

      {faqs &&
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ordem</th>
              <th>Pergunta</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 &&
              <tr className="vazio"><td colSpan={4}>Nenhuma pergunta cadastrada ainda.</td></tr>
            }

            {faqs.map(faq => (
              <tr key={faq.id}>
                <td>{faq.order}</td>
                <td>{faq.question}</td>
                <td>
                  <span className={"admin-badge " + (faq.isActive ? "ativo" : "inativo")}>
                    {faq.isActive ? "Ativa" : "Inativa"}
                  </span>
                </td>
                <td className="acoes">
                  <Link to={`/admin/faq/${faq.id}`}>Editar</Link>
                  {faq.isActive && <button onClick={() => excluir(faq)}>Desativar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

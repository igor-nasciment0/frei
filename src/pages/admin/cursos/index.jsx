import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import callApi from "../../../api/callAPI";
import { listarCursos, desativarCurso } from "../../../api/services/admin/cursos";
import Carregamento from "../../../components/carregamento";
import "./index.scss";

export default function AdminCursos() {
  const [cursos, setCursos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    const r = await callApi(listarCursos, true);

    if (!r) {
      navigate("/admin/login");
      return;
    }

    setCursos(r);
  }

  async function excluir(curso) {
    if (!confirm(`Desativar o curso "${curso.name}"?`)) return;

    const r = await callApi(desativarCurso, true, curso.id);
    if (r !== undefined) carregar();
  }

  return (
    <div className="admin-lista">
      <div className="cabecalho-pagina">
        <p className="eyebrow">Painel administrativo</p>
        <h1>Cursos</h1>
        <Link to="/admin/cursos/novo" className="btn-primario">Novo curso</Link>
      </div>

      {!cursos && <Carregamento />}

      {cursos &&
        <table className="admin-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Carga horária</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cursos.length === 0 &&
              <tr className="vazio"><td colSpan={6}>Nenhum curso cadastrado ainda.</td></tr>
            }

            {cursos.map(curso => (
              <tr key={curso.id}>
                <td>{curso.code}</td>
                <td>{curso.name}</td>
                <td>{curso.type || "—"}</td>
                <td>{curso.workload || "—"}</td>
                <td>
                  <span className={"admin-badge " + (curso.isActive ? "ativo" : "inativo")}>
                    {curso.isActive ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="acoes">
                  <Link to={`/admin/cursos/${curso.id}`}>Editar</Link>
                  {curso.isActive && <button onClick={() => excluir(curso)}>Desativar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

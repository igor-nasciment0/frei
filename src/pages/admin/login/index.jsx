import { set } from "local-storage";
import callApi from "../../../api/callAPI";
import { login } from "../../../api/services/admin/auth";
import "./index.scss";

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../../components/toaster_container";
import PainelInstitucional from "../../../components/painel_institucional";
import { useLoadingBar } from "react-top-loading-bar";

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const { start, complete } = useLoadingBar({
    color: "#C2A46A",
    height: 3,
  });

  async function submit(dados) {
    const r = await callApi(login, true, dados);

    if (r?.token) {
      start("continuous", 0, 100);
      set("adminToken", r.token);
      set("admin", r.admin);
      setTimeout(complete, 750);
      setTimeout(() => navigate("/admin"), 1000);
    }
  }

  return (
    <div className="auth-page admin-auth-page">
      <ToasterContainer />

      <PainelInstitucional
        titulo="Painel"
        destaque="Administrativo"
        descricao="Gerencie cursos, dúvidas frequentes e as edições do vestibular."
        mostrarStats={false}
      />

      <div className="painel-form">
        <div className="card">
          <div>
            <p className="eyebrow">Acesso restrito</p>
            <h2>Entrar no painel</h2>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className={"campo " + (errors.username ? "erro" : "")}>
              <label htmlFor="username">Usuário</label>
              <input
                {...register("username", { required: "Campo obrigatório" })}
                type="text"
                placeholder="usuario.admin"
              />
              {errors.username && <span className="mensagem-erro">{errors.username.message}</span>}
            </div>

            <div className={"campo " + (errors.password ? "erro" : "")}>
              <label htmlFor="password">Senha</label>
              <input
                {...register("password", { required: "Campo obrigatório" })}
                type="password"
              />
              {errors.password && <span className="mensagem-erro">{errors.password.message}</span>}
            </div>

            <button disabled={isSubmitting} className="btn-primario" type="submit">Entrar</button>

            <div className="divisor" />

            <p className="nota">
              Ainda não existe nenhum administrador cadastrado? <Link to="/admin/bootstrap">Criar o primeiro acesso</Link>.
            </p>

            <p className="nota">
              <Link to="/login">Voltar para a área do candidato</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

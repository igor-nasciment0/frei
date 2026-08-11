import callApi from "../../../api/callAPI";
import { bootstrap } from "../../../api/services/admin/auth";
import toast from "react-hot-toast";
import "../login/index.scss";

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../../components/toaster_container";
import PainelInstitucional from "../../../components/painel_institucional";
import { useLoadingBar } from "react-top-loading-bar";

// Tela de criação do primeiro administrador do sistema. Só funciona enquanto
// a coleção "admins" estiver vazia (POST /api/admin/auth/bootstrap) — depois
// disso, novos administradores são criados de dentro do painel (tela
// "Administradores", POST /api/admin/users, autenticada).
export default function AdminBootstrap() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const { start, complete } = useLoadingBar({
    color: "#C2A46A",
    height: 3,
  });

  async function submit(dados) {
    if (dados.password !== dados.confirmarSenha) {
      toast.error("As senhas não conferem.", { duration: 4000 });
      return;
    }

    const payload = { ...dados };
    delete payload.confirmarSenha;

    const r = await callApi(bootstrap, true, payload);

    if (r?.id) {
      start("continuous", 0, 100);
      toast.success("Administrador criado! Faça login para continuar.");
      setTimeout(complete, 750);
      setTimeout(() => navigate("/admin/login"), 1500);
    }
  }

  return (
    <div className="auth-page admin-auth-page">
      <ToasterContainer />

      <PainelInstitucional
        titulo="Primeiro"
        destaque="Acesso"
        descricao="Cadastre o administrador inicial do painel. Depois disso, novos administradores são criados de dentro do próprio painel."
        mostrarStats={false}
      />

      <div className="painel-form">
        <div className="card">
          <div>
            <p className="eyebrow">Configuração inicial</p>
            <h2>Criar primeiro administrador</h2>
            <p className="intro">Disponível apenas enquanto nenhum administrador tiver sido cadastrado.</p>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className={"campo " + (errors.name ? "erro" : "")}>
              <label htmlFor="name">Nome completo</label>
              <input {...register("name", { required: "Campo obrigatório" })} type="text" />
              {errors.name && <span className="mensagem-erro">{errors.name.message}</span>}
            </div>

            <div className="row">
              <div className={"campo " + (errors.username ? "erro" : "")}>
                <label htmlFor="username">Usuário</label>
                <input
                  {...register("username", {
                    required: "Campo obrigatório",
                    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                  })}
                  type="text"
                />
                {errors.username && <span className="mensagem-erro">{errors.username.message}</span>}
              </div>

              <div className={"campo " + (errors.email ? "erro" : "")}>
                <label htmlFor="email">E-mail</label>
                <input {...register("email", { required: "Campo obrigatório" })} type="email" />
                {errors.email && <span className="mensagem-erro">{errors.email.message}</span>}
              </div>
            </div>

            <div className="row">
              <div className={"campo " + (errors.password ? "erro" : "")}>
                <label htmlFor="password">Senha</label>
                <input
                  {...register("password", {
                    required: "Campo obrigatório",
                    minLength: { value: 8, message: "Mínimo de 8 caracteres" },
                  })}
                  type="password"
                />
                {errors.password && <span className="mensagem-erro">{errors.password.message}</span>}
              </div>

              <div className={"campo " + (errors.confirmarSenha ? "erro" : "")}>
                <label htmlFor="confirmarSenha">Confirmar senha</label>
                <input
                  {...register("confirmarSenha", {
                    required: "Campo obrigatório",
                    validate: valor => valor === watch("password") || "As senhas não conferem",
                  })}
                  type="password"
                />
                {errors.confirmarSenha && <span className="mensagem-erro">{errors.confirmarSenha.message}</span>}
              </div>
            </div>

            <div className={"campo " + (errors.accessPassword ? "erro" : "")}>
              <label htmlFor="accessPassword">Senha administrativa</label>
              <input {...register("accessPassword", { required: "Campo obrigatório" })} type="password" />
              {errors.accessPassword && <span className="mensagem-erro">{errors.accessPassword.message}</span>}
            </div>

            <p className="nota">Senha administrativa fixa fornecida pela equipe técnica.</p>

            <button disabled={isSubmitting} className="btn-primario" type="submit">Criar administrador</button>

            <div className="divisor" />

            <p className="nota">
              Já existe um administrador cadastrado? <Link to="/admin/login">Fazer login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

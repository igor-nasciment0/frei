import callApi from "../../api/callAPI";
import { trocaSenha } from "../../api/services/user";
import "./index.scss";

import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import PainelInstitucional from "../../components/painel_institucional";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function TrocarSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.email) navigate("/login");
  }, [location, navigate]);

  async function submit(dados) {
    if (dados.newPassword !== dados.confirmPassword) {
      toast.error("As senhas não conferem");
      return;
    }

    const r = await callApi(trocaSenha, true, {
      ...dados,
      email: location.state.email,
    });

    if (!r.success) {
      toast.error(
        r.message ||
          "Não foi possível alterar a senha. Tente novamente mais tarde."
      );
    } else {
      toast.success("Senha alterada com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    }
  }

  return (
    <div className="auth-page">
      <ToasterContainer />

      <PainelInstitucional />

      <div className="painel-form">
        <div className="card">
          <Link className="voltar" to="/login">← Voltar</Link>

          <div>
            <p className="eyebrow">Área do candidato</p>
            <h2>Trocar senha</h2>
            <p className="intro">Um código de recuperação foi enviado para o seu e-mail. Por favor, verifique.</p>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className={"campo " + (errors.code ? "erro" : "")}>
              <label htmlFor="code">Código de recuperação</label>
              <input
                {...register("code", { required: "Campo obrigatório" })}
                type="text"
              />
              {errors.code && <span className="mensagem-erro">{errors.code.message}</span>}
            </div>

            <div className={"campo " + (errors.newPassword ? "erro" : "")}>
              <label htmlFor="newPassword">Nova senha</label>
              <input
                {...register("newPassword", { required: "Campo obrigatório" })}
                type="password"
              />
              {errors.newPassword && <span className="mensagem-erro">{errors.newPassword.message}</span>}
            </div>

            <div className={"campo " + (errors.confirmPassword ? "erro" : "")}>
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                {...register("confirmPassword", { required: "Campo obrigatório" })}
                type="password"
              />
              {errors.confirmPassword && <span className="mensagem-erro">{errors.confirmPassword.message}</span>}
            </div>

            <button disabled={isSubmitting} className="btn-primario" type="submit">Alterar senha</button>
          </form>
        </div>
      </div>
    </div>
  );
}

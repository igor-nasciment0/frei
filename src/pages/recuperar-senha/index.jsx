import callApi from "../../api/callAPI";
import { recuperacaoSenha } from "../../api/services/user";
import "./index.scss";

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import PainelInstitucional from "../../components/painel_institucional";
import toast from "react-hot-toast";
import { useLoadingBar } from "react-top-loading-bar";

export default function RecuperarSenha() {
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
    const r = await callApi(recuperacaoSenha, true, dados);

    if (r.success) {
      start("continuous", 0, 100);
      setTimeout(() => toast.success("Email enviado!"), 500);
      setTimeout(
        () => navigate("/trocar-senha", { state: { email: dados.Email } }),
        1500
      );
      setTimeout(complete, 800);
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
            <h2>Recuperar senha</h2>
            <p className="intro">Informe o e-mail da sua conta para receber um código de recuperação.</p>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className={"campo " + (errors.Email ? "erro" : "")}>
              <label htmlFor="email">E-mail</label>
              <input
                {...register("Email", { required: "Campo obrigatório" })}
                type="email"
                placeholder="usuario@email.com"
              />
              {errors.Email && <span className="mensagem-erro">{errors.Email.message}</span>}
            </div>

            <button disabled={isSubmitting} className="btn-primario" type="submit">Enviar código de recuperação</button>
          </form>
        </div>
      </div>
    </div>
  );
}

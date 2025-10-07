import { set } from "local-storage";
import callApi from "../../api/callAPI";
import { login } from "../../api/services/user";
import "./index.scss";

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import { generateFormData } from "../../util/form";
import { useLoadingBar } from "react-top-loading-bar";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const { start, complete } = useLoadingBar({
    color: "#4EA2FF",
    height: 2,
  });

  async function submit(loginData) {
    const r = await callApi(login, true, generateFormData(loginData));

    if (r?.token) {
      start("continuous", 0, 100);
      set("token", r.token);
      set("user", r.user);
      setTimeout(complete, 750);
      setTimeout(() => navigate("/"), 1000);
    }
  }

  return (
    <div className="login-page">
      <ToasterContainer />

      <div className="login-left">
        <div className="login-card">
          <form onSubmit={handleSubmit(submit)}>
            {/* E-mail */}
            <div className={"form-group " + (errors.Email ? "erro" : "")}>
              <label htmlFor="email">E-mail</label>
              {errors.Email && (
                <span className="error-message">{errors.Email.message}</span>
              )}
              <input
                {...register("Email", { required: "Campo obrigatório" })}
                type="email"
                placeholder="usuario@email.com"
              />
            </div>

            {/* Senha */}
            <div className={"form-group " + (errors.Password ? "erro" : "")}>
              <label htmlFor="password">Senha</label>
              {errors.Password && (
                <span className="error-message">{errors.Password.message}</span>
              )}
              <input
                {...register("Password", { required: "Campo obrigatório" })}
                type="password"
              />
            </div>

            <div className="esqueci-senha">
              <Link to="/recuperar-senha">Esqueci a senha</Link>
            </div>

            <input
              disabled={isSubmitting}
              className="btn-enter"
              type="submit"
              value="Entrar"
            />

            <span className="link-cadastro">
              Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
            </span>
          </form>
        </div>
      </div>

      <div className="login-right">
        <div className="logo-placeholder">
          <img
            src="/assets/images/logo.svg"
            alt="Logo do Instituto Social Nossa Senhora de Fátima"
          />
        </div>
        <h1 className="main-title">Instituto Social Nossa Senhora de Fátima</h1>
        <h2 className="sub-title">Pré-Inscrições</h2>
      </div>
    </div>
  );
}

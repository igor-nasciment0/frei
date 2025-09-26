import { set } from "local-storage";
import callApi from "../../api/callAPI";
import { login } from "../../api/services/user";
import "./index.scss";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import { generateFormData } from "../../util";

export default function LoginPage() {

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  async function submit(loginData) {    
    const r = await callApi(login, generateFormData(loginData));

    if (r?.token) {
      set("token", r.token);
      navigate("/");
    }
  }

  return (
    <div className="login-page">

      <ToasterContainer />

      <div className="login-left">
        <div className="login-card">
          <form onSubmit={handleSubmit(data => submit(data))}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                {...register("Email", { required: "Campo obrigatório" })}
                type="email"
                placeholder="usuario@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                {...register("Password", { required: "Campo obrigatório" })}
                type="password"
              />
            </div>

            <div className="forgot-password">
              <a href="#">Esqueci a senha</a>
            </div>

            <input className="btn-enter" type="submit" value="Entrar" />
          </form>
        </div>
      </div>

      <div className="login-right">
        <div className="logo-placeholder">
          <img src="/assets/images/logo.svg" alt="Logo do Instituto Social Nossa Senhora de Fátima" />
        </div>
        <h1 className="main-title">Ação Social Nossa Senhora de Fátima</h1>
        <h2 className="sub-title">Pré-Inscrições</h2>
      </div>
    </div>
  );
}

import { set } from "local-storage";
import callApi from "../../api/callAPI";
import { login } from "../../api/services/user";
import "./index.scss";

import { useForm } from 'react-hook-form';
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import { generateFormData } from "../../util/form";

export default function RecuperarSenha() {

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
    <div className="recuperar-senha">

      <ToasterContainer />

      <div className="recuperar-left">

        <div className="recuperar-card">
          <Link to='/login'>{'<'} Voltar</Link>

          <form onSubmit={handleSubmit(data => submit(data))}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                {...register("Email", { required: "Campo obrigatório" })}
                type="email"
                placeholder="usuario@email.com"
              />
            </div>
            <input className="btn-enter" type="submit" value="Enviar código de recuperação" />
          </form>
        </div>
      </div>

      <div className="recuperar-right">
        <div className="logo-placeholder">
          <img src="/assets/images/logo.svg" alt="Logo do Instituto Social Nossa Senhora de Fátima" />
        </div>
        <h1 className="main-title">Ação Social Nossa Senhora de Fátima</h1>
        <h2 className="sub-title">Pré-Inscrições</h2>
      </div>
    </div>
  );
}
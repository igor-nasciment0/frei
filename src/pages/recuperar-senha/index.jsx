import callApi from "../../api/callAPI";
import { recuperacaoSenha } from "../../api/services/user";
import "./index.scss";

import { useForm } from 'react-hook-form';
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import toast from "react-hot-toast";
import { useLoadingBar } from "react-top-loading-bar";

export default function RecuperarSenha() {

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const navigate = useNavigate();

  const { start, complete } = useLoadingBar({
    color: "#4EA2FF",
    height: 2,
  });

  async function submit(dados) {
    const r = await callApi(recuperacaoSenha, true, dados);

    if (r.success) {
      setTimeout(() => toast.success("Email enviado!"), 500);
      setTimeout(() => navigate("/trocar-senha", { state: { email: dados.Email } }), 1500);
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
            <input disabled={isSubmitting} className="btn-enter" type="submit" value="Enviar código de recuperação" />
          </form>
        </div>
      </div>

      <div className="recuperar-right">
        <div className="logo-placeholder">
          <img src="/assets/images/logo.svg" alt="Logo do Instituto Social Nossa Senhora de Fátima" />
        </div>
        <h1 className="main-title">Instituto Social Nossa Senhora de Fátima</h1>
        <h2 className="sub-title">Pré-Inscrições</h2>
      </div>
    </div>
  );
}
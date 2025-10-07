import callApi from "../../api/callAPI";
import { recuperacaoSenha, trocaSenha } from "../../api/services/user";
import "./index.scss";

import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function TrocarSenha() {

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!location.state?.email)
      navigate("/login");
  }, [])

  async function submit(dados) {
    if (dados.password !== dados.confirmPassword) {
      toast.error("As senhas não conferem")
      return;
    }

    const r = await callApi(trocaSenha, true, { ...dados, email: location.state.email });

    if (!r.success) {
      toast.error(r.message || "Não foi possível alterar a senha. Tente novamente mais tarde.");
    }
    else {
      toast.success("Senha alterada com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  return (
    <div className="trocar-senha">

      <ToasterContainer />

      <div className="trocar-left">

        <div className="trocar-card">
          <Link to='/login'>{'<'} Voltar</Link>

          <p>Um código de recuperação foi enviado para o seu e-mail. Por favor, verifique.</p>

          <form onSubmit={handleSubmit(data => submit(data))}>
            <div className="form-group">
              <label htmlFor="code">Código de Recuperação</label>
              <input
                {...register("code", { required: "Campo obrigatório" })}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                {...register("newPassword", { required: "Campo obrigatório" })}
                type="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                {...register("confirmPassword", { required: "Campo obrigatório" })}
                type="password"
              />
            </div>
            <input disabled={isSubmitting} className="btn-enter" type="submit" value="Alterar Senha" />
          </form>
        </div>
      </div>

      <div className="trocar-right">
        <div className="logo-placeholder">
          <img src="/assets/images/logo.svg" alt="Logo do Instituto Social Nossa Senhora de Fátima" />
        </div>
        <h1 className="main-title">Instituto Social Nossa Senhora de Fátima</h1>
        <h2 className="sub-title">Pré-Inscrições</h2>
      </div>
    </div>
  );
}
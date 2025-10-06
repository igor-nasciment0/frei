import { set } from "local-storage";
import callApi from "../../api/callAPI";
import { cadastro, login } from "../../api/services/user";
import "./index.scss";

import { Controller, useForm } from 'react-hook-form';
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import { useLoadingBar } from "react-top-loading-bar";
import { IMaskInput } from "react-imask";
import { generateFormData } from "../../util/form";
import toast from "react-hot-toast";

export default function Cadastro() {

  const { register, handleSubmit, control, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      password: ""
    }
  });

  const navigate = useNavigate();

  const { start, complete } = useLoadingBar({
    color: "#4EA2FF",
    height: 2,
  });

  async function submit(dadosCadastro) {
    if (dadosCadastro.password !== dadosCadastro.confirmPassword) {
      toast.error("As senhas não conferem")
      return;
    }

    const r = await callApi(cadastro, true, dadosCadastro);

    if (r) {
      const log = await callApi(login, true, generateFormData({ Email: dadosCadastro.email, Password: dadosCadastro.password }));

      if (!log?.token)
        return;

      start("continuous", 0, 100);
      set("token", log.token);
      set("user", log.user);
      setTimeout(complete, 750);
      setTimeout(() => navigate("/"), 1000);
    }
  }

  return (
    <div className="cadastro-page">

      <ToasterContainer />

      <div className="cadastro-left">
        <div className="cadastro-card">
          <form onSubmit={handleSubmit(data => submit(data))}>
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                {...register("name", { required: "Campo obrigatório" })}
                type="text"
                placeholder="João Silva"
              />
            </div>

            <div className="row">
              <div className="form-group">
                <label htmlFor="email">CPF</label>

                <Controller
                  name="cpf"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask={"000.000.000-00"}
                      type="text"
                      placeholder="000.000.000-00"
                      onAnimationStart={(e) => {
                        if (e.animationName === 'onAutoFillStart') {
                          field.onChange(e.target.value);
                        }
                      }}
                    />)}

                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Data de Nascimento</label>

                <input
                  {...register("birthDate", { required: "Campo obrigatório" })}
                  type="date"
                  placeholder="01/01/2000"
                />
              </div>

            </div>


            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                {...register("email", { required: "Campo obrigatório" })}
                type="email"
                placeholder="usuario@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                {...register("password", { required: "Campo obrigatório" })}
                type="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                {...register("confirmPassword", { required: "Campo obrigatório" })}
                type="password"
              />
            </div>

            <input disabled={isSubmitting} className="btn-enter" type="submit" value="Entrar" />

            <span className="link-login">
              Já possui uma conta? <Link to="/login">Faça login</Link>
            </span>
          </form>
        </div>
      </div>

      <div className="cadastro-right">
        <div className="logo-placeholder">
          <img src="/assets/images/logo.svg" alt="Logo do Instituto Social Nossa Senhora de Fátima" />
        </div>
        <h1 className="main-title">Ação Social Nossa Senhora de Fátima</h1>
        <h2 className="sub-title">Pré-Inscrições</h2>
      </div>
    </div>
  );
}

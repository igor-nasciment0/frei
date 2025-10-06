import { set } from "local-storage";
import callApi from "../../api/callAPI";
import { cadastro, login } from "../../api/services/user";
import "./index.scss";

import { Controller, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import { useLoadingBar } from "react-top-loading-bar";
import { IMaskInput } from "react-imask";
import { generateFormData } from "../../util/form";
import toast from "react-hot-toast";

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const { start, complete } = useLoadingBar({
    color: "#4EA2FF",
    height: 2,
  });

  async function submit(dadosCadastro) {
    if (dadosCadastro.password !== dadosCadastro.confirmPassword) {
      toast.error("As senhas não conferem");
      return;
    }

    const r = await callApi(cadastro, true, dadosCadastro);

    if (r) {
      const log = await callApi(
        login,
        true,
        generateFormData({
          Email: dadosCadastro.email,
          Password: dadosCadastro.password,
        })
      );

      if (!log?.token) return;

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
          <form onSubmit={handleSubmit(submit)}>
            {/* Nome */}
            <div className={"form-group " + (errors.name ? "erro" : "")}>
              <label htmlFor="name">Nome Completo</label>
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
              <input
                {...register("name", { required: "Campo obrigatório" })}
                type="text"
                placeholder="João Silva"
              />
            </div>

            {/* Linha CPF e Data */}
            <div className="row">
              <div className={"form-group " + (errors.cpf ? "erro" : "")}>
                <label htmlFor="cpf">CPF</label>
                {errors.cpf && (
                  <span className="error-message">{errors.cpf.message}</span>
                )}
                <Controller
                  name="cpf"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="000.000.000-00"
                      placeholder="000.000.000-00"
                      onAnimationStart={(e) => {
                        if (e.animationName === "onAutoFillStart") {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                />
              </div>

              <div className={"form-group " + (errors.birthDate ? "erro" : "")}>
                <label htmlFor="birthDate">Data de Nascimento</label>
                {errors.birthDate && (
                  <span className="error-message">
                    {errors.birthDate.message}
                  </span>
                )}
                <input
                  {...register("birthDate", { required: "Campo obrigatório" })}
                  type="date"
                />
              </div>
            </div>

            {/* Email */}
            <div className={"form-group " + (errors.email ? "erro" : "")}>
              <label htmlFor="email">E-mail</label>
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
              <input
                {...register("email", { required: "Campo obrigatório" })}
                type="email"
                placeholder="usuario@email.com"
              />
            </div>

            {/* Senha */}
            <div className={"form-group " + (errors.password ? "erro" : "")}>
              <label htmlFor="password">Senha</label>
              {errors.password && (
                <span className="error-message">
                  {errors.password.message}
                </span>
              )}
              <input
                {...register("password", { required: "Campo obrigatório" })}
                type="password"
              />
            </div>

            {/* Confirmar Senha */}
            <div
              className={
                "form-group " + (errors.confirmPassword ? "erro" : "")
              }
            >
              <label htmlFor="confirmPassword">Confirmar senha</label>
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword.message}
                </span>
              )}
              <input
                {...register("confirmPassword", {
                  required: "Campo obrigatório",
                })}
                type="password"
              />
            </div>

            <input
              disabled={isSubmitting}
              className="btn-enter"
              type="submit"
              value="Entrar"
            />

            <span className="link-login">
              Já possui uma conta? <Link to="/login">Faça login</Link>
            </span>
          </form>
        </div>
      </div>

      <div className="cadastro-right">
        <div className="logo-placeholder">
          <img
            src="/assets/images/logo.svg"
            alt="Logo do Instituto Social Nossa Senhora de Fátima"
          />
        </div>
        <h1 className="main-title">
          Ação Social Nossa Senhora de Fátima
        </h1>
        <h2 className="sub-title">Pré-Inscrições</h2>
      </div>
    </div>
  );
}

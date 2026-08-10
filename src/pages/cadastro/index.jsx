import { set } from "local-storage";
import callApi from "../../api/callAPI";
import { cadastro, login } from "../../api/services/user";
import "./index.scss";

import { Controller, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import ToasterContainer from "../../components/toaster_container";
import PainelInstitucional from "../../components/painel_institucional";
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
    color: "#C2A46A",
    height: 3,
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
    <div className="auth-page">
      <ToasterContainer />

      <PainelInstitucional />

      <div className="painel-form">
        <div className="card">
          <div>
            <p className="eyebrow">Área do candidato</p>
            <h2>Criar cadastro</h2>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className={"campo " + (errors.name ? "erro" : "")}>
              <label htmlFor="name">Nome completo do candidato(a)</label>
              <input
                {...register("name", { required: "Campo obrigatório" })}
                type="text"
                placeholder="João Silva"
              />
              {errors.name && <span className="mensagem-erro">{errors.name.message}</span>}
            </div>

            <div className="row">
              <div className={"campo " + (errors.cpf ? "erro" : "")}>
                <label htmlFor="cpf">CPF do candidato(a)</label>
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
                {errors.cpf && <span className="mensagem-erro">{errors.cpf.message}</span>}
              </div>

              <div className={"campo " + (errors.birthDate ? "erro" : "")}>
                <label htmlFor="birthDate">Data de nascimento</label>
                <input
                  {...register("birthDate", { required: "Campo obrigatório" })}
                  type="date"
                />
                {errors.birthDate && <span className="mensagem-erro">{errors.birthDate.message}</span>}
              </div>
            </div>

            <div className={"campo " + (errors.email ? "erro" : "")}>
              <label htmlFor="email">E-mail do candidato(a)</label>
              <input
                {...register("email", { required: "Campo obrigatório" })}
                type="email"
                placeholder="usuario@email.com"
              />
              {errors.email && <span className="mensagem-erro">{errors.email.message}</span>}
            </div>

            <div className={"campo " + (errors.password ? "erro" : "")}>
              <label htmlFor="password">Senha</label>
              <input
                {...register("password", { required: "Campo obrigatório" })}
                type="password"
              />
              {errors.password && <span className="mensagem-erro">{errors.password.message}</span>}
            </div>

            <div className={"campo " + (errors.confirmPassword ? "erro" : "")}>
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                {...register("confirmPassword", { required: "Campo obrigatório" })}
                type="password"
              />
              {errors.confirmPassword && <span className="mensagem-erro">{errors.confirmPassword.message}</span>}
            </div>

            <button disabled={isSubmitting} className="btn-primario" type="submit">Criar cadastro</button>

            <p className="link-secundario">
              Já possui uma conta? <Link to="/login">Faça login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

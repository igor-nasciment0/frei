import './index.scss';
import { useState } from 'react';
import ToasterContainer from '../../../../components/toaster_container';
import FormularioCursos from './componentes/formCursos';
import { FormularioDadosPessoais, FormularioEndereco, FormularioEscolar, FormularioInformacoesGerais, FormularioNascimento, FormularioResponsavelPrimario, FormularioResponsavelSecundario, FormularioRG } from './componentes/formDados';
import callApi from '../../../../api/callAPI';
import { atualizaUsuario } from '../../../../api/services/user';
import { FormProvider, useForm } from 'react-hook-form';
import padroes from './padroes';
import toast from 'react-hot-toast';

const formularios = [FormularioDadosPessoais, FormularioEndereco, FormularioNascimento, FormularioRG, FormularioResponsavelPrimario, FormularioResponsavelSecundario, FormularioEscolar, FormularioInformacoesGerais]

export default function Inscricao() {

  const [passoAtual, setPassoAtual] = useState(0);

  const [mostraFormCursos, setMostraFormCursos] = useState(false);

  const methods = useForm({ defaultValues: padroes, mode: 'onChange' });

  async function submitInfoUsuario(novosDados) {
    const r = await callApi(atualizaUsuario, novosDados);

    if (r.statusCode == 400 && r.Message) {
      toast.error(r.Message[0], { duration: 8000 })
    }
    else setMostraFormCursos(true);
  }

  const FormAtual = formularios[passoAtual];

  return (
    <section className='inscricao'>
      <ToasterContainer />
      <h3>Minha Pré-Inscrição</h3>

      <section className="conteudo">
        {!mostraFormCursos ?
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitInfoUsuario)}>
              <FormAtual
                avancar={async (campos) => {
                  const valido = await methods.trigger(campos);

                  if (valido) {
                    if (passoAtual === formularios.length - 1) {
                      await methods.handleSubmit(submitInfoUsuario)();
                    } else {
                      setPassoAtual(passoAtual + 1);
                    }
                  }
                }}
                retornar={() => {
                  if (passoAtual > 0)
                    setPassoAtual(passoAtual - 1);
                }}
              />
            </form>
          </FormProvider>
          :
          <FormularioCursos />
        }

        <ul className='passos'>{
          [
            "Informações Pessoais",
            "Endereço",
            "Informações de Nascimento",
            "Documento",
            "Responsável Primário",
            "Responsável Secundário",
            "Escolaridade",
            "Informações Gerais"
          ].map((nomePasso, i) => (
            <li onClick={() => setPassoAtual(i)} key={i} className={i === passoAtual ? 'ativo' : i < passoAtual ? 'completo' : ''}>
              <p>{nomePasso}</p>
            </li>
          ))
        }
          <li className={mostraFormCursos ? "ativo" : ""}>Escolha do Curso</li>
        </ul>
      </section>

    </section>
  )
}

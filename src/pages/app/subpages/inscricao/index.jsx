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
import { get, set } from 'local-storage';
import { mergeObjects, testState } from '../../../../util/general';

const formularios = [FormularioDadosPessoais, FormularioEndereco, FormularioNascimento, FormularioRG, FormularioResponsavelPrimario, FormularioResponsavelSecundario, FormularioEscolar, FormularioInformacoesGerais]
const titulos = ["Informações Pessoais", "Endereço", "Informações de Nascimento", "Documento", "Responsável Primário", "Responsável Secundário", "Escolaridade", "Informações Gerais"]

export default function Inscricao() {

  const [passoAtual, setPassoAtual] = useState(0);
  const [mostraFormCursos, setMostraFormCursos] = useState(false);


  // SETUP DO FORMULÁRIO
  const infoAtual = get("user");
  delete infoAtual.id, infoAtual.age;

  if (infoAtual.generalInfo.income !== undefined) infoAtual.generalInfo.income = String(infoAtual.generalInfo.income);
  if (infoAtual.generalInfo.peopleAtHome !== undefined) infoAtual.generalInfo.peopleAtHome = Number(infoAtual.generalInfo.peopleAtHome);
  if (infoAtual.generalInfo.peopleWorking !== undefined) infoAtual.generalInfo.peopleWorking = Number(infoAtual.generalInfo.peopleWorking);

  const methods = useForm({ defaultValues: mergeObjects({ ...padroes }, infoAtual) });

  async function submitInfoUsuario(novosDados) {
    if (!testState(novosDados, padroes, ["complement"])) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    novosDados.generalInfo.income = Number(novosDados.generalInfo.income.toString().replaceAll("R$ ", "").replaceAll(".", "").replaceAll(",", "."));

    const r = await callApi(atualizaUsuario, true, novosDados);

    if (r.statusCode == 400 && r.Message) {
      toast.error(r.Message[0], { duration: 8000 })
    }
    else {
      set("user", r.data);
      setMostraFormCursos(true);
    }
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
          titulos.map((nomePasso, i) => (
            <li onClick={() => setPassoAtual(i)} key={i} className={(i === passoAtual && !mostraFormCursos) ? 'ativo' : ((i < passoAtual && !mostraFormCursos) ? 'completo' : '')}>
              <p className={!mostraFormCursos ? 'selecionavel' : ''}>{nomePasso}</p>
            </li>
          ))
        }
          <li className={mostraFormCursos ? "ativo" : ""}>Escolha do Curso</li>
        </ul>

        <ul className='passos-mobile'>{
          titulos.map((_, i) => (
            <li onClick={() => setPassoAtual(i)} key={i} className={(i <= passoAtual && !mostraFormCursos) ? 'passado' : ""}>
              <span>{i + 1}</span>
            </li>
          ))
        }
          <li className={mostraFormCursos ? "passado" : ""}>*</li>
        </ul>
      </section>

    </section>
  )
}

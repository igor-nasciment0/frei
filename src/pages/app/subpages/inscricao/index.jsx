import './index.scss';
import { useEffect, useState } from 'react';
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
import { useOutletContext } from 'react-router';
import { formatarParaInputDate } from '../../../../util/date';

const formularios = [FormularioDadosPessoais, FormularioEndereco, FormularioNascimento, FormularioRG, FormularioResponsavelPrimario, FormularioResponsavelSecundario, FormularioEscolar, FormularioInformacoesGerais]
const titulos = ["Informações Pessoais", "Endereço", "Informações de Nascimento", "Documento", "Dados da mãe", "Responsável Secundário", "Escolaridade", "Informações Gerais"]

export default function Inscricao() {

  const statusVestibular = useOutletContext();

  const [passoAtual, setPassoAtual] = useState(0);
  const [mostraFormCursos, setMostraFormCursos] = useState(false);

  useEffect(() => {
    if (statusVestibular.currentPhase >= 3) {
      let form = document.getElementById('form-inscricao');
      Array.from(form.elements).forEach(formElement => formElement.disabled = true);
    }
  }, [passoAtual])


  // SETUP DO FORMULÁRIO
  const infoAtual = get("user");
  delete infoAtual.id, infoAtual.age;

  if (infoAtual?.generalInfo.income !== undefined) infoAtual.generalInfo.income = String(infoAtual?.generalInfo.income);
  if (infoAtual?.generalInfo.peopleAtHome !== undefined) infoAtual.generalInfo.peopleAtHome = String(infoAtual?.generalInfo.peopleAtHome);
  if (infoAtual?.generalInfo.peopleWorking !== undefined) infoAtual.generalInfo.peopleWorking = String(infoAtual?.generalInfo.peopleWorking);

  if (infoAtual?.birthInfo.date !== undefined) infoAtual.birthInfo.date = formatarParaInputDate(infoAtual?.birthInfo.date);
  if (infoAtual?.rgInfo.issueDate !== undefined) infoAtual.rgInfo.issueDate = formatarParaInputDate(infoAtual?.rgInfo.issueDate);

  // o primeiro responsável é sempre a mãe
  infoAtual.primaryResponsible.relationship = "Mãe";

  const methods = useForm({ defaultValues: mergeObjects({ ...padroes }, infoAtual) });

  async function submitInfoUsuario(novosDados) {
    novosDados.primaryResponsible.relationship = "Mãe";

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

  const podeSelecionarAbaCurso = infoAtual.generalInfo.howDidYouKnow !== ""; // se uns dos campos do final está preenchido, a pessoa já passou por este formulário 

  return (
    <section className='inscricao'>
      <h3 className='nav'>Frei Online {'>'} Inscrição</h3>

      <ToasterContainer />
      <h3>Minha Pré-Inscrição</h3>

      <section className="conteudo">
        {!mostraFormCursos ?
          <FormProvider {...methods}>
            <form id='form-inscricao' onSubmit={methods.handleSubmit(submitInfoUsuario)}>
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
            <li onClick={() => { setMostraFormCursos(false); setPassoAtual(i) }} key={i} className={(i === passoAtual && !mostraFormCursos) ? 'ativo' : ((i < passoAtual || mostraFormCursos) ? 'completo' : '')}>
              <p className="selecionavel">{nomePasso}</p>
            </li>
          ))
        }
          <li className={(mostraFormCursos ? "ativo" : "")} onClick={() => {
            if (podeSelecionarAbaCurso)
              setMostraFormCursos(true);
          }} >
            <p className={(podeSelecionarAbaCurso ? "selecionavel" : "")}>Escolha do Curso</p>
          </li>
        </ul>

        <ul className='passos-mobile'>{
          titulos.map((_, i) => (
            <li onClick={() => { setMostraFormCursos(false); setPassoAtual(i) }} key={i} className={(i <= passoAtual && !mostraFormCursos) ? 'passado' : ""}>
              <span>{i + 1}</span>
            </li>
          ))
        }
          <li className={mostraFormCursos ? "passado" : ""} onClick={() => {
            if (podeSelecionarAbaCurso)
              setMostraFormCursos(true);
          }} >
            <span>*</span>
          </li>
        </ul>
      </section>

    </section>
  )
}

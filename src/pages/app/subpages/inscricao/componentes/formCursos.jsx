import { Select, SelectItem } from '../../../../../components/select';
import { useEffect, useState } from 'react';
import { getCursoHorarios, getCursos } from '../../../../../api/services/cursos';
import callApi from '../../../../../api/callAPI';
import { criaInscricao, getInscricao } from '../../../../../api/services/inscricao';
import toast from 'react-hot-toast';
import { useLoadingBar } from 'react-top-loading-bar';
import { useNavigate } from 'react-router';

export default function FormularioCursos() {

  const [carregamentoInicial, setCarregamentoInicial] = useState(true);

  const [minhaInscricao, setMinhaInscricao] = useState(null);

  const [codigoPrimeiroCurso, setCodigoPrimeiroCurso] = useState("");
  const [codigoPrimeiroHorario, setCodigoPrimeiroHorario] = useState("");
  const [codigoSegundoCurso, setCodigoSegundoCurso] = useState("");
  const [codigoSegundoHorario, setCodigoSegundoHorario] = useState("");

  const [opcoesCurso, setOpcoesCurso] = useState([]);
  const [opcoesHorario1, setOpcoesHorario1] = useState([]);
  const [opcoesHorario2, setOpcoesHorario2] = useState([]);

  const [erro, setErro] = useState("");

  const primeiraOpcaoCurso = opcoesCurso?.find(opcao => opcao.code == codigoPrimeiroCurso);
  const segundaOpcaoCurso = opcoesCurso?.find(opcao => opcao.code == codigoSegundoCurso);

  // USE_EFFECTS PARA CARREGAR CURSOS E HORÁRIOS
  useEffect(() => {
    (async () => {
      const cursos = await callApi(getCursos);
      setOpcoesCurso(cursos);

      const insc = (await callApi(getInscricao))?.data;

      if (insc?.firstChoice) {

        const idOpcao1 = cursos.find(curso => curso.code == insc.firstChoice.courseCode).id;
        const idOpcao2 = cursos.find(curso => curso.code == insc.secondChoice.courseCode).id;

        const h1 = await callApi(getCursoHorarios, false, idOpcao1);
        const h2 = await callApi(getCursoHorarios, false, idOpcao2);

        setOpcoesHorario1(h1);
        setOpcoesHorario2(h2);

        setMinhaInscricao(insc);
      }
      
      setCarregamentoInicial(false);
    })();
  }, [])

  useEffect(() => {
    if (minhaInscricao) {
      setCodigoPrimeiroCurso(String(minhaInscricao.firstChoice.courseCode));
      setCodigoSegundoCurso(String(minhaInscricao.secondChoice.courseCode));
      setCodigoPrimeiroHorario(String(minhaInscricao.firstChoice.periodCode));
      setCodigoSegundoHorario(String(minhaInscricao.secondChoice.periodCode));
    }

  }, [minhaInscricao])

  async function handleMudaPrimeiraOpcaoCurso(novaOpcao) {
    setCodigoPrimeiroCurso(novaOpcao);
    setCodigoPrimeiroHorario("");

    const cursoId = (opcoesCurso?.find(opcao => opcao.code == novaOpcao))?.id;

    if (cursoId) {
      setOpcoesHorario1(await callApi(getCursoHorarios, false, cursoId));
    }

    if (erro)
      setErro("")
  }

  async function handleMudaSegundaOpcaoCurso(novaOpcao) {
    setCodigoSegundoCurso(novaOpcao);
    setCodigoSegundoHorario("");

    const cursoId = (opcoesCurso?.find(opcao => opcao.code == novaOpcao))?.id;

    if (cursoId) {
      setOpcoesHorario2(await callApi(getCursoHorarios, false, cursoId));
    }

    if (erro)
      setErro("")
  }

  function handleMudaHorario1(novaOpcao) {
    if (codigoPrimeiroCurso == codigoSegundoCurso && codigoSegundoHorario == novaOpcao) {
      setCodigoSegundoCurso("");
      setCodigoSegundoHorario("");
      setErro("Opções de curso e período não podem ser iguais.");
    }

    setCodigoPrimeiroHorario(novaOpcao);

    if (erro)
      setErro("")
  }

  function handleMudaHorario2(novaOpcao) {
    if (codigoPrimeiroCurso == codigoSegundoCurso && codigoPrimeiroHorario == novaOpcao) {
      setCodigoPrimeiroCurso("");
      setCodigoPrimeiroHorario("");
      setErro("Opções de curso e período não podem ser iguais.");
    }

    setCodigoSegundoHorario(novaOpcao);

    if (erro)
      setErro("")
  }

  const { start, complete } = useLoadingBar({
    color: "#4EA2FF",
    height: 2,
  });

  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function submit() {
    if (!codigoPrimeiroCurso || !codigoPrimeiroHorario) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    // const nomePrimeiraOpcaoCurso = primeiraOpcaoCurso?.name.toLowerCase().normalize();

    // if ((!codigoSegundoCurso || !codigoSegundoHorario) && !nomePrimeiraOpcaoCurso.includes("teens")) {
    //   toast.error(`"Sem segunda opção" só está disponível para os cursos Teens.`);
    //   return;
    // }

    setCarregando(true);

    const r = await callApi(criaInscricao, true, {
      firstChoiceCourseCode: codigoPrimeiroCurso,
      firstChoicePeriodCode: codigoPrimeiroHorario,
      secondChoiceCourseCode: codigoSegundoCurso,
      secondChoicePeriodCode: codigoSegundoHorario
    });

    if (r) {
      start("continuous", 0, 100);
      toast.success("Sucesso!");
      setTimeout(complete, 750);
      setTimeout(() => navigate("/acompanhamento"), 1000);
    }

    setCarregando(false);
  }

  return (
    <form>
      <table className="tabela-form">
        <tbody>
          {erro &&
            <tr className='cursos-erro'>
              <td />
              <td>{erro}</td>
            </tr>
          }
          <tr>
            <td className="label obrigatorio">Primeira Opção de Curso</td>
            <td className="input">

              <Select
                disabled={carregamentoInicial}
                placeholder="Selecione um curso..."
                dropIcon="/assets/images/icons/angulo.svg"
                value={codigoPrimeiroCurso}
                className={carregamentoInicial ? "carregando" : ""}
                onChange={novoValor => handleMudaPrimeiraOpcaoCurso(novoValor)}>
                
                {opcoesCurso.map((curso, index) =>
                  <SelectItem key={'po' + index} value={String(curso.code)}>
                    {curso.name}
                  </SelectItem>
                )}
              </Select>

            </td>
          </tr>
          <tr>
            <td className="label obrigatorio">Período Primeira Opção</td>
            <td className="input">

              <Select
                disabled={!primeiraOpcaoCurso || carregamentoInicial}
                placeholder="Selecione um horário..."
                dropIcon="/assets/images/icons/angulo.svg"
                value={codigoPrimeiroHorario}
                onChange={novoValor => handleMudaHorario1(novoValor)}>
                {opcoesHorario1.map((horario, index) =>
                  <SelectItem key={'ph' + index} value={String(horario.code)}>{horario.name}</SelectItem>
                )}
              </Select>
            </td>
          </tr>
          <tr>
            <td className="label obrigatorio">Segunda Opção de Curso</td>
            <td className="input">

              <Select
                placeholder="Sem segunda opção"
                dropIcon="/assets/images/icons/angulo.svg"
                disabled={carregamentoInicial}
                value={codigoSegundoCurso}
                onChange={novoValor => handleMudaSegundaOpcaoCurso(novoValor)}>
                <SelectItem value="" placeholder>Sem segunda opção</SelectItem>
                {opcoesCurso.map((curso, index) =>
                  <SelectItem key={'so' + index} value={String(curso.code)}>{curso.name}</SelectItem>
                )}
              </Select>
            </td>
          </tr>
          <tr>
            <td className="label obrigatorio">Período Segunda Opção</td>
            <td className="input">
              <Select
                disabled={!segundaOpcaoCurso || carregamentoInicial}
                placeholder="Selecione um horário..."
                dropIcon="/assets/images/icons/angulo.svg"
                value={codigoSegundoHorario}
                onChange={novoValor => handleMudaHorario2(novoValor)}>
                {opcoesHorario2.map((horario, index) =>
                  <SelectItem key={'sh' + index} value={String(horario.code)}>{horario.name}</SelectItem>
                )}
              </Select>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className='submit'>
            <td>
              <button type='button' disabled={carregando || carregamentoInicial} onClick={submit}>Concluir Inscrição</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  )
}

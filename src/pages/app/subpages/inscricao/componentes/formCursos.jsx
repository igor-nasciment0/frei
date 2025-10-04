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

  const [codigoPrimeiroCurso, setCodigoPrimeiroCurso] = useState("");
  const [codigoPrimeiroHorario, setCodigoPrimeiroHorario] = useState("");
  const [codigoSegundoCurso, setCodigoSegundoCurso] = useState("");
  const [codigoSegundoHorario, setCodigoSegundoHorario] = useState("");

  const [opcoesCurso, setOpcoesCurso] = useState([]);
  const [opcoesHorario1, setOpcoesHorario1] = useState([]);
  const [opcoesHorario2, setOpcoesHorario2] = useState([]);

  const primeiraOpcaoCurso = opcoesCurso?.find(opcao => opcao.code == codigoPrimeiroCurso);
  const segundaOpcaoCurso = opcoesCurso?.find(opcao => opcao.code == codigoSegundoCurso);

  // USE_EFFECTS PARA CARREGAR CURSOS E HORÁRIOS
  useEffect(() => {
    (async () => {
      const cursos = await callApi(getCursos);
      setOpcoesCurso(cursos);

      const minhaInscricao = (await callApi(getInscricao))?.data;

      if (minhaInscricao.firstChoice) {
        const idOpcao1 = cursos.find(curso => curso.code == minhaInscricao.firstChoice.courseCode).id;
        const idOpcao2 = cursos.find(curso => curso.code == minhaInscricao.secondChoice.courseCode).id;

        setOpcoesHorario1(await callApi(getCursoHorarios, false, idOpcao1));
        setOpcoesHorario2(await callApi(getCursoHorarios, false, idOpcao2));

        setTimeout(() => {
          setCodigoPrimeiroCurso(String(minhaInscricao.firstChoice.courseCode));
          setCodigoSegundoCurso(String(minhaInscricao.secondChoice.courseCode));
          setCodigoPrimeiroHorario(String(minhaInscricao.firstChoice.periodCode));
          setCodigoSegundoHorario(String(minhaInscricao.secondChoice.periodCode));
        }, 0)
      }

      setCarregamentoInicial(false);
    })();
  }, [])

  useEffect(() => {
    if (carregamentoInicial)
      return;

    (async () => {
      if (primeiraOpcaoCurso) {
        setOpcoesHorario1(await callApi(getCursoHorarios, false, primeiraOpcaoCurso?.id));
      }
    })();
  }, [primeiraOpcaoCurso])

  useEffect(() => {
    if (carregamentoInicial)
      return;

    (async () => {
      if (segundaOpcaoCurso) {
        setOpcoesHorario2(await callApi(getCursoHorarios, false, segundaOpcaoCurso?.id));
      }
    })();
  }, [segundaOpcaoCurso])

  const { start, complete } = useLoadingBar({
    color: "#4EA2FF",
    height: 2,
  });

  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function submit() {
    setCarregando(true);

    const r = await callApi(criaInscricao, true, {
      firstChoiceCourseCode: codigoPrimeiroCurso,
      firstChoicePeriodCode: codigoPrimeiroHorario,
      secondChoiceCourseCode: codigoSegundoCurso,
      secondChoicePeriodCode: codigoSegundoCurso
    });

    if (r) {
      start("continuous", 0, 100);
      toast.success("Sucesso!")
      setTimeout(complete, 750);
      setTimeout(() => navigate("/acompanhamento"), 1000);
    }

    setCarregando(false);
  }

  return (
      <form>
        <table className="tabela-form">
          <tbody>
            <tr>
              <td className="label obrigatorio">Primeira Opção de Curso</td>
              <td className="input">

                <Select
                  disabled={carregamentoInicial}
                  placeholder="Selecione um curso..."
                  dropIcon="/assets/images/icons/angulo.svg"
                  value={codigoPrimeiroCurso}
                  onChange={novoValor => setCodigoPrimeiroCurso(novoValor)}>
                  {opcoesCurso.map((curso, index) =>
                    <SelectItem key={'po' + index} value={String(curso.code)}>
                      {curso.name}
                    </SelectItem>
                  )}
                </Select>

              </td>
            </tr>
            <tr>
              <td className="label obrigatorio">Horário para a Primeira Opção</td>
              <td className="input">

                <Select
                  disabled={!primeiraOpcaoCurso || carregamentoInicial}
                  placeholder="Selecione um horário..."
                  dropIcon="/assets/images/icons/angulo.svg"
                  value={codigoPrimeiroHorario}
                  onChange={novoValor => setCodigoPrimeiroHorario(novoValor)}>
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
                  placeholder="Selecione um curso..."
                  dropIcon="/assets/images/icons/angulo.svg"
                  disabled={!primeiraOpcaoCurso || carregamentoInicial}
                  value={codigoSegundoCurso}
                  onChange={novoValor => setCodigoSegundoCurso(novoValor)}>
                  {opcoesCurso.filter(curso => curso.code !== primeiraOpcaoCurso?.code).map((curso, index) =>
                    <SelectItem key={'po' + index} value={String(curso.code)}>{curso.name}</SelectItem>
                  )}
                </Select>
              </td>
            </tr>
            <tr>
              <td className="label obrigatorio">Horário para a Segunda Opção</td>
              <td className="input">
                <Select
                  disabled={!segundaOpcaoCurso || carregamentoInicial}
                  placeholder="Selecione um horário..."
                  dropIcon="/assets/images/icons/angulo.svg"
                  value={codigoSegundoHorario}
                  onChange={novoValor => setCodigoSegundoHorario(novoValor)}>
                  {opcoesHorario2.map((horario, index) =>
                    <SelectItem key={'ph' + index} value={String(horario.code)}>{horario.name}</SelectItem>
                  )}
                </Select>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className='submit'>
              <td>
                <input disabled={carregando} onClick={submit} type="submit" value="Registrar" />
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
  )
}

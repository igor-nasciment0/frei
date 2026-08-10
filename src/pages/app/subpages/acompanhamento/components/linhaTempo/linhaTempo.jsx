import './linhaTempo.scss';
import { CadastroCriado, ConvocacaoEmitida, PreInscricaoPreenchida, ProvaPresencial, ResultadoMatricula } from './dadosLinha';
import { useOutletContext } from 'react-router';

export default function Timeline({ dadosInscricao }) {

  const statusVestibular = useOutletContext();

  const provaRealizada = !!dadosInscricao?.testDate && new Date(dadosInscricao.testDate) <= new Date();
  const resultadoDisponivel = !!statusVestibular?.resultPublicationDate && new Date(statusVestibular.resultPublicationDate) <= new Date();

  const etapas = [
    { titulo: "Cadastro criado", status: "concluído", conteudo: <CadastroCriado /> },
    { titulo: "Pré-inscrição preenchida", status: "concluído", conteudo: <PreInscricaoPreenchida /> },
    {
      titulo: "Convocação emitida",
      status: dadosInscricao?.testDate ? "confirmado" : "aguardando",
      conteudo: <ConvocacaoEmitida dadosInscricao={dadosInscricao} />,
    },
    {
      titulo: "Prova presencial",
      status: provaRealizada ? "concluído" : "aguardando",
      conteudo: <ProvaPresencial realizado={provaRealizada} dadosInscricao={dadosInscricao} />,
    },
    {
      titulo: "Resultado e matrícula",
      status: resultadoDisponivel ? "concluído" : "aguardando",
      conteudo: (
        <ResultadoMatricula
          realizado={resultadoDisponivel}
          dataPublicacao={statusVestibular?.resultPublicationDate}
          mostrarUrl={statusVestibular?.canShowResultUrl}
          urlResultado={statusVestibular?.resultUrl}
        />
      ),
    },
  ];

  return (
    <div className="timeline-container">
      {etapas.map((etapa, i) =>
        <TimelineItem key={i} {...etapa} />
      )}
    </div>
  );
};

function TimelineItem({ titulo, status, conteudo }) {
  return (
    <div className={"timeline-item status-" + status.normalize("NFD").replace(/[̀-ͯ]/g, "")}>
      <span className="marcador" />
      <div className="timeline-item-content">
        <div className="cabecalho">
          <h3>{titulo}</h3>
          <span className="selo">{status}</span>
        </div>
        {conteudo}
      </div>
    </div>
  )
}

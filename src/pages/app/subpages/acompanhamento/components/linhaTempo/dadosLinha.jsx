import { converterDataUTCParaLocalSemMudarDia } from "../../../../../../util/date";

// A convocação (data/horário/sala) é definida e emitida pela secretaria — somente leitura para
// o candidato. A etapa "Concluir Inscrição" que existia separadamente hoje (comparecimento
// presencial, taxa e documentos) foi absorvida na descrição desta etapa por decisão de produto,
// já que o protótipo define exatamente 5 etapas na timeline.
const ENDERECO_INSTITUTO = "Av. Coronel Octaviano de Freitas Costa, 463 - Veleiros, São Paulo - SP, 04773-000";

export function CadastroCriado() {
  return (
    <div className="conteudo realizado">
      <p>Sua conta foi criada com sucesso.</p>
    </div>
  );
}

export function PreInscricaoPreenchida() {
  return (
    <div className="conteudo realizado">
      <p>Pré-inscrição preenchida e enviada com sucesso.</p>
    </div>
  );
}

export function ConvocacaoEmitida({ dadosInscricao }) {
  if (!dadosInscricao?.testDate) {
    return (
      <div className="conteudo">
        <p>A convocação para a prova — data, horário, local e sala — é definida pela secretaria e aparecerá aqui assim que for emitida.</p>
      </div>
    );
  }

  return (
    <div className="conteudo realizado">
      <p>
        Convocação emitida para o dia {converterDataUTCParaLocalSemMudarDia(dadosInscricao.testDate)}
        {dadosInscricao.testTime && `, às ${dadosInscricao.testTime}`}
        {dadosInscricao.testRoom && `, na sala ${dadosInscricao.testRoom}`}.
      </p>
      <p>Para concluir sua inscrição, dirija-se presencialmente ao instituto na data da convocação, levando o valor da inscrição (R$ 40,00) e cópias do RG e CPF.</p>
      <strong>Instituto Social Nossa Senhora de Fátima</strong>
      <p>{ENDERECO_INSTITUTO}</p>
    </div>
  );
}

export function ProvaPresencial({ realizado, dadosInscricao }) {
  if (!realizado)
    return (
      <div className="conteudo">
        <p>A prova será realizada presencialmente no Instituto
          {dadosInscricao?.testDate && `, no dia ${converterDataUTCParaLocalSemMudarDia(dadosInscricao.testDate)}`}
          {dadosInscricao?.testTime && `, às ${dadosInscricao.testTime}`}
          {dadosInscricao?.testRoom && `, na sala ${dadosInscricao.testRoom}`}.
        </p>
        <p>Não se esqueça de levar o manual do candidato, RG e CPF.</p>
      </div>
    );

  return (
    <div className="conteudo realizado">
      <p>A prova foi aplicada com sucesso aos presentes no dia marcado
        {dadosInscricao?.testDate && `, ${converterDataUTCParaLocalSemMudarDia(dadosInscricao.testDate)}`}
        {dadosInscricao?.testTime && `, às ${dadosInscricao.testTime}`}
        {dadosInscricao?.testRoom && `, na sala ${dadosInscricao.testRoom}`}.
      </p>
    </div>
  );
}

export function ResultadoMatricula({ realizado, dataPublicacao, urlResultado, mostrarUrl }) {
  if (realizado) {
    return (
      <div className="conteudo realizado">
        <p>Resultado disponível! Acesse:</p>
        <a href={urlResultado} target="_blank" rel="noopener noreferrer">{urlResultado}</a>
      </div>
    );
  }

  return (
    <div className="conteudo">
      <p>O resultado e as informações de matrícula ficarão disponíveis em nosso site no dia {converterDataUTCParaLocalSemMudarDia(dataPublicacao)}.</p>
      {mostrarUrl &&
        <a href={urlResultado} target="_blank" rel="noopener noreferrer">{urlResultado}</a>
      }
    </div>
  );
}

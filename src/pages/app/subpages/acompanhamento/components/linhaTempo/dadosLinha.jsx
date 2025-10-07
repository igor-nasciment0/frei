import { useEffect, useState } from "react";
import callApi from "../../../../../../api/callAPI";
import { criaAgendamento, getDatasAgendamento } from "../../../../../../api/services/agendamento";
import { SeletorDeAgendamento } from "../selecionaDatas";
import useModal from "../../../../../../util/useModal";
import toast from "react-hot-toast";
import { converterDataUTCParaLocalSemMudarDia } from "../../../../../../util/date";

export function PreInscricao() {
  return (
    <div className="conteudo realizado">
      <p>Pré-inscrição realizada com sucesso.</p>
    </div>
  );
}

export function Agendamento({ dataAgendada, alteravel }) {

  const [datasDisponiveis, setDatasDisponiveis] = useState([]);

  useEffect(() => {
    (async () => {
      const r = await callApi(getDatasAgendamento);
      if (r?.availableDates)
        setDatasDisponiveis(r.availableDates);
    })();
  }, [])

  const { openModal } = useModal();

  async function agendar(dataAgendamento) {
    const r = await callApi(criaAgendamento, true, dataAgendamento);
    if (r) {
      toast.success("Agendamento realizado com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  if (dataAgendada !== null) {
    return (
      <div className="conteudo realizado">
        <p>Agendamento realizado com sucesso para dia {converterDataUTCParaLocalSemMudarDia(dataAgendada?.appointmentDate)}, às {dataAgendada?.startTime}.</p>
        {alteravel &&
          <button onClick={() => openModal({
            customUI: (onClose) =>
              <SeletorDeAgendamento
                datasDisponiveis={datasDisponiveis}
                confirmar={agendar}
              />
          })}
          >Alterar agendamento</button>
        }
      </div >
    );
  }

  return (
    <div className="conteudo">
      <p>Realize o agendamento para concluir sua pré-inscrição.</p>
      {alteravel &&
        <button onClick={() => openModal({
          customUI: (onClose) =>
            <SeletorDeAgendamento
              datasDisponiveis={datasDisponiveis}
              confirmar={agendar}
            />
        })}
        >Realizar agendamento
        </button>
      }
    </div>
  );
}

export function ConcluirInscricao({ dataAgendada, realizado }) {
  if (realizado) {
    return (
      <div className="conteudo realizado">
        <p>Inscrição concluída com sucesso.</p>
      </div>
    );
  }

  return (
    <div className={"conteudo " + (realizado ? "realizado" : "")}>
      <p>Para concluir sua inscrição, dirija-se presencialmente ao instituto na data agendada{dataAgendada ? (" " + converterDataUTCParaLocalSemMudarDia(dataAgendada?.appointmentDate)) : ""}, levando os documentos abaixo:</p>
      <ul>
        <li>Valor da inscrição: R$ 40,00</li>
        <li>Cópia do RG, CPF</li>
        <li>Atestado de escolaridade.</li>
      </ul>
      <strong>Instituto Social Nossa Senhora de Fátima</strong>
      <p>Av. Coronel Octaviano de Freitas Costa, 463 - Veleiros, São Paulo - SP, 04773-000</p>
    </div>
  );
}

export function ProvaVestibular({ realizado }) {
  return (
    <div className={"conteudo " + (realizado ? "realizado" : "")}>
      <p>A prova será realizada presencialmente no Instituto.</p>
      <p>Não se esqueça de levar:</p>
      <ul>
        <li>Manual do candidato</li>
        <li>RG e CPF</li>
      </ul>
      <strong>Instituto Social Nossa Senhora de Fátima</strong>
      <p>Av. Coronel Octaviano de Freitas Costa, 463 - Veleiros, São Paulo - SP, 04773-000</p>
    </div>
  );
}

export function Resultado({ realizado, dataPublicacao, urlResultado, mostrarUrl }) {
  if (realizado) {
    return (
      <div className="conteudo realizado">
        <p>
          Resultado disponível! Acesse:
        </p>
        <a href={urlResultado} target="_blank" rel="noopener noreferrer">{urlResultado}</a>
      </div>
    );
  }

  return (
    <div className="conteudo">
      <p>
        O resultado ficará disponível em nosso site no dia {converterDataUTCParaLocalSemMudarDia(dataPublicacao)}.
      </p>
      {
        mostrarUrl &&
        <a href={urlResultado} target="_blank" rel="noopener noreferrer">{urlResultado}</a>
      }
    </div>
  );
}
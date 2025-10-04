import { useEffect, useState } from "react";
import callApi from "../../../../../../api/callAPI";
import { criaAgendamento, getDatasAgendamento } from "../../../../../../api/services/agendamento";
import { SeletorDeAgendamento } from "../selecionaDatas";
import useModal from "../../../../../../util/useModal";
import toast from "react-hot-toast";

export function PreInscricao() {
  return (
    <div className="conteudo realizado">
      <p>Pré-inscrição realizada com sucesso.</p>
    </div>
  );
}

export function Agendamento({ dataAgendada }) {

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
        <p>Agendamento realizado com sucesso para dia {new Date(dataAgendada?.appointmentDate).toLocaleDateString()}, às {dataAgendada?.endTime}</p>
        <button onClick={() => openModal({
          customUI: (onClose) =>
            <SeletorDeAgendamento
              datasDisponiveis={datasDisponiveis}
              confirmar={agendar}
            />
        })}
        >Alterar agendamento</button>
      </div>
    );
  }

  return (
    <div className="conteudo">
      <p>Realize o agendamento para concluir sua pré-inscrição.</p>
      <button onClick={() => openModal({
        customUI: (onClose) =>
          <SeletorDeAgendamento
            datasDisponiveis={datasDisponiveis}
            confirmar={agendar}
          />
      })}
      >Realizar agendamento
      </button>
    </div>
  );
}

export function ConcluirInscricao({ dataAgendada, realizado }) {
  if (realizado) {
    return (
      <p>Inscrição concluída com sucesso.</p>
    );
  }

  return (
    <div className={"conteudo " + (realizado ? "realizado" : "")}>
      <p>Para concluir sua inscrição, dirija-se presencialmente ao instituto na data agendada {new Date(dataAgendada?.appointmentDate).toLocaleDateString()}, levando os documentos abaixo:</p>
      <ul>
        <li>Valor da inscrição: R$ 50,00</li>
        <li>Cópia do RG, CPF</li>
        <li>Atestado de escolaridade.</li>
      </ul>
      <strong>Instituto Social Nossa Senhora de Fátima</strong>
      <p>Av. Coronel Octaviano de Freitas Costa, 463 - Socorro, São Paulo - SP, 04773-000</p>
    </div>
  );
}

export function ProvaVestibular({ realizado }) {
  if (realizado) {
    return (
      <p>A prova foi aplicada com sucesso aos presentes no dia marcado.</p>
    );
  }

  return (
    <div className="conteudo">
      <p>A prova será realizada presencialmente no Instituto.</p>
      <p>Não se esqueça de levar:</p>
      <ul>
        <li>Manual do candidato</li>
        <li>RG e CPF</li>
      </ul>
      <strong>Instituto Social Nossa Senhora de Fátima</strong>
      <p>Av. Coronel Octaviano de Freitas Costa, 463 - Socorro, São Paulo - SP, 04773-000</p>
    </div>
  );
}

export function Resultado({ realizado, dataPublicacao }) {
  if (realizado) {
    return (
      <div className="conteudo realizado">
        <p>
          Resultado disponível! Acesse:
        </p>
        <a href="https://www.acaonsfatima.org.br" target="_blank" rel="noopener noreferrer">www.acaonsfatima.org.br</a>
      </div>
    );
  }

  return (
    <div className="conteudo">
      <p>
        O resultado ficará disponível em nosso site no dia {new Date(dataPublicacao).toLocaleDateString()}.
      </p>
      <a href="https://www.acaonsfatima.org.br" target="_blank" rel="noopener noreferrer">www.acaonsfatima.org.br</a>
    </div>
  );
}
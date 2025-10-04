import './linhaTempo.scss';
import { useEffect, useState } from 'react';
import { Agendamento, ConcluirInscricao, PreInscricao, ProvaVestibular, Resultado } from './dadosLinha';
import callApi from '../../../../../../api/callAPI';
import { getAgendamento } from '../../../../../../api/services/agendamento';
import { getStatusVestibular } from '../../../../../../api/services/vestibular';

export default function Timeline({ statusInscricao }) {
  const [agendamento, setAgendamento] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await callApi(getAgendamento);

      if (r)
        setAgendamento(r);
    })();
  }, []);

  const [statusVestibular, setStatusVestibular] = useState(null);

  useEffect(() => {
    (async () => {
      setStatusVestibular(await callApi(getStatusVestibular))
    })()
  }, [])

  return (
    <div className="timeline-container">
      <TimelineItem titulo="Pré-inscrição">
        <PreInscricao />
      </TimelineItem>

      <TimelineItem titulo="Agendamento">
        <Agendamento dataAgendada={agendamento} />
      </TimelineItem>

      <TimelineItem titulo="Concluir Inscrição">
        <ConcluirInscricao dataAgendada={agendamento} realizado={statusInscricao == 2} />
      </TimelineItem>

      <TimelineItem titulo="Vestibular">
        <ProvaVestibular realizado={statusInscricao == 2} />
      </TimelineItem>

      <TimelineItem titulo="Resultado">
        <Resultado realizado={new Date(statusVestibular?.resultPublicationDate) >= new Date()} dataPublicacao={statusVestibular?.resultPublicationDate} />
      </TimelineItem>
    </div>
  );
};

function TimelineItem({ titulo, children }) {
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <h3>{titulo}</h3>
        {children}
      </div>
    </div>
  )
}
import './linhaTempo.scss';
import { useEffect, useState } from 'react';
import { Agendamento, ConcluirInscricao, PreInscricao, ProvaVestibular, Resultado } from './dadosLinha';
import callApi from '../../../../../../api/callAPI';
import { getAgendamento } from '../../../../../../api/services/agendamento';
import { useOutletContext } from 'react-router';

export default function Timeline({ dadosInscricao }) {
  
  const statusVestibular = useOutletContext();
  
  const [agendamento, setAgendamento] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await callApi(getAgendamento);

      if (r)
        setAgendamento(r);
    })();
  }, []);

  return (
    <div className="timeline-container">
      <TimelineItem titulo="Pré-inscrição">
        <PreInscricao />
      </TimelineItem>

      <TimelineItem titulo="Agendamento">
        <Agendamento dataAgendada={agendamento} alteravel={dadosInscricao?.status != 2} />
      </TimelineItem>

      <TimelineItem titulo="Concluir Inscrição">
        <ConcluirInscricao dataAgendada={agendamento} realizado={dadosInscricao?.status == 2} />
      </TimelineItem>

      <TimelineItem titulo="Vestibular">
        <ProvaVestibular realizado={new Date(dadosInscricao?.testDate) <= new Date()} dadosInscricao={dadosInscricao} />
      </TimelineItem>

      <TimelineItem titulo="Resultado">
        <Resultado
          realizado={new Date(statusVestibular?.resultPublicationDate) <= new Date()}
          dataPublicacao={statusVestibular?.resultPublicationDate}
          mostrarUrl={statusVestibular?.canShowResultUrl}
          urlResultado={statusVestibular?.resultUrl}
        />
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
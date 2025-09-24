import perguntas from './perguntas';
import { useState } from 'react';
import './index.scss';

export default function AcordeaoPerguntas() {
  const [selecionada, setSelecionada] = useState(-1);

  return (
    <div className='acordeao-perguntas'>
      {perguntas.map((p, index) =>
        <div
          className={'pergunta ' + (index == selecionada ? 'selecionada' : '')}
          onClick={() => setSelecionada(index == selecionada ? -1 : index)}
        >
          <h4>
            {p.pergunta}
            <img src="/assets/images/icons/angulo.svg" alt="" />
          </h4>
          <p>{p.resposta}</p>
        </div>
      )}
    </div>
  )
}
import { useEffect, useState } from 'react';
import './index.scss';
import callApi from '../../api/callAPI';
import { getFAQ } from '../../api/services/faq';

export default function AcordeaoPerguntas({ max }) {
  const [selecionada, setSelecionada] = useState(-1);

  const [perguntas, setPerguntas] = useState([]);

  useEffect(() => {
    (async () => {
      let p = await callApi(getFAQ);

      if (max) p.length = Math.min(p.length, max);

      p = p.filter(pergunta => pergunta.isActive);
      p.sort((a, b) => a.order - b.order);

      setPerguntas(p)
    })();
  }, [])

  return (
    <div className='acordeao-perguntas'>
      {perguntas.map((p, index) =>
        <div
          className={'pergunta ' + (index == selecionada ? 'selecionada' : '')}
          onClick={() => setSelecionada(index == selecionada ? -1 : index)}
        >
          <h4>
            {`${p.order + 1}. ${p.question}`}
            <img src="/assets/images/icons/angulo.svg" alt="" />
          </h4>
          <p>{p.answer}</p>
        </div>
      )}
    </div>
  )
}
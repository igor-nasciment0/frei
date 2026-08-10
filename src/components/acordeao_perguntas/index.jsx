import { useEffect, useState } from 'react';
import './index.scss';
import callApi from '../../api/callAPI';
import { getFAQ } from '../../api/services/faq';
import { formatarComoHTML } from '../../util/string';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// `onSelecionar`, quando informado, transforma o componente numa lista de atalhos (ex.: preview
// de FAQ na Início): o clique não expande a resposta ali mesmo, só notifica o índice escolhido
// (usado para navegar até /faq?q=N com a pergunta já aberta).
export default function AcordeaoPerguntas({ max, numbered = true, aberta, onSelecionar }) {
  const [selecionada, setSelecionada] = useState(aberta ?? -1);

  const [perguntas, setPerguntas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      let p = await callApi(getFAQ);

      p = p.filter(pergunta => pergunta.isActive);
      p.sort((a, b) => a.order - b.order);

      if (max) p = p.slice(0, max);

      setPerguntas(p)
      setCarregando(false);
    })();
  }, [])

  function clicar(index) {
    if (onSelecionar)
      onSelecionar(perguntas[index], index);
    else
      setSelecionada(index == selecionada ? -1 : index);
  }

  if (carregando) {
    return (
      <div className={"acordeao-perguntas " + (numbered ? "" : "sem-numero")}>
        {Array.from({ length: max ?? 5 }).map((_, index) =>
          <div className="pergunta esqueleto" key={index}>
            <div className="cabecalho-pergunta">
              {numbered && <span className="numero"><Skeleton width={16} /></span>}
              <span className="texto"><Skeleton width={`${60 + (index % 3) * 10}%`} /></span>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={"acordeao-perguntas " + (numbered ? "" : "sem-numero")}>
      {perguntas.map((p, index) =>
        <div
          key={p.id ?? index}
          className={'pergunta ' + (index == selecionada ? 'selecionada' : '')}
          onClick={() => clicar(index)}
        >
          <div className="cabecalho-pergunta">
            {numbered && <span className="numero">{String(index + 1).padStart(2, '0')}</span>}
            <span className="texto">{p.question}</span>
            <span className="sinal">{onSelecionar ? '+' : (index == selecionada ? '–' : '+')}</span>
          </div>
          {!onSelecionar &&
            <div className="resposta">
              <p>{formatarComoHTML(p.answer)}</p>
            </div>
          }
        </div>
      )}
    </div>
  )
}

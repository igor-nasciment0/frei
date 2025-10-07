import './index.scss';

import AcordeaoPerguntas from '../../../../components/acordeao_perguntas';

export default function FAQ() {
  return (
    <section className='faq'>
      <h3 className='nav'>Frei Online {'>'} FAQ</h3>

      <h3>Perguntas Frequentes</h3>

      <AcordeaoPerguntas />
    </section>
  )
}

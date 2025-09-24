import AcordeaoPerguntas from '../../../../components/acordeao_perguntas';
import './index.scss';

export default function Inicio() {
  return (
    <section className='inicio'>
      <h3 className='nav'>Frei Online {'>'} Início</h3>

      <h1>Olá! Seja bem-vindo,</h1>
      <h2>Bruno!</h2>

      <div className='anuncio'>
        <h3>As inscrições para o vestibular <br /> irão começar em 17/10/2025</h3>
        <button>
          Realizar a pré-inscrição
          <img src="/assets/images/icons/seta.svg" alt="" />
        </button>
      </div>


      <div className='acoes'>
        <h3>Ações rápidas</h3>

        <div className='container'>
          <div>
            <img src="/assets/images/icons/doc.svg" alt="" />
            <p>Acompanhar inscrição</p>
          </div>
          <div>
            <img src="/assets/images/icons/doc.svg" alt="" />
            <p>Conhecer cursos</p>
          </div>
          <div>
            <img src="/assets/images/icons/doc.svg" alt="" />
            <p>Contato</p>
          </div>
        </div>
      </div>

      <div className='perguntas'>
        <div className='titulo'>
          <h3>Perguntas Frequentes</h3>

          <button>
            Ver todas
            <img src="/assets/images/icons/seta.svg" alt="" />
          </button>
        </div>

        <AcordeaoPerguntas />
      </div>
    </section>
  )
}
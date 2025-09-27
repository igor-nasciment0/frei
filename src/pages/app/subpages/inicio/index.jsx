import { get } from 'local-storage';
import AcordeaoPerguntas from '../../../../components/acordeao_perguntas';
import './index.scss';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getStatusVestibular } from '../../../../api/services/vestibular';
import callApi from '../../../../api/callAPI';
import { formatarData } from '../../../../util/string';

export default function Inicio() {

  const user = get("user");
  const navigate = useNavigate();

  const [statusVestibular, setStatusVestibular] = useState();

  useEffect(() => {
    (async () => {
      setStatusVestibular(await callApi(getStatusVestibular))
    })()
  }, [])

  return (
    <section className='inicio'>
      <h3 className='nav'>Frei Online {'>'} Início</h3>

      <h1>Olá! Seja bem-vindo,</h1>
      <h2>{user?.name}!</h2>

      <Anuncio statusVestibular={statusVestibular}/>

      <div className='acoes'>
        <h3>Ações rápidas</h3>

        <div className='container'>
          <div onClick={() => navigate("/inscricao")}>
            <img src="/assets/images/icons/doc.svg" alt="" />
            <p>Acompanhar inscrição</p>
          </div>
          <div onClick={() => navigate("/cursos")}>
            <img src="/assets/images/icons/doc.svg" alt="" />
            <p>Conhecer cursos</p>
          </div>
          <div onClick={() => navigate("/")}>
            <img src="/assets/images/icons/doc.svg" alt="" />
            <p>Contato</p>
          </div>
        </div>
      </div>

      <div className='perguntas'>
        <div className='titulo'>
          <h3>Perguntas Frequentes</h3>

          <button onClick={() => navigate("/faq")}>
            Ver todas
            <img src="/assets/images/icons/seta.svg" alt="" />
          </button>
        </div>

        <AcordeaoPerguntas max={5} />
      </div>
    </section>
  )
}

function Anuncio({ statusVestibular }) {
  const navigate = useNavigate();

  if (!statusVestibular?.isRegistrationOpen)
    return (
      <div className='anuncio'>
        <h3>As inscrições para o vestibular <br /> irão começar em {formatarData(statusVestibular?.startDate)}</h3>
        <button onClick={() => navigate("/inscricao")}>
          Realizar a pré-inscrição
          <img src="/assets/images/icons/seta.svg" alt="" />
        </button>
      </div>
    )
  else return (
    <div className='anuncio'>
      <h3>As inscrições para o vestibular <br /> estarão abertas até {formatarData(statusVestibular?.endDate)}</h3>
      <button onClick={() => navigate("/inscricao")}>
        Realizar a pré-inscrição
        <img src="/assets/images/icons/seta.svg" alt="" />
      </button>
    </div>
  )
}
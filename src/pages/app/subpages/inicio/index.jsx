import { get } from 'local-storage';
import AcordeaoPerguntas from '../../../../components/acordeao_perguntas';
import './index.scss';
import { Link, useNavigate, useOutletContext } from 'react-router';
import { useEffect, useState } from 'react';
import callApi from '../../../../api/callAPI';
import { formatarData } from '../../../../util/string';
import { getInscricao } from '../../../../api/services/inscricao';
import Skeleton from 'react-loading-skeleton';

export default function Inicio() {

  const statusVestibular = useOutletContext();

  const user = get("user");
  const navigate = useNavigate();

  const [usuarioInscrito, setUsuarioInscrito] = useState();

  useEffect(() => {
    (async () => {
      const r = await callApi(getInscricao);
      if (r?.data?.firstChoice) setUsuarioInscrito(true);
    })()
  }, [])

  return (
    <section className='inicio'>
      <h3 className='nav'>Frei Online {'>'} Início</h3>

      <h1>Olá! Seja bem-vindo,</h1>
      <h2>{user?.name}!</h2>

      <div className='agendamento-pendente aviso-agendamento'>
        Para concluir sua inscrição, realize o agendamento da sua prova clicando <Link style={{textDecoration: 'underline'}} to="/acompanhamento">aqui</Link>.
        Depois, dirija-se presencialmente à nossa instituição no dia agendado.
      </div>

      <Anuncio statusVestibular={statusVestibular} usuarioInscrito={usuarioInscrito} />

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
          <div onClick={() => window.open("mailto:secretaria@acaonsfatima.org.br")}>
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

function Anuncio({ statusVestibular, usuarioInscrito }) {

  if (!statusVestibular)
    return <Skeleton height={100} />

  if (!statusVestibular?.isRegistrationOpen)
    return (
      <div className='anuncio'>
        <h3>As inscrições para o vestibular <br /> irão começar em {formatarData(statusVestibular?.startDate)}</h3>
        <BotaoAnuncio usuarioInscrito={usuarioInscrito} />
      </div>
    )
  else return (
    <div className='anuncio'>
      <h3>As inscrições para o vestibular <br /> estarão abertas até {formatarData(statusVestibular?.endDate)}</h3>
      <BotaoAnuncio usuarioInscrito={usuarioInscrito} />
    </div>
  )
}

function BotaoAnuncio({ usuarioInscrito }) {
  const navigate = useNavigate();

  if (!usuarioInscrito)
    return (
      <button onClick={() => navigate("/inscricao")}>
        Realizar a pré-inscrição
        <img src="/assets/images/icons/seta.svg" alt="" />
      </button>
    )
  else return (
    <button onClick={() => navigate("/acompanhamento")}>
      Acompanhar minha inscrição
      <img src="/assets/images/icons/seta.svg" alt="" />
    </button>
  )
}
import { Link, useLocation, useMatch } from 'react-router';
import './index.scss';
import useMediaQuery from '../../util/useMediaQuery';
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../util/useClickOutside';

export default function BarraLateral() {
  const isMobile = useMediaQuery("screen and (max-width: 768px)");

  if (isMobile)
    return <BarraMobile />
  else
    return <BarraPadrao />
}

function BarraMobile() {
  const [aberta, setAberta] = useState(false);

  const barraRef = useRef(null);
  useClickOutside(barraRef, () => setAberta(false));

  const location = useLocation();
  useEffect(() => setAberta(false), [location.pathname])

  return (
    <>
      <button id='Button___openSideBar' style={{ display: 'none' }} onClick={() => setAberta(true)} />

      <div className={"container-barra-mobile " + (aberta ? "aberta" : "")} >
        <BarraPadrao ref={barraRef} isMobile={true} close={() => setAberta(false)} />
      </div>
    </>
  )
}

function BarraPadrao({ ref, isMobile, close }) {
  return (
    <div className='barra-lateral' ref={ref}>
      <div className='logo'>
        <img src="/assets/images/logo.svg" alt="" />
      </div>

      {isMobile && <button onClick={close}>
        <img src="/assets/images/icons/fechar.svg" alt="" />
      </button>}

      <div className='links'>
        <LinkLateral para={"/"} titulo={"Início"} icone={"casa"} />
        <LinkLateral para={"/inscricao"} titulo={"Inscrição"} icone={"usuarios"} />
        <LinkLateral para={"/acompanhamento"} titulo={"Acompanhamento"} icone={"calendario"} />
        <LinkLateral para={"/cursos"} titulo={"Cursos"} icone={"carteira"} />
        <LinkLateral para={"/faq"} titulo={"FAQ"} icone={"arquivos"} />
      </div>
    </div>
  )
}

function LinkLateral({ para, titulo, icone }) {

  const selecionado = useMatch(para);

  return (
    <Link to={para} className={selecionado ? "selecionado" : ""}>
      <img src={"/assets/images/icons/" + icone + ".svg"} alt={"Imagem de " + icone} />
      <p>{titulo}</p>

      <div className="border" />
    </Link>
  )
}
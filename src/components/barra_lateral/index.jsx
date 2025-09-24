import { Link, useMatch } from 'react-router';
import './index.scss';

export default function BarraLateral() {
  return (
    <div className='barra-lateral'>
      <div className='logo'>
        <img src="/assets/images/logo.svg" alt="" />
      </div>

      <div className='links'>
        <LinkLateral para={"/"} titulo={"Início"} icone={"casa"}/>
        <LinkLateral para={"/inscricao"} titulo={"Inscrição"} icone={"usuarios"}/>
        <LinkLateral para={"/acompanhamento"} titulo={"Acompanhamento"} icone={"calendario"}/>
        <LinkLateral para={"/cursos"} titulo={"Cursos"} icone={"carteira"}/>
        <LinkLateral para={"/faq"} titulo={"FAQ"} icone={"arquivos"}/>
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
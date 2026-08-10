import { useEffect, useRef, useState } from 'react';
import './index.scss';
import { get, remove } from 'local-storage';
import { useLocation, useNavigate } from 'react-router';
import useClickOutside from '../../util/useClickOutside';

const BREADCRUMBS = {
  '/': 'Início',
  '/inscricao': 'Minha inscrição',
  '/acompanhamento': 'Acompanhamento',
  '/cursos': 'Cursos',
  '/faq': 'Dúvidas frequentes',
};

function breadcrumbFor(pathname) {
  if (BREADCRUMBS[pathname] !== undefined) return BREADCRUMBS[pathname];
  if (pathname.startsWith('/cursos')) return 'Cursos';
  return '';
}

export default function Cabecalho({ user, inscricao }) {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = get("token");

    if (!token)
      navigate("/login");
  }, [])

  const [mostrarMenu, setMostrarMenu] = useState(false);
  const usuarioRef = useRef();
  useClickOutside(usuarioRef, () => setMostrarMenu(false));

  function sair() {
    remove("token");
    remove("user");
    navigate("/login");
  }

  const iniciais = (user?.name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(parte => parte[0]?.toUpperCase())
    .join("");

  return (
    <header className="cabecalho">
      <p className="breadcrumb">Portal do candidato / <strong>{breadcrumbFor(location.pathname)}</strong></p>

      <div ref={usuarioRef} className="usuario" onClick={() => setMostrarMenu(!mostrarMenu)}>
        <div className="info">
          <p className="nome">{user?.name}</p>
          {inscricao?.protocol && <p className="protocolo">inscrição {inscricao.protocol}</p>}
        </div>

        <span className="avatar">{iniciais}</span>

        {mostrarMenu &&
          <div className="menu">
            <button onClick={sair}>Sair</button>
          </div>
        }
      </div>
    </header>
  )
}

import { useEffect, useRef, useState } from 'react';
import './index.scss';
import { get, remove } from 'local-storage';
import { useNavigate } from 'react-router';
import useMediaQuery from '../../util/useMediaQuery';
import useClickOutside from '../../util/useClickOutside';

export default function Cabecalho() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = get("token");

    if (!token)
      navigate("/login");
  }, [])

  const user = get("user");

  const isMobile = useMediaQuery("screen and (max-width: 768px)");

  const [mostrarMenu, setMostrarMenu] = useState(false);
  const usuarioRef = useRef();
  useClickOutside(usuarioRef, () => setMostrarMenu(false));

  function sair() {
    remove("token");
    remove("user");
    navigate("/login");
  }

  return (
    <header className="cabecalho">
      {isMobile &&
        <button onClick={() => document.getElementById("Button___openSideBar")?.click()}>
          <img src="/assets/images/icons/menu.svg" alt="" />
        </button>
      }
      <div ref={usuarioRef} className="usuario" onClick={() => setMostrarMenu(!mostrarMenu)}>
        <div>
          <h3>{user?.name}</h3>
          <h4>Online</h4>
        </div>

        {mostrarMenu &&
          <div className="menu">
            <button onClick={sair}>Sair</button>
          </div>
        }
      </div>
    </header>
  )
}
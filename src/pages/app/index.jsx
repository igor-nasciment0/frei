import './index.scss';

import { Outlet, useNavigate } from "react-router";
import BarraLateral from "../../components/barra_lateral";
import Cabecalho from "../../components/cabecalho";
import callApi from '../../api/callAPI';
import { getStatusVestibular } from '../../api/services/vestibular';
import { useEffect, useState } from 'react';
import { getInfoUsuario } from '../../api/services/user';
import { set } from 'local-storage';
import Carregamento from '../../components/carregamento';

export default function App() {

  const [mostraAPP, setMostraAPP] = useState(false);
  const [statusVestibular, setStatusVestibular] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const user = await callApi(getInfoUsuario, false);

      if (!user)
        navigate("/login");

      set("user", user);
      setStatusVestibular(await callApi(getStatusVestibular))
      setMostraAPP(true);
    })()
  }, [])

  if (!mostraAPP)
    return <Carregamento style={{ height: "100dvh" }} />

  return (
    <div className="app">
      <BarraLateral />
      <main>
        <Cabecalho />

        {/* "Outlet" é o conteúdo das subpáginas do App */}
        {statusVestibular &&
          <Outlet context={statusVestibular} />
        }
      </main>
    </div>
  )
}
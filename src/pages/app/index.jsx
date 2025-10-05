import './index.scss';

import { Outlet } from "react-router";
import BarraLateral from "../../components/barra_lateral";
import Cabecalho from "../../components/cabecalho";
import callApi from '../../api/callAPI';
import { getStatusVestibular } from '../../api/services/vestibular';
import { useEffect, useState } from 'react';

export default function App() {

  const [statusVestibular, setStatusVestibular] = useState(null);

  useEffect(() => {
    (async () => {
      setStatusVestibular(await callApi(getStatusVestibular))
    })()
  }, [])

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
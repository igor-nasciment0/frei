import './index.scss';

import { Outlet } from "react-router";
import BarraLateral from "../../components/barra_lateral";
import Cabecalho from "../../components/cabecalho";

export default function App() {
  return (
    <div className="app">
      <BarraLateral />
      <main>
        <Cabecalho />

        {/* "Outlet" é o conteúdo das subpáginas do App */}
        <Outlet />
      </main>
    </div>
  )
}
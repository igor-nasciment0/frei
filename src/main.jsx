import './index.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './pages/app';
import Inicio from './pages/app/subpages/inicio';
import Cursos from './pages/app/subpages/cursos';
import DetalhesCurso from './pages/app/subpages/cursos/detalhes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='app' element={<App />}>
          <Route index element={<Inicio />} />
          <Route path='inscricao' element={<Inicio />} />
          <Route path='acompanhamento' element={<Inicio />} />
          <Route path='cursos' element={<Cursos />}>
            <Route path=':curso' element={<DetalhesCurso />} />
          </Route>
          <Route path='faq' element={<Inicio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

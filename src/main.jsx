import './index.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './pages/app';
import Inicio from './pages/app/subpages/inicio';
import Cursos from './pages/app/subpages/cursos';
import DetalhesCurso from './pages/app/subpages/cursos/detalhes';
import FAQ from './pages/app/subpages/faq';
import Inscricao from './pages/app/subpages/inscricao';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App />}>
          <Route index element={<Inicio />} />
          <Route path='inscricao' element={<Inscricao />} />
          <Route path='acompanhamento' element={<Inicio />} />
          <Route path='cursos' element={<Cursos />}>
            <Route path=':curso' element={<DetalhesCurso />} />
          </Route>
          <Route path='faq' element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

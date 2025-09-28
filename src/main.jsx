import './index.scss'
import './init'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './pages/app';
import Inicio from './pages/app/subpages/inicio';
import Cursos from './pages/app/subpages/cursos';
import DetalhesCurso from './pages/app/subpages/cursos/detalhes';
import FAQ from './pages/app/subpages/faq';
import Inscricao from './pages/app/subpages/inscricao';
import Login from './pages/login';
import RecuperarSenha from './pages/recuperar-senha';
import Acompanhamento from './pages/app/subpages/acompanhamento';
import { LoadingBarContainer } from 'react-top-loading-bar';
import TrocarSenha from './pages/trocar-senha';

createRoot(document.getElementById('root')).render(
  <LoadingBarContainer>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<App />}>
            <Route index element={<Inicio />} />
            <Route path='inscricao' element={<Inscricao />} />
            <Route path='acompanhamento' element={<Acompanhamento />} />
            <Route path='cursos' element={<Cursos />}>
              <Route path=':id' element={<DetalhesCurso />} />
            </Route>
            <Route path='faq' element={<FAQ />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/recuperar-senha' element={<RecuperarSenha />} />
          <Route path='/trocar-senha' element={<TrocarSenha />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </LoadingBarContainer>
)

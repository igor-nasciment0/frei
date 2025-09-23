import './index.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './pages/app';
import Inicio from './pages/app/subpages/inicio';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='app' element={<App />}>
          <Route index element={<Inicio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

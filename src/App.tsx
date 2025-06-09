import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './features/navegaciónInicial/pages/home/home'
import Login from './features/inicioSesion/pages/login/login'
import MenuComp from './features/vistaMenuPlatos/pages/menu'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nosotros" element={<div>Página NosotrosCambiado</div>} />
          <Route path="/galeria" element={<div>Página Galería</div>} />
          <Route path="/menus" element={<MenuComp />} />
          <Route path="/contacto" element={<div>Página Contacto</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

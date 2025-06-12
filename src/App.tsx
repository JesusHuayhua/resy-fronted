import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './features/navegaciónInicial/pages/home/home'
import Login from './features/inicioSesion/pages/login/login'
import MenuComp from './features/vistaMenuPlatos/pages/menu'
import Reserva from './features/reserva/pages/reserva'
import Nosotros from './features/navegaciónInicial/pages/nosotros/nosotros'
import Contacto from './features/navegaciónInicial/pages/contacto/contacto'
import Ambientes from './features/navegaciónInicial/pages/ambientes/ambientes'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/galeria" element={<div>Página Galería</div>} />
          <Route path="/menus" element={<MenuComp />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/ambientes" element={<Ambientes />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

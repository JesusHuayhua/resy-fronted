import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './features/navegaciónInicial/pages/home/home'
import Login from './features/inicioSesion/pages/login/login'
import MenuComp from './features/vistaMenuPlatos/pages/menu'
import Reserva from './features/reserva/pages/reserva'
import MesaReserva from './features/reserva/pages/mesa/mesa'
import PedidoReserva from './features/reserva/pages/pedido/pedido'
import LocalReserva from './features/reserva/pages/local/local'

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
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/mesa_reserva" element={<MesaReserva />} />
          <Route path="/pedido_reserva" element={<PedidoReserva />} />
          <Route path="/local_reserva" element={<LocalReserva/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

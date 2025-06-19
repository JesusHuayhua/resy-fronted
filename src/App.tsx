import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './features/navegaciónInicial/pages/home/home'
import Login from './features/inicioSesion/pages/login/login'
import MenuComp from './features/vistaMenuPlatos/pages/menu'
import Reserva from './features/reserva/pages/reserva'

import Nosotros from './features/navegaciónInicial/pages/nosotros/nosotros'
import Contacto from './features/navegaciónInicial/pages/contacto/contacto'
import Ambientes from './features/navegaciónInicial/pages/ambientes/ambientes'

import MesaReserva from './features/reserva/pages/mesa/mesa'
import PedidoReserva from './features/reserva/pages/pedido/pedido'
import LocalReserva from './features/reserva/pages/local/local'
import RegistroUsuario from './features/inicioSesion/pages/registroUsuario/registroUsuario'

import RecuperarContrasena from './features/inicioSesion/pages/recuperarContrasena/recuperar'
import Codigo from './features/inicioSesion/pages/recuperarContrasena/codigo'
import Cambiar from './features/inicioSesion/pages/recuperarContrasena/cambiar'

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

          <Route path="/mesa_reserva" element={<MesaReserva />} />
          <Route path="/pedido_reserva" element={<PedidoReserva />} />
          <Route path="/local_reserva" element={<LocalReserva/>} />
           <Route path="/registroUsuario" element={<RegistroUsuario />} />
          <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />
          <Route path="/codigo" element={<Codigo />} />
          <Route path="/cambiar" element={<Cambiar />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App

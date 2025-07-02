import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './features/SectorInicio/PantallaInicioSinLogin'
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
import { UserProvider } from './features/user/context/UserContext';
import { UsuarioLayout } from './layouts/usuarioLayout'
import { AdminLayout } from './layouts/adminLayout'

// Fuentes
import '@fontsource/inter/400.css'
import '@fontsource/alegreya/400.css'

import HomeAdmin from './features/navegacionAdmin/gestionDePlatos/pages/HomeAdmin'
import GestionarPlatos from './features/navegacionAdmin/gestionDePlatos/pages/GestionarPlatos'
import UsuariosPage from './features/navegacionAdmin/gestionUsuarios/pages/Usuarios/UsuariosPage'
import DetalleUsuarioPage from './features/navegacionAdmin/gestionUsuarios/pages/DetalleUsuario/DetalleUsuarioPage'
import CalendarioReservas from "./features/navegacionAdmin/gestionReservas/pages/CalendarioReservas";





function App() {
  return (
    <UserProvider>
      <Router>
        <div>

            <Routes>
              <Route path='/' element={<UsuarioLayout />}>
                {/* Index element es la ruta que se renderiza cuando estas en el padre (o sea, /)*/}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="nosotros" element={<Nosotros />} />
                <Route path="menus" element={<MenuComp />} />
                <Route path="contacto" element={<Contacto/>} />
                <Route path="reserva" element={<Reserva />} />
                <Route path="ambientes" element={<Ambientes />} />

                <Route path="mesa_reserva" element={<MesaReserva />} />
                <Route path="pedido_reserva" element={<PedidoReserva />} />
                <Route path="local_reserva" element={<LocalReserva/>} />
                <Route path="registroUsuario" element={<RegistroUsuario />} />
                <Route path="recuperarContrasena" element={<RecuperarContrasena />} />
                <Route path="codigo" element={<Codigo />} />
                <Route path="cambiar" element={<Cambiar />} />
              </Route>
              {/* Paginas del admin */}
              <Route path='/admin' element={<AdminLayout />}>
                <Route index element= {<HomeAdmin />} />
                <Route path="reservas" element={< CalendarioReservas/>} />
                <Route path="alimentos" element={<GestionarPlatos />} />
                <Route path="usuarios" element={<UsuariosPage />} />
                <Route path="usuarios/:id" element={<DetalleUsuarioPage />} />
                <Route path="log_out" element={<div>Pagina log_out</div>} />
              </Route>
              
            </Routes>
          
        </div>
      </Router>
    </UserProvider>
  )
}

export default App

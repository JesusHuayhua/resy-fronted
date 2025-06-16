//Es una librería de enrutamiento que permite crear una SPA (Single Page Application) en React, lo que significa que 
// puedes navegar entre páginas sin recargar toda la web.
// 
import { BrowserRouter, Routes, Route } from 'react-router-dom';//para poder hacer cambio de paginas, DOM
import PantallaInicio  from './features/SectorInicio/PantallaInicioSinLogin'
import Login from './features/inicioSesion/pages/login/login';

function App() {

  return (
    <BrowserRouter>{/*Activa el enrutador que observa la URL del navegador*/}
      <Routes> {/*Contenedor de rutas*/}
         {/*Route: Define una ruta individual.*/}
         {/* Ruta principal */}
         {/* path="/" rendira la pantalla de inicio*/}
        <Route path="/" element={<PantallaInicio />} />

        {/* Ruta para login */}
        <Route path="/login" element={<Login />} />
      </Routes> 
    </BrowserRouter>
    
    
  );
}

export default App;

/*
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './features/navegaciónInicial/pages/home/home'
import Login from './features/inicioSesion/pages/login/login'
import MenuComp from './features/vistaMenuPlatos/pages/menu'
import Reserva from './features/reserva/pages/reserva'
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
        </Routes>
      </div>
    </Router>
  )
}

export default App;
*/
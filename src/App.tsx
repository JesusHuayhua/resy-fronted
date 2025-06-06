import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Login from './pages/login/login'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nosotros" element={<div>Página Nosotros</div>} />
          <Route path="/galeria" element={<div>Página Galería</div>} />
          <Route path="/menus" element={<div>Página Menús</div>} />
          <Route path="/contacto" element={<div>Página Contacto</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

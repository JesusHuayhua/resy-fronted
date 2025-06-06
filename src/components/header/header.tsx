import './header.css'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'

function Header() {
  return (
    <header className="navbar">
      <div className="navbar-group">
        <div className="navbar-links-bg">
          <a href="#">NOSOTROS</a>
          <a href="#">GALERÍA</a>
          <a href="#">MENÚS</a>
          <a href="#">CONTACTO</a>
        </div>
        <button className="btn-reservar">RESERVAR</button>
      </div>
      <div className="navbar-right">
        <div className="social-icons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaWhatsapp />
          </span>
        </div>
        <button className="btn-login">INICIAR SESIÓN</button>
      </div>
    </header>
  )
}

export default Header

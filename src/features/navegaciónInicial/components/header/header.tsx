import { useNavigate } from 'react-router-dom'
import './header.css'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'

function Header() {

  // Se crea un navigator.
  const navigate = useNavigate();

  const handleLoginClick = () =>{
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div className="navbar-group">
        <div className="navbar-links-bg">
          <a href="#">NOSOTROS</a>
          <a href="#">GALERÍA</a>
          <a onClick={() => navigate('/menus')}>MENÚS</a>
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
        <button
          className="btn-login"
          onClick={handleLoginClick}
        >INICIAR SESIÓN</button>
      </div>
    </header>
  )
}

export default Header

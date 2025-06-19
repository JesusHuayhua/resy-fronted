import { useNavigate } from 'react-router-dom'
import './header.css'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import logo from '../../../../assets/logo.webp' // Update with the actual path to your logo image
function Header() {

  // Se crea un navigator.
  const navigate = useNavigate();

  const handleLoginClick = () =>{
    navigate('/login');
  }

  const handleMainMenuClick = () => {
    navigate('/');
  }

  const handleReservarClick = () => {
    navigate('/reserva');
  }

  const handleNosotrosClick = () => {
    navigate('/nosotros');
  }

  const handleContactoClick = () => {
    navigate('/contacto');
  }

  const handleGaleriaClick = () => {
    navigate('/ambientes');
  }

  return (
    <header className="navbar">
      <div className="navbar-group">
        <div className="navbar-links-bg">
          <img 
            src={logo} 
            alt="logo" 
            className="navbar-logo" 
            onClick={handleMainMenuClick} 
          />
          <a onClick={handleNosotrosClick}>NOSOTROS</a>
          <a onClick={handleGaleriaClick}>GALERÍA</a>
          <a onClick={() => navigate('/menus')}>MENÚS</a>
          <a onClick={handleContactoClick}>CONTACTO</a>
          <button className="btn-reservar" onClick={handleReservarClick}>RESERVAR</button>
        </div>
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

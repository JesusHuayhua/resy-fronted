import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../assets/logo.webp';
import { useUser } from '../../../user/context/UserContext';

const HeaderLogged: React.FC = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      checkIsMobile();
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    checkIsMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNavClick = () => { if (isMobile) setIsMenuOpen(false); };

  // Puedes mover estos estilos a un archivo CSS si lo prefieres
  const styles = {
    header: {
      width: '100%',
      position: 'fixed' as const,
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      background: '#000'
    },
    navbar: {
      width: '100%',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      padding: '0 20px'
    },
    branding: {
      display: 'flex',
      alignItems: 'center'
    },
    brandLogo: {
      maxHeight: '50px',
      marginRight: 16
    },
    navLinks: {
      display: isMobile ? 'none' : 'flex',
      flex: 1,
      height: '100%',
      alignItems: 'center'
    },
    navLinksOpen: {
      display: 'flex',
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      flexDirection: 'column' as const,
      backgroundColor: '#000000',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      zIndex: 999,
    },
    navSection: {
      flex: isMobile ? undefined : 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative' as const,
      height: isMobile ? '50px' : '100%',
      color: 'white',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: 500,
      transition: 'background-color 0.3s ease',
      borderRight: isMobile ? 'none' : '1px solid white',
      borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
      cursor: 'pointer',
    },
    reservar: {
      backgroundColor: '#B9C507',
    },
    mobileMenuBtn: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '40px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '5px',
      marginRight: '20px',
    },
    hamburgerLine: {
      width: '25px',
      height: '3px',
      backgroundColor: 'white',
      margin: '2px 0',
      transition: 'all 0.3s ease',
      transformOrigin: 'center',
    },
    hamburgerLineActive1: {
      transform: 'rotate(45deg) translate(5px, 5px)',
    },
    hamburgerLineActive2: {
      opacity: 0,
    },
    hamburgerLineActive3: {
      transform: 'rotate(-45deg) translate(7px, -6px)',
    },
    bienvenido: {
      color: '#fff',
      fontWeight: 500,
      marginLeft: 16,
      marginRight: 8
    },
    cerrarSesion: {
      background: '#F44336',
      color: '#fff',
      border: 'none',
      borderRadius: 4,
      padding: '8px 16px',
      cursor: 'pointer',
      fontWeight: 500
    }
  };

  const getHamburgerLineStyle = (isActive: boolean, activeStyle: React.CSSProperties): React.CSSProperties => ({
    ...styles.hamburgerLine,
    ...(isActive ? activeStyle : {}),
  });

  return (
    <header style={styles.header}>
      <nav style={styles.navbar}>
        <div style={styles.branding}>
          <Link to="/" onClick={handleNavClick}>
            <img src={logo} alt="Logo" style={styles.brandLogo} />
          </Link>
        </div>
        <div style={{
          ...styles.navLinks,
          ...(isMenuOpen && isMobile ? styles.navLinksOpen : {})
        }}>
          <Link to="/nosotros" style={styles.navSection} onClick={handleNavClick}>
            NOSOTROS
          </Link>
          <Link to="/ambientes" style={styles.navSection} onClick={handleNavClick}>
            GALERÍA
          </Link>
          <Link to="/menus" style={styles.navSection} onClick={handleNavClick}>
            MENÚS
          </Link>
          <Link to="/contacto" style={styles.navSection} onClick={handleNavClick}>
            CONTACTO
          </Link>
          <Link to="/reserva" style={{ ...styles.navSection, ...styles.reservar }} onClick={handleNavClick}>
            RESERVAR
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={styles.bienvenido}>
            Bienvenido, {user?.DataUsuario?.Nombres || 'Usuario'}
          </span>
          <button onClick={logout} style={styles.cerrarSesion}>
            Cerrar sesión
          </button>
          <button
            style={styles.mobileMenuBtn}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            type="button"
          >
            <span style={getHamburgerLineStyle(isMenuOpen, styles.hamburgerLineActive1)}></span>
            <span style={getHamburgerLineStyle(isMenuOpen, styles.hamburgerLineActive2)}></span>
            <span style={getHamburgerLineStyle(isMenuOpen, styles.hamburgerLineActive3)}></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderLogged;

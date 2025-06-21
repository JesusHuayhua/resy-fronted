import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.webp';
import { useUser } from '../../../user/context/UserContext';

const HeaderLogged: React.FC = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      color: '#fff',
      border: 'none',
      borderRadius: '0 6px 6px 0',
      fontSize: '1.2rem',
      fontWeight: 400,
      padding: '20px 0',
      width: 350,
      textAlign: 'center' as const,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      boxSizing: 'border-box' as const
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
    },
    userMenu: {
      backgroundColor: '#FFB357',
      color: '#fff',
      border: 'none',
      borderRadius: '0 6px 6px 0',
      fontSize: '1.2rem',
      fontWeight: 400,
      padding: '20px 0',
      width: 250,
      textAlign: 'center' as const,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      position: 'relative' as const,
      boxSizing: 'border-box' as const
    },
    userName: {
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: '1.2rem',
      fontWeight: 400,
      flex: 1,
      textAlign: 'center' as const
    },
    userIcon: {
      marginRight: 10,
      fontSize: 24
    },
    userArrow: {
      marginLeft: 10,
      fontSize: 18
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      right: 0,
      background: '#FF9C32',
      color: '#fff',
      border: '2px solid #fff',
      borderTop: 'none',
      borderRadius: '0 0 4px 4px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      display: isMenuOpen ? 'block' : 'none',
      zIndex: 1002
    },
    dropdownBtn: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: 22,
      padding: '18px 0',
      cursor: 'pointer',
      textAlign: 'center' as const,
      fontWeight: 400
    },
    divider: {
      height: 2,
      background: '#fff',
      margin: 0,
      border: 'none'
    }
  };

  const handleUserMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMenu();
  };

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
            AMBIENTES
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={styles.userMenu} onClick={handleUserMenuClick}>
            <span style={styles.userName}>
              {user?.DataUsuario?.Nombres ? `BIENVENIDO ${user.DataUsuario.Nombres.toUpperCase()}` : 'BIENVENIDO USUARIO'}
            </span>
            <span style={styles.userArrow}>{isMenuOpen ? '▲' : '▼'}</span>
            <div style={styles.dropdown}>
              <button style={styles.dropdownBtn} onClick={e => { e.stopPropagation(); window.location.href = '/perfil'; }}>
                PERFIL
              </button>
              <hr style={styles.divider} />
              <button style={styles.dropdownBtn} onClick={e => { e.stopPropagation(); logout(); }}>
                CERRAR SESIÓN
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderLogged;
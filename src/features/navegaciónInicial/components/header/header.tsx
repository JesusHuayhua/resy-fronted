import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../assets/logo.webp';

interface HeaderStyles {
  header: React.CSSProperties;
  navbar: React.CSSProperties;
  branding: React.CSSProperties;
  brandLogo: React.CSSProperties;
  navLinks: React.CSSProperties;
  navLinksOpen: React.CSSProperties;
  navSection: React.CSSProperties;
  reservar: React.CSSProperties;
  iniciarSesion: React.CSSProperties;
  mobileMenuBtn: React.CSSProperties;
  hamburgerLine: React.CSSProperties;
  hamburgerLineActive1: React.CSSProperties;
  hamburgerLineActive2: React.CSSProperties;
  hamburgerLineActive3: React.CSSProperties;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const checkIsMobile = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleResize = (): void => {
      checkIsMobile();
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (): void => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const styles: HeaderStyles = {
    header: {
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    
    navbar: {
      width: '100%',
      height: '64px',
      display: 'flex',
      backgroundColor: '#000000',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
    },

    branding: {
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
    },

    brandLogo: {
      maxHeight: '50px',
      maxWidth: '100%',
      objectFit: 'contain',
    },

    navLinks: {
      display: isMobile ? 'none' : 'flex',
      flex: 1,
      height: '100%',
    },

    navLinksOpen: {
      display: 'flex',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      flexDirection: 'column',
      backgroundColor: '#000000',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      zIndex: 999,
    },

    navSection: {
      flex: isMobile ? 'none' : 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      height: isMobile ? '50px' : '100%',
      color: 'white',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'background-color 0.3s ease',
      borderRight: isMobile ? 'none' : '1px solid white',
      borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
      cursor: 'pointer',
    },

    reservar: {
      backgroundColor: '#B9C507',
    },

    iniciarSesion: {
      backgroundColor: '#F69B1C',
      borderRight: 'none',
    },

    mobileMenuBtn: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column',
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
  };

  const getNavSectionStyle = (baseStyle: React.CSSProperties): React.CSSProperties => ({
    ...styles.navSection,
    ...baseStyle,
  });

  const getHamburgerLineStyle = (isActive: boolean, activeStyle: React.CSSProperties): React.CSSProperties => ({
    ...styles.hamburgerLine,
    ...(isActive ? activeStyle : {}),
  });

  return (
    <header style={styles.header}>
      <nav style={styles.navbar}>
        {/* Logo/Branding */}
        <div style={styles.branding}>
          <Link to="/" onClick={handleNavClick}>
            <img 
              src={logo} 
              alt="Logo de la empresa" 
              style={styles.brandLogo}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div style={{
          ...styles.navLinks, 
          ...(isMenuOpen && isMobile ? styles.navLinksOpen : {})
        }}>
          <Link 
            to="/nosotros" 
            style={styles.navSection}
            onClick={handleNavClick}
            className={location.pathname === "/nosotros" ? "active" : ""}
          >
            NOSOTROS
          </Link>
          <Link 
            to="/ambientes" 
            style={styles.navSection}
            onClick={handleNavClick}
            className={location.pathname === "/ambientes" ? "active" : ""}
          >
            AMBIENTES
          </Link>
          <Link 
            to="/menus" 
            style={styles.navSection}
            onClick={handleNavClick}
            className={location.pathname === "/menus" ? "active" : ""}
          >
            MENÚS
          </Link>
          <Link 
            to="/contacto" 
            style={styles.navSection}
            onClick={handleNavClick}
            className={location.pathname === "/contacto" ? "active" : ""}
          >
            CONTACTO
          </Link>
          <Link 
            to="/reserva" 
            style={getNavSectionStyle(styles.reservar)}
            onClick={handleNavClick}
            className={location.pathname === "/reserva" ? "active" : ""}
          >
            RESERVAR
          </Link>
          <Link 
            to="/login" 
            style={getNavSectionStyle(styles.iniciarSesion)}
            onClick={handleNavClick}
            className={location.pathname === "/login" ? "active" : ""}
          >
            INICIAR SESIÓN
          </Link>
        </div>

        {/* Mobile Menu Button */}
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
      </nav>
    </header>
  );
};

export default Header;
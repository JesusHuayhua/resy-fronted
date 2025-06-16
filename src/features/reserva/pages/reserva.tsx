import React from 'react';
import type { CSSProperties } from 'react';
import mesasIcon from '../../../assets/imagenesReserva/mesasIcono.webp';
import mesasImage from '../../../assets/imagenesReserva/mesas.webp';
import localIcon from '../../../assets/imagenesReserva/hombreMoto.webp';
import localImage from '../../../assets/imagenesReserva/pedido.webp';
import pedidosIcon from '../../../assets/imagenesReserva/reservaIcono.webp';
import pedidosImage from '../../../assets/imagenesReserva/fachada.webp';

const Reserva = () => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    width: '100vw',
    height: '100%',
  };

  const columnStyle: CSSProperties = {
    width: '33.33%',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  };

  const imageContainerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
    display: 'block',
    transition: 'opacity 0.3s ease',
  };

  const iconStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '60px',
    zIndex: 2,
  };

  const overlayStyle: CSSProperties = {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    textShadow: '0 0 5px rgba(0,0,0,0.7)',
    zIndex: 3,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  };

  const darkOverlay: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget.querySelector('img') as HTMLElement | null;
    const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement | null;
    if (image) image.style.opacity = '0.5';
    if (overlay) overlay.style.opacity = '1';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget.querySelector('img') as HTMLElement | null;
    const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement | null;
    if (image) image.style.opacity = '1';
    if (overlay) overlay.style.opacity = '0';
  };

  return (
    <div style={containerStyle}>
      {/* Mesas */}
      <div
        style={columnStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={imageContainerStyle}>
          <img src={mesasImage} alt="Mesas" style={imageStyle} />
          <div style={darkOverlay}></div>
          <img src={mesasIcon} alt="Mesas Icon" style={iconStyle} />
          <div className="hover-overlay" style={overlayStyle}>Reserva Mesas</div>
        </div>
      </div>

      {/* Local */}
      <div
        style={columnStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={imageContainerStyle}>
          <img src={localImage} alt="Local" style={imageStyle} />
          <div style={darkOverlay}></div>
          <img src={localIcon} alt="Local Icon" style={iconStyle} />
          <div className="hover-overlay" style={overlayStyle}>Reserva Local</div>
        </div>
      </div>

      {/* Pedidos */}
      <div
        style={columnStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={imageContainerStyle}>
          <img src={pedidosImage} alt="Pedidos" style={imageStyle} />
          <div style={darkOverlay}></div>
          <img src={pedidosIcon} alt="Pedidos Icon" style={iconStyle} />
          <div className="hover-overlay" style={overlayStyle}>Reserva Pedidos</div>
        </div>
      </div>
    </div>
  );
};

export default Reserva;
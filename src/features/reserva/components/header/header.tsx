// src/components/Header.tsx

import React from 'react';
import logo from '../../../../assets/logo.webp';

interface HeaderProps {
  // Aquí podríamos añadir props si el header necesitara interactuar con el estado global,
  // por ejemplo, para indicar qué sección de la reserva está activa.
  // Por ahora, no necesita props específicas para su funcionalidad básica.
  activeSection?: 'personas' | 'fecha' | 'hora' | 'tusDatos';
}

const Header: React.FC<HeaderProps> = ({ activeSection = 'personas' }) => {
  return (
    <header className="
      bg-white p-4 md:px-8 shadow-md flex justify-between items-center
      w-full rounded-t-lg
    ">
      {/* Sección izquierda: Logo y Navegación */}
      <div className="flex items-center space-x-4">
        {/* Logo del restaurante */}
        {/* Asegúrate de que la ruta a tu logo sea correcta, por ejemplo, public/images/logo.png */}
        <img src={logo} alt="Salón Verde Logo" className="h-10 md:h-12" />

        {/* Elementos de Navegación */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-semibold">
          {/* Enlace Personas */}
          <a
            href="#" // Podrías usar React Router Link aquí para navegación real
            className={`flex items-center space-x-2 ${activeSection === 'personas' ? 'text-orange-500' : 'hover:text-orange-400'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.17-1.272-.497-1.802M7 20h4m-4 0v-2c0-.653.17-1.272.497-1.802M7 4h10v2a3 3 0 01-5.356 1.857M7 4h4M7 4v2c0 .653.17 1.272.497 1.802M17 4h-4"></path></svg>
            <span>Personas</span>
          </a>

          {/* Enlace Fecha */}
          <a
            href="#"
            className={`flex items-center space-x-2 ${activeSection === 'fecha' ? 'text-orange-500' : 'hover:text-orange-400'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>Fecha</span>
          </a>

          {/* Enlace Hora */}
          <a
            href="#"
            className={`flex items-center space-x-2 ${activeSection === 'hora' ? 'text-orange-500' : 'hover:text-orange-400'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Hora</span>
          </a>

          {/* Enlace Tus datos */}
          <a
            href="#"
            className={`flex items-center space-x-2 ${activeSection === 'tusDatos' ? 'text-orange-500' : 'hover:text-orange-400'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span>Tus datos</span>
          </a>
        </nav>
      </div>

      {/* Sección derecha: Iconos de Redes Sociales */}
      <div className="flex space-x-4">
        {/* Ícono de Facebook */}
        {/* Asegúrate de que Font Awesome esté configurado o usa un SVG similar a los otros iconos */}
        <a href="#" className="text-gray-600 hover:text-blue-600">
          <i className="fab fa-facebook-f text-xl"></i>
        </a>
        {/* Ícono de Instagram */}
        <a href="#" className="text-gray-600 hover:text-pink-600">
          <i className="fab fa-instagram text-xl"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
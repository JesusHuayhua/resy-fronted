import React from 'react';
import './AgregarPlato.css'; // Importamos los estilos CSS

interface AdminButtonAgregarProps {
  disabled?: boolean;
  text?: string;
  setModalOpen: (modal: boolean) => void;
  modalOpen: boolean;
}

const AgregarPlato: React.FC<AdminButtonAgregarProps> = ({ 
  disabled = false, 
  text = "Añadir nuevo plato" ,
  setModalOpen,
  modalOpen
}) => {
  return (
    <button 
      className="admin-alimentos-history-agregar"
      onClick={() => setModalOpen(!modalOpen)}
      disabled={disabled}
      type="button"
    >
      {/* Contenedor del ícono */}
      <div className="admin-alimentos-history-agregar__icon">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          {/* Línea horizontal del símbolo + */}
          <line x1="12" y1="5" x2="12" y2="19"></line>
          {/* Línea vertical del símbolo + */}
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      
      {/* Texto del botón */}
      <span className="admin-alimentos-history-agregar__text">
        {text}
      </span>
    </button>
  );
};

export default AgregarPlato;
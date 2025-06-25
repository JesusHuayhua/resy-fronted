import React from "react";
import { useParams } from "react-router-dom";
import "./DetalleUsuarioPage.css";

const DetalleUsuarioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="detalle-usuario-container">
      <h1 className="detalle-usuario-title">Detalle de Usuario</h1>
      <div className="detalle-usuario-content">
        {/* Aquí se mostrarán los detalles del usuario con ID: {id} */}
        <div className="detalle-usuario-placeholder">
          Detalles del usuario (pendiente) - ID: {id}
        </div>
      </div>
    </div>
  );
};

export default DetalleUsuarioPage;

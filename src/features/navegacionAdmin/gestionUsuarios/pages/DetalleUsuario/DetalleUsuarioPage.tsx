import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetalleUsuarioPage.css";
import { FaArrowLeft, FaEdit, FaSave } from "react-icons/fa";

const AVATAR_URL = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const DetalleUsuarioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Aquí podrías obtener el usuario por ID cuando el API esté listo
  // Por ahora solo muestra la estructura vacía

  return (
    <div className="detalle-usuario-container">
      <div className="detalle-usuario-header-row">
        <button className="detalle-usuario-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1 className="detalle-usuario-title">GESTION DE USUARIOS</h1>
      </div>
      <div className="detalle-usuario-info-card">
        <div className="detalle-usuario-avatar-col">
          <img src={AVATAR_URL} alt="Avatar" className="detalle-usuario-avatar" />
        </div>
        <div className="detalle-usuario-info-col">
          <div className="detalle-usuario-info-header">
            <button className="detalle-usuario-edit-btn" title="Editar">
              <FaEdit />
            </button>
          </div>
          <div className="detalle-usuario-info-fields">
            <div className="detalle-usuario-info-row">
              <label>Nombres</label>
              <span>-</span>
            </div>
            <div className="detalle-usuario-info-row">
              <label>Apellidos</label>
              <span>-</span>
            </div>
            <div className="detalle-usuario-info-row">
              <label>Correo Electronico</label>
              <span>-</span>
            </div>
            <div className="detalle-usuario-info-row">
              <label>Rol</label>
              <span>-</span>
            </div>
            <div className="detalle-usuario-info-row">
              <label>Telefono</label>
              <span>-</span>
            </div>
            <div className="detalle-usuario-info-row">
              <label>Creado</label>
              <span>-</span>
            </div>
            <div className="detalle-usuario-info-row">
              <label>Estado</label>
              <span>-</span>
            </div>
            <div className="detalle-usuario-info-row">
              <label>Identificador</label>
              <span>{id || "-"}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Reservas */}
      <div className="detalle-usuario-reservas-section">
        <div className="detalle-usuario-reservas-header">
          <span className="detalle-usuario-reservas-title">Reservas</span>
          <select className="detalle-usuario-reservas-filtro" disabled>
            <option>TODOS</option>
          </select>
        </div>
        <div className="detalle-usuario-reservas-list">
          <div className="detalle-usuario-reservas-empty">
            No cuenta con reservas.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleUsuarioPage;

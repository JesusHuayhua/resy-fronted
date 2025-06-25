import React, { useState } from "react";
import "./ModalCrearUsuario.css";

interface ModalCrearUsuarioProps {
  open: boolean;
  onClose: () => void;
}

const ModalCrearUsuario: React.FC<ModalCrearUsuarioProps> = ({ open, onClose }) => {
  const [estado, setEstado] = useState(true);

  if (!open) return null;
  return (
    <div className="modal-crear-usuario-overlay">
      <div className="modal-crear-usuario-content">
        <button className="modal-crear-usuario-close" onClick={onClose}>×</button>
        <h2 className="modal-crear-usuario-title">Crear usuario</h2>
        <form className="modal-crear-usuario-form">
          <div className="modal-crear-usuario-form-group">
            <label>Nombres</label>
            <input type="text" placeholder="" />
          </div>
          <div className="modal-crear-usuario-form-group">
            <label>Apellidos</label>
            <input type="text" placeholder="" />
          </div>
          <div className="modal-crear-usuario-form-group">
            <label>Correo electronico</label>
            <input type="email" placeholder="" />
          </div>
          <div className="modal-crear-usuario-form-group">
            <label>Fecha de nacimiento</label>
            <input type="date" placeholder="" />
          </div>
          <div className="modal-crear-usuario-form-group">
            <label>Contraseña temporal</label>
            <input type="text" placeholder="" />
          </div>
          <div className="modal-crear-usuario-form-group">
            <label>Rol</label>
            <select>
              <option value="">Seleccione</option>
              <option value="Cajero">Cajero</option>
              <option value="Cliente">Cliente</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="modal-crear-usuario-form-group modal-crear-usuario-estado-row">
            <label>Estado</label>
            <div
              className="modal-crear-usuario-switch"
              onClick={e => {
                if ((e.target as HTMLElement).classList.contains('modal-crear-usuario-slider')) {
                  setEstado(est => !est);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={estado}
                readOnly
                tabIndex={-1}
                style={{ pointerEvents: "none" }}
              />
              <span className="modal-crear-usuario-slider"></span>
            </div>
            <span className="modal-crear-usuario-estado-label">{estado ? "Activo" : "Inactivo"}</span>
          </div>
          <button type="button" className="modal-crear-usuario-confirmar-btn">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearUsuario;

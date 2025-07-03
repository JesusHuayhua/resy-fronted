import React, { useState } from "react";
import "./ModalCrearUsuario.css";
import type { Rol } from "../../services/clases/classRol";
import { registerUsuario } from "../../services/registerUsuarioService";

interface ModalCrearUsuarioProps {
  open: boolean;
  onClose: () => void;
  roles?: Rol[];
  onUsuarioCreado?: () => void;
}

const ModalCrearUsuario: React.FC<ModalCrearUsuarioProps> = ({
  open,
  onClose,
  roles = [],
  onUsuarioCreado,
}) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "", // Añadido
    fechaNacimiento: "",
    contrasenaTemporal: "",
    rol: "",
    estado: true,
  });

  const [errors, setErrors] = useState({
    nombres: false,
    apellidos: false,
    correo: false,
    correoFormato: false,
    telefono: false, // Añadido
    fechaNacimiento: false,
    contrasenaTemporal: false,
    rol: false,
  });

  const [success, setSuccess] = useState(false);
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const validate = () => {
    const nombresValid = /^[a-zA-Z\s]+$/.test(formData.nombres);
    const apellidosValid = /^[a-zA-Z\s]+$/.test(formData.apellidos);
    const correoFormatoValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo);
    const telefonoValid = /^[0-9]{9}$/.test(formData.telefono); // Validación de 9 dígitos
    const fechaNacimientoValid = formData.fechaNacimiento.trim() !== "" && new Date(formData.fechaNacimiento) < new Date();
    const contrasenaTemporalValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.contrasenaTemporal);
    const rolValid = !!formData.rol;

    setErrors({
      nombres: !nombresValid,
      apellidos: !apellidosValid,
      correo: !formData.correo,
      correoFormato: !correoFormatoValid,
      telefono: !telefonoValid,
      fechaNacimiento: !fechaNacimientoValid,
      contrasenaTemporal: !contrasenaTemporalValid,
      rol: !rolValid,
    });

    return (
      nombresValid &&
      apellidosValid &&
      formData.correo &&
      correoFormatoValid &&
      telefonoValid &&
      fechaNacimientoValid &&
      contrasenaTemporalValid &&
      rolValid
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorApi(null);
    setSuccess(false);
    if (!validate()) return;

    // Buscar el ID del rol seleccionado
    const rolObj = roles.find(r => r.getNombre() === formData.rol);
    const rolId = rolObj ? rolObj.getId() : 2;

    try {
      const payload = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.correo,
        telefono: formData.telefono, // Añadido
        fechanacimiento: formData.fechaNacimiento,
        contrasenia: formData.contrasenaTemporal,
        rol: rolId,
        estadoacceso: formData.estado,
        direccion: "",
      };
      const response = await registerUsuario(payload);
      if (response.status === 1) {
        setSuccess(true);
        setFormData({
          nombres: "",
          apellidos: "",
          correo: "",
          telefono: "",
          fechaNacimiento: "",
          contrasenaTemporal: "",
          rol: "",
          estado: true,
        });
        // Espera 1.2s, luego cierra modal y actualiza tabla
        setTimeout(() => {
          setSuccess(false);
          onClose();
          if (onUsuarioCreado) onUsuarioCreado();
        }, 1200);
      } else {
        setErrorApi("Error en el registro. Intenta nuevamente.");
      }
    } catch (error) {
      setErrorApi("Error en el registro. Intenta nuevamente.");
    }
  };

  const handleTryClose = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setShowConfirmClose(true);
  };

  const handleCancelClose = () => {
    setShowConfirmClose(false);
  };

  const handleConfirmClose = () => {
    setShowConfirmClose(false);
    setFormData({
      nombres: "",
      apellidos: "",
      correo: "",
      telefono: "",
      fechaNacimiento: "",
      contrasenaTemporal: "",
      rol: "",
      estado: true,
    });
    setErrors({
      nombres: false,
      apellidos: false,
      correo: false,
      correoFormato: false,
      telefono: false,
      fechaNacimiento: false,
      contrasenaTemporal: false,
      rol: false,
    });
    setSuccess(false);
    setErrorApi(null);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="modal-crear-usuario-overlay">
      <div className="modal-crear-usuario-content">
        <button className="modal-crear-usuario-close" onClick={handleTryClose}>×</button>
        <h2 className="modal-crear-usuario-title">Crear usuario</h2>
        <form className="modal-crear-usuario-form" onSubmit={handleSubmit}>
          <div className="modal-crear-usuario-form-group">
            <label>Nombres</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          {errors.nombres && (
            <p className="error-message">Ingrese nombres válidos (solo letras)</p>
          )}
          <div className="modal-crear-usuario-form-group">
            <label>Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          {errors.apellidos && (
            <p className="error-message">Ingrese apellidos válidos (solo letras)</p>
          )}
          <div className="modal-crear-usuario-form-group">
            <label>Correo electronico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          {errors.correo && (
            <p className="error-message">Ingrese un correo</p>
          )}
          {errors.correoFormato && (
            <p className="error-message">Ingrese un correo válido</p>
          )}
          <div className="modal-crear-usuario-form-group">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          {errors.telefono && (
            <p className="error-message">Ingrese un número de teléfono válido (9 dígitos)</p>
          )}
          <div className="modal-crear-usuario-form-group">
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          {errors.fechaNacimiento && (
            <p className="error-message">Ingrese una fecha de nacimiento válida</p>
          )}
          <div className="modal-crear-usuario-form-group">
            <label>Contraseña temporal</label>
            <input
              type="password"
              name="contrasenaTemporal"
              value={formData.contrasenaTemporal}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          {errors.contrasenaTemporal && (
            <p className="error-message">La contraseña debe tener mínimo 8 caracteres</p>
          )}
          <div className="modal-crear-usuario-form-group">
            <label>Rol</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              {roles
                .filter(r => r.getId() === 1 || r.getId() === 2)
                .map(r => (
                  <option key={r.getId()} value={r.getNombre()}>{r.getNombre()}</option>
                ))}
            </select>
          </div>
          {errors.rol && (
            <p className="error-message">Seleccione un rol</p>
          )}
          <div className="modal-crear-usuario-form-group modal-crear-usuario-estado-row">
            <label>Estado</label>
            <div
              className="modal-crear-usuario-switch"
              onClick={e => {
                if ((e.target as HTMLElement).classList.contains('modal-crear-usuario-slider')) {
                  setFormData(f => ({ ...f, estado: !f.estado }));
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={formData.estado}
                readOnly
                tabIndex={-1}
                style={{ pointerEvents: "none" }}
              />
              <span className="modal-crear-usuario-slider"></span>
            </div>
            <span className="modal-crear-usuario-estado-label">{formData.estado ? "Activo" : "Inactivo"}</span>
          </div>
          <button type="submit" className="modal-crear-usuario-confirmar-btn">
            Confirmar
          </button>
          {success && (
            <div className="success-message" style={{ color: "green", marginTop: 8 }}>
              Usuario creado correctamente
            </div>
          )}
          {errorApi && (
            <div className="error-message" style={{ color: "red", marginTop: 8 }}>
              {errorApi}
            </div>
          )}
        </form>
        {showConfirmClose && (
          <div className="modal-crear-usuario-overlay" style={{ zIndex: 2000 }}>
            <div className="modal-crear-usuario-content" style={{ maxWidth: 340, textAlign: "center" }}>
              <h3 style={{ marginBottom: 16 }}>¿Estás seguro que deseas cerrar?</h3>
              <p style={{ marginBottom: 24, color: "#888" }}>Se perderán los datos ingresados en el formulario.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button
                  type="button"
                  style={{
                    background: "#e0e0e0",
                    color: "#333",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 22px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                  onClick={handleCancelClose}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  style={{
                    background: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 22px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                  onClick={handleConfirmClose}
                >
                  Sí, cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCrearUsuario;

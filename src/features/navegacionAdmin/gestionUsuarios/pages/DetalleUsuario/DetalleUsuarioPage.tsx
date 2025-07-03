import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetalleUsuarioPage.css";
import { FaArrowLeft, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { Usuario } from "../../services/clases/classUsuario";
import axios from "axios";
import { modificarUsuario } from "../../services/modificarUsuarioService";
import TarjetaReservaUsuario from "../../components/TarjetaReservaUsuario";
import { obtenerReservasPorUsuario } from "../../services/obtenerReservasPorUsuario";
import type { Reserva } from "../../../gestionReservas/services/clases/classReserva";

const AVATAR_URL = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const estadosReserva = ["TODOS", "Pendiente", "Completado", "Cancelada"];

const DetalleUsuarioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Telefono: "",
    Direccion: "",
    FechaNacimiento: "",
    Rol: 3,
    EstadoAcceso: true,
  });
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtroReserva, setFiltroReserva] = useState("TODOS");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`http://localhost:8080/usuarios?id_usuario=${id}`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const u = res.data[0];
          setUsuario(new Usuario(u.IdUsuario, u.DataUsuario));
          setForm({ ...u.DataUsuario });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    obtenerReservasPorUsuario(id).then(setReservas);
  }, [id]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    if (usuario) setForm({ ...usuario.DataUsuario });
    setEditMode(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };
  const handleSave = async () => {
    if (!usuario) return;
    try {
      // Formatea la fecha a yyyy-mm-dd
      const fecha = form.FechaNacimiento
        ? (() => {
            const d = new Date(form.FechaNacimiento);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          })()
        : "";

      const payload = {
        id: usuario.IdUsuario,
        nombres: form.Nombres,
        apellidos: form.Apellidos,
        correo: form.Correo,
        telefono: form.Telefono,
        direccion: form.Direccion,
        fechanacimiento: fecha,
        contrasenia: usuario.DataUsuario.Contrasenia,
        rol: Number(form.Rol),
        estadoacceso: Boolean(form.EstadoAcceso),
      };

      console.log("JSON enviado al backend:", JSON.stringify(payload, null, 2));
      const response = await modificarUsuario(payload);
      if (response.status === 1) {
        setUsuario(
          new Usuario(usuario.IdUsuario, {
            ...usuario.DataUsuario,
            Nombres: form.Nombres,
            Apellidos: form.Apellidos,
            Correo: form.Correo,
            Telefono: form.Telefono,
            Direccion: form.Direccion,
            FechaNacimiento: form.FechaNacimiento,
            Rol: Number(form.Rol),
            EstadoAcceso: Boolean(form.EstadoAcceso),
            Contrasenia: usuario.DataUsuario.Contrasenia,
          })
        );
        setEditMode(false);
      } else {
        alert("No se pudo actualizar el usuario.");
      }
    } catch (error) {
      alert("Error al actualizar el usuario.");
    }
  };

  const reservasFiltradas = reservas.filter(
    r => filtroReserva === "TODOS" || r.getEstadoReserva().toLowerCase() === filtroReserva.toLowerCase()
  );

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
            {!editMode ? (
              <button className="detalle-usuario-edit-btn" title="Editar" onClick={handleEdit}>
                <FaEdit />
              </button>
            ) : (
              <>
                <button className="detalle-usuario-save-btn" title="Guardar" onClick={handleSave}>
                  <FaSave />
                </button>
                <button className="detalle-usuario-cancel-btn" title="Cancelar" onClick={handleCancel}>
                  <FaTimes />
                </button>
              </>
            )}
          </div>
          <div className="detalle-usuario-info-fields">
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Nombres</b></label>
              {editMode ? (
                <input
                  name="Nombres"
                  value={form.Nombres}
                  onChange={handleChange}
                  className="detalle-usuario-input"
                />
              ) : (
                <span className="detalle-usuario-input detalle-usuario-input-readonly">{loading ? "-" : usuario?.DataUsuario.Nombres || "-"}</span>
              )}
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Apellidos</b></label>
              {editMode ? (
                <input
                  name="Apellidos"
                  value={form.Apellidos}
                  onChange={handleChange}
                  className="detalle-usuario-input"
                />
              ) : (
                <span className="detalle-usuario-input detalle-usuario-input-readonly">{loading ? "-" : usuario?.DataUsuario.Apellidos || "-"}</span>
              )}
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Correo Electronico</b></label>
              {editMode ? (
                <input
                  name="Correo"
                  value={form.Correo}
                  onChange={handleChange}
                  className="detalle-usuario-input"
                />
              ) : (
                <span className="detalle-usuario-input detalle-usuario-input-readonly">{loading ? "-" : usuario?.DataUsuario.Correo || "-"}</span>
              )}
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Rol</b></label>
              {editMode && usuario?.DataUsuario.Rol !== 3 ? (
                <select
                  name="Rol"
                  value={form.Rol}
                  onChange={handleChange}
                  className="detalle-usuario-input"
                >
                  <option value={1}>Admin</option>
                  <option value={2}>Cajero</option>
                </select>
              ) : (
                <span className="detalle-usuario-input detalle-usuario-input-readonly">{loading ? "-" : usuario?.getRol() || "-"}</span>
              )}
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Telefono</b></label>
              {editMode ? (
                <input
                  name="Telefono"
                  value={form.Telefono}
                  onChange={handleChange}
                  className="detalle-usuario-input"
                />
              ) : (
                <span className="detalle-usuario-input detalle-usuario-input-readonly">{loading ? "-" : usuario?.DataUsuario.Telefono || "-"}</span>
              )}
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Dirección</b></label>
              {editMode ? (
                <input
                  name="Direccion"
                  value={form.Direccion}
                  onChange={handleChange}
                  className="detalle-usuario-input"
                />
              ) : (
                <span className="detalle-usuario-input detalle-usuario-input-readonly">{loading ? "-" : usuario?.DataUsuario.Direccion || "-"}</span>
              )}
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Fecha Nacimiento</b></label>
              {editMode ? (
                <input
                  name="FechaNacimiento"
                  type="date"
                  value={form.FechaNacimiento ? form.FechaNacimiento.slice(0, 10) : ""}
                  onChange={handleChange}
                  className="detalle-usuario-input"
                />
              ) : (
                <span className="detalle-usuario-input detalle-usuario-input-readonly">
                  {loading
                    ? "-"
                    : usuario?.DataUsuario.FechaNacimiento
                      ? new Date(usuario.DataUsuario.FechaNacimiento).toLocaleDateString()
                      : "-"}
                </span>
              )}
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Estado</b></label>
              {editMode ? (
                <div className="modal-crear-usuario-switch" style={{ marginLeft: 0 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 12, margin: 0, position: "relative" }}>
                    <input
                      type="checkbox"
                      id="estado"
                      name="EstadoAcceso"
                      checked={form.EstadoAcceso}
                      onChange={handleChange}
                      className="modal-crear-usuario-checkbox"
                    />
                    <span className="modal-crear-usuario-slider"></span>
                    <span className="modal-crear-usuario-estado-label">
                      {form.EstadoAcceso ? "Activo" : "Inactivo"}
                    </span>
                  </label>
                </div>
              ) : (
                <span className="detalle-usuario-input detalle-usuario-input-readonly">
                  {loading ? "-" : usuario?.getEstado() || "-"}
                </span>
              )}
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Creado</b></label>
              <span className="detalle-usuario-input detalle-usuario-input-readonly">-</span>
            </div>
            <div className="detalle-usuario-info-row">
              <label className="detalle-usuario-label"><b>Identificador</b></label>
              <span className="detalle-usuario-input detalle-usuario-input-readonly">{id || "-"}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Reservas */}
      <div className="detalle-usuario-reservas-section">
        <div className="detalle-usuario-reservas-header">
          <span className="detalle-usuario-reservas-title">Reservas</span>
          <select
            className="detalle-usuario-reservas-filtro"
            value={filtroReserva}
            onChange={e => setFiltroReserva(e.target.value)}
          >
            {estadosReserva.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="detalle-usuario-reservas-list">
          {reservasFiltradas.length === 0 ? (
            <div className="detalle-usuario-reservas-empty">
              No cuenta con reservas.
            </div>
          ) : (
            reservasFiltradas.map(r => (
              <TarjetaReservaUsuario key={r.getId()} reserva={r} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};



export default DetalleUsuarioPage;

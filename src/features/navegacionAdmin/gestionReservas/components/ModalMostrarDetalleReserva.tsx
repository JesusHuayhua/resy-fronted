import React, { useEffect, useState } from "react";
import { obtenerReservas } from "../services/obtenerReservas";
import { Reserva } from "../services/clases/classReserva";
import { obtenerUsuarios } from "../../gestionUsuarios/services/obtenerUsuarios";
import { Usuario } from "../../gestionUsuarios/services/clases/classUsuario";
import axios from "axios"; // Agregado para actualizar estado

interface ModalMostrarDetalleReservaProps {
  idReserva: string;
  onClose: () => void;
  onChange?: () => void; // Nueva prop opcional
}

const ModalMostrarDetalleReserva: React.FC<ModalMostrarDetalleReservaProps> = ({ idReserva, onClose, onChange }) => {
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerReservas().then(reservas => {
      const found = reservas.find(r => r.getId() === idReserva);
      setReserva(found || null);

      // Si hay IDCliente válido, buscar usuario
      if (found && found.DataReserva.IDCliente?.Valid && found.DataReserva.IDCliente.Int64) {
        obtenerUsuarios().then(usuarios => {
          const user = usuarios.find(u => u.IdUsuario === found.DataReserva.IDCliente.Int64);
          setUsuario(user || null);
        });
      } else {
        setUsuario(null);
      }
    });
  }, [idReserva]);

  const formatFecha = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  // Utilidades para mostrar datos, priorizando los de la reserva, si no existen, los del usuario
  const getNombreCliente = () => {
    if (!reserva) return "";
    const nombreReserva = reserva.getNombreCliente();
    if (nombreReserva && nombreReserva !== "Nombre no disponible") return nombreReserva;
    if (usuario) return usuario.getNombreCompleto();
    return "";
  };
  const getTelefonoCliente = () => {
    if (!reserva) return "";
    const telReserva = reserva.getTelefonoCliente();
    if (telReserva && telReserva !== "Teléfono no disponible") return telReserva;
    if (usuario) return usuario.DataUsuario.Telefono || "";
    return "";
  };
  const getCorreoCliente = () => {
    if (!reserva) return "";
    const correoReserva = reserva.getCorreoCliente();
    if (correoReserva && correoReserva !== "Correo no disponible") return correoReserva;
    if (usuario) return usuario.getCorreo();
    return "";
  };

  // Cambiar estado de la reserva
  const actualizarEstadoReserva = async (nuevoEstado: string) => {
    if (!reserva) return;
    setLoading(true);
    try {
      // Construir el body según la estructura esperada por el backend
      const data = {
        id_cliente: reserva.DataReserva.IDCliente?.Valid ? reserva.DataReserva.IDCliente.Int64 : null,
        nombre_cliente: reserva.DataReserva.NombreCliente?.Valid ? reserva.DataReserva.NombreCliente.String : null,
        telefono_cliente: reserva.DataReserva.TelefonoCliente?.Valid ? reserva.DataReserva.TelefonoCliente.String : null,
        correo_cliente: reserva.DataReserva.CorreoCliente?.Valid ? reserva.DataReserva.CorreoCliente.String : null,
        fecha_reservada: reserva.DataReserva.FechaReservada,
        num_personas: reserva.DataReserva.NumPersonas,
        estado_reserva: nuevoEstado,
        especificaciones: reserva.DataReserva.Especificaciones ?? ""
      };
      await axios.put(
        `http://localhost:8082/reservas?id=${reserva.getId()}`,
        data
      );
      setReserva(r => {
        if (!r) return r;
        return new Reserva(r.IDReserva, { ...r.DataReserva, EstadoReserva: nuevoEstado });
      });
      if (onChange) onChange(); // Notifica al padre para recargar
      onClose();
    } catch (e) {
      alert("No se pudo actualizar el estado de la reserva.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 0,
        border: "2px solid #2196f3",
        padding: "32px 24px",
        minWidth: 550,
        minHeight: 180,
        position: "relative",
        boxShadow: "0 4px 24px #0002",
        textAlign: "left"
      }}>
        <button
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            fontSize: 22,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#888"
          }}
          onClick={onClose}
        >×</button>
        <h2
          style={{
            marginBottom: 18,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.45rem"
          }}
        >
          RESERVA ID: <span style={{ fontWeight: "bold" }}>{idReserva}</span>
        </h2>
        {!reserva ? (
          <div style={{ textAlign: "center", margin: "32px 0" }}>Cargando...</div>
        ) : (
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", marginBottom: 8 }}>
              <div style={{ width: 200, fontWeight: 600 }}>Nombre Cliente:</div>
              <div style={{ flex: 1 }}>{getNombreCliente()}</div>
            </div>
            <div style={{ display: "flex", marginBottom: 8 }}>
              <div style={{ width: 200, fontWeight: 600 }}>Teléfono Cliente:</div>
              <div style={{ flex: 1 }}>{getTelefonoCliente()}</div>
            </div>
            <div style={{ display: "flex", marginBottom: 8 }}>
              <div style={{ width: 200, fontWeight: 600 }}>Correo Cliente:</div>
              <div style={{ flex: 1 }}>{getCorreoCliente()}</div>
            </div>
            <div style={{ display: "flex", marginBottom: 8 }}>
              <div style={{ width: 200, fontWeight: 600 }}>Fecha:</div>
              <div style={{ flex: 1 }}>{formatFecha(reserva.getFechaReservada())}</div>
            </div>
            <div style={{ display: "flex", marginBottom: 8 }}>
              <div style={{ width: 200, fontWeight: 600 }}>Hora:</div>
              <div style={{ flex: 1 }}>
                {(() => {
                  const fecha = reserva.getFechaReservada();
                  if (!fecha) return "";
                  const d = new Date(fecha);
                  // Hora de inicio
                  let h = d.getHours();
                  let m = d.getMinutes();
                  // Hora de fin (30 minutos después)
                  let endH = h;
                  let endM = m + 30;
                  if (endM >= 60) {
                    endH += 1;
                    endM -= 60;
                  }
                  // Formato AM/PM
                  const formatAMPM = (hour: number, min: number) => {
                    const ampm = hour >= 12 ? "PM" : "AM";
                    let displayHour = hour % 12;
                    if (displayHour === 0) displayHour = 12;
                    return `${displayHour}:${min.toString().padStart(2, "0")} ${ampm}`;
                  };
                  return `${formatAMPM(h, m)} - ${formatAMPM(endH, endM)}`;
                })()}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <div style={{ width: 200, fontWeight: 600, whiteSpace: "nowrap" }}>Número de Personas:</div>
              <div style={{ flex: 1, whiteSpace: "nowrap" }}>{reserva.getNumPersonas() || ""}</div>
            </div>
            <div style={{ display: "flex", marginBottom: 8 }}>
              <div style={{ width: 200, fontWeight: 600 }}>Nota Adicional:</div>
              <div style={{ flex: 1 }}>{reserva.getEspecificaciones() || ""}</div>
            </div>
            <div style={{ display: "flex", marginBottom: 8 }}>
              <div style={{ width: 200, fontWeight: 600 }}>Estado Reserva:</div>
              <div style={{ flex: 1 }}>{reserva.getEstadoReserva() || ""}</div>
            </div>
          </div>
        )}
        {/* Solo mostrar botones si la reserva NO está confirmada ni cancelada */}
        {reserva && reserva.getEstadoReserva() !== "Confirmada" && reserva.getEstadoReserva() !== "Cancelada" && (
          <div style={{ display: "flex", justifyContent: "center", gap: 18 }}>
            <button
              style={{
                background: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 28px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1
              }}
              disabled={loading}
              onClick={() => actualizarEstadoReserva("Confirmada")}
            >
              Confirmar
            </button>
            <button
              style={{
                background: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 28px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1
              }}
              disabled={loading}
              onClick={() => actualizarEstadoReserva("Cancelada")}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalMostrarDetalleReserva;

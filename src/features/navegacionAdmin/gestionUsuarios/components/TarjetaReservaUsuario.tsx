import React from "react";
import { Reserva } from "../../gestionReservas/services/clases/classReserva";
import "./TarjetaReservaUsuario.css";

interface Props {
  reserva: Reserva;
}

const estadoColor = (estado: string) => {
  switch (estado.toLowerCase()) {
    case "pendiente":
      return "#e0e0e0";
    case "completado":
      return "#4caf50";
    case "cancelada":
      return "#f44336";
    default:
      return "#bdbdbd";
  }
};

function getHoraRango(fechaIso: string) {
  if (!fechaIso) return "";
  const d = new Date(fechaIso);
  let h = d.getHours();
  let m = d.getMinutes();
  let endH = h;
  let endM = m + 30;
  if (endM >= 60) {
    endH += 1;
    endM -= 60;
  }
  const format = (hour: number, min: number) => {
    return `${hour.toString().padStart(2, "0")}h${min.toString().padStart(2, "0")}`;
  };
  return `${format(h, m)} - ${format(endH, endM)}`;
}

const TarjetaReservaUsuario: React.FC<Props> = ({ reserva }) => {
  const fecha = new Date(reserva.getFechaReservada());
  const fechaStr = fecha.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="tarjeta-reserva-usuario">
      <div className="tarjeta-reserva-usuario-grid">
        {/* Esquina superior izquierda: ID */}
        <div className="tarjeta-reserva-usuario-id">
          <b>ID: {reserva.getId()}</b>
        </div>
        {/* Esquina superior derecha: Hora */}
        <div className="tarjeta-reserva-usuario-hora">
          {getHoraRango(reserva.getFechaReservada())}
        </div>
        {/* Debajo del ID: Fecha */}
        <div className="tarjeta-reserva-usuario-fecha">{fechaStr}</div>
        {/* Debajo de la hora: Personas */}
        <div className="tarjeta-reserva-usuario-personas">
          {reserva.getNumPersonas()} Personas
        </div>
        {/* Esquina inferior izquierda: Especificaciones */}
        <div className="tarjeta-reserva-usuario-especificaciones">
          {reserva.getEspecificaciones()}
        </div>
        {/* Esquina inferior derecha: Estado */}
        <div
          className="tarjeta-reserva-usuario-estado"
          style={{
            background: estadoColor(reserva.getEstadoReserva()),
            color:
              reserva.getEstadoReserva().toLowerCase() === "pendiente"
                ? "#333"
                : "#fff",
          }}
        >
          {reserva.getEstadoReserva().toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default TarjetaReservaUsuario;

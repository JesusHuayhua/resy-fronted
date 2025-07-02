import React, { useState, useEffect } from "react";
import "./CalendarioReservas.css";
import { obtenerReservas } from "../services/obtenerReservas";
import { Reserva } from "../services/clases/classReserva";
// Importa el modal
import ModalMostrarDetalleReserva from "../components/ModalMostrarDetalleReserva";
import { obtenerUsuarios } from "../../gestionUsuarios/services/obtenerUsuarios";
import { Usuario } from "../../gestionUsuarios/services/clases/classUsuario";

const getTimeSlots = (start: string, end: string, interval: number) => {
  const slots: string[] = [];
  let [hour, minute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    const startHour = hour;
    const startMinute = minute;
    minute += interval;
    let endSlotHour = hour;
    let endSlotMinute = minute;
    if (endSlotMinute >= 60) {
      endSlotHour += 1;
      endSlotMinute -= 60;
    }
    const format = (h: number, m: number) => {
      const ampm = h < 12 ? "AM" : "PM";
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      const displayMinute = m.toString().padStart(2, "0");
      return `${displayHour}:${displayMinute} ${ampm}`;
    };
    slots.push(
      `${format(startHour, startMinute)} - ${format(endSlotHour, endSlotMinute)}`
    );
    hour = endSlotHour;
    minute = endSlotMinute;
  }
  return slots;
};

const ALL_SLOTS = getTimeSlots("9:00", "17:00", 30); // hasta las 5:00 pm

const VISIBLE_COLUMNS = 6;
const FILAS = 5;

const CalendarioReservas: React.FC = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [fecha, setFecha] = useState<string>(() => {
    const hoy = new Date();
    return hoy.toISOString().slice(0, 10);
  });
  const [modalReservaId, setModalReservaId] = useState<string | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Cargar reservas cada vez que cambia la fecha
  useEffect(() => {
    setLoading(true);
    obtenerReservas()
      .then(setReservas)
      .finally(() => setLoading(false));
  }, [fecha]);

  // Cargar usuarios una sola vez al montar
  useEffect(() => {
    obtenerUsuarios().then(setUsuarios);
  }, []);

  // Filtrar reservas por la fecha seleccionada (solo día, no hora)
  const reservasFiltradas = reservas.filter(reserva => {
    const fechaReserva = new Date(reserva.getFechaReservada());
    const yyyy = fechaReserva.getFullYear();
    const mm = String(fechaReserva.getMonth() + 1).padStart(2, "0");
    const dd = String(fechaReserva.getDate()).padStart(2, "0");
    const fechaReservaStr = `${yyyy}-${mm}-${dd}`;
    return fechaReservaStr === fecha;
  });

  // Organizar reservas por celda [fila][columna]
  const reservasPorCelda: Reserva[][][] = Array.from({ length: FILAS }, () =>
    Array.from({ length: VISIBLE_COLUMNS }, () => [])
  );

  // Mapear reservas por slot de tiempo (columna) para distribución
  const reservasPorSlot: { [key: number]: Reserva[] } = {};

  reservasFiltradas.forEach((reserva: Reserva) => {
    const fecha = new Date(reserva.getFechaReservada());
    const hora = fecha.getHours();
    const minuto = fecha.getMinutes();

    // Buscar el slot correspondiente
    const slotIdx = ALL_SLOTS.findIndex(slot => {
      const [start] = slot.split(" - ");
      const [timeStr, ampm] = start.split(" ");
      const [h, m] = timeStr.split(":");
      let hNum = parseInt(h);
      const mNum = parseInt(m);

      // Convertir a formato 24 horas
      if (ampm === "PM" && hNum !== 12) {
        hNum += 12;
      } else if (ampm === "AM" && hNum === 12) {
        hNum = 0;
      }

      return hNum === hora && mNum === minuto;
    });

    if (slotIdx !== -1) {
      if (!reservasPorSlot[slotIdx]) {
        reservasPorSlot[slotIdx] = [];
      }
      reservasPorSlot[slotIdx].push(reserva);
    }
  });

  // Distribuir reservas en las celdas visibles
  Object.keys(reservasPorSlot).forEach(slotIdxStr => {
    const slotIdx = parseInt(slotIdxStr);
    const reservasEnSlot = reservasPorSlot[slotIdx];

    // Solo procesar slots visibles
    if (slotIdx >= startIdx && slotIdx < startIdx + VISIBLE_COLUMNS) {
      const columnaVisible = slotIdx - startIdx;

      // Distribuir reservas en diferentes filas
      reservasEnSlot.forEach((reserva, index) => {
        const fila = index % FILAS;
        reservasPorCelda[fila][columnaVisible].push(reserva);
      });
    }
  });

  const canScrollRight = startIdx + VISIBLE_COLUMNS < ALL_SLOTS.length;
  const canScrollLeft = startIdx > 0;
  const visibleSlots = ALL_SLOTS.slice(startIdx, startIdx + VISIBLE_COLUMNS);

  const handleRight = () => {
    if (canScrollRight) setStartIdx(startIdx + 1);
  };

  const handleLeft = () => {
    if (canScrollLeft) setStartIdx(startIdx - 1);
  };

  return (
    <div className="calendarioReservas-container">
      <h1 className="calendarioReservas-title">CALENDARIO DE RESERVAS</h1>
      {/* Selector de fecha con formato y estilo */}
{/* Selector de fecha con formato y estilo */}
      <div
        style={{
          marginBottom: 18,
          textAlign: "left",
          background: "#f3f3f3",
          borderRadius: 10,
          padding: "14px 22px",
          display: "inline-flex",
          alignItems: "center",
          fontWeight: 500,
          fontSize: "1.1rem",
          boxShadow: "0 2px 8px #0001",
          position: "relative"
        }}
      >
        <span style={{ marginRight: 8 }}>
          {(() => {
            const dias = [
              "Domingo",
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado"
            ];
            // Usar la fecha seleccionada, no la de hoy
            const [yyyy, mm, dd] = fecha.split("-");
            const f = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
            const diaSemana = dias[f.getDay()];
            return `${diaSemana} ${dd}/${mm}`;
          })()}
        </span>
        <div style={{ position: "relative", display: "inline-block" }}>
          <span 
            style={{
              fontSize: "1.2rem",
              cursor: "pointer",
              color: "#666",
              userSelect: "none",
              padding: "2px 4px"
            }}
            onClick={() => document.getElementById('date-picker')?.click()}
          >
            📅
          </span>
          <input
            id="date-picker"
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer"
            }}
          />
        </div>
      </div>
      <div className="calendarioReservas-scroll-row">
        {canScrollLeft && (
          <button className="calendarioReservas-arrow calendarioReservas-arrow-plain" onClick={handleLeft}>
            &lt;
          </button>
        )}
        <div className="calendarioReservas-grid">
          {/* Fila de encabezados de slots */}
          <div className="calendarioReservas-row calendarioReservas-header-row">
            {visibleSlots.map((slot, idx) => (
              <div className="calendarioReservas-col" key={`header-${startIdx + idx}`}>
                <div className="calendarioReservas-slot-header">{slot}</div>
              </div>
            ))}
          </div>
          {/* 5 filas de contenido */}
          {[...Array(FILAS)].map((_, rowIdx) => (
            <div className="calendarioReservas-row" key={`row-${rowIdx}`}>
              {visibleSlots.map((_, colIdx) => (
                <div className="calendarioReservas-col" key={`cell-${rowIdx}-${colIdx}`}>
                  <div
                    className="calendarioReservas-slot-content"
                    style={{
                      background:
                        reservasPorCelda[rowIdx][colIdx].length > 0
                          ? (() => {
                              // Solo toma el color del primer estado de la celda
                              const res = reservasPorCelda[rowIdx][colIdx][0];
                              // @ts-ignore
                              const estado = res?.getEstadoReserva?.() || (res?.DataReserva?.EstadoReserva ?? "");
                              if (estado === "Confirmada") return "#b6f5b6";
                              if (estado === "Pendiente") return "#fff7b2";
                              if (estado === "Cancelada") return "#ffb2b2";
                              return "";
                            })()
                          : ""
                    }}
                  >
                    {loading
                      ? "Cargando..."
                      : reservasPorCelda[rowIdx][colIdx].length === 0
                        ? null
                        : reservasPorCelda[rowIdx][colIdx].map((res, i) => {
                            // Obtener nombre del cliente (si hay IDCliente, buscar en usuarios)
                            // @ts-ignore
                            const idCliente = res.DataReserva.IDCliente?.Valid ? res.DataReserva.IDCliente.Int64 : null;
                            // @ts-ignore
                            let nombreCliente = res.getNombreCliente();
                            if ((!nombreCliente || nombreCliente === "Nombre no disponible") && idCliente) {
                              const user = usuarios.find(u => u.IdUsuario === idCliente);
                              nombreCliente = user ? user.getNombreCompleto() : "";
                            }
                            // @ts-ignore
                            const numPersonas = res.getNumPersonas();
                            return (
                              <div
                                key={i}
                                style={{
                                  fontSize: "0.8em",
                                  marginBottom: 2,
                                  borderRadius: 4,
                                  padding: "2px 4px",
                                  background: "transparent",
                                  cursor: "pointer"
                                }}
                                onClick={() => setModalReservaId(res.getId())}
                              >
                                <div><b>ID Reserva:</b> {res.getId()}</div>
                                <div>
                                  <b>Cliente:</b> {nombreCliente}
                                </div>
                                <div><b>Personas:</b> {numPersonas}</div>
                              </div>
                            );
                          })
                    }
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button className="calendarioReservas-arrow calendarioReservas-arrow-plain" onClick={handleRight}>
            &gt;
          </button>
        )}
      </div>
      {/* Leyenda de estados */}
      <div style={{ marginTop: 24, display: "flex", gap: 24, justifyContent: "center", alignItems: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-block",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#fff7b2",
            border: "1px solid #e0c800"
          }}></span>
          <span>Pendiente</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-block",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#ffb2b2",
            border: "1px solid #e74c3c"
          }}></span>
          <span>Cancelada</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-block",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#b6f5b6",
            border: "1px solid #27ae60"
          }}></span>
          <span>Confirmada</span>
        </span>
      </div>
      {/* Modal para mostrar detalle de reserva */}
      {modalReservaId && (
        <ModalMostrarDetalleReserva
          idReserva={modalReservaId}
          onClose={() => setModalReservaId(null)}
        />
      )}
    </div>
  );
};

export default CalendarioReservas;
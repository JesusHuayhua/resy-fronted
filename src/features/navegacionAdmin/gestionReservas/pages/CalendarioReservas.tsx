import React, { useState, useEffect } from "react";
import "./CalendarioReservas.css";
import { obtenerReservas } from "../services/obtenerReservas";
import { Reserva } from "../services/clases/classReserva";

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

  // Obtener reservas al montar el componente
  useEffect(() => {
    setLoading(true);
    obtenerReservas()
      .then(setReservas)
      .finally(() => setLoading(false));
  }, []);

  // Organizar reservas por celda [fila][columna]
  const reservasPorCelda: Reserva[][][] = Array.from({ length: FILAS }, () =>
    Array.from({ length: VISIBLE_COLUMNS }, () => [])
  );

  // Mapear reservas por slot de tiempo (columna) para distribución
  const reservasPorSlot: { [key: number]: Reserva[] } = {};

  reservas.forEach((reserva: Reserva) => {
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
        const fila = index % FILAS; // Distribuir cíclicamente en las filas disponibles
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
                  <div className="calendarioReservas-slot-content">
                    {loading
                      ? "Cargando..."
                      : reservasPorCelda[rowIdx][colIdx].length === 0
                        ? null
                        : reservasPorCelda[rowIdx][colIdx].map((res, i) => {
                            // Obtener ID cliente y nombre
                            // @ts-ignore
                            const idCliente = res.DataReserva.IDCliente?.Valid ? res.DataReserva.IDCliente.Int64 : null;
                            // @ts-ignore
                            const nombreCliente = res.getNombreCliente();
                            // @ts-ignore
                            const numPersonas = res.getNumPersonas();
                            // @ts-ignore
                            const estado = res.getEstadoReserva?.() || (res.DataReserva?.EstadoReserva ?? "");
                            let bgColor = "";
                            if (estado === "Confirmada") bgColor = "#b6f5b6";
                            else if (estado === "Pendiente") bgColor = "#fff7b2";
                            else if (estado === "Cancelada") bgColor = "#ffb2b2";
                            return (
                              <div
                                key={i}
                                style={{
                                  fontSize: "0.8em",
                                  marginBottom: 2,
                                  background: bgColor,
                                  borderRadius: 4,
                                  padding: "2px 4px"
                                }}
                              >
                                <div><b>ID Reserva:</b> {res.getId()}</div>
                                <div>
                                  <b>Cliente:</b>{" "}
                                  {idCliente && idCliente !== 0
                                    ? idCliente
                                    : nombreCliente}
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
    </div>
  );
};

export default CalendarioReservas;
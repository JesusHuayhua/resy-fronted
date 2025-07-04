import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import isoWeek from "dayjs/plugin/isoWeek";
import { FaRegCalendarAlt } from "react-icons/fa";
import { obtenerMenu } from "../services/obtenerMenu";
import type { Menu } from "../services/clases/classMenu";
dayjs.extend(isoWeek);

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const GestionarCronograma: React.FC = () => {
  const navigate = useNavigate();
  const [semana, setSemana] = useState<Dayjs | null>(dayjs().startOf("week"));
  const [menus, setMenus] = useState<Menu[]>([]);
  const [idMenu, setIdMenu] = useState<string | null>(null);

  useEffect(() => {
    obtenerMenu().then(setMenus);
  }, []);

  useEffect(() => {
    if (!semana || menus.length === 0) {
      setIdMenu(null);
      return;
    }
    const lunes = semana.startOf("week").add(1, "day").startOf("day");
    const menuEncontrado = menus.find(menu => {
      const fechaInicio = dayjs(new Date(menu.getFechaInicio())).subtract(1, "day").startOf("day");
      return fechaInicio.isSame(lunes, "day");
    });
    setIdMenu(menuEncontrado ? menuEncontrado.getIdMenu() : null);
  }, [semana, menus]);

  const lunes = semana ? semana.startOf("week").add(1, "day") : null;
  const domingo = semana ? semana.startOf("week").add(7, "day") : null;
  const semanaLabel = lunes && domingo
    ? `Lunes ${lunes.format("DD/MM")} - Domingo ${domingo.format("DD/MM")}`
    : "";

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 0 }}>
        <button
          onClick={() => navigate("/admin/alimentos")}
          style={{
            background: "none",
            border: "none",
            color: "#15396A",
            fontSize: "2.2rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
            marginRight: 12
          }}
          title="Volver a gestionar platos"
        >
          {/* Flecha izquierda unicode */}
          <span style={{ fontSize: "2.2rem", fontWeight: 700 }}>&#8249;</span>
        </button>
        <h1 style={{ fontWeight: 700, fontSize: "2rem", color: "#15396A", letterSpacing: 1, margin: 0 }}>
          CRONOGRAMA
        </h1>
      </div>
      {/* Selector de semana: solo permite seleccionar el primer día de la semana */}
      <div style={{ margin: "24px 0 12px 0", maxWidth: 320 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <DatePicker
            label="Seleccionar semana"
            value={semana}
            onChange={newValue => setSemana(newValue ? newValue.startOf("week") : null)}
            views={["day"]}
            format="DD/MM/YYYY"
            shouldDisableDate={date => date.day() !== 1}
            slotProps={{
              textField: {
                size: "small",
                sx: { width: 220 },
                InputProps: {
                  readOnly: true,
                  style: { textTransform: "capitalize" }
                }
              }
            }}
          />
        </LocalizationProvider>
      </div>
      {idMenu && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "#f3f3f3",
            color: "#1976d2",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 700,
            fontSize: "1.08rem",
            marginBottom: 10,
            gap: 8,
            border: "1px solid #bcd"
          }}
        >
          <span style={{ fontWeight: 600 }}>ID MENÚ:</span> {idMenu}
        </div>
      )}
      {semana && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "#e0e0e0",
            color: "#555",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: "1.08rem",
            marginBottom: 18,
            gap: 8
          }}
        >
          <FaRegCalendarAlt style={{ fontSize: 18, color: "#555" }} />
          {(() => {
            const lunes = semana.startOf("week").add(1, "day");
            const domingo = semana.startOf("week").add(7, "day");
            return `Lunes ${lunes.format("DD/MM")} - Domingo ${domingo.format("DD/MM")}`;
          })()}
        </div>
      )}
      <div
        style={{
          marginTop: 16,
          overflowX: "auto",
          maxWidth: 1300,
        }}
      >
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: 0,
            width: "100%",
            background: "#fff",
            boxShadow: "0 2px 8px #0001",
            borderRadius: 12,
            overflow: "hidden",
            tableLayout: "fixed"
          }}
        >
          <thead>
            <tr>
              {diasSemana.map((dia, idx) => (
                <th
                  key={dia}
                  style={{
                    background: "#f5f7fa",
                    color: "#222",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    padding: "16px 0",
                    borderBottom: "2px solid #e0e0e0",
                    textAlign: "center",
                    borderTopLeftRadius: idx === 0 ? 12 : 0,
                    borderTopRightRadius: idx === diasSemana.length - 1 ? 12 : 0,
                  }}
                >
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(7)].map((_, fila) => (
              <tr key={fila}>
                {diasSemana.map((_, col) => (
                  <td
                    key={col}
                    style={{
                      minHeight: 60,
                      height: 60,
                      border: "1px solid #f0f0f0",
                      borderLeft: col === 0 ? "none" : undefined,
                      borderRight: col === diasSemana.length - 1 ? "none" : undefined,
                      borderBottom: fila === 6 ? "none" : undefined,
                      background: "#fff",
                      textAlign: "center",
                      padding: 0,
                    }}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionarCronograma;

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
import { obtenerMenuCompleto } from "../services/obtenerMenuCompleto";
import { obtenerPlatos } from "../services/obtenerPlato";
import type { Menu } from "../services/clases/classMenu";
import type { MenuCompleto } from "../services/clases/classMenuCompleto";
import type { DiaMenu } from "../services/clases/classDiaMenu";
import type { ArrPlato } from "../services/clases/classArregloPlato";
import type { Plato } from "../services/clases/ClassPlato";
dayjs.extend(isoWeek);

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const GestionarCronograma: React.FC = () => {
  const navigate = useNavigate();
  const [semana, setSemana] = useState<Dayjs | null>(dayjs().startOf("week"));
  const [menus, setMenus] = useState<Menu[]>([]);
  const [idMenu, setIdMenu] = useState<string | null>(null);
  const [menuCompleto, setMenuCompleto] = useState<MenuCompleto | null>(null);
  const [platos, setPlatos] = useState<Plato[]>([]);

  // Cargar platos al inicio
  useEffect(() => {
    obtenerPlatos().then(platosObtenidos => {
      setPlatos(platosObtenidos);
    });
  }, []);

  useEffect(() => {
    obtenerMenu().then(menusObtenidos => {
      setMenus(menusObtenidos);
    });
  }, []);

  useEffect(() => {
    if (!semana || menus.length === 0) {
      setIdMenu(null);
      setMenuCompleto(null);
      return;
    }
    
    const lunes = semana.startOf("week").add(1, "day").startOf("day");
    
    const menuEncontrado = menus.find(menu => {
      const fechaInicio = dayjs(new Date(menu.getFechaInicio())).startOf("day");
      
      const coincideExacto = fechaInicio.isSame(lunes, "day");
      const coincideConOffset = fechaInicio.subtract(1, "day").isSame(lunes, "day");
      const coincideConOffset2 = fechaInicio.add(1, "day").isSame(lunes, "day");
      
      return coincideExacto || coincideConOffset || coincideConOffset2;
    });
    
    if (menuEncontrado) {
      setIdMenu(menuEncontrado.getIdMenu());
      
      obtenerMenuCompleto(menuEncontrado.getIdMenu()).then(menuCompletoObtenido => {
        setMenuCompleto(menuCompletoObtenido);
      }).catch(error => {
        setMenuCompleto(null);
      });
    } else {
      setIdMenu(null);
      setMenuCompleto(null);
    }
  }, [semana, menus]);

  // Función para obtener el nombre del plato por ID
  const obtenerNombrePlato = (idPlato: number): string => {
    const plato = platos.find(p => p.getId() === idPlato);
    return plato ? plato.getNombre() : `Plato ID: ${idPlato}`;
  };

  // Función para obtener el día de la semana según el índice de columna
  const obtenerDiaSemana = (col: number): string => {
    return diasSemana[col];
  };

  // Función para obtener los platos de un día específico
  const obtenerPlatosDelDia = (nombreDia: string): ArrPlato[] => {
    if (!menuCompleto) return [];
    
    try {
      // Intentar primero con el nombre original
      let diaMenu = menuCompleto.getDiaPorNombre(nombreDia);
      
      // Si no encuentra, probar con diferentes variantes del nombre
      if (!diaMenu) {
        // Probar sin tildes
        const nombreSinTildes = nombreDia.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        diaMenu = menuCompleto.getDiaPorNombre(nombreSinTildes);
      }
      
      // Si aún no encuentra, probar variantes específicas conocidas
      if (!diaMenu) {
        const variantes: { [key: string]: string } = {
          "Miércoles": "Miercoles",
          "Sábado": "Sabado"
        };
        
        if (variantes[nombreDia]) {
          diaMenu = menuCompleto.getDiaPorNombre(variantes[nombreDia]);
        }
      }
      
      // Si no se encuentra el día, retornar array vacío
      if (!diaMenu) {
        return [];
      }
      
      return diaMenu.platos || [];
    } catch (error) {
      return [];
    }
  };

  // Función para renderizar el contenido de una celda
  const renderCellContent = (fila: number, col: number) => {
    const nombreDia = obtenerDiaSemana(col);
    const platosDelDia = obtenerPlatosDelDia(nombreDia);
    
    // Si hay platos para este día, mostrar el plato correspondiente a la fila
    if (platosDelDia.length > 0 && fila < platosDelDia.length) {
      const plato = platosDelDia[fila];
      const nombrePlato = obtenerNombrePlato(plato.id_plato);
      
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "12px",
            background: "#f8f9fa",
            borderRadius: 8,
            border: "1px solid #e9ecef",
            cursor: "pointer",
            transition: "all 0.2s ease",
            height: "100%",
            minHeight: 60
          }}
          onClick={() => {
            // Acción al hacer clic en el plato
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e9ecef";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f8f9fa";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#495057",
              textAlign: "center",
              lineHeight: "1.2"
            }}
          >
            {nombrePlato}
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#6c757d",
              textAlign: "center",
              fontWeight: "500"
            }}
          >
            Stock: {plato.cantidad_plato}
          </div>
        </div>
      );
    }
    
    // Si no hay platos para esta fila, devolver contenido vacío
    return null;
  };

  // Calcular el número máximo de filas necesarias
  const maxFilas = menuCompleto ? 
    Math.max(...diasSemana.map(dia => obtenerPlatosDelDia(dia).length), 1) : 1;

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
          <span style={{ fontSize: "2.2rem", fontWeight: 700 }}>&#8249;</span>
        </button>
        <h1 style={{ fontWeight: 700, fontSize: "2rem", color: "#15396A", letterSpacing: 1, margin: 0 }}>
          CRONOGRAMA
        </h1>
      </div>
      
      {/* Selector de semana */}
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
                    position: "relative"
                  }}
                >
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(maxFilas)].map((_, fila) => (
              <tr key={fila}>
                {diasSemana.map((_, col) => (
                  <td
                    key={col}
                    style={{
                      minHeight: 80,
                      height: 80,
                      border: "1px solid #f0f0f0",
                      borderLeft: col === 0 ? "none" : undefined,
                      borderRight: col === diasSemana.length - 1 ? "none" : undefined,
                      borderBottom: fila === maxFilas - 1 ? "none" : undefined,
                      background: "#fff",
                      textAlign: "center",
                      padding: 4,
                      verticalAlign: "top"
                    }}
                  >
                    {renderCellContent(fila, col)}
                  </td>
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
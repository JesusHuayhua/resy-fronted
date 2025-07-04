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
import { obtenerPlatos } from "../services/obtenerPlato"; // Importar función para obtener platos
import type { Menu } from "../services/clases/classMenu";
import type { MenuCompleto } from "../services/clases/classMenuCompleto";
import type { DiaMenu } from "../services/clases/classDiaMenu";
import type { ArrPlato } from "../services/clases/classArregloPlato";
import type { Plato } from "../services/clases/classPlato"; // Importar tipo Plato
dayjs.extend(isoWeek);

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const GestionarCronograma: React.FC = () => {
  const navigate = useNavigate();
  const [semana, setSemana] = useState<Dayjs | null>(dayjs().startOf("week"));
  const [menus, setMenus] = useState<Menu[]>([]);
  const [idMenu, setIdMenu] = useState<string | null>(null);
  const [menuCompleto, setMenuCompleto] = useState<MenuCompleto | null>(null);
  const [platos, setPlatos] = useState<Plato[]>([]); // Estado para almacenar los platos

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
      console.log("🔍 Intentando cargar MenuCompleto para ID:", menuEncontrado.getIdMenu());
      
      obtenerMenuCompleto(menuEncontrado.getIdMenu()).then(menuCompletoObtenido => {
        console.log("✅ MenuCompleto cargado exitosamente:", menuCompletoObtenido);
        
        // Verificar si el menuCompleto tiene días válidos
        if (menuCompletoObtenido) {
          const diasConPlatos = diasSemana.filter(dia => {
            const diaMenu = menuCompletoObtenido.getDiaPorNombre(dia);
            return diaMenu && diaMenu.platos && Array.isArray(diaMenu.platos) && diaMenu.platos.length > 0;
          });
          console.log("📊 Días con platos válidos:", diasConPlatos);
        }
        
        setMenuCompleto(menuCompletoObtenido);
      }).catch(error => {
        console.error("❌ Error al cargar MenuCompleto:", error);
        console.error("Error details:", error.message, error.stack);
        
        // Intentar cargar de nuevo si es un error de map
        if (error.message && error.message.includes("Cannot read properties of null")) {
          console.log("🔄 Detectado error de null mapping, intentando cargar con manejo de errores...");
          // Aquí podrías implementar una versión más robusta de obtenerMenuCompleto
          // Por ahora, establecemos null para que la interfaz muestre que no hay datos
        }
        
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
      
      // Verificar que diaMenu existe y que tiene platos
      if (!diaMenu) {
        console.log(`⚠️ No se encontró el día: ${nombreDia}`);
        return [];
      }
      
      // Verificar que platos no sea null o undefined
      if (!diaMenu.platos) {
        console.log(`⚠️ El día ${nombreDia} no tiene platos (es null/undefined)`);
        return [];
      }
      
      // Verificar que platos sea un array
      if (!Array.isArray(diaMenu.platos)) {
        console.log(`⚠️ El día ${nombreDia} tiene platos pero no es un array:`, diaMenu.platos);
        return [];
      }
      
      return diaMenu.platos;
    } catch (error) {
      console.error(`❌ Error al obtener platos del día ${nombreDia}:`, error);
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
    Math.max(...diasSemana.map(dia => obtenerPlatosDelDia(dia).length), 1) : 7;

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
      
      {/* Información de Debug */}
      <div
        style={{
          marginTop: 20,
          padding: "16px",
          background: "#f8f9fa",
          borderRadius: 8,
          border: "1px solid #e9ecef"
        }}
      >
        <h3 style={{ color: "#dc3545", marginBottom: "16px" }}>🐛 DEBUG INFO</h3>
        
        {/* Debug de fechas */}
        <div style={{ marginBottom: "16px" }}>
          <h4 style={{ color: "#495057", marginBottom: "8px" }}>📅 Información de Fechas:</h4>
          <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>
            <p><strong>Semana seleccionada:</strong> {semana ? semana.format("DD/MM/YYYY") : "No seleccionada"}</p>
            {semana && (
              <>
                <p><strong>Lunes calculado:</strong> {semana.startOf("week").add(1, "day").format("DD/MM/YYYY")}</p>
                <p><strong>Domingo calculado:</strong> {semana.startOf("week").add(7, "day").format("DD/MM/YYYY")}</p>
              </>
            )}
          </div>
        </div>

        {/* Debug de menús */}
        <div style={{ marginBottom: "16px" }}>
          <h4 style={{ color: "#495057", marginBottom: "8px" }}>📋 Menús Disponibles:</h4>
          <div style={{ fontSize: "0.85rem", color: "#6c757d" }}>
            <p><strong>Total menús cargados:</strong> {menus.length}</p>
            {menus.map((menu, index) => (
              <div key={index} style={{ marginBottom: "8px", padding: "8px", background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6" }}>
                <p><strong>ID:</strong> {menu.getIdMenu()}</p>
                <p><strong>Fecha inicio:</strong> {new Date(menu.getFechaInicio()).toLocaleDateString()}</p>
                <p><strong>Fecha inicio (ISO):</strong> {menu.getFechaInicio()}</p>
                <p><strong>Fecha dayjs:</strong> {dayjs(new Date(menu.getFechaInicio())).format("DD/MM/YYYY")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Debug de menú encontrado */}
        <div style={{ marginBottom: "16px" }}>
          <h4 style={{ color: "#495057", marginBottom: "8px" }}>🎯 Menú Encontrado:</h4>
          <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>
            <p><strong>ID del menú encontrado:</strong> {idMenu || "No encontrado"}</p>
            <p><strong>MenuCompleto cargado:</strong> {menuCompleto ? "Sí" : "No"}</p>
            {idMenu && !menuCompleto && (
              <div style={{ padding: "8px", background: "#fff3cd", borderRadius: "4px", border: "1px solid #ffeaa7", marginTop: "8px" }}>
                <p style={{ color: "#856404", margin: 0 }}>
                  ⚠️ <strong>PROBLEMA:</strong> Se encontró el menú "{idMenu}" pero no se pudo cargar el MenuCompleto. 
                  Revisa la consola del navegador para ver el error específico.
                </p>
              </div>
            )}
            {menuCompleto && (
              <div style={{ marginTop: "8px" }}>
                <p><strong>Días en menuCompleto:</strong></p>
                {diasSemana.map(dia => {
                  const diaMenu = menuCompleto.getDiaPorNombre(dia);
                  const platosDelDia = obtenerPlatosDelDia(dia);
                  return (
                    <div key={dia} style={{ marginLeft: "16px", marginBottom: "4px" }}>
                      <strong>{dia}:</strong> {diaMenu ? "Encontrado" : "No encontrado"} - Platos: {platosDelDia.length}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Debug de platos */}
        <div style={{ marginBottom: "16px" }}>
          <h4 style={{ color: "#495057", marginBottom: "8px" }}>🍽️ Platos Cargados:</h4>
          <div style={{ fontSize: "0.85rem", color: "#6c757d" }}>
            <p><strong>Total platos cargados:</strong> {platos.length}</p>
            {platos.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                <p><strong>Primeros 5 platos:</strong></p>
                {platos.slice(0, 5).map(plato => (
                  <div key={plato.getId()} style={{ marginLeft: "16px", marginBottom: "4px" }}>
                    <strong>ID {plato.getId()}:</strong> {plato.getNombre()}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lista completa de platos del menú actual */}
        {menuCompleto && (
          <div style={{ marginTop: "20px" }}>
            <h4 style={{ color: "#495057", marginBottom: "12px" }}>📝 Todos los Platos del Menú Actual:</h4>
            {diasSemana.map(dia => {
              const platosDelDia = obtenerPlatosDelDia(dia);
              return (
                <div key={dia} style={{ marginBottom: "16px" }}>
                  <h5 style={{ color: "#28a745", marginBottom: "8px" }}>{dia}:</h5>
                  {platosDelDia.length > 0 ? (
                    <div style={{ marginLeft: "16px" }}>
                      {platosDelDia.map((plato, index) => (
                        <div key={index} style={{ 
                          marginBottom: "8px", 
                          padding: "8px", 
                          background: "#fff", 
                          borderRadius: "4px", 
                          border: "1px solid #dee2e6",
                          fontSize: "0.9rem"
                        }}>
                          <div><strong>ID Plato:</strong> {plato.id_plato}</div>
                          <div><strong>Nombre:</strong> {obtenerNombrePlato(plato.id_plato)}</div>
                          <div><strong>Stock:</strong> {plato.cantidad_plato}</div>
                          <div><strong>Disponible:</strong> {plato.disponible ? "Sí" : "No"}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ marginLeft: "16px", color: "#6c757d", fontStyle: "italic" }}>
                      No hay platos para este día
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionarCronograma;
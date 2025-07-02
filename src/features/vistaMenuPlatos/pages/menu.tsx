import { useEffect, useState } from "react";
import "./menu.css"
import img from '../../../assets/background.avif'
import Comida from "../components/comida/comida";

// Updated imports to match the new service structure
import { filtrarPorCategoria, filtrarPorDia, obtenerCategoriasCompleto, obtenerMenuSemanaCompleto, type MenuSemanaCompleto, type PlatoConCantidadAsignada } from "../hooks/useMenuHooks";
import type { Categoria } from "../services/categoriaMenuService";

const diasNombres: string[] = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];

function MenuComp() {
  
  const [filtros, setFiltros] = useState({ dia: new Date().getDay(), categoria: 1, platoSeleccionado: 0 });

  // Del backend
  const [menuSemana, setMenuSemana] = useState<MenuSemanaCompleto | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  
  const [platosFiltrados, setPlatosFiltrados] = useState<PlatoConCantidadAsignada[]>([]);

  // Capturamos la data del back
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [menuApi, cats] = await Promise.all([
          obtenerMenuSemanaCompleto(),
          obtenerCategoriasCompleto()
        ]);

        if (menuApi) {
          setMenuSemana(menuApi);
          console.log("Menu cargado:", menuApi); 
        }
        if (cats) {
          setCategorias(cats);
          console.log("Categorías cargadas:", cats); 
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Error al cargar menú o categorías");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!menuSemana) return;
    // Filtramos el día.
    const platosDelDia = filtrarPorDia(menuSemana, filtros.dia);
    console.log(`Platos del día ${filtros.dia}:`, platosDelDia); 

    // Filtramos por categoría.
    const finales = filtrarPorCategoria(platosDelDia, filtros.categoria);
    console.log(`Platos filtrados por categoría ${filtros.categoria}:`, finales); // Debug log

    setPlatosFiltrados(finales);
    
    // Reseteo
    if (finales.length === 0 || filtros.platoSeleccionado >= finales.length) {
      setFiltros(prev => ({ ...prev, platoSeleccionado: 0 }));
    }
  }, [filtros.dia, filtros.categoria, menuSemana]);

  const diaSiguiente = () => {
    setFiltros(prev => ({ ...prev, dia: (prev.dia + 1) % diasNombres.length, platoSeleccionado: 0 }));
  };

  const diaAnterior = () => {
    setFiltros(prev => ({
      ...prev,
      dia: prev.dia === 0 ? diasNombres.length - 1 : prev.dia - 1,
      platoSeleccionado: 0
    }));
  };

  const handleCategoriaClick = (idCategoria: number) => {
    setFiltros(prev => ({ ...prev, categoria: idCategoria, platoSeleccionado: 0 }));
  };

  const handlePlatoClick = (index: number) => {
    setFiltros(prev => ({ ...prev, platoSeleccionado: index }));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <div className="main-container">
        <div className="sidebar">
          <div className="day-selector">
            <button onClick={diaAnterior}>‹</button>
            <h3>{diasNombres[filtros.dia]}</h3>
            <button onClick={diaSiguiente}>›</button>
          </div>
          <div className="menu-options">
            {platosFiltrados.map((platoConCantidad, index) => (
              <button
                key={platoConCantidad.plato.IDPlato}
                onClick={() => handlePlatoClick(index)}
                className={index === filtros.platoSeleccionado ? 'selected' : 'secondary'}
              >
                {/* Display dish name with quantity information */}
                {platoConCantidad.plato.Info.NombrePlato}
              </button>
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="menu-tabs">
            {categorias.map(cat => (
              <button
                key={cat.IDCategoria}
                onClick={() => handleCategoriaClick(cat.IDCategoria)}
                className={filtros.categoria === cat.IDCategoria ? 'active' : ''}
              >
                {cat.Info.Nombre}
              </button>
            ))}
          </div>

          <div className="food-card-placeholder">
            {platosFiltrados.length > 0 && platosFiltrados[filtros.platoSeleccionado] ? (
              <Comida 
                platoDia={{ 
                  plato: platosFiltrados[filtros.platoSeleccionado].plato, 
                  cantidad: platosFiltrados[filtros.platoSeleccionado].cantidad // Pass quantity info to child component
                }} 
              />
            ) : (
              <div className="no-platos-message">
                <p>No hay platos disponibles para este día y categoría</p>
                <p>Día: {diasNombres[filtros.dia]} | Categoría: {categorias.find(c => c.IDCategoria === filtros.categoria)?.Info.Nombre || 'Desconocida'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuComp;
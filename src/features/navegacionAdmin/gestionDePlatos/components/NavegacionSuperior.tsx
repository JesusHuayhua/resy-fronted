import FiltroCalendar from "./FiltroCalendar";
import Buscador from "./Buscador";
import "./NavegacionSuperior.css";
import type { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import type { Categoria } from "../../../vistaMenuPlatos/services/categoriaMenuService";
import CategoriaComponente from "./Categoria";

// Interfaz para las props del componente
// Hemos actualizado los tipos para que sean más específicos y claros
interface Props {
    categoriaComidas: Categoria[];
    fechaActual: Dayjs | null;
    setFecha: (fecha: Dayjs | null) => void;
    indexCategoria: number | null;
    setIndexCategoria: (index: number | null) => void;
}

function NavegacionSuperior(props: Props) {
    return (
        <>
            {/* Primera sección de navegación: Calendario y botones de acción */}
            <div className="admin-food-manager-navbar-1">
                {/* Componente de calendario para seleccionar fechas */}
                <div className="admin-food-manager-calendar">
                    <FiltroCalendar 
                        value={props.fechaActual} 
                        setValue={props.setFecha}
                    />
                </div>
                
                {/* Botones de navegación a otras secciones */}
                <div className="admin-food-manager-buttons">
                    <Link
                        to="/admin/alimentos-historial"
                        className="admin-food-manager-link-button"
                        state={{
                            fecha: props.fechaActual,
                            categorias: props.categoriaComidas
                        }}
                    >
                        Historial
                    </Link>
                    <Link 
                        to="/admin/alimentos-cronograma" 
                        className="admin-food-manager-link-button"
                    >
                        Cronograma
                    </Link>
                </div>
            </div>

            {/* Segunda sección de navegación: Categorías y buscador */}
            <div className="admin-food-manager-navbar-2">
                {/* Sección de categorías con funcionalidad de filtrado */}
                <div className="admin-food-manager-categories">
                    {/* Renderizamos cada categoría como un componente clickeable */}
                    {props.categoriaComidas.map((categoria) => {
                        return (
                            <CategoriaComponente 
                                key={categoria.IDCategoria} // Key único para React
                                name={categoria.Info.Nombre} 
                                index={categoria.IDCategoria} 
                                setIndexCategoria={props.setIndexCategoria}
                            />
                        );
                    })}
                    
                    {/* Botón para limpiar filtro de categoría (solo si hay una seleccionada) */}
                    {props.indexCategoria !== null && (
                        <button 
                            className="clear-category-btn" 
                            onClick={() => props.setIndexCategoria(null)}
                            title="Limpiar filtro de categoría"
                        >
                            ✕
                        </button>
                    )}
                </div>
                
                {/* Componente de búsqueda */}
                <div className="admin-food-manager-search">
                    <Buscador />
                </div>
            </div>
        </>
    );
}

export default NavegacionSuperior;
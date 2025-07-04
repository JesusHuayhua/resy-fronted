import FiltroCalendar from "./FiltroCalendar";
import Categoria from "./Categoria";
import Buscador from "./Buscador";
import "./NavegacionSuperior.css"
import type { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

// Los ids serian los indices de cada categoria.
// Por ahora hardcodeado, pendiente de cambiarlo.

interface Prop {
  categoriaComidas: string[];
  fechaActual: Dayjs | null;
  setFecha: (fecha: Dayjs | null) => void;
  indexCategoria: number | null;
  setIndexCategoria: (index: number | null) => void;
}

function NavegacionSuperior(prop: Prop){
    const navigate = useNavigate();

    // Procedemos con definir el filtro de la fecha.
    // Aca habra tambien dos botones.
    
    return (
        <>
            <div className="admin-food-manager-navbar-1">
                {/* Dos botones */}
                <div className="admin-food-manager-calendar">
                    <FiltroCalendar value={prop.fechaActual} setValue={prop.setFecha}/>
                </div>
                <div className="admin-food-manager-buttons">
                    <button>Historial</button>
                    <button onClick={() => navigate("/admin/cronograma")}>Cronograma</button>
                </div>
            </div>
            <div className="admin-food-manager-navbar-2">
                {/* Mostramos las categorias actuales */}
                <div className="admin-food-manager-categories">
                    {prop.categoriaComidas.map((cat, index) => {
                        return (
                            <Categoria name={cat} index={index} setIndexCategoria={prop.setIndexCategoria}/>
                        );
                    })}
                    {prop.indexCategoria !== null && <button className="clear-category-btn" onClick={() => prop.setIndexCategoria(null)}>X</button>}
                    
                </div>
                <div className="admin-food-manager-search">
                    <Buscador />
                </div>
                
            </div>
        </>
    )
}


export default NavegacionSuperior;
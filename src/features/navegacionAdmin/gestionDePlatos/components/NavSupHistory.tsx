import type { Dayjs } from "dayjs";
import { useLocation } from "react-router-dom";
import CategoriaComponente from "./Categoria";
import Buscador from "./Buscador";
import { useEffect } from "react";
import "./NavSupHistory.css"
import { obtenerCategorias, type Categoria } from "../../../vistaMenuPlatos/services/categoriaMenuService";

interface LocationState {
    fecha: Dayjs,
    categorias: Categoria[]
}

interface Prop {
    indexCategoria: number | null;
    setIndexCategoria: (index: number | null) => void;
    activo: boolean | null,
    setActivo: (active: boolean | null) => void;
    // NUEVAS PROPS PARA BÚSQUEDA
    buscarPlato: string;
    setBuscarPlato: (buscar: string) => void;
}

function NavSupHistory(prop: Prop) {
    const location = useLocation();
    const locationState = location.state as LocationState

    useEffect(() => {
        if (locationState.categorias.length === 0) {
            const fetchCategorias = async () => {
                const categorias = await obtenerCategorias();
                locationState.categorias = categorias;
            }

            fetchCategorias();
        }
    }, [])

    return (
        <div className="admin-food-history-navwrapper">
            <div className="admin-food-history-categorias">
                {
                    locationState.categorias.map((cat, index) => {
                        return (
                            <CategoriaComponente 
                                key={cat.IDCategoria}
                                name={cat.Info.Nombre} 
                                index={index} 
                                setIndexCategoria={prop.setIndexCategoria} 
                            />
                        )
                    })
                }
                {
                    prop.indexCategoria !== null && 
                    <button className="clear-category-btn" onClick={() => prop.setIndexCategoria(null)}>
                        X
                    </button>
                }
            </div>
            <div className="admin-food-history-buttons">
                {prop.activo !== null && (
                    <>
                        <button onClick={() => prop.setActivo(!prop.activo)}>
                            {prop.activo ? <text>Activo</text> : <text>Inactivo</text>}
                        </button>
                        <button onClick={() => prop.setActivo(null)}>
                            X
                        </button>
                    </>
                )}
                {prop.activo === null &&
                    <button onClick={() => prop.setActivo(true)}>
                        Activo/Inactivo
                    </button>
                }
                {/* PASAMOS LOS PROPS DE BÚSQUEDA AL COMPONENTE BUSCADOR */}
                <Buscador 
                    buscarPlato={prop.buscarPlato}
                    setBuscarPlato={prop.setBuscarPlato}
                />
            </div>
        </div>
    )
}

export default NavSupHistory;
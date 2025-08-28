import NavegacionSuperior from "../components/NavegacionSuperior";
import "./GestionarPlatos.css"
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import type { Dayjs } from "dayjs";
import Alimento from "../components/Alimento";
import {
    filtrarPorCategoria,
    filtrarPorDia,
    obtenerCategoriasCompleto,
    obtenerMenuSemanaCompleto,
    type MenuSemanaCompleto,
    type PlatoConCantidadAsignada
} from "../../../vistaMenuPlatos/hooks/useMenuHooks";
import type { Categoria } from "../../../vistaMenuPlatos/services/categoriaMenuService";

// Configuramos dayjs para usar español
dayjs.locale('es');

const diasNombres: string[] = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
];

function GestionarPlatos() {
    // Estado simplificado - eliminamos la duplicación de fechas
    // Ahora 'date' es nuestra única fuente de verdad para las fechas
    const [isLoading, setIsLoading] = useState<boolean>(true); // Iniciamos en true para mostrar loading
    const [date, setDate] = useState<Dayjs | null>(dayjs()); // Inicializamos con la fecha actual
    const [indexCategoria, setIndexCategoria] = useState<number | null>(null); // Solo manejamos categoría aquí

    // Estados para datos del backend
    const [menuSemana, setMenuSemana] = useState<MenuSemanaCompleto | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [platosFiltrados, setPlatosFiltrados] = useState<PlatoConCantidadAsignada[]>([]);

    // ESTADO PARA BÚSQUEDA - CAMBIADO A STRING
    const [buscarPlato, setBuscarPlato] = useState<string>("");


    // Efecto para cargar datos del backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Cargamos datos en paralelo para mejor rendimiento
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
            } finally {
                // Importante: siempre establecemos isLoading en false al final
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Efecto para filtrar platos cuando cambian las dependencias
    useEffect(() => {
        // Validamos que tengamos los datos necesarios antes de filtrar
        if (!menuSemana || !date) return;

        // Paso 1: Filtramos por el día seleccionado
        const platosDelDia = filtrarPorDia(menuSemana, diasNombres[date.day()]);

        // Paso 2: Filtramos por categoría seleccionada, solo en caso no sea null.
        if(indexCategoria !== null){
            const finales = filtrarPorCategoria(platosDelDia, indexCategoria);
            setPlatosFiltrados(finales);
            return;
        }
        // Actualizamos el estado con los platos filtrados
        setPlatosFiltrados(platosDelDia);

    }, [date, indexCategoria, menuSemana]); // Dependencias actualizadas

    // Función para renderizar los platos filtrados
    // Agregamos key para evitar problemas de renderizado en React
    const renderizarPlatos = platosFiltrados.map((comida, index) => (
        <Alimento
            key={`${comida.plato.IDPlato || index}-${date?.format('YYYY-MM-DD')}`}
            comida={comida}
        />
    ));

    // Manejador para cambios de categoría
    const handleCategoriaClick = (idCategoria: number | null) => {
        setIndexCategoria(idCategoria)
    };

    // Función para obtener el nombre de la categoría actual
    const obtenerNombreCategoria = (): string => {
        if (indexCategoria === null) return "todas las categorías";
        const categoria = categorias.find(cat => cat.IDCategoria === indexCategoria);
        return categoria ? categoria.Info.Nombre.toLowerCase() : "la categoría seleccionada";
    };

    // Función para obtener el nombre del día actual
    const obtenerNombreDia = (): string => {
        if (!date) return "este día";
        return diasNombres[date.day()];
    };

    // Componente de estado de carga
    const renderEstadoCarga = () => (
        <div className="admin-food-manager-loading">
            <div className="admin-food-manager-spinner"></div>
            <div className="admin-food-manager-loading-text">Cargando platos...</div>
            <div className="admin-food-manager-loading-subtext">
                Por favor espera mientras obtenemos la información del menú
            </div>
        </div>
    );

    // Componente de estado vacío
    const renderEstadoVacio = () => (
        <div className="admin-food-manager-empty">
            <div className="admin-food-manager-empty-icon">
                <div className="admin-food-manager-empty-symbol">🍽️</div>
            </div>
            <div className="admin-food-manager-empty-title">
                No hay platos disponibles
            </div>
            <div className="admin-food-manager-empty-message">
                No se encontraron platos para {obtenerNombreCategoria()} en {obtenerNombreDia()}.
            </div>
            <div className="admin-food-manager-empty-suggestion">
                💡 Intenta seleccionar un día diferente o cambia los filtros de categoría
            </div>
        </div>
    );

    return (
        <div className="admin-food-manager-container">
            <div className="admin-food-manager-navbar-header">
                <h1>GESTIONAR PLATOS</h1>
                {/* Aquí irían los botones de notificaciones y perfil del usuario */}
            </div>

            <div className="admin-food-manager-navbar-buttons">
                <NavegacionSuperior
                    categoriaComidas={categorias}
                    fechaActual={date}
                    setFecha={setDate}
                    indexCategoria={indexCategoria}
                    setIndexCategoria={handleCategoriaClick}
                    setBuscarPlato={setBuscarPlato}
                    buscarPlato={buscarPlato}
                />
            </div>

            {/* Renderizado condicional basado en el estado de carga */}
            {isLoading ? (
                renderEstadoCarga()
            ) : (
                <>
                    {/* Si no está cargando, mostramos el contenido o el estado vacío */}
                    {platosFiltrados.length === 0 ? (
                        renderEstadoVacio()
                    ) : (
                        <div className="admin-food-manager-menu">
                            {renderizarPlatos}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default GestionarPlatos;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavSupHistory from "../components/NavSupHistory";
import "./VisualizarHistorial.css"

import { platosCatalogoService, type Plato } from "../../../vistaMenuPlatos/services/platosCatalogoService";
import AlimentoEditar from "../components/AlimentoEditar";
import { obtenerCategorias, type Categoria } from "../../../vistaMenuPlatos/services/categoriaMenuService";
import ModalAgregarPlato from "../components/ModalAgregarPlato";
import AgregarPlato from "../components/AgregarPlato";
import { insertarPlatoService, type PlatoRequest } from "../services/insertarPlatoService";
import ModalEditarPlato from "../components/ModalEditarPlato";
import { actualizarPlatoService, type PlatoActualizarRequest } from "../services/actualizarPlatoService";
import { eliminarPlatoService } from "../services/eliminarPlatoService";

// OPCIÓN 1: Simplificar PlatoData (recomendada)
export interface PlatoData {
    id_plato: number;
    nombre: string;
    descripcion: string;
    categoria: string;         // Nombre de la categoría
    categoria_id: number;      // ID de la categoría
    precio: number;
    imagen: File | null;
    estado: boolean;
}

function VisualizarHistorial() {
    // DATOS ORIGINALES: 
    const [todosLosPlatos, setTodosLosPlatos] = useState<Plato[] | null>(null);

    // DATOS FILTRADOS: 
    const [platosFiltrados, setPlatosFiltrados] = useState<Plato[] | null>(null);

    // FILTRO ACTUAL: Qué categoría está seleccionada
    const [indexCategoria, setIndexCategoria] = useState<number | null>(null);

    // OTRAS VARIABLES DE ESTADO
    const [categorias, setCategorias] = useState<Categoria[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [active, setActive] = useState<boolean | null>(null) // Funciona para la categoría

    // ESTADO PARA BÚSQUEDA - CAMBIADO A STRING
    const [buscarPlato, setBuscarPlato] = useState<string>("");

    // EFECTO 1: Cargar datos iniciales del servidor
    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const platosBack = await platosCatalogoService();
                console.log("Platos capturados: ");
                console.log(platosBack.length);

                // Guardamos los datos originales completos
                setTodosLosPlatos(platosBack);

                // Y también inicializamos los datos filtrados con todos los platos
                setPlatosFiltrados(platosBack);
            } catch (error) {
                console.log("Error capturando los platos", error);
            }
        }

        const fetchCategorias = async () => {
            try {
                const categoriasBack = await obtenerCategorias();
                setCategorias(categoriasBack);
            } catch (error) {
                console.log("Error capturando las categorias", error);
            }
        }

        // Ejecutamos ambas funciones
        Promise.all([fetchPlatos(), fetchCategorias()])
            .then(() => setIsLoading(false))
            .catch((error) => {
                console.log("Error en Promise.all:", error);
                setIsLoading(false);
            });
    }, []);

    // EFECTO 2: Filtrar platos cuando cambien los filtros O LA BÚSQUEDA
    useEffect(() => {
        if (!todosLosPlatos) return;

        const platosParaMostrar = todosLosPlatos.filter(plato => {
            // Filtro por categoría
            const coincideCategoria = indexCategoria ? plato.Info.Categoria === indexCategoria + 1 : true;

            // Filtro por estado
            const coincideEstado = active !== null ? plato.Info.Estado === active : true;

            // Filtro por búsqueda de nombre
            const coincideBusqueda = buscarPlato.trim() === "" ||
                plato.Info.NombrePlato.toLowerCase().includes(buscarPlato.toLowerCase().trim());

            return coincideCategoria && coincideEstado && coincideBusqueda;
        });

        setPlatosFiltrados(platosParaMostrar);
    }, [indexCategoria, active, buscarPlato, todosLosPlatos]);

    // Resto de funciones sin cambios...
    const insertarPlato = async (platoIngresar: PlatoData): Promise<void> => {
        try {
            if (!categorias || categorias.length === 0) {
                throw new Error("No se han cargado las categorías");
            }

            const categoriaEncontrada = categorias.find(cat =>
                platoIngresar.categoria === cat.Info.Nombre
            );

            if (!categoriaEncontrada) {
                throw new Error(`No se encontró la categoría "${platoIngresar.categoria}"`);
            }

            if (!platoIngresar.nombre.trim()) {
                throw new Error("El nombre del plato es obligatorio");
            }

            if (!platoIngresar.descripcion.trim()) {
                throw new Error("La descripción del plato es obligatoria");
            }

            if (platoIngresar.precio <= 0) {
                throw new Error("El precio debe ser mayor a 0");
            }

            const plato: PlatoRequest = {
                nombre_plato: platoIngresar.nombre.trim(),
                categoria: categoriaEncontrada.IDCategoria,
                descripcion: platoIngresar.descripcion.trim(),
                precio: platoIngresar.precio,
                imagen: "https://resy-ingesoft.s3.us-east-1.amazonaws.com/imagen_2025-06-21_213926386.png",
                estado: platoIngresar.estado
            };

            console.log("Enviando plato al servidor:", plato);
            const response = await insertarPlatoService(plato);
            console.log("Plato insertado exitosamente:", response);
        } catch (error) {
            console.error("Error al insertar plato:", error);
            throw error;
        }
    };

    const [modalInsertarOpen, setModalInsertarOpen] = useState<boolean>(false);
    const [modalEditarOpen, setModalEditarOpen] = useState<boolean>(false);

    const obtenerNombreCategoria = (): string => {
        if (indexCategoria === null) return "todas las categorías";
        const categoria = categorias?.find(cat => cat.IDCategoria === indexCategoria);
        return categoria ? categoria.Info.Nombre.toLowerCase() : "la categoría seleccionada";
    };

    const renderEstadoCarga = () => (
        <div className="admin-food-manager-loading">
            <div className="admin-food-manager-spinner"></div>
            <div className="admin-food-manager-loading-text">Cargando platos...</div>
            <div className="admin-food-manager-loading-subtext">
                Por favor espera mientras obtenemos la información del catálogo
            </div>
        </div>
    );

    const renderEstadoVacio = () => (
        <div className="admin-food-manager-empty">
            <div className="admin-food-manager-empty-icon">
                <div className="admin-food-manager-empty-symbol">🍽️</div>
            </div>
            <div className="admin-food-manager-empty-title">
                No hay platos en el catálogo.
            </div>
            <div className="admin-food-manager-empty-message">
                No se encontraron platos para {obtenerNombreCategoria()}.
            </div>
            <div className="admin-food-manager-empty-suggestion">
                💡 Intenta cambiar los filtros o la búsqueda
            </div>
        </div>
    );

    const actualizarPlato = async (platoEditar: PlatoData): Promise<void> => {
        try {
            if (!categorias || categorias.length === 0) {
                throw new Error("No se han cargado las categorías");
            }

            const categoriaEncontrada = categorias.find(cat =>
                platoEditar.categoria === cat.Info.Nombre
            );

            if (!categoriaEncontrada) {
                throw new Error(`No se encontró la categoría "${platoEditar.categoria}"`);
            }

            const plato: PlatoActualizarRequest = {
                nombre_plato: platoEditar.nombre.trim(),
                categoria: categoriaEncontrada.IDCategoria,
                descripcion: platoEditar.descripcion.trim(),
                precio: platoEditar.precio,
                imagen: "https://resy-ingesoft.s3.us-east-1.amazonaws.com/imagen_2025-06-21_213926386.png",
                estado: platoEditar.estado,
                id_plato: platoEditar.id_plato
            };

            console.log("Enviando plato al servidor:", plato);
            const response = await actualizarPlatoService(plato);
            console.log("Plato actualizado exitosamente:", response);
        } catch (error) {
            console.error("Error al actualizar plato:", error);
            throw error;
        }
    };


    const eliminarPlato = async (idPlato: number): Promise<void> => {
        try {
            console.log('Iniciando eliminación del plato con ID:', idPlato);

            // Mostrar confirmación antes de eliminar
            const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este plato?');
            if (!confirmacion) {
                console.log('Eliminación cancelada por el usuario');
                return;
            }

            // Llamar al servicio de eliminación
            const response = await eliminarPlatoService(idPlato);
            console.log('Plato eliminado exitosamente:', response);

            // Recargar los datos desde el servidor para asegurar consistencia
            await recargarDatos();

            // Cerrar modal y limpiar selección
            setModalEditarOpen(false);
            setPlatoSeleccionado(null);

            // Mostrar mensaje de éxito
            alert('Plato eliminado exitosamente');

        } catch (error) {
            console.error('Error al eliminar plato:', error);

            // No actualizar el estado local si hay error
            // Mostrar mensaje de error específico
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`No se pudo eliminar el plato: ${errorMessage}`);

            // Opcional: Recargar datos para verificar el estado real
            try {
                await recargarDatos();
            } catch (reloadError) {
                console.error('Error al recargar datos:', reloadError);
            }
        }
    };

    // Función auxiliar para recargar datos desde el servidor
    const recargarDatos = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const platosActualizados = await platosCatalogoService();
            setTodosLosPlatos(platosActualizados);
            console.log('Datos recargados exitosamente');
        } catch (error) {
            console.error('Error al recargar datos:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const [platoSeleccionado, setPlatoSeleccionado] = useState<Plato | null>(null)

    return (
        <div className="admin-food-history-container">
            <div className="admin-food-history-navbar-header">
                <Link to="/admin/alimentos">
                    {"<"}
                </Link>
                <h1>HISTORIAL</h1>
            </div>
            <div className="admin-food-history-buttons">
                <NavSupHistory
                    setIndexCategoria={setIndexCategoria}
                    indexCategoria={indexCategoria}
                    activo={active}
                    setActivo={setActive}
                    // PASAMOS LOS PROPS DE BÚSQUEDA
                    buscarPlato={buscarPlato}
                    setBuscarPlato={setBuscarPlato}
                />
            </div>
            {isLoading ? (
                renderEstadoCarga()
            ) : (
                <>
                    {platosFiltrados === null || platosFiltrados.length === 0 ? (
                        renderEstadoVacio()
                    ) : (
                        <div className="admin-food-manager-menu">
                            <AgregarPlato
                                setModalOpen={() => setModalInsertarOpen(true)}
                                modalOpen={false}
                            />
                            {platosFiltrados.map(plato => {
                                return (
                                    <AlimentoEditar
                                        key={plato.IDPlato}
                                        plato={plato}
                                        categorias={categorias}
                                        setModalEditarOpen={setModalEditarOpen}
                                        setPlatoSeleccionado={setPlatoSeleccionado} />
                                );
                            })}
                        </div>
                    )}
                </>
            )}
            {modalInsertarOpen && <ModalAgregarPlato
                onClose={() => setModalInsertarOpen(false)}
                onConfirm={insertarPlato}
                categorias={categorias}
            />}

            {(modalEditarOpen && platoSeleccionado !== null) && <ModalEditarPlato
                onClose={() => setModalEditarOpen(false)}
                onConfirm={actualizarPlato}
                categorias={categorias}
                platoAEditar={platoSeleccionado}
                onEliminar={eliminarPlato}
            />}
        </div>
    )
}

export default VisualizarHistorial;
import type { Menu } from "../../../vistaMenuPlatos/services/clases/classMenu";
import { obtenerMenuDia } from "../../../vistaMenuPlatos/services/obtenerMenuDelDia";
import { obtenerMenuSemanal } from "../../../vistaMenuPlatos/services/obtenerMenuSemanal";
import type { PlatoConDisponibilidad } from "../../../vistaMenuPlatos/services/obtenerPlatosDia";
import NavegacionSuperior from "../components/NavegacionSuperior";
import "./GestionarPlatos.css"
import { useState, useEffect } from "react";

import 'dayjs/locale/es'; 
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import Alimento from "../components/Alimento";
// Dias:
const dias : string [] = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];

// Categorias:
const categoriaComidas : string[] = ["Entradas", "Segundos", "Carta", "Adicionales"];

function GestionarPlatos(){

    const [date, setDate] = useState<Dayjs|null>(null); // Sino x defecto se elige el actual.

    const [menuSemana, setMenuSemana] = useState<Menu[]>([]);

    const [indexCategoria, setIndexCategoria] = useState<number | null >(null);

    const [platosDia, setPlatosDia] = useState<PlatoConDisponibilidad[]>([]); // A capturarse. Se va a mostrar solo el dia especifico ingresado

    // Paso 1: Capturar el menu total de todos los dias de la semana.
    useEffect( () => {
            const fetchMenu = async () => {
                try {
                    const menuSem = await obtenerMenuSemanal(); 
                    setMenuSemana(menuSem);
                    console.log("Se capturo la data");
                } catch(error){
                    alert("Error al capturar el menú de la semana");
                }
            };
            fetchMenu();
        }, []); // Array vacío indica primera carga de la página
    
    // Paso 2: Procedemos con capturar los platos. Como no hay filtros en esta parte, se procederan con aplicar nulos.
    useEffect(() => {
        if(menuSemana){
                const fetchPlatosDia = async () => {
                    try{
                        // Los platos a renderizar por defecto mostraran del dia actual.
                        const platosSinFiltro = await obtenerMenuDia(
                            menuSemana,
                            dias[date === null ? dayjs().day() : date.day()],
                            null
                        ); // Se pasa un null como categoria
    
                        // Hecho esto, procedemos con asignar
                        setPlatosDia(platosSinFiltro);
                    }catch(error){
                        alert("No se pudo aplicar los filtros");
                    }
                }
                fetchPlatosDia();
            }
    }, [menuSemana])

    // Paso 3, los platos van a estar cambiando en base a los filtros que el usuario este cambiando.
    useEffect( () => {
            if(menuSemana){
                const fetchPlatosDia = async () => {
                    try{
                        const platosConFiltro = await obtenerMenuDia(
                            menuSemana,
                            dias[date === null ? dayjs().day() : date.day()],
                            indexCategoria
                        ); // No seguira hasta que se obtenga el menu del dia
    
                        // Hecho esto, procedemos con asignar
                        setPlatosDia(platosConFiltro);
                    }catch(error){
                        alert("No se pudo aplicar los filtros");
                    }
                }
                fetchPlatosDia();
            }
            // Caso contrario no se ejecuta nada.
        }, [date, indexCategoria]);
    
    // Ahora que tenemos todos los platos con sus filtros respectivos, procedemos con mostrarlo con un Map.
    const renderizarPlatos =  platosDia.map( (comida) => <Alimento comida = {comida}/>)
    

    
    return (
        <div className="admin-food-manager-container">
            <div className="admin-food-manager-navbar-header">
                <h1>GESTIONAR PLATOS</h1>
                {/* Boton de notificaciones y perfil del usuario */}
            </div>
            <div className="admin-food-manager-navbar-buttons">
                <NavegacionSuperior categoriaComidas={categoriaComidas} fechaActual={date} setFecha={setDate} indexCategoria = {indexCategoria} setIndexCategoria={setIndexCategoria}/>
            </div>
            <div className="admin-food-manager-menu">
                {renderizarPlatos}
            </div>

        </div>
    )
};


export default GestionarPlatos;
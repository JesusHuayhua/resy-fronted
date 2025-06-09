import { useEffect, useState } from "react";
import "./menu.css"
import img from '../../../assets/background.avif'
import Header from "../../navegaciónInicial/components/header/header";
import Comida from "../components/comida/comida";
import { obtenerMenuSemanal } from "../services/obtenerMenuSemanal";
import { obtenerMenuDia } from "../services/obtenerMenuDelDia";
import type { Plato } from "../services/clases/classPlato";
import { Menu } from "../services/clases/classMenu";
import type { PlatoConDisponibilidad } from "../services/obtenerPlatosDia";

// Declararemos las categorias (puede que hayan mas. Por ahora esta hardcodeado)
// Su "i" es el ID de la categoria
const dias : string [] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ,"Domingo"];
 
function MenuComp(){
    // Objeto Filtro que manejará los indexs de cada array.
    const [filtros, setFiltros] = useState(
        {
            dia: 0,
            categoria: 0,
            plato: 0
        }
    );

    const [platosDia, setPlatosDia] = useState<PlatoConDisponibilidad[]>([]);
    // Tendremos un listado de platos con los filtros correspondientes.
    const [menuSemana, setMenuSemana] = useState<Menu[]>([]);
    // Y un plato correspondiente.
    const [platoSeleccionado, setPlatoSeleccionado] = useState<PlatoConDisponibilidad | undefined>(undefined); // No hay plato seleccionado inicialmente
    // Primero capturaremos el menú de la semana.
    useEffect( () => {
        const fetchMenu = async () => {
            try {
                const menuSem = await obtenerMenuSemanal(); // No seguira hasta que se obtenga la data del menuSemanal.
                setMenuSemana(menuSem);
                console.log("Se capturo la data");
            } catch(error){
                alert("Error al capturar el menú de la semana");
            }
        };
        fetchMenu();
    }, []); // Array vacío indica primera carga de la página

    // Ya capturada el menú de la semana, aplicaremos los filtros.
    // Cada vez que se cambie los filtros, los platos del día van a cambiar.   
    useEffect( () => {
        if(menuSemana){
            const fetchPlatosDia = async () => {
                try{
                    const platosConFiltro = await obtenerMenuDia(
                        menuSemana,
                        dias[filtros.dia],
                        filtros.categoria
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
    }, [filtros]);

    // Ahora handlers
    const diaSiguiente = () => {
        setFiltros((filtroAnterior) => ({
            ...filtroAnterior,
            dia: (filtroAnterior.dia + 1) % dias.length
        }));
    };

    const diaAnterior = () => {
        setFiltros((filtroAnterior) => ({
            ...filtroAnterior,
            dia: 
                filtroAnterior.dia === 0 ? dias.length - 1 : filtroAnterior.dia - 1
        }));
    };

    const handleCategoriaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const valor = parseInt(e.currentTarget.value);
        setFiltros({ ...filtros, categoria: valor });
    };

    const handlePlatoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const valor = parseInt(e.currentTarget.value);
        setFiltros({ ...filtros, plato: valor });

        const platoSeleccionado = platosDia.find((platoDia) => 
            platoDia.plato.getId() === valor
        );

        setPlatoSeleccionado(platoSeleccionado); // Puede ser undefined si no se encuentra
    };


    // Para renderizar alimentos
    const alimentosSeleccion = platosDia.map((platoDia) => {
        return (
            <button className={
                platoDia.plato.getId() === filtros.plato ? 'selected' : 'secondary'
            } value={platoDia.plato.getId()} onClick={handlePlatoClick}>
                {platoDia.plato.getNombre()}
            </button>
        )
    })




    
   
    return (
        <div style={{ 
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        }}>
            <Header />
            <div className="main-container">
                <div className="sidebar">
                    <div className="day-selector">
                        <button onClick={diaAnterior}>‹</button>
                        <h3>{dias[filtros.dia]}</h3>
                        <button onClick={diaSiguiente}>›</button>
                    </div>
                    <div className="menu-options">
                        {alimentosSeleccion}
                    </div>
                </div>
                <div className="content-section">
                    <div className="menu-tabs">
                        <button
                            value="0"
                            onClick={handleCategoriaClick}
                            className={filtros.categoria === 0 ? 'active' : ''}
                        >
                            Entradas
                        </button>
                        <button
                            value="1"
                            onClick={handleCategoriaClick}
                            className={filtros.categoria === 1 ? 'active' : ''}
                        >
                            Segundos
                        </button>
                        <button
                            value="2"
                            onClick={handleCategoriaClick}
                            className={filtros.categoria === 2 ? 'active' : ''}
                        >
                            Carta
                        </button>
                        <button
                            value="3"
                            onClick={handleCategoriaClick}
                            className={filtros.categoria === 3 ? 'active' : ''}
                        >
                            Adicional
                        </button>

                    </div>
                    <div className="food-card-placeholder">
                        <Comida platoDia ={platoSeleccionado}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuComp;
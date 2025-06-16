import { useEffect, useState } from "react";
import "./menu.css"
import img from '../../../assets/background.avif'
import Header from "../../navegaciónInicial/components/header/header";
import Comida from "../components/comida/comida";
import { obtenerMenuSemanal } from "../services/obtenerMenuSemanal";
import { obtenerMenuDia } from "../services/obtenerMenuDelDia";
import type { Plato } from "../services/clases/classPlato";
import { Menu } from "../services/clases/classMenu";

function MenuComp(){
    // Como se manejan 3 variables, tendremos alrededor de 3 states.
    // Se manejarán como objeto mejor :v
    // Empieza con "Lunes", "Entradas", "indexPlato"
    const [filtros, setFiltros] = useState(
        {
            dia: "Lunes",
            categoria: 0,
            plato: 0
        }
    );

    const [platosDia, setPlatosDia] = useState<Plato[]>([]);
    // Tendremos un listado de platos con los filtros correspondientes.
    const [menuSemana, setMenuSemana] = useState<Menu[]>();

    // Primero capturaremos el menú de la semana.
    useEffect( () => {
        const fetchMenu = async () => {
            try {
                const menuSem = await obtenerMenuSemanal();
                setMenuSemana(menuSem);
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
                        filtros.dia,
                        filtros.categoria
                    );
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
                        <button>‹</button>
                        <h3>Day</h3>
                        <button>›</button>
                    </div>
                    <div className="menu-options">
                        <button className="selected">Selected</button>
                        <button className="secondary">No selected</button>
                    </div>
                </div>
                <div className="content-section">
                    <div className="menu-tabs">
                        <button className="active">Entradas</button>
                        <button>Segundos</button>
                        <button>Carta</button>
                        <button>Adicional</button>
                    </div>
                    <div className="food-card-placeholder">
                        <Comida />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuComp;
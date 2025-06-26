import Filtros from "../components/Filtros";


function GestionarPlatos(){

    // Metodos a colocar en los filters para luego mandarlos a los alimentos
    return (
        <div className="admin-food-manager-container">
            <div className="admin-food-manager-navbar-header">
                <h1>GESTIONAR PLATO</h1>
                {/* Boton de notificaciones y perfil del usuario */}
                <Filtros />
            </div>
            <div className="admin-food-manager-filters">
                {/* Componente que presente los filtros respectivos */}
            </div>
            <div className="admin-food-manager-menu">
                {/* Componente que recibe todas las comidas filtradas para renderizar */}
            </div>

        </div>
    )
};


export default GestionarPlatos;
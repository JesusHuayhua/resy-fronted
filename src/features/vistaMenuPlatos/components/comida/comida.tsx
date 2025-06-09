
import "./comida.css"
import type { PlatoConDisponibilidad } from "../../services/obtenerPlatosDia";
// Declarar siempre un interface Props pa que TS no se loquee :v
interface Props{
    platoDia : PlatoConDisponibilidad | undefined;
}

function Comida({ platoDia }: Props) {
    if (!platoDia) return <div>Selecciona un plato</div>;

    return (
        <div className="food-card">
            <div className="image-container">
                <img src={platoDia.plato.getFoto()} alt={platoDia.plato.getNombre()} className="food-image" />
            </div>
            <div className="content-container">
                <p className="description">
                    {platoDia.plato.getDescripcion()}
                </p>
                <div className="bottom-info">
                    <div className="price-container">
                        <div className="price-icon">S/</div>
                        <span className="price">{platoDia.plato.getPrecio().toFixed(2)}</span>
                    </div>
                    <div className={`status ${platoDia.disponible ? 'disponible' : 'agotado'}`}>
                        {platoDia.disponible ? 'DISPONIBLE' : 'AGOTADO'}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Comida;
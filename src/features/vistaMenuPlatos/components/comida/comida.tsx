import "./comida.css"
import type { Plato } from "../../services/platosCatalogoService";

// Interfaz simplificada para el nuevo componente
interface Props {
    platoDia: { plato: Plato; cantidad: number } | undefined;
}

function Comida({ platoDia }: Props) {
    if (!platoDia) return <div>Selecciona un plato</div>;
    const disponible = platoDia.cantidad >= 0;
    return (
        <div className="food-card">
            <div className="image-container">
                <img src={platoDia.plato.Info.Imagen} alt={platoDia.plato.Info.Descripcion} className="food-image" />
            </div>
            <div className="content-container">
                <p className="description">
                    {platoDia.plato.Info.Descripcion}
                </p>
                <div className="bottom-info">
                    <div className="price-container">
                        <div className="price-icon">S/</div>
                        <span className="price">{platoDia.plato.Info.Precio.toFixed(2)}</span>
                    </div>
                    <div className={`status ${disponible ? 'disponible' : 'agotado'}`}>
                        {disponible ? 'DISPONIBLE' : 'AGOTADO'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comida;
import type { PlatoConCantidadAsignada } from "../../../vistaMenuPlatos/hooks/useMenuHooks";
import "./Alimento.css";

interface Props {
  comida: PlatoConCantidadAsignada;
}

export default function AlimentoAdmin({ comida }: Props) {
  const { plato, cantidad } = comida;

  // Estado: disponible | limitado | agotado
  const estado = !plato.Info.Estado || cantidad === 0
    ? "agotado"
    : cantidad <= 2
      ? "limitado"
      : "disponible";

  const dotColor = {
    disponible: "#28a745",
    limitado:   "#ffc107",
    agotado:    "#dc3545"
  }[estado];

  const statusText = {
    disponible: "Disponible",
    limitado:   "Limitado",
    agotado:    "Agotado"
  }[estado];

  const availabilityText = estado === "agotado"
    ? "0 disponibles"
    : `${cantidad} disponibles`;

  return (
    <div className="admin-container">
      <div className={`food-card ${estado}`}>
        <div className="food-image-container">
          <img
            className="food-image"
            src={plato.Info.Imagen}
            alt={`Imagen de ${plato.Info.NombrePlato}`}
            onError={e => (e.currentTarget.src = '/images/placeholder-food.jpg')}
          />
        </div>

        <div className="food-info">
          <h3 className="food-name" title={plato.Info.NombrePlato}>
            {plato.Info.NombrePlato}
          </h3>
          <div className="food-details">
            <span className="food-price">
              $ {plato.Info.Precio.toFixed(2)}
            </span>
            <div className="availability-count">
              <span
                className={`availability-dot ${estado}`}
                style={{ backgroundColor: dotColor }}
              />
              <span>{availabilityText}</span>
            </div>
          </div>
          <button
            className={`food-status status-${estado}`}
            disabled={estado === "agotado"}
            onClick={() => console.log(`Estado de ${plato.Info.NombrePlato}: ${statusText}`)}
          >
            {statusText}
          </button>
        </div>
      </div>
    </div>
  );
}

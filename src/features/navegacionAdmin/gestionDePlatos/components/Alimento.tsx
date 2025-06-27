import type { PlatoConDisponibilidad } from "../../../vistaMenuPlatos/services/obtenerPlatosDia";
import "./Alimento.css";

interface Props {
  comida: PlatoConDisponibilidad;
}

function Alimento(props: Props) {
  // Extraemos el plato y la disponibilidad del objeto combinado
  const plato = props.comida.plato;
  const cantidad = props.comida.cantidad;

  // Determina el estado visual según activo + stock
  const getEstadoVisual = (): 'disponible' | 'limitado' | 'agotado' => {
    if (!plato.getEstado()) return 'agotado';
    if (cantidad === 0) return 'agotado';
    if (cantidad <= 2) return 'limitado';
    return 'disponible';
  };

  const estado = getEstadoVisual();

  const getDotColor = () => {
    switch (estado) {
      case 'disponible': return '#28a745';
      case 'limitado':   return '#ffc107';
      case 'agotado':    return '#dc3545';
    }
  };

  const getStatusText = () => {
    switch (estado) {
      case 'disponible': return 'Disponible';
      case 'limitado':   return 'Limitado';
      case 'agotado':    return 'Agotado';
    }
  };

  const getAvailabilityText = () =>
    estado === 'agotado' ? '0 disponibles' : `${cantidad} disponibles`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = '/images/placeholder-food.jpg';
  };

  const handleStatusClick = () => {
    console.log(`Estado de ${plato.getNombre()}: ${getStatusText()}`);
  };

  return (
    <div className={`food-card ${
      estado === 'agotado' ? 'agotado' : estado === 'limitado' ? 'limitado' : ''
    }`}>
      {/* Imagen */}
      <div className="food-image-container">
        <img
          className="food-image"
          src={plato.getFoto()}
          alt={`Imagen de ${plato.getNombre()}`}
          onError={handleImageError}
        />
      </div>

      {/* Información */}
      <div className="food-info">
        <h3
          className="food-name"
          title={plato.getNombre()}
        >
          {plato.getNombre()}
        </h3>

        {/* Precio + disponibilidad */}
        <div className="food-details">
          <span className="food-price">
            $ {plato.getPrecio().toFixed(2)}
          </span>

          <div className="food-availability">
            <div className="availability-count">
              <span
                className="availability-dot"
                style={{ backgroundColor: getDotColor() }}
              ></span>
              <span className="availability-text">
                {getAvailabilityText()}
              </span>
            </div>
          </div>
        </div>

        {/* Botón de estado */}
        <button
          className={`food-status status-${estado}`}
          onClick={handleStatusClick}
          disabled={estado === 'agotado'}
        >
          {getStatusText()}
        </button>
      </div>
    </div>
  );
}

export default Alimento;

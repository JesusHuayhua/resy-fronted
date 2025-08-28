import type { Categoria } from "../../../vistaMenuPlatos/services/categoriaMenuService";
import type { Plato } from "../../../vistaMenuPlatos/services/platosCatalogoService";
import "./Alimento.css";

interface Props {
  plato: Plato;
  categorias: Categoria[] | null;
  setModalEditarOpen: (active: boolean) => void;
  setPlatoSeleccionado: (plato: Plato) => void;
}

function AlimentoEditar({ plato, categorias, setModalEditarOpen, setPlatoSeleccionado }: Props) {
  const estado = plato.Info.Estado;
  const statusText = estado ? "ACTIVO" : "INACTIVO";

  return (
    <div className="admin-container">
      {/* Use your existing food-card class structure */}
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

          {/* Modified food-details to have horizontal Estado and Categoria */}
          <div className="food-details food-details-horizontal">
            <div className="food-status-info">
              <span>Estado: </span>
              <span className={`status-badge ${estado ? 'status-active' : 'status-inactive'}`}>
                {statusText}
              </span>
            </div>
            <div className="food-category-info">
              <span>Categoría: </span>
              <span>{categorias ? categorias.find((cat) => cat.IDCategoria === plato.Info.Categoria)?.Info.Nombre : "Plato"}</span>
            </div>
          </div>

          {/* Botón con la nueva clase food-edit-button */}
          <button className="food-edit-button" onClick={() => {
            setModalEditarOpen(true)
            setPlatoSeleccionado(plato)
          }}>
            ✏️ EDITAR PLATO
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlimentoEditar;
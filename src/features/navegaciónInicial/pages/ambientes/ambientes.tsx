import './ambientes.css';
import Header from '../../components/header/header';
import HeaderLogged from '../../components/header/HeaderLogged';
import bg from '../../../../assets/background.avif';
import img1 from '../../../../assets/comedorPrincipal.avif';
import img2 from '../../../../assets/entradaRestaurante.avif';
import { useState } from 'react';
import { useUser } from '../../../user/context/UserContext';

const ambientes = [
  { titulo: 'Puerta Principal', imagen: img1 },
  { titulo: 'Comedor Principal', imagen: img2 },
];

function Ambientes() {
  const { user } = useUser();
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const next = () => setIndex((i) => (i + 1) % ambientes.length);
  const prev = () => setIndex((i) => (i === 0 ? ambientes.length - 1 : i - 1));
  const toggleZoom = () => setZoom((z) => !z);

  const leftIndex = index === 0 ? ambientes.length - 1 : index - 1;
  const rightIndex = (index + 1) % ambientes.length;

  return (
    <div className="ambientes-bg" style={{ backgroundImage: `url(${bg})` }}>
      {user ? <HeaderLogged /> : <Header />}
      <div className="ambientes-content">
        <h2 className="ambientes-titulo">Ambientes</h2>
        <hr className="ambientes-separador" />

        <div className="ambiente-carrusel-centro">
          <div className="ambiente-lateral ambiente-izq" onClick={prev}>
            <img src={ambientes[leftIndex].imagen} alt={ambientes[leftIndex].titulo} />
          </div>

          <div className="ambiente-principal" onClick={toggleZoom}>
            <div className="ambiente-nombre">{ambientes[index].titulo}</div>
            <img
              src={ambientes[index].imagen}
              alt={ambientes[index].titulo}
              className={zoom ? 'ambiente-img zoom' : 'ambiente-img'}
            />
          </div>

          <div className="ambiente-lateral ambiente-der" onClick={next}>
            <img src={ambientes[rightIndex].imagen} alt={ambientes[rightIndex].titulo} />
          </div>
        </div>

        <div className="ambiente-flechas">
          <button className="ambiente-arrow" onClick={prev}>←</button>
          <button className="ambiente-arrow" onClick={next}>→</button>
        </div>
      </div>
    </div>
  );
}

export default Ambientes;

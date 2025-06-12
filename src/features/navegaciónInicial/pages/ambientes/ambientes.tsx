import './ambientes.css'
import Header from '../../components/header/header'
import bg from '../../../../assets/background.avif'
import img1 from '../../../../assets/1.avif'
import img2 from '../../../../assets/2.avif'
import { useState } from 'react'

const ambientes = [
  {
    titulo: 'Puerta Principal',
    imagen: img1,
  },
  {
    titulo: 'Comedor Principal',
    imagen: img2,
  },
]

function Ambientes() {
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)

  const next = () => setIndex((i) => (i + 1) % ambientes.length)
  const prev = () => setIndex((i) => (i === 0 ? ambientes.length - 1 : i - 1))
  const toggleZoom = () => setZoom((z) => !z)

  // Para mostrar los ambientes laterales
  const leftIndex = (index === 0 ? ambientes.length - 1 : index - 1)
  const rightIndex = (index + 1) % ambientes.length

  return (
    <div
      className="ambientes-bg"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Header />
      <div className="ambientes-content">
        <h2 className="ambientes-titulo">Ambientes</h2>
        <hr className="ambientes-separador" />
        <div className="ambiente-carrusel-centro" style={{position: 'relative', minHeight: 440}}>
          {/* Ambiente izquierdo desenfocado */}
          <div className="ambiente-lateral ambiente-lateral-izq" onClick={() => setIndex(leftIndex)} style={{cursor: 'pointer'}}>
            <img
              src={ambientes[leftIndex].imagen}
              alt={ambientes[leftIndex].titulo}
            />
          </div>
          {/* Ambiente derecho desenfocado */}
          <div className="ambiente-lateral ambiente-lateral-der" onClick={() => setIndex(rightIndex)} style={{cursor: 'pointer'}}>
            <img
              src={ambientes[rightIndex].imagen}
              alt={ambientes[rightIndex].titulo}
            />
          </div>
          {/* Ambiente principal */}
          <div className="ambiente-principal">
            <div className="ambiente-nombre">{ambientes[index].titulo}</div>
            <div className="ambiente-img-container">
              <img
                src={ambientes[index].imagen}
                alt={ambientes[index].titulo}
                className={`ambiente-img${zoom ? ' zoom' : ''}`}
                onClick={toggleZoom}
                title={zoom ? 'Alejar' : 'Zoom'}
              />
              {/* 
              <span className="ambiente-zoom-icon" onClick={toggleZoom}>
                {zoom ? '🔍-' : '🔍+'}
              </span>
              */}
            </div>
          </div>
        </div>
        {/* Flechas debajo */}
        <div className="ambiente-flechas">
          <button className="ambiente-arrow" onClick={prev}>
            &#8592;
          </button>
          <button className="ambiente-arrow" onClick={next}>
            &#8594;
          </button>
        </div>
      </div>
    </div>
  )
}

export default Ambientes
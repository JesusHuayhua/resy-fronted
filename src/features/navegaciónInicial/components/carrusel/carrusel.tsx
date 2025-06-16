import './carrusel.css'
import { useState } from 'react'

// Importa las imágenes enumeradas en formato .avif
import image1 from '../../../../assets/1.avif'
import image2 from '../../../../assets/2.avif'


const images = [image1, image2]

function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    )
  }

  return (
    <div
      className="carrusel-bg"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <button className="carrusel-btn prev" onClick={prevImage}>
        ‹
      </button>
      <button className="carrusel-btn next" onClick={nextImage}>
        ›
      </button>
    </div>
  )
}

export default Carrusel

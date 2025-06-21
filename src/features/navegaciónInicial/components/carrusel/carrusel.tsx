import React, { useState, useEffect } from 'react'
import image1 from '../../../../assets/1.avif'
import image2 from '../../../../assets/2.avif'
import logo from '../../../../assets/logo.webp'

const images: string[] = [image1, image2]

const Carrusel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Cambio automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number): void => {
    setCurrentIndex(index)
  }

  return (
        <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >

      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="h-48 md:h-60 object-contain z-10"
      />


      {/* Puntos indicadores */}
      <div className="absolute bottom-6 flex gap-3 z-10">
        {images.map((_, index: number) => (
          <div
            key={index}
            className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg shadow-white/50'
                : 'bg-white/40 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Carrusel

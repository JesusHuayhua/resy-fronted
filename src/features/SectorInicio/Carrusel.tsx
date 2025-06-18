// src/features/SectorInicio/Carrusel.tsx
import React, { useEffect, useState } from 'react';
import './Carrusel.css'

// Definir un tipo para las imágenes
interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // Funciones para cambiar la imagen manualmente
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    // Funcion para cambiar la imagen cada 10 segundos
    useEffect(() => {
        const intervalId = setInterval(() => {
            goToNext(); // Cambia a la siguiente imagen automáticamente
        }, 10000); // 10000 ms = 10 segundos

        return () => clearInterval(intervalId); // Limpieza cuando el componente se desmonta
    }, [images.length]);
    //Para que tenga los puntos interactivos en la parte inferior
    const goToIndex = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel">
            <button className="carousel__button prev" onClick={goToPrevious}>
                &lt;
            </button>
            <div className="carousel__image-container">
                <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
            </div>
            <button className="carousel__button next" onClick={goToNext}>
                &gt;
            </button>
            <div className="carousel__indicators">
                {images.map((_, index) => (
                <span
                key={index}
                className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToIndex(index)}
                />))}
            </div>
            <div className="logo-lado-Izquierdo">
                <div className="logo-fijo">
                    <img src="/src/assets/logo.png" alt="Logo Salon Verde" />
                </div>
            </div>
        </div>
    );
};

export default Carousel;
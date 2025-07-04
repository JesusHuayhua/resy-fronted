import React, { useState } from 'react';
import { useReservation } from '../../../context/ReservationContext';

interface Step3HoraProps {
  onNext: () => void;
  onBack: () => void;
}

const hours = [
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30"
];

const Step3Hora: React.FC<Step3HoraProps> = ({ onNext, onBack }) => {
  const { setData, data } = useReservation();
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleSelect = (hour: string) => {
    setSelectedTime(hour);
    setData({ hora: hour });
    setTimeout(() => {
      onNext();
    }, 150);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between">      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-12 flex flex-col">
        <h1 className="text-white text-5xl md:text-6xl font-light mb-8 tracking-wide">Hora</h1>
        
        <div className="grid grid-cols-4 gap-y-16 gap-x-12 justify-items-center mb-12 mt-16">
          {hours.map((hour) => (
            <button
              key={hour}
              onClick={() => handleSelect(hour)}
              className={`relative text-white text-4xl md:text-5xl font-light focus:outline-none transition-all duration-300 transform hover:scale-105 px-4 py-2 rounded-lg
                ${selectedTime === hour 
                  ? 'font-normal shadow-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30' 
                  : 'hover:bg-white hover:bg-opacity-5 hover:backdrop-blur-sm'
                }
              `}
              style={{ 
                background: selectedTime === hour 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'transparent',
                backdropFilter: selectedTime === hour ? 'blur(10px)' : 'none',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {hour}
              {selectedTime === hour && (
                <div className="absolute inset-0 rounded-lg border-2 border-white border-opacity-50 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative z-10 w-full px-6 pb-6 flex flex-col">
        <div className="flex flex-row justify-between text-sm text-gray-300 mb-3">
          <a href="#" className="hover:text-white transition-colors duration-200 underline underline-offset-2">
            Términos y condiciones
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200 underline underline-offset-2">
            Políticas y privacidad
          </a>
        </div>
        <p className="text-gray-200 text-center text-sm md:text-base leading-relaxed">
          Llegar entre 10 y 15 minutos antes de la hora indicada para garantizar una mejor atención.
        </p>
      </div>
    </div>
  );
};

export default Step3Hora;
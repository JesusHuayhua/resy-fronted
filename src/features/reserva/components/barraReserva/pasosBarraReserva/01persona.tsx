import React, { useState } from 'react';

interface PersonaSelectorProps {
  onNext: () => void;
  backgroundImg: string;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onNext, backgroundImg }) => {
  const [selectedPersona, setSelectedPersona] = useState<number | null>(null);
  const [hoveredPersona, setHoveredPersona] = useState<number | null>(null);

  const handlePersonaSelect = (number: number) => {
    setSelectedPersona(number);
    setTimeout(() => {
      onNext();
    }, 150);
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image desde prop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImg})`
        }}
      />
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col justify-center items-center">
        
        {/* Header section */}
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 tracking-wide drop-shadow-2xl">
            Personas
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-md mx-auto drop-shadow-lg">
            Selecciona tu persona ideal para comenzar tu experiencia
          </p>
        </div>

        {/* Number Grid */}
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-sm md:max-w-md">
            
            {/* Numbers 1-9 */}
            {numbers.slice(0, 9).map((number) => (
              <button
                key={number}
                onClick={() => handlePersonaSelect(number)}
                onMouseEnter={() => setHoveredPersona(number)}
                onMouseLeave={() => setHoveredPersona(null)}
                className={`
                  relative w-20 h-20 md:w-24 md:h-24 rounded-full border-3 
                  flex items-center justify-center text-2xl md:text-3xl font-bold
                  transition-all duration-300 ease-out transform
                  ${selectedPersona === number 
                    ? 'bg-white text-gray-800 border-white shadow-2xl scale-110' 
                    : hoveredPersona === number
                    ? 'bg-white/30 text-white border-white scale-105 shadow-xl backdrop-blur-sm'
                    : 'bg-black/40 text-white border-white/80 hover:border-white backdrop-blur-sm'
                  }
                `}
                style={{
                  boxShadow: selectedPersona === number 
                    ? '0 0 30px rgba(255, 255, 255, 0.8), 0 10px 25px rgba(0,0,0,0.4)' 
                    : hoveredPersona === number 
                    ? '0 0 20px rgba(255, 255, 255, 0.4), 0 8px 20px rgba(0,0,0,0.3)'
                    : '0 4px 15px rgba(0,0,0,0.3)'
                }}
              >
                <span className={`transition-all duration-300 drop-shadow-lg ${
                  hoveredPersona === number ? 'scale-110' : ''
                }`}>
                  {number}
                </span>
                
                {/* Ripple effect on selection */}
                {selectedPersona === number && (
                  <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75"></div>
                )}
              </button>
            ))}
            
            {/* Number 10 (centered) */}
            <div className="col-start-2 flex justify-center">
              <button
                onClick={() => handlePersonaSelect(10)}
                onMouseEnter={() => setHoveredPersona(10)}
                onMouseLeave={() => setHoveredPersona(null)}
                className={`
                  relative w-20 h-20 md:w-24 md:h-24 rounded-full border-3
                  flex items-center justify-center text-2xl md:text-3xl font-bold
                  transition-all duration-300 ease-out transform
                  ${selectedPersona === 10 
                    ? 'bg-white text-gray-800 border-white shadow-2xl scale-110' 
                    : hoveredPersona === 10
                    ? 'bg-white/30 text-white border-white scale-105 shadow-xl backdrop-blur-sm'
                    : 'bg-black/40 text-white border-white/80 hover:border-white backdrop-blur-sm'
                  }
                `}
                style={{
                  boxShadow: selectedPersona === 10 
                    ? '0 0 30px rgba(255, 255, 255, 0.8), 0 10px 25px rgba(0,0,0,0.4)' 
                    : hoveredPersona === 10 
                    ? '0 0 20px rgba(255, 255, 255, 0.4), 0 8px 20px rgba(0,0,0,0.3)'
                    : '0 4px 15px rgba(0,0,0,0.3)'
                }}
              >
                <span className={`transition-all duration-300 drop-shadow-lg ${
                  hoveredPersona === 10 ? 'scale-110' : ''
                }`}>
                  10
                </span>
                
                {/* Ripple effect on selection */}
                {selectedPersona === 10 && (
                  <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer instruction */}
        <div className="text-center mt-12">
          <p className="text-white text-sm md:text-base opacity-90 drop-shadow-lg">
            Haz clic en el número de tu persona preferida
          </p>
          {selectedPersona && (
            <div className="mt-4 animate-fade-in">
              <p className="text-white text-lg font-semibold drop-shadow-lg">
                Persona {selectedPersona} seleccionada ✨
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PersonaSelector;
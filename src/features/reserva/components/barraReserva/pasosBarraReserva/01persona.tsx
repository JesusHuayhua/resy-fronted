import React, { useState } from 'react';

interface PersonaSelectorProps {
  onNext: () => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ( {onNext}) => {
  const [selectedPersonas, setSelectedPersonas] = useState<number | null>(null);

  const handlePersonaSelect = (number: number) => {
    setSelectedPersonas(number);
    onNext();
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    // En lugar de className="relative w-full h-full..."
    <div className="relative w-full h-full flex items-center justify-center from-amber-900 via-amber-800 to-amber-900 overflow-y-auto">
      {/* Content */}
      <div className="w-full max-w-4xl mx-auto relative z-10 p-8 h-full flex flex-col justify-center">
        {/* Title */}
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-8 tracking-wide">
          Personas
        </h1>
        <hr className="border-gray-400 mb-8" />
        {/* Number Grid */}
        <div className="flex-1" style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-md justify-center flex">
            {/* First row: 1, 2, 3 */}
            {numbers.slice(0, 3).map((number) => (
              <button
                key={number}
                onClick={() => handlePersonaSelect(number)}
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white
                  flex items-center justify-center text-white text-xl md:text-2xl font-semibold
                  transition-all duration-300 hover:scale-110 hover:bg-white hover:text-amber-900
                  ${selectedPersonas === number 
                    ? 'bg-white text-amber-900 shadow-lg' 
                    : 'bg-transparent hover:shadow-xl'
                  }
                `}
              >
                {number}
              </button>
            ))}
            
            {/* Second row: 4, 5, 6 */}
            {numbers.slice(3, 6).map((number) => (
              <button
                key={number}
                onClick={() => handlePersonaSelect(number)}
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white
                  flex items-center justify-center text-white text-xl md:text-2xl font-semibold
                  transition-all duration-300 hover:scale-110 hover:bg-white hover:text-amber-900
                  ${selectedPersonas === number 
                    ? 'bg-white text-amber-900 shadow-lg' 
                    : 'bg-transparent hover:shadow-xl'
                  }
                `}
              >
                {number}
              </button>
            ))}
            
            {/* Third row: 7, 8, 9 */}
            {numbers.slice(6, 9).map((number) => (
              <button
                key={number}
                onClick={() => handlePersonaSelect(number)}
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white
                  flex items-center justify-center text-white text-xl md:text-2xl font-semibold
                  transition-all duration-300 hover:scale-110 hover:bg-white hover:text-amber-900
                  ${selectedPersonas === number 
                    ? 'bg-white text-amber-900 shadow-lg' 
                    : 'bg-transparent hover:shadow-xl'
                  }
                `}
              >
                {number}
              </button>
            ))}
            
            {/* Fourth row: 10 (centered) */}
            <div className="col-start-2">
              <button
                onClick={() => handlePersonaSelect(10)}
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white
                  flex items-center justify-center text-white text-xl md:text-2xl font-semibold
                  transition-all duration-300 hover:scale-110 hover:bg-white hover:text-amber-900
                  ${selectedPersonas === 10 
                    ? 'bg-white text-amber-900 shadow-lg' 
                    : 'bg-transparent hover:shadow-xl'
                  }
                `}
              >
                10
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaSelector;
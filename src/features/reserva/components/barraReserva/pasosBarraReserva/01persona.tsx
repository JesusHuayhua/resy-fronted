import React, { useState } from 'react';

interface Step1PersonasProps {
  onNext: () => void;
}

const Step1Personas: React.FC<Step1PersonasProps> = ({ onNext }) => {
  const [numPersons, setNumPersons] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes guardar el número de personas en un estado global (Context API, Redux)
    // o pasarlo al siguiente paso si es necesario.
    console.log('Número de personas:', numPersons);
    onNext(); // Avanza al siguiente paso
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Paso 1: ¿Cuántas personas?</h2>
      <label htmlFor="personas" className="block text-lg font-medium mb-2">
        Número de personas:
      </label>
      <input
        type="number"
        id="personas"
        min="1"
        value={numPersons}
        onChange={(e) => setNumPersons(parseInt(e.target.value))}
        className="border border-gray-300 p-2 rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default Step1Personas;
import React, { useState } from 'react';

interface Step2FechaProps {
  onNext: () => void;
  onBack: () => void;
}

const Step2Fecha: React.FC<Step2FechaProps> = ({ onNext, onBack }) => {
  const [selectedDate, setSelectedDate] = useState<string>(''); // Puedes usar Date si prefieres

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Fecha seleccionada:', selectedDate);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Paso 2: Selecciona la fecha</h2>
      <label htmlFor="fecha" className="block text-lg font-medium mb-2">
        Fecha:
      </label>
      <input
        type="date"
        id="fecha"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 transition-colors"
        >
          Atrás
        </button>
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

export default Step2Fecha;
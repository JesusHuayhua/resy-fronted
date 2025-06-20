import React, { useState } from 'react';
import NavBar from '../header/header';
import { FaUsers, FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import StepPersona from './pasosBarraReserva/01persona'
import StepFecha from './pasosBarraReserva/02fecha'
import StepHora from './pasosBarraReserva/03hora'
import StepDatos from './pasosBarraReserva/04datos';
import BackgroundImg from '../../../../assets/imagenesReserva/mesas.webp'

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { id: 1, label: 'Personas', icon: <FaUsers /> },
  { id: 2, label: 'Fecha', icon: <FaCalendarAlt /> },
  { id: 3, label: 'Hora', icon: <IoMdTime /> },
  { id: 4, label: 'Tus datos', icon: <FaUserEdit /> },
];
const BarraReserva: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const renderStepContent = () =>{
    switch (currentStep) {
      case 1:
        return <StepPersona onNext={() => setCurrentStep(currentStep + 1)} backgroundImg={BackgroundImg} />;
      case 2:
        return <StepFecha onNext={() => setCurrentStep(currentStep + 1)} />;
      case 3:
        return <StepHora onNext={() => setCurrentStep(currentStep + 1)} onBack={() => setCurrentStep(currentStep - 1)} />;
      case 4:
        return <StepDatos onBack={() => setCurrentStep(currentStep - 1)} />;
      default:
        return null;
    }
  }
  // Calcular el ancho de la línea de progreso
  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {/* Barra de progreso */}
      <div className="w-full bg-white p-6 shadow-md flex justify-center">
        <div className="w-3/4 sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3">
          {/* Contenedor de pasos */}
          <div className="relative flex justify-between items-center ">
            {/* Pasos */}
            {steps.map((step) => {
              const isActive = currentStep >= step.id;
              
              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`
                    relative z-20 flex flex-col items-center cursor-pointer transition-all duration-300
                    ${isActive ? 'text-black' : 'text-gray-400'}
                  `}
                >
                  {/* Círculo del paso */}
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-black text-white' 
                        : 'bg-gray-300 text-gray-600'
                      }
                      hover:scale-110
                    `}
                  >
                  <span>{step.icon}</span>
                  </div>
                  
                  {/* Etiqueta del paso */}
                  <span className={`text-sm font-medium mt-2 ${isActive ? 'text-black' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Línea de progreso debajo */}
          <div className="relative">
            {/* Línea de fondo (gris) */}
            <div className="w-full h-0.5 bg-gray-300"></div>
            
            {/* Línea de progreso (negra) */}
            <div 
              className="absolute top-0 left-0 h-0.5 bg-black transition-all duration-500 ease-in-out"
              style={{
                width: `${progressWidth}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mx-auto h-screen" style={{ backgroundImage: `url(${BackgroundImg})`, backgroundPosition: 'center' }}>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default BarraReserva;
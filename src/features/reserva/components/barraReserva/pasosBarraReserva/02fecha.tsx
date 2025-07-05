import React, { useState, useEffect } from 'react';
import { useReservation } from '../../../context/ReservationContext';

interface DayInfo {
  name: string;
  date: number;
  isPast: boolean;
  isToday: boolean;
}
interface CalendarSelectorProps {
  onNext: () => void;
}
const WeeklyCalendar: React.FC<CalendarSelectorProps> = ( {onNext}) => {
  const [weekDays, setWeekDays] = useState<DayInfo[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { setData } = useReservation();

  const dayNames = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    
    setCurrentMonth(monthNames[monday.getMonth()]);
    
    const days: DayInfo[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      
      days.push({
        name: dayNames[i],
        date: date.getDate(),
        isPast,
        isToday
      });
    }
    
    setWeekDays(days);
  }, []);

  const handleDayClick = (index: number) => {
    if (!weekDays[index].isPast) {
      setSelectedDay(index);
      const fecha = `${weekDays[index].date} ${currentMonth}`;
      setData({ fecha });
      onNext();
    }
  };

  return (
    <div className="relative text-white w-full h-full flex items-center justify-center from-amber-900 via-amber-800 to-amber-900 overflow-hidden">
      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full p-4 md:p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider">Fecha</h1>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider">{currentMonth}</h1>
        </div>

        {/* Línea gris separadora */}
        <div className="w-full h-0.5 bg-gray-400 mb-4" />

        {/* Calendar Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 w-full mb-6 md:mb-8 flex-1">
          {/* First Row */}
          {weekDays.slice(0, 3).map((day, index) => (
            <div
              key={index}
              onClick={() => handleDayClick(index)}
              className={`
                text-center p-2 md:p-4 rounded-lg transition-all duration-300 cursor-pointer
                ${day.isPast 
                  ? 'opacity-80 cursor-not-allowed bg-gray-800/20' 
                  : 'hover:bg-white/10 bg-black/30'
                }
                ${selectedDay === index ? 'bg-white/20 scale-105' : ''}
                ${day.isToday ? 'ring-2 ring-amber-500' : ''}
                flex flex-col justify-center
              `}
            >
              <div className={`text-xs md:text-lg font-bold mb-1 md:mb-2 ${day.isPast ? 'text-black-500' : 'text-white'}`}>
                {day.name}
              </div>
              <div className={`text-2xl md:text-4xl font-light ${day.isPast ? 'text-black-600' : 'text-white'}`}>
                {day.date.toString().padStart(2, '0')}
              </div>
            </div>
          ))}
          
          {/* Second Row */}
          {weekDays.slice(3, 6).map((day, index) => (
            <div
              key={index + 3}
              onClick={() => handleDayClick(index + 3)}
              className={`
                text-center p-2 md:p-4 rounded-lg transition-all duration-300 cursor-pointer
                ${day.isPast 
                  ? 'opacity-40 cursor-not-allowed bg-gray-800/20' 
                  : 'hover:bg-white/10 bg-black/30'
                }
                ${selectedDay === index + 3 ? 'bg-white/20 scale-105' : ''}
                ${day.isToday ? 'ring-2 ring-amber-500' : ''}
                 flex flex-col justify-center
              `}
            >
              <div className={`text-xs md:text-lg font-bold mb-1 md:mb-2 ${day.isPast ? 'text-black-500' : 'text-white'}`}>
                {day.name}
              </div>
              <div className={`text-2xl md:text-4xl font-light ${day.isPast ? 'text-black-600' : 'text-white'}`}>
                {day.date.toString().padStart(2, '0')}
              </div>
            </div>
          ))}
          
          {/* Third Row - Sunday centered */}
          <div></div>
          {weekDays.slice(6, 7).map((day, index) => (
            <div
              key={index + 6}
              onClick={() => handleDayClick(index + 6)}
              className={`
                text-center p-2 md:p-4 rounded-lg transition-all duration-300 cursor-pointer
                ${day.isPast 
                  ? 'opacity-40 cursor-not-allowed bg-gray-800/20' 
                  : 'hover:bg-white/10 bg-black/30'
                }
                ${selectedDay === index + 6 ? 'bg-white/20 scale-105' : ''}
                ${day.isToday ? 'ring-2 ring-amber-500' : ''}
                 flex flex-col justify-center
              `}
            >
              <div className={`text-xs md:text-lg font-bold mb-1 md:mb-2 ${day.isPast ? 'text-black-500' : 'text-white'}`}>
                {day.name}
              </div>
              <div className={`text-2xl md:text-4xl font-light ${day.isPast ? 'text-black-600' : 'text-white'}`}>
                {day.date.toString().padStart(2, '0')}
              </div>
            </div>
          ))}
          <div></div>
        </div>
        {/* Footer */}
          <div className="flex flex-row justify-center space-x-4 text-xs md:text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors underline">Términos y condiciones</a>
            <p className="text-xs md:text-base text-gray-300 mx-4 mb-0">
              Reservas de 2 o más días por favor comunícate con nosotros a través de nuestras redes sociales o llamando directamente al restaurante.
            </p>
            <a href="#" className="hover:text-white transition-colors underline">Políticas y privacidad</a>
          </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
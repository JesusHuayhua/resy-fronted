import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useState, useRef, useEffect } from 'react';

// Configurar plugins de dayjs para manejo de semanas
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

interface DateRange {
  start: string;
  end: string;
}

interface WeeklyDateRangePickerProps {
  date: Dayjs | null;
  setDate: (date: Dayjs) => void;
  onDateChange?: (range: DateRange) => void;
  placeholder?: string;
}

const WeeklyDateRangePicker: React.FC<WeeklyDateRangePickerProps> = ({ 
  date,
  setDate,
  onDateChange, 
  placeholder = "Seleccionar semanas" 
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [firstWeekSelected, setFirstWeekSelected] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para obtener el inicio de la semana (lunes)
  const getWeekStart = (date: Dayjs): Dayjs => {
    // Usamos isoWeekday() donde 1 = lunes, 7 = domingo
    return date.startOf('isoWeek');
  };

  // Función para obtener el final de la semana (domingo)
  const getWeekEnd = (date: Dayjs): Dayjs => {
    return date.endOf('isoWeek');
  };

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generar días del mes con información de semana (organizados lunes a domingo)
  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Convertir domingo (0) a 7 para que lunes sea 1, martes 2, etc.
    // Esto nos permite calcular correctamente los espacios vacíos para una semana que empieza en lunes
    const startingDayOfWeek = firstDay.getDay();
    const mondayBasedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    
    const daysInMonth = lastDay.getDate();
    const days: (Date | null)[] = [];
    
    // Días vacíos del mes anterior (calculados para semana que empieza en lunes)
    for (let i = 0; i < mondayBasedStartDay; i++) {
      days.push(null);
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  // Verificar si una fecha está en el rango seleccionado
  const isDateInRange = (date: Date): boolean => {
    if (!startDate || !endDate || !date) return false;
    
    const dateString = dayjs(date).format('YYYY-MM-DD');
    return dayjs(dateString).isAfter(dayjs(startDate)) && dayjs(dateString).isBefore(dayjs(endDate));
  };

  // Verificar si una fecha es el inicio de una semana seleccionada
  const isWeekStart = (date: Date): boolean => {
    if (!startDate || !date) return false;
    const dateString = dayjs(date).format('YYYY-MM-DD');
    return dateString === startDate;
  };

  // Verificar si una fecha es el final de una semana seleccionada
  const isWeekEnd = (date: Date): boolean => {
    if (!endDate || !date) return false;
    const dateString = dayjs(date).format('YYYY-MM-DD');
    return dateString === endDate;
  };

  // Verificar si una fecha está en una semana seleccionada completa
  const isInSelectedWeek = (date: Date): boolean => {
    if (!startDate || !endDate || !date) return false;
    
    const dateString = dayjs(date).format('YYYY-MM-DD');
    const checkDate = dayjs(dateString);
    const rangeStart = dayjs(startDate);
    const rangeEnd = dayjs(endDate);
    
    // Usar métodos básicos de comparación que siempre están disponibles
    return (checkDate.isAfter(rangeStart) || checkDate.isSame(rangeStart)) && 
           (checkDate.isBefore(rangeEnd) || checkDate.isSame(rangeEnd));
  };

  const handleDateClick = (date: Date) => {
    const clickedDate = dayjs(date);
    
    // Obtener el inicio y fin de la semana seleccionada
    const weekStart = getWeekStart(clickedDate);
    const weekEnd = getWeekEnd(clickedDate);
    
    if (!firstWeekSelected) {
      // Primera semana seleccionada
      const startDateString = weekStart.format('YYYY-MM-DD');
      const endDateString = weekEnd.format('YYYY-MM-DD');
      
      setStartDate(startDateString);
      setEndDate(endDateString);
      setFirstWeekSelected(true);
      
      // Actualizar el prop date con el inicio de la semana
      setDate(weekStart);
      
      // Llamar callback si existe
      if (onDateChange) {
        onDateChange({
          start: startDateString,
          end: endDateString
        });
      }
    } else {
      // Segunda semana o más - expandir el rango
      const currentStart = dayjs(startDate);
      const currentEnd = dayjs(endDate);
      
      // Determinar si la nueva semana está antes o después del rango actual
      let newStart: Dayjs;
      let newEnd: Dayjs;
      
      if (weekStart.isBefore(currentStart)) {
        // La nueva semana está antes del rango actual
        newStart = weekStart;
        newEnd = currentEnd;
      } else if (weekEnd.isAfter(currentEnd)) {
        // La nueva semana está después del rango actual
        newStart = currentStart;
        newEnd = weekEnd;
      } else {
        // La semana ya está en el rango, reiniciar con solo esta semana
        newStart = weekStart;
        newEnd = weekEnd;
      }
      
      const newStartString = newStart.format('YYYY-MM-DD');
      const newEndString = newEnd.format('YYYY-MM-DD');
      
      setStartDate(newStartString);
      setEndDate(newEndString);
      
      // Actualizar el prop date con el inicio del rango
      setDate(newStart);
      
      // Llamar callback si existe
      if (onDateChange) {
        onDateChange({
          start: newStartString,
          end: newEndString
        });
      }
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const displayValue = (): string => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      
      // Calcular número de semanas
      const weeksDiff = end.diff(start, 'week') + 1;
      const weeksText = weeksDiff === 1 ? 'semana' : 'semanas';
      
      return `${formatDate(startDate)} - ${formatDate(endDate)} (${weeksDiff} ${weeksText})`;
    }
    return placeholder;
  };

  // Función para limpiar la selección
  const clearSelection = () => {
    setStartDate('');
    setEndDate('');
    setFirstWeekSelected(false);
  };

  return (
    <div ref={containerRef} className="admin-range-calendar-picker-container">
      <style>{`
        .admin-range-calendar-picker-container {
          position: relative;
          display: inline-block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .admin-range-calendar-picker-input {
          width: 320px;
          padding: 10px 40px 10px 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 14px;
          font-family: Inter;
          font-weight: bold;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        
        .admin-range-calendar-picker-input:hover {
          border-color: #3b82f6;
        }
        
        .admin-range-calendar-picker-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .admin-range-calendar-picker-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: #6b7280;
          pointer-events: none;
          stroke-width: 2.5;
        }
        
        .admin-range-calendar-picker-calendar {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
          background: white;
          border: 1px solid #e1e5e9;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          min-width: 320px;
          padding: 16px;
        }
        
        .admin-range-calendar-picker-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .admin-range-calendar-picker-nav-button {
          background: none;
          border: 1px solid #e1e5e9;
          border-radius: 6px;
          width: 32px;
          height: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .admin-range-calendar-picker-nav-button:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }
        
        .admin-range-calendar-picker-month-year {
          font-weight: 600;
          font-size: 16px;
          color: #1f2937;
        }
        
        .admin-range-calendar-picker-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 8px;
        }
        
        .admin-range-calendar-picker-weekday {
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          padding: 8px 0;
        }
        
        .admin-range-calendar-picker-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        
        .admin-range-calendar-picker-day {
          width: 36px;
          height: 36px;
          border: none;
          background: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          position: relative;
          font-weight: 500;
        }
        
        .admin-range-calendar-picker-day:hover {
          background: #eff6ff;
          transform: scale(1.05);
        }
        
        .admin-range-calendar-picker-day.admin-range-calendar-picker-day-start {
          background: #3b82f6;
          color: white;
          font-weight: 600;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        
        .admin-range-calendar-picker-day.admin-range-calendar-picker-day-end {
          background: #3b82f6;
          color: white;
          font-weight: 600;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        
        .admin-range-calendar-picker-day.admin-range-calendar-picker-day-in-week {
          background: #dbeafe;
          color: #1e40af;
          font-weight: 600;
        }
        
        .admin-range-calendar-picker-day.admin-range-calendar-picker-day-today {
          font-weight: bold;
          color: #10b981;
          background: #f0fdf4;
          border: 2px solid #10b981;
        }
        
        .admin-range-calendar-picker-day.admin-range-calendar-picker-day-today.admin-range-calendar-picker-day-in-week {
          background: #dbeafe;
          color: #1e40af;
          border: 2px solid #3b82f6;
        }
        
        .admin-range-calendar-picker-day:disabled {
          color: #d1d5db;
          cursor: not-allowed;
        }
        
        .admin-range-calendar-picker-instructions {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
        }
        
        .admin-range-calendar-picker-clear-button {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 12px;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.2s ease;
        }
        
        .admin-range-calendar-picker-clear-button:hover {
          background: #dc2626;
        }
      `}</style>
      
      <div className="admin-range-calendar-picker-input-wrapper">
        <input
          type="text"
          className="admin-range-calendar-picker-input"
          value={displayValue()}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder={placeholder}
        />
        <svg
          className="admin-range-calendar-picker-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>

      {isOpen && (
        <div className="admin-range-calendar-picker-calendar">
          <div className="admin-range-calendar-picker-header">
            <button
              className="admin-range-calendar-picker-nav-button"
              onClick={() => navigateMonth(-1)}
            >
              &#8249;
            </button>
            <div className="admin-range-calendar-picker-month-year">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button
              className="admin-range-calendar-picker-nav-button"
              onClick={() => navigateMonth(1)}
            >
              &#8250;
            </button>
          </div>

          <div className="admin-range-calendar-picker-weekdays">
            {dayNames.map(day => (
              <div key={day} className="admin-range-calendar-picker-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="admin-range-calendar-picker-days">
            {getDaysInMonth(currentMonth).map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="admin-range-calendar-picker-day" style={{visibility: 'hidden'}}></div>;
              }
              
              const isStart = isWeekStart(date);
              const isEnd = isWeekEnd(date);
              const inWeek = isInSelectedWeek(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                  className={`admin-range-calendar-picker-day ${
                    isStart ? 'admin-range-calendar-picker-day-start' : ''
                  } ${
                    isEnd ? 'admin-range-calendar-picker-day-end' : ''
                  } ${
                    inWeek && !isStart && !isEnd ? 'admin-range-calendar-picker-day-in-week' : ''
                  } ${
                    isToday ? 'admin-range-calendar-picker-day-today' : ''
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="admin-range-calendar-picker-instructions">
            {!firstWeekSelected 
              ? 'Haz clic en cualquier día para seleccionar la semana completa' 
              : 'Haz clic en otra semana para expandir el rango o en la misma para reiniciar'
            }
          </div>
          
          {firstWeekSelected && (
            <button 
              className="admin-range-calendar-picker-clear-button"
              onClick={clearSelection}
            >
              Limpiar selección
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Componente de ejemplo actualizado
interface FiltroRangeCalendarProps {
  date: Dayjs | null;
  setDate: (date: Dayjs) => void;
  setDateRange:  (start: Dayjs | null, end: Dayjs | null) => void;
}

const FiltroRangeCalendar: React.FC<FiltroRangeCalendarProps> = ({ date, setDate, setDateRange}) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);

  const handleDateChange = (range: DateRange) => {
    setSelectedRange(range);
    setDateRange(dayjs(range.start), dayjs(range.end));
  };

  return (
    <div style={{ padding: '20px' }}>
      <WeeklyDateRangePicker 
        date={date}
        setDate={setDate}
        onDateChange={handleDateChange}
        placeholder="Seleccionar semanas para menú"
      />

    </div>
  );
};

export default FiltroRangeCalendar;
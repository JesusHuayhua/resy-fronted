import React, { useState } from "react";
import "./CalendarioReservas.css";

const getTimeSlots = (start: string, end: string, interval: number) => {
  const slots: string[] = [];
  let [hour, minute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    const startHour = hour;
    const startMinute = minute;
    minute += interval;
    let endSlotHour = hour;
    let endSlotMinute = minute;
    if (endSlotMinute >= 60) {
      endSlotHour += 1;
      endSlotMinute -= 60;
    }
    const format = (h: number, m: number) => {
      const ampm = h < 12 ? "AM" : "PM";
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      const displayMinute = m.toString().padStart(2, "0");
      return `${displayHour}:${displayMinute} ${ampm}`;
    };
    slots.push(
      `${format(startHour, startMinute)} - ${format(endSlotHour, endSlotMinute)}`
    );
    hour = endSlotHour;
    minute = endSlotMinute;
  }
  return slots;
};

const ALL_SLOTS = getTimeSlots("9:00", "17:00", 30); // hasta las 5:00 pm

const VISIBLE_COLUMNS = 6;

const CalendarioReservas: React.FC = () => {
  const [startIdx, setStartIdx] = useState(0);

  const canScrollRight = startIdx + VISIBLE_COLUMNS < ALL_SLOTS.length;
  const canScrollLeft = startIdx > 0;

  const visibleSlots = ALL_SLOTS.slice(startIdx, startIdx + VISIBLE_COLUMNS);

  const handleRight = () => {
    if (canScrollRight) setStartIdx(startIdx + 1);
  };

  const handleLeft = () => {
    if (canScrollLeft) setStartIdx(startIdx - 1);
  };

  return (
    <div className="calendarioReservas-container">
      <h1 className="calendarioReservas-title">CALENDARIO DE RESERVAS</h1>
      <div className="calendarioReservas-scroll-row">
        {canScrollLeft && (
          <button className="calendarioReservas-arrow calendarioReservas-arrow-plain" onClick={handleLeft}>
            &lt;
          </button>
        )}
        <div className="calendarioReservas-grid">
          {visibleSlots.map((slot, idx) => (
            <div className="calendarioReservas-col" key={startIdx + idx}>
              <div className="calendarioReservas-slot-header">{slot}</div>
              <div className="calendarioReservas-slot-content"></div>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button className="calendarioReservas-arrow calendarioReservas-arrow-plain" onClick={handleRight}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarioReservas;
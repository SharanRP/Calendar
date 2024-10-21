import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, className }) => {
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className={`bg-gradient-to-r from-red-300 via-red-400 to-red-600 text-white rounded-lg p-4 shadow-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Calendar size={28} className="text-yellow-300 animate-pulse" />
          <h2 className="text-3xl font-bold tracking-tight">{monthYear}</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onPrevMonth}
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:-translate-x-1"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:translate-x-1"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
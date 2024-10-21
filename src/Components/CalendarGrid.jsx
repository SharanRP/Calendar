import React from 'react';
import { format, isSameMonth, isSameDay, isToday, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { Calendar, Star, ChevronRight } from 'lucide-react';

const CalendarGrid = ({ currentDate, events, onDateClick, onEventClick }) => {
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getEventColor = (event) => {
    const colors = ['bg-red-100 text-red-800', 'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800'];
    return colors[event.id % colors.length];
  };

  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded-lg shadow-lg">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="text-center font-semibold text-gray-500 py-2">
          {day}
        </div>
      ))}
      {daysInMonth.map((date) => (
        <div
          key={date.toString()}
          onClick={() => onDateClick(date)}
          className={`p-2 border rounded-lg transition-all duration-300 ease-in-out cursor-pointer
            ${isSameMonth(date, currentDate) ? 'bg-white hover:bg-red-50' : 'bg-gray-100 text-gray-400'}
            ${isToday(date) ? 'ring-2 ring-blue-300' : ''}
            ${isSameDay(date, currentDate) ? 'bg-red-100' : ''}
          `}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">{format(date, 'd')}</span>
            {isToday(date) && <Star size={16} className="text-yellow-400 animate-pulse" />}
          </div>
          {events
            .filter((event) => isSameDay(new Date(event.date), date))
            .slice(0, 2)
            .map((event) => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
                className={`text-xs p-1 mb-1 rounded truncate ${getEventColor(event)} 
                  transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`}
              >
                {event.title}
              </div>
            ))}
          {events.filter((event) => isSameDay(new Date(event.date), date)).length > 2 && (
            <div className="text-xs text-blue-500 flex items-center justify-end">
              <span className="mr-1">More</span>
              <ChevronRight size={12} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
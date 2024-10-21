import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Sun, Moon, Cloud, Clock, Thermometer, Wind } from 'lucide-react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import WeatherWidget from './WeatherWidget';
import SearchBar from './SearchBar';

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-white to-blue-200 flex flex-col items-center justify-center p-12 relative overflow-hidden transition-colors duration-1000">
      {/* Background elements */}
      <div className="absolute top-10 left-10 text-red-300 opacity-50 animate-float">
        <Calendar size={48} />
      </div>
      <div className="absolute bottom-10 right-10 text-yellow-400 opacity-50 animate-float-delay">
        <Sun size={64} />
      </div>
      <div className="absolute top-1/4 right-1/4 text-blue-300 opacity-30 animate-pulse">
        <Cloud size={32} />
      </div>
      <div className="absolute bottom-1/4 left-1/4 text-gray-300 opacity-40 animate-float">
        <Wind size={40} />
      </div>

        <div className="container mx-auto">
          <WeatherWidget />
        </div>


      {/* Main content */}
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl p-8 relative z-10 backdrop-blur-sm bg-opacity-80 mt-6">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={() => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}
          onNextMonth={() => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}
        />
        <div className="mb-6 mt-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <CalendarGrid
          currentDate={currentDate}
          events={events.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          onDateClick={(date) => {
            setSelectedDate(date);
            setIsModalOpen(true);
          }}
          onEventClick={(event) => {
            setEditingEvent(event);
            setSelectedDate(new Date(event.date));
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* Quick access buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="bg-white bg-opacity-80 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all duration-300">
          <Clock size={24} className="text-blue-500" />
        </button>
        <button className="bg-white bg-opacity-80 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all duration-300">
          <Calendar size={24} className="text-green-500" />
        </button>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        onAdd={(newEvent) => {
          setEvents(prevEvents => [...prevEvents, { ...newEvent, id: Date.now() }]);
          setIsModalOpen(false);
        }}
        onUpdate={(updatedEvent) => {
          setEvents(prevEvents => prevEvents.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
          ));
          setIsModalOpen(false);
        }}
        onDelete={(eventId) => {
          setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
          setIsModalOpen(false);
        }}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
      />

      <button
        onClick={() => {
          setSelectedDate(new Date());
          setIsModalOpen(true);
        }}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-full shadow-lg hover:from-red-600 hover:to-blue-600 transition transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default EventCalendar;

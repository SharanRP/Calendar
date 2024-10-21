import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import WeatherWidget from './WeatherWidget';
import SearchBar from './SearchBar';
import { FaPlusCircle } from 'react-icons/fa'; 

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load events from localStorage on initial render
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever they are updated
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('events', JSON.stringify(events));
    }
  }, [events]);

  // Function to handle adding a new event
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: Date.now() }]);
    setIsModalOpen(false);
  };

  // Function to handle updating an existing event
  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    setIsModalOpen(true);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-white to-blue-200 flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden transition-all duration-1000">
      {/* Weather Widget */}
      <div className="container mx-auto mb-4 md:mb-10 w-full">
        <WeatherWidget />
      </div>

      {/* Main content */}
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg md:max-w-6xl p-4 md:p-8 relative z-10 backdrop-blur-sm bg-opacity-90 mt-4 md:mt-6">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={() => setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}
          onNextMonth={() => setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}
        />

        <div className="mb-4 mt-2 md:mb-6 md:mt-4 flex items-center justify-between">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={() => {
              setEditingEvent(null); 
              setIsModalOpen(true); 
            }}
            className="text-blue-500 hover:text-blue-600 transition-all duration-300 focus:outline-none flex items-center space-x-2">
            <FaPlusCircle className="w-6 h-6" />
            <span>Add Event</span>
          </button>
        </div>

        <CalendarGrid
          currentDate={currentDate}
          events={events.filter((event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          onDateClick={(date) => {
            setSelectedDate(date);
            setEditingEvent(null);
            setIsModalOpen(true); 
          }}
          onEventClick={(event) => {
            setEditingEvent(event);  
            setSelectedDate(new Date(event.date));
            setIsModalOpen(true);   
          }}
        />
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null); 
        }}
        onAdd={handleAddEvent}
        onUpdate={handleUpdateEvent}
        onDelete={handleDeleteEvent}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
        events={events}
      />
    </div>
  );
};

export default EventCalendar;

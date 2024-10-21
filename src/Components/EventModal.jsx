import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EventModal = ({ isOpen, onClose, onAdd, onUpdate, onDelete, editingEvent, selectedDate, events = [] }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setEventTitle(editingEvent.title);
      setEventDescription(editingEvent.description);
    } else {
      setEventTitle('');
      setEventDescription('');
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      title: eventTitle,
      description: eventDescription,
      date: selectedDate,
    };
    if (editingEvent) {
      onUpdate({ ...eventData, id: editingEvent.id });
    } else {
      onAdd(eventData);
    }
    setEventTitle('');
    setEventDescription('');
    onClose();
  };

  // Filter events for the selected date
  const filteredEvents = events.filter(event => new Date(event.date).toDateString() === selectedDate?.toDateString());

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-700 to-gray-900 bg-opacity-70 transition-opacity duration-300" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative z-10 transform transition-all duration-300 ease-in-out scale-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none">
          <X size={28} />
        </button>
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          {editingEvent ? 'Edit Event' : 'Add New Event'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mb-4">
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            required
          />
          <textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          />
          <button
            type="submit"
            className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            {editingEvent ? 'Update' : 'Add'} Event
          </button>
        </form>

        {/* Event List */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Events for {selectedDate ? selectedDate.toLocaleDateString() : '...'}
        </h3>
        {filteredEvents.length > 0 ? (
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2 mb-4">
            {filteredEvents.map(event => (
              <div key={event.id} className="flex justify-between items-center p-2 border-b border-gray-200">
                <div>
                  <strong>{event.title}</strong>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdate(event)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No events planned for this day.</p>
        )}
      </div>
    </div>
  );
};

export default EventModal;

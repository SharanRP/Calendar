import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EventModal = ({ isOpen, onClose, onAdd, onUpdate, onDelete, editingEvent, selectedDate }) => {
  const [eventTitle, setEventTitle] = useState(editingEvent ? editingEvent.title : '');
  const [eventDescription, setEventDescription] = useState(editingEvent ? editingEvent.description : '');

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
  };

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
        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            {editingEvent && (
              <button
                type="button"
                onClick={() => onDelete(editingEvent.id)}
                className="px-5 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              {editingEvent ? 'Update' : 'Add'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

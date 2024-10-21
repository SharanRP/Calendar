import React from 'react';

const EventCard = ({ event, onEditEvent }) => (
  <div
    className="mt-2 p-1 bg-blue-100 text-xs rounded truncate cursor-pointer hover:bg-blue-200"
    onClick={(e) => {
      e.stopPropagation();
      onEditEvent();
    }}
  >
    {event.title}
  </div>
);

export default EventCard;


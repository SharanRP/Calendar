import React, { useState } from 'react';
import { Search, X, Heart } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, className }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex items-center bg-white rounded-full transition-all duration-300 ease-in-out ${
          isFocused ? 'shadow-lg ring-2 ring-red-300' : 'shadow'
        }`}
      >
        <Search
          size={20}
          className={`absolute left-3 transition-all duration-300 ${
            isFocused ? 'text-red-500' : 'text-red-300'
          }`}
        />
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full py-2 pl-10 pr-10 bg-transparent text-red-700 placeholder-red-300 focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-red-300 hover:text-red-500 transition-colors duration-300"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <Heart 
        size={16} 
        className={`absolute -top-2 -right-2 text-red-400 transition-all duration-300 ${
          isFocused ? 'opacity-100 animate-bounce' : 'opacity-0'
        }`}
      />
      <div 
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/4 h-0.5 bg-gradient-to-r from-transparent via-red-300 to-transparent transition-opacity duration-300 ease-in-out" 
        style={{ opacity: isFocused ? 1 : 0 }} 
      />
    </div>
  );
};

export default SearchBar;
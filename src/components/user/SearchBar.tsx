import React, { useState } from 'react';
import { MapPin, Search, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (from: string, to: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to) {
      onSearch(from, to);
    }
  };

  const suggestions = [
    'Tech Park', 'City Mall', 'Railway Station', 'Airport', 
    'University', 'Hospital', 'Bus Stand', 'Market Junction'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500 text-left flex-1">Where to?</span>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From Field */}
            <div className="relative">
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                <input
                  type="text"
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Pick-up location"
                  list="from-suggestions"
                />
                <datalist id="from-suggestions">
                  {suggestions.map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* To Field */}
            <div className="relative">
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
                <input
                  type="text"
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Drop-off location"
                  list="to-suggestions"
                />
                <datalist id="to-suggestions">
                  {suggestions.map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button type="submit" className ="flex-1 bg-[#304159] text-white py-3 rounded-lg hover:bg-[#253141] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
>
  Search Buses
</button>

            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setFrom('');
                setTo('');
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
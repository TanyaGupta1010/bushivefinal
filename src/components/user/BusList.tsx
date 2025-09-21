import React, { useState } from 'react';
import { Clock, Navigation, Users } from 'lucide-react';

// Define the shape of the bus data for type safety
interface Bus {
  id: number;
  busNumber: string;
  route: string;
  eta: string;
  currentLocation: string;
  capacity: { current: number; total: number; };
  driver: string;
}

// Assuming these are your props
interface BusListProps {
  buses: Bus[];
  onBusSelect: (bus: Bus) => void;
  selectedBus: Bus | null;
}

const BusList: React.FC<BusListProps> = ({ buses, onBusSelect, selectedBus }) => {
  const selectedBusId = selectedBus?.id;

  return (
    <div className="space-y-4">
      {buses.map((bus) => (
        <div
          key={bus.id}
          className={`
            p-6 rounded-lg shadow-md transition-colors duration-200
            ${selectedBusId === bus.id ? 'bg-green-200 border border-green-500' : 'bg-white border border-gray-200'}
          `}
        >
          {/* Bus Info */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-gray-900">{bus.busNumber}</h4>
              <p className="text-sm text-gray-600">{bus.route}</p>
            </div>
            <span className="text-xs text-green-600 font-semibold">Available</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>ETA: {bus.eta}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Navigation className="w-4 h-4 text-blue-500" />
              <span>{bus.currentLocation}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                bus.capacity.current / bus.capacity.total > 0.8
                  ? 'bg-red-100 text-red-800'
                  : bus.capacity.current / bus.capacity.total > 0.5
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {bus.capacity.current / bus.capacity.total > 0.8 ? 'High' : bus.capacity.current / bus.capacity.total > 0.5 ? 'Medium' : 'Low'}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => onBusSelect(bus)}
              className={`
                w-full py-2 rounded-lg text-sm font-medium
                transition-colors duration-200
                bg-[#304159] hover:bg-[#253141] text-white
              `}
            >
              Select Bus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusList;
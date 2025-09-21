import React from 'react';
import { Heart, Clock, Trash2 } from 'lucide-react';

const FavoritesList: React.FC = () => {
  const favorites = [
    {
      id: 1,
      busNumber: 'KL-07-AX-1234',
      route: 'Tech Park → City Mall',
      avgTime: '25 mins',
      lastUsed: '2 days ago'
    },
    {
      id: 2,
      busNumber: 'KL-07-BX-5678',
      route: 'University → Railway Station',
      avgTime: '18 mins',
      lastUsed: '1 week ago'
    },
    {
      id: 3,
      busNumber: 'KL-07-CX-9012',
      route: 'Airport → City Mall',
      avgTime: '35 mins',
      lastUsed: '3 days ago'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-500" />
          Your Favorite Buses
        </h3>
        <p className="text-sm text-gray-600">{favorites.length} saved buses</p>
      </div>

      <div className="divide-y divide-gray-200">
        {favorites.map((bus) => (
          <div key={bus.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{bus.busNumber}</h4>
                <p className="text-sm text-gray-600">{bus.route}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                  <Heart className="w-4 h-4 fill-current" />
                </button>
                <button className="p-1 text-gray-400 hover:bg-gray-100 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">{bus.avgTime}</span>
              </div>
              
              <div className="text-gray-500 text-xs">
                Last used: {bus.lastUsed}
              </div>
            </div>

            <button
              className="w-full mt-3 text-white py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
              style={{ backgroundColor: '#304159', hover: { backgroundColor: '#2b384c' } }}
            >
              Use This Route
            </button>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="p-12 text-center">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-600 mb-2">No favorites yet</h4>
          <p className="text-sm text-gray-500">
            Start using buses and add them to favorites for quick access
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
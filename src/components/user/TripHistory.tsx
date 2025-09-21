import React from 'react';
import { History, Calendar, Clock, MapPin } from 'lucide-react';

const TripHistory: React.FC = () => {
  const trips = [
    {
      id: 1,
      busNumber: 'KL-07-AX-1234',
      route: 'Tech Park → City Mall',
      date: '2024-01-15',
      time: '09:30 AM',
      status: 'Completed'
    },
    {
      id: 2,
      busNumber: 'KL-07-BX-5678',
      route: 'University → Railway Station',
      date: '2024-01-12',
      time: '02:15 PM',
      status: 'Completed'
    },
    {
      id: 3,
      busNumber: 'KL-07-CX-9012',
      route: 'Airport → City Mall',
      date: '2024-01-10',
      time: '07:45 AM',
      status: 'Completed'
    },
    {
      id: 4,
      busNumber: 'KL-07-DX-3456',
      route: 'Hospital → Bus Stand',
      date: '2024-01-08',
      time: '05:20 PM',
      status: 'Completed'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <History className="w-5 h-5 mr-2 text-blue-500" />
          Trip History
        </h3>
        <p className="text-sm text-gray-600">{trips.length} recent trips</p>
      </div>

      <div className="divide-y divide-gray-200">
        {trips.map((trip) => (
          <div key={trip.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{trip.busNumber}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span>{trip.route}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {trip.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">{trip.date}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">{trip.time}</span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs text-gray-500">Trip completed successfully</span>
            </div>
          </div>
        ))}
      </div>

      {trips.length === 0 && (
        <div className="p-12 text-center">
          <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-600 mb-2">No trips yet</h4>
          <p className="text-sm text-gray-500">
            Your travel history will appear here after your first trip
          </p>
        </div>
      )}
    </div>
  );
};

export default TripHistory;
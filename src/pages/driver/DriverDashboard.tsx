import React, { useState, useEffect } from 'react';
import { User, Bus, History, Calendar, Clock, Route, Star, ShieldCheck } from 'lucide-react';

const DriverDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock driver data
  const driverData = {
    name: 'Ravi Kumar',
    busNumber: 'KL-07-AX-1234',
    driverId: '1234',
    route: 'Tech Park → City Mall → Railway Station'
  };

  // Mock clock history
  const clockHistory = [
    { date: '2024-01-15', clockIn: '06:30 AM', clockOut: '02:30 PM', totalHours: '8:00' },
    { date: '2024-01-14', clockIn: '06:45 AM', clockOut: '02:45 PM', totalHours: '8:00' },
    { date: '2024-01-13', clockIn: '06:30 AM', clockOut: '02:15 PM', totalHours: '7:45' },
    { date: '2024-01-12', clockIn: '06:40 AM', clockOut: '02:40 PM', totalHours: '8:00' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header and Live Status Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Driver Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 col-span-2">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full bg-[#DBC2A6]">
                <User className="w-8 h-8 text-[#414a37]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#414a37]">{driverData.name}</h1>
                <p className="text-gray-600 font-medium mt-1">Driver ID: {driverData.driverId}</p>
                <div className="flex items-center space-x-2 text-[#99744a] mt-2">
                  <Bus className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold text-lg">{driverData.busNumber}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-[#414a37] mb-2">Current Route</h4>
              <p className="text-gray-600 text-sm">{driverData.route}</p>
            </div>
          </div>

          {/* Clock Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
            <Clock className="w-12 h-12 text-[#99744a] mb-4" />
            <div className="text-sm text-gray-600">{formatDate(currentTime)}</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#304159] tracking-tight mt-1">{formatTime(currentTime)}</div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Trips */}
          <div className="bg-white shadow-md rounded-t-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-slate-600 text-sm font-semibold">Total Trips</h3>
              <Route className="h-5 w-5 text-gray-400" />
            </div>
            <div className="px-6 pb-4">
              <p className="text-3xl font-bold text-[#414a37]">156</p>
            </div>
            <div className="bg-[#304159] text-center py-2">
              <span className="text-white font-medium">Lifetime</span>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white shadow-md rounded-t-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-slate-600 text-sm font-semibold">Average Rating</h3>
              <Star className="h-5 w-5 text-[#99744a]" />
            </div>
            <div className="px-6 pb-4">
              <p className="text-3xl font-bold text-[#414a37]">4.3</p>
            </div>
            <div className="bg-[#304159] text-center py-2">
              <span className="text-white font-semibold">Overall</span>
            </div>
          </div>

          {/* On-Time Performance */}
          <div className="bg-white shadow-md rounded-t-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-slate-600 text-sm font-semibold">On-Time Performance</h3>
              <ShieldCheck className="h-5 w-5 text-[#414a37]" />
            </div>
            <div className="px-6 pb-4">
              <p className="text-3xl font-bold text-[#414a37]">98%</p>
            </div>
            <div className="bg-[#304159] text-center py-2">
              <span className="text-white font-semibold">Overall</span>
            </div>
          </div>
        </div>

        {/* Clock History Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#414a37] mb-6 flex items-center space-x-2">
            <History className="w-5 h-5 text-[#99744a]" />
            <span>Clock History</span>
          </h2>
          <div className="space-y-4">
            {clockHistory.map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#99744a]" />
                    <span className="font-semibold text-[#414a37]">{day.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="font-medium text-[#414a37]">{day.totalHours}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">Clock In:</span>
                    <span className="font-medium">{day.clockIn}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">Clock Out:</span>
                    <span className="font-medium">{day.clockOut}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DriverDashboard;

import React, { useState } from 'react';
import {
  Search,
  Star,
  History,
  Navigation,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import SearchBar from '../../components/user/SearchBar';
import BusList from '../../components/user/BusList';
import MapView from '../../components/MapView';
import FavoritesList from '../../components/user/FavoritesList';
import TripHistory from '../../components/user/TripHistory';
import { useNavigate } from 'react-router-dom';

interface Bus {
  id: number;
  busNumber: string;
  route: string;
  eta: string;
  currentLocation: string;
  capacity: { current: number; total: number };
  driver: string;
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'favorites' | 'history'>('search');
  const [searchResults, setSearchResults] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [quickActionsVisible, setQuickActionsVisible] = useState(true);

  // Streak & ticket system
  const [streak, setStreak] = useState(0);
  const [animateStreak, setAnimateStreak] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  const [ticketPopup, setTicketPopup] = useState(false);
  const [busNumberInput, setBusNumberInput] = useState('');
  const [ticketNumberInput, setTicketNumberInput] = useState('');

  const navigate = useNavigate();

  const handleSearch = (from: string, to: string) => {
    const mockResults: Bus[] = [
      { id: 1, busNumber: 'KL-07-AX-1234', route: `${from} → ${to}`, eta: '5 mins', currentLocation: 'Near City Mall', capacity: { current: 32, total: 50 }, driver: 'Ravi Kumar' },
      { id: 2, busNumber: 'KL-07-BX-5678', route: `${from} → ${to}`, eta: '12 mins', currentLocation: 'Tech Park Junction', capacity: { current: 18, total: 45 }, driver: 'Suresh Nair' },
      { id: 3, busNumber: 'KL-07-CX-9012', route: `${from} → ${to}`, eta: '18 mins', currentLocation: 'Railway Station', capacity: { current: 41, total: 50 }, driver: 'Anil Joseph' }
    ];
    setSearchResults(mockResults);
    setSelectedBus(null);
    setQuickActionsVisible(false);
  };

  const handleBusSelect = (bus: Bus) => setSelectedBus(bus);

  const quickActions = [
    { icon: UserCheck, label: 'Update Capacity', color: 'text-orange-600 bg-orange-100', action: 'updateCapacity' },
    { icon: AlertCircle, label: 'Report Delay', color: 'text-red-600 bg-red-100', action: 'reportDelay' }
  ];

  const handleQuickAction = (action?: string) => {
    if (action === 'updateCapacity') {
      const confirmed = window.confirm('Have you boarded the bus?\n\nClick OK for "Boarded Bus" or Cancel for "Not Boarded"');
      if (confirmed) alert('Thank you! Your boarding status has been updated to "Boarded Bus"');
      else alert('Thank you! Your boarding status has been updated to "Not Boarded"');
    } else if (action === 'reportDelay') {
      const delay = prompt('Please enter the delay in minutes:');
      if (delay && !isNaN(Number(delay))) alert(`Thank you! Delay of ${delay} minutes has been reported.`);
      else if (delay !== null) alert('Please enter a valid number for delay in minutes.');
    }
  };

  const handleVerifyStreak = () => {
    if (busNumberInput && ticketNumberInput) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setAnimateStreak(true);
      setBusNumberInput('');
      setTicketNumberInput('');
      setTimeout(() => setAnimateStreak(false), 1000);
    } else {
      alert('Please enter both Bus Number and Ticket Number.');
    }
  };

  const handleStreakButtonClick = () => {
    if (streak < 21) {
      setPopupMessage(`Keep going! Only ${21 - streak} more day(s) for a FREE reward! 🎉`);
    } else {
      const randomTicket = Math.floor(Math.random() * 1000) + 1;
      setTicketNumber(randomTicket);
      setTicketPopup(true);
    }
  };

  const closeTicketPopup = () => {
    setTicketPopup(false);
    setStreak(0);
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#ece6e1' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, User!</h1>
          <p className="text-gray-600">Where would you like to go today?</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'search', label: 'Search', icon: Search },
                { id: 'favorites', label: 'Favorites', icon: Star },
                { id: 'history', label: 'History', icon: History }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'search' && (
              <div className="space-y-6">
                <SearchBar onSearch={handleSearch} />

                {selectedBus && (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Location</h3>
                    <MapView selectedBus={selectedBus} />
                  </div>
                )}

                {searchResults.length > 0 && (
                  <BusList
                    buses={searchResults}
                    onBusSelect={handleBusSelect}
                    selectedBus={selectedBus}
                  />
                )}

                {quickActionsVisible && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action.action)}
                          className="flex items-center p-4 w-full rounded-lg border hover:shadow-md transition-all duration-200"
                        >
                          <div className={`p-3 rounded-full ${action.color}`}>
                            <action.icon className="w-6 h-6" />
                          </div>
                          <span className="text-base font-medium text-gray-700 ml-4">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && <FavoritesList />}
            {activeTab === 'history' && <TripHistory />}
          </div>

          {/* Map/Side Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-[#304159]" />
                Live Updates
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-sm font-medium text-green-700">KL-07-AX-1234</p>
                  <p className="text-xs text-gray-600">Running on time • Next: Tech Park</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="text-sm font-medium text-orange-700">KL-07-BX-5678</p>
                  <p className="text-xs text-gray-600">2 mins delay • Next: City Mall</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="text-sm font-medium text-red-700">KL-07-CX-9012</p>
                  <p className="text-xs text-gray-600">5 mins delay • Traffic jam</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Floating Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="fixed bottom-6 right-6 bg-[#304159] w-14 h-14 rounded-full shadow-lg text-white flex items-center justify-center text-2xl hover:bg-[#304159] transition-colors"
        >
          🔥
        </button>

        {/* Streak Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <h2 className="text-2xl font-bold text-[#304159] mb-4 flex justify-center items-center">
                Enter details for reward! 🎉
                <span className="ml-4">
                  <button
                    onClick={handleStreakButtonClick}
                    className="bg-[#304159] text-white px-3 py-1 rounded-md font-semibold hover:bg-[#304159] transition-colors"
                    type="button"
                  >
                    {streak}/21
                  </button>
                </span>
              </h2>
              <input
                type="text"
                placeholder="Bus Number"
                value={busNumberInput}
                onChange={(e) => setBusNumberInput(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Ticket Number"
                value={ticketNumberInput}
                onChange={(e) => setTicketNumberInput(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
              <button
                onClick={handleVerifyStreak}
                className="bg-[#304159] text-white py-2 px-4 rounded-lg hover:bg-[#304159] w-full mb-4"
              >
                Verify
              </button>

              {animateStreak && (
                <div
                  className="mt-4 text-5xl font-extrabold text-red-500"
                  style={{ animation: 'streakPop 0.8s forwards' }}
                >
                  🔥 {streak}!
                </div>
              )}

              {popupMessage && (
                <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-md font-semibold">
                  {popupMessage}
                  <button
                    className="ml-2 text-sm underline"
                    onClick={() => setPopupMessage('')}
                  >
                    Close
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              >
                ✖
              </button>
            </div>
          </div>
        )}

        {/* Ticket Popup */}
        {ticketPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congratulations! 🎉</h2>
              <p className="text-lg mb-2">Here’s your FREE ride ticket:</p>
              <p className="text-3xl font-extrabold text-[#304159] mb-4">{ticketNumber}</p>
              <button
                onClick={closeTicketPopup}
                className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes streakPop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.5); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default UserDashboard;

import React, { useState, useEffect } from 'react';
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

interface Bus {
    id: number;
    busNumber: string;
    route: string;
    eta: string;
    currentLocation: { lat: number; lng: number; };
    capacity: { current: number; total: number };
    driver: string;
}

const UserDashboard: React.FC = () => {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null);
    const [activeTab, setActiveTab] = useState<'search' | 'favorites' | 'history'>('search');
    const [searchResults, setSearchResults] = useState<Bus[]>([]);
    const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
    const [quickActionsVisible, setQuickActionsVisible] = useState(true);
    const [fromLocation, setFromLocation] = useState<{ lat: number; lng: number; } | null>(null);
    const [toLocation, setToLocation] = useState<{ lat: number; lng: number; } | null>(null);
    const [fromLocationName, setFromLocationName, ] = useState<string | null>(null);
    const [toLocationName, setToLocationName] = useState<string | null>(null);
    const [showMapAfterSearch, setShowMapAfterSearch] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [streak, setStreak] = useState(0);
    const [animateStreak, setAnimateStreak] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [ticketNumber, setTicketNumber] = useState<number | null>(null);
    const [ticketPopup, setTicketPopup] = useState(false);
    const [busNumberInput, setBusNumberInput] = useState('');
    const [ticketNumberInput, setTicketNumberInput] = useState('');
    const [searchError, setSearchError] = useState<string | null>(null);

    // Centralized bus stands data
    const busStands = {
        'Pari Chowk': { lat: 28.4648, lng: 77.5111 },
        'Alpha 1 ': { lat: 28.4685, lng: 77.5140 },
        'Knowledge Park III / LG Chowk': { lat: 28.4460, lng: 77.5445 },
        'Sector 16C ': { lat: 28.4722, lng: 77.5037 },
        'Omega II ': { lat: 28.4620, lng: 77.5120 },
        'Gaur City 1': { lat: 28.4405, lng: 77.5350 },
        "Bus Depot": {lat: 28.4452,lng: 77.5385},
        'Jagat Farm ': { lat: 28.4715, lng: 77.5218 },
        'Halduani Mode ': { lat: 28.4470, lng: 77.5400 },
        'Kasana': { lat: 28.4452, lng: 77.5385 },
        'Greater Noida - Zero Point (S)': { lat: 28.4610, lng: 77.5300 },
        'Botanical Garden Metro ': { lat: 28.5623, lng: 77.3110 },
        'Knowledge Park II': { lat: 28.4550, lng: 77.5300 },
        'Hauz Khas': { lat: 28.5529, lng: 77.1944 },
        'Noida City Centre': { lat: 28.5833, lng: 77.3400 },
        'Greater Noida Expressway': { lat: 28.5574, lng: 77.4100 },
        'Noida Sector 32': { lat: 28.5833, lng: 77.3400 },
        'Zero Point': { lat: 28.4610, lng: 77.5300 }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setSearchError("Could not get your location. Please enable location services.");
                }
            );
        } else {
            setSearchError("Geolocation is not supported by your browser.");
        }
    }, []);

    const findNearestBusStop = (currentLoc: { lat: number; lng: number }) => {
        let nearestStop = null;
        let minDistance = Infinity;

        for (const name in busStands) {
            const stop = busStands[name];
            const distance = Math.sqrt(
                Math.pow(currentLoc.lat - stop.lat, 2) + Math.pow(currentLoc.lng - stop.lng, 2)
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearestStop = { name, ...stop };
            }
        }
        return nearestStop;
    };

    const handleSearch = (to: string) => {
        setSearchError(null);
        if (!userLocation) {
            setSearchError("Your location is not available. Please wait or check your settings.");
            return;
        }

        const nearestFromStop = findNearestBusStop(userLocation);
        const destinationStop = busStands[to];

        if (!nearestFromStop || !destinationStop) {
            setSearchError(`A valid start or end bus stand was not found for "${to}".`);
            setSearchResults([]);
            setFromLocation(null);
            setToLocation(null);
            setFromLocationName(null);
            setToLocationName(null);
            setShowMapAfterSearch(false);
            return;
        }

        setFromLocation(nearestFromStop);
        setToLocation(destinationStop);
        setFromLocationName(nearestFromStop.name);
        setToLocationName(to);

        const allBuses = [
            {
                id: 1,
                busNumber: 'UP16AB1234',
                route: 'Pari Chowk → Knowledge Park III / LG Chowk',
                eta: '15 mins',
                currentLocation: { lat: 28.4660, lng: 77.5200 },
                capacity: { current: 32, total: 50 },
                driver: 'Rajesh Kumar',
            },
            {
                id: 2,
                busNumber: 'UP16CD5678',
                route: 'Alpha 1  → Omega II ',
                eta: '10 mins',
                currentLocation: { lat: 28.4650, lng: 77.5130 },
                capacity: { current: 18, total: 45 },
                driver: 'Sanjay Sharma',
            },
            {
                id: 3,
                busNumber: 'UP16EF9012',
                route: 'Sector 16C  → Gaur City 1 ',
                eta: '25 mins',
                currentLocation: { lat: 28.4550, lng: 77.5200 },
                capacity: { current: 41, total: 50 },
                driver: 'Praveen Singh',
            },
            {
                id: 4,
                busNumber: 'UP16GH3456',
                route: 'Knowledge Park III / LG Chowk → Pari Chowk',
                eta: '20 mins',
                currentLocation: { lat: 28.4500, lng: 77.5300 },
                capacity: { current: 25, total: 50 },
                driver: 'Amit Kumar',
            },
            {
              id: 5,
              busNumber: "UP16EF9012",
              route: "Omega II → Alpha 1 ",
              eta: "12 mins",
              currentLocation: { "lat": 28.4710, "lng": 77.5250 },
              capacity: { "current": 25, "total": 45 },
              driver: "Alok Singh"
            },
            {
              id: 6,
              busNumber: "UP16GH3456",
              route: "Gaur City 1 → Sector 16C",
              eta: "20 mins",
              currentLocation: { "lat": 28.4600, "lng": 77.5300 },
              capacity: { "current": 35, "total": 50 },
              driver: "Manoj Tiwari"
            },
            {
              id: 7,
              busNumber: 'UP16EF9012',
              route: 'Alpha 1 → Halduani Mode ',
              eta: '20 mins',
              currentLocation: { lat: 28.4650, lng: 77.5130 },
              capacity: { current: 18, total: 45 },
              driver: 'Sanjay Sharma',
            },
            {
            id: 8,
            busNumber: 'UP16GH3456',
            route: 'Halduani Mode B → Alpha 1 ',
            eta: '18 mins',
            currentLocation: { lat: 28.4480, lng: 77.5390 },
            capacity: { current: 25, total: 45 },
            driver: 'Alok Singh',
          },
          {
            id: 9,
            busNumber: 'UP16IJ7890',
            route: 'Sector 16C  → Knowledge Park III / LG Chowk',
            eta: '25 mins',
            currentLocation: { lat: 28.4700, lng: 77.5100 },
            capacity: { current: 41, total: 50 },
            driver: 'Praveen Singh',
          },
          {
            id: 10,
            busNumber: 'UP16KL1234',
            route: 'Knowledge Park III / LG Chowk → Sector 16C ',
            eta: '22 mins',
            currentLocation: { lat: 28.4450, lng: 77.5450 },
            capacity: { current: 35, total: 50 },
            driver: 'Manoj Tiwari',
          },
          {
            id: 11,
            busNumber: 'UP16MN5678',
            route: 'Omega II  → Gaur City 1 ',
            eta: '30 mins',
            currentLocation: { lat: 28.4600, lng: 77.5150 },
            capacity: { current: 28, total: 40 },
            driver: 'Vikram Yadav',
          },
          {
            id: 12,
            busNumber: 'UP16OP9012',
            route: 'Gaur City 1  → Omega II ',
            eta: '28 mins',
            currentLocation: { lat: 28.4410, lng: 77.5340 },
            capacity: { current: 19, total: 40 },
            driver: 'Dinesh Chandra',
          },
          {
            id: 13,
            busNumber: 'UP16QR3456',
            route: 'Bus Depot → Botanical Garden Metro',
            eta: '45 mins',
            currentLocation: { lat: 28.4450, lng: 77.5380 },
            capacity: { current: 48, total: 60 },
            driver: 'Anil Kumar',
          },
          {
            id: 14,
            busNumber: 'UP16ST7890',
            route: 'Botanical Garden Metro → Bus Depot',
            eta: '50 mins',
            currentLocation: { lat: 28.5620, lng: 77.3115 },
            capacity: { current: 55, total: 60 },
            driver: 'Rakesh Verma',
          },
           {
            id: 15,
            busNumber: 'UP16UV2345',
            route: 'Jagat Farm → Greater Noida - Zero Point (S)',
            eta: '12 mins',
            currentLocation: { lat: 28.4710, lng: 77.5215 },
            capacity: { current: 22, total: 35 },
            driver: 'Surendra Singh',
          },
          {
            id: 16,
            busNumber: 'UP16WX6789',
            route: 'Greater Noida - Zero Point (S) → Jagat Farm ',
            eta: '10 mins',
            currentLocation: { lat: 28.4615, lng: 77.5295 },
            capacity: { current: 15, total: 35 },
            driver: 'Sandeep Kumar',
          },
          {
            id: 17,
            busNumber: 'UP16AB1234',
            route: 'Knowledge Park II → Zero Point',
            eta: '10 mins',
            currentLocation: { lat: 28.4555, lng: 77.5310 },
            capacity: { current: 28, total: 50 },
            driver: 'Alok Gupta',
          },
          {
            id: 18,
            busNumber: 'UP16CD5678',
            route: 'Zero Point → Knowledge Park II',
            eta: '12 mins',
            currentLocation: { lat: 28.4600, lng: 77.5290 },
            capacity: { current: 35, total: 50 },
            driver: 'Vivek Sharma',
          },
            // Routes connecting Greater Noida to Delhi
          {
            id: 19,
            busNumber: 'DL1P8901',
            route: 'Greater Noida Expressway → Noida Sector 32',
            eta: '25 mins',
            currentLocation: { lat: 28.5600, lng: 77.4200 },
            capacity: { current: 40, total: 60 },
            driver: 'Sunil Kumar',
          },
          {
            id: 20,
            busNumber: 'DL1P9012',
            route: 'Noida Sector 32 → Greater Noida Expressway',
            eta: '20 mins',
            currentLocation: { lat: 28.5850, lng: 77.3380 },
            capacity: { current: 50, total: 60 },
            driver: 'Rajesh Singh',
          },
          {
            id: 21,
            busNumber: 'DL1C1234',
            route: 'Hauz Khas → Noida City Centre',
            eta: '45 mins',
            currentLocation: { lat: 28.5530, lng: 77.1950 },
            capacity: { current: 30, total: 45 },
            driver: 'Mukesh Yadav',
          },
          { 
            id: 22,
            busNumber: 'DL1C5678',
            route: 'Noida City Centre → Hauz Khas',
            eta: '50 mins',
            currentLocation: { lat: 28.5835, lng: 77.3410 },
            capacity: { current: 25, total: 45 },
            driver: 'Ravi Kumar',
          }
        ];

        // First, check for a direct bus that serves both origin and destination
        const filteredBuses = allBuses.filter(bus =>
            (bus.route.includes(nearestFromStop.name) && bus.route.includes(to)) ||
            (bus.route.includes(to) && bus.route.includes(nearestFromStop.name))
        );

        if (filteredBuses.length > 0) {
            setSearchResults(filteredBuses);
            setShowSuggestions(false);
        } else {
            // If no direct bus found, find alternatives
            const alternativeBuses = allBuses.filter(bus =>
                bus.route.includes(nearestFromStop.name) || bus.route.includes(to)
            );
            setSearchResults(alternativeBuses);
            setShowSuggestions(true);
        }

        setSelectedBus(null);
        setQuickActionsVisible(false);
        setShowMapAfterSearch(true);
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, User!</h1>
                    <p className="text-gray-600">Where would you like to go today?</p>
                </div>

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

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        {activeTab === 'search' && (
                            <div className="space-y-6">
                                <SearchBar onSearch={handleSearch} />

                                {searchError && (
                                    <div className="p-4 bg-red-100 text-red-700 rounded-md">
                                        {searchError}
                                    </div>
                                )}

                                <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Location</h3>
                                    <MapView
                                        userLocation={userLocation}
                                        fromLocation={fromLocation}
                                        toLocation={toLocation}
                                        fromLocationName={fromLocationName}
                                        toLocationName={toLocationName}
                                        selectedBus={selectedBus}
                                        buses={selectedBus ? [selectedBus] : []}
                                    />
                                </div>

                                {showMapAfterSearch && searchResults.length > 0 && (
                                    <>
                                        {showSuggestions ? (
                                            <div className="text-sm text-gray-600 p-2 border-l-4 border-yellow-500 bg-yellow-100">
                                                No direct bus found. Here are some buses that serve a part of your route.
                                            </div>
                                        ) : null}
                                        <BusList
                                            buses={searchResults}
                                            onBusSelect={handleBusSelect}
                                            selectedBus={selectedBus}
                                        />
                                    </>
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

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Navigation className="w-5 h-5 mr-2 text-[#304159]" />
                                Live Updates
                            </h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-green-500 pl-4">
                                    <p className="text-sm font-medium text-green-700">UP-16CD-5678</p>
                                    <p className="text-xs text-gray-600">Running on time • Next: Knowledge Park III</p>
                                </div>
                                <div className="border-l-4 border-orange-500 pl-4">
                                    <p className="text-sm font-medium text-orange-700">UP-16AB-1234</p>
                                    <p className="text-xs text-gray-600">2 mins delay • Next: Pari Chowk</p>
                                </div>
                                <div className="border-l-4 border-red-500 pl-4">
                                    <p className="text-sm font-medium text-red-700">UP-16EF-9012</p>
                                    <p className="text-xs text-gray-600">5 mins delay • Traffic jam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setShowPopup(true)}
                    className="fixed bottom-6 right-6 bg-[#304159] w-14 h-14 rounded-full shadow-lg text-white flex items-center justify-center text-2xl hover:bg-[#304159] transition-colors"
                >
                    🔥
                </button>

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
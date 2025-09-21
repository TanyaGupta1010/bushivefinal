import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Users, Shield, Smartphone, Bell } from 'lucide-react';
import LoginModal from './auth/LoginModal';

const BusTrackingLanding: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Section 1: Hero with Neural Network Style Animation */}
      <section className="relative h-screen md:h-[80vh] flex flex-col items-center justify-center overflow-hidden" style={{background: 'linear-gradient(to bottom right, #f8fafc, #ffffff, #fef7ed)'}}>
        {/* Background Gradients */}
       {/* Hero Content - Moved above animation */}
        <div className={`relative z-20 max-w-4xl text-center px-6 transform transition-all duration-1000 delay-300 mb-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Track your bus,{' '}
            <span 
              className="bg-clip-text text-transparent block md:inline mt-2 md:mt-0"
              style={{background: `linear-gradient(to right, #99744a, #414a37)`, WebkitBackgroundClip: 'text', backgroundClip: 'text'}}
            >
              smarter and faster
            </span>
          </h1>
        </div>

        {/* Container for lines and icon, centered */}
        <div className="relative w-full max-w-6xl h-[400px] md:h-[500px] mb-2 -mt-16 md:-mt-20">
          {/* Animated Lines from Center */}
          {[
            // Left lines
            { startX: '50%', startY: '50%', endX: '10%', endY: '15%', color: '#99744a', delay: 0 },
            { startX: '50%', startY: '50%', endX: '25%', endY: '20%', color: '#dbc2a6', delay: 1.1 },
            { startX: '50%', startY: '50%', endX: '15%', endY: '75%', color: '#414a37', delay: 0.3 },
            { startX: '50%', startY: '50%', endX: '8%', endY: '90%', color: '#99744a', delay: 1.3 },
            { startX: '50%', startY: '50%', endX: '7%', endY: '40%', color: '#dbc2a6', delay: 1.8 },
            { startX: '50%', startY: '50%', endX: '12%', endY: '25%', color: '#414a37', delay: 2.3 },

            // Top lines
            { startX: '50%', startY: '50%', endX: '38%', endY: '8%', color: '#dbc2a6', delay: 0.5 },
            { startX: '50%', startY: '50%', endX: '42%', endY: '17%', color: '#414a37', delay: 1 },

            // Right lines
            { startX: '50%', startY: '50%', endX: '75%', endY: '30%', color: '#99744a', delay: 1.5 },
            { startX: '50%', startY: '50%', endX: '83%', endY: '42%', color: '#dbc2a6', delay: 2 },
            { startX: '50%', startY: '50%', endX: '88%', endY: '58%', color: '#414a37', delay: 2.5 },
            { startX: '50%', startY: '50%', endX: '79%', endY: '75%', color: '#99744a', delay: 3 },

            // Bottom lines
            { startX: '50%', startY: '50%', endX: '38%', endY: '87%', color: '#dbc2a6', delay: 3.5 },
            { startX: '50%', startY: '50%', endX: '21%', endY: '83%', color: '#414a37', delay: 0.8 },
          ].map((line, index) => {
            const containerWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.9, 1152) : 1152;
            const containerHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? 400 : 500;
            
            const startX = containerWidth * (parseFloat(line.startX) / 100);
            const startY = containerHeight * (parseFloat(line.startY) / 100);
            const endX = containerWidth * (parseFloat(line.endX) / 100);
            const endY = containerHeight * (parseFloat(line.endY) / 100);
            
            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
            
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${startX}px`,
                  top: `${startY}px`,
                  width: `${length}px`,
                  height: '2px',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '0 50%',
                }}
              >
                <div className="absolute inset-0 bg-gray-200 opacity-30 rounded-full" />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, transparent 30%, ${line.color} 50%, transparent 70%, transparent 100%)`,
                    backgroundSize: '200% 100%',
                    animation: `waterFlow 3s linear infinite ${line.delay}s`,
                  }}
                />
              </div>
            );
          })}

          {/* Central Bus Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div>
              <div className="w-48 h-48 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dx0r0pbgb/image/upload/v1758448046/logo_u4xbmh.png"
                  alt="BusHive Logo"
                  className="w-46 h-46 md:w-46 md:h-48 object-contain"
                />
              </div>
            </div>
          </div>
          
        </div>

        {/* Subtitle and CTA - Below animation */}
        <div className={`relative z-20 max-w-4xl text-center px-6 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-2 leading-relaxed">
            Real-time bus tracking system for efficient public transportation management and enhanced passenger experience.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="/user/signup">
              <button 
                className={`px-6 md:px-8 py-3 md:py-4 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm md:text-base ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{
                  background: `linear-gradient(135deg, #414a37 0%, #99744a 100%)`,
                  transitionDelay: '800ms'
                }}
              >
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </a>
             <a href="/">  
              <button className="px-6 md:px-8 py-3 md:py-4 font-semibold transition-colors duration-300 text-sm md:text-base" style={{color: '#414a38'}}>
              About Us
              </button>
            </a> 
          </div>
        </div>
      </section>

      {/* Section 2: Features with 3D Flip Animation - Hidden on small screens */}
      <section className="hidden md:block relative h-screen py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{color: '#414a37'}}>
              Built for Modern Transit
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced features designed to streamline public transportation and improve passenger satisfaction
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center flex-1">
            {/* Feature Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="group">
                <div className="flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:bg-white">
                  <div className="p-3 rounded-lg" style={{backgroundColor: '#dbc2a6'}}>
                    <Clock className="w-6 h-6" style={{color: '#414a37'}} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{color: '#414a37'}}>Real-Time Tracking</h3>
                    <p className="text-gray-600">Live GPS tracking with accurate arrival predictions and route updates</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:bg-white">
                  <div className="p-3 rounded-lg" style={{backgroundColor: '#dbc2a6'}}>
                    <Users className="w-6 h-6" style={{color: '#414a37'}} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{color: '#414a37'}}>Passenger Management</h3>
                    <p className="text-gray-600">Efficient boarding, capacity monitoring, and passenger analytics</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:bg-white">
                  <div className="p-3 rounded-lg" style={{backgroundColor: '#dbc2a6'}}>
                    <Shield className="w-6 h-6" style={{color: '#414a37'}} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{color: '#414a37'}}>Secure & Reliable</h3>
                    <p className="text-gray-600">Enterprise-grade security with 99.9% uptime guarantee</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Flip Animation Image Placeholder */}
            <div className="relative">
              <div 
                className={`relative bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-1000 hover:scale-105 ${isVisible ? 'rotateX-0 opacity-100' : 'rotateX-90 opacity-0'}`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  transitionDelay: '400ms'
                }}
              >
                <div className="aspect-video rounded-xl overflow-hidden" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 mx-auto mb-4" style={{color: '#99744a'}} />
                      <p className="text-lg font-medium" style={{color: '#414a37'}}>Live Bus Dashboard</p>
                      <p className="text-sm text-gray-600 mt-2">Real-time visualization of fleet operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Grid Features - Hidden on small screens */}
      <section className="hidden md:block py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#414a37'}}>
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and features for complete transportation management
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Feature Card 1 - Web App */}
            <div className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl mb-4 md:mb-6 flex items-center justify-center" style={{backgroundColor: '#dbc2a6'}}>
                <Smartphone className="w-6 h-6 md:w-8 md:h-8" style={{color: '#414a37'}} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{color: '#414a37'}}>Web App</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Progressive web application accessible from any browser with intuitive interface and offline capabilities</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Real-time notifications
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Offline functionality
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Cross-platform support
                </div>
              </div>
            </div>

            {/* Feature Card 2 - Loyalty Rewards */}
            <div className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl mb-4 md:mb-6 flex items-center justify-center" style={{backgroundColor: '#dbc2a6'}}>
                <Bell className="w-6 h-6 md:w-8 md:h-8" style={{color: '#414a37'}} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{color: '#414a37'}}>Loyalty Rewards</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Continue using our bus service for consecutive days and earn a free one-day travel pass as a reward</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Free travel rewards
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Usage tracking
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Automatic rewards
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <div className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center" style={{backgroundColor: '#dbc2a6'}}>
                <MapPin className="w-8 h-8" style={{color: '#414a37'}} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#414a37'}}>Route Optimization</h3>
              <p className="text-gray-600 mb-6">Route planning and optimization for maximum efficiency</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Dynamic routing
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Traffic integration
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#99744a'}}></div>
                  Fuel optimization
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes rotateX {
          from {
            transform: perspective(1000px) rotateX(90deg);
          }
          to {
            transform: perspective(1000px) rotateX(0deg);
          }
        }
        .rotateX-0 {
          transform: perspective(1000px) rotateX(0deg);
        }
        .rotateX-90 {
          transform: perspective(1000px) rotateX(90deg);
        }
        
        @keyframes waterFlow {
          0% {
            background-position: -200% 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            background-position: 200% 0%;
            opacity: 0;
          }
        }

        @keyframes iconGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
    
  );
};


export default BusTrackingLanding;
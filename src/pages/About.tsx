import React from 'react';

const About: React.FC = () => {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-10">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{color: '#414a37'}}>
        About Us
      </h1>

      {/* Intro */}
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
        Welcome to <strong>BusHive</strong> – your smart and reliable public bus tracking partner.
      </p>
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
        We are building a platform that makes daily commuting simpler, faster, and stress-free. No more waiting at bus stops for hours or guessing when the next bus will arrive. With our live GPS integration from bus ticketing machines, you can now track buses in real-time, plan your journey better, and reach your destination on time.
      </p>

      {/* Mission Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{color: '#414a37'}}>Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          To make public transport smarter, transparent, and accessible for everyone by leveraging technology. We aim to reduce waiting times, improve reliability, and encourage more people to use eco-friendly public transport.
        </p>
      </div>

      {/* Key Features */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{color: '#414a37'}}>Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
          <li><strong>User Authentication:</strong> Secure sign-up/login for passengers, Aadhaar-based authentication for drivers.</li>
          <li><strong>Live Bus Tracking:</strong> Real-time GPS location of buses displayed on an interactive map.</li>
          <li><strong>Smart Search:</strong> Enter your “From” and “To” destinations to get nearby bus suggestions.</li>
          <li><strong>Personalized Profiles:</strong>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li><strong>For Users:</strong> Save personal details, favorite routes, and track your bus usage. Regular users also get a reward system – ride consistently for 2–3 weeks, and your next trip is free!</li>
              <li><strong>For Drivers:</strong> View profile details, driving history, clock-in/clock-out times, and assigned bus information.</li>
            </ul>
          </li>
          <li><strong>Driver Attendance Portal:</strong> A dedicated portal for clock-in/out records where admins can log driver attendance and working hours.</li>
        </ul>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{color: '#414a37'}}>Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
          <li>Accurate and real-time bus updates.</li>
          <li>Secure data handling for both users and drivers.</li>
          <li>Rewards for regular commuters.</li>
          <li>Transparency and efficiency for drivers and transport authorities.</li>
        </ul>
      </div>

      {/* Vision Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{color: '#414a37'}}>Our Vision</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          To transform the way people use public transport by creating a smarter, connected, and commuter-friendly bus ecosystem that saves time, builds trust, and encourages sustainable mobility.
        </p>
      </div>
    </div>
  );
};

export default About;

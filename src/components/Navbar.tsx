import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Route as RouteIcon, MapPin, Home, Mail, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Driver', href: '/driver/login', icon: <RouteIcon className="h-5 w-5" /> },
    { name: 'Live Map', href: '/map', icon: <MapPin className="h-5 w-5" /> },
    { name: 'Contact Us', href: '/contact', icon: <Mail className="h-5 w-5" /> },
    // { name: 'Register', href: '/user/signup', icon: <User className="h-5 w-5" /> },

  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-[#99744A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dx0r0pbgb/image/upload/v1758448036/logo1_qzpcys.jpg"
              alt="BusHive Logo"
              className="h-28 w-28 object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 text-[#99744A] hover:text-[#414A37] hover:scale-110"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <Link
              to="/user/signup"
              className="bg-[#414A37] text-[#DBC2A6] px-4 py-2 rounded-lg hover:bg-[#2F362C] transition-colors duration-200 flex items-center space-x-1"
            >
              <User className="w-4 h-4 text-[#DBC2A6]" />
              <span>Register</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-[#99744A] hover:text-[#414A37]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-white bg-opacity-75 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <div
          className={`relative z-50 bg-[#F7F2EB] w-full h-full transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col items-center justify-center p-8`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md text-[#414A37] hover:text-[#99744A]"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium text-[#414A37] hover:text-[#99744A] hover:scale-110 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="src/components/pages/auth/UserSignup.tsx"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center bg-[#414A37] text-[#DBC2A6] px-8 py-4 rounded-lg text-2xl font-bold hover:bg-[#2F362C]"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

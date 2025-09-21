import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, User, Phone, CreditCard, ArrowLeft, ShieldCheck, Star, Route } from 'lucide-react';

const DriverSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhaar: '',
    busNumber: '' // ✅ Added bus number
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Driver signup:', formData);
    navigate('/driver/verify-aadhaar', { state: { driverData: formData } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3').substr(0, 14);
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    setFormData({
      ...formData,
      aadhaar: formatted
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 bg-[#F7F2EB]">
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden md:flex bg-white">
        {/* Info Sidebar */}
        <div className="md:flex-1 bg-[#414a37] p-8 md:p-12 text-[#DBC2A6] relative flex flex-col justify-center">
          <div className="relative z-10">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#304159] mb-4">
              <Truck className="w-8 h-8 text-[#DBC2A6]" />
            </div>
            <h3 className="text-3xl font-bold mb-2">Join BusHive as a Driver</h3>
            <p className="text-lg opacity-90 mb-6">
              Register to start managing your bus operations and serving passengers.
            </p>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-center space-x-3">
                <Route className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>Manage Your Daily Routes</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>Track Performance Metrics</span>
              </li>
              <li className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>Secure Profile Verification</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="flex-1 p-8 md:p-12 relative">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[#99744a] hover:text-[#99744a]/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <h2 className="text-3xl font-bold text-[#414A37] mb-1">Driver Signup</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Create your account to start managing buses and routes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99744a] w-4 h-4" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99744a] w-4 h-4" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Bus Number ✅ */}
            <div>
              <label htmlFor="busNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Bus Number
              </label>
              <div className="relative">
                <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99744a] w-4 h-4" />
                <input
                  type="text"
                  id="busNumber"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your bus number (e.g. UP-16 AB 1234)"
                  required
                />
              </div>
            </div>

            {/* Aadhaar Number */}
            <div>
              <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-1">
                Aadhaar Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99744a] w-4 h-4" />
                <input
                  type="text"
                  id="aadhaar"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleAadhaarChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="XXXX-XXXX-XXXX"
                  maxLength={14}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your Aadhaar will be verified for security purposes.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#414A37] text-white py-3 rounded-lg hover:bg-[#2F362C] transition-colors duration-200 font-semibold text-sm flex items-center justify-center space-x-2"
            >
              <span>Continue to Verification</span>
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already registered?{' '}
              <Link to="/driver/login" className="text-[#99744a] hover:text-[#99744a]/80 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSignup;

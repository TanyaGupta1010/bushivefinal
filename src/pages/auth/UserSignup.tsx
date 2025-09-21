import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Truck, ArrowLeft, ShieldCheck, Star, Route } from 'lucide-react';

const UserSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/user/dashboard'); 
      } else {
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 bg-[#F7F2EB]">
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden md:flex bg-white">
        {/* Info Sidebar */}
        <div className="md:flex-1 bg-[#414a37] p-8 md:p-12 text-[#DBC2A6] relative flex flex-col justify-center">
          <div className="relative z-10">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#F7F2EB] mb-4">
              <User className="w-8 h-8 text-[#DBC2A6]" />
            </div>
            <h3 className="text-3xl font-bold mb-2">Join BusHive as a User</h3>
            <p className="text-lg opacity-90 mb-6">
              Create your account to start tracking buses and planning your journeys.
            </p>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-center space-x-3">
                <Route className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>Track Your Bus Routes</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>Plan Your Daily Journeys</span>
              </li>
              <li className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>Securely Manage Your Account</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="flex-1 p-6 md:p-8 relative">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[#99744a] hover:text-[#99744a]/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <h2 className="text-3xl font-bold text-[#414A37] mb-1">User Signup</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Create your account to start tracking buses and planning your journeys.
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99744a] w-4 h-4" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99744a] w-4 h-4" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#414A37] text-white py-3 rounded-lg hover:bg-[#2F362C] transition-colors duration-200 font-semibold text-sm flex items-center justify-center space-x-2"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/user/login" className="text-[#99744a] hover:text-[#99744a]/80 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;

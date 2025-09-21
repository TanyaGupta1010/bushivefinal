import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Phone, Lock, ArrowLeft, CreditCard, ShieldCheck, Star, Route } from 'lucide-react';

const DriverLogin: React.FC = () => {
  const [loginType, setLoginType] = useState<'phone' | 'driverId'>('phone');
  const [formData, setFormData] = useState({
    phoneOrId: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const loginData = {
      phoneOrId: formData.phoneOrId,
      password: formData.password
    };

    try {
      const res = await fetch('http://localhost:5000/api/drivers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Login successful:', data);
        // Save token/driver data here if needed
        navigate('/driver/dashboard');
      } else {
        const errData = await res.json();
        setError(errData.msg || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('A network error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
            <h3 className="text-3xl font-bold mb-2">Welcome Back, Driver</h3>
            <p className="text-lg opacity-90 mb-6">
              Sign in to access your dashboard, routes, and operational tools.
            </p>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-center space-x-3">
                <Route className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>Manage Your Daily Routes</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>View Performance Metrics</span>
              </li>
              <li className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#99744A] flex-shrink-0" />
                <span>Securely Access Your Profile</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="flex-1 p-8 md:p-12 relative">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[#99744a] hover:text-[#99744a]/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <h2 className="text-3xl font-bold text-[#414A37] mb-2">Driver Login</h2>
          <p className="text-gray-600 mb-8 text-sm">
            Please sign in to continue.
          </p>

          {/* Login Type Selector */}
          <div className="mb-6">
            <div className="flex rounded-xl bg-[#f7f2eb] p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setLoginType('phone')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  loginType === 'phone'
                    ? 'bg-white text-[#414a37] shadow-sm'
                    : 'text-gray-600 hover:text-[#414a37]'
                }`}
              >
                Phone Number
              </button>
              <button
                type="button"
                onClick={() => setLoginType('driverId')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  loginType === 'driverId'
                    ? 'bg-white text-[#414a37] shadow-sm'
                    : 'text-gray-600 hover:text-[#414a37]'
                }`}
              >
                Driver ID
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phoneOrId" className="block text-sm font-medium text-gray-700 mb-1">
                {loginType === 'phone' ? 'Phone Number' : 'Driver ID'}
              </label>
              <div className="relative">
                {loginType === 'phone' ? (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99744a] w-4 h-4" />
                ) : (
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99744a] w-4 h-4" />
                )}
                <input
                  type={loginType === 'phone' ? 'tel' : 'text'}
                  id="phoneOrId"
                  name="phoneOrId"
                  value={formData.phoneOrId}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder={loginType === 'phone' ? 'Enter your phone number' : 'Enter your Driver ID'}
                  required
                />
              </div>
            </div>

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
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#414A37] text-white py-3 rounded-lg hover:bg-[#2F362C] transition-colors duration-200 font-semibold text-sm flex items-center justify-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-t-white animate-spin"></div>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, Key, CheckCircle } from 'lucide-react';
import AuthCard from '../../components/AuthCard';

const SetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showDriverId, setShowDriverId] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const driverData = location.state?.driverData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Save driver data and show Driver ID
    setShowDriverId(true);
    
    // Auto-redirect to login after 5 seconds
    setTimeout(() => {
      navigate('/driver/login');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (showDriverId && driverData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16">
        <div className="container mx-auto px-4">
          <AuthCard
            title="Registration Complete!"
            subtitle="Your Driver ID has been generated successfully"
            icon={<CheckCircle className="w-8 h-8 text-[#304159]" />}
            variant="#304159"
          >
            <div className="space-y-6 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Key className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Driver ID</h3>
                <div className="bg-white border-2 border-green-300 rounded-lg p-4 inline-block">
                  <span className="text-3xl font-mono font-bold text-green-600">
                    {driverData.driverId}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Please save this ID. You'll need it to login.
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Name:</strong> {driverData.name}</p>
                <p><strong>Phone:</strong> {driverData.phone}</p>
                <p><strong>Driver ID:</strong> {driverData.driverId}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  You will be redirected to the login page in a few seconds...
                </p>
              </div>

              <button
                onClick={() => navigate('/driver/login')}
                className="w-full bg-[#304159] text-white py-3 rounded-lg hover:bg-[#2F362C] transition-colors duration-200 font-semibold"
              >
                Go to Login
              </button>
            </div>
          </AuthCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16">
      <div className="container mx-auto px-4">
        <AuthCard
          title="Set Your Password"
          subtitle="Create a secure password for your driver account"
          icon={<Lock className="w-8 h-8 text-[#304159]" />}
          variant="#304159"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Password Requirements:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• At least 6 characters long</li>
                <li>• Include both letters and numbers (recommended)</li>
                <li>• Avoid using personal information</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-[#304159] text-white py-3 rounded-lg hover:bg-[#2F362C] transition-colors duration-200 font-semibold"
            >
              Complete Registration
            </button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default SetPassword;
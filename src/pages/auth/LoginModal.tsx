import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, X } from 'lucide-react';

// You will also need to import AuthCard. Make sure the path is correct.
// Since AuthCard is in a different folder, you will likely need to adjust the path.
// For example: import AuthCard from '../AuthCard';
// If the path is relative to the new modal file, it might be ../components/AuthCard
// For this example, I'll assume it's one level up.
import UserLogin from './UserLogin';

// Define the props that the modal component will accept
interface LoginModalProps {
  onClose: () => void; // A function to close the modal
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/user/dashboard');
      } else {
        console.error('Login failed:', data.msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 m-4 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
        {/* The UserLogin form content is now inside the modal container */}
        <div className="flex items-center justify-center px-4 py-4">
          <div className="w-full max-w-sm">
            <UserLogin
              title={<span className="text-[#99744a] text-lg">Welcome Back, User!</span>}
              subtitle={<span className="text-gray-600 text-sm">Sign in to track your buses and plan your journey</span>}
              icon={
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[#414a37]">
                  <User className="w-6 h-6 text-[#ece6e1]" />
                </div>
              }
              className="p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Enter your email"
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
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ece6e1] text-[#414a37] py-2.5 rounded-lg hover:bg-[#ece6e1]/90 transition-colors duration-200 font-semibold text-sm"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-4 text-center text-sm">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <a href="/user/signup" className="text-[#99744a] hover:text-[#99744a]/80 font-semibold">
                    Sign up here
                  </a>
                </p>
              </div>
            </UserLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

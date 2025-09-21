import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';
import UserLogin from './pages/auth/UserLogin';
import UserSignup from './pages/auth/UserSignup';
import DriverLogin from './pages/auth/DriverLogin';
import UserDashboard from './pages/user/UserDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
// import CarpoolPage from './pages/user/CarpoolPage';
// import RoutePlannerPage from './pages/user/RoutePlannerPage';
// import FeedbackPage from './pages/user/FeedbackPage';
// import SettingsPage from './pages/user/SettingsPage';
import ContactUs from './components/ContactUS';
import Footer from './components/footer';
import About from './pages/About'; // adjust the path if About.tsx is in a different folder


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="/about" element={<About />} />

              {/* User Auth Routes */}
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/signup" element={<UserSignup />} />

              {/* Driver Auth Route */}
              <Route path="/driver/login" element={<DriverLogin />} />

              {/* General Routes */}
              <Route path="/contact" element={<ContactUs />} />
              <Route
                path="/map"
                element={<div className="flex justify-center items-center h-screen">Live Map Placeholder</div>}
              />

              {/* Dashboard Routes */}
              <Route path="/user/dashboard" element={<UserDashboard />} />
              {/* <Route path="/user/carpool" element={<CarpoolPage />} />
              <Route path="/user/route-planner" element={<RoutePlannerPage />} />
              <Route path="/user/feedback" element={<FeedbackPage />} />
              <Route path="/user/settings" element={<SettingsPage />} /> */}
              <Route path="/driver/dashboard" element={<DriverDashboard />} />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>

        {/* Footer Always Visible */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

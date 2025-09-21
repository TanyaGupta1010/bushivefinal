import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // ✅ New Twitter (X) icon

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ece6e1] text-[#99744a] py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-[#a09385] pb-8">
          {/* Logo + Tagline */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="https://res.cloudinary.com/dx0r0pbgb/image/upload/v1758448046/logo_u4xbmh.png"
              alt="BusHive Logo"
              className="w-28 h-auto"
            />
            <p className="text-sm text-center md:text-left">
              Track buses in real time with BusHive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[#83633e] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#83633e]">Home</a></li>
              <li><a href="#" className="hover:text-[#83633e]">Live Map</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-[#83633e] mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#83633e]">Contact us</a></li>
              <li><a href="#" className="hover:text-[#83633e]">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold text-[#83633e] mb-4">Connect With Us</h3>
            <div className="flex space-x-6 text-xl">
              <a href="https://facebook.com" className="hover:text-[#83633e]"><FaFacebook /></a>
              <a href="https://twitter.com" className="hover:text-[#83633e]"><FaXTwitter /></a> {/* ✅ Changed */}
              <a href="https://instagram.com" className="hover:text-[#83633e]"><FaInstagram /></a>
              <a href="https://linkedin.com" className="hover:text-[#83633e]"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-sm">
          <p>&copy; 2025 BusHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

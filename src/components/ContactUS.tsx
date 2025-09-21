import React, { useState } from 'react';
import { Mail, Send, ArrowLeft, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log('Contact form submitted:', formData);
    setIsSent(true);
    // In a real application, you would send this data to an API
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 bg-[#F7F2EB]">
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden md:flex md:flex-row-reverse bg-white">
        {/* Contact Form Section */}
        <div className="flex-1 p-8 md:p-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#414A37]">Get in Touch</h2>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-[#99744A] hover:text-[#99744a]/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {isSent ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-[#414A37]">Message Sent!</h3>
              <p className="text-gray-600 mt-2">
                Thank you for contacting us. We will get back to you shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-6 text-[#99744a] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744A] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744A] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#99744A] focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#414A37] text-white py-3 rounded-lg hover:bg-[#2F362C] transition-colors duration-200 font-semibold text-sm flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="md:flex-1 bg-[#DBC2A6] p-8 md:p-12 text-[#414A37] relative flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://placehold.co/800x600/DBC2A6/414A37?text=Bushive')" }}></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-lg">
              We're here to help you navigate your journey. Feel free to reach out to us through any of the following channels.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="flex-shrink-0 w-5 h-5 text-[#99744a] mt-1" />
                <div>
                  <h4 className="font-semibold">Email Us</h4>
                  <p className="text-sm">support@bushive.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="flex-shrink-0 w-5 h-5 text-[#99744a] mt-1" />
                <div>
                  <h4 className="font-semibold">Call Us</h4>
                  <p className="text-sm">+91 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="flex-shrink-0 w-5 h-5 text-[#99744a] mt-1" />
                <div>
                  <h4 className="font-semibold">Our Office</h4>
                  <p className="text-sm">123 Bus Lane, Transit City, BusHive 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default ContactUs;

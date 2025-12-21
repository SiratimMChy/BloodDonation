import React, { useState } from 'react';
import { Heart, Search, Phone, Mail, MapPin, Droplet, Users, Activity, Award, Clock, Shield } from 'lucide-react';
import { FaFacebook, FaHeart, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';
import { MdBloodtype } from 'react-icons/md';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative min-h-screen bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-red-50 via-white to-rose-50">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-linear(circle at 1px 1px, rgb(254 202 202 / 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative container mx-auto px-4 pt-5 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white border-2 border-red-100 px-4 md:px-5 py-2 md:py-3 rounded-full shadow-sm">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <Droplet className="text-red-600 fill-red-600" size={14} />
                </div>
                <span className="text-red-600 font-bold text-xs md:text-sm">Save Lives • Make Impact</span>
              </div>
              
              {/* Main Heading */}
              <div>
                <h1 className="text-4xl xl:text-6xl font-black text-gray-900 leading-none mb-3 md:mb-5">
                  Donate
                  <span className="block bg-linear-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mt-1 md:mt-2">
                    Blood
                  </span>
                </h1>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="h-1 w-12 md:w-20 bg-linear-to-r from-red-600 to-rose-600 rounded-full"></div>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-700">Give Life</p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl font-medium">
                Join our community of heroes making a real difference. Every donation saves up to three lives and brings hope to families in critical need.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-5 pt-2">
                <a 
                  href="/signup"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-linear-to-r from-red-600 to-red-700 text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:from-red-700 hover:to-red-800 transition-all shadow-xl shadow-red-200 hover:shadow-2xl hover:scale-105"
                >
                  <Heart size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                  <span>Join as a Donor</span>
                </a>
                <a 
                  href="/search"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-white text-red-600 px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Search size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                  <span>Search Donors</span>
                </a>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-4 md:pt-6 lg:pt-8">
                <div className="bg-white border-2 border-gray-100 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 hover:border-red-200 transition shadow-sm hover:shadow-lg">
                  <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                    <Users className="text-red-600" size={16} />
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">15K+</p>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold">Active Donors</p>
                </div>
                <div className="bg-white border-2 border-gray-100 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 hover:border-red-200 transition shadow-sm hover:shadow-lg">
                  <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                    <Heart className="text-red-600 fill-red-600" size={16} />
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">40K+</p>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold">Lives Saved</p>
                </div>
                <div className="bg-white border-2 border-gray-100 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 hover:border-red-200 transition shadow-sm hover:shadow-lg">
                  <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                    <Activity className="text-red-600" size={16} />
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">800+</p>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold">Blood Banks</p>
                </div>
              </div>
            </div>

            {/* Right Side - Image Grid */}
            <div className="relative mt-8 lg:mt-0 pb-16 lg:pb-0">
              {/* Main Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-red-500 to-rose-500 rounded-2xl md:rounded-3xl transform rotate-3"></div>
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=2016&auto=format&fit=crop" 
                    alt="Blood Donation"
                    className="w-full h-100h-[500px] md:h-137.5 lg:h-150 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
                  
                </div>
              </div>
              
              {/* Floating Info Card - Hidden on small screens, adjusted on medium */}
              <div className="hidden sm:block absolute -bottom-6 md:-bottom-8 left-4 md:-left-8 bg-white border-2 border-gray-100 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl max-w-70 md:max-w-xs">
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-red-500 to-red-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shrink-0">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-black text-gray-900">24/7</p>
                    <p className="text-xs md:text-sm text-gray-600 font-semibold">Emergency Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <Clock size={14} />
                  <span>Always ready to help</span>
                </div>
              </div>

              {/* Small Accent Card - Adjusted position for mobile */}
              <div className="absolute -top-4.5 md:top-12 -right-3.5 md:-right-6 bg-linear-to-br from-red-500 to-red-600 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl">
                <Droplet className="text-white fill-white mb-1 md:mb-2" size={24} />
                <p className="text-white font-bold text-xs md:text-sm">Every Drop</p>
                <p className="text-white/90 text-xs">Counts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Featured Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <span className="text-red-600 font-bold text-sm">WHY CHOOSE US</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and secure way to connect donors with those in need
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-red-200 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-200">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Register as Donor</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick and easy registration process. Sign up with your details, blood type, and location to join our life-saving community.
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-blue-200 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                <Search className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Find Blood Donors</h3>
              <p className="text-gray-600 leading-relaxed">
                Search for available donors by blood type, location, and district. Connect instantly when you need blood urgently.
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-green-200 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-200">
                <Droplet className="text-white fill-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Donate & Save Lives</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with recipients and schedule your donation. Every drop counts and can save up to three lives in your community.
              </p>
            </div>
          </div>

          {/* Why Donate Section */}
          <div className="bg-linear-to-br from-red-50 to-rose-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Why Donate Blood?
              </h3>
              <p className="text-lg text-gray-600">
                Your donation makes a real difference in saving lives
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="text-red-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">30 mins</h4>
                <p className="text-gray-600">Average donation time</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="text-red-600 fill-red-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">3 Lives</h4>
                <p className="text-gray-600">Can be saved per donation</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="text-red-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Free Health</h4>
                <p className="text-gray-600">Health screening included</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="text-red-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">100% Safe</h4>
                <p className="text-gray-600">Sterile equipment used</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="py-24 bg-linear-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <span className="text-red-600 font-bold text-sm">GET IN TOUCH</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600">
              We're here to help 24/7. Reach out anytime you need assistance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition h-32 resize-none"
                    required
                  />
                </div>

                <button 
                  onClick={handleContactSubmit}
                  className="w-full bg-linear-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition shadow-lg shadow-red-200"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-linear-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold mb-1">Phone Number</p>
                      <p className="text-xl font-bold">+880-1234-567890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold mb-1">Email Address</p>
                      <p className="text-xl font-bold break-all">support@blooddonation.org</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold mb-1">Location</p>
                      <p className="text-xl font-bold">Sylhet, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="tel:+8801234567890"
                className="block bg-white border-2 border-red-600 text-red-600 px-8 py-5 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition text-center text-lg shadow-lg"
              >
                <Phone className="inline-block mr-2" size={24} />
                Emergency Hotline - Call Now
              </a>

              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-red-600" size={24} />
                  <h4 className="font-bold text-gray-900 text-lg">Working Hours</h4>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-semibold">Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<footer className="bg-linear-to-br from-gray-900 to-gray-800 text-white py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
                    {/* Brand */}
                    <div className="max-w-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <MdBloodtype className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-extrabold">Hemovia</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Connecting donors with those in need. Every donation saves lives and brings hope to families.
                        </p>
                        {/* Social Media */}
                        
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h6 className="font-bold text-lg mb-5 text-white">Quick Links</h6>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition hover:translate-x-1 inline-block">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="text-gray-400 hover:text-white transition hover:translate-x-1 inline-block">
                                    Register as Donor
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" className="text-gray-400 hover:text-white transition hover:translate-x-1 inline-block">
                                    Search Donors
                                </Link>
                            </li>
                            
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h6 className="font-bold text-lg mb-5 text-white">Social Links</h6>
                        <ul className="space-y-3">
                            <div className="flex gap-3">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200"
                            >
                                <FaFacebook size={20} />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200"
                            >
                                <FaTwitter size={20} />
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200"
                            >
                                <FaYoutube size={20} />
                            </a>
                        </div>
                            
                        </ul>
                    </div>

                </div>
                
                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-center text-center items-center gap-4">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} Hemovia. All rights reserved.
                    </p>
                   
                </div>
            </div>
        </footer>
    </div>
  );
};

export default Home;
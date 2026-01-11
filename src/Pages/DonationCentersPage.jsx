import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, Clock, Navigation, Search, Star, Award, Building, ChevronDown, ExternalLink, Droplet, Shield, CheckCircle, Globe, Users } from 'lucide-react';
import axios from 'axios';

const DonationCentersPage = () => {
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All'); 
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [animatedStats, setAnimatedStats] = useState({
    centers: 0,
    divisions: 0,
    verified: 0,
    emergency: 0
  });
  const [centers, setCenters] = useState([]);

  // Format count for display
  const formatCount = (count) => {
    if (count >= 100) return '100+';
    if (count >= 50) return '50+';
    if (count >= 25) return '25+';
    if (count >= 10) return '10+';
    return count.toString();
  };

  const divisions = ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  // Fetch centers data from JSON file 
  useEffect(() => {
    axios.get('/centers.json')
      .then(res => {
        setCenters(res.data);
      });
  }, []);

  // Animated counter effect
  useEffect(() => {
    const targetStats = {
      centers: centers.length,
      divisions: 8,
      verified: centers.filter(c => c.verified).length,
      emergency: 24
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        centers: Math.floor(targetStats.centers * progress),
        divisions: Math.floor(targetStats.divisions * progress),
        verified: Math.floor(targetStats.verified * progress),
        emergency: Math.floor(targetStats.emergency * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats({
          centers: formatCount(targetStats.centers),
          divisions: targetStats.divisions,
          verified: formatCount(targetStats.verified),
          emergency: targetStats.emergency
        });
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [centers]);

  // Enhanced search with loading effect
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Client-side filtering 
  const filteredCenters = centers.filter(center => {
    const matchesDivision = selectedDivision === 'All' || center.division === selectedDivision;
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply filter based on selected filter
    let matchesFilter = true;
    if (selectedFilter === 'Featured') {
      matchesFilter = center.featured;
    } else if (selectedFilter === '24/7') {
      matchesFilter = center.emergency && center.emergency.includes('24/7');
    }
    
    return matchesDivision && matchesSearch && matchesFilter;
  });

  // Pagination logic - for all filtered centers
  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);
  const Pages = [...Array(totalPages).keys()].map(num => num + 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCenters = filteredCenters.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDivision, searchQuery, selectedFilter]);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to the "All Centers" section instead of the top
    document.getElementById('all-centers-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Following Project Design */}
      <div className="relative min-h-screen bg-white overflow-hidden">
        {/* Background Pattern - Same as Home */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-rose-50">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(254 202 202 / 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        {/* Decorative Blobs - Same as Home */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative container mx-auto px-4 pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
          <div className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto">
            {/* Badge - Following Home Pattern */}
            <div className="inline-flex items-center gap-2 md:gap-3 bg-white border-2 border-red-100 px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded-full shadow-sm">
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <Building className="text-red-600" size={12} />
              </div>
              <span className="text-red-600 font-bold text-xs sm:text-sm">Donation Centers • Nationwide Network</span>
            </div>

            {/* Main Heading - Following Home Pattern */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-none mb-3 md:mb-5">
                Find<span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Centers</span>
              </h1>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <div className="h-0.5 sm:h-1 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-700">Save Lives</p>
                <div className="h-0.5 sm:h-1 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium px-4">
              Connect with verified donation centers across Bangladesh. Safe, reliable, and always ready to help save lives in your community.
            </p>

            {/* Search Interface - Following Home Pattern */}
            <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg max-w-4xl mx-auto">
              {/* Main Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1 relative group">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder="Search by name, location, or district..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-gray-300 text-sm sm:text-base bg-white text-gray-900"
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:from-red-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                      <span className="hidden sm:inline">Searching...</span>
                    </>
                  ) : (
                    <>
                      <Navigation size={16} />
                      <span className="hidden sm:inline">Find Centers</span>
                      <span className="sm:hidden">Find</span>
                    </>
                  )}
                </button>
              </div>
              {/* Trust Indicators - Following Home Pattern */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Shield className="text-green-500" size={14} />
                  <span className="font-medium">100% Verified Centers</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="text-blue-500" size={14} />
                  <span className="font-medium">24/7 Emergency Support</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Award className="text-red-500" size={14} />
                  <span className="font-medium">Professional Standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave - Same as Home */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 sm:h-16 md:h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-white" />
          </svg>
        </div>
      </div>

      {/* Stats Section - Following Home Page Pattern */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              <Award className="text-red-600" size={14} />
              <span className="text-red-600 font-bold text-xs sm:text-sm">NETWORK OVERVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4">
              Our Network
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Real-time statistics from our nationwide donation network
            </p>
          </div>

          {/* Stats Cards - Following Home Pattern */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="group bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-red-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-200">
                <Building className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-1 sm:mb-2 tabular-nums">{animatedStats.centers}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-semibold">
                Active Centers
              </p>
            </div>
            <div className="group bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-blue-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                <Globe className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-1 sm:mb-2 tabular-nums">{animatedStats.divisions}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-semibold">
                Divisions Covered
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-green-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-200">
                <Shield className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-1 sm:mb-2 tabular-nums">{animatedStats.verified}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-semibold">
                Verified Centers
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-red-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-200">
                <Clock className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-1 sm:mb-2">24/7</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-semibold">
                Emergency Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Centers List */}
      <div id="results-section" className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* All Centers Section with Filter Buttons */}
          <div id="all-centers-section">
            {/* Section Header with Filter Buttons */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Building className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">All Centers</h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Showing <span className="font-bold text-gray-900">{startIndex + 1}-{Math.min(endIndex, filteredCenters.length)}</span> of <span className="font-bold text-gray-900">{filteredCenters.length}</span> donation centers
                    {selectedDivision !== 'All' && <span> in <span className="font-bold text-red-600">{selectedDivision}</span></span>}
                    {selectedFilter !== 'All' && <span> • <span className="font-bold text-blue-600">{selectedFilter}</span></span>}
                    {totalPages > 1 && <span> • Page <span className="font-bold text-gray-900">{currentPage}</span> of <span className="font-bold text-gray-900">{totalPages}</span></span>}
                  </p>
                </div>
              </div>
              {/* Filter Buttons */}
              <div className="w-full lg:w-auto">
                {/* Mobile: 2x2 Grid, Desktop: Horizontal */}
                <div className="grid grid-cols-2 lg:flex gap-2 lg:gap-3">
                  {/* Main Filter Buttons */}
                  <button
                    onClick={() => setSelectedFilter('All')}
                    className={`px-2 sm:px-3 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105 text-xs sm:text-sm lg:text-base ${
                      selectedFilter === 'All'
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    All Centers ({centers.length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('Featured')}
                    className={`px-2 sm:px-3 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-1 lg:gap-2 text-xs sm:text-sm lg:text-base ${
                      selectedFilter === 'Featured'
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <Star size={12} className={selectedFilter === 'Featured' ? 'fill-white' : 'fill-red-400'} />
                    <span className="hidden sm:inline">Featured</span> ({centers.filter(c => c.featured).length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('24/7')}
                    className={`px-2 sm:px-3 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-1 lg:gap-2 text-xs sm:text-sm lg:text-base ${
                      selectedFilter === '24/7'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <Clock size={12} />
                    <span className="hidden sm:inline">24/7 Available</span>
                    <span className="sm:hidden">24/7</span> ({centers.filter(c => c.emergency && c.emergency.includes('24/7')).length})
                  </button>

                  {/* Division Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedDivision}
                      onChange={(e) => setSelectedDivision(e.target.value)}
                      className="w-full px-2 sm:px-3 lg:px-6 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-red-500 focus:outline-none appearance-none bg-white transition-all duration-300 font-bold text-gray-700 hover:border-gray-300 shadow-lg cursor-pointer text-xs sm:text-sm lg:text-base"
                    >
                      {divisions.map(division => (
                        <option key={division} value={division}>
                          {division === 'All' ? 'All Divisions' : division}
                          {division !== 'All' && ` (${centers.filter(c => c.division === division).length})`}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-1 sm:right-2 lg:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                  </div>
                </div>
              </div>
            </div>
            {/* Centers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center mt-4 mb-6 sm:mb-8">
              {displayedCenters.map((center) => (
                <div
                  key={center.id}
                  className="card bg-base-100 w-full max-w-sm shadow-sm border border-base-content/10 flex flex-col h-full relative rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Featured Badge - Only show if center is featured */}
                  {center.featured && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-red-400 to-red-500 text-white px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10 shadow-sm">
                      <Star size={8} className="fill-white" />
                      <span className="hidden sm:inline">Featured</span>
                    </div>
                  )}

                  {/* Verified Badge */}
                  <div className={`absolute top-2 sm:top-3 ${center.featured ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} bg-gradient-to-r from-green-500 to-green-600 text-white px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10 shadow-sm`}>
                    <CheckCircle size={8} className="fill-white" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>

                  {/* Figure Section */}
                  <figure>
                    <div className="w-full h-32 sm:h-40 md:h-48 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                      <Building className="text-red-600" size={32} />
                    </div>
                  </figure>

                  {/* Card Body */}
                  <div className="card-body p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h2 className="card-title mb-2 font-bold line-clamp-2 min-h-10 sm:min-h-12 text-sm sm:text-base text-gray-900">{center.name}</h2>
                      
                      {/* Meta Information */}
                      <div className="flex justify-between items-center">
                        <h5 className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-900">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" /> 
                          {center.district}
                        </h5>
                        <h5 className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-900">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" /> 
                          {center.rating}
                        </h5>
                      </div>
                    </div>

                    <div className="flex justify-between mt-3 sm:mt-4 items-center">
                      <div className="flex items-center font-bold text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1 sm:mr-2" />
                        <span className="text-gray-600">
                          {center.emergency && center.emergency.includes('24/7') ? '24/7 Available' : 'Regular Hours'}
                        </span>
                      </div>
                      <Link
                        to={`/center/${center.id}`}
                        className="btn btn-sm bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                      >
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* No Results */}
          {filteredCenters.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Building className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Centers Found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
                We couldn't find any donation centers matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedDivision('All');
                  setSearchQuery('');
                  setSelectedFilter('All');
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all text-sm sm:text-base"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination - For all filtered centers */}
          {filteredCenters.length > itemsPerPage && (
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="text-center lg:text-left">
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  Showing <span className="font-bold text-gray-900">{startIndex + 1}</span> to{' '}
                  <span className="font-bold text-gray-900">{Math.min(endIndex, filteredCenters.length)}</span> of{' '}
                  <span className="font-bold text-red-600">{filteredCenters.length}</span> centers
                  {selectedFilter !== 'All' && <span> ({selectedFilter.toLowerCase()})</span>}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Page <span className="font-bold text-gray-700">{currentPage}</span> of{' '}
                  <span className="font-bold text-gray-700">{totalPages}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
               
                <div className="flex items-center gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1);
                    
                    if (!showPage) {
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 sm:px-3 py-2 sm:py-3 text-gray-400 font-bold text-xs sm:text-sm">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 min-w-8 sm:min-w-10 md:min-w-12 text-xs sm:text-sm md:text-base ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg transform scale-105'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600 shadow-sm hover:shadow-md transform hover:scale-105'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action - Following Project Design */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border-2 border-red-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center">
                <Droplet className="text-red-600 fill-red-600" size={12} />
              </div>
              <span className="text-red-600 font-bold text-xs sm:text-sm">SAVE LIVES • MAKE IMPACT</span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-none mb-2 sm:mb-3">
                Ready to<span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Save Lives?</span>
              </h2>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="h-0.5 sm:h-1 w-12 sm:w-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-700">Join Our Mission</p>
                <div className="h-0.5 sm:h-1 w-12 sm:w-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
              </div>
            </div>
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium px-4">
              Visit any of our verified donation centers and become a hero today. Every donation saves up to three lives.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
              <a
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-red-700 hover:to-red-800 transition-all shadow-xl shadow-red-200 hover:shadow-2xl hover:scale-105 w-full sm:w-auto"
              >
                <Droplet size={16} className="group-hover:scale-110 transition-transform fill-white" />
                <span>Register as Donor</span>
              </a>
              <a
                href="/search"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
              >
                <Search size={16} className="group-hover:scale-110 transition-transform" />
                <span>Find Donors</span>
              </a>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 max-w-lg sm:max-w-2xl mx-auto">
              <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:border-red-200 transition shadow-sm hover:shadow-lg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Users className="text-red-600" size={16} />
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">{centers.length}+</p>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">Centers</p>
              </div>
              <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:border-red-200 transition shadow-sm hover:shadow-lg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Shield className="text-red-600" size={16} />
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">100%</p>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">Verified</p>
              </div>
              <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:border-red-200 transition shadow-sm hover:shadow-lg">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Clock className="text-red-600" size={16} />
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">24/7</p>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DonationCentersPage;
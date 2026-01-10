import { ArrowRight, CheckCircle, Droplet, Activity, Shield, TrendingUp, UserCheck, Heart } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import useAxios from '../Hooks/useAxios';

const BloodCompatibilitySection = () => {
  const [selectedBloodType, setSelectedBloodType] = useState('O+');
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    successRate: 0,
    bloodTypeCounts: {}
  });
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({ 
    donors: 0, 
    requests: 0, 
    successRate: 0 
  });

  const axios = useAxios();

  const bloodTypes = useMemo(() => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], []);

  const compatibilityData = {
    'O-': { canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-'], description: 'Universal Donor', rarity: 'Critical' },
    'O+': { canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O-', 'O+'], description: 'Most Common', rarity: 'High' },
    'A-': { canDonateTo: ['A-', 'A+', 'AB-', 'AB+'], canReceiveFrom: ['A-', 'O-'], description: 'Type A Negative', rarity: 'Medium' },
    'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A-', 'A+', 'O-', 'O+'], description: 'Type A Positive', rarity: 'Common' },
    'B-': { canDonateTo: ['B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['B-', 'O-'], description: 'Type B Negative', rarity: 'Rare' },
    'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B-', 'B+', 'O-', 'O+'], description: 'Type B Positive', rarity: 'Medium' },
    'AB-': { canDonateTo: ['AB-', 'AB+'], canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'], description: 'Universal Plasma', rarity: 'Very Rare' },
    'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'], description: 'Universal Recipient', rarity: 'Rare' }
  };

  const formatCount = (count) => {
    if (count >= 100) return '100+';
    if (count >= 50) return '50+';
    if (count >= 25) return '25+';
    if (count >= 10) return '10+';
    return count.toString();
  };

  useEffect(() => {
    // Always animate when stats are loaded (including 0 values)
    if (stats.totalDonors >= 0 && stats.totalRequests >= 0 && stats.successRate >= 0) {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedStats({
          donors: Math.floor(stats.totalDonors * easeOut),
          requests: Math.floor(stats.totalRequests * easeOut),
          successRate: Math.floor(stats.successRate * easeOut)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats({
            donors: stats.totalDonors,
            requests: stats.totalRequests,
            successRate: stats.successRate
          });
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [stats.totalDonors, stats.totalRequests, stats.successRate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Use the public-stats endpoint
        const statsRes = await axios.get('/public-stats');
        const statsData = statsRes.data;
        
        console.log('Public stats received:', statsData);
        console.log('Blood type counts:', statsData.bloodTypeCounts);
        console.log('Total requests:', statsData.totalRequests);
        
        setStats({
          totalDonors: statsData.totalDonors,
          totalRequests: statsData.totalRequests,
          successRate: statsData.successRate ,
          bloodTypeCounts: statsData.bloodTypeCounts || {}
        });

        console.log('Stats set:', {
          totalDonors: statsData.totalDonors || 0,
          totalRequests: statsData.totalRequests || 0,
          successRate: statsData.successRate || 0,
          bloodTypeCounts: Object.keys(statsData.bloodTypeCounts || {}).length
        });

      } catch (error) {
        console.error('Error fetching data:', error);
        setStats({
          totalDonors: 0,
          totalRequests: 0,
          successRate: 96,
          bloodTypeCounts: {}
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axios, bloodTypes]);

  const getDemandLevel = (bloodType) => {
    const count = stats.bloodTypeCounts[bloodType] || 0;
    const total = stats.totalRequests || 1;
    
    if (count > total * 0.2) return { level: 'High', color: 'bg-red-500', textColor: 'text-red-600' };
    if (count > total * 0.1) return { level: 'Medium', color: 'bg-orange-500', textColor: 'text-orange-600' };
    if (count > total * 0.05) return { level: 'Low', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    return { level: 'Stable', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-spin border-t-red-500 mx-auto mb-4"></div>
            <Droplet className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500" size={20} />
          </div>
          <p className="text-gray-600 font-medium">Loading compatibility data...</p>
        </div>
      </div>
    );
  }

  const selectedBlood = compatibilityData[selectedBloodType];
  const selectedCount = stats.bloodTypeCounts[selectedBloodType] || 0;
  const demandLevel = getDemandLevel(selectedBloodType);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-red-50 via-white to-rose-50">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(254 202 202 / 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 px-3 py-2 md:px-4 md:py-2 rounded-full mb-4">
              <Droplet className="text-red-600 fill-red-600" size={14} />
              <span className="text-red-600 font-bold text-xs sm:text-sm">BLOOD COMPATIBILITY CENTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Know Your Blood Impact
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Discover compatibility, find urgent requests, and connect with those who need your help
            </p>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20">
            {/* Active Donors */}
            <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <UserCheck className="text-white" size={18} />
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{formatCount(animatedStats.donors)}</h3>
              <p className="text-gray-600 text-sm md:text-base">Active Donors</p>
            </div>

            {/* Blood Requests */}
            <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-red-500 to-red-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                  <Heart className="text-white" size={18} />
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{formatCount(animatedStats.requests)}</h3>
              <p className="text-gray-600 text-sm md:text-base">Blood Requests</p>
            </div>

            {/* Blood Types */}
            <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-green-500 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                  <Droplet className="text-white" size={18} />
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">8</h3>
              <p className="text-gray-600 text-sm md:text-base">Blood Types</p>
            </div>

            {/* Success Rate */}
            <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <TrendingUp className="text-white" size={18} />
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{animatedStats.successRate}%</h3>
              <p className="text-gray-600 text-sm md:text-base">Success Rate</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {/* Blood Type Selector */}
            <div className="lg:col-span-2 flex">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 w-full flex flex-col">
                {/* Header */}
                <div className="bg-linear-to-r from-red-50 to-rose-50 p-4 md:p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-red-500 to-red-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                          <Droplet className="text-white fill-white" size={16} />
                        </div>
                        Blood Compatibility Analysis
                      </h2>
                      <p className="text-gray-600 text-sm md:text-base">Select your blood type to explore donation compatibility and find matching recipients</p>
                    </div>
                    <div className="flex md:hidden items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm self-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-gray-700">Live Data</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Live Data</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  {/* Blood Type Grid */}
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                      <Shield className="text-blue-600" size={16} />
                      Select Blood Type
                    </h3>
                    <div className="grid grid-cols-4 gap-2 md:gap-3">
                      {bloodTypes.map((type) => {
                        const count = stats.bloodTypeCounts[type] || 0;
                        const demand = getDemandLevel(type);
                        const isSelected = selectedBloodType === type;
                        
                        return (
                          <button
                            key={type}
                            onClick={() => setSelectedBloodType(type)}
                            className={`group relative p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                              isSelected 
                                ? 'bg-linear-to-br from-red-500 to-red-600 text-white shadow-xl shadow-red-200 scale-105' 
                                : 'bg-linear-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-rose-50 border-2 border-gray-200 hover:border-red-200'
                            }`}
                          >
                            <div className="text-center">
                              <div className={`text-lg md:text-2xl font-black mb-1 md:mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                {type}
                              </div>
                              <div className={`text-xs mb-1 md:mb-2 font-medium ${isSelected ? 'text-red-100' : 'text-gray-600'}`}>
                                {count} requests
                              </div>
                              <div className={`text-xs px-2 py-1 rounded-full font-bold ${
                                isSelected 
                                  ? 'bg-white/20 text-white' 
                                  : `${demand.textColor} bg-white shadow-sm`
                              }`}>
                                {demand.level}
                              </div>
                            </div>
                            
                            {/* Demand Indicator */}
                            <div className={`absolute top-1 md:top-2 right-1 md:right-2 w-2 h-2 md:w-3 md:h-3 rounded-full ${demand.color} ${isSelected ? 'opacity-70' : ''}`}></div>
                            
                            {/* Selection Indicator */}
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <CheckCircle size={12} className="text-white md:w-4 md:h-4" />
                              </div>
                            )}

                            {/* Hover Effect */}
                            <div className={`absolute inset-0 rounded-lg md:rounded-xl transition-opacity duration-300 ${
                              isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-10 bg-red-500'
                            }`}></div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Enhanced Compatibility Details */}
                  <div className="bg-linear-to-br from-red-50 via-rose-50 to-pink-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-red-100 shadow-inner">
                    {/* Selected Blood Type Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-red-200 gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-red-500 to-red-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-lg md:text-2xl font-black text-white">{selectedBloodType}</span>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-2xl font-bold text-gray-900">{selectedBlood.description}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mt-1">
                            <div className={`inline-flex items-center gap-2 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold ${
                              demandLevel.level === 'High' ? 'bg-red-100 text-red-700 border border-red-200' :
                              demandLevel.level === 'Medium' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                              demandLevel.level === 'Low' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                              'bg-green-100 text-green-700 border border-green-200'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${demandLevel.color} animate-pulse`}></div>
                              {demandLevel.level} Demand
                            </div>
                            <div className="text-xs md:text-sm text-gray-600 font-medium">
                              Rarity: <span className="font-bold text-gray-800">{selectedBlood.rarity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-2xl md:text-3xl font-black text-gray-900">{selectedCount}</div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">Active Requests</div>
                      </div>
                    </div>

                    {/* Compatibility Matrix */}
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      {/* Can Donate To */}
                      <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 shadow-lg border border-green-100">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3 md:mb-4 text-base md:text-lg">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <ArrowRight className="text-green-600" size={14} />
                          </div>
                          Can Donate To
                          <span className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm font-bold">
                            {selectedBlood.canDonateTo.length}
                          </span>
                        </h4>
                        <div className="grid grid-cols-4 gap-1 md:gap-2">
                          {bloodTypes.map((type) => (
                            <div
                              key={type}
                              onClick={() => selectedBlood.canDonateTo.includes(type) && setSelectedBloodType(type)}
                              className={`p-2 md:p-3 rounded-lg text-center text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                                selectedBlood.canDonateTo.includes(type)
                                  ? 'bg-green-100 text-green-800 border-2 border-green-200 hover:bg-green-200 transform hover:scale-105'
                                  : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                              }`}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Can Receive From */}
                      <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 shadow-lg border border-blue-100">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3 md:mb-4 text-base md:text-lg">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Shield className="text-blue-600" size={14} />
                          </div>
                          Can Receive From
                          <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs md:text-sm font-bold">
                            {selectedBlood.canReceiveFrom.length}
                          </span>
                        </h4>
                        <div className="grid grid-cols-4 gap-1 md:gap-2">
                          {bloodTypes.map((type) => (
                            <div
                              key={type}
                              onClick={() => selectedBlood.canReceiveFrom.includes(type) && setSelectedBloodType(type)}
                              className={`p-2 md:p-3 rounded-lg text-center text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                                selectedBlood.canReceiveFrom.includes(type)
                                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-200 hover:bg-blue-200 transform hover:scale-105'
                                  : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                              }`}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 md:mt-6 grid grid-cols-3 gap-3 md:gap-4">
                      <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 text-center shadow-md border border-gray-100">
                        <div className="text-xl md:text-2xl font-black text-green-600">{selectedBlood.canDonateTo.length}</div>
                        <div className="text-xs text-gray-600 font-medium">Compatible Recipients</div>
                      </div>
                      <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 text-center shadow-md border border-gray-100">
                        <div className="text-xl md:text-2xl font-black text-blue-600">{selectedBlood.canReceiveFrom.length}</div>
                        <div className="text-xs text-gray-600 font-medium">Compatible Donors</div>
                      </div>
                      <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 text-center shadow-md border border-gray-100">
                        <div className="text-xl md:text-2xl font-black text-red-600">{selectedCount}</div>
                        <div className="text-xs text-gray-600 font-medium">Current Requests</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Blood Request Distribution only */}
            <div className="flex">
              {/* Beautiful Blood Request Distribution Card */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-50 overflow-hidden hover:shadow-3xl transition-all duration-700 group w-full flex flex-col">
                {/* Stunning Header with Enhanced Gradient */}
                <div className="relative bg-linear-to-br from-red-50 via-rose-50 to-pink-50 p-6 md:p-8 border-b border-red-100/50">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-red-200/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-rose-200/20 rounded-full blur-xl"></div>
                  
                  {/* Live Badge - Top Right Corner */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full border border-red-200/50 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Live</span>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center gap-3 md:gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-red-500 via-red-600 to-rose-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl shadow-red-200/50 group-hover:scale-110 transition-transform duration-500">
                        <Activity className="text-white" size={20} />
                      </div>
                      {/* Animated Ring */}
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-red-300/50 animate-pulse"></div>
                      {/* Live Indicator */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white shadow-lg">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mx-auto mt-0.5 animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text">
                        Request Analytics
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 font-medium">Real-time blood type insights</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col bg-linear-to-b from-white to-gray-50/30">
                  {/* Beautiful Enhanced Donut Chart */}
                  <div className="flex justify-center mb-6 md:mb-8 flex-1 items-center">
                    <div className="relative w-48 h-48 md:w-64 md:h-64 group/chart">
                      {/* Multiple Background Layers for Depth */}
                      <div className="absolute inset-4 bg-linear-to-br from-red-50 via-rose-50 to-pink-50 rounded-full opacity-40 animate-pulse"></div>
                      <div className="absolute inset-8 bg-linear-to-br from-white to-red-50/50 rounded-full shadow-inner"></div>
                      
                      <svg viewBox="0 0 240 240" className="-rotate-90 filter drop-shadow-lg">
                        {(() => {
                          const total = Object.values(stats.bloodTypeCounts).reduce((a, b) => a + b, 0);
                          if (total === 0) return (
                            <g>
                              <circle cx="120" cy="120" r="85" fill="url(#emptyGradient)" stroke="#e5e7eb" strokeWidth="3"/>
                              <circle cx="120" cy="120" r="55" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
                              <defs>
                                <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#f9fafb"/>
                                  <stop offset="100%" stopColor="#f3f4f6"/>
                                </linearGradient>
                              </defs>
                              <text
                                x="120"
                                y="120"
                                textAnchor="middle"
                                className="text-sm font-bold fill-gray-400"
                                transform="rotate(90 120 120)"
                              >
                                No Active Data
                              </text>
                            </g>
                          );

                          let angle = 0;
                          const cx = 120;
                          const cy = 120;
                          const outerR = 95;
                          const innerR = 65;
                          const colors = {
                            'O+': '#dc2626',  // Red-600 (primary home page red)
                            'O-': '#be185d',  // Pink-700 (rose family from home page)
                            'A+': '#2563eb',  // Blue-600 (home page blue accent)
                            'A-': '#1e40af',  // Blue-700 (darker blue)
                            'B+': '#16a34a',  // Green-600 (home page green accent)
                            'B-': '#15803d',  // Green-700 (darker green)
                            'AB+': '#2563eb', // Blue-600 (replacing purple)
                            'AB-': '#7c2d12'  // Brown-800 (neutral accent)
                          };

                          return (
                            <>
                              <defs>
                                {Object.entries(colors).map(([type, color]) => (
                                  <linearGradient key={type} id={`gradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={color} stopOpacity="1"/>
                                    <stop offset="100%" stopColor={color} stopOpacity="0.8"/>
                                  </linearGradient>
                                ))}
                              </defs>
                              {bloodTypes.map(type => {
                                const value = stats.bloodTypeCounts[type] || 0;
                                if (!value) return null;

                                const slice = (value / total) * 360;
                                const start = (angle * Math.PI) / 180;
                                const end = ((angle + slice) * Math.PI) / 180;
                                angle += slice;

                                const largeArc = slice > 180 ? 1 : 0;
                                const path = `M ${cx + outerR * Math.cos(start)} ${cy + outerR * Math.sin(start)}
                                            A ${outerR} ${outerR} 0 ${largeArc} 1 ${cx + outerR * Math.cos(end)} ${cy + outerR * Math.sin(end)}
                                            L ${cx + innerR * Math.cos(end)} ${cy + innerR * Math.sin(end)}
                                            A ${innerR} ${innerR} 0 ${largeArc} 0 ${cx + innerR * Math.cos(start)} ${cy + innerR * Math.sin(start)}
                                            Z`;

                                const isSelected = selectedBloodType === type;

                                return (
                                  <g key={type}>
                                    <path
                                      d={path}
                                      fill={`url(#gradient-${type})`}
                                      stroke="white"
                                      strokeWidth="4"
                                      className={`cursor-pointer transition-all duration-500 ${
                                        isSelected 
                                          ? 'opacity-100 filter drop-shadow-2xl' 
                                          : 'opacity-90 hover:opacity-100 hover:drop-shadow-lg'
                                      }`}
                                      onClick={() => setSelectedBloodType(type)}
                                      style={{
                                        filter: isSelected ? 'brightness(1.15) saturate(1.3)' : 'brightness(1)',
                                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                        transformOrigin: 'center'
                                      }}
                                    />
                                    {isSelected && (
                                      <>
                                        {/* Selection Indicator */}
                                        <circle
                                          cx={cx + (outerR + 20) * Math.cos((start + end) / 2)}
                                          cy={cy + (outerR + 20) * Math.sin((start + end) / 2)}
                                          r="6"
                                          fill="white"
                                          stroke={colors[type]}
                                          strokeWidth="3"
                                          className="animate-pulse filter drop-shadow-lg"
                                        />
                                        {/* Animated Ring */}
                                        <circle
                                          cx={cx + (outerR + 20) * Math.cos((start + end) / 2)}
                                          cy={cy + (outerR + 20) * Math.sin((start + end) / 2)}
                                          r="10"
                                          fill="none"
                                          stroke={colors[type]}
                                          strokeWidth="2"
                                          opacity="0.5"
                                          className="animate-ping"
                                        />
                                      </>
                                    )}
                                  </g>
                                );
                              })}
                            </>
                          );
                        })()}
                      </svg>

                      {/* Beautiful Center Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-6 shadow-2xl border border-gray-100/50">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Requests</p>
                          <p className="text-5xl font-black bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2">
                            {Object.values(stats.bloodTypeCounts).reduce((a, b) => a + b, 0)}
                          </p>
                          <p className="text-xs font-semibold text-gray-600">Active Now</p>
                          <div className="mt-2 flex justify-center">
                            <div className="w-8 h-1 bg-linear-to-r from-red-500 to-rose-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium opacity-0 group-hover/chart:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Click segments to explore
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
                      </div>
                    </div>
                  </div>

                    {/* Clean Legend */}
                    <div className="space-y-3 md:space-y-4 mt-auto">
                      <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-gray-200/50">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-linear-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center shadow-lg">
                            <Droplet className="text-white" size={14} />
                          </div>
                          <span className="text-base md:text-lg font-black text-gray-900">Distribution Breakdown</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                        {bloodTypes.map(type => {
                          const count = stats.bloodTypeCounts[type] || 0;
                          if (!count) return null;

                          const total = Object.values(stats.bloodTypeCounts).reduce((a, b) => a + b, 0);
                          const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                          const colors = {
                            'O+': '#dc2626',  // Red-600 (primary home page red)
                            'O-': '#be185d',  // Pink-700 (rose family from home page)
                            'A+': '#2563eb',  // Blue-600 (home page blue accent)
                            'A-': '#1e40af',  // Blue-700 (darker blue)
                            'B+': '#16a34a',  // Green-600 (home page green accent)
                            'B-': '#15803d',  // Green-700 (darker green)
                            'AB+': '#2563eb', // Blue-600 (replacing purple)
                            'AB-': '#7c2d12'  // Brown-800 (neutral accent)
                          };

                          const isSelected = selectedBloodType === type;

                          return (
                            <div
                              key={type}
                              onClick={() => setSelectedBloodType(type)}
                              className={`flex items-center justify-between py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl cursor-pointer transition-all duration-300 ${
                                isSelected
                                  ? 'bg-red-50 border-l-4 border-red-500 shadow-sm'
                                  : 'hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="relative">
                                  <div
                                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                                      isSelected ? 'ring-2 ring-red-300 ring-offset-2' : ''
                                    }`}
                                    style={{ backgroundColor: colors[type] }}
                                  />
                                  {isSelected && (
                                    <div 
                                      className="absolute inset-0 rounded-full animate-ping opacity-75" 
                                      style={{ backgroundColor: colors[type] }}
                                    />
                                  )}
                                </div>
                                <div>
                                  <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                                    isSelected ? 'text-red-700' : 'text-gray-900'
                                  }`}>
                                    {type}
                                  </span>
                                  <div className="text-xs text-gray-500 font-medium">{count} req</div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <span className={`text-base md:text-lg font-black transition-colors duration-300 ${
                                  isSelected ? 'text-red-600' : 'text-gray-700'
                                }`}>
                                  {percent}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodCompatibilitySection;
import { useState, useEffect } from 'react';
import { Heart, Users, Award, Shield, Clock, MapPin, Phone, Mail, Target, Eye, Droplet, Activity, CheckCircle } from 'lucide-react';
import axios from 'axios';
import useAxios from '../Hooks/useAxios';

const About = () => {
  const [centersData, setCentersData] = useState([]);
  const [livesSaved, setLivesSaved] = useState(0);
  const [apiStats, setApiStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    successRate: 0,
    pendingRequests: 0
  });
  const axiosInstance = useAxios();

  // Format count for display
  const formatCount = (count) => {
    if (count >= 100) return '100+';
    if (count >= 50) return '50+';
    if (count >= 25) return '25+';
    if (count >= 10) return '10+';
    return count.toString();
  };

  useEffect(() => {
    axios.get('/centers.json')
      .then(res => {
        setCentersData(res.data);
      });
  }, []);

 
  // Fetch real stats - following your project style
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/public-stats');
        console.log('Public stats response:', response.data);
        
        const { successRate, totalRequests, totalDonors } = response.data;
        
        // Calculate done requests from success rate
        const estimatedDone = Math.round((successRate / (100 - successRate)) * totalRequests);
        setLivesSaved(estimatedDone > 0 ? estimatedDone : 0);
        
        // Update API stats with real data
        setApiStats({
          totalDonors: totalDonors,
          totalRequests: totalRequests + estimatedDone, // Real total = pending + done
          successRate: successRate,
          pendingRequests: totalRequests // API totalRequests is actually pending requests
        });
      } catch (err) {
        console.error(err);
        setLivesSaved(0);
      }
    };

    fetchStats();
  }, [axiosInstance]);

  // Use real stats from API - keeping About page dynamic
  const stats = {
    totalDonors: formatCount(apiStats.totalDonors),
    successfulDonations: livesSaved,
    totalCenters: formatCount(centersData.length),
    totalCities: [...new Set(centersData.map(center => center.district))].length,
    totalRequests: formatCount(apiStats.totalRequests),
    pendingRequests: formatCount(apiStats.pendingRequests),
    successRate: apiStats.successRate
  };

  const displayStats = [
    { 
      icon: Users, 
      value: `${stats.totalDonors}`, 
      label: 'Active Donors', 
      color: 'red' 
    },
    { 
      icon: Heart, 
      value: `${stats.successfulDonations}`, 
      label: 'Lives Saved', 
      color: 'red' 
    },
    { 
      icon: Activity, 
      value: `${stats.totalCenters}`, 
      label: 'Blood Banks', 
      color: 'red' 
    },
    { 
      icon: Award, 
      value: `${stats.totalCities}+`, 
      label: 'Cities Covered', 
      color: 'red' 
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and the willingness to help others in their time of need.'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'We maintain the highest standards of safety and privacy to protect both donors and recipients.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong network of donors and recipients who support each other in saving lives.'
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Every donation matters. We focus on creating meaningful connections that save lives.'
    }
  ];

  const getCentersByDivision = (division) => {
    return centersData.filter(center => center.division === division);
  };

  const divisions = [...new Set(centersData.map(center => center.division))];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-linear-to-br from-red-50 via-white to-rose-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(254 202 202 / 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border-2 border-red-100 px-5 py-3 rounded-full shadow-sm mb-8">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Droplet className="text-red-600 fill-red-600" size={16} />
              </div>
              <span className="text-red-600 font-bold text-sm">About Hemovia</span>
            </div>

            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-gray-900 leading-none mb-5">
                Connecting<span className="bg-linear-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Hearts</span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-1 w-20 bg-linear-to-r from-red-600 to-rose-600 rounded-full"></div>
                <p className="text-xl md:text-2xl font-bold text-gray-700">Saving Lives</p>
                <div className="h-1 w-20 bg-linear-to-r from-red-600 to-rose-600 rounded-full"></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-medium">
              Hemovia is a growing blood donation platform in Bangladesh, connecting donors with those in urgent need. 
              With <span className="font-bold text-red-600">{stats.totalDonors} registered donors</span> and{' '}
              <span className="font-bold text-red-600">{stats.successfulDonations} lives saved</span>, we're building a community 
              where compassion meets technology to create real impact in Sylhet and across Bangladesh.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStats.map((stat, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:border-red-200 transition-all shadow-sm hover:shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <stat.icon className="text-red-600 fill-red-600" size={24} />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-linear-to-br from-red-50 via-white to-rose-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Target className="text-red-600" size={20} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To create a reliable, trusted platform that connects blood donors with recipients in Sylhet and across Bangladesh, 
                ensuring that no life is lost due to blood shortage. With {stats.totalDonors} registered donors and {stats.successfulDonations} lives saved, 
                we're building a strong community of voluntary blood donors, making blood donation accessible, safe, and efficient for everyone.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Eye className="text-red-600" size={20} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                A Bangladesh where every person in need of blood can find a donor quickly and easily. 
                We envision expanding our platform to cover all major cities in Bangladesh, creating a 
                nationwide network of donors and recipients that saves lives through the power of community and technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <Award className="text-red-600" size={16} />
              <span className="text-red-600 font-bold text-sm">OUR VALUES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our core values guide every decision we make and every feature we build
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-all">
                  <value.icon className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Centers Overview Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <MapPin className="text-red-600" size={16} />
              <span className="text-red-600 font-bold text-sm">OUR NETWORK</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Blood Centers Across Bangladesh
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {stats.totalCenters} verified blood centers across {stats.totalCities} divisions
            </p>
          </div>

          {/* Divisions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((division) => {
              const divisionCenters = getCentersByDivision(division);
              return (
                <div key={division} className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:border-red-200 transition-all shadow-sm hover:shadow-lg">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{division}</h3>
                  <p className="text-3xl font-black text-red-600 mb-2">{divisionCenters.length}</p>
                  <p className="text-gray-600 font-semibold">Blood Centers</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="py-20 bg-linear-to-br from-red-50 via-white to-rose-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <Activity className="text-red-600" size={16} />
              <span className="text-red-600 font-bold text-sm">PLATFORM ACTIVITY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Live Platform Statistics
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real-time insights into our blood donation network
            </p>
          </div>

          {/* Activity Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={24} />
              </div>
              <p className="text-2xl font-black text-gray-900 mb-2">{stats.totalRequests}</p>
              <p className="text-gray-600 font-semibold">Total Requests</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-2xl font-black text-gray-900 mb-2">{stats.successRate}%</p>
              <p className="text-gray-600 font-semibold">Success Rate</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-red-600" size={24} />
              </div>
              <p className="text-2xl font-black text-gray-900 mb-2">{stats.totalDonors}</p>
              <p className="text-gray-600 font-semibold">Active Donors</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="text-orange-600" size={24} />
              </div>
              <p className="text-2xl font-black text-gray-900 mb-2">{stats.pendingRequests}</p>
              <p className="text-gray-600 font-semibold">Need Help Now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-linear-to-r from-red-600 to-red-700 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-red-100 text-lg mb-8">
                Join {stats.totalDonors} heroes who are already saving lives in Sylhet and across Bangladesh. 
                With {stats.pendingRequests} people currently waiting for blood, your donation can make the difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="/signup"
                  className="group inline-flex items-center justify-center gap-3 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Heart size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Become a Donor</span>
                </a>
                <a
                  href="/donation-requests"
                  className="group inline-flex items-center justify-center gap-3 bg-red-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-900 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Activity size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Find Donors</span>
                </a>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-red-500">
                <div className="flex items-center justify-center gap-3">
                  <Phone size={20} className="text-red-200" />
                  <span className="text-red-100">+880 1234-567890</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Mail size={20} className="text-red-200" />
                  <span className="text-red-100">support@hemovia.com</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin size={20} className="text-red-200" />
                  <span className="text-red-100">Sylhet, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
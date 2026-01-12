import { useState, useEffect } from 'react';
import { Heart, Search, Phone, Mail, MapPin, Droplet, Users, Activity, Award, Clock, Shield, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import BloodCompatibilitySection from './BloodCompatibilitySection';
import FAQPage from './FAQPage';
import axios from 'axios';
import useAxios from '../Hooks/useAxios';
import SkeletonLoader from '../Components/SkeletonLoader/SkeletonLoader';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [centersData, setCentersData] = useState([]);
  const [livesSaved, setLivesSaved] = useState(0);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
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

  // Fetch real stats - following About page pattern
  useEffect(() => {
    const fetchStats = async () => {
      setIsStatsLoading(true);
      try {
        // Fetch main stats
        const response = await axiosInstance.get('/public-stats');
        const { successRate, totalRequests, totalDonors } = response.data;
        
        // Fetch request message stats for Performance Metrics only
        const messageStatsResponse = await axiosInstance.get('/request-message-stats');
        const { emergencyCases, surgeriesEnabled, familiesHelped } = messageStatsResponse.data;
        
        // Calculate done requests from success rate
        const estimatedDone = Math.round((successRate / (100 - successRate)) * totalRequests);
        setLivesSaved(estimatedDone > 0 ? estimatedDone : 0);
        
        // Update API stats with real data
        setApiStats({
          totalDonors: totalDonors,
          totalRequests: totalRequests + estimatedDone,
          successRate: successRate,
          pendingRequests: totalRequests, 
          emergencyCases: emergencyCases || 0, 
          surgeriesEnabled: surgeriesEnabled || 0, 
          chronicCare: familiesHelped || 0 
        });
      } catch (err) {
        console.error(err);
        setLivesSaved(0);
        // Set fallback values if API fails
        setApiStats(prev => ({
          ...prev,
          emergencyCases: 0,
          surgeriesEnabled: 0,
          chronicCare: 0
        }));
      } finally {
        setIsStatsLoading(false);
      }
    };

    fetchStats();
  }, [axiosInstance]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Hemovia Support Team',
        reply_to: formData.email
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');

      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
   <div className="min-h-screen bg-base-100">
      {/* Banner Section */}
     <div className="relative h-[60vh] md:h-[65vh] lg:h-[70vh] bg-base-100 overflow-hidden flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200">
          <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(254 202 202 / 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-red-200 dark:bg-red-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-rose-200 dark:bg-rose-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative container mx-auto px-4 py-4 md:py-6 lg:py-8">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-3 md:space-y-4 lg:space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Droplet className="text-white" size={10} />
                </div>
                <span className="text-red-600 dark:text-red-400 font-bold text-xs">Save Lives • Make Impact</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-base-content leading-tight mb-1 md:mb-2">
                  Donate<span className="bg-linear-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Blood</span>
                </h1>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-8 md:w-12 bg-linear-to-r from-red-600 to-rose-600 rounded-full"></div>
                  <p className="text-sm md:text-base lg:text-lg font-bold text-base-content/80">Give Life</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm lg:text-base text-base-content/70 leading-relaxed max-w-xl font-medium">
                Join our community of heroes making a real difference. Every donation saves up to three lives and brings hope to families in critical need.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <a
                  href="/signup"
                  className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-red-700 text-white px-4 md:px-6 lg:px-7 py-2 md:py-2.5 lg:py-3 rounded-2xl font-bold text-xs md:text-sm hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Heart size={16} className="md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                  <span>Join as a Donor</span>
                </a>
                <a
                  href="/search"
                  className="group inline-flex items-center justify-center gap-2 bg-base-200 text-red-600 px-4 md:px-6 lg:px-7 py-2 md:py-2.5 lg:py-3 rounded-2xl font-bold text-xs md:text-sm border-2 border-base-300 hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-base-300 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Search size={16} className="md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                  <span>Search Donors</span>
                </a>
              </div>

              {isStatsLoading ? (
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1 md:pt-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-base-200 border-2 border-base-300 rounded-2xl p-2 md:p-2.5 animate-pulse">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2.5 h-2.5 bg-base-300 rounded"></div>
                      </div>
                      <div className="h-4 md:h-5 bg-base-300 rounded mb-1"></div>
                      <div className="h-2 bg-base-300 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1 md:pt-2">
                  <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-2 md:p-2.5 hover:border-red-200 dark:hover:border-red-900/50 transition shadow-sm hover:shadow-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="text-red-600" size={12} />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-black text-base-content">{formatCount(apiStats.totalDonors)}</p>
                    <p className="text-xs text-base-content/70 font-semibold">Active Donors</p>
                  </div>
                  <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-2 md:p-2.5 hover:border-red-200 dark:hover:border-red-900/50 transition shadow-sm hover:shadow-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <Heart className="text-red-600 fill-red-600" size={12} />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-black text-base-content">{livesSaved}</p>
                    <p className="text-xs text-base-content/70 font-semibold">Lives Saved</p>
                  </div>
                  <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-2 md:p-2.5 hover:border-red-200 dark:hover:border-red-900/50 transition shadow-sm hover:shadow-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <Activity className="text-red-600" size={12} />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-black text-base-content">{formatCount(centersData.length)}</p>
                    <p className="text-xs text-base-content/70 font-semibold">Blood Banks</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Image Grid */}
            <div className="relative hidden lg:block">
              {/* Main Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl transform rotate-2"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=2016&auto=format&fit=crop"
                    alt="Blood Donation"
                    className="w-full h-[280px] lg:h-[320px] xl:h-[360px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Floating Info Card */}
              <div className="absolute -bottom-4 -left-4 bg-base-200 border-2 border-base-300 rounded-2xl p-3 shadow-xl max-w-[180px] hover:border-red-200 dark:hover:border-red-900/50 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <Shield className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="text-base font-black text-base-content">24/7</p>
                    <p className="text-xs text-base-content/70 font-semibold">Emergency Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                  <Clock size={10} />
                  <span>Always ready to help</span>
                </div>
              </div>

              {/* Small Accent Card */}
              <div className="absolute top-6 -right-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-2 shadow-lg">
                <Droplet className="text-white fill-white mb-1" size={16} />
                <p className="text-white font-bold text-xs">Every Drop</p>
                <p className="text-white/90 text-xs">Counts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 md:h-12">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-base-100" />
          </svg>
        </div>
      </div>

      {/* Featured Section */}
      <div className="py-24 bg-base-100">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4">
              <Award className="text-red-700 dark:text-red-400" size={16} />
              <span className="text-red-600 dark:text-red-500 font-bold text-sm">WHY CHOOSE US</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
              How It Works
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Simple, fast, and secure way to connect donors with those in need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="group bg-base-200 border-2 border-base-300 rounded-2xl p-6 hover:border-red-200 dark:hover:border-red-900/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-red-200 dark:shadow-red-900/30">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">Register as Donor</h3>
              <p className="text-base-content/70 leading-relaxed text-sm">
                Quick and easy registration process. Sign up with your details, blood type, and location to join our life-saving community.
              </p>
            </div>

            <div className="group bg-base-200 border-2 border-base-300 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
                <Search className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">Find Blood Donors</h3>
              <p className="text-base-content/70 leading-relaxed text-sm">
                Search for available donors by blood type, location, and district. Connect instantly when you need blood urgently.
              </p>
            </div>

            <div className="group bg-base-200 border-2 border-base-300 rounded-2xl p-6 hover:border-green-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-200 dark:shadow-green-900/30">
                <Droplet className="text-white fill-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">Donate & Save Lives</h3>
              <p className="text-base-content/70 leading-relaxed text-sm">
                Connect with recipients and schedule your donation. Every drop counts and can save up to three lives in your community.
              </p>
            </div>

            <div className="group bg-base-200 border-2 border-base-300 rounded-2xl p-6 hover:border-purple-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-200 dark:shadow-purple-900/30">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">Get Recognition</h3>
              <p className="text-base-content/70 leading-relaxed text-sm">
                Receive certificates and recognition for your contributions. Join our donor appreciation program and inspire others to donate.
              </p>
            </div>
          </div>

          {/* Why Donate Section */}
          <div className="bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-extrabold text-base-content mb-4">
                Why Donate Blood?
              </h3>
              <p className="text-lg text-base-content/70">
                Your donation makes a real difference in saving lives
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="text-red-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-base-content mb-2">30 mins</h4>
                <p className="text-base-content/70">Average donation time</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="text-red-600 fill-red-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-base-content mb-2">3 Lives</h4>
                <p className="text-base-content/70">Can be saved per donation</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="text-red-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-base-content mb-2">Free Health</h4>
                <p className="text-base-content/70">Health screening included</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="text-red-600" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-base-content mb-2">100% Safe</h4>
                <p className="text-base-content/70">Sterile equipment used</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Donation Centers Section */}
      <div className="py-24 bg-base-100">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4">
              <MapPin className="text-red-700 dark:text-red-400" size={16} />
              <span className="text-red-600 dark:text-red-500 font-bold text-sm">DONATION CENTERS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
              Featured Blood Centers
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Locate blood donation centers near you for safe and convenient donation
            </p>
          </div>

          {/* Cards Grid */}
          {centersData.length === 0 ? (
            <SkeletonLoader type="card" count={4} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {centersData.filter(center => center.featured).slice(0, 4).map((center) => (
                <div key={center.id} className="bg-base-200 border-2 border-base-300 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-300 group">
                  {/* Center Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Heart className="text-white fill-white" size={32} />
                    </div>
                    {/* Featured Badge */}
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-md">
                      ⭐ Featured
                    </div>
                  </div>
                  
                  {/* Center Name */}
                  <h3 className="text-lg md:text-xl font-bold text-base-content mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                    {center.name}
                  </h3>
                  
                  {/* Center Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <MapPin size={14} className="text-red-600 shrink-0" />
                      <span className="truncate">{center.district}, {center.division}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <Phone size={14} className="text-red-600 shrink-0" />
                      <span className="truncate">{center.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <Clock size={14} className="text-green-600 shrink-0" />
                      <span className="truncate">{center.openHours}</span>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(center.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-base-content">{center.rating}</span>
                    <span className="text-xs text-base-content/60">({center.reviews} reviews)</span>
                  </div>
                  
                  {/* View Details Button */}
                  <a 
                    href={`/center/${center.id}`}
                    className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-center"
                  >
                    View Details
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* View All Centers Button */}
          <div className="text-center mt-12">
            <a
              href="/center"
              className="inline-flex items-center justify-center gap-3 bg-base-200 border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <MapPin size={20} />
              <span>View All Centers</span>
            </a>
          </div>
        </div>
      </div>

      {/* Blood Drop Animation Counter Section */}
      <div className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200 relative overflow-hidden">
        {/* Animated Background Drops */}
        <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Droplet 
                className="text-red-200 fill-red-200 opacity-30" 
                size={20 + Math.random() * 20} 
              />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4 shadow-lg">
              <Droplet className="text-red-600 dark:text-red-400 fill-red-600" size={16} />
              <span className="text-red-600 dark:text-red-400 font-bold text-sm">LIVE IMPACT</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
              Every Drop <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Counts</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Watch the real-time impact of our blood donation community
            </p>
          </div>

          {/* Main Counter Display */}
          <div className="bg-base-200 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-red-100 dark:border-red-900/50 mb-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Animated Blood Drop */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <Droplet className="text-white fill-white" size={60} />
                  </div>
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-red-400 rounded-full animate-ping opacity-20"></div>
                  <div className="absolute inset-2 w-28 h-28 md:w-36 md:h-36 bg-red-300 rounded-full animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>

              {/* Live Counter */}
              <div className="text-center md:col-span-2">
                <div className="mb-6 bg-base-200 ">
                  <p className="text-6xl md:text-8xl font-black text-base-content mb-2">
                    {livesSaved}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-red-700 bg-base-200 dark:text-red-500">Lives Saved Today</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-4 text-center hover:border-red-200 dark:hover:border-red-900/50 transition-all shadow-sm hover:shadow-lg">
                    <p className="text-3xl md:text-4xl font-black text-red-600 dark:text-red-500">{formatCount(apiStats.totalDonors)}</p>
                    <p className="text-sm font-bold text-base-content/70">Active Heroes</p>
                  </div>
                  <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-4 text-center hover:border-blue-200 dark:hover:border-blue-900/50 transition-all shadow-sm hover:shadow-lg">
                    <p className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-500">{formatCount(apiStats.pendingRequests)}</p>
                    <p className="text-sm font-bold text-base-content/70">Pending Requests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Visualization */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group hover:border-red-200 dark:hover:border-red-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-200 dark:shadow-red-900/30">
                  <Heart className="text-white fill-white" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-base-content">{Math.floor(livesSaved * 0.8)}</p>
                  <p className="text-sm font-bold text-base-content/70">Emergency Cases</p>
                </div>
              </div>
              <div className="w-full bg-base-300 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group hover:border-blue-200 dark:hover:border-blue-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
                  <Activity className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-base-content">{Math.floor(livesSaved * 0.6)}</p>
                  <p className="text-sm font-bold text-base-content/70">Surgeries Enabled</p>
                </div>
              </div>
              <div className="w-full bg-base-300 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group hover:border-green-200 dark:hover:border-green-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-green-200 dark:shadow-green-900/30">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-base-content">{Math.floor(livesSaved * 1.2)}</p>
                  <p className="text-sm font-bold text-base-content/70">Families Helped</p>
                </div>
              </div>
              <div className="w-full bg-base-300 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group hover:border-purple-200 dark:hover:border-purple-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-purple-200 dark:shadow-purple-900/30">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-base-content">{apiStats.successRate}%</p>
                  <p className="text-sm font-bold text-base-content/70">Success Rate</p>
                </div>
              </div>
              <div className="w-full bg-base-300 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: `${apiStats.successRate}%` }}></div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-base-200 border-2 border-red-100 dark:border-red-900/50 rounded-2xl p-8 shadow-lg hover:border-red-200 dark:hover:border-red-900/70 transition-all">
              <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-4">
                Be Part of This Impact
              </h3>
              <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
                Join thousands of heroes who are making a difference every day. Your single donation can save up to 3 lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Droplet className="fill-white" size={20} />
                  Start Saving Lives
                </a>
                <a
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 bg-base-200 border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-base-300 hover:border-red-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Search size={20} />
                  Find Blood Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BloodCompatibilitySection />
      <FAQPage />
      {/* Contact Us Section */}
      <div className="py-24 bg-base-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
              <span className="text-red-600 dark:text-red-400 font-bold text-sm">GET IN TOUCH</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-base-content/70">
              We're here to help 24/7. Reach out anytime you need assistance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Send className="text-white" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-base-content">Send us a Message</h3>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in">
                  <CheckCircle className="text-green-600" size={20} />
                  <div>
                    <p className="text-green-800 font-semibold">Message sent successfully!</p>
                    <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-fade-in">
                  <AlertCircle className="text-red-600" size={20} />
                  <div>
                    <p className="text-red-800 font-semibold">Failed to send message</p>
                    <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-bold text-base-content mb-2 group-focus-within:text-red-600 transition-colors duration-200">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-base-300 focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-base-content/30 focus:ring-2 focus:ring-red-100 bg-base-100 text-base-content"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-base-content mb-2 group-focus-within:text-red-600 transition-colors duration-200">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border-2 border-base-300 focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-base-content/30 focus:ring-2 focus:ring-red-100 bg-base-100 text-base-content"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-base-content mb-2 group-focus-within:text-red-600 transition-colors duration-200">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here... Tell us how we can help you."
                    className="w-full px-4 py-3 rounded-xl border-2 border-base-300 focus:border-red-500 focus:outline-none transition-all duration-300 hover:border-base-content/30 h-32 resize-none focus:ring-2 focus:ring-red-100 bg-base-100 text-base-content"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 ${isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200 hover:shadow-xl active:scale-95 dark:shadow-sm dark:hover:shadow-lg'
                    } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {/* Form Footer */}
              <div className="mt-6 pt-6 border-t border-base-300">
                <p className="text-sm text-base-content/70 text-center">
                  <span className="font-semibold">Response Time:</span> We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-xl">
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
                      <p className="text-xl font-bold break-all">support@Hemovia.org</p>
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
                className="block bg-base-200 border-2 border-red-600 text-red-600 px-8 py-5 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition text-center text-lg shadow-lg"
              >
                <Phone className="inline-block mr-2" size={24} />
                Emergency Hotline - Call Now
              </a>

              <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-red-600" size={24} />
                  <h4 className="font-bold text-base-content text-lg">Working Hours</h4>
                </div>
                <div className="space-y-2 text-base-content/70">
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

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
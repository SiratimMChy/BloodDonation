import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { MapPin, Phone, Clock, Star, Award, Building, ChevronLeft, ExternalLink, Shield, CheckCircle, Globe, Mail, Calendar, Users } from 'lucide-react';
import axios from 'axios';

const CenterDetails = () => {
  const { id } = useParams();
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch center data from JSON file
  useEffect(() => {
    setLoading(true);
    axios.get('/centers.json')
      .then(res => {
        const foundCenter = res.data.find(c => c.id === parseInt(id));
        if (foundCenter) {
          setCenter(foundCenter);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading center:', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-red-500 mb-4"></div>
          <p className="text-base-content/70">Loading center details...</p>
        </div>
      </div>
    );
  }

  if (error || !center) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <Building className="mx-auto text-base-content/40 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-base-content mb-2">Center Not Found</h2>
          <p className="text-base-content/60 mb-6">The donation center you're looking for doesn't exist or hasn't been added yet.</p>
          <Link 
            to="/center" 
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Back to Centers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/center" 
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold mb-4 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Centers
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center shrink-0">
                  <Building className="text-red-600 dark:text-red-400" size={32} />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">{center.name}</h1>
                  <div className="flex items-center gap-4 text-base-content/60">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{center.district}, {center.division}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-red-500 fill-red-500" />
                      <span className="font-semibold">{center.rating}</span>
                      <span>({center.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {center.verified && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                )}
                {center.featured && (
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <Star size={14} />
                    Featured
                  </span>
                )}
                {center.emergency && center.emergency.includes('24/7') && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    24/7 Emergency
                  </span>
                )}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-64">
              {center.phone && (
                <a 
                  href={`tel:${center.phone}`}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              )}
              {center.email && (
                <a 
                  href={`mailto:${center.email}`}
                  className="bg-base-300 hover:bg-base-400 text-base-content px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Email
                </a>
              )}
              {!center.phone && !center.email && (
                <div className="bg-base-200 text-base-content/60 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <Phone size={18} />
                  Contact info coming soon
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-base-content mb-4">About This Center</h2>
              <p className="text-base-content/70 leading-relaxed">
                {center.description || `${center.name} is a trusted blood donation center located in ${center.district}, ${center.division}. We provide safe and reliable blood donation services with professional medical staff and modern facilities. Our commitment is to ensure the highest standards of safety and care for all donors while serving the community's blood needs.`}
              </p>
            </div>

            {/* Facilities */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-base-content mb-4">Facilities & Services</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {center.facilities && center.facilities.length > 0 ? (
                  center.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <CheckCircle className="text-green-600 shrink-0" size={18} />
                      <span className="text-base-content/70">{facility}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-base-content/50">Facility information will be updated soon.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Blood Types Available */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-base-content mb-4">Available Blood Types</h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {(center.bloodTypes || ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).map((type, index) => (
                  <div key={index} className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-900/50 rounded-lg p-3 text-center">
                    <span className="font-bold text-red-600 dark:text-red-400">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-base-content mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-base-content/40 shrink-0 mt-1" size={18} />
                  <div>
                    <p className="font-semibold text-base-content">Address</p>
                    <p className="text-base-content/60">{center.address}</p>
                  </div>
                </div>
                {center.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="text-base-content/40 shrink-0 mt-1" size={18} />
                    <div>
                      <p className="font-semibold text-base-content">Phone</p>
                      <a href={`tel:${center.phone}`} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                        {center.phone}
                      </a>
                    </div>
                  </div>
                )}
                {center.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="text-base-content/40 shrink-0 mt-1" size={18} />
                    <div>
                      <p className="font-semibold text-base-content">Email</p>
                      <a href={`mailto:${center.email}`} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                        {center.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-base-content mb-4">Operating Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-base-content/40" size={18} />
                  <div>
                    <p className="font-semibold text-base-content">Open Days</p>
                    <p className="text-base-content/60">{center.openDays || 'Please contact for schedule'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-base-content/40" size={18} />
                  <div>
                    <p className="font-semibold text-base-content">Hours</p>
                    <p className="text-base-content/60">{center.openHours || 'Please contact for hours'}</p>
                  </div>
                </div>
                {center.emergency && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-3">
                    <p className="text-blue-800 dark:text-blue-400 font-semibold text-sm">{center.emergency}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-base-content mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {center.established && (
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/60">Established</span>
                    <span className="font-semibold text-base-content">{center.established}</span>
                  </div>
                )}
                {center.totalDonors && (
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/60">Total Donors</span>
                    <span className="font-semibold text-base-content">{center.totalDonors}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-base-content/60">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="text-red-500 fill-red-500" size={16} />
                    <span className="font-semibold text-base-content">{center.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base-content/60">Reviews</span>
                  <span className="font-semibold text-base-content">{center.reviews}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterDetails;
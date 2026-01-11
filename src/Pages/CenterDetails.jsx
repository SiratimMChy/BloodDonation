import React from 'react';
import { useParams, Link } from 'react-router';
import { MapPin, Phone, Clock, Star, Award, Building, ChevronLeft, ExternalLink, Shield, CheckCircle, Globe, Mail, Calendar, Users } from 'lucide-react';

const CenterDetails = () => {
  const { id } = useParams();

  // Complete center data matching the main page
  const centers = [
    {
      id: 1,
      name: 'Dhaka Medical College Hospital – Blood Transfusion Department',
      division: 'Dhaka',
      district: 'Dhaka',
      address: 'Bakshibazar, Dhaka 1000, Bangladesh',
      phone: '+880-2-8626812',
      email: 'bloodbank@dmch.gov.bd',
      openDays: 'Sunday to Thursday',
      openHours: '08:00 AM – 03:00 PM',
      emergency: '24/7 Emergency Blood Supply Available',
      rating: 4.8,
      reviews: 245,
      facilities: [
        'Pre-Donation Health Screening',
        'Component Blood Separation',
        'Air-Conditioned Donor Waiting Area',
        'Qualified Medical Personnel'
      ],
      verified: true,
      featured: true,
      description: 'Dhaka Medical College Hospital Blood Transfusion Department is one of the leading blood donation centers in Bangladesh. We provide safe, reliable blood donation services with state-of-the-art facilities and experienced medical professionals.',
      established: '1946',
      totalDonors: '15,000+',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    {
      id: 2,
      name: 'Quantum Foundation Blood Transfusion Center',
      division: 'Dhaka',
      district: 'Dhaka',
      address: 'Mirpur-1, Dhaka 1216, Bangladesh',
      phone: '+880-2-9004405',
      email: 'blood@quantummethod.org.bd',
      openDays: 'All Days',
      openHours: '24 Hours',
      emergency: 'Round-the-Clock Emergency Blood Services',
      rating: 4.9,
      reviews: 312,
      facilities: [
        '24/7 Voluntary Blood Donation',
        'Advanced Screening Laboratory',
        'Donor Recognition Program',
        'Secure Parking Facility'
      ],
      verified: true,
      featured: true,
      description: 'Quantum Foundation Blood Transfusion Center operates 24/7 to provide emergency blood services. Our advanced facilities and dedicated staff ensure the highest standards of safety and care for all donors.',
      established: '1989',
      totalDonors: '25,000+',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    {
      id: 3,
      name: 'Sandhani – Dhaka University Medical Unit',
      division: 'Dhaka',
      district: 'Dhaka',
      address: 'University of Dhaka Campus, Dhaka 1000',
      phone: '+880-2-9661900',
      email: 'sandhani@du.ac.bd',
      openDays: 'Sunday to Thursday',
      openHours: '10:00 AM – 05:00 PM',
      emergency: 'Emergency Support via On-Call Volunteers',
      rating: 4.8,
      reviews: 278,
      facilities: [
        'Trained Student Volunteers',
        'Safe & Ethical Blood Collection',
        'Donation Certificates',
        'Post-Donation Refreshments'
      ],
      verified: true,
      featured: false,
      description: 'Sandhani Dhaka University Medical Unit is a student-led voluntary blood donation organization providing safe and ethical blood collection services with trained volunteers.',
      established: '1978',
      totalDonors: '8,000+',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    {
      id: 4,
      name: 'Bangabandhu Sheikh Mujib Medical University – Blood Bank',
      division: 'Dhaka',
      district: 'Dhaka',
      address: 'Shahbag, Dhaka 1000, Bangladesh',
      phone: '+880-2-9664400',
      email: 'bloodbank@bsmmu.edu.bd',
      openDays: 'Sunday to Thursday',
      openHours: '09:00 AM – 04:00 PM',
      emergency: '24/7 Emergency Blood Services Available',
      rating: 4.7,
      reviews: 198,
      facilities: [
        'Advanced Blood Testing',
        'Component Separation Unit',
        'Specialist Medical Staff',
        'Dedicated Donor Lounge'
      ],
      verified: true,
      featured: false,
      description: 'Bangabandhu Sheikh Mujib Medical University Blood Bank provides comprehensive blood services with advanced testing and component separation facilities.',
      established: '1998',
      totalDonors: '12,000+',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    {
      id: 5,
      name: 'Chittagong Medical College Hospital – Blood Bank',
      division: 'Chittagong',
      district: 'Chittagong',
      address: 'K.B. Fazlul Kader Road, Chittagong 4203',
      phone: '+880-31-619245',
      email: 'bloodbank@cmch.gov.bd',
      openDays: 'Sunday to Thursday',
      openHours: '09:00 AM – 04:00 PM',
      emergency: '24/7 Emergency Blood Supply Available',
      rating: 4.7,
      reviews: 189,
      facilities: [
        'Free Health Screening',
        'Donor Identification Card',
        'Comfortable Waiting Area',
        'Post-Donation Care'
      ],
      verified: true,
      featured: true,
      description: 'Chittagong Medical College Hospital Blood Bank serves the port city with reliable blood donation services. We maintain strict safety protocols and provide comprehensive care for all donors.',
      established: '1957',
      totalDonors: '12,000+',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    {
      id: 6,
      name: 'Chittagong General Hospital – Blood Transfusion Service',
      division: 'Chittagong',
      district: 'Chittagong',
      address: 'Anderkilla, Chittagong 4000',
      phone: '+880-31-610320',
      email: 'bloodbank@cgh.gov.bd',
      openDays: 'Sunday to Thursday',
      openHours: '08:30 AM – 03:30 PM',
      emergency: 'Emergency Blood Support Available',
      rating: 4.5,
      reviews: 145,
      facilities: [
        'Modern Blood Collection Equipment',
        'Trained Nursing Staff',
        'Sterile Environment',
        'Donor Refreshments'
      ],
      verified: true,
      featured: false,
      description: 'Chittagong General Hospital provides reliable blood transfusion services with modern equipment and trained medical staff.',
      established: '1965',
      totalDonors: '8,500+',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    {
      id: 7,
      name: 'Bangladesh Red Crescent Society – Chittagong Blood Center',
      division: 'Chittagong',
      district: 'Chittagong',
      address: 'Agrabad, Chittagong 4100',
      phone: '+880-31-2523456',
      email: 'chittagong@redcrescent.org.bd',
      openDays: 'All Days',
      openHours: '08:00 AM – 08:00 PM',
      emergency: '24/7 Emergency Blood Services',
      rating: 4.6,
      reviews: 167,
      facilities: [
        'Walk-in Donation Service',
        'Volunteer Donor Network',
        'Secure Parking',
        'Community Outreach'
      ],
      verified: true,
      featured: false,
      description: 'Bangladesh Red Crescent Society Chittagong provides community-based blood services with extensive volunteer network.',
      established: '1973',
      totalDonors: '10,000+',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    {
      id: 23,
      name: 'Mymensingh Medical College Hospital – Blood Bank',
      division: 'Mymensingh',
      district: 'Mymensingh',
      address: 'Charpara, Mymensingh 2200',
      phone: '+880-91-66040',
      email: 'bloodbank@mmch.gov.bd',
      openDays: 'Sunday to Thursday',
      openHours: '09:00 AM – 03:00 PM',
      emergency: '24/7 Emergency Blood Services',
      rating: 4.7,
      reviews: 167,
      facilities: [
        'State-of-the-Art Equipment',
        'Experienced Medical Staff',
        'Donor Identification Cards',
        'Refreshments'
      ],
      verified: true,
      featured: true,
      description: 'Mymensingh Medical College Hospital Blood Bank provides comprehensive blood donation services with modern equipment and experienced medical professionals ensuring donor safety and comfort.',
      established: '1962',
      totalDonors: '10,000+',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    }
  ];

  const center = centers.find(c => c.id === parseInt(id));

  if (!center) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <Building className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Center Not Found</h2>
          <p className="text-gray-600 mb-6">The donation center you're looking for doesn't exist or hasn't been added yet.</p>
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
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                  <Building className="text-red-600" size={32} />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{center.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
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
              <a 
                href={`tel:${center.phone}`}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Call Now
              </a>
              <a 
                href={`mailto:${center.email}`}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Email
              </a>
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
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Center</h2>
              <p className="text-gray-600 leading-relaxed">{center.description}</p>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Facilities & Services</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {center.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="text-green-600 shrink-0" size={18} />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blood Types Available */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Available Blood Types</h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {center.bloodTypes.map((type, index) => (
                  <div key={index} className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-center">
                    <span className="font-bold text-red-600">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gray-400 shrink-0 mt-1" size={18} />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">{center.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-gray-400 shrink-0 mt-1" size={18} />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href={`tel:${center.phone}`} className="text-red-600 hover:text-red-700">
                      {center.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-gray-400 shrink-0 mt-1" size={18} />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href={`mailto:${center.email}`} className="text-red-600 hover:text-red-700">
                      {center.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Operating Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-400" size={18} />
                  <div>
                    <p className="font-semibold text-gray-900">Open Days</p>
                    <p className="text-gray-600">{center.openDays}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-400" size={18} />
                  <div>
                    <p className="font-semibold text-gray-900">Hours</p>
                    <p className="text-gray-600">{center.openHours}</p>
                  </div>
                </div>
                {center.emergency && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 font-semibold text-sm">{center.emergency}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Established</span>
                  <span className="font-semibold text-gray-900">{center.established}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Donors</span>
                  <span className="font-semibold text-gray-900">{center.totalDonors}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="text-red-500 fill-red-500" size={16} />
                    <span className="font-semibold text-gray-900">{center.rating}</span>
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

export default CenterDetails;
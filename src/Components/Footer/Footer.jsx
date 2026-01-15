import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';

const Footer = () => {
  return (
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
              <li>
                <Link to="/donation-requests" className="text-gray-400 hover:text-white transition hover:translate-x-1 inline-block">
                  Donation Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h6 className="font-bold text-lg mb-5 text-white">Support</h6>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+8801234567890" 
                  className="text-gray-400 hover:text-white transition hover:translate-x-1 inline-block"
                >
                  Emergency Hotline
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@hemovia.org" 
                  className="text-gray-400 hover:text-white transition hover:translate-x-1 inline-block"
                >
                  Email Support
                </a>
              </li>
              <li>
                <span className="text-gray-400">
                  Sylhet, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h6 className="font-bold text-lg mb-5 text-white">Follow Us</h6>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200 group"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200 group"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200 group"
                aria-label="Follow us on YouTube"
              >
                <FaYoutube size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 justify-center align-center items-center gap-4">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} Hemovia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
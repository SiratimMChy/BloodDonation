import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <MdBloodtype className="text-white" size={24} />
              </div>
              <span className="text-2xl font-extrabold">Hemovia</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Connecting donors with those in need. Every donation saves lives and brings hope to families in critical need.
            </p>
          </div>

          {/* Main Links */}
          <div>
            <h6 className="font-bold text-lg mb-5 text-white">Main</h6>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-red-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/BloodCom" className="text-gray-400 hover:text-red-500 transition">
                  Blood Compatibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Donation Links */}
          <div>
            <h6 className="font-bold text-lg mb-5 text-white">Donation</h6>
            <ul className="space-y-3">
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-red-500 transition">
                  Donate Now
                </Link>
              </li>
              <li>
                <Link to="/donation-requests" className="text-gray-400 hover:text-red-500 transition">
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-red-500 transition">
                  Search Donors
                </Link>
              </li>
              <li>
                <Link to="/center" className="text-gray-400 hover:text-red-500 transition">
                  Blood Centers
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h6 className="font-bold text-lg mb-5 text-white">Account</h6>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-red-500 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/Signup" className="text-gray-400 hover:text-red-500 transition">
                  Register as Donor
                </Link>
              </li>
              <li>
                <a
                  href="tel:+8801234567890"
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  Emergency Hotline
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@hemovia.org"
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h6 className="font-bold text-lg mb-5 text-white">Follow Us</h6>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200"
                aria-label="Follow us on YouTube"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-center text-sm">
            © {new Date().getFullYear()} Hemovia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

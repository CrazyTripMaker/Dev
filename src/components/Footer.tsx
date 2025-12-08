import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CTM</span>
              </div>
              <span className="text-xl font-bold text-white">
                CrazyTripMakers
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted travel partner for unforgettable journeys across India.
              Creating memories one trip at a time.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
            <li>
              <Link 
                to="/about-us" 
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link 
                to="/our-branches" 
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Our Branches
              </Link>
            </li>

            <li>
              <Link 
                to="/group-tours" 
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Group Tours
              </Link>
            </li>

            <li>
              <Link 
                to="/personal-tours" 
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Personal Tours
              </Link>
            </li>

            <li>
              <Link 
                to="/customised-tours" 
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Customised Tours
              </Link>
            </li>
          </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Himachal Pradesh</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Kashmir</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Kerala</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Rajasthan</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">+91-9573623034,+91-9974542678 </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">info@CrazyTripMakers.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Hyderabad, Ahmedabad</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 CrazyTripMakers. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

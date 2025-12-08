import { Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-6 bg-white/95 backdrop-blur-sm shadow-sm">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-12 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">CTM</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          CrazyTripMakers
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <Link
          to="/"
          className={`transition-colors font-medium ${
            isActive('/') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
          }`}
        >
          Home
        </Link>
        <Link
          to="/group-tours"
          className={`transition-colors font-medium ${
            isActive('/group-tours') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
          }`}
        >
          Group Tours
        </Link>
        <Link
          to="/personal-tours"
          className={`transition-colors font-medium ${
            isActive('/personal-tours') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
          }`}
        >
          Personal Tours
        </Link>
        <Link
          to="/customised-tours"
          className={`transition-colors font-medium ${
            isActive('/customised-tours') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
          }`}
        >
          Customised Tours
        </Link>
        <Link
          to="/contact"
          className={`transition-colors font-medium ${
            isActive('/contact') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
          }`}
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Phone className="w-5 h-5 text-emerald-600" />
        <span className="text-gray-700 font-semibold">+91-9773335623</span>
      </div>
    </nav>
  );
}

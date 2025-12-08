import { Search } from 'lucide-react';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <div className="relative h-[600px] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20" />

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Discover Your Next
          <span className="block mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Adventure
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Everything you need for your perfect holiday—on a budget
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors bg-white shadow-lg"
            />
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            Search Tours
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const allTours = [
  {
    id: "10",
    title: "Magical Kerala From Cochin",
    price: "11,999",
    discount: "35%",
    duration: "5 Days & 4 Nights",
    type: "Standard",
    category: "Kerala",
    destinations: "Munnar, Thekkady, Alleppey",
    image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "11",
    title: "Magical Himachal From Delhi",
    price: "11,499",
    discount: "35%",
    duration: "6 Days & 5 Nights",
    type: "Standard",
    category: "Himachal",
    destinations: "Shimla, Manali, Solang Valley, Kullu, Kasol",
    image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "12",
    title: "Magical Kashmir From Srinagar",
    price: "15,999",
    discount: "35%",
    duration: "6 Days & 5 Nights",
    type: "Standard",
    category: "Kashmir",
    destinations: "Srinagar, Pahalgam, Gulmarg, Sonmarg",
    image: "https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id:"20",
    title: "Rajasthan Royal Experience",
    price: "18,999",
    discount: "30%",
    duration: "7 Days & 6 Nights",
    type: "Deluxe",
    category: "Rajasthan",
    destinations: "Jaipur, Udaipur, Pushkar, Jaisalmer",
    image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    Id: "21",
    title: "Goa Beach Paradise",
    price: "9,999",
    discount: "25%",
    duration: "4 Days & 3 Nights",
    type: "Standard",
    category: "Goa",
    destinations: "North Goa, South Goa, Dudhsagar Falls",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "22",
    title: "Uttarakhand Adventure",
    price: "13,499",
    discount: "30%",
    duration: "6 Days & 5 Nights",
    type: "Standard",
    category: "Uttarakhand",
    destinations: "Rishikesh, Mussoorie, Haridwar, Dehradun",
    image: "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "23",
    title: "Andaman Island Escape",
    price: "22,999",
    discount: "20%",
    duration: "5 Days & 4 Nights",
    type: "Premium",
    category: "Andaman",
    destinations: "Port Blair, Havelock, Neil Island",
    image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "24",
    title: "Meghalaya Living Root Bridges",
    price: "14,999",
    discount: "28%",
    duration: "5 Days & 4 Nights",
    type: "Standard",
    category: "Meghalaya",
    destinations: "Shillong, Cherrapunji, Dawki, Mawlynnong",
    image: "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const categories = ["All", "Himachal", "Kashmir", "Kerala", "Rajasthan", "Goa", "Uttarakhand", "Andaman", "Meghalaya"];

export default function PersonalTours() {

  const navigate = useNavigate(); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTours = allTours.filter(tour => {
    const matchesCategory = selectedCategory === "All" || tour.category === selectedCategory;
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.destinations.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="relative h-64 bg-gradient-to-br from-teal-600 to-cyan-600 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4">Personal Tours</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Customized itineraries designed just for you and your loved ones
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tours by destination or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors bg-white"
              />
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filters</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredTours.length}</span> tours
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {tour.discount} OFF
                </div>
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-teal-600" />
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full mb-3">
                  {tour.type}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {tour.title}
                </h3>

                <div className="flex items-start text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-teal-600 flex-shrink-0" />
                  <span className="line-clamp-2">{tour.destinations}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-teal-600">₹ {tour.price}</span>
                    <span className="text-gray-500 text-sm">/-</span>
                  </div>
                  <button 
                  onClick={() => navigate(`/tour-details/${tour.id}`)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group-hover:space-x-3">
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Users, User, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['Group Tours', 'Personal Tours', 'Couple/Honeymoon Tours'];

const toursByCategory = {
  'Group Tours': [
    {
      id: "1",
      title: "Himachal Pocket From Rajkot",
      price: "12,999",
      discount: "35%",
      duration: "9 Days & 8 Nights",
      type: "Group",
      destinations: "Shimla, Manali, Dalhousie, Golden Temp..",
      image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "2",
      title: "Heavenly Kashmir with Amritsar",
      price: "16,299",
      discount: "35%",
      duration: "10 Days & 9 Nights",
      type: "Group",
      destinations: "Vaishnodevi, Srinagar, Sonmarg, Gulmarg..",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ],
  'Personal Tours': [
    {
      id: "10",
      title: "Magical Kerala From Cochin",
      price: "11,999",
      discount: "35%",
      duration: "5 Days & 4 Nights",
      type: "Standard",
      destinations: "Munnar, Thekkady, Alleppey..",
      image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "11",
      title: "Magical Himachal From Delhi",
      price: "11,499",
      discount: "35%",
      duration: "6 Days & 5 Nights",
      type: "Standard",
      destinations: "Shimla, Manali, Solang Valley, Kullu, Ka..",
      image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "12",
      title: "Magical Kashmir From Srinagar",
      price: "15,999",
      discount: "35%",
      duration: "6 Days & 5 Nights",
      type: "Standard",
      destinations: "Srinagar, Pahalgam, Gulmarg, Sonmarg..",
      image: "https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ],
  'Couple/Honeymoon Tours': [
    {
      id: "16",
      title: "Shimla Manali Couple Special",
      price: "12,699",
      discount: "35%",
      duration: "8 Days & 7 Nights",
      type: "Group",
      destinations: "Shimla, Manali, Kullu, Kufri, Jogini Wat..",
      image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ]
};

export default function TopCategories() {
  const navigate = useNavigate(); 
  const [activeCategory, setActiveCategory] = useState('Group Tours');

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Explore</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Top Categories</h2>
          <p className="text-gray-600 text-lg">Grab best offer from our top categories...</p>
        </div>

        <div className="flex justify-center space-x-4 mb-12 flex-wrap gap-4">
          {categories.map((category) => {
            const Icon = category === 'Group Tours' ? Users : category === 'Personal Tours' ? User : Heart;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {toursByCategory[activeCategory as keyof typeof toursByCategory].map((tour, index) => (
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
                    <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-3">
                  {tour.type}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {tour.title}
                </h3>

                <div className="flex items-start text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                  <span className="line-clamp-2">{tour.destinations}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-emerald-600">₹ {tour.price}</span>
                    <span className="text-gray-500 text-sm">/-</span>
                  </div>
                  <button 
                  onClick={() => navigate(`/tour-details/${tour.id}`)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group-hover:space-x-3">
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

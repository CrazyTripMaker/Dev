// TourDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, User, Heart, Check, Star, ArrowLeft, Phone, Mail, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const allToursDatabase = [
  // Group Tours
  {
    id: "1",
    title: "Himachal Pocket From Rajkot",
    price: "12,999",
    discount: "35%",
    duration: "9 Days & 8 Nights",
    type: "Group",
    category: "Himachal",
    destinations: ["Shimla", "Manali", "Dalhousie", "Golden Temple"],
    description: "Experience the breathtaking beauty of Himachal Pradesh with this comprehensive tour package. Visit the most popular hill stations and spiritual sites.",
    detailedDescription: `
      This 9-day tour takes you through the most beautiful destinations in Himachal Pradesh. 
      Starting from Rajkot, you'll explore the colonial charm of Shimla, the adventure hub of Manali, 
      the serene landscapes of Dalhousie, and the spiritual tranquility of the Golden Temple in Amritsar.
      
      The package includes all major sightseeing, comfortable accommodations, and delicious meals. 
      Perfect for travelers looking for a balanced mix of nature, adventure, and spirituality.
    `,
    inclusions: [
      "Accommodation in 3-star hotels",
      "Daily breakfast and dinner",
      "All transfers in AC vehicle",
      "Sightseeing as per itinerary",
      "Driver allowances and parking charges",
      "All applicable taxes"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Lunch and personal expenses",
      "Entry tickets to monuments",
      "Travel insurance",
      "Tips and porter charges"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Delhi & Transfer to Shimla",
        description: "Arrive in Delhi, meet our representative and proceed to Shimla. Overnight stay in Shimla."
      },
      {
        day: "Day 2",
        title: "Shimla Sightseeing",
        description: "Visit Mall Road, The Ridge, Christ Church, and Jakhoo Temple. Overnight in Shimla."
      },
      {
        day: "Day 3",
        title: "Shimla to Manali",
        description: "Travel to Manali via Kullu Valley. Visit Kullu Shawl Factory en route. Overnight in Manali."
      }
    ],
    highlights: [
      "Stay in premium hotels with mountain views",
      "Visit Snow Point in Solang Valley",
      "Experience the scenic Toy Train ride",
      "Explore local markets and cuisine",
      "Professional guide services"
    ],
    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800",
    tourType: "Group",
    maxGroupSize: 20,
    difficulty: "Easy",
    rating: 4.8,
    reviews: 124,
    departureCity: "Rajkot",
    availableDates: ["2024-12-15", "2024-12-22", "2025-01-05"]
  },
  // Add more tours here...
];

export default function TourDetails() {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In real app, fetch from API
    const foundTour = allToursDatabase.find(t => t.id === tourId);
    if (foundTour) {
      setTour(foundTour);
    }
  }, [tourId]);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Tour not found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = [
    tour.image,
    "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={images[selectedImage]}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-white mb-6 hover:text-emerald-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Tours</span>
              </button>
              <h1 className="text-5xl font-bold text-white mb-4">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{tour.destinations.join(", ")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Group Size: {tour.maxGroupSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Thumbnails */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx ? 'border-emerald-500' : 'border-transparent'
              }`}
            >
              <img src={img} alt={`Tour ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              {['overview', 'itinerary', 'inclusions', 'highlights'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-600 hover:text-emerald-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Tour Overview</h3>
                <p className="text-gray-700 leading-relaxed">{tour.detailedDescription}</p>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Tour Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tour Type</p>
                        <p className="font-semibold">{tour.type} Tour</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold">{tour.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Difficulty</p>
                        <p className="font-semibold">{tour.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Departure From</p>
                        <p className="font-semibold">{tour.departureCity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Detailed Itinerary</h3>
                <div className="space-y-4">
                  {tour.itinerary.map((day: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex flex-col items-center justify-center">
                          <span className="text-emerald-600 font-bold">{day.day}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">{day.title}</h4>
                          <p className="text-gray-700">{day.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">What's Included</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-emerald-600 mb-4">Inclusions</h4>
                    <ul className="space-y-3">
                      {tour.inclusions.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-red-600 mb-4">Exclusions</h4>
                    <ul className="space-y-3">
                      {tour.exclusions.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className="w-5 h-5 flex items-center justify-center text-red-500">×</div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'highlights' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Tour Highlights</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {tour.highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Star className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="font-medium text-gray-800">{highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Starting From</span>
                  <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                    {tour.discount} OFF
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-emerald-600">₹ {tour.price}</span>
                  <span className="text-gray-500 ml-2">/ person</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">+ ₹ 3,999 taxes & fees</p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Departure Date
                  </label>
                  <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none">
                    {tour.availableDates.map((date: string) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      -
                    </button>
                    <input
                      type="number"
                      defaultValue="2"
                      min="1"
                      max={tour.maxGroupSize}
                      className="flex-1 p-3 border-2 border-gray-200 rounded-lg text-center focus:border-emerald-500 focus:outline-none"
                    />
                    <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Book Now
                </button>
                <button className="w-full py-4 border-2 border-emerald-600 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
                  Request Callback
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>info@traveltours.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Globe className="w-5 h-5" />
                    <span>www.traveltours.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold">{tour.rating}/5</span>
              <span className="text-gray-600">({tour.reviews} reviews)</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Rahul Sharma</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">Amazing experience! Everything was perfectly organized. The guides were knowledgeable and hotels were great.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
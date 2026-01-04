import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface Package {
  package_id: number;
  package_name: string;
  short_description: string;
  duration_days: number;
  duration_nights: number;
  base_price: string;
  discount_percent: string;
  final_price: string;
  start_location: string;
}

export default function TravelPackages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/packages/list`);
        const data = await res.json();
        setPackages(data.packages || []);
      } catch (error) {
        console.error('Failed to fetch packages', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-600">
        Loading packages...
      </section>
    );
  }

  if (!packages.length) {
    return (
      <section className="py-20 text-center text-gray-600">
        No packages available right now.
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
            Best Offer
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
            Travel Packages
          </h2>
          <p className="text-gray-600 text-lg">
            Deals made especially for you, Everything you need—on a budget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Static image for now (replace later if image comes from API) */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt={pkg.package_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {Number(pkg.discount_percent) > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    {pkg.discount_percent}% OFF
                  </div>
                )}

                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                    <span className="font-semibold">
                      {pkg.duration_days} Days & {pkg.duration_nights} Nights
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-3">
                  Group
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  {pkg.package_name}
                </h3>

                <div className="flex items-start text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-emerald-600" />
                  <span className="line-clamp-2">
                    {pkg.short_description}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-emerald-600">
                      ₹ {pkg.final_price}
                    </span>
                    <span className="text-gray-500 text-sm">/-</span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/tour-details/${pkg.package_id}`)
                    }
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group-hover:space-x-3"
                  >
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

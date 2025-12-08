import { Phone, MapPin, ArrowRight } from 'lucide-react';

export default function ContactBranch() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Our Branches</h2>
          <p className="text-gray-600 text-lg">
            Feel free to contact us by telephone, email or meeting us in person.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          
          {/* Hyderabad Office */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Hyderabad Office</h3>

              <div className="flex items-center justify-center space-x-2 mb-6">
                <Phone className="w-6 h-6 text-emerald-600" />
                <a
                  href="tel:9573623034"
                  className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  +91-9573623034
                </a>
              </div>

              <div className="flex items-start justify-center text-gray-700 mb-6">
                <MapPin className="w-6 h-6 text-emerald-600 mr-3 mt-1" />
                <p className="text-left max-w-xs">
                  Hyderabad Location
                </p>
              </div>
            </div>
          </div>

          {/* Ahmedabad Office */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ahmedabad Office</h3>

              <div className="flex items-center justify-center space-x-2 mb-6">
                <Phone className="w-6 h-6 text-emerald-600" />
                <a
                  href="tel:9974542678"
                  className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  +91-9974542678
                </a>
              </div>

              <div className="flex items-start justify-center text-gray-700 mb-6">
                <MapPin className="w-6 h-6 text-emerald-600 mr-3 mt-1" />
                <p className="text-left max-w-xs">
                  Ahmedabad Location
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <span>View All Branches</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

import { Users } from 'lucide-react';

const locations = [
  { name: "Uttarakhand", visitors: "60k", image: "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Meghalaya", visitors: "9k", image: "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Uttar Pradesh", visitors: "10k", image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Rajasthan", visitors: "15k", image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Himachal Pradesh", visitors: "70k", image: "https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Jammu and Kashmir", visitors: "25k", image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Kerala", visitors: "14k", image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600" }
];

export default function TopLocations() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Best Top</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Rated Locations</h2>
          <p className="text-gray-600 text-lg">Pick top destinations for your next holiday</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {locations.map((location, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-sm mb-1 text-center">{location.name}</h3>
                  <div className="flex items-center justify-center text-xs opacity-90">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{location.visitors} Customers</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

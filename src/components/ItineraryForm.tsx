import { useState, useEffect } from 'react';
import { Calendar, MapPin, FileText, Navigation } from 'lucide-react';

interface Package {
  id: string;
  title?: string;
  name?: string;
}

interface City {
  id: string; // city_id
  name: string; // city_name
  state?: string;
  country?: string;
  is_departure_city: boolean;
}

interface ItineraryItem {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  orderIndex: number;
}

interface ItineraryFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  packages: Package[];
  onPackageChange: (packageId: number | null) => void;
}

export function ItineraryForm({ onSubmit, isLoading, error, packages=[], onPackageChange,}: ItineraryFormProps) {
  const [formData, setFormData] = useState({
    packageId: '',
    dayNumber: '',
    title: '',
    description: '',
    location: '',
    includedActivities: '',
    meals: '',
    accommodation: '',
    orderIndex: '',
    departureCityId: ''
  });

  const [cities, setCities] = useState<City[]>([]);
  const [departureCities, setDepartureCities] = useState<City[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [packagesError, setPackagesError] = useState<string | null>(null);
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);
  const [itineraryLoading, setItineraryLoading] = useState(false);
  const [itineraryError, setItineraryError] = useState<string | null>(null);
  
  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setCitiesLoading(true);
        setCitiesError(null);
        
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${API_BASE_URL}/api/cities/departure`,
                {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch cities: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats based on your API
        let citiesArray: City[] = [];
        
        if (Array.isArray(data)) {
          citiesArray = data.map((city: any) => ({
            id: String(city.city_id || city.id),
            name: city.city_name || city.name,
            state: city.state,
            country: city.country,
            is_departure_city: Boolean(city.is_departure_city)
          }));
        } else if (data.cities && Array.isArray(data.cities)) {
          citiesArray = data.cities.map((city: any) => ({
            id: String(city.city_id || city.id),
            name: city.city_name || city.name,
            state: city.state,
            country: city.country,
            is_departure_city: Boolean(city.is_departure_city)
          }));
        } else if (data.data && Array.isArray(data.data)) {
          citiesArray = data.data.map((city: any) => ({
            id: String(city.city_id || city.id),
            name: city.city_name || city.name,
            state: city.state,
            country: city.country,
            is_departure_city: Boolean(city.is_departure_city)
          }));
        }
        
        setCities(citiesArray);
        
        // Filter only departure cities if you want to show only those
        const departureOnly = citiesArray.filter(city => city.is_departure_city);
        setDepartureCities(departureOnly);
        
      } catch (err) {
        console.error('Error fetching cities:', err);
        setCitiesError(err instanceof Error ? err.message : 'Failed to load cities');
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
  }, []);

  /*Fetch Itinerary based on PackageID Selected */
  useEffect(() => {
  const fetchItinerariesByPackage = async () => {
    if (!formData.packageId) {
      setItineraries([]);
      return;
    }

    try {
      setItineraryLoading(true);
      setItineraryError(null);
      setLoadingData(true);

      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

      const response = await fetch(
        `${API_BASE_URL}/api/itinerary/${formData.packageId}/list`,
                {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );
      if (!response.ok) {
        throw new Error(`Failed to fetch itineraries (${response.status})`);
      }

      const data = await response.json();

      // Normalize response safely
      const itineraryArray = Array.isArray(data)
        ? data
        : data.data || data.itineraries || [];

      setItineraries(itineraryArray);
    } catch (err) {
      console.error('Error fetching itineraries:', err);
      setItineraryError(
        err instanceof Error ? err.message : 'Failed to load itineraries'
      );
    } finally {
      setItineraryLoading(false);
      setLoadingData(false)
    }
  };

  fetchItinerariesByPackage();
}, [formData.packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data before processing:', formData);
    console.log('Selected departureCityId:', formData.departureCityId);
    console.log('Available cities:', cities);
    const data = {
      ...formData,
      dayNumber: parseInt(formData.dayNumber),
      orderIndex: parseInt(formData.orderIndex) || 0,
      includedActivities: formData.includedActivities.split(',').map(a => a.trim()).filter(a => a),
      meals: formData.meals.split(',').map(m => m.trim()).filter(m => m),
      departureCityId: formData.departureCityId || undefined // Convert empty string to undefined
    };

    console.log('Data being submitted:', data);
    await onSubmit(data);
    
    if (!error) {
      setFormData({
        packageId: '',
        dayNumber: '',
        title: '',
        description: '',
        location: '',
        includedActivities: '',
        meals: '',
        accommodation: '',
        orderIndex: '',
        departureCityId: ''
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    
    if (name === 'packageId') {
      onPackageChange(value ? Number(value) : null);
    }
  };
  
  const getPackageDisplayName = (pkg: Package) => {
    return pkg.title || pkg.name || `Package ${pkg.id}`;
  };

  const getCityDisplayName = (city: City) => {
    let displayName = city.name;
    if (city.state) displayName += `, ${city.state}`;
    if (city.country) displayName += `, ${city.country}`;
    return displayName;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {citiesError && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-600">{citiesError}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Package 
          </label>
          <select
            name="packageId"
            value={formData.packageId}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loadingData}
          >
            <option value="">Select a package</option>
            {loadingData ? (
              <option value="" disabled>Loading packages...</option>
            ) : packagesError ? (
              <option value="" disabled>Error loading packages</option>
            ) : packages.length > 0 ? (
              packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {getPackageDisplayName(pkg)}
              </option>
            ))
          ):(
            <option value="" disabled>No packages available</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departure City
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Navigation className="w-5 h-5 text-gray-400" />
            </div>
            <select
              name="departureCityId"
              value={formData.departureCityId}
              onChange={handleChange}
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={citiesLoading}
            >
              <option value="">Select departure city (optional)</option>
              {citiesLoading ? (
                <option value="" disabled>Loading cities...</option>
              ) : departureCities.length > 0 ? (
                // Option 1: Show only departure cities
                departureCities.map(city => (
                  <option key={city.id} value={city.id}>
                    {getCityDisplayName(city)}
                  </option>
                ))
              ) : cities.length > 0 ? (
                // Option 2: Fallback to all cities if no departure cities marked
                cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {getCityDisplayName(city)}
                    {city.is_departure_city ? ' ★' : ''}
                  </option>
                ))
              ) : (
                <option value="" disabled>No cities available</option>
              )}
            </select>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Optional: The city from which the tour departs
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Day Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="dayNumber"
                min="1"
                value={formData.dayNumber}
                onChange={handleChange}
                required
                className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Day 1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Index
            </label>
            <input
              type="number"
              name="orderIndex"
              min="0"
              value={formData.orderIndex}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Display order"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Arrival in Delhi & Transfer to Shimla"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Shimla, Manali, etc."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed description of the day's activities..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Included Activities (comma separated)
          </label>
          <input
            type="text"
            name="includedActivities"
            value={formData.includedActivities}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Trekking, Sightseeing, Camping"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meals Included
            </label>
            <input
              type="text"
              name="meals"
              value={formData.meals}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Breakfast, Dinner"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accommodation Type
            </label>
            <input
              type="text"
              name="accommodation"
              value={formData.accommodation}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Hotel, Camping, Resort"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || citiesLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Adding...' : 'Add Itinerary Day'}
      </button>
    </form>
  );
}
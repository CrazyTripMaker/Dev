import { useEffect, useState } from 'react';
import { AlertCircle, Navigation, Package } from 'lucide-react';

interface Props {
  onSubmit: (data: {
    package_id: number;
    departure_city_id: number;
    base_price: number;
    duration_days: number;
    start_city: string;
    is_active: boolean;
  }) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  onPackageSelect?: (packageId: number) => void;
}

interface PackageDetail {
  package_id: number;
  package_name: string;
  title?: string;
  name?: string;
}

interface City {
  city_id: number;
  city_name: string;
  state?: string;
  country?: string;
  is_departure_city: boolean;
}

export function DepartureForm({ onSubmit, isLoading, error, onPackageSelect }: Props) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const [packages, setPackages] = useState<PackageDetail[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [departureCities, setDepartureCities] = useState<City[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);
  const [packagesError, setPackagesError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    package_id: '',
    departure_city_id: '',
    base_price: '',
    duration_days: '',
    start_city: '',
    is_active: true,
  });

  /* ================= FETCH PACKAGES (Fixed) ================= */
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoadingData(true);
        setPackagesError(null);
        const res = await fetch(`${API_BASE_URL}/api/packages/list`,
                {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );
        
        if (!res.ok) {
          throw new Error(`Failed to fetch packages: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Handle different response formats
        let packageList: { package_id: number }[] = [];
        
        if (Array.isArray(data)) {
          packageList = data;
        } else if (data.packages && Array.isArray(data.packages)) {
          packageList = data.packages;
        } else if (data.data && Array.isArray(data.data)) {
          packageList = data.data;
        } else if (data.list && Array.isArray(data.list)) {
          packageList = data.list;
        } else {
          console.warn('Unexpected API response format:', data);
          setPackagesError('Unexpected response format from server');
          setPackages([]);
          return;
        }

        // If packageList is empty, set empty array and return
        if (packageList.length === 0) {
          setPackages([]);
          return;
        }
        
        // Fetch detailed package info for each package
        const detailed = await Promise.all(
          packageList.map(async (pkg) => {
            try {
              const r = await fetch(
                `${API_BASE_URL}/api/packages/${pkg.package_id}`,
                {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );
              
              if (!r.ok) {
                console.error(`Failed to fetch package ${pkg.package_id}`);
                return {
                  package_id: pkg.package_id,
                  package_name: `Package ${pkg.package_id}`,
                };
              }
              
              const packageData = await r.json();
              
              // Handle nested package object in response
              const packageInfo = packageData.package || packageData.data || packageData;
              
              return {
                package_id: packageInfo.package_id || pkg.package_id,
                package_name: packageInfo.package_name || `Package ${pkg.package_id}`,
                title: packageInfo.title,
                name: packageInfo.name,
              };
            } catch (err) {
              console.error(`Error fetching package ${pkg.package_id}:`, err);
              return {
                package_id: pkg.package_id,
                package_name: `Package ${pkg.package_id}`,
              };
            }
          })
        );

        setPackages(detailed);
      } catch (err) {
        console.error('Failed to load packages:', err);
        setPackagesError(err instanceof Error ? err.message : 'Failed to load packages');
        setPackages([]);
      } finally {
        setLoadingData(false);
      }
    };

    fetchPackages();
  }, []);

  /* ================= FETCH CITIES (Improved) ================= */
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setCitiesLoading(true);
        setCitiesError(null);
        
        const response = await fetch(`${API_BASE_URL}/api/cities/departure`, {
                                      headers: {
                                        'ngrok-skip-browser-warning': 'true',
                                      },
                                    });

        if (!response.ok) {
          throw new Error(`Failed to fetch cities: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        let citiesArray: City[] = [];
        
        if (Array.isArray(data)) {
          citiesArray = data.map((city: any) => ({
            city_id: city.city_id || city.id,
            city_name: city.city_name || city.name,
            state: city.state,
            country: city.country,
            is_departure_city: Boolean(city.is_departure_city)
          }));
        } else if (data.cities && Array.isArray(data.cities)) {
          citiesArray = data.cities.map((city: any) => ({
            city_id: city.city_id || city.id,
            city_name: city.city_name || city.name,
            state: city.state,
            country: city.country,
            is_departure_city: Boolean(city.is_departure_city)
          }));
        } else if (data.data && Array.isArray(data.data)) {
          citiesArray = data.data.map((city: any) => ({
            city_id: city.city_id || city.id,
            city_name: city.city_name || city.name,
            state: city.state,
            country: city.country,
            is_departure_city: Boolean(city.is_departure_city)
          }));
        }
        
        setCities(citiesArray);
        
        // Filter only departure cities
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

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
    if (name === 'package_id' && value && onPackageSelect) {
      onPackageSelect(Number(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      package_id: Number(formData.package_id),
      departure_city_id: Number(formData.departure_city_id),
      base_price: Number(formData.base_price),
      duration_days: Number(formData.duration_days),
      start_city: formData.start_city,
      is_active: formData.is_active,
    });
  };

  /* ================= HELPER FUNCTIONS ================= */
  const getPackageDisplayName = (pkg: PackageDetail) => {
    return pkg.package_name || pkg.title || pkg.name || `Package ${pkg.package_id}`;
  };

  const getCityDisplayName = (city: City) => {
    let displayName = city.city_name;
    if (city.state) displayName += `, ${city.state}`;
    if (city.country) displayName += `, ${city.country}`;
    return displayName;
  };

  /* ================= UI ================= */
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {packagesError && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-600">{packagesError}</p>
        </div>
      )}

      {citiesError && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-600">{citiesError}</p>
        </div>
      )}

      {/* Package Dropdown - Improved */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Package *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <select
            name="package_id"
            value={formData.package_id}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loadingData}
          >
            <option value="">Select a package</option>
            {loadingData ? (
              <option value="" disabled>Loading packages...</option>
            ) : packagesError ? (
              <option value="" disabled>Error loading packages</option>
            ) : packages.length > 0 ? (
              packages.map((pkg) => (
                <option key={pkg.package_id} value={pkg.package_id}>
                  {getPackageDisplayName(pkg)}
                </option>
              ))
            ) : (
              <option value="" disabled>No packages available</option>
            )}
          </select>
        </div>
        {!loadingData && !packagesError && packages.length === 0 && (
          <p className="mt-1 text-xs text-gray-500">No packages found. Create packages first.</p>
        )}
      </div>

      {/* Departure City Dropdown - Improved */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Departure City *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Navigation className="w-5 h-5 text-gray-400" />
          </div>
          <select
            name="departure_city_id"
            value={formData.departure_city_id}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={citiesLoading}
          >
            <option value="">Select departure city</option>
            {citiesLoading ? (
              <option value="" disabled>Loading cities...</option>
            ) : departureCities.length > 0 ? (
              departureCities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {getCityDisplayName(city)}
                </option>
              ))
            ) : cities.length > 0 ? (
              cities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {getCityDisplayName(city)}
                  {city.is_departure_city ? ' ★' : ''}
                </option>
              ))
            ) : (
              <option value="" disabled>No cities available</option>
            )}
          </select>
        </div>
      </div>

      {/* Base Price Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Base Price *
        </label>
        <input
          type="number"
          name="base_price"
          placeholder="Enter base price"
          value={formData.base_price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Duration Days Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration (days) *
        </label>
        <input
          type="number"
          name="duration_days"
          placeholder="Enter duration in days"
          value={formData.duration_days}
          onChange={handleChange}
          required
          min="1"
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Start City Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start City *
        </label>
        <input
          type="text"
          name="start_city"
          placeholder="Enter start city"
          value={formData.start_city}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Active Checkbox */}
      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
        <input
          type="checkbox"
          name="is_active"
          id="is_active"
          checked={formData.is_active}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
          Active Departure
        </label>
        <span className="text-xs text-gray-500 ml-auto">
          {formData.is_active ? 'Will be available for booking' : 'Will be hidden from users'}
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || loadingData || citiesLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Creating Departure...' : 'Create Departure'}
      </button>
    </form>
  );
}
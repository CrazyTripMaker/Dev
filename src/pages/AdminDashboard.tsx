// AdminDashboard.tsx
import { useState } from 'react';
import { Package, Settings, MapPin, Tag, Calendar } from 'lucide-react';
import { PackageForm } from '../components/PackageForm';
import { PackagesList } from '../components/PackagesList';
import { CategoryForm } from '../components/CategoryForm';
import { CategoriesList } from '../components/CategoriesList';
import { ItineraryForm } from '../components/ItineraryForm';
import { ItinerariesList } from '../components/itineraryLists';
import { usePackages } from '../hooks/usePackages';
import { useCategories } from '../hooks/useCategories';
import { useItineraries } from '../hooks/useItineraries';
import { DepartureForm } from '../components/DepartureForm';
import { useDepartures } from '../hooks/useDepartures';
import { DeparturesList } from '../components/DepartureList';

type Tab = 'packages' | 'categories' | 'itineraries' | 'departures';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('packages');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeDeparturePackageId, setActiveDeparturePackageId] =
  useState<number | null>(null);

  const packages = usePackages();
  const categories = useCategories();
  const itineraries = useItineraries();
  const departures = useDepartures();
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleAddPackage = async (data: any) => {
    setIsSubmitting(true);
    try {
      await packages.addPackage(data);
      alert('Package added successfully!');
    } catch {
      // Error is handled by the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async (data: any) => {
    setIsSubmitting(true);
    try {
      await categories.addCategory(data);
      alert('Category added successfully!');
    } catch {
      // Error is handled by the hook
    } finally {
      setIsSubmitting(false);
    }
  };

    const handleAddDeparture = async (data: {
    package_id: number;
    departure_city_id: number;
    base_price: number;
    duration_days: number;
    start_city: string;
    is_active: boolean;
  }) => {
    setIsSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/api/departures/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      await departures.fetchByPackage(data.package_id);
      setActiveDeparturePackageId(data.package_id); // ADD THIS LINE

      alert('Departure created successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };


  //const handleAddDestination = async (data: any) => {
  //  setIsSubmitting(true);
  //  try {
  //    await destinations.addDestination(data);
  //    alert('Destination added successfully!');
  //  } catch {
  //    // Error is handled by the hook
  //  } finally {
  //    setIsSubmitting(false);
  //  }
  //};

  const handleAddItinerary = async (data: any) => {
    setIsSubmitting(true);
    try {
      await itineraries.addItinerary(data);
      alert('Itinerary added successfully!');
    } catch {
      // Error is handled by the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'packages', label: 'Packages', icon: <Package className="w-5 h-5" /> },
    { id: 'categories', label: 'Categories', icon: <Tag className="w-5 h-5" /> },
    { id: 'itineraries', label: 'Itineraries', icon: <Calendar className="w-5 h-5" /> },
    { id: 'departures', label: 'Departures', icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage packages, categories, destinations, and itineraries</p>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              {activeTab === 'packages' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Package</h2>
                  <PackageForm
                    onSubmit={handleAddPackage}
                    isLoading={isSubmitting}
                    error={packages.error}
                  />
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h2>
                  <CategoryForm
                    onSubmit={handleAddCategory}
                    isLoading={isSubmitting}
                    error={categories.error}
                  />
                </div>
              )}

              

              {activeTab === 'itineraries' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Itinerary Day</h2>
                  <ItineraryForm
                    onSubmit={handleAddItinerary}
                    isLoading={isSubmitting}
                    error={itineraries.error}
                    packages={packages.packages}
                    onPackageChange={setSelectedPackageId} 
                  />
                </div>
              )}

              {activeTab === 'departures' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Link Package with Departure
                  </h2>
                  <DepartureForm
                    onSubmit={handleAddDeparture}
                    isLoading={isSubmitting}
                    error={departures.error}
                    onPackageSelect={setActiveDeparturePackageId}
                  />
                </div>
              )}

            </div>

            <div className="lg:col-span-2">
              {activeTab === 'packages' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Packages ({packages.packages?.length ?? 0})
                  </h2>
                  {packages.loading ? (
                    <p className="text-center text-gray-500">Loading packages...</p>
                  ) : (
                    <PackagesList
                      packages={packages.packages}
                      onDelete={packages.deletePackage}
                      isDeleting={false}
                    />
                  )}
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories ({categories.categories?.length ?? 0})
                  </h2>
                  {categories.loading ? (
                    <p className="text-center text-gray-500">Loading categories...</p>
                  ) : (
                    <CategoriesList
                      categories={categories.categories}
                      onDelete={categories.deleteCategory}
                      isDeleting={false}
                    />
                  )}
                </div>
              )}

              {activeTab === 'itineraries' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Itineraries ({itineraries.itineraries?.length ?? 0})
                    </h2>
                    <div className="text-sm text-gray-500">
                      Grouped by package
                    </div>
                  </div>
                  {itineraries.loading ? (
                    <p className="text-center text-gray-500">Loading itineraries...</p>
                  ) : (
                    <ItinerariesList
                      packageId={selectedPackageId ?? undefined}
                      onDelete={async () => {}}
                      isDeleting={false}
                    />
                  )}
                </div>
              )}

              {activeTab === 'departures' && (
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Package selector section - UPDATE THIS */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        View Departures by Package
                      </h2>
                      <select
                        value={activeDeparturePackageId || ''}
                        onChange={(e) => setActiveDeparturePackageId(Number(e.target.value) || null)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a package to view departures...</option>
                        {packages.packages?.map((pkg) => {
                          // Use name or package_name, NOT title
                          const displayName = pkg.package_name || `Package ${pkg.id}`;
                          return (
                            <option key={pkg.id} value={pkg.id}>
                              {displayName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                      
                    <DeparturesList                 
                      packageId={activeDeparturePackageId}
                      departures={departures.departures}
                      loading={departures.loading}
                      onFetch={departures.fetchByPackage}
                      onDelete={departures.deleteDeparture}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
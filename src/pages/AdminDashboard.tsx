import { useState } from 'react';
import { Package, Settings, MapPin, Tag } from 'lucide-react';
import { PackageForm } from '../components/PackageForm';
import { PackagesList } from '../components/PackagesList';
import { CategoryForm } from '../components/CategoryForm';
import { CategoriesList } from '../components/CategoriesList';
import { DestinationForm } from '../components/DestinationForm';
import { DestinationsList } from '../components/DestinationsList';
import { usePackages } from '../hooks/usePackages';
import { useCategories } from '../hooks/useCategories';
import { useDestinations } from '../hooks/useDestinations';

type Tab = 'packages' | 'categories' | 'destinations';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('packages');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = usePackages();
  const categories = useCategories();
  const destinations = useDestinations();

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

  const handleAddDestination = async (data: any) => {
    setIsSubmitting(true);
    try {
      await destinations.addDestination(data);
      alert('Destination added successfully!');
    } catch {
      // Error is handled by the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'packages', label: 'Packages', icon: <Package className="w-5 h-5" /> },
    { id: 'categories', label: 'Categories', icon: <Tag className="w-5 h-5" /> },
    { id: 'destinations', label: 'Destinations', icon: <MapPin className="w-5 h-5" /> },
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
              <p className="text-sm text-gray-500">Manage packages, categories, and destinations</p>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
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

              {activeTab === 'destinations' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Destination</h2>
                  <DestinationForm
                    onSubmit={handleAddDestination}
                    isLoading={isSubmitting}
                    error={destinations.error}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              {activeTab === 'packages' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Packages ({packages.packages.length})
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
                    Categories ({categories.categories.length})
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

              {activeTab === 'destinations' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Destinations ({destinations.destinations.length})
                  </h2>
                  {destinations.loading ? (
                    <p className="text-center text-gray-500">Loading destinations...</p>
                  ) : (
                    <DestinationsList
                      destinations={destinations.destinations}
                      onDelete={destinations.deleteDestination}
                      isDeleting={false}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

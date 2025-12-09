// components/ItineraryForm.tsx - Updated
import { useState } from 'react';
import { Calendar, MapPin, FileText } from 'lucide-react';

interface Package {
  id: string;
  title?: string;
  name?: string;
}

interface ItineraryFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  packages: Package[];
}

export function ItineraryForm({ onSubmit, isLoading, error, packages }: ItineraryFormProps) {
  const [formData, setFormData] = useState({
    packageId: '',
    dayNumber: '',
    title: '',
    description: '',
    location: '',
    includedActivities: '',
    meals: '',
    accommodation: '',
    orderIndex: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      dayNumber: parseInt(formData.dayNumber),
      orderIndex: parseInt(formData.orderIndex) || 0,
      includedActivities: formData.includedActivities.split(',').map(a => a.trim()).filter(a => a),
      meals: formData.meals.split(',').map(m => m.trim()).filter(m => m)
    };

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
        orderIndex: ''
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getPackageDisplayName = (pkg: Package) => {
    return pkg.title || pkg.name || `Package ${pkg.id}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Package *
          </label>
          <select
            name="packageId"
            value={formData.packageId}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a package</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {getPackageDisplayName(pkg)}
              </option>
            ))}
          </select>
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
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Adding...' : 'Add Itinerary Day'}
      </button>
    </form>
  );
}
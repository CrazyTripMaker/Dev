// components/ItinerariesList.tsx - Simplified version
import { Calendar, MapPin, Hotel, Utensils, Activity, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface ItineraryItem {
  id: string;
  packageId: string;
  dayNumber: number;
  title: string;
  description: string;
  location?: string;
  includedActivities?: string[];
  meals?: string[];
  accommodation?: string;
  orderIndex: number;
}

interface Package {
  id: string;
  title?: string;
  name?: string;
}

interface ItinerariesListProps {
  itineraries: ItineraryItem[]; // These are already filtered by the hook
  packages: Package[];
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function ItinerariesList({ itineraries, packages, onDelete, isDeleting }: ItinerariesListProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const { packageId } = useParams<{ packageId: string }>();
  
  // Find the selected package from packages list
  const selectedPackage = packages.find(p => p.id === packageId);
  const packageName = selectedPackage?.title || selectedPackage?.name || 'Selected Package';
  
  // Sort by day number
  const sortedItineraries = [...itineraries].sort((a, b) => a.dayNumber - b.dayNumber);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this itinerary day?')) {
      await onDelete(id);
    }
  };

  if (!Array.isArray(itineraries)) {
    return <p>No itineraries found</p>;
  }

  if (itineraries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Itinerary Found for This Package
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          {packageId 
            ? `No itinerary days have been added for ${packageName}.`
            : 'Select a package to view its itinerary.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Always show package header when we have packageId */}
      {packageId && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{packageName}</h2>
          <p className="text-gray-600">
            {sortedItineraries.length} day{sortedItineraries.length !== 1 ? 's' : ''} of itinerary
          </p>
        </div>
      )}
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {!packageId && (
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">All Packages</h3>
            <p className="text-sm text-gray-600">
              {sortedItineraries.length} itinerary day{sortedItineraries.length !== 1 ? 's' : ''} across all packages
            </p>
          </div>
        )}
        
        <div className="divide-y divide-gray-200">
          {sortedItineraries.map((itinerary) => (
            <div key={itinerary.id} className="p-6 hover:bg-gray-50">
              <div 
                className="flex items-start justify-between cursor-pointer"
                onClick={() => setExpandedDay(expandedDay === itinerary.id ? null : itinerary.id)}
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">Day</span>
                    <span className="text-blue-800 font-bold text-lg">{itinerary.dayNumber}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{itinerary.title}</h4>
                    <div className="flex flex-wrap items-center gap-4 mt-1">
                      {itinerary.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {itinerary.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(itinerary.id);
                  }}
                  disabled={isDeleting}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors ml-4"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {expandedDay === itinerary.id && (
                <div className="mt-4 pl-16 space-y-4">
                  <div>
                    <p className="text-gray-700">{itinerary.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {itinerary.accommodation && (
                      <div className="flex items-center text-sm">
                        <Hotel className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{itinerary.accommodation}</span>
                      </div>
                    )}
                    
                    {itinerary.meals && itinerary.meals.length > 0 && (
                      <div className="flex items-center text-sm">
                        <Utensils className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{itinerary.meals.join(', ')}</span>
                      </div>
                    )}
                    
                    {itinerary.includedActivities && itinerary.includedActivities.length > 0 && (
                      <div className="flex items-center text-sm">
                        <Activity className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{itinerary.includedActivities.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div>
                      Order index: {itinerary.orderIndex}
                    </div>
                    {!packageId && (
                      <div className="text-gray-600">
                        Package ID: {itinerary.packageId}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
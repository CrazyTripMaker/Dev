// components/ItinerariesList.tsx - Updated with proper types
import { Calendar, MapPin, Hotel, Utensils, Activity, Trash2 } from 'lucide-react';
import { useState } from 'react';

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

// Use a more generic package type
interface Package {
  id: string;
  title?: string;
  name?: string; // Some packages might use 'name' instead of 'title'
}

interface ItinerariesListProps {
  itineraries: ItineraryItem[];
  packages: Package[];
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function ItinerariesList({ itineraries, packages, onDelete, isDeleting }: ItinerariesListProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  // Group itineraries by package
  const groupedItineraries = itineraries.reduce((acc, itinerary) => {
    const pkg = packages.find(p => p.id === itinerary.packageId);
    // Try to get the title or name
    const packageName = pkg?.title || pkg?.name || 'Unknown Package';
    
    if (!acc[packageName]) {
      acc[packageName] = [];
    }
    acc[packageName].push(itinerary);
    return acc;
  }, {} as Record<string, ItineraryItem[]>);

  // Sort days within each package
  Object.keys(groupedItineraries).forEach(packageName => {
    groupedItineraries[packageName].sort((a, b) => a.dayNumber - b.dayNumber);
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this itinerary day?')) {
      await onDelete(id);
    }
  };

  if (itineraries.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No itinerary days added</h3>
        <p className="text-gray-500">Add itinerary days for your packages to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedItineraries).map(([packageName, packageItineraries]) => (
        <div key={packageName} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{packageName}</h3>
            <p className="text-sm text-gray-600">
              {packageItineraries.length} day{packageItineraries.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {packageItineraries.map((itinerary) => (
              <div key={itinerary.id} className="p-6 hover:bg-gray-50">
                <div 
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => setExpandedDay(expandedDay === itinerary.id ? null : itinerary.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">Day</span>
                      <span className="text-blue-800 font-bold text-lg">{itinerary.dayNumber}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{itinerary.title}</h4>
                      {itinerary.location && (
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {itinerary.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(itinerary.id);
                    }}
                    disabled={isDeleting}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
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
                    
                    <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                      Order index: {itinerary.orderIndex}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
import { Calendar, MapPin, Hotel, Utensils, Activity, Trash2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Package {
  id: string;
  title?: string;
  name?: string;
}

interface ItinerariesListProps {
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
  packageId?: number;
}

interface ApiItineraryItem {
  id: number;
  departure_city_id: number;
  day_number: number;
  title: string;
  description: string;
  accommodation?: string | null;
  meals?: string | null;
  activities?: string | null;
  package_id: number;
}

interface ApiResponse {
  package_id: number;
  departure_city_id: number;
  itinerary: ApiItineraryItem[];
  count: number;
  status: string;
}

export function ItinerariesList({ 
  packageId,
  onDelete, 
  isDeleting, 
}: ItinerariesListProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [departureCityId, setDepartureCityId] = useState<number | null>(null);
  const [itineraryItems, setItineraryItems] = useState<ApiItineraryItem[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiPackageId, setApiPackageId] = useState<number | null>(null);
  
  const fetchItinerary = async (id: number) => {
      try {
        setApiLoading(true);
        setError(null);
        
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://14afb066cd3b.ngrok-free.app';
        const response = await fetch(`${API_BASE_URL}/api/itinerary/${id}/list`,
                {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch departures: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        console.log("Data",data)
        if (data.status === 'success' && Array.isArray(data.itinerary)) {
          setApiPackageId(data.package_id);
          setDepartureCityId(data.departure_city_id);
          setItineraryItems(data.itinerary || []);

        } else {
          setItineraryItems([]);
        }
      } catch (err) {
        console.error('Error fetching departures:', err);
        setError(err instanceof Error ? err.message : 'Failed to load departures');
        setItineraryItems([]);
      } finally {
        setApiLoading(false);
      }
    };
    console.log("This is the packageid",packageId)
    useEffect(() => {
      if (packageId) {
        fetchItinerary(packageId);
      } else {
        setItineraryItems([]);
        setApiPackageId(null);
      }
    }, [packageId]);
  
    const handleDelete = async (departureId: number) => {
      if (window.confirm('Are you sure you want to delete this departure?')) {
        try {
          await onDelete(departureId.toString());
          // Refresh the list after deletion
          if (apiPackageId) {
            fetchItinerary(apiPackageId);
          }
        } catch (err) {
          console.error('Error deleting departure:', err);
          alert('Failed to delete departure');
        }
      }
    };
    
    if (!apiPackageId) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">
            Select a package to view itinerary
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Choose a package from the dropdown above
          </p>
        </div>
      );
    }
  
    if (apiLoading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-500">Loading itinerary...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => apiPackageId && fetchItinerary(apiPackageId)}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Try again
          </button>
        </div>
      );
    }
  
    if (itineraryItems.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-gray-500">
            No itinerary found for this package
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Create itinerary using the form on the left
          </p>
        </div>
      );
    }

  return (
  <div className="space-y-6">
    {/* Package header */}
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
          <p className="text-gray-600">
            {itineraryItems.length} departure{itineraryItems.length !== 1 ? 's' : ''}
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
          Package ID: {apiPackageId}
        </span>
      </div>
    </div>
    
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Departure header */}
  <div
    className="flex items-start justify-between cursor-pointer"
    onClick={() => setExpandedDay(expandedDay ? null : 'departure')}
  >
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
        <span className="text-blue-600 font-bold text-sm">Departure</span>
        <span className="text-blue-800 font-bold text-lg">1</span>
      </div>

      <div>
        <h4 className="font-medium text-gray-900">
          Departure City ID: {departureCityId}
        </h4>
        <div className="text-sm text-gray-600 mt-1">
          Package ID: {apiPackageId}
        </div>
      </div>
    </div>
  </div>

  {/* Itinerary items */}
  {expandedDay === 'departure' && (
    <div className="mt-6 pl-16 space-y-4">
      {itineraryItems.length > 0 ? (
        itineraryItems
          .sort((a, b) => a.day_number - b.day_number)
          .map((item) => (
            <div key={item.id} className="bg-white p-4 rounded border">
              <h5 className="font-semibold">
                Day {item.day_number}: {item.title}
              </h5>
              <p className="text-sm text-gray-700 whitespace-pre-line mt-1">
                {item.description}
              </p>
            </div>
          ))
      ) : (
        <p className="text-gray-500">No itinerary details available</p>
      )}
    </div>
      )}
</div>
                
<div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
  <div className="flex items-center gap-4">
    <span>Package ID: {apiPackageId}</span>
    <span>Departure City ID: {departureCityId}</span>
    <span>Itinerary Items: {itineraryItems.length}</span>
  </div>
</div>
</div>
)}
         

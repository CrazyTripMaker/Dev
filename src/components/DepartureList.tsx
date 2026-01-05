// DeparturesList.tsx - Replace the entire file with this code
import { useEffect, useState } from 'react';
import { Trash2, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { Departure } from '../hooks/useDepartures';

interface Props {
  packageId: number | null;
  departures: Departure[];
  loading: boolean;
  onFetch: (packageId: number) => void;
  onDelete: (departureId: number) => void;
}

interface ApiDeparture {
  id: number;
  package_id: number;
  departure_city_id: number;
  base_price: string;
  duration_days: number;
  start_city: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  departure_city_name: string;
}

interface ApiResponse {
  package_id: number;
  departures: ApiDeparture[];
  count: number;
  status: string;
}

export function DeparturesList({
  packageId,
  onDelete,
}: Props) {
  const [apiDepartures, setApiDepartures] = useState<ApiDeparture[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartures = async (id: number) => {
    try {
      setApiLoading(true);
      setError(null);
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://18bdb81b392b.ngrok-free.app';
      const response = await fetch(`${API_BASE_URL}/api/departures/package/${id}`,
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
      
      if (data.status === 'success' && Array.isArray(data.departures)) {
        setApiDepartures(data.departures);
      } else {
        setApiDepartures([]);
      }
    } catch (err) {
      console.error('Error fetching departures:', err);
      setError(err instanceof Error ? err.message : 'Failed to load departures');
      setApiDepartures([]);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    if (packageId) {
      fetchDepartures(packageId);
    } else {
      setApiDepartures([]);
      setError(null);
    }
  }, [packageId]);

  const handleDelete = async (departureId: number) => {
    if (window.confirm('Are you sure you want to delete this departure?')) {
      try {
        await onDelete(departureId);
        // Refresh the list after deletion
        if (packageId) {
          fetchDepartures(packageId);
        }
      } catch (err) {
        console.error('Error deleting departure:', err);
        alert('Failed to delete departure');
      }
    }
  };

  if (!packageId) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">
          Select a package to view departures
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
        <p className="text-gray-500">Loading departures...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">{error}</p>
        <button
          onClick={() => packageId && fetchDepartures(packageId)}
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  if (apiDepartures.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-blue-400" />
        </div>
        <p className="text-gray-500">
          No departures found for this package
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Create departures using the form on the left
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-700">
          Departures ({apiDepartures.length})
        </h3>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
          Package ID: {packageId}
        </span>
      </div>

      <div className="grid gap-3">
        {apiDepartures.map(dep => (
          <div
            key={dep.id}
            className={`border rounded-lg p-4 ${!dep.is_active ? 'bg-gray-50 opacity-75' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {dep.departure_city_name}
                  {!dep.is_active && (
                    <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full">
                      Inactive
                    </span>
                  )}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Departure ID: {dep.id}
                </p>
              </div>

              <button
                onClick={() => handleDelete(dep.id)}
                className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                title="Delete departure"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Base Price:</span>
                <span className="font-medium">${parseFloat(dep.base_price).toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{dep.duration_days} days</span>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span className="text-gray-600">Start City:</span>
                <span className="font-medium">{dep.start_city || 'Not specified'}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Created: {new Date(dep.created_at).toLocaleDateString()}</span>
                <span>Updated: {new Date(dep.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
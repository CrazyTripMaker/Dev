import { Destination } from '../lib/supabase';
import { Trash2 } from 'lucide-react';

interface DestinationsListProps {
  destinations: Destination[];
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function DestinationsList({ destinations, onDelete, isDeleting }: DestinationsListProps) {
  if (destinations.length === 0) {
    return <p className="text-center text-gray-500">No destinations yet. Add one to get started!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {destinations.map(destination => (
        <div key={destination.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
          {destination.image_url && (
            <img
              src={destination.image_url}
              alt={destination.destination_name}
              className="w-full h-32 object-cover"
            />
          )}
          <div className="p-3">
            <h3 className="font-medium text-gray-900">{destination.destination_name}</h3>
            <p className="text-xs text-gray-600">{destination.country}</p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{destination.description}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {destination.days_spent} days
              </span>
              {destination.is_primary && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                  Primary
                </span>
              )}
            </div>
            <button
              onClick={() => onDelete(destination.id)}
              disabled={isDeleting}
              className="mt-2 w-full p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-xs">Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

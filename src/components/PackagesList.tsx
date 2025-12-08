import { Package } from '../lib/supabase';
import { Trash2 } from 'lucide-react';

interface PackagesListProps {
  packages: Package[];
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function PackagesList({ packages, onDelete, isDeleting }: PackagesListProps) {
  if (packages.length === 0) {
    return <p className="text-center text-gray-500">No packages yet. Add one to get started!</p>;
  }

  return (
    <div className="space-y-3">
      {packages.map(pkg => (
        <div key={pkg.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{pkg.package_name}</h3>
              <p className="text-sm text-gray-600 mt-1">{pkg.short_description}</p>
              <div className="flex gap-4 mt-3 text-sm text-gray-600">
                <span>₹{pkg.final_price.toLocaleString()}</span>
                <span>{pkg.duration_days} days / {pkg.duration_nights} nights</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  pkg.featured ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {pkg.featured ? 'Featured' : 'Standard'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDelete(pkg.id)}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

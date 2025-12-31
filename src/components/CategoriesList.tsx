import { Category } from '../lib/data';
import { Trash2 } from 'lucide-react';

interface CategoriesListProps {
  categories: Category[];
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function CategoriesList({ categories, onDelete, isDeleting }: CategoriesListProps) {
  if (!Array.isArray(categories)) {
    return <p>No categories found</p>;
  }

  return (
    <div className="space-y-2">
      {categories.map(category => (
        <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:border-gray-300 transition-colors">
          <div>
            <h3 className="font-medium text-gray-900">{category.category_name}</h3>
            <p className="text-xs text-gray-500">{category.description}</p>
            <div className="flex gap-2 mt-2">
              {category.icon_class && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {category.icon_class}
                </span>
              )}
              {!category.is_active && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  Inactive
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => onDelete(category.id)}
            disabled={isDeleting}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

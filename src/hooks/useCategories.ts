import { useState, useEffect } from 'react';
import { Category } from '../lib/data';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/categories/list`,
                {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching categories");
    } finally {
      setLoading(false);
    }
  }

  async function addCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const res = await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json",'ngrok-skip-browser-warning': 'true'
 },
        body: JSON.stringify(category),
      });

      if (!res.ok) throw new Error("Failed to add category");

      const data = await res.json();
      setCategories(prev => [...prev, data]);

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error adding category";
      setError(message);
      throw err;
    }
  }

  async function updateCategory(id: string, updates: Partial<Category>) {
    try {
      const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update category");

      const data = await res.json();
      setCategories(prev => prev.map(c => (c.id === id ? data : c)));

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error updating category";
      setError(message);
      throw err;
    }
  }

  async function deleteCategory(id: string) {
    try {
      const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!res.ok) throw new Error("Failed to delete category");

      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error deleting category";
      setError(message);
      throw err;
    }
  }

  return { categories, loading, error, fetchCategories, addCategory, updateCategory, deleteCategory };
}

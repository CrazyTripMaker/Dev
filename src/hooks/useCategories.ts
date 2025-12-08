import { useState, useEffect } from 'react';
import { supabase, Category } from '../lib/supabase';

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
      const { data, error: err } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (err) throw err;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  }

  async function addCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error: err } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single();

      if (err) throw err;
      setCategories([...categories, data]);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding category';
      setError(message);
      throw err;
    }
  }

  async function updateCategory(id: string, updates: Partial<Category>) {
    try {
      const { data, error: err } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (err) throw err;
      setCategories(categories.map(c => c.id === id ? data : c));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating category';
      setError(message);
      throw err;
    }
  }

  async function deleteCategory(id: string) {
    try {
      const { error: err } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (err) throw err;
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting category';
      setError(message);
      throw err;
    }
  }

  return { categories, loading, error, fetchCategories, addCategory, updateCategory, deleteCategory };
}

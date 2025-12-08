import { useState, useEffect } from 'react';
import { supabase, Package } from '../lib/supabase';

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setPackages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching packages');
    } finally {
      setLoading(false);
    }
  }

  async function addPackage(pkg: Omit<Package, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error: err } = await supabase
        .from('packages')
        .insert([pkg])
        .select()
        .single();

      if (err) throw err;
      setPackages([data, ...packages]);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding package';
      setError(message);
      throw err;
    }
  }

  async function updatePackage(id: string, updates: Partial<Package>) {
    try {
      const { data, error: err } = await supabase
        .from('packages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (err) throw err;
      setPackages(packages.map(p => p.id === id ? data : p));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating package';
      setError(message);
      throw err;
    }
  }

  async function deletePackage(id: string) {
    try {
      const { error: err } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

      if (err) throw err;
      setPackages(packages.filter(p => p.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting package';
      setError(message);
      throw err;
    }
  }

  return { packages, loading, error, fetchPackages, addPackage, updatePackage, deletePackage };
}

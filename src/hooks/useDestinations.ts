import { useState, useEffect } from 'react';
import { supabase, Destination } from '../lib/supabase';

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setDestinations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching destinations');
    } finally {
      setLoading(false);
    }
  }

  async function addDestination(destination: Omit<Destination, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error: err } = await supabase
        .from('destinations')
        .insert([destination])
        .select()
        .single();

      if (err) throw err;
      setDestinations([data, ...destinations]);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding destination';
      setError(message);
      throw err;
    }
  }

  async function updateDestination(id: string, updates: Partial<Destination>) {
    try {
      const { data, error: err } = await supabase
        .from('destinations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (err) throw err;
      setDestinations(destinations.map(d => d.id === id ? data : d));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating destination';
      setError(message);
      throw err;
    }
  }

  async function deleteDestination(id: string) {
    try {
      const { error: err } = await supabase
        .from('destinations')
        .delete()
        .eq('id', id);

      if (err) throw err;
      setDestinations(destinations.filter(d => d.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting destination';
      setError(message);
      throw err;
    }
  }

  return { destinations, loading, error, fetchDestinations, addDestination, updateDestination, deleteDestination };
}

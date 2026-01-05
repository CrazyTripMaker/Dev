import { useState, useEffect } from 'react';
import { Destination } from '../lib/data';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
      const res = await fetch(`${API_BASE}/api/destinations/list`,
                {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );
      if (!res.ok) throw new Error("Failed to fetch destinations");

      const data = await res.json();
      setDestinations(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching destinations");
    } finally {
      setLoading(false);
    }
  }

  async function addDestination(destination: Omit<Destination, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const res = await fetch(`${API_BASE}/api/destinations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify(destination),
      });

      if (!res.ok) throw new Error("Failed to add destination");

      const data = await res.json();
      setDestinations(prev => [data, ...prev]);

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error adding destination";
      setError(message);
      throw err;
    }
  }

  async function updateDestination(id: string, updates: Partial<Destination>) {
    try {
      const res = await fetch(`${API_BASE}/api/destinations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update destination");

      const data = await res.json();
      setDestinations(prev =>
        prev.map(d => (d.id === id ? data : d))
      );

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error updating destination";
      setError(message);
      throw err;
    }
  }

  async function deleteDestination(id: string) {
    try {
      const res = await fetch(`${API_BASE}/api/destinations/${id}`, {
        method: "DELETE",
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!res.ok) throw new Error("Failed to delete destination");

      setDestinations(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error deleting destination";
      setError(message);
      throw err;
    }
  }

  return {
    destinations,
    loading,
    error,
    fetchDestinations,
    addDestination,
    updateDestination,
    deleteDestination
  };
}

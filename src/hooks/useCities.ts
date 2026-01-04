// hooks/useCities.ts
import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface City {
  city_id: number;
  city_name: string;
}

export function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/cities/departure`);
      if (!res.ok) throw new Error('Failed to fetch cities');
      const data = await res.json();
      setCities(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return {
    cities,
    loading,
    error,
    refetch: fetchCities,
  };
}

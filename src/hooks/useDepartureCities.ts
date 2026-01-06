import { useEffect, useState } from 'react';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface DepartureCity {
  city_id: number;
  city_name: string;
  state?: string;
  country?: string;
  is_departure_city: boolean;
}

export function useDepartureCities() {
  const [cities, setCities] = useState<DepartureCity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/cities/departure`);
      const data = await res.json();
      setCities(data.cities || []);
    } catch {
      setError('Failed to fetch departure cities');
    } finally {
      setLoading(false);
    }
  };

  const addCity = async (payload: {
    city_name: string;
    state?: string;
    country?: string;
    is_departure_city: boolean;
  }) => {
    await fetch(`${API_BASE_URL}/api/cities/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    await fetchCities();
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return {
    cities,
    loading,
    error,
    addCity,
    fetchCities,
  };
}

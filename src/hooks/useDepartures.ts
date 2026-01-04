// hooks/useDepartures.ts
import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Departure {
  departure_id: number;
  package_id: number;
  city_id: number;
  city_name: string;
}

export function useDepartures() {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByPackage = async (packageId: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/departures/package/${packageId}`
      );
      if (!res.ok) throw new Error('Failed to fetch departures');
      const data = await res.json();
      setDepartures(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addDeparture = async (payload: {
    package_id: number;
    city_id: number;
  }) => {
    const res = await fetch(`${API_BASE_URL}/api/departures/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to create departure');
    }
  };

  const deleteDeparture = async (departureId: number) => {
    await fetch(`${API_BASE_URL}/api/departures/${departureId}`, {
      method: 'DELETE',
    });
  };

  return {
    departures,
    loading,
    error,
    fetchByPackage,
    addDeparture,
    deleteDeparture,
  };
}

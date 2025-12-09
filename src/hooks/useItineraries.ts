// hooks/useItineraries.ts
import { useState, useEffect } from 'react';

interface ItineraryItem {
  id: string;
  packageId: string;
  dayNumber: number;
  title: string;
  description: string;
  location?: string;
  includedActivities?: string[];
  meals?: string[];
  accommodation?: string;
  orderIndex: number;
}

export function useItineraries() {
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For now, we'll use localStorage or mock data
      const stored = localStorage.getItem('itineraries');
      if (stored) {
        setItineraries(JSON.parse(stored));
      }
    } catch (err) {
      setError('Failed to load itineraries');
    } finally {
      setLoading(false);
    }
  };

  const addItinerary = async (data: Omit<ItineraryItem, 'id'>) => {
    try {
      setError(null);
      const newItinerary = {
        ...data,
        id: `itinerary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      const updatedItineraries = [...itineraries, newItinerary];
      setItineraries(updatedItineraries);
      localStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return Promise.resolve();
    } catch (err) {
      setError('Failed to add itinerary');
      return Promise.reject(err);
    }
  };

  const deleteItinerary = async (id: string) => {
    try {
      setError(null);
      const updatedItineraries = itineraries.filter(item => item.id !== id);
      setItineraries(updatedItineraries);
      localStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return Promise.resolve();
    } catch (err) {
      setError('Failed to delete itinerary');
      return Promise.reject(err);
    }
  };

  const getItinerariesByPackage = (packageId: string) => {
    return itineraries
      .filter(item => item.packageId === packageId)
      .sort((a, b) => a.dayNumber - b.dayNumber);
  };

  return {
    itineraries,
    loading,
    error,
    addItinerary,
    deleteItinerary,
    getItinerariesByPackage
  };
}
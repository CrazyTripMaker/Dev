import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://14afb066cd3b.ngrok-free.app';

export interface ItineraryItem {
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
  departureCityId?: string;
}

export function useItineraries(selectedPackageId?: string) {
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  /**
   * GET itineraries for a specific package
   */
  const fetchItineraries = useCallback(async (packageId?: string) => {
    const targetPackageId = packageId || selectedPackageId;
    
    if (!targetPackageId) {
      console.log('No packageId provided, clearing itineraries');
      setItineraries([]);
      setHasFetched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const url = `${API_BASE_URL}/api/itinerary/${targetPackageId}/list`;
      console.log('Fetching itineraries for package:', targetPackageId, 'URL:', url);

      const res = await fetch(url,
                {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );
      
      if (res.status === 404) {
        // Package has no itineraries yet
        console.log('No itineraries found for package:', targetPackageId);
        setItineraries([]);
        setHasFetched(true);
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch itineraries: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log('Received data for package', targetPackageId, ':', data);

      // Convert backend snake_case to frontend camelCase and int IDs to strings
      const formattedItineraries = (data.itinerary || []).map((item: any) => ({
        id: String(item.id),
        packageId: String(item.package_id),
        dayNumber: item.day_number,
        title: item.title,
        description: item.description,
        location: item.location || '',
        includedActivities: Array.isArray(item.included_activities) 
          ? item.included_activities 
          : typeof item.included_activities === 'string'
          ? [item.included_activities]
          : [],
        meals: Array.isArray(item.meals) 
          ? item.meals 
          : typeof item.meals === 'string'
          ? [item.meals]
          : [],
        accommodation: item.accommodation || '',
        orderIndex: item.order_index || 0,
        departureCityId: item.departure_city_id ? String(item.departure_city_id) : undefined
      }));

      console.log('Formatted itineraries:', formattedItineraries);
      setItineraries(formattedItineraries);
      setHasFetched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load itineraries');
      console.error('Fetch error:', err);
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  }, [selectedPackageId]);

  /**
   * Effect to fetch itineraries when selectedPackageId changes
   */
  useEffect(() => {
    if (selectedPackageId) {
      console.log('Selected package changed to:', selectedPackageId);
      fetchItineraries(selectedPackageId);
    } else {
      // Clear itineraries if no package is selected
      setItineraries([]);
      setHasFetched(false);
    }
  }, [selectedPackageId, fetchItineraries]);

  /**
   * Manually refetch itineraries
   */
  const refetch = useCallback(() => {
    return fetchItineraries(selectedPackageId);
  }, [fetchItineraries, selectedPackageId]);

  /**
   * POST itinerary - for a specific package
   */
  const addItinerary = async (
    payload: Omit<ItineraryItem, 'id'>
  ) => {
    // IMPORTANT: Use packageId from payload (comes from form), 
    // NOT from selectedPackageId hook parameter
    const targetPackageId = payload.packageId;
    
    if (!targetPackageId) {
      throw new Error('Package ID is missing in the payload');
    }

    try {
      setError(null);

      // Transform camelCase to snake_case for backend
      const backendPayload: any = {
        package_id: parseInt(targetPackageId, 10),
        day_number: payload.dayNumber,
        title: payload.title,
        description: payload.description,
        location: payload.location || null,
        included_activities: Array.isArray(payload.includedActivities) 
          ? payload.includedActivities 
          : [],
        accommodation: payload.accommodation || null,
        order_index: payload.orderIndex || 0
      };

      // Handle meals conversion
      if (Array.isArray(payload.meals)) {
        backendPayload.meals = payload.meals.join(', ');
      } else if (payload.meals) {
        backendPayload.meals = payload.meals;
      } else {
        backendPayload.meals = '';
      }

      // Handle departure_city_id conversion - ONLY if it has a value
      // Backend expects integer or null, not empty string
      const cityId = Number(payload.departureCityId);

      backendPayload.departure_city_id =
        Number.isInteger(cityId) && cityId > 0 ? cityId : null;

      console.log(
        'Final departure_city_id being sent:',
        backendPayload.departure_city_id
      );
      console.log('Adding itinerary to package:', targetPackageId, 'Payload:', backendPayload);

      const res = await fetch(
        `${API_BASE_URL}/api/itinerary/${targetPackageId}/itinerary`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify(backendPayload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error creating itinerary:', errorText);
        throw new Error(`Failed to add itinerary: ${res.status} ${errorText}`);
      }

      const result = await res.json();
      console.log('Itinerary created:', result);

      // Refresh the itineraries list for THIS package
      await fetchItineraries(targetPackageId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add itinerary';
      setError(errorMessage);
      console.error('Add itinerary error:', err);
      throw err;
    }
  };

  /**
   * DELETE itinerary
   */
  const deleteItinerary = async (itineraryId: string) => {
    try {
      setError(null);

      console.log('Deleting itinerary:', itineraryId);

      const res = await fetch(
        `${API_BASE_URL}/api/itinerary/itinerary/${itineraryId}`,
        { method: 'DELETE', headers: { 'ngrok-skip-browser-warning': 'true' } }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error deleting itinerary:', errorText);
        throw new Error(`Failed to delete itinerary: ${res.status} ${errorText}`);
      }

      const result = await res.json();
      console.log('Delete result:', result);

      // Remove from local state
      setItineraries(prev =>
        prev.filter(item => item.id !== itineraryId)
      );
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete itinerary';
      setError(errorMessage);
      console.error('Delete error:', err);
      throw err;
    }
  };

  /**
   * Update itinerary
   */
  const updateItinerary = async (
    itineraryId: string,
    updates: Partial<Omit<ItineraryItem, 'id' | 'packageId'>>
  ) => {
    try {
      setError(null);

      // Find the existing itinerary to preserve packageId and other fields
      const existingItinerary = itineraries.find(item => item.id === itineraryId);
      if (!existingItinerary) {
        throw new Error('Itinerary not found');
      }

      // Transform camelCase to snake_case for backend
      const backendPayload = {
        package_id: parseInt(existingItinerary.packageId, 10),
        departure_city_id: updates.departureCityId !== undefined 
          ? (updates.departureCityId ? parseInt(updates.departureCityId, 10) : null)
          : (existingItinerary.departureCityId ? parseInt(existingItinerary.departureCityId, 10) : null),
        day_number: updates.dayNumber || existingItinerary.dayNumber,
        title: updates.title || existingItinerary.title,
        description: updates.description || existingItinerary.description,
        location: updates.location !== undefined ? updates.location : existingItinerary.location,
        included_activities: Array.isArray(updates.includedActivities) 
          ? updates.includedActivities 
          : (updates.includedActivities !== undefined 
              ? [String(updates.includedActivities)] 
              : existingItinerary.includedActivities || []),
        meals: Array.isArray(updates.meals) 
          ? updates.meals.join(', ')
          : (updates.meals !== undefined 
              ? String(updates.meals) 
              : (Array.isArray(existingItinerary.meals) 
                  ? existingItinerary.meals.join(', ')
                  : existingItinerary.meals || '')),
        accommodation: updates.accommodation !== undefined 
          ? updates.accommodation 
          : existingItinerary.accommodation,
        order_index: updates.orderIndex || existingItinerary.orderIndex
      };

      console.log('Updating itinerary:', itineraryId, 'Payload:', backendPayload);

      const res = await fetch(
        `${API_BASE_URL}/api/itinerary/itinerary/${itineraryId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify(backendPayload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error updating itinerary:', errorText);
        throw new Error(`Failed to update itinerary: ${res.status} ${errorText}`);
      }

      const result = await res.json();
      console.log('Itinerary updated:', result);

      // Refresh the itineraries list
      await refetch();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update itinerary';
      setError(errorMessage);
      console.error('Update error:', err);
      throw err;
    }
  };

  return {
    itineraries,
    loading,
    error,
    hasFetched,
    refetch,
    addItinerary,
    deleteItinerary,
    updateItinerary,
  };
}
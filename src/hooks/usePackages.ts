import { useState, useEffect } from 'react';
import { Package } from '../lib/data';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
    const res = await fetch(`${API_BASE}/api/packages/list`);
    if (!res.ok) throw new Error("Failed to fetch packages");

    const json = await res.json();

    const normalizedPackages: Package[] = (json.packages ?? []).map((p: any) => ({
      id: String(p.package_id),
      name: p.package_name,
      description: p.description,
      short_description: p.short_description,
      duration_days: p.duration_days,
      duration_nights: p.duration_nights,
      base_price: p.base_price,
      discount_percent: p.discount_percent,
      final_price: p.final_price,
      max_capacity: p.max_capacity,
      current_bookings: p.current_bookings,
      availability_status: p.availability_status,
      featured: p.featured,
      difficulty_level: p.difficulty_level,
      start_location: p.start_location,
      end_location: p.end_location,
      included_services: p.included_services,
      excluded_services: p.excluded_services,
      terms_conditions: p.terms_conditions,
      cancellation_policy: p.cancellation_policy
    
    }));

    setPackages(normalizedPackages);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Error fetching packages");
  } finally {
    setLoading(false);
  }
}

  async function addPackage(pkg: Omit<Package, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const res = await fetch(`${API_BASE}/api/packages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pkg),
      });

      if (!res.ok) throw new Error("Failed to add package");

      const data = await res.json();
      const normalized: Package = {
        id: String(data.package_id),
        package_name: data.package_name,
        description: data.description,
        short_description: data.short_description,
        duration_days: data.duration_days,
        duration_nights: data.duration_nights,
        base_price: data.base_price,
        discount_percent: data.discount_percent,
        final_price: data.final_price,
        max_capacity: data.max_capacity,
        current_bookings: data.current_bookings,
        availability_status: data.availability_status,
        featured: data.featured,
        difficulty_level: data.difficulty_level,
        start_location: data.start_location,
        end_location: data.end_location,
        included_services: data.included_services,
        excluded_services: data.excluded_services,
        terms_conditions: data.terms_conditions,
        cancellation_policy: data.cancellation_policy
      };
      setPackages(prev => [normalized, ...prev]);

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error adding package";
      setError(message);
      throw err;
    }
  }

  async function updatePackage(id: string, updates: Partial<Package>) {
    try {
      const res = await fetch(`${API_BASE}/api/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update package");

      const data = await res.json();
      
      setPackages(prev =>
        prev.map(p => (p.id === id ? data : p))
      );

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error updating package";
      setError(message);
      throw err;
    }
  }

  async function deletePackage(id: string) {
    try {
      const res = await fetch(`${API_BASE}/api/packages/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete package");

      setPackages(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error deleting package";
      setError(message);
      throw err;
    }
  }

  return {
    packages,
    loading,
    error,
    fetchPackages,
    addPackage,
    updatePackage,
    deletePackage
  };
}

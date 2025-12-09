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
      const res = await fetch(`${API_BASE}/packages`);
      if (!res.ok) throw new Error("Failed to fetch packages");

      const data = await res.json();
      setPackages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching packages");
    } finally {
      setLoading(false);
    }
  }

  async function addPackage(pkg: Omit<Package, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const res = await fetch(`${API_BASE}/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pkg),
      });

      if (!res.ok) throw new Error("Failed to add package");

      const data = await res.json();
      setPackages(prev => [data, ...prev]);

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error adding package";
      setError(message);
      throw err;
    }
  }

  async function updatePackage(id: string, updates: Partial<Package>) {
    try {
      const res = await fetch(`${API_BASE}/packages/${id}`, {
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
      const res = await fetch(`${API_BASE}/packages/${id}`, {
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

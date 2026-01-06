import { useState } from 'react';

interface Props {
  onSubmit: (data: {
    city_name: string;
    state?: string;
    country?: string;
    is_departure_city: boolean;
  }) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

export function DepartureCityForm({ onSubmit, isLoading, error }: Props) {
  const [city_name, setCityName] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      city_name,
      state,
      country,
      is_departure_city: true,
    });
    setCityName('');
    setState('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        value={city_name}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="City name"
        className="w-full p-2.5 border rounded-lg"
      />

      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        className="w-full p-2.5 border rounded-lg"
      />

      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        className="w-full p-2.5 border rounded-lg"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
      >
        {isLoading ? 'Saving...' : 'Add Departure City'}
      </button>
    </form>
  );
}

import { MapPin } from 'lucide-react';
import { DepartureCity } from '../hooks/useDepartureCities';

interface Props {
  cities: DepartureCity[];
  loading: boolean;
}

export function DepartureCitiesList({ cities, loading }: Props) {
  if (loading) {
    return <p className="text-center text-gray-500">Loading cities...</p>;
  }

  if (!cities.length) {
    return <p className="text-center text-gray-500">No departure cities found</p>;
  }

  return (
    <ul className="divide-y">
      {cities.map((city) => (
        <li key={city.city_id} className="py-3 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium">
              {city.city_name}, {city.state}
            </p>
            <p className="text-sm text-gray-500">{city.country}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

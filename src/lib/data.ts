export type Package = {
  id: string;
  package_name: string;
  description: string;
  short_description: string;
  duration_days: number;
  duration_nights: number;
  base_price: number;
  discount_percent: number;
  final_price: number;
  max_capacity: number;
  current_bookings: number;
  availability_status: string;
  featured: boolean;
  difficulty_level: string;
  start_location: string;
  end_location: string;
  included_services: string;
  excluded_services: string;
  terms_conditions: string;
  cancellation_policy: string;
  created_at?: string;
  updated_at?: string;
};

export type Category = {
  id: string;
  category_name: string;
  description: string;
  parent_category_id?: string;
  is_active: boolean;
  display_order: number;
  icon_class: string;
  created_at?: string;
  updated_at?: string;
};

export type Destination = {
  id: string;
  destination_name: string;
  description: string;
  country: string;
  days_spent: number;
  image_url: string;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Itinerary = {
  id: string;
  package_id: string;
  day_number: number;
  package_id_ref: string;
  title: string;
  description: string;
  accommodation: string;
  meals: string;
  activities: string;
  created_at?: string;
  updated_at?: string;
};

export type PackageCategory = {
  id: string;
  package_id: string;
  category_id: string;
  created_at?: string;
};

export type PackageDestination = {
  id: string;
  package_id: string;
  destination_id: string;
  is_primary: boolean;
  days_spent: number;
  created_at?: string;
};

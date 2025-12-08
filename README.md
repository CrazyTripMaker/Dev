# Tour Package Admin API

A FastAPI-based REST API for managing tour packages, categories, destinations, itineraries, and inquiries.

## Features

- **Package Management**: Create, update, and delete tour packages
- **Category Management**: Organize packages by category (Group Tours, Personal Tours, Customised Tours)
- **Destination Management**: Manage tour destinations
- **Itinerary Management**: Create day-by-day itineraries for packages
- **Inquiry Management**: Handle contact form submissions

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure your PostgreSQL database connection (see `database.py.example`)

## Running the API

Start the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Packages
- `POST /api/packages/` - Create a new package
- `POST /api/packages/complete` - Create a package with categories, destinations, and itinerary
- `PUT /api/packages/{package_id}` - Update a package
- `DELETE /api/packages/{package_id}` - Delete a package
- `POST /api/packages/{package_id}/categories` - Link package to category
- `POST /api/packages/{package_id}/destinations` - Link package to destination
- `PATCH /api/packages/{package_id}/availability` - Update availability status
- `PATCH /api/packages/{package_id}/featured` - Toggle featured status

### Categories
- `POST /api/categories/` - Create a new category
- `POST /api/categories/bulk` - Create multiple categories
- `PUT /api/categories/{category_id}` - Update a category
- `DELETE /api/categories/{category_id}` - Delete a category
- `PATCH /api/categories/{category_id}/toggle-active` - Toggle active status
- `PATCH /api/categories/{category_id}/display-order` - Update display order

### Destinations
- `POST /api/destinations/` - Create a new destination
- `POST /api/destinations/bulk` - Create multiple destinations
- `PUT /api/destinations/{destination_id}` - Update a destination
- `DELETE /api/destinations/{destination_id}` - Delete a destination
- `PATCH /api/destinations/{destination_id}/toggle-popular` - Toggle popular status

### Itinerary
- `POST /api/itinerary/` - Create a single itinerary item
- `POST /api/itinerary/bulk` - Create multiple itinerary items
- `PUT /api/itinerary/{itinerary_id}` - Update an itinerary item
- `DELETE /api/itinerary/{itinerary_id}` - Delete an itinerary item
- `DELETE /api/itinerary/package/{package_id}` - Delete all itinerary for a package

### Inquiries
- `POST /api/inquiries/` - Create a new inquiry
- `PATCH /api/inquiries/{inquiry_id}/status` - Update inquiry status
- `POST /api/inquiries/{inquiry_id}/reply` - Reply to an inquiry
- `DELETE /api/inquiries/{inquiry_id}` - Delete an inquiry

## Example Usage

### Create a Complete Package

```bash
curl -X POST "http://localhost:8000/api/packages/complete" \
  -H "Content-Type: application/json" \
  -d '{
    "package": {
      "package_name": "Amazing Himalayan Trek",
      "description": "Experience the breathtaking views of the Himalayas",
      "short_description": "7-day trek through mountain passes",
      "duration_days": 7,
      "duration_nights": 6,
      "accommodation": "Mountain lodges and camping",
      "meals": "Breakfast, Lunch, Dinner",
      "activities": "Trekking, Mountain climbing, Photography",
      "base_price": 1500.00,
      "discount_percent": 10,
      "final_price": 1350.00,
      "max_capacity": 15,
      "availability_status": "available",
      "featured": true,
      "difficulty_level": "moderate",
      "start_location": "Kathmandu",
      "end_location": "Kathmandu",
      "included_services": "Guide, Transportation, Accommodation, Meals",
      "excluded_services": "International flights, Travel insurance",
      "terms_conditions": "Full terms available on website",
      "cancellation_policy": "Free cancellation up to 7 days before"
    },
    "categories": [1, 2],
    "destinations": [
      {"destination_id": 1, "is_primary": true, "days_spent": 5},
      {"destination_id": 2, "is_primary": false, "days_spent": 2}
    ],
    "itinerary": [
      {
        "package_id": 1,
        "day_number": 1,
        "title": "Arrival in Kathmandu",
        "description": "Arrive and hotel check-in",
        "accommodation": "Hotel",
        "meals": "Dinner",
        "activities": "City orientation"
      }
    ]
  }'
```

### Create a Category

```bash
curl -X POST "http://localhost:8000/api/categories/" \
  -H "Content-Type: application/json" \
  -d '{
    "category_name": "Group Tours",
    "description": "Tours designed for groups",
    "icon_class": "fas fa-users",
    "display_order": 1,
    "is_active": true
  }'
```

### Create an Inquiry

```bash
curl -X POST "http://localhost:8000/api/inquiries/" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Inquiry about Himalayan Trek",
    "message": "I would like more information about the trek",
    "package_id": 1,
    "status": "pending"
  }'
```

## Database Integration

To integrate with your PostgreSQL database:

1. See `database.py.example` for database connection setup
2. Implement the database insertion/update/deletion logic in each router
3. Use SQLAlchemy or psycopg2 for database operations
4. Ensure proper error handling and transaction management

## CORS Configuration

The API is configured to accept requests from `http://192.168.192.1:5173` (your frontend).

To modify allowed origins, update the CORS middleware in `main.py`.

## Notes

- All endpoints currently return mock responses
- Database integration logic needs to be implemented in each router
- Use transactions when creating complete packages to ensure data consistency
- Implement proper error handling for database operations
- Add authentication and authorization as needed for production use

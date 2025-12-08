# Quick Start Guide

## Installation Steps

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Database Connection

Copy the example database configuration and update with your credentials:

```bash
cp database.py.example database.py
```

Then edit `database.py` and add your PostgreSQL connection details:
- host
- port
- database name
- username
- password

### 3. Configure Environment Variables (Optional)

```bash
cp .env.example .env
```

Edit `.env` with your settings.

### 4. Run the API Server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### 5. View API Documentation

Open your browser and go to:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Testing the API

### Option 1: Using the Interactive Swagger UI
1. Go to `http://localhost:8000/docs`
2. Click on any endpoint
3. Click "Try it out"
4. Fill in the request body
5. Click "Execute"

### Option 2: Using Python Examples
Run the provided examples:

```bash
python api_examples.py
```

Edit the file to uncomment the examples you want to test.

### Option 3: Using Postman
Import the `POSTMAN_COLLECTION.json` file into Postman or any compatible API client.

### Option 4: Using cURL
Check the README.md for cURL examples.

## Database Integration

The API currently returns mock responses. To integrate with your PostgreSQL database:

1. Implement the database connection in `database.py` (see `database.py.example`)
2. Add database logic to each router file in `routers/` directory
3. Look for `# TODO: Implement database insertion logic` comments

## Project Structure

```
.
├── main.py                    # FastAPI application entry point
├── requirements.txt           # Python dependencies
├── models/
│   └── schemas.py            # Pydantic models for request/response
├── routers/
│   ├── packages.py           # Package endpoints
│   ├── categories.py         # Category endpoints
│   ├── destinations.py       # Destination endpoints
│   ├── itinerary.py          # Itinerary endpoints
│   └── inquiries.py          # Inquiry endpoints
├── database.py.example       # Database configuration template
├── api_examples.py           # Python API usage examples
├── POSTMAN_COLLECTION.json   # Postman collection
└── README.md                 # Full documentation
```

## Common Endpoints

### Create a Package
```bash
POST http://localhost:8000/api/packages/
```

### Create a Complete Package (with categories, destinations, itinerary)
```bash
POST http://localhost:8000/api/packages/complete
```

### Create a Category
```bash
POST http://localhost:8000/api/categories/
```

### Create a Destination
```bash
POST http://localhost:8000/api/destinations/
```

### Create Itinerary Items
```bash
POST http://localhost:8000/api/itinerary/bulk
```

### Submit an Inquiry
```bash
POST http://localhost:8000/api/inquiries/
```

## Next Steps

1. Implement database integration in the router files
2. Add authentication/authorization if needed
3. Add data validation and error handling
4. Set up proper logging
5. Configure production settings (CORS, security headers, etc.)

## Need Help?

- Check the full documentation in `README.md`
- View API examples in `api_examples.py`
- Review the database integration guide in `database.py.example`
- Use the interactive API docs at `/docs` endpoint

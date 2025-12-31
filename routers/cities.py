# routers/cities.py
from fastapi import APIRouter, HTTPException, status
from typing import List
from models.schemas import CityCreate, CityResponse

router = APIRouter()

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_city(city: CityCreate):
    """
    Create a new city (for departure cities).
    """
    try:
        from database import get_db_connection
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            query = """
                INSERT INTO "CTM".cities 
                (city_name, state, country, is_departure_city)
                VALUES (%s, %s, %s, %s)
                RETURNING city_id, created_at
            """
            
            cursor.execute(query, (
                city.city_name, city.state, 
                city.country, city.is_departure_city
            ))
            
            result = cursor.fetchone()
            
            return {
                "message": "City created successfully",
                "city_id": result["city_id"],
                "city_name": city.city_name,
                "status": "success"
            }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create city: {str(e)}"
        )

@router.get("/departure", response_model=dict)
async def get_departure_cities():
    """
    Get all cities that can be departure points.
    """
    try:
        from database import get_db_connection
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT * FROM "CTM".cities 
                WHERE is_departure_city = true
                ORDER BY city_name
            """)
            
            cities = cursor.fetchall()
            
            return {
                "cities": [dict(city) for city in cities],
                "count": len(cities),
                "status": "success"
            }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve cities: {str(e)}"
        )

@router.get("/search", response_model=dict)
async def search_cities(query: str):
    """
    Search cities by name.
    """
    try:
        from database import get_db_connection
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            search_query = f"%{query}%"
            cursor.execute("""
                SELECT * FROM "CTM".cities 
                WHERE city_name ILIKE %s OR state ILIKE %s
                LIMIT 10
            """, (search_query, search_query))
            
            cities = cursor.fetchall()
            
            return {
                "query": query,
                "cities": [dict(city) for city in cities],
                "count": len(cities),
                "status": "success"
            }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to search cities: {str(e)}"
        )
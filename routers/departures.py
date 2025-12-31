# routers/departures.py
from fastapi import APIRouter, HTTPException, status
from typing import List
from models.schemas import (
    PackageDepartureCreate,
    PackageDepartureResponse,
    DepartureItineraryCreate,
    DepartureItineraryResponse
)
from database import (
    insert_package_departure,
    update_package_departure,
    delete_package_departure,
    insert_departure_itinerary,
    update_departure_itinerary,
    delete_departure_itinerary
)

router = APIRouter()

# ============ DEPARTURE OPTIONS ============

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_departure_option(departure: PackageDepartureCreate):
    """
    Create a new departure option for a package.
    """
    try:
        from database import get_db_connection
        
        # First check if city exists
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""SELECT city_id FROM "CTM".cities WHERE city_id = %s""", 
                          (departure.departure_city_id,))
            city = cursor.fetchone()
            
            if not city:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"City with ID {departure.departure_city_id} not found"
                )
        
        # Convert to dict and insert
        departure_data = departure.dict()
        result = insert_package_departure(departure_data)
        
        return {
            "message": "Departure option created successfully",
            "departure_id": result["id"],
            "package_id": departure.package_id,
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create departure option: {str(e)}"
        )

@router.get("/package/{package_id}", response_model=dict)
async def get_package_departures(package_id: int):
    """
    Get all departure options for a package.
    """
    try:
        from database import get_db_connection
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT pd.*, d.city_name as departure_city_name
                FROM "CTM".package_departures pd
                LEFT JOIN "CTM".cities d ON pd.departure_city_id = d.city_id
                WHERE pd.package_id = %s
                ORDER BY pd.base_price ASC
            """, (package_id,))
            
            departures = cursor.fetchall()
            
            return {
                "package_id": package_id,
                "departures": [dict(dep) for dep in departures],
                "count": len(departures),
                "status": "success"
            }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve departures: {str(e)}"
        )

@router.put("/{departure_id}", response_model=dict)
async def update_departure_option(departure_id: int, departure: PackageDepartureCreate):
    """
    Update a departure option.
    """
    try:
        departure_data = departure.dict(exclude_unset=True)
        
        success = update_package_departure(departure_id, departure_data)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Departure option with ID {departure_id} not found"
            )
        
        return {
            "message": f"Departure option {departure_id} updated successfully",
            "departure_id": departure_id,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update departure option: {str(e)}"
        )

@router.delete("/{departure_id}", response_model=dict)
async def delete_departure_option(departure_id: int):
    """
    Delete a departure option.
    """
    try:
        success = delete_package_departure(departure_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Departure option with ID {departure_id} not found"
            )
        
        return {
            "message": f"Departure option {departure_id} deleted successfully",
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete departure option: {str(e)}"
        )

# ============ COMPLETE PACKAGE WITH DEPARTURES ============

@router.post("/package/complete", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_complete_package_with_departures(package_data: dict):
    """
    Create a complete package with multiple departure options.
    """
    try:
        from database import insert_complete_package_with_departures
        
        result = insert_complete_package_with_departures(package_data)
        
        return {
            "message": "Complete package with departures created successfully",
            "package_id": result["package_id"],
            "departures_created": result["departures_created"],
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create package: {str(e)}"
        )
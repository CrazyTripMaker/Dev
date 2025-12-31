from fastapi import APIRouter, HTTPException, status
from typing import List
from models.schemas import (
    DepartureItineraryCreate
)
from database import (
    insert_departure_itinerary,
    delete_departure_itinerary
)
router = APIRouter()

@router.post("/{package_id}/itinerary", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_departure_itinerary_item(
    package_id: int,
    itinerary: DepartureItineraryCreate
):
    try:
        from database import get_db_connection

        with get_db_connection() as conn:
            cursor = conn.cursor()

            # 1. Fetch package
            cursor.execute(
                'SELECT start_location FROM "CTM".packages WHERE package_id = %s',
                (package_id,)
            )
            package = cursor.fetchone()
            if not package:
                raise HTTPException(404, "Package not found")

            start_location = package["start_location"]

            # 2. Fetch city id
            cursor.execute(
                'SELECT city_id FROM "CTM".cities WHERE city_name = %s',
                (start_location,)
            )
            city = cursor.fetchone()
            if not city:
                raise HTTPException(404, "Departure city not found")

            departure_city_id = city["city_id"]

            # 3. Insert itinerary
            itinerary_data = itinerary.dict()
            itinerary_data["package_id"] = package_id
            itinerary_data["departure_city_id"] = departure_city_id

            result = insert_departure_itinerary(itinerary_data)

            return {
                "message": "Itinerary item created successfully",
                "itinerary_id": result["id"],
                "package_id": package_id,
                "departure_city_id": departure_city_id,
                "status": "success"
            }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create itinerary item: {str(e)}"
        )

@router.get("/{package_id}/list", response_model=dict)
async def get_departure_itinerary(package_id: int):
    try:
        from database import get_db_connection

        with get_db_connection() as conn:
            cursor = conn.cursor()

            # 1. Resolve departure city
            cursor.execute(
                '''
                SELECT c.city_id AS city_id
                FROM "CTM".packages p
                JOIN "CTM".cities c ON c.city_name = p.start_location
                WHERE p.package_id = %s
                ''',
                (package_id,)
            )
            result = cursor.fetchone()
            if not result:
                raise HTTPException(404, "Package or city not found")

            departure_city_id = result["city_id"]

            # 2. Fetch itinerary
            cursor.execute(
                '''
                SELECT *
                FROM "CTM".departure_itinerary
                WHERE package_id = %s AND departure_city_id = %s
                ORDER BY day_number
                ''',
                (package_id, departure_city_id)
            )

            itinerary = cursor.fetchall()

            return {
                "package_id": package_id,
                "departure_city_id": departure_city_id,
                "itinerary": [dict(row) for row in itinerary],
                "count": len(itinerary),
                "status": "success"
            }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve itinerary: {str(e)}"
        )

@router.delete("/itinerary/{itinerary_id}", response_model=dict)
async def delete_departure_itinerary_item(itinerary_id: int):
    """
    Delete a departure itinerary item.
    """
    try:
        success = delete_departure_itinerary(itinerary_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Itinerary item with ID {itinerary_id} not found"
            )
        
        return {
            "message": f"Itinerary item {itinerary_id} deleted successfully",
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete itinerary item: {str(e)}"
        )

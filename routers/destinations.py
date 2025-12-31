from fastapi import APIRouter, HTTPException, status
from typing import List
from models.schemas import DestinationCreate, DestinationResponse

router = APIRouter()

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_destination(destination: DestinationCreate):
    """
    Create a new destination.

    Destinations are places/countries included in tour packages.
    """
    # TODO: Implement database insertion logic
    # Insert into destinations table

    return {
        "message": "Destination created successfully",
        "data": destination.dict(),
        "note": "Database insertion logic needs to be implemented"
    }

@router.post("/bulk", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_destinations_bulk(destinations: List[DestinationCreate]):
    """
    Create multiple destinations at once.
    """
    # TODO: Implement bulk database insertion logic

    return {
        "message": f"{len(destinations)} destinations created successfully",
        "count": len(destinations),
        "note": "Database bulk insertion logic needs to be implemented"
    }

@router.put("/{destination_id}", response_model=dict)
async def update_destination(destination_id: int, destination: DestinationCreate):
    """
    Update an existing destination.
    """
    # TODO: Implement database update logic

    return {
        "message": f"Destination {destination_id} updated successfully",
        "data": destination.dict(),
        "note": "Database update logic needs to be implemented"
    }

@router.delete("/{destination_id}", response_model=dict)
async def delete_destination(destination_id: int):
    """
    Delete a destination.

    Note: This should handle cascade deletions for package_destinations.
    """
    # TODO: Implement database deletion logic

    return {
        "message": f"Destination {destination_id} deleted successfully",
        "note": "Database deletion logic needs to be implemented"
    }

@router.patch("/{destination_id}/toggle-popular", response_model=dict)
async def toggle_destination_popular(destination_id: int, is_popular: bool):
    """
    Toggle destination popular status.
    """
    # TODO: Implement database update for is_popular field

    return {
        "message": f"Destination {destination_id} popular status updated",
        "is_popular": is_popular,
        "note": "Database update logic needs to be implemented"
    }

@router.get("/list", response_model=dict)
async def list_destinations(
    skip: int = 0,
    limit: int = 10,
    featured: bool = None,
    availability_status: str = None
):
    """
    List all destinations with pagination and filtering.
    """
    try:
        from database import get_db_connection
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Build query with filters
            query = """SELECT * FROM "CTM".destinations WHERE 1=1"""
            params = []
            
            if featured is not None:
                query += " AND featured = %s"
                params.append(featured)
            
            if availability_status:
                query += " AND availability_status = %s"
                params.append(availability_status)
            
            # Add pagination
            query += " ORDER BY created_at DESC LIMIT %s OFFSET %s"
            params.extend([limit, skip])
            
            cursor.execute(query, params)
            destinations = cursor.fetchall()
            
            # Get total count for pagination
            count_query = """SELECT COUNT(*) FROM "CTM".destinations WHERE 1=1"""
            count_params = []
            
            if featured is not None:
                count_query += " AND featured = %s"
                count_params.append(featured)
            
            if availability_status:
                count_query += " AND availability_status = %s"
                count_params.append(availability_status)
            
            cursor.execute(count_query, count_params)
            total_count = cursor.fetchone()['count']
            
            return {
                "destinations": [dict(des) for des in destinations],
                "total": total_count,
                "skip": skip,
                "limit": limit,
                "status": "success"
            }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve categories: {str(e)}"
        )
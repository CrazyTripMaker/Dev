from fastapi import APIRouter, HTTPException, status
from typing import List
from models.schemas import (
    PackageCreate,
    PackageResponse,
    PackageComplete,
    PackageCategoryCreate,
    PackageDestinationCreate
)
from database import (
    insert_package,
    update_package,
    delete_package_db,
    insert_complete_package,
    link_package_category,
    link_package_destination,
    update_package_status,
    update_package_featured
)

router = APIRouter()

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_package(package: PackageCreate):
    """
    Create a new tour package.
    """
    try:
        # Convert Pydantic model to dict
        package_data = package.dict()
        
        # Validate availability_status
        valid_statuses = ["available", "sold_out", "upcoming"]
        if package_data.get("availability_status") not in valid_statuses:
            package_data["availability_status"] = "available"
        
        # Insert into database
        result = insert_package(package_data)
        
        return {
            "message": "Package created successfully",
            "package_id": result["package_id"],
            "created_at": result["created_at"],
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create package: {str(e)}"
        )

@router.post("/complete", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_complete_package(package_data: PackageComplete):
    """
    Create a complete package with categories, destinations, and itinerary.
    """
    try:
        # Convert package data to dict
        package_dict = package_data.package.dict()
        
        # Validate and prepare data
        valid_statuses = ["available", "sold_out", "upcoming"]
        if package_dict.get("availability_status") not in valid_statuses:
            package_dict["availability_status"] = "available"
        
        # Ensure final_price is calculated if not provided
        if "final_price" not in package_dict or not package_dict["final_price"]:
            base_price = package_dict.get("base_price", 0)
            discount = package_dict.get("discount_percent", 0)
            if discount > 0:
                package_dict["final_price"] = base_price * (1 - discount / 100)
            else:
                package_dict["final_price"] = base_price
        
        # Prepare categories list
        categories = package_data.categories if package_data.categories else []
        
        # Prepare destinations list
        destinations = []
        for dest in package_data.destinations:
            if isinstance(dest, dict):
                destinations.append(dest)
            else:
                destinations.append(dest.dict())
        
        # Prepare itinerary list
        itinerary = []
        for item in package_data.itinerary:
            if isinstance(item, dict):
                itinerary.append(item)
            else:
                itinerary.append(item.dict())
        
        # Insert complete package with transaction
        result = insert_complete_package(
            package_data=package_dict,
            categories=categories,
            destinations=destinations,
            itinerary=itinerary
        )
        
        return {
            "message": "Complete package created successfully",
            "package_id": result["package_id"],
            "categories_linked": result["categories_linked"],
            "destinations_linked": result["destinations_linked"],
            "itinerary_items": result["itinerary_items"],
            "status": result["status"]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create complete package: {str(e)}"
        )

@router.put("/{package_id}", response_model=dict)
async def update_package(package_id: int, package: PackageCreate):
    """
    Update an existing tour package.
    """
    try:
        # Convert Pydantic model to dict
        package_data = package.dict(exclude_unset=True)  # Only include fields that were set
        
        # Validate package_id exists
        if package_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid package ID"
            )
        
        # Calculate final_price if base_price or discount_percent is updated
        if "base_price" in package_data or "discount_percent" in package_data:
            base_price = package_data.get("base_price")
            discount = package_data.get("discount_percent", 0)
            
            if base_price is not None and discount is not None:
                if discount > 0:
                    package_data["final_price"] = base_price * (1 - discount / 100)
                else:
                    package_data["final_price"] = base_price
        
        # Update package in database
        success = update_package(package_id, package_data)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Package with ID {package_id} not found"
            )
        
        return {
            "message": f"Package {package_id} updated successfully",
            "package_id": package_id,
            "updated_fields": list(package_data.keys()),
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update package: {str(e)}"
        )

@router.delete("/{package_id}", response_model=dict)
async def delete_package(package_id: int):
    """
    Delete a tour package.
    """
    try:
        # Validate package_id
        if package_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid package ID"
            )
        
        # Delete package from database
        success = delete_package_db(package_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Package with ID {package_id} not found"
            )
        
        return {
            "message": f"Package {package_id} deleted successfully",
            "package_id": package_id,
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete package: {str(e)}"
        )

@router.post("/{package_id}/categories", response_model=dict)
async def link_package_category(package_id: int, category_id: int):
    """
    Link a package to a category.
    """
    try:
        # Validate IDs
        if package_id <= 0 or category_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid package ID or category ID"
            )
        
        # Link package to category in database
        success = link_package_category(package_id, category_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to link package {package_id} to category {category_id}. "
                       "Check if both exist and are not already linked."
            )
        
        return {
            "message": "Package linked to category successfully",
            "package_id": package_id,
            "category_id": category_id,
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to link package to category: {str(e)}"
        )

@router.post("/{package_id}/destinations", response_model=dict)
async def link_package_destination(link: PackageDestinationCreate):
    """
    Link a package to a destination.
    """
    try:
        # Convert Pydantic model to parameters
        package_id = link.package_id
        destination_id = link.destination_id
        is_primary = link.is_primary
        days_spent = link.days_spent
        
        # Validate IDs
        if package_id <= 0 or destination_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid package ID or destination ID"
            )
        
        # Validate days_spent if provided
        if days_spent is not None and days_spent <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Days spent must be a positive integer"
            )
        
        # Link package to destination in database
        success = link_package_destination(
            package_id=package_id,
            destination_id=destination_id,
            is_primary=is_primary,
            days_spent=days_spent
        )
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to link package {package_id} to destination {destination_id}. "
                       "Check if both exist and are not already linked."
            )
        
        return {
            "message": "Package linked to destination successfully",
            "package_id": package_id,
            "destination_id": destination_id,
            "is_primary": is_primary,
            "days_spent": days_spent,
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to link package to destination: {str(e)}"
        )

@router.patch("/{package_id}/availability", response_model=dict)
async def update_package_availability(package_id: int, availability_status: str):
    """
    Update package availability status.
    """
    try:
        # Validate package_id
        if package_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid package ID"
            )
        
        # Validate availability_status
        valid_statuses = ["available", "sold_out", "upcoming"]
        if availability_status not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid availability status. Must be one of: {', '.join(valid_statuses)}"
            )
        
        # Update availability status in database
        success = update_package_status(package_id, availability_status)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Package with ID {package_id} not found"
            )
        
        return {
            "message": f"Package {package_id} availability updated",
            "package_id": package_id,
            "availability_status": availability_status,
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update package availability: {str(e)}"
        )

@router.patch("/{package_id}/featured", response_model=dict)
async def toggle_featured(package_id: int, featured: bool):
    """
    Toggle package featured status.
    """
    try:
        # Validate package_id
        if package_id <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid package ID"
            )
        
        # Validate featured is boolean
        if not isinstance(featured, bool):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Featured must be a boolean value (true/false)"
            )
        
        # Update featured status in database
        success = update_package_featured(package_id, featured)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Package with ID {package_id} not found"
            )
        
        return {
            "message": f"Package {package_id} featured status updated",
            "package_id": package_id,
            "featured": featured,
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update package featured status: {str(e)}"
        )

# Additional endpoints for better functionality

@router.get("/list", response_model=dict)
async def list_packages(
    skip: int = 0,
    limit: int = 10,
    featured: bool = None,
    availability_status: str = None
):
    """
    List all packages with pagination and filtering.
    """
    try:
        from database import get_db_connection
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Build query with filters
            query = """SELECT * FROM "CTM".packages WHERE 1=1"""
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
            packages = cursor.fetchall()
            
            # Get total count for pagination
            count_query = """SELECT COUNT(*) FROM "CTM".packages WHERE 1=1"""
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
                "packages": [dict(pkg) for pkg in packages],
                "total": total_count,
                "skip": skip,
                "limit": limit,
                "status": "success"
            }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve packages: {str(e)}"
        )
    
@router.get("/{package_id}", response_model=dict)
async def get_package(package_id: int):
    """
    Get a single package by ID with all related data including departures.
    """
    try:
        from database import get_db_connection
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Get package details
            cursor.execute("""
                SELECT * FROM "CTM".packages 
                WHERE package_id = %s
            """, (package_id,))
            package = cursor.fetchone()
            
            if not package:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Package with ID {package_id} not found"
                )
            
            # Get categories
            cursor.execute("""
                SELECT c.category_id, c.category_name
                FROM "CTM".categories c
                JOIN "CTM".package_categories pc ON c.category_id = pc.category_id
                WHERE pc.package_id = %s
            """, (package_id,))
            categories = cursor.fetchall()
            
            # Get destinations
            cursor.execute("""
                SELECT d.destination_id, d.destination_name, pd.is_primary
                FROM "CTM".destinations d
                JOIN "CTM".package_destinations pd ON d.destination_id = pd.destination_id
                WHERE pd.package_id = %s
            """, (package_id,))
            destinations = cursor.fetchall()
            
            # Get departure options (NEW)
            cursor.execute("""
                SELECT pd.*, d.destination_name as departure_city_name
                FROM "CTM".package_departures pd
                LEFT JOIN "CTM".destinations d ON pd.departure_city_id = d.destination_id
                WHERE pd.package_id = %s AND pd.is_active = true
                ORDER BY pd.base_price ASC
            """, (package_id,))
            departures = cursor.fetchall()
            
            return {
                "package": dict(package),
                "categories": [dict(cat) for cat in categories],
                "destinations": [dict(dest) for dest in destinations],
                "departures": [dict(dep) for dep in departures],  # NEW
                "status": "success"
            }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve package: {str(e)}"
        )

from fastapi import APIRouter, HTTPException, status
from typing import List
from models.schemas import CategoryCreate, CategoryResponse
from database import (
    insert_category,
    insert_categories_bulk,
    update_category,
    delete_category,
    update_category_status,
    update_category_display_order
)

router = APIRouter()

# ================= CREATE =================

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_category(category: CategoryCreate):
    try:
        result = insert_category(category.dict(exclude_unset=True))

        return {
            "message": "Category created successfully",
            "data": result,
            "status": "success"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create category: {str(e)}"
        )
    
# ================= BULK CREATE =================

@router.post("/bulk", status_code=status.HTTP_201_CREATED)
async def create_categories_bulk(categories: List[CategoryCreate]):
    try:
        inserted_count = insert_categories_bulk(
            [cat.dict() for cat in categories]
        )
        return {
            "message": f"{inserted_count} categories created successfully",
            "count": inserted_count,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Bulk category creation failed: {str(e)}"
        )

# ================= UPDATE =================

@router.put("/{category_id}")
async def update_category(category_id: int, category: CategoryCreate):
    updated = update_category(category_id, category.dict())
    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Category not found or no fields updated"
        )

    return {
        "message": f"Category {category_id} updated successfully",
        "status": "success"
    }

# ================= DELETE =================

@router.delete("/{category_id}", status_code=200)
async def delete_category_api(category_id: int):

    deleted = delete_category(category_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return {
        "message": f"Category {category_id} deleted successfully",
        "status": "success"
    }

# ================= TOGGLE ACTIVE =================

@router.patch("/{category_id}/toggle-active")
async def toggle_category_active(category_id: int, is_active: bool):
    updated = update_category_status(category_id, is_active)
    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return {
        "message": f"Category {category_id} active status updated",
        "is_active": is_active,
        "status": "success"
    }

# ================= DISPLAY ORDER =================

@router.patch("/{category_id}/display-order")
async def update_display_order(category_id: int, display_order: int):
    updated = update_category_display_order(category_id, display_order)
    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return {
        "message": f"Category {category_id} display order updated",
        "display_order": display_order,
        "status": "success"
    }

# ================= LIST =================

@router.get("/list")
async def list_categories(
    skip: int = 0,
    limit: int = 10,
    featured: bool = None,
    availability_status: str = None
):
    try:
        from database import get_db_connection

        with get_db_connection() as conn:
            cursor = conn.cursor()

            query = """SELECT * FROM "CTM".categories WHERE 1=1"""
            params = []

            if featured is not None:
                query += " AND featured = %s"
                params.append(featured)

            if availability_status:
                query += " AND availability_status = %s"
                params.append(availability_status)

            query += " ORDER BY created_at DESC LIMIT %s OFFSET %s"
            params.extend([limit, skip])

            cursor.execute(query, params)
            categories = cursor.fetchall()

            cursor.execute("""SELECT COUNT(*) FROM "CTM".categories""")
            total = int(cursor.fetchone()['count'])

            return {
                "data": [dict(cat) for cat in categories],
                "total": total,
                "skip": skip,
                "limit": limit,
                "status": "success"
            }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve categories: {str(e)}"
        )

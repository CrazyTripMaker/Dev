from fastapi import APIRouter, HTTPException, status
from typing import List
from models.schemas import InquiryCreate, InquiryResponse

router = APIRouter()

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_inquiry(inquiry: InquiryCreate):
    """
    Create a new inquiry/contact form submission.

    This endpoint handles contact form submissions from the website.
    Can be linked to a specific package or be a general inquiry.
    """
    # TODO: Implement database insertion logic
    # Insert into inquiries table

    return {
        "message": "Inquiry submitted successfully",
        "data": inquiry.dict(),
        "note": "Database insertion logic needs to be implemented"
    }

@router.patch("/{inquiry_id}/status", response_model=dict)
async def update_inquiry_status(inquiry_id: int, status: str):
    """
    Update inquiry status.

    Status values: pending, in_progress, resolved, closed
    """
    # TODO: Implement database update logic for status field

    return {
        "message": f"Inquiry {inquiry_id} status updated",
        "status": status,
        "note": "Database update logic needs to be implemented"
    }

@router.post("/{inquiry_id}/reply", response_model=dict)
async def reply_to_inquiry(inquiry_id: int, reply_message: str):
    """
    Reply to an inquiry.

    This updates the reply_message and replied_at fields.
    """
    # TODO: Implement database update logic
    # Set reply_message and replied_at = current timestamp

    return {
        "message": f"Reply sent to inquiry {inquiry_id}",
        "reply_message": reply_message,
        "note": "Database update logic needs to be implemented"
    }

@router.delete("/{inquiry_id}", response_model=dict)
async def delete_inquiry(inquiry_id: int):
    """
    Delete an inquiry.
    """
    # TODO: Implement database deletion logic

    return {
        "message": f"Inquiry {inquiry_id} deleted successfully",
        "note": "Database deletion logic needs to be implemented"
    }

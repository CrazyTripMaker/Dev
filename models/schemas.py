from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime, date
from decimal import Decimal
from enum import Enum

class DifficultyLevel(str, Enum):
    EASY = "easy"
    MODERATE = "moderate"
    DIFFICULT = "difficult"

class AvailabilityStatus(str, Enum):
    AVAILABLE = "available"
    SOLD_OUT = "sold_out"
    UPCOMING = "upcoming"

# Package Models
class PackageBase(BaseModel):
    package_name: str = Field(..., max_length=255)
    description: Optional[str] = None
    short_description: Optional[str] = None
    duration_days: int
    duration_nights: int
    base_price: Decimal
    discount_percent: Optional[Decimal] = Field(None, ge=0, le=100)
    max_capacity: Optional[int] = None
    current_bookings: int = Field(default=0)
    availability_status: AvailabilityStatus = Field(default=AvailabilityStatus.AVAILABLE)
    featured: bool = Field(default=False)
    difficulty_level: Optional[DifficultyLevel] = None
    start_location: Optional[str] = None
    end_location: Optional[str] = None
    included_services: Optional[str] = None
    excluded_services: Optional[str] = None
    terms_conditions: Optional[str] = None
    cancellation_policy: Optional[str] = None

class PackageCreate(PackageBase):
    pass

class PackageResponse(PackageBase):
    package_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Category Models
class CategoryBase(BaseModel):
    category_name: str = Field(..., max_length=100)
    description: Optional[str] = None
    icon_class: Optional[str] = None
    display_order: Optional[int] = None
    is_active: bool = Field(default=True)

class CategoryCreate(BaseModel):
    category_name: str
    description: Optional[str] = None
    icon_class: Optional[str] = None
    display_order: Optional[int] = 0
    is_active: Optional[bool] = True
    parent_category_id: Optional[int] = None

class CategoryResponse(CategoryBase):
    category_id: int
    parent_category_id: Optional[int] = None

    class Config:
        from_attributes = True

# Destination Models
class DestinationBase(BaseModel):
    destination_name: str = Field(..., max_length=255)
    country: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_popular: bool = Field(default=False)

class DestinationCreate(DestinationBase):
    pass

class DestinationResponse(DestinationBase):
    destination_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Itinerary Models
class ItineraryBase(BaseModel):
    package_id: int
    day_number: int
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    accommodation: Optional[str] = None
    meals: Optional[str] = None
    activities: Optional[str] = None

class ItineraryCreate(ItineraryBase):
    pass

class ItineraryResponse(ItineraryBase):
    itinerary_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Package Category Link
class PackageCategoryLink(BaseModel):
    package_id: int
    category_id: int

class PackageCategoryCreate(PackageCategoryLink):
    pass

# Package Destination Link
class PackageDestinationLink(BaseModel):
    package_id: int
    destination_id: int
    is_primary: bool = Field(default=False)
    days_spent: Optional[int] = None

class PackageDestinationCreate(PackageDestinationLink):
    pass

# Inquiry Models
class InquiryBase(BaseModel):
    full_name: str = Field(..., max_length=255)
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    package_id: Optional[int] = None
    status: str = Field(default="pending")

class InquiryCreate(InquiryBase):
    pass

class InquiryResponse(InquiryBase):
    inquiry_id: int
    created_at: datetime
    replied_at: Optional[datetime] = None
    reply_message: Optional[str] = None

    class Config:
        from_attributes = True

class PackageDepartureCreate(BaseModel):
    package_id: int
    departure_city_id: int  
    base_price: Decimal
    duration_days: int
    start_city: str  
    is_active: bool = True

class PackageDepartureResponse(PackageDepartureCreate):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

# Itinerary Day Model (linked to departure)
class DepartureItineraryCreate(BaseModel):
    package_id: int
    departure_city_id: int
    day_number: int
    title: str
    description: Optional[str] = None
    accommodation: Optional[str] = None
    meals: Optional[str] = None
    activities: Optional[str] = None

class DepartureItineraryResponse(DepartureItineraryCreate):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

# Complete Package with Relations
class PackageComplete(BaseModel):
    package: PackageCreate
    categories: Optional[List[int]] = []
    destinations: Optional[List[Dict[str, Any]]] = []
    itinerary: Optional[List[Dict[str, Any]]] = []
    departures: Optional[List[PackageDepartureCreate]] = []

class CityCreate(BaseModel):
    city_name: str
    state: Optional[str] = None
    country: str
    is_departure_city: bool = True

class CityResponse(CityCreate):
    city_id: int
    created_at: datetime
    updated_at: Optional[datetime]
"""
API Request Examples

This file contains Python examples for making requests to the API endpoints.
You can use these as reference or run them directly for testing.
"""

import requests
import json

# Base URL of your API
BASE_URL = "http://localhost:8000"

# Example 1: Create a Category
def create_category_example():
    url = f"{BASE_URL}/api/categories/"

    categories = [
        {
            "category_name": "Group Tours",
            "description": "Tours designed for groups of travelers",
            "icon_class": "fas fa-users",
            "display_order": 1,
            "is_active": True
        },
        {
            "category_name": "Personal Tours",
            "description": "Customized tours for individuals",
            "icon_class": "fas fa-user",
            "display_order": 2,
            "is_active": True
        },
        {
            "category_name": "Customised Tours",
            "description": "Fully customizable tour packages",
            "icon_class": "fas fa-cog",
            "display_order": 3,
            "is_active": True
        }
    ]

    for category in categories:
        response = requests.post(url, json=category)
        print(f"Created category: {response.json()}")

# Example 2: Create a Destination
def create_destination_example():
    url = f"{BASE_URL}/api/destinations/"

    destinations = [
        {
            "destination_name": "Himalayan Mountains",
            "country": "Nepal",
            "description": "Majestic mountain range with stunning views",
            "image_url": "https://example.com/himalayas.jpg",
            "is_popular": True
        },
        {
            "destination_name": "Kathmandu Valley",
            "country": "Nepal",
            "description": "Historic valley with ancient temples",
            "image_url": "https://example.com/kathmandu.jpg",
            "is_popular": True
        }
    ]

    for destination in destinations:
        response = requests.post(url, json=destination)
        print(f"Created destination: {response.json()}")

# Example 3: Create a Simple Package
def create_simple_package_example():
    url = f"{BASE_URL}/api/packages/"

    package = {
        "package_name": "Amazing Himalayan Trek",
        "description": "Experience the breathtaking views of the Himalayas on this 7-day adventure trek through mountain passes and villages.",
        "short_description": "7-day trek through the Himalayas",
        "duration_days": 7,
        "duration_nights": 6,
        "accommodation": "Mountain lodges and camping",
        "meals": "Breakfast, Lunch, Dinner included",
        "activities": "Trekking, Mountain climbing, Photography, Local culture experience",
        "base_price": 1500.00,
        "discount_percent": 10.0,
        "final_price": 1350.00,
        "max_capacity": 15,
        "current_bookings": 0,
        "availability_status": "available",
        "featured": True,
        "difficulty_level": "moderate",
        "start_location": "Kathmandu",
        "end_location": "Kathmandu",
        "included_services": "Professional guide, Transportation, Accommodation, All meals, Trekking permits, First aid kit",
        "excluded_services": "International flights, Travel insurance, Personal expenses, Tips",
        "terms_conditions": "Full payment required 30 days before departure. Minimum 6 participants required.",
        "cancellation_policy": "Free cancellation up to 7 days before departure. 50% refund for cancellations within 7 days."
    }

    response = requests.post(url, json=package)
    print(f"Created package: {response.json()}")

# Example 4: Create a Complete Package with Everything
def create_complete_package_example():
    url = f"{BASE_URL}/api/packages/complete"

    complete_package = {
        "package": {
            "package_name": "Everest Base Camp Trek",
            "description": "Trek to the base camp of the world's highest mountain. An unforgettable journey through Sherpa villages and Buddhist monasteries.",
            "short_description": "12-day trek to Everest Base Camp",
            "duration_days": 12,
            "duration_nights": 11,
            "accommodation": "Tea houses and lodges",
            "meals": "All meals included",
            "activities": "High altitude trekking, Cultural immersion, Photography, Mountain viewing",
            "base_price": 2500.00,
            "discount_percent": 15.0,
            "final_price": 2125.00,
            "max_capacity": 12,
            "current_bookings": 0,
            "availability_status": "available",
            "featured": True,
            "difficulty_level": "difficult",
            "start_location": "Kathmandu",
            "end_location": "Kathmandu",
            "included_services": "Experienced guide, Porter service, All accommodation, All meals, Permits, Domestic flights",
            "excluded_services": "International flights, Travel insurance, Personal gear, Tips for guide and porter",
            "terms_conditions": "Good physical fitness required. Medical check-up recommended.",
            "cancellation_policy": "Free cancellation up to 14 days before. 30% refund within 14 days."
        },
        "categories": [1],  # Group Tours
        "destinations": [
            {"destination_id": 1, "is_primary": True, "days_spent": 10},
            {"destination_id": 2, "is_primary": False, "days_spent": 2}
        ],
        "itinerary": [
            {
                "package_id": 1,  # Will be replaced with actual ID
                "day_number": 1,
                "title": "Arrival in Kathmandu",
                "description": "Arrive at Tribhuvan International Airport. Transfer to hotel. Evening briefing about the trek.",
                "accommodation": "3-star hotel in Thamel",
                "meals": "Dinner",
                "activities": "Hotel check-in, Trek briefing, Equipment check"
            },
            {
                "package_id": 1,
                "day_number": 2,
                "title": "Fly to Lukla and Trek to Phakding",
                "description": "Early morning flight to Lukla. Begin trek to Phakding through pine forests.",
                "accommodation": "Tea house",
                "meals": "Breakfast, Lunch, Dinner",
                "activities": "Scenic flight, Trekking 3-4 hours, Village exploration"
            },
            {
                "package_id": 1,
                "day_number": 3,
                "title": "Phakding to Namche Bazaar",
                "description": "Trek to Namche Bazaar, the gateway to Everest. Cross suspension bridges over Dudh Koshi River.",
                "accommodation": "Tea house",
                "meals": "Breakfast, Lunch, Dinner",
                "activities": "Trekking 5-6 hours, First views of Everest"
            }
        ]
    }

    response = requests.post(url, json=complete_package)
    print(f"Created complete package: {response.json()}")

# Example 5: Create an Inquiry
def create_inquiry_example():
    url = f"{BASE_URL}/api/inquiries/"

    inquiry = {
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "subject": "Inquiry about Himalayan Trek",
        "message": "I would like more information about the 7-day Himalayan trek. Is this suitable for beginners? What's the best season to go?",
        "package_id": 1,
        "status": "pending"
    }

    response = requests.post(url, json=inquiry)
    print(f"Created inquiry: {response.json()}")

# Example 6: Update Package Availability
def update_package_availability_example():
    package_id = 1
    url = f"{BASE_URL}/api/packages/{package_id}/availability"

    params = {"availability_status": "sold_out"}

    response = requests.patch(url, params=params)
    print(f"Updated availability: {response.json()}")

# Example 7: Link Package to Category
def link_package_category_example():
    package_id = 1
    category_id = 2
    url = f"{BASE_URL}/api/packages/{package_id}/categories"

    params = {"category_id": category_id}

    response = requests.post(url, params=params)
    print(f"Linked package to category: {response.json()}")

# Example 8: Bulk Create Itinerary
def bulk_create_itinerary_example():
    url = f"{BASE_URL}/api/itinerary/bulk"

    itinerary_items = [
        {
            "package_id": 2,
            "day_number": 1,
            "title": "Day 1: Arrival",
            "description": "Arrive and settle in",
            "accommodation": "Hotel",
            "meals": "Dinner",
            "activities": "City tour"
        },
        {
            "package_id": 2,
            "day_number": 2,
            "title": "Day 2: Exploration",
            "description": "Explore local attractions",
            "accommodation": "Hotel",
            "meals": "Breakfast, Lunch, Dinner",
            "activities": "Sightseeing, Shopping"
        },
        {
            "package_id": 2,
            "day_number": 3,
            "title": "Day 3: Adventure",
            "description": "Adventure activities",
            "accommodation": "Camp",
            "meals": "Breakfast, Lunch, Dinner",
            "activities": "Hiking, Camping"
        }
    ]

    response = requests.post(url, json=itinerary_items)
    print(f"Created itinerary items: {response.json()}")

# Run all examples
if __name__ == "__main__":
    print("=" * 50)
    print("API Request Examples")
    print("=" * 50)

    # Uncomment the examples you want to run:

    # print("\n1. Creating categories...")
    # create_category_example()

    # print("\n2. Creating destinations...")
    # create_destination_example()

    # print("\n3. Creating a simple package...")
    # create_simple_package_example()

    # print("\n4. Creating a complete package...")
    # create_complete_package_example()

    # print("\n5. Creating an inquiry...")
    # create_inquiry_example()

    # print("\n6. Updating package availability...")
    # update_package_availability_example()

    # print("\n7. Linking package to category...")
    # link_package_category_example()

    # print("\n8. Bulk creating itinerary...")
    # bulk_create_itinerary_example()

    print("\nDone! Uncomment the examples you want to run.")

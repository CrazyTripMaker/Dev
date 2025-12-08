# database.py
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from typing import List, Dict, Any, Optional
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration with schema
DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "database": "CrazyTripMaker",
    "user": "postgres",
    "password": "Darshil@2606",
    "options": f"-c search_path=CMT"  # Set default schema
}

@contextmanager
def get_db_connection():
    """
    Context manager for database connections.
    Automatically handles connection closing and transactions.
    """
    conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        logger.error(f"Database error: {e}")
        raise e
    finally:
        conn.close()

def get_db_cursor(conn):
    """Get a cursor from connection"""
    return conn.cursor()

# ============ PACKAGE OPERATIONS ============

def insert_package(package_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Insert a new package into the database.
    
    Args:
        package_data: Dictionary containing package fields
    
    Returns:
        Dictionary with inserted package ID and timestamps
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            INSERT INTO "CTM".packages (
                package_name, description, short_description,
                duration_days, duration_nights,
                base_price, discount_percent,
                max_capacity, current_bookings,
                availability_status, featured, difficulty_level,
                start_location, end_location, included_services,
                excluded_services, terms_conditions, cancellation_policy
            ) VALUES (
                %(package_name)s, %(description)s, %(short_description)s,
                %(duration_days)s, %(duration_nights)s,
                %(base_price)s, %(discount_percent)s,
                %(max_capacity)s, %(current_bookings)s,
                %(availability_status)s, %(featured)s, %(difficulty_level)s,
                %(start_location)s, %(end_location)s, %(included_services)s,
                %(excluded_services)s, %(terms_conditions)s, %(cancellation_policy)s
            )
            RETURNING package_id, created_at
        """
        
        cursor.execute(query, package_data)
        result = cursor.fetchone()
        logger.info(f"Package inserted with ID: {result['package_id']}")
        return dict(result)

def update_package(package_id: int, package_data: Dict[str, Any]) -> bool:
    """
    Update an existing package.
    
    Args:
        package_id: ID of the package to update
        package_data: Dictionary containing updated fields
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        # Build dynamic update query
        update_fields = []
        params = {}
        
        for field, value in package_data.items():
            if value is not None:  # Only update fields that are provided
                update_fields.append(f"{field} = %({field})s")
                params[field] = value
        
        if not update_fields:
            return False
        
        params['package_id'] = package_id
        query = f"""
            UPDATE packages 
            SET {', '.join(update_fields)}, updated_at = CURRENT_TIMESTAMP
            WHERE package_id = %(package_id)s
            RETURNING package_id
        """
        
        cursor.execute(query, params)
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Package {package_id} updated successfully")
            return True
        return False

def delete_package(package_id: int) -> bool:
    """
    Delete a package and all related data.
    Uses CASCADE delete for relationships.
    
    Args:
        package_id: ID of the package to delete
    
    Returns:
        True if deletion successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        # Check if package exists
        cursor.execute("SELECT package_id FROM packages WHERE package_id = %s", (package_id,))
        if not cursor.fetchone():
            return False
        
        # Delete package (cascade will handle related records)
        cursor.execute("DELETE FROM packages WHERE package_id = %s", (package_id,))
        logger.info(f"Package {package_id} deleted successfully")
        return True

def update_package_status(package_id: int, availability_status: str) -> bool:
    """
    Update package availability status.
    
    Args:
        package_id: Package ID
        availability_status: New status
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            UPDATE packages 
            SET availability_status = %s, updated_at = CURRENT_TIMESTAMP
            WHERE package_id = %s
            RETURNING package_id
        """
        
        cursor.execute(query, (availability_status, package_id))
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Package {package_id} status updated to {availability_status}")
            return True
        return False

def update_package_featured(package_id: int, featured: bool) -> bool:
    """
    Update package featured status.
    
    Args:
        package_id: Package ID
        featured: New featured status
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            UPDATE packages 
            SET featured = %s, updated_at = CURRENT_TIMESTAMP
            WHERE package_id = %s
            RETURNING package_id
        """
        
        cursor.execute(query, (featured, package_id))
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Package {package_id} featured status updated to {featured}")
            return True
        return False

# ============ COMPLETE PACKAGE OPERATIONS ============

def insert_complete_package(
    package_data: Dict[str, Any],
    categories: List[int],
    destinations: List[Dict[str, Any]],
    itinerary: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Insert a complete package with all related data in a single transaction.
    
    Args:
        package_data: Package details
        categories: List of category IDs
        destinations: List of destination associations
        itinerary: List of itinerary items
    
    Returns:
        Dictionary with package ID and status
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        try:
            # 1. Insert package
            package_query = """
                INSERT INTO "CTM".packages (
                    package_name, description, short_description,
                    duration_days, duration_nights
                    base_price, discount_percent,
                    max_capacity, current_bookings,
                    availability_status, featured, difficulty_level,
                    start_location, end_location, included_services,
                    excluded_services, terms_conditions, cancellation_policy
                ) VALUES (
                    %(package_name)s, %(description)s, %(short_description)s,
                    %(duration_days)s, %(duration_nights)s,
                    %(base_price)s, %(discount_percent)s,
                    %(max_capacity)s, %(current_bookings)s,
                    %(availability_status)s, %(featured)s, %(difficulty_level)s,
                    %(start_location)s, %(end_location)s, %(included_services)s,
                    %(excluded_services)s, %(terms_conditions)s, %(cancellation_policy)s
                )
                RETURNING package_id
            """
            
            cursor.execute(package_query, package_data)
            package_id = cursor.fetchone()['package_id']
            logger.info(f"Package inserted with ID: {package_id}")

            # 2. Insert category associations
            if categories:
                category_values = [(package_id, cat_id) for cat_id in categories]
                cursor.executemany(
                    "INSERT INTO CTM.package_categories (package_id, category_id) VALUES (%s, %s)",
                    category_values
                )
                logger.info(f"Linked {len(categories)} categories to package {package_id}")

            # 3. Insert destination associations
            if destinations:
                for dest in destinations:
                    cursor.execute(
                        """
                        INSERT INTO "CTM".package_destinations
                        (package_id, destination_id, is_primary, days_spent)
                        VALUES (%s, %s, %s, %s)
                        """,
                        (package_id, dest['destination_id'], 
                         dest.get('is_primary', False), 
                         dest.get('days_spent'))
                    )
                logger.info(f"Linked {len(destinations)} destinations to package {package_id}")

            # 4. Insert itinerary items
            if itinerary:
                for item in itinerary:
                    cursor.execute(
                        """
                        INSERT INTO "CTM".itinerary
                        (package_id, day_number, title, description, 
                         accommodation, meals, activities)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        """,
                        (package_id, item['day_number'], item['title'], 
                         item.get('description'), item.get('accommodation'),
                         item.get('meals'), item.get('activities'))
                    )
                logger.info(f"Added {len(itinerary)} itinerary items to package {package_id}")

            return {
                "package_id": package_id,
                "status": "success",
                "categories_linked": len(categories),
                "destinations_linked": len(destinations),
                "itinerary_items": len(itinerary)
            }

        except Exception as e:
            logger.error(f"Failed to insert complete package: {e}")
            raise

def link_package_category(package_id: int, category_id: int) -> bool:
    """
    Link a package to a category.
    
    Args:
        package_id: Package ID
        category_id: Category ID
    
    Returns:
        True if link successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        try:
            cursor.execute(
                "INSERT INTO CTM.package_categories (package_id, category_id) VALUES (%s, %s)",
                (package_id, category_id)
            )
            logger.info(f"Linked package {package_id} to category {category_id}")
            return True
        except psycopg2.IntegrityError:
            # Link already exists or foreign key violation
            return False

def link_package_destination(
    package_id: int, 
    destination_id: int, 
    is_primary: bool = False, 
    days_spent: Optional[int] = None
) -> bool:
    """
    Link a package to a destination.
    
    Args:
        package_id: Package ID
        destination_id: Destination ID
        is_primary: Whether this is primary destination
        days_spent: Number of days spent at destination
    
    Returns:
        True if link successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        try:
            cursor.execute(
                """
                INSERT INTO "CTM".package_destinations
                (package_id, destination_id, is_primary, days_spent)
                VALUES (%s, %s, %s, %s)
                """,
                (package_id, destination_id, is_primary, days_spent)
            )
            logger.info(f"Linked package {package_id} to destination {destination_id}")
            return True
        except psycopg2.IntegrityError:
            # Link already exists or foreign key violation
            return False

# ============ CATEGORY OPERATIONS ============

def insert_category(category_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Insert a new category.
    
    Args:
        category_data: Category details
    
    Returns:
        Dictionary with category ID
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            INSERT INTO "CTM".categories 
            (category_name, description, icon_class, display_order, is_active, parent_category_id)
            VALUES (%(category_name)s, %(description)s, %(icon_class)s, 
                    %(display_order)s, %(is_active)s, %(parent_category_id)s)
            RETURNING category_id
        """
        
        cursor.execute(query, category_data)
        result = cursor.fetchone()
        logger.info(f"Category inserted with ID: {result['category_id']}")
        return dict(result)

def insert_categories_bulk(categories_list: List[Dict[str, Any]]) -> int:
    """
    Insert multiple categories at once.
    
    Args:
        categories_list: List of category dictionaries
    
    Returns:
        Number of categories inserted
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        inserted_count = 0
        for category in categories_list:
            try:
                cursor.execute(
                    """
                    INSERT INTO "CTM".categories 
                    (category_name, description, icon_class, display_order, is_active)
                    VALUES (%(category_name)s, %(description)s, %(icon_class)s, 
                            %(display_order)s, %(is_active)s)
                    """,
                    category
                )
                inserted_count += 1
            except Exception as e:
                logger.warning(f"Failed to insert category {category.get('category_name')}: {e}")
                continue
        
        logger.info(f"Bulk inserted {inserted_count} categories")
        return inserted_count

def update_category(category_id: int, category_data: Dict[str, Any]) -> bool:
    """
    Update a category.
    
    Args:
        category_id: Category ID
        category_data: Updated category details
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        update_fields = []
        params = {}
        
        for field, value in category_data.items():
            if value is not None:
                update_fields.append(f"{field} = %({field})s")
                params[field] = value
        
        if not update_fields:
            return False
        
        params['category_id'] = category_id
        query = f"""
            UPDATE categories 
            SET {', '.join(update_fields)}
            WHERE category_id = %(category_id)s
            RETURNING category_id
        """
        
        cursor.execute(query, params)
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Category {category_id} updated successfully")
            return True
        return False

def delete_category(category_id: int) -> bool:
    """
    Delete a category.
    
    Args:
        category_id: Category ID
    
    Returns:
        True if deletion successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        # Check if category exists
        cursor.execute("SELECT category_id FROM categories WHERE category_id = %s", (category_id,))
        if not cursor.fetchone():
            return False
        
        # Delete category
        cursor.execute("DELETE FROM categories WHERE category_id = %s", (category_id,))
        logger.info(f"Category {category_id} deleted successfully")
        return True

def update_category_status(category_id: int, is_active: bool) -> bool:
    """
    Update category active status.
    
    Args:
        category_id: Category ID
        is_active: New active status
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            UPDATE categories 
            SET is_active = %s
            WHERE category_id = %s
            RETURNING category_id
        """
        
        cursor.execute(query, (is_active, category_id))
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Category {category_id} active status updated to {is_active}")
            return True
        return False

def update_category_display_order(category_id: int, display_order: int) -> bool:
    """
    Update category display order.
    
    Args:
        category_id: Category ID
        display_order: New display order
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            UPDATE categories 
            SET display_order = %s
            WHERE category_id = %s
            RETURNING category_id
        """
        
        cursor.execute(query, (display_order, category_id))
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Category {category_id} display order updated to {display_order}")
            return True
        return False

# ============ DESTINATION OPERATIONS ============

def insert_destination(destination_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Insert a new destination.
    
    Args:
        destination_data: Destination details
    
    Returns:
        Dictionary with destination ID
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            INSERT INTO "CTM".destinations 
            (destination_name, country, description, image_url, is_popular)
            VALUES (%(destination_name)s, %(country)s, %(description)s, 
                    %(image_url)s, %(is_popular)s)
            RETURNING destination_id, created_at
        """
        
        cursor.execute(query, destination_data)
        result = cursor.fetchone()
        logger.info(f"Destination inserted with ID: {result['destination_id']}")
        return dict(result)

def insert_destinations_bulk(destinations_list: List[Dict[str, Any]]) -> int:
    """
    Insert multiple destinations at once.
    
    Args:
        destinations_list: List of destination dictionaries
    
    Returns:
        Number of destinations inserted
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        inserted_count = 0
        for destination in destinations_list:
            try:
                cursor.execute(
                    """
                    INSERT INTO "CTM".destinations 
                    (destination_name, country, description, image_url, is_popular)
                    VALUES (%(destination_name)s, %(country)s, %(description)s, 
                            %(image_url)s, %(is_popular)s)
                    """,
                    destination
                )
                inserted_count += 1
            except Exception as e:
                logger.warning(f"Failed to insert destination {destination.get('destination_name')}: {e}")
                continue
        
        logger.info(f"Bulk inserted {inserted_count} destinations")
        return inserted_count

def update_destination(destination_id: int, destination_data: Dict[str, Any]) -> bool:
    """
    Update a destination.
    
    Args:
        destination_id: Destination ID
        destination_data: Updated destination details
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        update_fields = []
        params = {}
        
        for field, value in destination_data.items():
            if value is not None:
                update_fields.append(f"{field} = %({field})s")
                params[field] = value
        
        if not update_fields:
            return False
        
        params['destination_id'] = destination_id
        query = f"""
            UPDATE destinations 
            SET {', '.join(update_fields)}
            WHERE destination_id = %(destination_id)s
            RETURNING destination_id
        """
        
        cursor.execute(query, params)
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Destination {destination_id} updated successfully")
            return True
        return False

def delete_destination(destination_id: int) -> bool:
    """
    Delete a destination.
    
    Args:
        destination_id: Destination ID
    
    Returns:
        True if deletion successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        # Check if destination exists
        cursor.execute("SELECT destination_id FROM destinations WHERE destination_id = %s", (destination_id,))
        if not cursor.fetchone():
            return False
        
        # Delete destination
        cursor.execute("DELETE FROM destinations WHERE destination_id = %s", (destination_id,))
        logger.info(f"Destination {destination_id} deleted successfully")
        return True

def update_destination_popular(destination_id: int, is_popular: bool) -> bool:
    """
    Update destination popular status.
    
    Args:
        destination_id: Destination ID
        is_popular: New popular status
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            UPDATE destinations 
            SET is_popular = %s
            WHERE destination_id = %s
            RETURNING destination_id
        """
        
        cursor.execute(query, (is_popular, destination_id))
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Destination {destination_id} popular status updated to {is_popular}")
            return True
        return False

# ============ INQUIRY OPERATIONS ============

def insert_inquiry(inquiry_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Insert a new inquiry.
    
    Args:
        inquiry_data: Inquiry details
    
    Returns:
        Dictionary with inquiry ID
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            INSERT INTO "CTM".inquiries 
            (full_name, email, phone, subject, message, package_id, status)
            VALUES (%(full_name)s, %(email)s, %(phone)s, %(subject)s, 
                    %(message)s, %(package_id)s, %(status)s)
            RETURNING inquiry_id, created_at
        """
        
        cursor.execute(query, inquiry_data)
        result = cursor.fetchone()
        logger.info(f"Inquiry inserted with ID: {result['inquiry_id']}")
        return dict(result)

def update_inquiry_status(inquiry_id: int, status: str) -> bool:
    """
    Update inquiry status.
    
    Args:
        inquiry_id: Inquiry ID
        status: New status
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            UPDATE inquiries 
            SET status = %s, updated_at = CURRENT_TIMESTAMP
            WHERE inquiry_id = %s
            RETURNING inquiry_id
        """
        
        cursor.execute(query, (status, inquiry_id))
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Inquiry {inquiry_id} status updated to {status}")
            return True
        return False

def reply_to_inquiry(inquiry_id: int, reply_message: str) -> bool:
    """
    Reply to an inquiry.
    
    Args:
        inquiry_id: Inquiry ID
        reply_message: Reply message
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            UPDATE inquiries 
            SET reply_message = %s, replied_at = CURRENT_TIMESTAMP,
                status = 'replied', updated_at = CURRENT_TIMESTAMP
            WHERE inquiry_id = %s
            RETURNING inquiry_id
        """
        
        cursor.execute(query, (reply_message, inquiry_id))
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Reply sent to inquiry {inquiry_id}")
            return True
        return False

def delete_inquiry(inquiry_id: int) -> bool:
    """
    Delete an inquiry.
    
    Args:
        inquiry_id: Inquiry ID
    
    Returns:
        True if deletion successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        # Check if inquiry exists
        cursor.execute("SELECT inquiry_id FROM inquiries WHERE inquiry_id = %s", (inquiry_id,))
        if not cursor.fetchone():
            return False
        
        # Delete inquiry
        cursor.execute("DELETE FROM inquiries WHERE inquiry_id = %s", (inquiry_id,))
        logger.info(f"Inquiry {inquiry_id} deleted successfully")
        return True

# ============ ITINERARY OPERATIONS ============

def insert_itinerary_item(itinerary_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Insert a single itinerary item.
    
    Args:
        itinerary_data: Itinerary item details
    
    Returns:
        Dictionary with itinerary ID
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        query = """
            INSERT INTO "CTM".itinerary 
            (package_id, day_number, title, description, accommodation, meals, activities)
            VALUES (%(package_id)s, %(day_number)s, %(title)s, %(description)s, 
                    %(accommodation)s, %(meals)s, %(activities)s)
            RETURNING itinerary_id, created_at
        """
        
        cursor.execute(query, itinerary_data)
        result = cursor.fetchone()
        logger.info(f"Itinerary item inserted with ID: {result['itinerary_id']}")
        return dict(result)

def insert_itinerary_bulk(itinerary_list: List[Dict[str, Any]]) -> int:
    """
    Insert multiple itinerary items at once.
    
    Args:
        itinerary_list: List of itinerary item dictionaries
    
    Returns:
        Number of items inserted
    """
    if not itinerary_list:
        return 0
    
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        inserted_count = 0
        for item in itinerary_list:
            try:
                cursor.execute(
                    """
                    INSERT INTO "CTM".itinerary 
                    (package_id, day_number, title, description, accommodation, meals, activities)
                    VALUES (%(package_id)s, %(day_number)s, %(title)s, %(description)s, 
                            %(accommodation)s, %(meals)s, %(activities)s)
                    """,
                    item
                )
                inserted_count += 1
            except Exception as e:
                logger.warning(f"Failed to insert itinerary item: {e}")
                continue
        
        logger.info(f"Bulk inserted {inserted_count} itinerary items")
        return inserted_count

def update_itinerary_item(itinerary_id: int, itinerary_data: Dict[str, Any]) -> bool:
    """
    Update an itinerary item.
    
    Args:
        itinerary_id: Itinerary item ID
        itinerary_data: Updated itinerary details
    
    Returns:
        True if update successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        update_fields = []
        params = {}
        
        for field, value in itinerary_data.items():
            if value is not None:
                update_fields.append(f"{field} = %({field})s")
                params[field] = value
        
        if not update_fields:
            return False
        
        params['itinerary_id'] = itinerary_id
        query = f"""
            UPDATE itinerary 
            SET {', '.join(update_fields)}, updated_at = CURRENT_TIMESTAMP
            WHERE itinerary_id = %(itinerary_id)s
            RETURNING itinerary_id
        """
        
        cursor.execute(query, params)
        result = cursor.fetchone()
        
        if result:
            logger.info(f"Itinerary item {itinerary_id} updated successfully")
            return True
        return False

def delete_itinerary_item(itinerary_id: int) -> bool:
    """
    Delete a single itinerary item.
    
    Args:
        itinerary_id: Itinerary item ID
    
    Returns:
        True if deletion successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        # Check if item exists
        cursor.execute("SELECT itinerary_id FROM itinerary WHERE itinerary_id = %s", (itinerary_id,))
        if not cursor.fetchone():
            return False
        
        # Delete item
        cursor.execute("DELETE FROM itinerary WHERE itinerary_id = %s", (itinerary_id,))
        logger.info(f"Itinerary item {itinerary_id} deleted successfully")
        return True

def delete_package_itinerary(package_id: int) -> bool:
    """
    Delete all itinerary items for a package.
    
    Args:
        package_id: Package ID
    
    Returns:
        True if deletion successful
    """
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        # Check if package exists
        cursor.execute("SELECT package_id FROM packages WHERE package_id = %s", (package_id,))
        if not cursor.fetchone():
            return False
        
        # Delete all itinerary items for this package
        cursor.execute("DELETE FROM itinerary WHERE package_id = %s", (package_id,))
        deleted_count = cursor.rowcount
        logger.info(f"Deleted {deleted_count} itinerary items for package {package_id}")
        return deleted_count > 0

# ============ HELPER FUNCTIONS ============

def check_connection() -> bool:
    """
    Check database connection.
    
    Returns:
        True if connection successful
    """
    try:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            return result is not None
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        return False

def get_table_counts() -> Dict[str, int]:
    """
    Get row counts for all tables.
    
    Returns:
        Dictionary with table names and counts
    """
    tables = ['packages', 'categories', 'destinations', 'inquiries', 'itinerary',
              'package_categories', 'package_destinations']
    
    counts = {}
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        for table in tables:
            try:
                cursor.execute(f"SELECT COUNT(*) FROM {table}")
                result = cursor.fetchone()
                counts[table] = result['count']
            except:
                counts[table] = 0
    
    return counts
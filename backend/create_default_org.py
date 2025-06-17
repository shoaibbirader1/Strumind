#!/usr/bin/env python3
"""
Create a default organization and assign users to it
"""

import uuid
from sqlalchemy.orm import Session
from db.database import get_db, engine
from db.models.user import User, Organization, OrganizationMember, UserRole

def create_default_organization():
    """Create a default organization and assign all users to it"""
    db = next(get_db())
    
    # Check if default organization exists
    default_org = db.query(Organization).filter(Organization.slug == "default").first()
    
    if not default_org:
        # Create default organization
        default_org = Organization(
            id=str(uuid.uuid4()),
            name="Default Organization",
            slug="default",
            description="Default organization for demo users"
        )
        db.add(default_org)
        db.commit()
        db.refresh(default_org)
        print(f"Created default organization: {default_org.id}")
    else:
        print(f"Default organization already exists: {default_org.id}")
    
    # Get all users without organization memberships
    users_without_org = db.query(User).filter(~User.organization_memberships.any()).all()
    
    for user in users_without_org:
        # Create organization membership
        membership = OrganizationMember(
            id=str(uuid.uuid4()),
            user_id=str(user.id),
            organization_id=str(default_org.id),
            role=UserRole.ADMIN
        )
        db.add(membership)
        print(f"Added user {user.email} to default organization")
    
    db.commit()
    print("Default organization setup complete")

if __name__ == "__main__":
    create_default_organization()
from database import SessionLocal
from app.models.user import User
from app.core.security import hash_password


def create_admin():
    db = SessionLocal() #Connects to PostgreSQL

    try:
        # Check if admin already exists
        existing_admin = (
            db.query(User)
            .filter(User.email == "admin@cardealer.com")
            .first()
        )

        if existing_admin:
            print("✅ Admin already exists!")
            return

        # Create admin user
        admin = User(
            first_name="Admin",
            last_name="User",
            email="admin@cardealer.com",
            password_hash=hash_password("Admin@123"),
            role="admin",
            is_active=True,
        )

        db.add(admin)
        db.commit()

        print("🎉 Admin created successfully!")
        print("Email    : admin@cardealer.com")
        print("Password : Admin@123")

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
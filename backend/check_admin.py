from database import SessionLocal
from app.models.user import User

db = SessionLocal()

admin = db.query(User).filter(User.email == "admin@cardealer.com").first()

if admin:
    print("ID:", admin.id)
    print("Email:", admin.email)
    print("Role:", admin.role)
    print("Active:", admin.is_active)
    print("Password Hash:", admin.password_hash)
else:
    print("Admin not found")

db.close()
from database import SessionLocal
from app.models.user import User
from app.core.security import verify_password

db = SessionLocal()

admin = db.query(User).filter(User.email == "admin@cardealer.com").first()

if admin:
    print("Password Valid:", verify_password("Admin@123", admin.password_hash))
else:
    print("Admin not found")

db.close()
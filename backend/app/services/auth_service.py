from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserRegister, UserLogin
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


class AuthService:

    @staticmethod
    def register_user(db: Session, user_data: UserRegister):

        # Check if email already exists
        existing_user = UserRepository.get_user_by_email(
            db,
            user_data.email
        )

        if existing_user:
            raise ValueError("Email already registered")

        # Check password confirmation
        if user_data.password != user_data.confirm_password:
            raise ValueError("Passwords do not match")

        # Create User object
        user = User(
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            email=user_data.email,
            password_hash=hash_password(user_data.password),
            role="customer",
        )

        return UserRepository.create_user(db, user)

    @staticmethod
    def login_user(db: Session, login_data: UserLogin):

        user = UserRepository.get_user_by_email(
            db,
            login_data.email
        )

        if not user:
            raise ValueError("Invalid email or password")

        if not verify_password(
            login_data.password,
            user.password_hash
        ):
            raise ValueError("Invalid email or password")

        token = create_access_token(
            {
                "sub": str(user.id),
                "role": user.role,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
        }
from fastapi import Depends, HTTPException, status # it is FastAPI's dependency injection system
from fastapi.security import OAuth2PasswordBearer # Read the Bearer token from the Authorization header.
from sqlalchemy.orm import Session

from database import get_db # This gives us a database session
from app.core.security import verify_token
from app.models.user import User # We'll use it to find the user by ID after decoding the JWT
from app.repositories.user_repository import UserRepository

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    Get the currently authenticated user.
    """

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )

    user = UserRepository.get_user_by_id(
        db,
        int(user_id)
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user

def get_current_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Allow access only to admin users.
    """

    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can perform this action."
        )

    return current_user
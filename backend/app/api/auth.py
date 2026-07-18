from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from app.schemas.user import (
    UserRegister,
    UserLogin,
    UserResponse,
    LoginResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==========================
# Register
# ==========================
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    try:

        return AuthService.register_user(
            db,
            user_data
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# ==========================
# Login
# ==========================
@router.post(
    "/login",
    response_model=LoginResponse
)
def login(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    try:

        return AuthService.login_user(
            db,
            login_data
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
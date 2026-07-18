from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from app.dependencies.auth import get_current_admin
from app.schemas.car import (
    CarCreate,
    CarUpdate,
    CarResponse,
    RestockRequest,
)
from app.services.car_service import CarService

router = APIRouter(
    prefix="/cars",
    tags=["Cars"]
)

# Create car endpoint
@router.post(
    "/",
    response_model=CarResponse,
    status_code=status.HTTP_201_CREATED
)
def create_car(
    car_data: CarCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    try:
        return CarService.create_car(db, car_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

# All Cars endpoint
@router.get(
    "/",
    response_model=list[CarResponse]
)
def get_all_cars(
    db: Session = Depends(get_db)
):
    return CarService.get_all_cars(db)

# Car By ID endpoint
@router.get(
    "/{car_id}",
    response_model=CarResponse
)
def get_car_by_id(
    car_id: int,
    db: Session = Depends(get_db)
):
    try:
        return CarService.get_car_by_id(db, car_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

#  Update car endpoint
@router.put(
    "/{car_id}",
    response_model=CarResponse
)
def update_car(
    car_id: int,
    car_data: CarUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    try:
        return CarService.update_car(
            db,
            car_id,
            car_data
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
# Purchase car endpoint
@router.post(
    "/{car_id}/purchase",
    response_model=CarResponse
)
def purchase_car(
    car_id: int,
    db: Session = Depends(get_db)
):
    try:
        return CarService.purchase_car(
            db,
            car_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

# Restock car endpoint
@router.patch(
    "/{car_id}/restock",
    response_model=CarResponse
)
def restock_car(
    car_id: int,
    restock_data: RestockRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    try:
        return CarService.restock_car(
            db,
            car_id,
            restock_data
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

# Delete car endpoint
@router.delete("/{car_id}")
def delete_car(
    car_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    try:
        return CarService.delete_car(
            db,
            car_id
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
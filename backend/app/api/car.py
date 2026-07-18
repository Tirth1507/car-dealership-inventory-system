from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from app.dependencies.auth import get_current_admin
from app.schemas.car import (
    CarCreate,
    CarUpdate,
    CarResponse,
)
from app.services.car_service import CarService

router = APIRouter(
    prefix="/cars",
    tags=["Cars"]
)


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


@router.get(
    "/",
    response_model=list[CarResponse]
)
def get_all_cars(
    db: Session = Depends(get_db)
):
    return CarService.get_all_cars(db)


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
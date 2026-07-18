from sqlalchemy.orm import Session

from app.models.car import Car
from app.repositories.car_repository import CarRepository
from app.schemas.car import (
    CarCreate,
    CarUpdate,
    RestockRequest,
)

class CarService:

    @staticmethod
    def create_car(db: Session, car_data: CarCreate):

        status = (
            "Available"
            if car_data.quantity > 0
            else "Out of Stock"
        )

        car = Car(
            make=car_data.make,
            model=car_data.model,
            category=car_data.category,
            year=car_data.year,
            price=car_data.price,
            color=car_data.color,
            fuel_type=car_data.fuel_type,
            transmission=car_data.transmission,
            mileage=car_data.mileage,
            quantity=car_data.quantity,
            status=status,
        )
        return CarRepository.create_car(db, car)

    @staticmethod
    def get_all_cars(db: Session):
        return CarRepository.get_all_cars(db)

    @staticmethod
    def get_car_by_id(db: Session, car_id: int):

        car = CarRepository.get_car_by_id(db, car_id)

        if not car:
            raise ValueError("Car not found")

        return car

    @staticmethod
    def update_car(
        db: Session,
        car_id: int,
        car_data: CarUpdate
    ):

        car = CarRepository.get_car_by_id(db, car_id)

        if not car:
            raise ValueError("Car not found")

        update_data = car_data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(car, key, value)

        # Automatically update status when quantity changes
        if "quantity" in update_data:
            car.status = (
                "Available"
                if car.quantity > 0
                else "Out of Stock"
            )

        return CarRepository.update_car(db, car)

    @staticmethod
    def purchase_car(
        db: Session,
        car_id: int
    ):

        car = CarRepository.get_car_by_id(db, car_id)

        if not car:
            raise ValueError("Car not found")

        if car.quantity <= 0:
            raise ValueError("Car is out of stock")

        # Reduce stock
        car.quantity -= 1

        # Update status automatically
        if car.quantity == 0:
            car.status = "Out of Stock"
        else:
            car.status = "Available"

        return CarRepository.update_car(db, car)
    @staticmethod
    def restock_car(
        db: Session,
        car_id: int,
        restock_data: RestockRequest,
    ):

        car = CarRepository.get_car_by_id(db, car_id)

        if not car:
            raise ValueError("Car not found")

        # Increase stock
        car.quantity += restock_data.quantity

        # Car is now available
        car.status = "Available"

        return CarRepository.update_car(db, car)

    @staticmethod
    def delete_car(
        db: Session,
        car_id: int
    ):

        car = CarRepository.get_car_by_id(db, car_id)

        if not car:
            raise ValueError("Car not found")

        CarRepository.delete_car(db, car)

        return {
            "message": "Car deleted successfully"
        }
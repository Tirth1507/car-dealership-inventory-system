from sqlalchemy.orm import Session

from app.models.car import Car
from app.repositories.car_repository import CarRepository
from app.schemas.car import CarCreate, CarUpdate


class CarService:

    @staticmethod
    def create_car(db: Session, car_data: CarCreate):

        car = Car(
            make=car_data.make,
            model=car_data.model,
            year=car_data.year,
            price=car_data.price,
            color=car_data.color,
            fuel_type=car_data.fuel_type,
            transmission=car_data.transmission,
            mileage=car_data.mileage,
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
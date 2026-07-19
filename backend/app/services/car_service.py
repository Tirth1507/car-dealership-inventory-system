import os
import uuid

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.car import Car
from app.repositories.car_repository import CarRepository
from app.schemas.car import RestockRequest

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

class CarService:

    @staticmethod
    def create_car(
        db: Session,
        make: str,
        model: str,
        category: str,
        year: int,
        price: float,
        color: str,
        fuel_type: str,
        transmission: str,
        mileage: int,
        quantity: int,
        image: UploadFile | None = None,
    ):

        filename = None

        if image and image.filename:

            extension = image.filename.split(".")[-1]

            filename = f"{uuid.uuid4()}.{extension}"

            filepath = os.path.join(
                UPLOAD_DIR,
                filename
            )

            with open(filepath, "wb") as buffer:
                buffer.write(image.file.read())

        status = (
            "Available"
            if quantity > 0
            else "Out of Stock"
        )

        car = Car(
            make=make,
            model=model,
            category=category,
            year=year,
            price=price,
            color=color,
            fuel_type=fuel_type,
            transmission=transmission,
            mileage=mileage,
            quantity=quantity,
            status=status,
            image_url=filename,
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
        make: str,
        model: str,
        category: str,
        year: int,
        price: float,
        color: str,
        fuel_type: str,
        transmission: str,
        mileage: int,
        quantity: int,
        image: UploadFile | None = None,
    ):

        car = CarRepository.get_car_by_id(db, car_id)

        if not car:
            raise ValueError("Car not found")

        car.make = make
        car.model = model
        car.category = category
        car.year = year
        car.price = price
        car.color = color
        car.fuel_type = fuel_type
        car.transmission = transmission
        car.mileage = mileage
        car.quantity = quantity

        car.status = (
            "Available"
            if quantity > 0
            else "Out of Stock"
        )

        if image and image.filename:

            # Delete previous image (optional but recommended)
            if car.image_url:

                old_path = os.path.join(
                    UPLOAD_DIR,
                    car.image_url
                )

                if os.path.exists(old_path):
                    os.remove(old_path)

            extension = image.filename.split(".")[-1]

            filename = f"{uuid.uuid4()}.{extension}"

            filepath = os.path.join(
                UPLOAD_DIR,
                filename
            )

            with open(filepath, "wb") as buffer:
                buffer.write(image.file.read())

            car.image_url = filename

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
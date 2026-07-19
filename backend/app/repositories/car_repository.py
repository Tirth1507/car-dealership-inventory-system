from sqlalchemy.orm import Session

from app.models.car import Car


class CarRepository:

    @staticmethod
    def create_car(db: Session, car: Car):
        db.add(car)
        db.commit()
        db.refresh(car)
        return car

    @staticmethod
    def get_all_cars(db: Session):
        return (
            db.query(Car)
            .order_by(Car.created_at.desc())
            .all()
        )

    @staticmethod
    def get_car_by_id(db: Session, car_id: int):
        return (
            db.query(Car)
            .filter(Car.id == car_id)
            .first()
        )

    @staticmethod
    def update_car(db: Session, car: Car):
        db.commit()
        db.refresh(car)
        return car

    @staticmethod
    def delete_car(db: Session, car: Car):
        db.delete(car)
        db.commit()
from datetime import datetime, timezone

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
)

from database import Base


class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)

    make = Column(String(100), nullable=False)

    model = Column(String(100), nullable=False)

    category = Column(
        String(50),
        nullable=False
    )

    year = Column(Integer, nullable=False)

    price = Column(Float, nullable=False)
    
    color = Column(String(50), nullable=False)

    fuel_type = Column(String(30), nullable=False)

    transmission = Column(String(30), nullable=False)

    mileage = Column(Integer, nullable=False)

    quantity = Column(
    Integer,
    nullable=False,
    default=1
    )

    status = Column(
        String(20),
        nullable=False,
        default="Available"
    )

    image_url = Column(
        String(255),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )
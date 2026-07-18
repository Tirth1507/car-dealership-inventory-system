from fastapi import FastAPI

from database import Base, engine

from app.models.user import User
from app.models.car import Car

from app.api.auth import router as auth_router
from app.api.car import router as car_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Car Dealership Inventory System API",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(car_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Car Dealership Inventory System API"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
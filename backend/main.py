import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import Base, engine

from app.models.user import User
from app.models.car import Car

from app.api.auth import router as auth_router
from app.api.car import router as car_router


# Create all database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Car Dealership Inventory System API",
    version="1.0.0"
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads folder automatically if it doesn't exist
os.makedirs("uploads", exist_ok=True)

# Serve uploaded images
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# Register API routes
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
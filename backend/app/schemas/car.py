from pydantic import BaseModel, ConfigDict, Field


class CarCreate(BaseModel):
    make: str = Field(..., min_length=2, max_length=100)
    model: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=3, max_length=50)
    year: int = Field(..., ge=1900, le=2100)
    price: float = Field(..., gt=0)
    color: str = Field(..., min_length=2, max_length=50)
    fuel_type: str = Field(..., min_length=3, max_length=30)
    transmission: str = Field(..., min_length=3, max_length=30)
    mileage: int = Field(..., ge=0)
    quantity: int = Field(..., ge=0)

    model_config = ConfigDict(from_attributes=True)


class CarUpdate(BaseModel):
    make: str | None = Field(None, min_length=2, max_length=100)
    model: str | None = Field(None, min_length=1, max_length=100)
    category: str | None = Field(None, min_length=3, max_length=50)
    year: int | None = Field(None, ge=1900, le=2100)
    price: float | None = Field(None, gt=0)
    color: str | None = Field(None, min_length=2, max_length=50)
    fuel_type: str | None = Field(None, min_length=3, max_length=30)
    transmission: str | None = Field(None, min_length=3, max_length=30)
    mileage: int | None = Field(None, ge=0)
    status: str | None = None
    quantity: int | None = Field(None, ge=0)

    model_config = ConfigDict(from_attributes=True)


class CarResponse(BaseModel):
    id: int
    make: str
    model: str
    category: str
    year: int
    price: float
    color: str
    fuel_type: str
    transmission: str
    mileage: int
    status: str
    quantity: int
    image_url: str | None = None

    model_config = ConfigDict(from_attributes=True)

class RestockRequest(BaseModel):
    quantity: int = Field(..., gt=0)

    model_config = ConfigDict(from_attributes=True)


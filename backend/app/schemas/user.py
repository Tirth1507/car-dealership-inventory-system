from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserRegister(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=100) # Required(...)
    last_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr # Pydantic automatically validates the email.
    password: str = Field(..., min_length=8)
    confirm_password: str = Field(..., min_length=8)


class UserLogin(BaseModel): # Used For POST/login
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    role: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

    model_config = ConfigDict(from_attributes=True) # Converts SQLAlchemy user object directly into UserResponse
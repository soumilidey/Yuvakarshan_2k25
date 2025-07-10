from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    city: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    city: str

    class Config:
        orm_mode = True

class RequestType(str, Enum):
    donate = "donate"
    request = "request"

class FoodEntryCreate(BaseModel):
    description: str
    datetime: datetime
    type: RequestType

class FoodEntryOut(BaseModel):
    id: int
    description: str
    datetime: datetime
    type: RequestType
    user: UserOut

    class Config:
        orm_mode = True
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

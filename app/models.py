from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import enum

class RequestType(str, enum.Enum):
    donate = "donate"
    request = "request"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)  
    username = Column(String(50), unique=True)
    email = Column(String(100), unique=True)
    city = Column(String(50))
    hashed_password = Column(String(255))

    food_entries = relationship("FoodEntry", back_populates="user")

class FoodEntry(Base):
    __tablename__ = "food_entries"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255))
    datetime = Column(DateTime)
    type = Column(Enum(RequestType))
    user_id = Column(Integer, ForeignKey("users.id")) 

    user = relationship("User", back_populates="food_entries")


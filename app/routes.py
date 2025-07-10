from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import auth, models
from . import schemas
from .database import SessionLocal, engine
from datetime import datetime, timedelta
from fastapi import Query
from fastapi.security import OAuth2PasswordRequestForm
from .jwtreq import create_access_token
from .jwtreq import get_current_user

models.Base.metadata.create_all(bind=engine)
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = auth.hash_password(user.password)
    new_user = models.User(username=user.username, email=user.email, city=user.city, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/food/", response_model=schemas.FoodEntryOut)
def create_food_entry(entry: schemas.FoodEntryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    food_entry = models.FoodEntry(**entry.dict(), user_id=current_user.id)
    db.add(food_entry)
    db.commit()
    db.refresh(food_entry)
    return food_entry


@router.get("/food/", response_model=list[schemas.FoodEntryOut])
def list_food_entries(city: str = Query(...), db: Session = Depends(get_db)):
    cutoff = datetime.utcnow() - timedelta(hours=20)
    return (
        db.query(models.FoodEntry)
        .join(models.User)
        .filter(models.User.city == city)
        .filter(models.FoodEntry.datetime >= cutoff)
        .all()
    )
@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

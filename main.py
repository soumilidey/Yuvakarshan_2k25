from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from models import Base, User
from database import engine
from schemas import UserCreate, UserOut, Token
from auth import get_db, hash_password, verify_password, create_access_token

app = FastAPI()
Base.metadata.create_all(bind=engine)

@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter_by(email=user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    def optional(value): return value if not user.is_anonymous else None

    db_user = User(
        email=user.email,
        name=optional(user.name),
        city=optional(user.city),
        password=hash_password(user.password) if user.password else None,
        is_anonymous=user.is_anonymous
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=form_data.username).first()
    if not user or not user.password or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

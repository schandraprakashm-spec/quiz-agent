from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from pydantic import BaseModel

from sqlalchemy.orm import Session

from datetime import datetime, timedelta

from jose import jwt

from app.db.session import get_db

from app.models.user import User

from app.security import (
    hash_password,
    verify_password
)

router = APIRouter()

SECRET_KEY = "mysecretkey"

ALGORITHM = "HS256"


# ---------------------------------
# REQUEST SCHEMAS
# ---------------------------------

class LoginRequest(BaseModel):

    email: str

    password: str


class RegisterRequest(BaseModel):

    email: str

    password: str


# ---------------------------------
# SIGNUP API
# ---------------------------------

@router.post("/auth/register")
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == request.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = hash_password(
        request.password
    )

    new_user = User(

        email=request.email,

        password_hash=hashed_password
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "User created successfully"
    }


# ---------------------------------
# LOGIN API
# ---------------------------------

@router.post("/auth/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    valid_password = verify_password(
        request.password,
        user.password_hash
    )

    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    payload = {

        "sub": user.email,

        "exp": datetime.utcnow()
        + timedelta(hours=24)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {

        "access_token": token
    }

# ---------------------------------
# ADMIN RESET PASSWORD
# ---------------------------------

class ResetPasswordRequest(BaseModel):

    email: str

    new_password: str


@router.post("/admin/reset-password")
def admin_reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:

        return {
            "error": "User not found"
        }

    user.password_hash = hash_password(
        request.new_password
    )

    db.commit()

    return {
        "message": "Password updated successfully"
    }
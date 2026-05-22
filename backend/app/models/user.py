from sqlalchemy import Column, Integer, Text

from app.db.database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(Text, unique=True)

    password_hash = Column(Text)
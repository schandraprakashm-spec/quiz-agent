from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB

from app.db.database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)  
    question = Column(String, nullable=False)
    options = Column(JSONB, nullable=False)
    correct_answer = Column(String, nullable=False)
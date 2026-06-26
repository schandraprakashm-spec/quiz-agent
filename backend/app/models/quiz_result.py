from sqlalchemy import Column, Integer, Numeric, Text, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class QuizResult(Base):

    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)

    user_email = Column(Text)

    subject = Column(Text)

    unit = Column(Text)

    language = Column(Text)

    score = Column(Numeric)

    percentage = Column(Numeric)

    total_questions = Column(Integer)

    correct_answers = Column(Integer)

    wrong_answers = Column(Integer)

    attempted_at = Column(
        DateTime,
        server_default=func.now()
    )
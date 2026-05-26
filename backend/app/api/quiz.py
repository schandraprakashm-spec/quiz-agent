from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy  import func

from pydantic import BaseModel

from typing import List

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.question import Question

from app.auth_dependency import get_current_user

router = APIRouter()


# ---------------------------------
# Request Schemas
# ---------------------------------

class Answer(BaseModel):

    question_id: int

    selected_answer: str


class SubmitQuizRequest(BaseModel):

    answers: List[Answer]


# ---------------------------------
# GET QUIZ QUESTIONS
# ---------------------------------

@router.get("/quiz")
def get_quiz(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    questions = db.query(Question).order_by(func.random()).limit(30).all()

    return {
        "questions": [
            {
                "id": q.id,
                "question": q.question,
                "options": q.options
            }
            for q in questions
        ]
    }


# ---------------------------------
# SUBMIT QUIZ
# ---------------------------------

@router.post("/submit")
def submit_quiz(
    request: SubmitQuizRequest,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    score = 0

    wrong_answers = []

    for answer in request.answers:

        question = db.query(Question).filter(
            Question.id == answer.question_id
        ).first()

        if question:

            if (
                answer.selected_answer
                ==
                question.correct_answer
            ):

                score += 1

            else:

                wrong_answers.append({

                    "question": question.question,

                    "your_answer": answer.selected_answer,

                    "correct_answer": question.correct_answer
                })

    total_questions = len(request.answers)

    percentage = (
        score / total_questions
    ) * 100 if total_questions > 0 else 0

    message = (
        "Good Job"
        if percentage >= 95
        else "Please REVISE the topic again"
    )

    return {

        "score": score,

        "total_questions": total_questions,

        "percentage": percentage,

        "message": message,

        "wrong_answers": wrong_answers
    }
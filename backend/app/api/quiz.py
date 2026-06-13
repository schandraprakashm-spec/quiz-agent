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
    subject: str,
    unit: str,
    language: str,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    questions = (
        db.query(Question)
        .filter(
            Question.subject == subject,
            Question.unit == unit,
            Question.language == language
        )
        .order_by(func.random())
        .limit(30)
        .all()
    )

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

    wrong_count = 0

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

                wrong_count += 1

                wrong_answers.append({

                    "question": question.question,

                    "your_answer": answer.selected_answer,

                    "correct_answer": question.correct_answer
                })

    # Apply 1/4 negative marking

    final_score = score - (wrong_count * 0.25)

    # Prevent negative scores

    if final_score < 0:
        final_score = 0

    # Quiz always contains 30 questions

    total_questions = 30

    percentage = (
        final_score / total_questions
    ) * 100 if total_questions > 0 else 0

    message = (
        "Good Job"
        if percentage >= 95
        else "Please REVISE the topic again"
    )

    return {

        "score": round(final_score, 2),

        "total_questions": total_questions,

        "percentage": round(percentage, 2),

        "message": message,

        "wrong_answers": wrong_answers,

        "wrong_count": wrong_count,

        "correct_count": score
    }
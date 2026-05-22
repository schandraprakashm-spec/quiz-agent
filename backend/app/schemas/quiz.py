from pydantic import BaseModel
from typing import List

class SubmitQuizRequest(BaseModel):
    user_id: int
    answers: List[int]
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine, Base

from app.models.question import Question
from app.models.user import User
from app.models.quiz_result import QuizResult

from app.api.auth import router as auth_router
from app.api.quiz import router as quiz_router

# Create tables (log and re-raise errors to make deploy issues visible)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    import traceback, sys
    traceback.print_exc()
    raise RuntimeError(f"Database initialization failed: {e}")

app = FastAPI()

# VERY IMPORTANT CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(quiz_router)

@app.get("/")
def home():
    return {"message": "Quiz Agent Running"}
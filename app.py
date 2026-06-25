from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Generation import generate_answer
import logging
from database import supabase, supabase_auth
from auth import get_current_user, require_admin
from routers import conversations, admin



logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)
logger = logging.getLogger(__name__)


class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    email: str
    password: str

class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str
    citations: list
    answer_found: bool

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def root():
    logger.info("Health check called")
    return {"status": "ok"}





@app.post("/auth/login")
def login(login_data: LoginRequest):
    email = login_data.email
    password = login_data.password
    response_dict = {}

    try:
        response = supabase_auth.auth.sign_in_with_password({"email": email, "password": password})
        response_dict = {
            "access_token": response.session.access_token,
            "token_type": response.session.token_type,
            "expires_in": response.session.expires_in
        } 
        logger.info(
            "Connected to supabase client, got resposnse=%s",
            response_dict
        )
        return response_dict
    except Exception as e:
        logger.exception(
            "Error while connecting to supabase client"
        )
        raise HTTPException(status_code=401, detail="Something went wrong")



@app.post("/auth/signup")
def signup(signup_data: SignupRequest):
    email = signup_data.email
    password = signup_data.password
    response_dict = {}
    try:
        response = supabase_auth.auth.sign_up({"email": email, "password": password})
        user_id = response.user.id
        response = (
            supabase.table("profiles")
            .insert({"user_id": user_id, "role": "user"})
            .execute()
        )
        return {"message": "Signup successful"}
    except Exception as e:
        logger.exception(
            "Error while connecting to supabase client"
        )
        raise HTTPException(status_code=400, detail="Something went wrong")


@app.post("/ask", response_model=AskResponse)
def ask(requestData: AskRequest, current_user = Depends(get_current_user)):
    logger.info("Received question: %s", requestData.question)
    try:
        response = generate_answer(requestData.question)
        logger.info(
            "Answer generated successfully. answer_found=%s",
            response.get("answer_found")
        )
        return response
    except Exception as e:
        logger.exception(
            "Error while generating answer for question: %s",
            requestData.question
        )
        raise HTTPException(status_code=500, detail="Something went wrong")
    


@app.get("/admin/test")
def admin_test(current_user = Depends(require_admin)):
    return {"message": "you are an admin", "user_id": str(current_user.id)}



app.include_router(conversations.router, prefix="/conversations")
# app.include_router(admin.router, prefix="/admin")
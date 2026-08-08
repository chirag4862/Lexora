from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Generation import generate_answer
import logging
from database import supabase, supabase_auth
from auth import get_current_user, require_admin
from routers import conversations, admin
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from limiter import limiter


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

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Allowed frontend origins for CORS. Append additional domains here
# (e.g. a custom domain) as they come online.
CORS_ORIGINS = ["https://lexora.cvijay.dev", "https://lexora-omega-eight.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def root():
    logger.info("Health check called")
    return {"status": "ok"}



@app.post("/auth/login")
@limiter.limit("5/minute")
def login(login_data: LoginRequest, request: Request):
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
@limiter.limit("5/minute")
def signup(signup_data: SignupRequest, request: Request):
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



@app.get("/auth/me")
def get_me(current_user = Depends(get_current_user)):
    try:
        role = supabase.table("profiles").select("role").eq("user_id", current_user.id).single().execute()
        return {
            "id": str(current_user.id),
            "email": current_user.email,
            "role": role.data["role"]
        }
    except Exception as e:
        print("Profile lookup error:", e)
        raise HTTPException(500, "Could not find user Information!")



@app.post("/auth/logout")
def logout(current_user = Depends(get_current_user)):
    # revoke the session server-side
    supabase_auth.auth.sign_out()
    return {"message": "Logged out"}



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



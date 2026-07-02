import logging
from fastapi import APIRouter, Depends, HTTPException
from Generation import generate_answer
from database import supabase
from pydantic import BaseModel

from auth import get_current_user
router = APIRouter()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)
logger = logging.getLogger(__name__)





@router.post("/")
def create_conversation(current_user = Depends(get_current_user)):
    try:
        result = supabase.table("conversations").insert({"user_id": current_user.id}).execute()
        new_conversation = result.data[0]
        return new_conversation
    except Exception as e:
        logger.exception("Exception occured while creating conversation")
        raise HTTPException(status_code=500, detail="Failed in Creating Conversation")


@router.get("/")
def get_conversations(current_user = Depends(get_current_user)):
    try:
        result = supabase.table("conversations").select("*").eq("user_id", current_user.id).order("created_at", desc=True).execute()
        conversations = result.data
        return conversations
    except Exception as e:
        logger.exception("Exception occured while fetching conversations")
        raise HTTPException(status_code=500, detail="Failed in Fetching Conversation")
    
@router.delete("/{conversation_id}")
def delete_conversations(conversation_id: str, current_user = Depends(get_current_user)):
    try:
        res = supabase.table("conversations").delete().eq("id", conversation_id).eq("user_id", current_user.id).execute()
        if not res.data:
            return {"result":"Conversation dosen't belong to this user"}
        return res.data
    except Exception as e:
        logger.exception("Exception occured while Deleting conversations")
        raise HTTPException(status_code=500, detail="Failed in Deleting Conversation")

 
@router.get("/{conversation_id}")
def get_messages(conversation_id: str, current_user = Depends(get_current_user)):
    try:
        owns = supabase.table("conversations").select("id").eq("id", conversation_id).eq("user_id", current_user.id).execute()
        if not owns.data:
            raise HTTPException(404, "Conversation not found")
        messages = supabase.table("messages").select("*").eq("conversation_id", conversation_id).order("created_at").execute()
        return messages.data
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Exception occured while fetching messages")
        raise HTTPException(status_code=500, detail="Failed in Fetching Messages")



class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str
    citations: list
    answer_found: bool

@router.post("/conversations/{conversation_id}/ask", response_model=AskResponse)
def ask(conversation_id: str, requestData: AskRequest, current_user = Depends(get_current_user)):
    logger.info("Received question: %s", requestData.question)
    try:
        owns = supabase.table("conversations").select("id").eq("id", conversation_id).eq("user_id", current_user.id).execute()
        if not owns.data:
            raise HTTPException(404, "Conversation not found")
        supabase.table("messages").insert({"conversation_id": conversation_id, "role": "user", "content": requestData.question}).execute()
        response = generate_answer(requestData.question)
        supabase.table("messages").insert({"conversation_id": conversation_id, "role": "assistant", "content": response["answer"], "metadata" : {"citations": response["citations"], "answer_found": response["answer_found"]}}).execute()

        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(
            "Error while generating answer for question: %s",
            requestData.question
        )
        raise HTTPException(status_code=500, detail="Something went wrong")
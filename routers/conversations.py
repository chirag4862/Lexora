import logging
from fastapi import APIRouter, Depends, HTTPException
from database import supabase

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
        found = False
        conversations = get_conversations()
        for cons in conversations:
            if cons.id == conversation_id:
                found = True
        if found:
            res = supabase.table("conversations").delete().eq("id", conversation_id).execute()
            result = res.data
            return result
        else:
            return "Conversation dosen't belong to this user"
    except Exception as e:
        logger.exception("Exception occured while Deleting conversations")
        raise HTTPException(status_code=500, detail="Failed in Deleting Conversation")
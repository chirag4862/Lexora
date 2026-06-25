from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException
from database import supabase, supabase_auth

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        res = supabase_auth.auth.get_user(token)
        print("Returned User:", res.user)
        return res.user
    except Exception as e:
        print("Auth error:", e)
        raise HTTPException(401, "Invalid token")



def require_admin(current_user = Depends(get_current_user)):
    try:
        role = supabase.table("profiles").select("role").eq("user_id", current_user.id).single().execute()
        print("role.data:", role.data) 
        if role.data["role"] != "admin":
            raise HTTPException(403, "Admin access required")
        return current_user
    except HTTPException:
        raise 
    except Exception as e:
        print("Profile lookup error:", e)
        raise HTTPException(403, "Could not verify admin role")
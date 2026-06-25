import os
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
service_key: str = os.environ.get("SUPABASE_KEY")       
anon_key: str = os.environ.get("SUPABASE_ANON_KEY")    


supabase: Client = create_client(url, service_key)
supabase_auth: Client = create_client(url, anon_key)
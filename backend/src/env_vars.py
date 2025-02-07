import os
from dotenv import load_dotenv

load_dotenv()

port = os.getenv("PORT")
llm_url = os.getenv("LLM_URL")
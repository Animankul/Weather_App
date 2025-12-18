from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import ChatRequest
from app.agent import agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        result = agent.run(request.query)
        return {"answer": result}
    except Exception:
        return {
            "answer": "Sorry, I couldn't fetch the weather right now."
        }

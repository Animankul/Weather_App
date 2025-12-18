from langchain.agents import initialize_agent, AgentType
from langchain_openai import ChatOpenAI
from app.tools import get_weather
from app.config import OPENROUTER_API_KEY

SYSTEM_PROMPT = """
You are a weather assistant.

Rules:
- If the user asks about weather, ALWAYS call the get_weather tool.
- The tool input MUST be ONLY the city name as a plain string.
- Example:
  Correct: Action Input: Pune
  Incorrect: Action Input: {"city": "Pune"}
- After receiving tool output, respond directly to the user.
"""

llm = ChatOpenAI(
    openai_api_key=OPENROUTER_API_KEY,
    openai_api_base="https://openrouter.ai/api/v1",
    model_name="mistralai/mistral-7b-instruct",
    temperature=0,
)

agent = initialize_agent(
    tools=[get_weather],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=False,
    handle_parsing_errors=True,
    agent_kwargs={
        "system_message": SYSTEM_PROMPT
    }
)

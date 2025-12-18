import requests
from langchain.tools import tool
from app.config import OPENWEATHER_API_KEY


@tool
def get_weather(city: str) -> str:
    """
    Get current weather of a city.
    Input MUST be a city name as a string.
    """

    # 🛡️ Normalize input from LLM
    if isinstance(city, dict):
        city = city.get("city") or city.get("name") or ""

    city = str(city).strip()

    if not city:
        return "Invalid city name."

    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric",
    }

    res = requests.get(url, params=params, timeout=10)
    data = res.json()

    if data.get("cod") != 200:
        return f"I couldn't find weather data for {city}."

    temp = data["main"]["temp"]
    desc = data["weather"][0]["description"]

    return f"The current temperature in {city} is {temp}°C with {desc}."

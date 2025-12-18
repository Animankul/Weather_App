# 🌦️ Weather Assistant – LLM Powered Web App

A full-stack weather assistant that allows users to ask weather-related questions in natural language.  
The application uses a **React frontend** and a **FastAPI backend** powered by a **LangChain agent** with **OpenRouter LLM** and a custom weather tool.

Built as part of the **SanchAI Analytics – Internship Technical Assessment**.

---

## ✨ Features

- Natural language weather queries (e.g. *“What’s the weather in Pune today?”*)
- LangChain ReAct agent with tool calling
- Real-time weather data using OpenWeather API
- Clean and responsive React UI
- Quick city shortcuts
- Dark / Light mode toggle
- Robust backend error handling
- Fully free and open-source stack

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS-in-JS

### Backend
- FastAPI
- LangChain
- OpenRouter (LLM)
- OpenWeather API
- Python 3.11

---

## 🔁 Application Flow

1. User enters a weather-related query from the frontend.
2. Backend sends the query to a LangChain agent.
3. Agent decides whether to call the weather tool.
4. Weather tool fetches live weather data.
5. Response is returned and displayed on the frontend.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11
- Node.js (v18+ recommended)
- OpenRouter API key
- OpenWeather API key

---

### Backend Setup

```bash
cd backend2
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

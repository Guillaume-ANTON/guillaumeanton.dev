from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from scraper import run_scraper 
import uuid
import requests
from collections import Counter
from datetime import datetime, timezone
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import os

# Chargement des variables d'environnement
load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Contact Model & Endpoint ---
class ContactForm(BaseModel):
    first: str
    last: str
    email: EmailStr
    phone: str | None = None
    message: str

@app.post("/api/contact")
def handle_contact(form: ContactForm):
    msg = EmailMessage()
    msg["Subject"] = f"Nouveau message de {form.first} {form.last}"
    msg["From"] = form.email
    msg["To"] = RECEIVER_EMAIL

    body = f"""
Nom : {form.first} {form.last}
Email : {form.email}

Message :
{form.message}
"""
    msg.set_content(body)

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
        return {"detail": "Message envoyé avec succès"}
    except Exception as e:
        print("[❌] Erreur SMTP :", e)
        raise HTTPException(status_code=500, detail="Erreur lors de l’envoi de l’e-mail.")

# --- Scraper ---
class ScrapeRequest(BaseModel):
    url: str
    tags: list[str]

@app.post("/api/scrape")
async def scrape(data: ScrapeRequest):
    try:
        file_name = f"{uuid.uuid4().hex}.csv"
        path = f"generated/{file_name}"
        run_scraper(data.url, data.tags, output=path)
        return {"file": file_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/download")
def download(file: str):
    from fastapi.responses import FileResponse
    return FileResponse(path=f"generated/{file}", filename=file)

# --- GitHub Stats ---
GITHUB_API = "https://api.github.com"

class GitHubStats(BaseModel):
    avatar_url: str
    public_repos: int
    total_stars: int
    most_used_language: str
    last_commit: str
    languages_breakdown: dict

@app.get("/api/github", response_model=GitHubStats)
def analyze_github_user(username: str):
    user_url = f"{GITHUB_API}/users/{username}"
    repos_url = f"{GITHUB_API}/users/{username}/repos"

    user_resp = requests.get(user_url)
    if user_resp.status_code != 200:
        raise HTTPException(status_code=404, detail="GitHub user not found")
    user_data = user_resp.json()

    repos_resp = requests.get(repos_url)
    repos_data = repos_resp.json() if repos_resp.status_code == 200 else []

    avatar = user_data.get("avatar_url")
    public_repos = user_data.get("public_repos", 0)
    total_stars = sum(repo.get("stargazers_count", 0) for repo in repos_data)

    language_counter = Counter(repo.get("language") for repo in repos_data if repo.get("language"))
    most_used_language = language_counter.most_common(1)[0][0] if language_counter else "Unknown"
    languages_breakdown = dict(language_counter)

    pushed_dates = [
        repo.get("pushed_at") for repo in repos_data if repo.get("pushed_at")
    ]
    if pushed_dates:
        last_pushed = max(datetime.fromisoformat(p.replace("Z", "+00:00")) for p in pushed_dates)
        delta_days = (datetime.now(timezone.utc) - last_pushed).days

        if delta_days == 0:
            last_commit = "Aujourd'hui"
        elif delta_days == 1:
            last_commit = "Hier"
        elif delta_days == 2:
            last_commit = "Avant-hier"
        else:
            last_commit = f"Il y a {delta_days} jours"
    else:
        last_commit = "Inconnu"

    return GitHubStats(
        avatar_url=avatar,
        public_repos=public_repos,
        total_stars=total_stars,
        most_used_language=most_used_language,
        last_commit=last_commit,
        languages_breakdown=languages_breakdown
    )

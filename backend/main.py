from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from scraper import run_scraper 
import uuid
import requests
from collections import Counter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    url: str
    tags: list[str]

GITHUB_API = "https://api.github.com"

class GitHubStats(BaseModel):
    avatar_url: str
    public_repos: int
    total_stars: int
    most_used_language: str
    recent_commits: int
    languages_breakdown: dict

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

@app.get("/api/github", response_model=GitHubStats)
def analyze_github_user(username: str):
    user_url = f"{GITHUB_API}/users/{username}"
    repos_url = f"{GITHUB_API}/users/{username}/repos"
    events_url = f"{GITHUB_API}/users/{username}/events"

    user_resp = requests.get(user_url)
    if user_resp.status_code != 200:
        raise HTTPException(status_code=404, detail="GitHub user not found")
    user_data = user_resp.json()

    repos_resp = requests.get(repos_url)
    repos_data = repos_resp.json() if repos_resp.status_code == 200 else []

    events_resp = requests.get(events_url)
    events_data = events_resp.json() if events_resp.status_code == 200 else []

    avatar = user_data.get("avatar_url")
    public_repos = user_data.get("public_repos", 0)
    total_stars = sum(repo.get("stargazers_count", 0) for repo in repos_data)

    language_counter = Counter(repo.get("language") for repo in repos_data if repo.get("language"))
    most_used_language = language_counter.most_common(1)[0][0] if language_counter else "Unknown"
    languages_breakdown = dict(language_counter)


    recent_commits = 0
    for event in events_data:
        if event["type"] == "PushEvent":
            recent_commits += len(event["payload"].get("commits", []))

    return GitHubStats(
        avatar_url=avatar,
        public_repos=public_repos,
        total_stars=total_stars,
        most_used_language=most_used_language,
        recent_commits=recent_commits,
        languages_breakdown =language_counter
    )
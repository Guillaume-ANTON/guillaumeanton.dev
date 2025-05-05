from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from scraper import run_scraper  # ← fonction à créer
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou spécifie ton frontend localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
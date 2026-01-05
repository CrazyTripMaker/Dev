from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date
from decimal import Decimal
import os

app = FastAPI(title="Tour Package Admin API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers
from routers import packages, categories, destinations, itinerary, inquiries, departures, cities

app.include_router(packages.router, prefix="/api/packages", tags=["Packages"])
app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])
app.include_router(destinations.router, prefix="/api/destinations", tags=["Destinations"])
app.include_router(itinerary.router, prefix="/api/itinerary", tags=["Itinerary"])
app.include_router(inquiries.router, prefix="/api/inquiries", tags=["Inquiries"])
app.include_router(departures.router, prefix="/api/departures", tags=["Departures"])
app.include_router(cities.router, prefix="/api/cities", tags=["Cities"])

@app.get("/")
def read_root():
    return {"message": "Tour Package Admin API", "status": "active"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

FRONTEND_DIR = "D:/Personal project/CrazyTripMaker/project/dist"

if os.path.exists(FRONTEND_DIR):
    # Serve assets
    app.mount(
        "/assets",
        StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")),
        name="assets",
    )

    # SPA fallback
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))
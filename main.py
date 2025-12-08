from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date
from decimal import Decimal

app = FastAPI(title="Tour Package Admin API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers
from routers import packages, categories, destinations, itinerary, inquiries

app.include_router(packages.router, prefix="/api/packages", tags=["Packages"])
app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])
app.include_router(destinations.router, prefix="/api/destinations", tags=["Destinations"])
app.include_router(itinerary.router, prefix="/api/itinerary", tags=["Itinerary"])
app.include_router(inquiries.router, prefix="/api/inquiries", tags=["Inquiries"])

@app.get("/")
def read_root():
    return {"message": "Tour Package Admin API", "status": "active"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

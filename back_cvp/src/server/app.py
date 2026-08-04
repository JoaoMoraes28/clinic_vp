from fastapi import FastAPI
from src.routes.patient_routes import patient_routes

app = FastAPI()

app.include_router(patient_routes)
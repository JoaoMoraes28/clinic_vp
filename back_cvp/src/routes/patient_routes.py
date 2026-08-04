from fastapi import APIRouter, status
from typing import List

from src.model import patient
from src.schemas.patient import ResponsePatient

patient_routes = APIRouter(prefix="/patients", tags=["Pacientes"])

@patient_routes.get("/", response_model=ResponsePatient)
async def getPatients():
    response = await patient.get_patients()

    return {
        "status_code": 200,
        "patient": response
    }
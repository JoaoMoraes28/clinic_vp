from fastapi import APIRouter, status, Path
from typing import List

from src.controller import patient as controller

from src.schemas.patient import PatientResponseData
from src.schemas.patient import PatientCreate
from src.schemas.patient import PatientUpdate

patient_routes = APIRouter(prefix="/patients", tags=["Pacientes"])

@patient_routes.get("/", response_model=List[PatientResponseData])
async def get_patients():
    return await controller.controller_patients()

@patient_routes.get("/{patient_id}", response_model=PatientResponseData)
async def get_patient_id(patient_id: int = Path(..., ge=1)):
    return await controller.controller_patient_id(patient_id)

@patient_routes.post("/", response_model=PatientResponseData, status_code=status.HTTP_201_CREATED)
async def post_patient(patient: PatientCreate):
    return await controller.controller_insert_patient(patient)

@patient_routes.put("/{patient_id}", response_model=PatientResponseData, status_code=status.HTTP_200_OK)
async def put_patient(patient: PatientUpdate, patient_id: int = Path(..., ge=1)):
    return await controller.controller_update_patient(patient_id, patient)
    
@patient_routes.patch("/{patient_id}", status_code=status.HTTP_200_OK)
async def delete_patient(patient_id: int = Path(..., ge=1)):
    await controller.controller_delete_patient(patient_id)

    return {
        "message": "patient deleted"
    }

@patient_routes.patch("/reactive/{patient_id}", status_code=status.HTTP_200_OK)
async def reactive_patient(patient_id: int = Path(..., ge=1)):
    await controller.controller_reactive_patient(patient_id)

    return {
        "message": "patient reactivate"
    }
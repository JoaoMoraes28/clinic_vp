from fastapi import APIRouter, status, Depends, Path
from sqlalchemy.orm import Session
from typing import List

from src.database.connection import get_db
from src.controller import patient as controller

from src.schemas.patient import PatientResponseData
from src.schemas.patient import PatientReponseStatus
from src.schemas.patient import PatientWrite
from src.schemas.patient import PatientPreview

patient_routes = APIRouter(prefix="/patient", tags=["Pacientes"])


@patient_routes.get("/", response_model=List[PatientPreview])
def get_patients(db: Session = Depends(get_db), active: bool = True):
    return controller.get_all_patients(db, active)


@patient_routes.get("/{patient_id}", response_model=PatientResponseData)
def get_patient_id(
    patient_id: int = Path(..., ge=1),
    active: bool = True,
    db: Session = Depends(get_db),
):
    return controller.get_patient_id(db, patient_id, active)


@patient_routes.post(
    "/", response_model=PatientResponseData, status_code=status.HTTP_201_CREATED
)
def post_patient(patient: PatientWrite, db: Session = Depends(get_db)):
    return controller.register_patient(db, patient)


@patient_routes.put(
    "/{patient_id}", response_model=PatientResponseData, status_code=status.HTTP_200_OK
)
def put_patient(
    patient: PatientWrite,
    patient_id: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    return controller.modify_patient(db, patient_id, patient)


@patient_routes.patch(
    "/{patient_id}/deactive",
    response_model=PatientReponseStatus,
    status_code=status.HTTP_200_OK,
)
def deactivate_patient(
    patient_id: int = Path(..., ge=1), db: Session = Depends(get_db)
):
    controller.deactivate_patient(db, patient_id)

    return {"id": patient_id, "status_patient": "DEACTIVATED"}


@patient_routes.patch(
    "/{patient_id}/reactive",
    response_model=PatientReponseStatus,
    status_code=status.HTTP_200_OK,
)
def reactive_patient(patient_id: int = Path(..., ge=1), db: Session = Depends(get_db)):
    controller.reactive_patient(db, patient_id)

    return {"id": patient_id, "status_patient": "REACTIVATED"}

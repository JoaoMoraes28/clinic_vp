from typing import List

from fastapi import APIRouter, status, Depends, Path

from sqlalchemy.orm import Session

from src.controller import doctor as controller

from src.database.connection import get_db

from src.schemas.doctor import DoctorDataResponse
from src.schemas.doctor import DoctorChangeStatus
from src.schemas.doctor import DoctorCreate
from src.schemas.doctor import DoctorUpdate
from src.schemas.doctor import DoctorReponseStatus

doctor_routes = APIRouter(prefix="/doctor", tags=["Médicos(as)"])


@doctor_routes.get(
    "/", response_model=List[DoctorDataResponse], status_code=status.HTTP_200_OK
)
def get_doctors(db: Session = Depends(get_db), filter: str | None = None):
    return controller.get_all_doctors(db, filter)


@doctor_routes.get(
    "/{doctor_id}", response_model=DoctorDataResponse, status_code=status.HTTP_200_OK
)
def get_doctor_id(db: Session = Depends(get_db), doctor_id: int = Path(..., ge=1)):
    return controller.get_doctor_id(db, doctor_id)


@doctor_routes.post(
    "/", response_model=DoctorDataResponse, status_code=status.HTTP_201_CREATED
)
def post_doctor(doctor: DoctorCreate, db: Session = Depends(get_db)):
    return controller.register_doctor(db, doctor)


@doctor_routes.put(
    "/{doctor_id}",
    response_model=DoctorDataResponse,
    status_code=status.HTTP_200_OK,
)
def put_doctor(
    doctor_update: DoctorUpdate,
    db: Session = Depends(get_db),
    doctor_id: int = Path(..., ge=1),
):
    return controller.modify_doctor(db, doctor_id, doctor_update)


@doctor_routes.patch(
    "/{doctor_id}/status",
    response_model=DoctorReponseStatus,
    status_code=status.HTTP_200_OK,
)
def change_status_doctor(
    new_status: DoctorChangeStatus,
    db: Session = Depends(get_db),
    doctor_id: int = Path(..., ge=1),
):
    controller.modify_status_doctor(db, doctor_id, new_status)
    return {"id": doctor_id, "status_doctor": new_status.new_status}

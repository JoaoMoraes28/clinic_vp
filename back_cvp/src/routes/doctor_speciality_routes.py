from fastapi import APIRouter, status, Depends

from typing import List

from sqlalchemy.orm import Session

from src.database.connection import get_db

from src.controller import doctor_speciality as controller_doctor_speciality

from src.schemas.doctor_speciality import DoctorSpecialityCreate
from src.schemas.doctor_speciality import DoctorSpecialityDelete
from src.schemas.doctor_speciality import DoctorSpecialityResponse
from src.schemas.doctor_speciality import DoctorSpecialityDeleteResponse

doctor_speciality_routes = APIRouter(
    prefix="/doctor_speciality", tags=["Médicos(as)/Especialidades"]
)


@doctor_speciality_routes.get(
    "/", response_model=List[DoctorSpecialityResponse], status_code=status.HTTP_200_OK
)
def get_doctor_speciality(db: Session = Depends(get_db)):
    return controller_doctor_speciality.get_all_doctor_speciality(db)


@doctor_speciality_routes.post(
    "/", response_model=int, status_code=status.HTTP_201_CREATED
)
def post_doctor_speciality(
    doctor_speciality: DoctorSpecialityCreate, db: Session = Depends((get_db))
):
    return controller_doctor_speciality.registry_doctor_speciality(
        db, doctor_speciality
    )


@doctor_speciality_routes.delete(
    "/", response_model=DoctorSpecialityDeleteResponse, status_code=status.HTTP_200_OK
)
def delete_doctor_speciality(
    delete_id: DoctorSpecialityDelete, db: Session = Depends(get_db)
):
    controller_doctor_speciality.delete_doctor_speciality(db, delete_id)

    return {"message": "Delete successful"}

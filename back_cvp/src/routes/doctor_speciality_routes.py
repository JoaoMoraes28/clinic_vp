from fastapi import APIRouter, status, Depends

from typing import List

from sqlalchemy.orm import Session

from src.database.connection import get_db

from src.services import doctor_speciality as controller_doctor_speciality

from src.schemas.doctor_speciality import DoctorSpecialityCreate
from src.schemas.doctor_speciality import DoctorSpecialityDelete
from src.schemas.doctor_speciality import DoctorSpecialityResponse
from src.schemas.return_messages_standart import ReturnMessageStandard
from src.schemas.return_messages_standart import ReturnMessageCreateElement

from src.security.jwt import valide_access_level_recepcionist
from src.security.jwt import valide_access_level_admin

doctor_speciality_routes = APIRouter(
    prefix="/doctor_speciality", tags=["Médicos(as)/Especialidades"]
)


@doctor_speciality_routes.get(
    "/",
    response_model=List[DoctorSpecialityResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_recepcionist)],
)
def get_doctor_speciality(
    db: Session = Depends(get_db), filter_speciality: int | None = None
):
    return controller_doctor_speciality.get_all_doctor_speciality(db, filter_speciality)


@doctor_speciality_routes.post(
    "/",
    response_model=ReturnMessageCreateElement,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(valide_access_level_admin)],
)
def post_doctor_speciality(
    doctor_speciality: DoctorSpecialityCreate, db: Session = Depends((get_db))
):
    id = controller_doctor_speciality.registry_doctor_speciality(db, doctor_speciality)

    return {"id": id, "element": "Doctor speciality"}


@doctor_speciality_routes.delete(
    "/",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_admin)],
)
def delete_doctor_speciality(
    delete_id: DoctorSpecialityDelete, db: Session = Depends(get_db)
):
    controller_doctor_speciality.delete_doctor_speciality(db, delete_id)

    return {"message": "Delete successful"}

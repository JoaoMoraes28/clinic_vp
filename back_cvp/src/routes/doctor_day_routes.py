from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.controller import doctor_day as controller_doctor_day

from src.database.connection import get_db

from src.schemas.doctor_day import DoctorDayCreate
from src.schemas.doctor_day import DoctorDayReponse
from src.schemas.return_messages_standart import ReturnMessageStandard
from src.schemas.return_messages_standart import ReturnMessageCreateElement

doctor_day_routes = APIRouter(
    prefix="/doctor_day", tags=["Dias da semana de trabalho dos médicos(as)"]
)


@doctor_day_routes.get(
    "/", response_model=List[DoctorDayReponse], status_code=status.HTTP_200_OK
)
def get_doctor_days(db: Session = Depends(get_db)):
    return controller_doctor_day.get_all_doctor_days(db)


@doctor_day_routes.post(
    "/", response_model=ReturnMessageCreateElement, status_code=status.HTTP_201_CREATED
)
def post_doctor_day(doctor_day: DoctorDayCreate, db: Session = Depends(get_db)):
    id = controller_doctor_day.registry_doctor_day(db, doctor_day)

    return {"id": id, "element": "Doctor day"}


@doctor_day_routes.delete(
    "/{id_doctor_day}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def delete_doctor_day(
    db: Session = Depends(get_db), id_doctor_day: int = Path(..., ge=1)
):
    controller_doctor_day.delete_doctor_day(db, id_doctor_day)

    return {"message": "delete successful"}

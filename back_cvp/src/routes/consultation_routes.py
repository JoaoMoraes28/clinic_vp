from fastapi import APIRouter, status, Depends, Path

from datetime import date

from typing import List

from sqlalchemy.orm import Session

from src.controller import consultation as controller_consultation

from src.database.connection import get_db

from src.schemas.consultation import ConsultationCreate
from src.schemas.consultation import ConsultationNewStatus
from src.schemas.consultation import ConsultationResponsePreview
from src.schemas.consultation import ConsultationResponseDoctor
from src.schemas.consultation import ConsultationResponseAccess
from src.schemas.consultation import VerfifyHourConsultationResponse
from src.schemas.consultation import VerfifyHourConsultationJSONConsult
from src.schemas.return_messages_standart import ReturnMessageCreateElement
from src.schemas.return_messages_standart import ReturnMessageStandard

from src.security.jwt import valide_token
from src.security.jwt import valide_access_level_recepcionist

consultation_routes = APIRouter(prefix="/consultation", tags=["Consultas"])


@consultation_routes.get(
    "/preview",
    response_model=List[ConsultationResponsePreview],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_recepcionist)],
)
def get_consultation_preview(date: date, db: Session = Depends(get_db)):
    return controller_consultation.get_all_consultation(db, date, None)


@consultation_routes.get(
    "/{id_doctor}/doctor",
    response_model=List[ConsultationResponseDoctor],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_token)],
)
def get_consultation_doctor(
    date: date, db: Session = Depends(get_db), id_doctor: int = Path(..., ge=1)
):
    return controller_consultation.get_all_consultation(db, date, id_doctor)


@consultation_routes.get(
    "/{id_consultation}/access",
    response_model=ConsultationResponseAccess,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_token)],
)
def get_consultation_access(
    db: Session = Depends(get_db), id_consultation: int = Path(..., ge=1)
):
    return controller_consultation.get_consultation_id(db, id_consultation, None)


@consultation_routes.get(
    "/hour_available",
    response_model=List[VerfifyHourConsultationResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_recepcionist)],
)
def get_hour_consultation(
    verify_data: VerfifyHourConsultationJSONConsult, db: Session = Depends(get_db)
):
    return controller_consultation.get_hours_consultation(
        db, verify_data.id_doctor, verify_data.date
    )


@consultation_routes.post(
    "/",
    response_model=ReturnMessageCreateElement,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(valide_access_level_recepcionist)],
)
def post_consultation(consultation: ConsultationCreate, db: Session = Depends(get_db)):
    id = controller_consultation.registry_consultation(db, consultation)

    return {"id": id, "element": "Consultation"}


@consultation_routes.patch(
    "/{id_consultation}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def put_consultation(
    new_status: ConsultationNewStatus,
    db: Session = Depends(get_db),
    id_consultation: int = Path(..., ge=1),
):
    controller_consultation.change_status(db, id_consultation, new_status.new_status)

    return {
        "message": f"element with id {id_consultation} have a new status: {new_status.new_status}"
    }

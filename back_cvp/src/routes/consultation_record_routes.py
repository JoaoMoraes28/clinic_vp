from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.controller import consultation_record as controller_consultation_record

from src.database.connection import get_db

from src.schemas.consultation_record import ConsultationRecordCreate
from src.schemas.consultation_record import ConsultationRecordResponse
from src.schemas.return_messages_standart import ReturnMessageCreateElement

consultation_record_routes = APIRouter(
    prefix="/consultation_record", tags=["Registros de consultas"]
)


@consultation_record_routes.get(
    "/{id_medical_record}",
    response_model=List[ConsultationRecordResponse],
    status_code=status.HTTP_200_OK,
)
def get_consultation_record(
    id_medical_record: int = Path(..., ge=1), db: Session = Depends(get_db)
):
    return controller_consultation_record.get_all_consultation_id_medical_record(
        db, id_medical_record
    )


@consultation_record_routes.post(
    "/", response_model=ReturnMessageCreateElement, status_code=status.HTTP_201_CREATED
)
def post_consultation_record(
    consultation_record: ConsultationRecordCreate, db: Session = Depends(get_db)
):
    id = controller_consultation_record.registry_consultaiton_record(
        db, consultation_record
    )

    return {"id": id, "element": "Consultation record"}

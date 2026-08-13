from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.controller import consultation_duration as controller_consultation_duration

from src.database.connection import get_db

from src.schemas.consultation_duration import ConsultationDurationCreate
from src.schemas.consultation_duration import ConsultationDurationUpdate
from src.schemas.consultation_duration import ConsultationDurationResponse
from src.schemas.return_messages_standart import ReturnMessageStandard
from src.schemas.return_messages_standart import ReturnMessageCreateElement

consultation_duration_routes = APIRouter(
    prefix="/consultation_duration", tags=["Duração de consultas"]
)


@consultation_duration_routes.get(
    "/",
    response_model=List[ConsultationDurationResponse],
    status_code=status.HTTP_200_OK,
)
def get_consultation_duration(db: Session = Depends(get_db)):
    return controller_consultation_duration.get_all_consultation_duration(db)


@consultation_duration_routes.post(
    "/", response_model=ReturnMessageCreateElement, status_code=status.HTTP_201_CREATED
)
def post_consultation_duration(
    consultation_duration: ConsultationDurationCreate, db: Session = Depends(get_db)
):
    id = controller_consultation_duration.registry_consultation_duration(
        db, consultation_duration
    )

    return {
        "id": id,
        "element": "Consultation duration"
    }


@consultation_duration_routes.put(
    "/{id_consultation_duration}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def put_consultation_duration(
    new_duration: ConsultationDurationUpdate,
    id_consultation_duration: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    controller_consultation_duration.udpate_consultation_duration(
        db, new_duration.new_duration, id_consultation_duration
    )

    return {
        "message": f"New duration set in {new_duration.new_duration} for element with id {id_consultation_duration}"
    }


@consultation_duration_routes.delete(
    "/{id_consultation_duration}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def delete_consultation_duration(
    id_consultation_duration: int = Path(..., ge=1), db: Session = Depends(get_db)
):
    controller_consultation_duration.delete_consultation_duration(
        db, id_consultation_duration
    )

    return {"message": f"Element with id {id_consultation_duration} deleted"}

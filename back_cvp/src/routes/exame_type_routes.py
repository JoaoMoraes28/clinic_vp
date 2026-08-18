from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.controller import exame_type as controller_exame_type

from src.database.connection import get_db

from src.schemas.exame_type import ExameTypeResponse
from src.schemas.exame_type import ExameTypeWrite
from src.schemas.exame_type import ExameChangeStatus
from src.schemas.return_messages_standart import ReturnMessageStandard
from src.schemas.return_messages_standart import ReturnMessageCreateElement

exame_type_routes = APIRouter(prefix="/exame_type", tags=["Tipos de exame"])


@exame_type_routes.get(
    "/", response_model=List[ExameTypeResponse], status_code=status.HTTP_200_OK
)
def get_exame_type(filter: bool | None = None, db: Session = Depends(get_db)):
    return controller_exame_type.get_all_exame_type(db, filter)


@exame_type_routes.post(
    "/", response_model=ReturnMessageCreateElement, status_code=status.HTTP_201_CREATED
)
def post_exame_type(exame_type: ExameTypeWrite, db: Session = Depends(get_db)):
    id = controller_exame_type.registry_exame_type(db, exame_type)

    return {"id": id, "element": "Exame Type"}


@exame_type_routes.patch(
    "/{id_exame_type}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def change_status_exame_type(
    new_status: ExameChangeStatus,
    id_exame_type: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    controller_exame_type.change_status_exame_type(
        db, new_status.new_status, id_exame_type
    )

    return {
        "message": f"exame type of id {id_exame_type} have a new status: {new_status.new_status}"
    }

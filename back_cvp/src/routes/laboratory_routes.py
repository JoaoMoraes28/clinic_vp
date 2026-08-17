from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.controller import laboratory as controller_laboratory

from src.database.connection import get_db

from src.schemas.laboratory import LaboratoryWrite
from src.schemas.laboratory import LaboratoryResponse
from src.schemas.laboratory import LaboratoryChangeActive
from src.schemas.return_messages_standart import ReturnMessageStandard
from src.schemas.return_messages_standart import ReturnMessageCreateElement

laboratory_routes = APIRouter(prefix="/laboratory", tags=["Laboratório"])


@laboratory_routes.get(
    "/", response_model=List[LaboratoryResponse], status_code=status.HTTP_200_OK
)
def get_laboratory(filter: str | None = None, db: Session = Depends(get_db)):
    return controller_laboratory.get_all_laboratory(db, filter)


@laboratory_routes.post(
    "/", response_model=ReturnMessageCreateElement, status_code=status.HTTP_201_CREATED
)
def post_laboratory(laboratory: LaboratoryWrite, db: Session = Depends(get_db)):
    id = controller_laboratory.registry_laboratory(db, laboratory)

    return {"id": id, "element": "Laboratory"}


@laboratory_routes.patch(
    "/{id_laboratory}",
    response_model=ReturnMessageStandard,
    status_code=status.HTTP_200_OK,
)
def change_status_laboratory(
    new_status: LaboratoryChangeActive,
    id_laboratory: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    controller_laboratory.change_status_laboratory(db, id_laboratory, new_status.active)

    return {
        "message": f"laboratory with id {id_laboratory} changed for {new_status.active}"
    }

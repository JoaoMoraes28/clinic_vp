from typing import List

from fastapi import APIRouter, status, Depends, Path
from sqlalchemy.orm import Session

from src.database.connection import get_db

from src.schemas.recepcionist import RecepcionistResponseData
from src.schemas.recepcionist import RecepcionistCreate
from src.schemas.recepcionist import RecepcionistUpdate
from src.schemas.recepcionist import RecepcionistChangeStatus
from src.schemas.recepcionist import RecepcionistReponseChangeStatus

from src.controller import recepcionist as controller_recepcionist

recepcionist_routes = APIRouter(prefix="/recepcionist", tags=["Recepcionistas"])


@recepcionist_routes.get(
    "/", response_model=List[RecepcionistResponseData], status_code=status.HTTP_200_OK
)
def get_recepcionist(db: Session = (Depends(get_db)), filter: str | None = None):
    return controller_recepcionist.get_all_recepcionist(db, filter)


@recepcionist_routes.get(
    "/{recepcionist_id}",
    response_model=RecepcionistResponseData,
    status_code=status.HTTP_200_OK,
)
def get_recepcionist_id(
    db: Session = (Depends(get_db)), recepcionist_id: int = Path(..., ge=1)
):
    return controller_recepcionist.get_recepcionist_id(db, recepcionist_id)


@recepcionist_routes.post(
    "/",
    response_model=RecepcionistResponseData,
    status_code=status.HTTP_201_CREATED,
)
def post_recepcionist(
    recepcionist: RecepcionistCreate, db: Session = (Depends(get_db))
):
    return controller_recepcionist.registry_recepcionist(db, recepcionist)


@recepcionist_routes.put(
    "/{recepcionist_id}",
    response_model=RecepcionistResponseData,
    status_code=status.HTTP_200_OK,
)
def put_recepcionist(
    update_recepcionist: RecepcionistUpdate,
    db: Session = (Depends(get_db)),
    recepcionist_id: int = Path(..., ge=1),
):
    return controller_recepcionist.modify_recepcionist(db, recepcionist_id, update_recepcionist)


@recepcionist_routes.patch(
    "/{recepcionist_id}/status",
    response_model=RecepcionistReponseChangeStatus,
    status_code=status.HTTP_200_OK,
)
def change_status_recepcionist(
    new_status: RecepcionistChangeStatus,
    db: Session = (Depends(get_db)),
    recepcionist_id: int = Path(..., ge=1),
):
    controller_recepcionist.modify_status_recepcionist(db, recepcionist_id, new_status)

    return {
        "id": recepcionist_id,
        "status_recepcionist": new_status.new_status
    }

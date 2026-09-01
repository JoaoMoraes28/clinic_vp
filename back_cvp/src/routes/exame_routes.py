from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.services import exame as controller_exame

from src.database.connection import get_db

from src.schemas.exame import ExameCreate
from src.schemas.exame import ExameResponse
from src.schemas.return_messages_standart import ReturnMessageCreateElement

from src.security.jwt import valide_access_level_doctor

exame_routes = APIRouter(prefix="/exame", tags=["Exames"])


@exame_routes.get(
    "/",
    response_model=List[ExameResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_doctor)],
)
def get_exames(filter_consultation: int | None = None, db: Session = Depends(get_db)):
    return controller_exame.get_all_exames(db, filter_consultation)


@exame_routes.post(
    "/{id_consultation}",
    response_model=ReturnMessageCreateElement,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(valide_access_level_doctor)],
)
def post_exames(
    exame: ExameCreate,
    id_consultation: int = Path(..., ge=1),
    db: Session = Depends(get_db),
):
    id = controller_exame.registry_exame(db, exame, id_consultation)

    return {"id": id, "element": "Exame"}

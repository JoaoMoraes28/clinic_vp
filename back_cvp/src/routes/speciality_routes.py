from fastapi import APIRouter, status, Depends

from typing import List

from sqlalchemy.orm import Session

from src.database.connection import get_db

from src.controller import speciality as controller_speciality

from src.schemas.speciality import SpecialityResponse
from src.schemas.speciality import SpecialityCreate
from src.schemas.return_messages_standart import ReturnMessageCreateElement

from src.security.jwt import valide_access_level_admin
from src.security.jwt import valide_token

speciality_routes = APIRouter(prefix="/speciality", tags=["Especialidades"])


@speciality_routes.get(
    "/",
    response_model=List[SpecialityResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_token)],
)
def get_speciality(db: Session = Depends(get_db)):
    return controller_speciality.get_all_speciality(db)


@speciality_routes.post(
    "/",
    response_model=ReturnMessageCreateElement,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(valide_access_level_admin)],
)
def post_speciality(speciality: SpecialityCreate, db: Session = Depends(get_db)):
    id = controller_speciality.registry_speciality(db, speciality)

    return {"id": id, "element": "Speciality"}

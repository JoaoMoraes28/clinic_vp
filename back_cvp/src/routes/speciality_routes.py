from fastapi import APIRouter, status, Depends

from typing import List

from sqlalchemy.orm import Session

from src.database.connection import get_db

from src.controller import speciality as controller_speciality

from src.schemas.speciality import SpecialityResponse
from src.schemas.speciality import SpecialityCreate

speciality_routes = APIRouter(prefix="/speciality", tags=["Especialidades"])


@speciality_routes.get(
    "/", response_model=List[SpecialityResponse], status_code=status.HTTP_200_OK
)
def get_speciality(db: Session = Depends(get_db)):
    return controller_speciality.get_all_speciality(db)


@speciality_routes.post("/", response_model=int, status_code=status.HTTP_201_CREATED)
def post_speciality(speciality: SpecialityCreate, db: Session = Depends(get_db)):
    return controller_speciality.registry_speciality(db, speciality)

from fastapi import APIRouter, status, Depends, Path

from typing import List

from sqlalchemy.orm import Session

from src.controller import medical_recipe as controller_medical_recipe

from src.database.connection import get_db

from src.schemas.medical_recipe import MedicalRecipeResponse
from src.schemas.medical_recipe import MedicalRecipeCreate
from src.schemas.return_messages_standart import ReturnMessageCreateElement

from src.security.jwt import valide_access_level_doctor

medical_recipe_routes = APIRouter(prefix="/medical_recipe", tags=["Receita Médica"])


@medical_recipe_routes.get(
    "/{id_consultation}",
    response_model=List[MedicalRecipeResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(valide_access_level_doctor)],
)
def get_medical_recipe_consultation(
    id_consultation: int = Path(..., ge=1), db: Session = Depends(get_db)
):
    return controller_medical_recipe.get_all_medical_recipe_consultation(
        db, id_consultation
    )


@medical_recipe_routes.post(
    "/",
    response_model=ReturnMessageCreateElement,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(valide_access_level_doctor)],
)
def post_medical_recipe(
    medical_record: MedicalRecipeCreate, db: Session = Depends(get_db)
):
    id = controller_medical_recipe.registry_medical_recipe(db, medical_record)

    return {"id": id, "element": "Medical recipe"}

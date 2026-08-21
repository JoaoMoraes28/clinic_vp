from sqlalchemy.orm import Session

from src.model import medical_recipe as medical_recipe_dao

from src.schemas.medical_recipe import MedicalRecipeCreate


def get_all_medical_recipe_consultation(db: Session, id_consultation: int):
    return medical_recipe_dao.select_medical_recipe_consultation(db, id_consultation)


def registry_medical_recipe(db: Session, medical_recipe: MedicalRecipeCreate):
    medical_recipe_id = medical_recipe_dao.insert_medical_recipe(db, medical_recipe)

    db.commit()

    return medical_recipe_id

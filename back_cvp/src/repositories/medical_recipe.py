from sqlalchemy.orm import Session

from src.database.models.views.medical_recipe_data import MedicalRecipeData
from src.database.models.recipe import MedicalRecipe

from src.schemas.medical_recipe import MedicalRecipeCreate


def select_medical_recipe_consultation(db: Session, id_consultation: int):
    return (
        db.query(MedicalRecipeData)
        .filter(MedicalRecipeData.consultation_record_id == id_consultation)
        .all()
    )


def insert_medical_recipe(db: Session, medical_recipe: MedicalRecipeCreate):
    new_medical_recipe = MedicalRecipe(**medical_recipe.model_dump())

    db.add(new_medical_recipe)
    db.flush()

    db.refresh(new_medical_recipe)

    return new_medical_recipe.id

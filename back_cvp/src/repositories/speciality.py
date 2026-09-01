from sqlalchemy.orm import Session

from src.database.models.speciality import Speciality

from src.schemas.speciality import SpecialityCreate

def select_speciality(db: Session):
    return db.query(Speciality).order_by(Speciality.speciality_name).all()

def insert_speciality(db: Session, speciality: SpecialityCreate):
    new_speciality = Speciality(**speciality.model_dump())

    db.add(new_speciality)
    db.flush()

    db.refresh(new_speciality)

    return new_speciality.id

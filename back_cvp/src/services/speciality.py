from sqlalchemy.orm import Session

from src.repositories import speciality as speciality_dao

from src.schemas.speciality import SpecialityCreate


def get_all_speciality(db: Session):
    return speciality_dao.select_speciality(db)


def registry_speciality(db: Session, speciality: SpecialityCreate):
    speciality_id = speciality_dao.insert_speciality(db, speciality)
    
    db.commit()

    return speciality_id

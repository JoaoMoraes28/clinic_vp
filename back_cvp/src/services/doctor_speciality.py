from sqlalchemy.orm import Session

from src.exception.exceptions import raise_not_found

from src.schemas.doctor_speciality import DoctorSpecialityDelete
from src.schemas.doctor_speciality import DoctorSpecialityCreate

from src.repositories import doctor_speciality as doctor_speciality_dao

def get_all_doctor_speciality(db: Session, filter_speciality: int | None):
    return doctor_speciality_dao.select_doctor_speciality(db, filter_speciality)

def registry_doctor_speciality(db: Session, doctor_speciality: DoctorSpecialityCreate):
    new_doctor_speciality_id = doctor_speciality_dao.insert_doctor_speciality(db, doctor_speciality)

    db.commit()

    return new_doctor_speciality_id

def delete_doctor_speciality(db: Session, id_delete: DoctorSpecialityDelete):
    delete = doctor_speciality_dao.delete_doctor_speciality(db, id_delete)

    if not delete:
        db.rollback()
        raise_not_found("doctor_speciality", id_delete.doctor_id)

    db.commit()
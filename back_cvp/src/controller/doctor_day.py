from sqlalchemy.orm import Session

from src.model import doctor_day as doctor_day_dao

from src.schemas.doctor_day import DoctorDayCreate

from src.exception.exceptions import raise_not_found


def get_all_doctor_days(db: Session):
    return doctor_day_dao.select_doctor_day(db)

def registry_doctor_day(db: Session, doctor_day: DoctorDayCreate):
    new_doctor_day_id = doctor_day_dao.insert_doctor_day(db, doctor_day)

    db.commit()

    return new_doctor_day_id

def delete_doctor_day(db: Session, id_doctor_day: int):
    delete = doctor_day_dao.delete_doctor_day(db, id_doctor_day)

    if not delete:
        db.rollback()
        raise_not_found("doctor_day", id_doctor_day)


    db.commit()
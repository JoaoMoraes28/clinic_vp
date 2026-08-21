from sqlalchemy.orm import Session
from sqlalchemy import delete

from src.database.models.views.doctor_day_data import DoctorDayData
from src.database.models.doctor_day import DoctorDay

from src.schemas.doctor_day import DoctorDayCreate


def select_doctor_day(db: Session):
    return db.query(DoctorDayData).all()


def select_doctor_day_id(db: Session, id: int):
    return db.query(DoctorDayData).filter(DoctorDayData.doctor_id == id).first()


def insert_doctor_day(db: Session, doctor_day: DoctorDayCreate):
    new_doctor_day = DoctorDay(**doctor_day.model_dump())

    db.add(new_doctor_day)
    db.flush()

    db.refresh(new_doctor_day)

    return new_doctor_day.id


def delete_doctor_day(db: Session, doctor_day_id: int):
    script = delete(DoctorDay).where(DoctorDay.id == doctor_day_id)

    result = db.execute(script)
    db.flush()

    if result.rowcount == 0 or result.rowcount > 1:
        return False

    return True
